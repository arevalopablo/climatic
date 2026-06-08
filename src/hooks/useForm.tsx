import { useEffect, useState } from "react";
import getCity from "../services/cities.services";
import getCityTemperature from "../services/temperatures.services";
import { useNavigate } from "react-router-dom";

export interface WeatherData {
  id: number;
  name: string;
  country: string;
  country_code: string;
  [key: string]: any;
}

const useForm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [showError, setShowError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getWeather = async (city: string) => {
    setShowError("");
    try {
      const geoResponse = await getCity(city);
      if (!geoResponse.results || !geoResponse.results.length) {
        throw new Error("CIUDAD NO ENCONTRADA");
      }
      const { latitude, longitude, id, name, country, country_code } =
        geoResponse.results[0];
      const cityDataTemp = await getCityTemperature(latitude, longitude);

      const weatherInfo: WeatherData = {
        id,
        name,
        country,
        country_code,
        ...cityDataTemp,
      };
      setWeatherData(weatherInfo);
      return weatherInfo;
    } catch (error: any) {
      setShowError(error.message);
      throw error;
    }
  };

  const handleSearch = async () => {
    const city = cityName.trim().toLowerCase();
    if (!city) {
      setShowError("DEBE INGRESAR UNA CIUDAD");
      return;
    }
    setIsSearching(true);
    try {
      await getWeather(city);
      setCityName("");
      navigate("/dashboard");
      setTimeout(() => {
        setIsSearching(false);
      }, 100);
    } catch (error: any) {
      setShowError(error.message);
      setIsSearching(false);
    }
  };

  const handleChangeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleLocationSearch = () => {
    setIsSearching(true);
    setShowError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`,
          );
          const data = await response.json();
          if (!data || !data.city) {
            throw new Error("CIUDAD NO ENCONTRADA DESDE TU UBICACIÓN");
          }
          const weatherInfo = await getWeather(data.city.toLowerCase());
          if (!weatherInfo) {
            throw new Error("CIUDAD NO ENCONTRADA");
          }
          navigate("/dashboard");
          setTimeout(() => {
            setIsSearching(false);
          }, 100);
        } catch (error: any) {
          setShowError(error.message);
          setIsSearching(false);
        }
      },
      (error) => {
        if (error.code === 1) setShowError("PERMISO DE UBICACIÓN DENEGADO POR EL USUARIO");
        setIsSearching(false);
      },
    );
  };

  return {
    loading,
    isSearching,
    cityName,
    weatherData,
    showError,
    handleSearch,
    handleChange,
    handleChangeEnter,
    handleLocationSearch
  };
};

export default useForm;
