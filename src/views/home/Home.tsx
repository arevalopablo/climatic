import styles from "./Home.module.css";
import Input from "../../components/input/Input";
import Loader from "../../shared/Loader";
import { useWeatherContext } from "../../context/WeatherContext";
import { getHomeBackground } from "../../helpers/weather";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

const Home = () => {
  const [bg] = useState<string>(getHomeBackground);
  const {
    loading,
    isSearching,
    cityName,
    handleChange,
    handleChangeEnter,
    showError,
    handleLocationSearch,
  } = useWeatherContext();

  useEffect(() => {
    handleLocationSearch();
  }, []);

  const showLoader = loading || isSearching;

  return (
    <Grid
      container
      className={styles.homeView}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${bg || ""}")`,
      }}
    >
      <Grid size={12}>
        {showLoader ? (
          <Loader />
        ) : (
          <Input
            id="city"
            type="text"
            name="city"
            placeholder="Buscar clima de tu ciudad..."
            value={cityName}
            onChange={handleChange}
            onKeyDown={handleChangeEnter}
            showError={showError}
            className={"homeSearch"}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
