import SearchTable from "../../Components/SearchTable/SearchTable";
import "../../App.css";
import { useState } from "react";
const InPersonPage = () => {
  const schools = [
    "Αγία Παρασκευή",
    "Αμπελόκηποι",
    "Παγκράτι",
    "Χαλάνδρι",
    "Πετρούπολη",
    "Ζωγράφου",
    "Καλλιθέα",
    "Πειραιάς - Δημ.Θέατρο",
  ];
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
  const [showError, setShowError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const BASE_URL = "https://calendar.grapsa.edu.gr/events/book/";
  return (
    <>
      {/* Question 2 (In Person) Row */}
      <div className="form-row" id="question-2-inperson">
        <div className="form-label">
          <h2>Επίλεξε εκπαιδευτήριο που σε εξυπηρετεί:</h2>
        </div>
        <div className="form-content">
          <SearchTable
            data={schools}
            selection={selectedLocation}
            setSelection={setSelectedLocation}
            includeFallBack={false}
          />
          <button
            className="submit-btn"
            disabled={!selectedLocation}
            onClick={() => {
              const engSchool = engToGrMap.get(selectedLocation).toLowerCase();
              if (!engSchool) {
                setShowError(true);
              } else {
                setShowError(false);
              }
              window.location.href = `${BASE_URL}${engToGrMap.get(selectedLocation).toLowerCase()}inp`;
            }}
          >
            {selectedLocation
              ? `Βρες ραντεβού (${selectedLocation})`
              : "Βρες ραντεβού"}
          </button>
        </div>
        {showError && (
          <h2 style={{ color: "red", fontSize: 16 }}>
            Κάτι πήγε στραβά, παρακαλούμε δοκιμάστε ξανά.
          </h2>
        )}
      </div>
    </>
  );
};

export default InPersonPage;
