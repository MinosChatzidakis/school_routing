import { useEffect, useState } from "react";
import SearchTable from "../../Components/SearchTable/SearchTable";
const OnlinePage = () => {
  const locations = [
    "Αγία Παρασκευή",
    "Παλλήνη",
    "Γλυκά Νερά",
    "Ανθούσα",
    "Νομισματοκοπείο",
    "Γέρακας",
    "Δάφνη",
    "Άγιος Δημήτριος",
    "Υμηττός",
    "Άλιμος",
    "Άνω Καλαμάκι",
    "Καλαμάκι",
    "Αμπελόκηποι",
    "Νέα Φιλοθέη",
    "Πανόρμου",
    "Λυκαβητός",
    "Γκύζη",
    "Πεντέλη",
    "Νέα Πεντέλη",
    "Βριλήσσια",
    "Μελίσσια",
    "Γαλάτσι",
    "Λαμπρινή",
    "Ψυχικό",
    "Ριζούπολη",
    "Βάρη",
    "Βάρκιζα",
    "Βούλα",
    "Βουλιαγμένη",
    "Γλυφάδα",
    "Ανάβυσσος",
    "Σαρωνίδα",
    "Άνω Γλυφάδα",
    "Ελληνικό",
    "Άνω Ιλίσια",
    "Γουδί",
    "Ζωγράφου",
    "Ιλίσια",
    "Ηλιούπολη",
    "Αργυρούπολη",
    "Άγιοι Ανάργυροι",
    "Ίλιον",
    "Καματερό",
    "Πετρούπολη",
    "Νέα Χαλκηδόνα",
    "Άνω Λιόσσια",
    "Καλλιθέα",
    "Κουκάκι",
    "Μοσχάτο",
    "Πετράλωνα",
    "Ταύρος",
    "Τζιτζιφιές",
    "Αμφιάλη ",
    "Δραπετσώνα",
    "Ελευσίνα",
    "Κερατσίνι",
    "Μάνδρα",
    "Πέραμα",
    "Χαραυγή",
    "Κοκκινιά",
    "Τουρκοβούνια (Κορυδαλλός)",
    "Βοτανικός",
    "Αγία Βαρβάρα",
    "Άγιος Ιωάννης Ρέντη",
    "Κορυδαλλός",
    "Νεάπολη (Εξάρχεια)",
    "Νίκαια",
    "Άνω Κυψέλη",
    "Άγιος Νικόλαος",
    "Ακαδημία Πλάτωνος",
    "Κολωνός",
    "Κυψέλη",
    "Κέντρο",
    "Πολύγωνο",
    "Άγιος Ελευθέριος",
    "Άνοιξη",
    "Δροσιά",
    "Εκάλη",
    "Κηφισιά",
    "Μαρούσι",
    "Νέα Ερυθραία",
    "Παράδεισος",
    "Πεύκη",
    "Θρακομακεδόνες",
    "Λυκόβρυση",
    "Ηράκλειο",
    "Καλογρέζα",
    "Νέα Ιωνία",
    "Περισσός",
    "Νέα Φιλαδέλφεια",
    "Πευκάκια",
    "Αχαρνές",
    "Μενίδι",
    "Άνω Πατήσια",
    "Νέα Σμύρνη",
    "Νέος Κόσμος",
    "Βύρωνας",
    "Καισαριανή",
    "Κολωνάκι",
    "Μετς",
    "Μοναστηράκι",
    "Νέα Ελβετία",
    "Παγκράτι",
    "Κεραμεικός",
    "Άγιος Αρτέμιος",
    "Εξάρχεια",
    "Καρέας",
    "Παλαιό Φάληρο",
    "Βρυώνη",
    "Ευαγγελίστρια",
    "Ζέα",
    "Καλλίπολη",
    "Καμίνια",
    "Καστέλλα / Πειραϊκη",
    "Μικρολίμανο",
    "Νέο Φάληρο",
    "Πασαλιμάνι",
    "Πειραιάς",
    "Προφήτης Ηλίας",
    "Τερψιθέα (Πειραιάς)",
    "Φρεάττυδα",
    "Χατζηκυριάκειο",
    "Μανιάτικα",
    "Αιγάλεω",
    "Μπουρνάζι",
    "Περιστέρι",
    "Κηπούπολη",
    "Ανθούπολη",
    "Χαϊδάρι",
    "Σεπόλια",
    "Φιλοθέη",
    "Χαλάνδρι",
    "Μεταμόρφωση",
    "Πεντάγωνο",
    "Παπάγου",
    "Χολαργός",
    "Νέο Ψυχικό",
    "Πάτρα",
    "Ελληνορώσων",
    "Θησείο",
    "Κατεχάκη",
    "Μεταξουργείο",
    "Πλάκα",
    "Ψυρρή",
    "Ταμπούρια",
    "Λιπάσματα",
    "Κορωπί",
    "Παιανία",
    "Πικέρμι",
    "Σπάτα",
    "Ντράφι",
    "Αγία Μαρίνα (Βάρης)",
    "Μαρκόπουλο",
    "Ραφήνα",
    "Καλύβια",
    "Κερατέα",
    "Αγία Μαρίνα (Ηλιούπολης)",
    "Άγιος Στέφανος",
    "Ασπρόπυργος",
    "Μαραθώνας",
    "Νέα Μάκρη",
    "Διόνυσος",
    "Λαύριο",
    "Μέγαρα",
    "Νέα Πέραμος",
    "Τερψιθέα (Άνω Γλυφάδα)",
    "Νεάπολη (Κορυδαλλός)",
    "Αυλώνα",
    "Αφίδνες",
    "Βίλια",
    "Γηροκομείο",
    "Ερυθρές",
    "Κάλαμος",
    "Καπανδρίτι",
    "Κάραβελ (Caravel)",
    "Λαγονήσι",
    "Μαγούλα",
    "Μαλακάσα",
    "Παλαιά Φώκαια",
    "Σαλαμίνα",
    "Χιλτον (Hilton)",
    "Ωρωπός",
    "Κάντζα",
    "Γούβα",
    "Καλλιμάρμαρο",
    "Κάτω Πατήσια",
    "Ασύρματος",
    "Κοψαχείλα",
    "Χρυσούπολη",
    "Αρτέμιδα",
  ];
  const [area, setArea] = useState("");
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [err, setErr] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const FETCH_URL = "http://localhost:3000/api/get-link";

  const gotoCalendar = async () => {
    try {
      //console.log(`Fetching url for location: ${selectedLocation}`);
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ location: selectedLocation || "Επαρχία" }),
      });

      if (!response.ok) {
        const err = await response.json();
        //console.log(err);
        setErr(err);
        return;
      }
      const dataJ = await response.json();
      const url = dataJ.url;
      setErr("");
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      setErr("Κάτι πήγε στραβά, παρακαλούμε δοκιμάστε ξανά.");
      //console.log(error);
    }
  };

  useEffect(() => {
    if (area === "Αττική") {
      setShowLocationOptions(true);
    } else if (area === "Επαρχία") {
      setShowLocationOptions(false);
    }
  }, [area]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Αττική */}
        <label style={{ cursor: "pointer" }}>
          <input
            type="radio"
            value="Αττική"
            checked={area === "Αττική"}
            onChange={(e) => {
              setSelectedLocation("");
              setArea(e.target.value);
            }}
          />
          Αττική
        </label>
        {/* Επαρχία */}
        <label style={{ cursor: "pointer" }}>
          <input
            type="radio"
            value="Επαρχία"
            checked={area === "Επαρχία"}
            onChange={(e) => {
              setSelectedLocation("");
              setArea(e.target.value);
            }}
          />
          Επαρχία
        </label>
        {showLocationOptions && (
          <div className="form-row" id="question-3-online">
            <div className="form-label">
              <h2>Περιοχή/συνοικία:</h2>
            </div>
            <div className="form-content">
              <SearchTable
                placeholderText={"Επίλεξε τόπο διαμονής"}
                data={locations}
                selection={selectedLocation}
                setSelection={setSelectedLocation}
              />
            </div>
          </div>
        )}
        <button
          className="submit-btn"
          disabled={(area === "Αττική" && selectedLocation === "") || !area}
          onClick={() => {
            gotoCalendar();
          }}
        >
          {area
            ? `Βρες ραντεβού (${selectedLocation || area || ""})`
            : "Βρες ραντεβού"}
        </button>
        {err && (
          <h2 style={{ color: "red", fontSize: 16 }}>
            {err || "Κάτι πήγε στραβά, παρακαλούμε δοκιμάστε ξανά."}
          </h2>
        )}
      </div>
    </>
  );
};

export default OnlinePage;
