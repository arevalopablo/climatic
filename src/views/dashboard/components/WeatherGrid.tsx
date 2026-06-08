import { Grid } from "@mui/material";
import CurrentWeather from "../../../components/CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import { WEATHER_ICONS } from "../../../constants/weather";
import { getWeatherColor, formatDate, getCurrentInfo, getDailyWeather } from "../../../helpers/weather";
import styles from './WeatherGrid.module.css'
import { useWeatherContext } from "../../../context/WeatherContext";

const WeatherGrid = () => {
  const { cityName, showError, weatherData, handleChange, handleChangeEnter, handleSearch, } = useWeatherContext()

  if (!weatherData) return null

  const { name, country, current: { time, temperature_2m, weather_code, is_day },} = weatherData

  const date = formatDate(time);
  const currentInfo = getCurrentInfo({
    ...weatherData.current,
    daily: weatherData.daily,
  });
  const dailyDataExtended = getDailyWeather(weatherData.daily);

  return (
    <>
      <Grid size={6} className={styles.weatherCurrent}>
        <CurrentWeather
          name={name}
          country={country}
          date={date}
          temperature_2m={temperature_2m}
          iconColor={getWeatherColor(weather_code, is_day)}
          className={WEATHER_ICONS[weather_code][is_day === 1 ? 0 : 1]}
          description={WEATHER_ICONS[weather_code][2]}
        />
      </Grid>
      <Grid size={6} className={styles.weatherDetails}>
        <WeatherDetails
          cityName={cityName}
          showError={showError}
          onChange={handleChange}
          onKeyDown={handleChangeEnter}
          onClick={handleSearch}
          currentInfo={currentInfo}
          dailyDataExtended={dailyDataExtended}
          is_day={is_day}
          name={name}
        />
      </Grid>
    </>
  );
};

export default WeatherGrid;
