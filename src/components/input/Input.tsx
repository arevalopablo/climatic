import { type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import { Box, Typography } from "@mui/material";

export interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showError: string;
  className: string;
  Icon?: React.ElementType;
  onClick?: () => void
}

const Input = (props: InputsProps) => {
  const { showError, label, id, Icon, className, onClick, ...rest } = props;

  return (
    <Box>
      <Box className={Icon ? styles.weatherDashboardSearchContainer : ''}>
        {label && <label htmlFor={id}>{label}</label>}
        <input id={id} className={styles[className]} {...rest} />
        {Icon && <Icon className={styles.searchIcon} onClick={onClick}/>}
      </Box>
      <Box className={styles.errorContainer}>
        {showError && <Typography variant="subtitle1" className={styles.errorMessage}>{showError}</Typography>}
      </Box>
    </Box>
  );
};

export default Input;
