import { useState, useEffect, useRef } from "react";
import stringSimilarity from "string-similarity";
import "./SearchTable.css";

const SearchTable = ({
  placeholderText = "-επίλεξε περιοχή-",
  data = [],
  selection = "",
  setSelection = () => {},
  includeFallBack = true,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useRef(null);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  function looksLike(str1, str2, threshold = 0.4) {
    const similarity = stringSimilarity.compareTwoStrings(
      str1.toLowerCase(),
      str2.toLowerCase(),
    );
    return similarity >= threshold;
  }

  const filteredData = data.filter((greek) => {
    const normalizedData = removeAccents(greek.toLowerCase());
    const normalizedSearch = removeAccents(searchTerm.toLowerCase());

    return (
      normalizedData.includes(normalizedSearch) ||
      looksLike(normalizedSearch, greek)
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the referenced container, close the options
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={containerRef}>
      <input
        id="song-search"
        type="text"
        className="search-input"
        placeholder={searchTerm || placeholderText}
        value={searchTerm}
        onChange={(e) => setSearchTerm?.(e.target.value)}
        onClick={() => setShowOptions(true)}
      />

      {showOptions && (
        <div className="options-table">
          {filteredData.length > 0
            ? filteredData
                .sort((a, b) => a.localeCompare(b, "el"))
                .map((greek, i) => (
                  <div
                    key={i}
                    className={`dropdown-item ${selection === greek ? "selected" : ""}`}
                    onClick={() => {
                      setSelection(greek);
                      setSearchTerm(greek);
                      setShowOptions(false);
                    }}
                  >
                    <h3 className="cardTitle">{greek}</h3>
                  </div>
                ))
            : includeFallBack && (
                <div
                  className={`dropdown-item fallbackOption ${selection === "Άλλο" ? "selected" : ""}`}
                  onClick={() => {
                    setSelection("Άλλο");
                    setSearchTerm("Άλλο");
                    setShowOptions(false);
                  }}
                >
                  <h3 className="cardTitle">Άλλο</h3>
                </div>
              )}
        </div>
      )}
    </div>
  );
};

export default SearchTable;
