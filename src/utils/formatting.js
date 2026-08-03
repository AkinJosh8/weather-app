export  const formatForecastDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    })
}

export const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
}

export const getTodayDate = () => {
    return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
    })
}

export const getGreeting = ( ) => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
    return "Good Morning"
    }
    if (hour >= 12 && hour < 17) {
    return "Good Afternoon"
    }
    if (hour >= 17 && hour < 20) {
    return "Good Evening"
    }
    return "Good Night"
}