const getUniqueDates = (forecastList) => {
    const dates = forecastList.map((item) => item.dt_txt.split(" ")[0])

    return [...new Set(dates)]
}

const getDailyForecast = (forecastList) => {
    const uniqueDates = getUniqueDates(forecastList)

    const fiveDays = uniqueDates.slice(0, 5)

    return fiveDays.map((date) => {
      const dayForecast = forecastList.find((item) => {
        return(
          item.dt_txt.startsWith(date) &&
          item.dt_txt.includes("12:00:00")
        )
      })
      return ( dayForecast || forecastList.find((item) => 
        item.dt_txt.startsWith(date)
      )) 
    })
    .filter(Boolean)
}

export const fetchForecast = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
  const response = await fetch(url)
  const data = await response.json()
     
  const dailyForecast = getDailyForecast(data.list)
      
    return dailyForecast
}
