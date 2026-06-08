import { Box } from '@mui/material'
import styles from './DailyWeather.module.css'
import Card from './card/Card'

export interface DailyWeatherConfig {
    id: number,
    day: string,
    maxTemp: number,
    minTemp: number,
    icon: string,
    [key: string]: any;
}

interface ExtendedProps {
  dailyWeather: DailyWeatherConfig[],
  is_day: number
}

const DailyWeather = (props: ExtendedProps) => {
  const { is_day, dailyWeather } = props
  
  return (
    <Box className={styles.dailyWeather}>
      <Box className={styles.cardSection}>
        {dailyWeather.map(({ id, day, maxTemp, minTemp, icon }) => (
          <Card key={id} day={day} maxTemp={maxTemp} minTemp={minTemp} icon={icon} is_day={is_day}/>
        ))}
      </Box>
    </Box>
  )
}

export default DailyWeather