import { Box, Typography } from "@mui/material";
import styles from './CurrentWeather.module.css'

interface CurrentWeatherProps {
  country: string;
  name: string;
  temperature_2m: number;
  date: string;
  iconColor: string;
  className: string
  description: string
}

const CurrentWeather = (props: CurrentWeatherProps) => {
  const { temperature_2m, country, name, date, iconColor, description, className } = props
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <span className={styles.tempCurrent}>{temperature_2m}°C</span>
        <i
          style={{
            fontSize: "55px",
            color: iconColor,
          }}
          className={`wi ${className}`}
        ></i>
      </Box>

      <Typography variant="body1" sx={{ fontSize: "18px" }}>
        {description}
      </Typography>
      <Typography variant="h3">
        {name}, {country}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "300", fontSize: "20px" }}>
        {date}
      </Typography>
    </Box>
  );
};

export default CurrentWeather;
