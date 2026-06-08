interface weatherTypes {
  [key:string]: string[]
}

const WEATHER_ICONS: weatherTypes = {
  0: ["wi-day-sunny", "wi-night-clear", "Cielo despejado"],
  1: ["wi-day-cloudy", "wi-night-alt-cloudy", "Principalmente despejado"],
  2: ["wi-day-cloudy", "wi-night-alt-cloudy", "Parcialmente nublado"],
  3: ["wi-cloudy", "wi-cloudy", "Cubierto"],
  45: ["wi-day-fog", "wi-night-fog", "Niebla"],
  48: ["wi-day-fog", "wi-night-fog", "Niebla de escarcha"],
  51: ["wi-day-showers", "wi-night-alt-showers", "Llovizna ligera"],
  53: ["wi-day-showers", "wi-night-alt-showers", "Llovizna moderada"],
  55: ["wi-day-showers", "wi-night-alt-showers", "Llovizna densa"],
  61: ["wi-day-rain", "wi-night-alt-rain", "Lluvia débil"],
  63: ["wi-day-rain", "wi-night-alt-rain", "Lluvia moderada"],
  65: ["wi-day-rain", "wi-night-alt-rain", "Lluvia fuerte"],
  71: ["wi-day-snow", "wi-night-alt-snow", "Nevada leve"],
  73: ["wi-day-snow", "wi-night-alt-snow", "Nevada moderada"],
  75: ["wi-day-snow", "wi-night-alt-snow", "Nevada fuerte"],
  77: ["wi-day-snow", "wi-night-alt-snow", "Granizos de nieve"],
  80: ["wi-day-showers", "wi-night-alt-showers", "Lluvias breves leves"],
  81: ["wi-day-showers", "wi-night-alt-showers", "Lluvias breves moderadas"],
  82: ["wi-day-showers", "wi-night-alt-showers", "Lluvias breves violentas"],
  85: ["wi-day-snow", "wi-night-alt-snow", "Chubascos de nieve leves"],
  86: ["wi-day-snow", "wi-night-alt-snow", "Chubascos de nieve fuertes"],
  95: ["wi-day-thunderstorm", "wi-night-alt-thunderstorm", "Tormenta eléctrica"],
  96: ["wi-day-sleet", "wi-night-alt-sleet", "Tormenta con granizo ligero"],
  99: ["wi-day-sleet", "wi-night-alt-sleet", "Tormenta con granizo fuerte"],
};

export { WEATHER_ICONS }
