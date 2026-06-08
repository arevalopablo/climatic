import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";

interface DropDownProps {
  label:  string;
  value: string;
  options: string[]
  onChange: (e: SelectChangeEvent<string>) => void;
}

const DropDownFilter = (props: DropDownProps) => {
  const { label, value, options, onChange } = props
  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="standard" sx={{ width: "120px" }}>
        <InputLabel id="filtro">{label}</InputLabel>
        <Select label={label} value={value} onChange={onChange}>
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
