const getCity = async (city:string) => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=es&format=json`)
    if (!response.ok) throw new Error("Error al realizar la peticion");
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getCity