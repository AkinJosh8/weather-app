import ForecastCard from "./ForecastCard"

function Forecast({ forecast, unit }) {
  return (
    <div className="forecast-container">
      <h2>Upcoming Forecast</h2>

      <div className="forecast-list">
        {forecast.map((day, index) => (
          <ForecastCard
            key={index}
            day={day}
            unit={unit}
          />
        ))}
      </div>
    </div>
  )
}

export default Forecast