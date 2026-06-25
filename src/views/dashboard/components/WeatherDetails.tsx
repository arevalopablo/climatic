import { Box, type SelectChangeEvent } from "@mui/material";
import styles from "./WeatherDetails.module.css";
import Input from "../../../components/input/Input";
import WeatherExtended from "../../../components/WeatherExtended";
import DailyWeather, {
  type DailyWeatherConfig,
} from "../../../components/DailyWeather";
import SearchIcon from "../../../shared/SearchIcon";
import type { CurrentWeather } from "../../../helpers/weather";
import type { WeatherData } from "../../../hooks/useForm";
import DropDownFilter from "../../../components/dropdownFilter/DropDownFilter";

interface WeatherDetailsProps {
  cityName: string;
  cityOptions: WeatherData[];
  showError: string;
  selectedCity: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCitySelected: (e: SelectChangeEvent<string | number>) => void;
  onClick: () => void;
  name: string;
  currentInfo: CurrentWeather[];
  dailyDataExtended: DailyWeatherConfig[];
  is_day: number;
}

const WeatherDetails = (props: WeatherDetailsProps) => {
  const {
    cityName,
    cityOptions,
    selectedCity,
    currentInfo,
    dailyDataExtended,
    is_day,
    name,
    handleCitySelected,
    onChange,
    onClick,
    showError,
  } = props;

  return (
    <Box className={styles.weatherDetailsContainer}>
      <Input
        className="weatherDashboardSearch"
        placeholder="Buscar ciudad..."
        value={cityName}
        Icon={SearchIcon}
        showError={showError}
        onChange={onChange}
        onClick={onClick}
      />
      {!!cityOptions.length && (
        <DropDownFilter
          name="ciudades"
          value={selectedCity}
          width="100%"
          label={cityOptions[0]?.name}
          options={cityOptions}
          onChange={handleCitySelected}
        />
      )}
      <WeatherExtended title={name} currentData={currentInfo} />
      <DailyWeather dailyWeather={dailyDataExtended} is_day={is_day} />
    </Box>
  );
};

export default WeatherDetails;
