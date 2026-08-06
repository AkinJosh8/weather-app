import { WiHumidity, WiStrongWind, WiFog, WiThermometer, WiHot, WiBarometer, WiSunrise, WiSunset } from "react-icons/wi"
import {  convertTemperature, convertWindSpeed, convertVisibility  } from "../utils/conversions"
import { formatTime } from "../utils/formatting"

function WeatherDetails( {weather, unit}) {
    
    return (
        <div className="details">
          <div className="detail-item">
              <WiSunrise size={50} /> 
                <div>
                  <span>Sunrise</span> <strong>{formatTime(weather.sys.sunrise)}</strong>
                </div>
            </div>
            <div className="detail-item">
              <WiSunset size={50} /> 
                <div>
                  <span>Sunset</span> <strong>{formatTime(weather.sys.sunset)}</strong>
                </div>
            </div>
            <div className="detail-item">
              <WiHumidity size={50} />
                <div>
                  <span>Humidity</span> <strong>{weather.main.humidity}%</strong>
                </div>
            </div>

            <div className="detail-item">
              <WiStrongWind size={50} /> 
                <div>
                  <span>Wind Speed</span> <strong>{convertWindSpeed(weather.wind.speed, unit)} {unit === "C" ? "m/s" : "mph"}</strong>
                </div>
            </div>
            <div className="detail-item">
              <WiBarometer size={50} /> 
                <div>
                  <span>Pressure</span> <strong>{weather.main.pressure} hPa</strong>
                </div>
            </div>
            <div className="detail-item">
              <WiFog size={50} /> 
                <div>
                  <span>Visibility</span> <strong>{convertVisibility(weather.visibility, unit)} {unit === "C" ? "km" : "miles"}</strong>
                </div>
            </div>
            <div className="detail-item">
              <WiThermometer size={50} />  
                <div>
                  <span>Min Temperature</span> <strong>{convertTemperature(weather.main.temp_min, unit)} {'\u00b0'}{unit}</strong>
                </div>
            </div>
            <div className="detail-item">
              <WiHot size={50} /> 
                <div>
                  <span>Max Temperature</span> <strong>{convertTemperature(weather.main.temp_max, unit)} {'\u00b0'}{unit}</strong>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails