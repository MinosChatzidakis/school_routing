const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const port = 3000;
const baseUrl = "https://calendar.grapsa.edu.gr/book/";

app.use(express.json());
app.use(cors());

const engToGrMap = new Map([
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
  isParsing = true;

  console.log("Loading data");

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
loadCsvData(true);

// 3. Watch the file for any future modifications
fs.watch("areas.csv", (eventType, filename) => {
  if (eventType === "change") {
    console.log("CSV file change detected");
    loadCsvData(false);
  }
});

app.post("/api/get-link", (req, res) => {
  let { location } = req.body;
  if (location === "Επαρχία") {
    return res.status(200).json({ url: `${baseUrl}$pangratizm` });
  }
  console.log(`Location: ${location}`);
  const assignedSchool = territoryMap.get(location);
  console.log(`Greek assigned school ${assignedSchool}`);

  if (!assignedSchool) {
    return res.status(400).json({ error: "Location not supported" });
  }

  const engSchool = engToGrMap.get(assignedSchool);
  console.log(`English assigned school ${engSchool}`);
  const dynamicUrl = `${baseUrl}${engSchool?.toLowerCase()}zm`;

  return res.status(200).json({ url: dynamicUrl });
});

app.get("/api/get-schools", (req, res) => {
  const finalSchools = [...engToGrMap].reduce((acc, [schoolGR, schoolENG]) => {
    [...acc, { greek: schoolGR, english: schoolENG }];
  }, {});
  return finalSchools; // array of : {greek, english names of the schools}
});
