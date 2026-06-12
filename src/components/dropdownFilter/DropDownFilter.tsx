import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface DropDownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (e: SelectChangeEvent<string>) => void;
}

const DropDownFilter = (props: DropDownProps) => {
  const { label, value, options, onChange } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <FormControl
        variant="standard"
        sx={{
          width: "120px",
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-focused": { color: "#fff" },
          },
          "&:hover .MuiInputLabel-root": {
            color: "#fff",
          },
        }}
      >
        <InputLabel id="filtro">{label}</InputLabel>
        <Select
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
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownFilter;
