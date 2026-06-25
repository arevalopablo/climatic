import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type FavouritesProps = Record<"name" | "country" | "country_code", string>;

export interface Favourites extends FavouritesProps {
  id: number;
  temperature: number;
}

const useFavourites = () => {
  const [favourites, setFavourites] = useState<Favourites[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const addToFavourites = (favCity: Favourites) => {
    const isAddedFav = favourites?.some((added) => added.id === favCity.id);
    if (!isAddedFav) {
      setFavourites([...favourites, favCity]);
    }
  };

  const removeFromFavourites = (id: number) => {
    const filtered = favourites.filter((favCity: Favourites) => favCity.id !== id );
    setFavourites(filtered);
  };

  const handleSortChange = (e: SelectChangeEvent<string | number>) => {
    setSortBy(e.target.value.toString());
    sortFavourites(e.target.value.toString())
  };

  const sortFavourites = (option: string) => {
    const sortedFavourites = [...favourites];
    switch (option) {
      case "Ciudad":
        sortedFavourites.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "País":
        sortedFavourites.sort((a, b) => a.country.localeCompare(b.country));
        break;
      case "Máx Temp":
        sortedFavourites.sort((a, b) => b.temperature - a.temperature);
        break;
      default:
        sortedFavourites.sort((a, b) => a.temperature - b.temperature);
    }
    setFavourites(sortedFavourites);
  };

  return {
    sortBy,
    favourites,
    addToFavourites,
    removeFromFavourites,
    handleSortChange,
    sortFavourites,
  };
};

export default useFavourites;
