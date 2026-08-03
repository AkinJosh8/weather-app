function SearchBar({ city, setCity, handleSearch, handleCurrentLocation, loading, unit, setUnit }) {
    return (
        <div className="search-box">

      <div className="search-actions">
        <input 
          type="text" 
          placeholder="Enter city" 
          value={city} 
          onChange={ (e) => setCity(e.target.value) }
          onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch()
        }
      }} 
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? ( 
          <>
            <span className="spinner"></span> 
            Searching...
          </>
          ) : (
          "Search"
        )}
      </button>

      <button 
        className="location-btn" 
        onClick={handleCurrentLocation} 
        disabled={loading}
      >
        {loading ? "Getting Location..." : "Current Location"}
      </button>
      </div>

      <div className="unit-toggle">
        <button 
          className={unit === "C" ? "active-unit" : ""} 
          onClick={() => setUnit("C")}
        >
          °C
        </button>

        <button 
        className={unit === "F" ? "active-unit" : ""} 
        onClick={() => setUnit("F")}
        >
          °F
        </button>
      </div>

      </div>
    )
}

export default SearchBar