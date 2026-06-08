import { Box, Typography } from "@mui/material";
import styles from "./WeatherExtended.module.css";
import { type SVGProps } from "react";
import HeartFill from "../shared/HeartFill";
import { useWeatherContext } from "../context/WeatherContext";

interface WeatherDataCurr {
  text: string;
  value: string;
  icon: string | React.ComponentType<any>;
  color: string;
}

export interface WeatherExtendedProps {
  title: string;
  currentData: WeatherDataCurr[];
}

const WeatherExtended = (props: WeatherExtendedProps) => {
  const { title, currentData } = props;
  const { addToFavourites, removeFromFavourites, weatherData, favourites } = useWeatherContext();

  if (!weatherData) return null

  const {id, name, country, country_code, current: { temperature_2m }} = weatherData

  const fav = {
  id, name, country, country_code, temperature: temperature_2m
  }

  const isInFavourites = favourites?.some((item) => item.id === id) ?? false;

  return (
    <Box className={styles.currentWeatherContainer}>
      <Box>
        {currentData.map(({ text, value, icon, color }, index) => {
          const Icono = icon as unknown as React.ComponentType<
            SVGProps<SVGSVGElement>
          >;
          const isFirst = index === 0;
          const typographyStyles = {
            variant: isFirst ? ("h6" as const) : ("body1" as const),
            sx: {
              fontSize: !isFirst ? "18px" : "",
              fontWeight: isFirst ? "400" : "",
            },
          };

          return (
            <Box key={index} className={styles.currentWeatherStats}>
              <Box className={styles.infoWrapper}>
                <Typography
                  variant={typographyStyles.variant}
                  sx={typographyStyles.sx}
                >
                  {isFirst ? `${text} ${title}` : text}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                  {isFirst && isInFavourites ? "Remove Fav" : value}
                </Typography>
              </Box>
              <Box className={styles.iconContainer}>
                {typeof icon === "string" ? (
                  <i style={{ color: color }} className={`wi ${icon}`}></i>
                ) : !isInFavourites ? (
                  <Icono className={styles.iconHeart} onClick={() => addToFavourites(fav)} />
                ) : (
                  <HeartFill className={styles.iconHeart} onClick={() => removeFromFavourites(fav.id)} />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeatherExtended;
