import { useEffect, useState } from "react";
import "../../App.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const [modality, setModality] = useState("");
  const navigate = useNavigate();

  //navigate to the correct page depending on the modality picked
  useEffect(() => {
    switch (modality) {
      case "inperson":
        navigate("in-person");
        break;
      case "online":
        navigate("online");
        break;
    }
  }, [modality]);

  return (
    <>
      {/* Pick modality  */}
      <div className="form-row" id="question-1">
        <div className="form-label">
          <h2>Επίλεξε τρόπο συνάντησης:</h2>
        </div>
        <div className="form-content">
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="modality-btn"
              onClick={() => setModality("inperson")}
            >
              Διά Ζώσης
            </button>
            <button
              className="modality-btn"
              onClick={() => setModality("online")}
            >
              Online (μέσω Google Meet)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
