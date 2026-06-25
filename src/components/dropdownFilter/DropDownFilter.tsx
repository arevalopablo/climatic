import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { WeatherData } from "../../hooks/useForm";

interface DropDownProps {
  width: string,
  name: string,
  label: string;
  value: string | number,
  options: string[] | WeatherData[];
  onChange: (e: SelectChangeEvent<string | number>) => void;
}

const DropDownFilter = (props: DropDownProps) => {
  const { width, label, name, value, options, onChange } = props;

  
  return (
    <Box sx={{ width: "100%", mb: '20px' }}>
      <FormControl
        variant="standard"
        sx={{
          width: width,
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-focused": { color: "#fff" },
          },
          "&:hover .MuiInputLabel-root": {
            color: "#fff",
          },
        }}
      >
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          sx={{
            color: "#fff",
            "& .MuiSvgIcon-root": {
              color: "#fff !important",
            },
            "&::before": {
              borderBottom: "1px solid rgba(255, 255, 255, 0.5) !important",
            },
            "&:hover:not(.Mui-disabled)::before": {
              borderBottom: "2px solid #fff !important",
            },

            "&::after": {
              borderBottom: "2px solid #fff !important",
            },
          }}
        >
          {options.map((option) => {
            const isString = typeof option === "string";
            const title = isString ? option : option.id;
            const data = isString ? title : `${option.name}${option.admin1 ? `, ${option.admin1}` : ""}, ${option.country}`
            return (
              <MenuItem key={title} value={title}>
                {data}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownFilter;
