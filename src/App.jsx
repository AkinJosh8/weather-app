import { useEffect, useState } from "react"
import './App.css'
import Forecast from "./components/Forecast"
import WeatherCard from "./components/WeatherCard"
import SearchBar from "./components/SearchBar"
import RecentSearches from "./components/RecentSearches"
import { fetchForecast } from "./services/forecastService"
import { getWeather } from "./services/weatherService"
import { getBackground } from "./utils/weatherHelpers"
import LoadingSkeleton from "./components/LoadingSkeleton"

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [unit, setUnit] = useState("C")
  const [recentSearches, setRecentSearches] = useState([])
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])
  useEffect(() => {
    if (weather) {
      document.title = `Weather \u2022 ${weather.name}`
    } else {
      document.title = "Weather App"
    }
  }, [weather])

  const handleWeatherSearch = async (url) => {
    setLoading(true)
    setError("")
    setWeather(null)
    setForecast([])

    try {
      
      const data = await getWeather(url)

    if (data.cod !== 200) {
      setError("Couldn't find that city. Try another spelling.")
      setForecast([])
      return
    }
    setWeather(data)

     try {
      const dailyForecast = await fetchForecast(
        data.coord.lat,
        data.coord.lon
      )

      setForecast(dailyForecast)
    } catch (error) {
      setError("Failed to fetch forecast data. Please try again later.")
    }
    
    const cityName = data.name
    setRecentSearches((previousSearches) => {
      const updatedSearches = [
        cityName, 
        ...previousSearches.filter( 
          (search) => 
            search &&
            search.toLowerCase() !== cityName.toLowerCase()
        )
      ]
      
      localStorage.setItem(
        "recentSearches", JSON.stringify(updatedSearches)
      )
      return updatedSearches
    })

    } 
    catch (error) {
    setError ("Something went wrong. Please try again later.")
    } 
    finally {
    setLoading(false)
    } 
  }
  const handleClearSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

   const handleRecentSearch = (recentCity) => {
    setCity(recentCity)
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${recentCity}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    handleWeatherSearch(url)
  }

  const handleSearch = () => {
    if (!city.trim()) {
      setError("Please enter a city")
      return
    } 
  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
  handleWeatherSearch(url)
  }

   const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on your browser")
      return
    }
    setLoading(true)
    setError("")
    setWeather(null)

    navigator.geolocation.getCurrentPosition( (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    
    handleWeatherSearch(url)
    },
      (error) => {
      setLoading(false)
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setError("Location permission denied.")
          break
        case error.POSITION_UNAVAILABLE:
          setError("Location unavailable.")
          break
        case error.TIMEOUT:
          setError("Location request timed out. Please try again.")
          break
        default:
          setError("Unable to get your location.")
      }
      
    })
  }


  return (
    <div className={`app ${getBackground(weather)}`}>
      <div className="app-header">
        <h1>My Weather App</h1>

        <p className="subtitle">
          Search weather anywhere in the world
        </p>
      </div>

      <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleCurrentLocation={handleCurrentLocation}
        loading={loading}
        unit={unit}
        setUnit={setUnit}
      />
      <RecentSearches
        recentSearches={recentSearches}
        handleRecentSearch={handleRecentSearch}
        handleClearSearches={handleClearSearches}
      />
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
      {loading ? (
        <LoadingSkeleton />
          ) : (
          weather && (
        <WeatherCard
          weather={weather}
          unit={unit}
        />
        )
      )}
      <hr className="section-divider" />
      {forecast.length > 0 && (
        <Forecast
          forecast={forecast}
          unit={unit}
        />
      )}
  </div>
  )
}

export default App