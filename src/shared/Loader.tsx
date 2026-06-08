import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <Box className={styles.loaderContainer}>
      <CircularProgress aria-label="Loading…" size={60} sx={{color: '#fff'}}/>
    </Box>
  )
}

export default Loader