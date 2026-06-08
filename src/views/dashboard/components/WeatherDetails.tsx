import { Box } from "@mui/material";
import styles from "./WeatherDetails.module.css";
import Input from "../../../components/input/Input";
import WeatherExtended from "../../../components/WeatherExtended";
import DailyWeather, { type DailyWeatherConfig } from "../../../components/DailyWeather";
import SearchIcon from "../../../shared/SearchIcon";
import type { CurrentWeather } from "../../../helpers/weather";

interface WeatherDetailsProps {
  cityName: string;
  showError: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
  name: string;
  currentInfo: CurrentWeather[]; 
  dailyDataExtended: DailyWeatherConfig[];
  is_day: number;
}

const WeatherDetails = (props: WeatherDetailsProps) => {
  const {cityName, currentInfo, dailyDataExtended, is_day,name, onChange, onClick, onKeyDown, showError} = props
  
  return (
    <Box className={styles.weatherDetailsContainer}>
      <Input
        className="weatherDashboardSearch"
        placeholder="Buscar ciudad..."
        value={cityName}
        Icon={SearchIcon}
        showError={showError}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
      />
      <WeatherExtended
        title={name}
        currentData={currentInfo}
      />
      <DailyWeather dailyWeather={dailyDataExtended} is_day={is_day} />
    </Box>
  );
};

export default WeatherDetails;
