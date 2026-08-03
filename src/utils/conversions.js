export const convertTemperature = (temp, unit) => {
    if (unit === "C") {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  }

export const convertWindSpeed = (speed, unit) => {
    if (unit === "C") {
      return Math.round(speed); 
    } 
    return Math.round(speed * 2.237); 
  }

export const convertVisibility = (visibility, unit) => {
    if (unit === "C") {
      return (visibility / 1000).toFixed(1); 
    } 
    return (visibility / 1609.34).toFixed(1); 
  }
