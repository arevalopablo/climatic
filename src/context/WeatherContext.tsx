import { createContext, useContext, type ReactNode } from "react";
import useForm, { type WeatherData } from "../hooks/useForm";
import useFavourites, { type Favourites } from "../hooks/useFavourites";
import type { SelectChangeEvent } from "@mui/material";

interface WeatherContextProps {
  loading: boolean;
  isSearching: boolean;
  cityName: string;
  weatherData: WeatherData | null;
  showError: string;
  favourites: Favourites[];
  sortBy: string;
  selectedCity: number | string,
  cityOptions: WeatherData[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  handleSortChange: (e: SelectChangeEvent<string | number>) => void;
  handleCitySelected: (e: SelectChangeEvent<string | number>) => void;
  handleCityChange: (e: SelectChangeEvent<string | number>) => void;
  addToFavourites: (favCity: Favourites) => void;
  removeFromFavourites: (favCity: Favourites["id"]) => void;
  handleLocationSearch: () => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined,
);

const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const data = useForm();
  const fav = useFavourites();

  return (
    <WeatherContext value={{ ...data, ...fav }}>{children}</WeatherContext>
  );
};

const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error(
      "useWeatherContext debe usarse dentro de un WeatherProvider",
    );

  return context;
};

export { useWeatherContext, WeatherProvider };
