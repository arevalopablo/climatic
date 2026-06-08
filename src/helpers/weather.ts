import { WEATHER_ICONS } from "../constants/weather";
import HeartOutline from "../shared/HeartOutline";

interface IconColor {
  min: number;
  max: number;
  day: string;
  night: string;
}

const ICON_COLOR: IconColor[] = [
  { min: 0, max: 0, day: "#FFD600", night: "#E0E0E0" },
  { min: 1, max: 3, day: "#FFFFFF", night: "#B0BEC5" },
  { min: 45, max: 48, day: "#B2EBF2", night: "#90A4AE" },
  { min: 51, max: 65, day: "#40C4FF", night: "#00B0FF" },
  { min: 80, max: 82, day: "#40C4FF", night: "#00B0FF" },
  { min: 71, max: 77, day: "#FFFFFF", night: "#E1F5FE" },
  { min: 85, max: 86, day: "#FFFFFF", night: "#E1F5FE" },
  { min: 95, max: 99, day: "#FFEB3B", night: "#EA80FC" },
];

const getWeatherColor = (code: number, isDay: number): string => {
  const range = ICON_COLOR.find((r) => code >= r.min && code <= r.max);

  if (!range) return "#fff";

  return isDay === 1 ? range.day : range.night;
};

const formatDate = (date: string) => {
  const fecha = new Date(date);

  const result = fecha.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return result.charAt(0).toUpperCase() + result.slice(1);
};

export interface CurrentWeather {
  text: string;
  value: string;
  icon: string | React.ComponentType<any> | (() => React.JSX.Element)
  color: string;
}

type WeatherMetrics = Record<
  | "apparent_temperature"
  | "relative_humidity_2m"
  | "precipitation"
  | "wind_speed_10m",
  number
>;

interface CurrentInfoProps extends WeatherMetrics {
  daily: {
    sunrise?: string[];
    sunset?: string[];
    [key: string]: any;
  };
}

const getCurrentInfo = ({
  daily,
  ...data
}: CurrentInfoProps): CurrentWeather[] => {
  const { sunrise = [], sunset = [] } = daily;
  return [
    {
      text: "Tiempo actual en",
      value: 'Add Fav',
      icon: HeartOutline,
      color: "red",
    },
    {
      text: "Sensación térmica",
      value: `${data.apparent_temperature}°C`,
      icon: "wi-thermometer-exterior",
      color: "#FF8C69",
    },
    {
      text: "Humedad",
      value: `${data.relative_humidity_2m}%`,
      icon: "wi-humidity",
      color: "#40E0D0",
    },
    {
      text: "Precipitación",
      value: `${data.precipitation}mm`,
      icon: "wi-raindrop",
      color: "#6495ED",
    },
    {
      text: "Viento",
      value: `${data.wind_speed_10m}km/h`,
      icon: "wi-strong-wind",
      color: "#B0C4DE",
    },
    {
      text: "Salida del sol",
      value: `${sunrise[0].split("T")[1]} am`,
      icon: "wi-sunrise",
      color: "#FFDB58",
    },
    {
      text: "Puesta del sol",
      value: `${sunset[0].split("T")[1]} pm`,
      icon: "wi-sunset",
      color: "#F4A460",
    },
  ];
};

interface DailyData {
  maxTemp?: number[];
  minTemp?: number[];
  icon?: number[];
  date?: string[];
  [key: string]: any;
}

const getDailyWeather = (dailyData: DailyData) => {
  const extendedWeather = Object.values(dailyData).map((arr) => arr.slice(1));
  const [dates, maxTemp, minTemp, icon] = extendedWeather;

  return dates.map((date: string, index: number) => {
    const format = new Date(`${date}T00:00`);

    const result = format.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
    });

    return {
      id: index,
      day: result.toUpperCase(),
      maxTemp: maxTemp[index],
      minTemp: minTemp[index],
      icon: WEATHER_ICONS[icon[index]][0],
    };
  });
};

const getHomeBackground = () => {
  const images = 6
  const randomIndex = Math.floor(Math.random() * images) + 1;
  return `img/bgc${randomIndex}.jpg`
};

export {
  getWeatherColor,
  formatDate,
  getCurrentInfo,
  getDailyWeather,
  getHomeBackground,
};
