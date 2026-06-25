import { Box, Typography } from "@mui/material";
import styles from "./CurrentWeather.module.css";

interface CurrentWeatherProps {
  country: string;
  country_code: string;
  name: string;
  temperature_2m: number;
  date: string;
  iconColor: string;
  className: string;
  description: string;
}

const CurrentWeather = (props: CurrentWeatherProps) => {
  const {
    temperature_2m,
    country,
    name,
    country_code,
    date,
    iconColor,
    description,
    className,
  } = props;
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
      <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Typography variant="h3">
        {name}, {country}
      </Typography>
      <Box
      sx={{ml: '10px'}}
        component={"img"}
        src={`https://flagcdn.com/${country_code?.toLowerCase()}.svg`}
        width="60"
        alt={`${country_code}-flag`}
      />

      </Box>
      <Typography variant="h5" sx={{ fontWeight: "300", fontSize: "20px" }}>
        {date}
      </Typography>
    </Box>
  );
};

export default CurrentWeather;
