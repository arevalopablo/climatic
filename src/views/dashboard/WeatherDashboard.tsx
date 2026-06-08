import Box from "@mui/material/Box";
import styles from "./WeatherDashboard.module.css";
import { Grid } from "@mui/material";
import cityImages from "../../constants/backgroundCountry";
import Navbar from "../../components/navbar/Navbar";
import { useWeatherContext } from "../../context/WeatherContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../shared/Loader";

const WeatherDashboard = () => {
  const navigate = useNavigate();
  const { weatherData, isSearching } = useWeatherContext();

  useEffect(() => {
    if (!weatherData) {
      navigate("/");
    }
  }, [weatherData]);

  if (!weatherData) return null;

  const { country_code } = weatherData;

  return (
    <Box
      className={styles.weatherDashboard}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${cityImages[country_code?.toLowerCase()] || "/img/globe.jpg"}")`,
      }}
    >
      {isSearching ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Grid container sx={{ flexGrow: 1}}>
            <Outlet />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default WeatherDashboard;
