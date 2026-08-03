import { Typewriter } from "react-simple-typewriter"
import WeatherDetails from "./WeatherDetails"
import { convertTemperature } from "../utils/conversions"
import { getTodayDate, getGreeting } from "../utils/formatting"

function WeatherCard( {weather, unit} ) {
    const today = getTodayDate()
    

    const getRecommendation = () => {
    if (!weather) return ""

    const condition = weather.weather[0].main
    const temp = weather.main.temp

    if (condition === "Rain"){
      return "Looks like rain is expected.\nTake an umbrella before heading out."
    }
    if (condition === "Thunderstorm"){
      return "Stormy weather ahead.\nIt's safer to stay indoors if you can."
    }
    if (condition === "Snow"){
      return "Snow is falling.\nDress warmly and watch your step."
    }
    if (condition === "Clouds") {
      return "Cloudy skies today.\nA light jacket should keep you comfortable."
    }
    if (condition === "Clear" && temp > 30){
      return "It's a hot sunny day.\nStay hydrated and wear sunscreen."
    }
    if (condition === "Clear"){
      return "Beautiful weather today.\nPerfect time for a walk outside."
    }
    return "Stay prepared and enjoy your day."
    }

    return (
        <div className="weather-card">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="greeting">{getGreeting()}</p>
            
          <h2>{weather.name}</h2>
          <p className="date">{today}</p>
          <h1>{convertTemperature(weather.main.temp, unit)} {'\u00b0'}{unit}</h1>

          <p className="description">
            {weather.weather[0].description}
          </p>
          <p className="feels">
            Feels like: {convertTemperature(weather.main.feels_like, unit)} {'\u00b0'}{unit}
          </p>
          <p className="recommendation">
            <Typewriter 
              words={[getRecommendation()]} 
              loop={false} 
              cursor={true} 
              cursorStyle="|" 
              typeSpeed={35} 
              deleteSpeed={0} 
              delay={999999} 
            />
          </p>
          <WeatherDetails
            weather={weather}
            unit={unit}
          />
        </div>
    )
}

export default WeatherCard