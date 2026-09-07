const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;
const baseUrl = "https://calendar.grapsa.edu.gr/book/";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes timeframe
  limit: 50, // Limit each IP to 100 requests per windowMs
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Rate limit exceeded, please wait." },
});

app.use(limiter);
app.use(express.json());
app.use(
  cors({
    origin: "https://rdv.grapsa.edu.gr",
  }),
);
//error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.message);

  res.status(500).json({
    // return error message to the frontend
    error: "Something went wrong on the server. Please try again later.",
  });
});

const engToGrMap = new Map([
  //used to create urls with only latin characters
  ["Αγία Παρασκευή", "Agia_Paraskevi"],
  ["Αμπελόκηποι", "Ampelokipoi"],
  ["Παγκράτι", "Pangrati"],
  ["Χαλάνδρι", "Chalandri"],
  ["Πετρούπολη", "Petroupoli"],
  ["Ζωγράφου", "Zografou"],
  ["Καλλιθέα", "Kallithea"],
  ["Πειραιάς - Δημ.Θέατρο", "Pireas_Dimotiko_Theatro"],
]);

let territoryMap = new Map();
let isParsing = false; // Prevents crashing if the OS fires multiple rapid save events

function loadCsvData(isInitialLoad = false) {
  if (isParsing) return;

  if (!fs.existsSync("areas.csv")) {
    //check if the file exists
    console.error("Critical Error: areas.csv is missing.");
    if (isInitialLoad) {
      app.listen(port, () =>
        console.log(
          `Server running without CSV data on http://localhost:${port}`,
        ),
      );
    }
    return;
  }

  isParsing = true;

  const tempMap = new Map();

  fs.createReadStream("areas.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.ar_name) {
        tempMap.set(row.ar_name, row.assigned_school_gr);
      }
    })
    .on("end", () => {
      // Instantly swap the old cache with the new one
      territoryMap = tempMap;
      console.log(`CSV loaded. Tracking ${territoryMap.size} locations.`);

      // If this is the first time running, start the web server
      if (isInitialLoad) {
        app.listen(port, () => {
          console.log(`Backend server is running on http://localhost:${port}`);
        });
      }

      // Release the lock after a short delay
      setTimeout(() => {
        isParsing = false;
      }, 500);
    })
    .on("error", (err) => {
      console.error("Failed to read CSV:", err);
      isParsing = false;
    });
}

//load data
loadCsvData(true); //start the server

try {
  if (fs.existsSync("areas.csv")) {
    //check the file exists
    fs.watch("areas.csv", (eventType, _) => {
      if (eventType === "change") {
        console.log("CSV file change detected");
        loadCsvData(false); // do not restart server
      }
    });
  }
} catch (error) {
  console.error("Failed to initialize file watcher:", error.message);
}

app.post("/api/get-link", (req, res, next) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: "Location parameter is required." });
    }

    if (location === "Επαρχία") {
      return res.status(200).json({ url: `${baseUrl}pangratizm` });
    }

    const assignedSchool = territoryMap.get(location);
    if (!assignedSchool) {
      return res.status(404).json({ error: "Location not supported." });
    }

    const engSchool = engToGrMap.get(assignedSchool);
    if (!engSchool) {
      return res
        .status(500)
        .json({ error: "School mapping configuration error." });
    }

    const dynamicUrl = `${baseUrl}${engSchool.toLowerCase()}zm`;
    return res.status(200).json({ url: dynamicUrl });
  } catch (error) {
    next(error); //pass error to the error handler
  }
});
