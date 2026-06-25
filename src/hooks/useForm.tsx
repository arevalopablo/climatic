import { useEffect, useState } from "react";
import getCity from "../services/cities.services";
import getCityTemperature from "../services/temperatures.services";
import { useNavigate } from "react-router-dom";
import type { SelectChangeEvent } from "@mui/material";

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
  const [cityOptions, setCityOptions] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<number | string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getWeather = async (cityId: string) => {
    setShowError("");
    setIsSearching(true);
    try {
      const citySelected = cityOptions.find((city: WeatherData) => city.id.toString() === cityId.toString());

      if (!citySelected) {
        throw new Error("NO SE ENCONTRÓ LA CIUDAD");
      }

      const { latitude, longitude, id, country, country_code, name } = citySelected;
      const extraInfo = await getCityTemperature(latitude, longitude);

      const weatherInfo: WeatherData = {
        id,
        name,
        country,
        country_code,
        ...extraInfo,
      };
      
      setWeatherData(weatherInfo);
      setCityName("");
      setSelectedCity("");
      navigate("/dashboard");
      setCityOptions([]);
      setTimeout(() => {
        setIsSearching(false);
      }, 100);
    } catch (error: any) {
      setShowError(error.message);
      setCityOptions([]);
      throw error;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setCityName(value);
    setShowError("");

    if (value.length <= 1) {
      setCityOptions([]);
      return;
    }
    try {
      const geoResponse = await getCity(value);

      if (!geoResponse.results || !geoResponse.results.length) {
        setCityOptions([]);
        throw new Error("CIUDAD NO ENCONTRADA");
      }
      
      setCityOptions(geoResponse.results);
    } catch (error: any) {
      setShowError(error.message);
      setCityOptions([]);
    }
  };

  const handleCitySelected = async (e: SelectChangeEvent<string | number>) => {
    setShowError("");
    setSelectedCity(e.target.value);
    await getWeather(e.target.value.toString());
  };

  const handleCityChange = (e: SelectChangeEvent<string | number>) => {
    const valueId = e.target.value;
    setSelectedCity(valueId);
    const option = cityOptions.find((city: WeatherData) => city.id === valueId);

    if (!option) return;
    const title = `${option.name}${option.admin1 ? `, ${option.admin1}` : ""}, ${option.country}`;
    setCityName(title);
  };

  const handleSearch = async () => {
    if (!cityName) {
      throw new Error("DEBE INGRESAR UNA CIUDAD");
    }
    await getWeather(selectedCity.toString())
  };

  const handleLocationSearch = () => {
    setIsSearching(true);
    setShowError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const extraData = await getCityTemperature(latitude, longitude);

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`,
          );
          const data = await response.json();
          console.log(data);
          const weatherInfo: WeatherData = {
            id: crypto.randomUUID(),
            country: data.countryName,
            name: data.city,
            country_code: data.countryCode,
            ...extraData,
          };
          setWeatherData(weatherInfo);
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
        if (error.code === 1)
          setShowError("PERMISO DE UBICACIÓN DENEGADO POR EL USUARIO");
        setIsSearching(false);
      },
    );
  };

  return {
    selectedCity,
    cityOptions,
    loading,
    isSearching,
    cityName,
    weatherData,
    showError,
    handleChange,
    handleSearch,
    handleCityChange,
    handleCitySelected,
    handleLocationSearch,
  };
};

export default useForm;
