export const getBackground = (weather) => {
    if(!weather) return "default"
    
    const condition = weather.weather[0].main
    switch(condition){
      case "Clear":
        return "sunny"
      case "Clouds":
        return "cloudy"
      case "Rain":
        return "rainy"
      case "Snow":
        return "snow"
      case "Thunderstorm":
        return "storm"
      default:
        return "default"
    }
  }