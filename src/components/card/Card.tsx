import { Box, Typography } from "@mui/material"
import styles from './Card.module.css'

interface CardConfig {
  day: string,
  maxTemp: number,
  minTemp: number,
  icon: string,
  is_day: number,
}

const Card = (props: CardConfig) => {
  const { day, maxTemp, minTemp, icon, is_day } = props

  return (
      <Box className={`${styles.dailyCard} ${is_day === 1 ? styles.cardDay : styles.cardNight}`}>
        <Typography variant="body1">{day}</Typography>
        <i className={`wi ${icon} ${styles.cardIcon}`}></i>
        <Box>
          <Typography variant="body1">Máx</Typography>
          <Typography variant="body1">{maxTemp}°C</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Mín</Typography>
          <Typography variant="body1">{minTemp}°C</Typography>
        </Box>
      </Box>
  )
}

export default Card