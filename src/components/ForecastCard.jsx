import { convertTemperature } from "../utils/conversions"
import { formatForecastDate } from "../utils/formatting"

function ForecastCard({ day, unit}) {
   

  return (
    <div className="forecast-card">
      <p>{formatForecastDate(day.dt_txt)}</p>

      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.weather[0].description}
      />

      <h3>
        {convertTemperature(day.main.temp, unit)} {'\u00b0'}{unit}
      </h3>

      <p>{day.weather[0].description}</p>
    </div>
  )
}

export default ForecastCard