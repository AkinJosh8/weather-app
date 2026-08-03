function RecentSearches({ recentSearches, handleRecentSearch, handleClearSearches }) {
    if (recentSearches.length === 0) {
    return null
    }
    return (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>

          <div className="recent-search-list">
            {recentSearches.map((search, index) =>(
              <button 
              key={index} 
              onClick={() => handleRecentSearch(search)}>
                {search}
              </button>
            ))}
          </div>
          <button className="clear-searches-btn" 
            onClick={handleClearSearches} >
            Clear All
          </button>
        </div>
    )
}

export default RecentSearches