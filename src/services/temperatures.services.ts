const getCityTemperature = async (latitude:string, longitude:string) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=auto&hourly=temperature_2m&current=relative_humidity_2m,precipitation,wind_speed_10m,temperature_2m,is_day,weather_code,apparent_temperature`);
    if (!response.ok) throw new Error("Error al realizar la peticion");
    const data = await response.json()
    return data
  } catch (error) {
   console.log(error)
   throw error 
  }
}

export default getCityTemperature