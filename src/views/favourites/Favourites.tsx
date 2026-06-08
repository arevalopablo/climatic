import { Box, Card, Grid, Typography } from "@mui/material";
import { useWeatherContext } from "../../context/WeatherContext";
import styles from "./Favourites.module.css";
import cityImages from "../../constants/backgroundCountry";
import Delete from "../../shared/Delete";
import DropDownFilter from "../../components/dropdownFilter/DropDownFilter";

const Favourites = () => {
  const { favourites, sortBy, removeFromFavourites, handleSortChange } =
    useWeatherContext();

  return (
    <Grid container className={styles.favouritesContainer}>
      {!favourites.length ? (
        <Typography variant="h4">Not favourites yet</Typography>
      ) : (
        <>
          <DropDownFilter
            label="Filtrar por"
            value={sortBy}
            onChange={handleSortChange}
            options={["Ciudad", "País", "Máx Temp", "Mín Temp"]}
          />
          {favourites.map((city) => (
            <Card
              key={city.id}
              className={styles.card}
              sx={{
                backgroundImage: `url("${cityImages[city.country_code?.toLowerCase()] || "/img/globe.jpg"}")`,
              }}
            >
              <Box className={styles.deleteIconContainer}>
                <Delete
                  className={styles.deleteIcon}
                  onClick={() => removeFromFavourites(city.id)}
                />
              </Box>
              <Box className={styles.cardData}>
                <Typography variant="h5" sx={{ fontSize: "30px" }}>
                  {city.temperature}°C
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                  {city.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", mr: "5px" }}
                  >
                    {city.country}
                  </Typography>
                  <Box
                    component={"img"}
                    src={`https://flagcdn.com/${city.country_code.toLowerCase()}.svg`}
                    width="30"
                    alt={`${city.name}-flag`}
                  />
                </Box>
              </Box>
            </Card>
          ))}
        </>
      )}
    </Grid>
  );
};

export default Favourites;
