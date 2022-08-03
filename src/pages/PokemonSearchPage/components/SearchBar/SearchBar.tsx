import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";

interface SearchBarProps {
  onTypeSelect: (type: string) => void;
  onNameQueryChange: (nameQuary: string) => void;
  availableTypes: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  availableTypes,
  onNameQueryChange,
  onTypeSelect,
}) => {
  const handleTypeChange = (event: SelectChangeEvent<string>): void => {
    onTypeSelect(event.target.value);
  };
  const handleNameQueryChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    onNameQueryChange(event.target.value);
  };

  return (
    <div>
      <TextField
        placeholder="filter by name"
        variant="outlined"
        onChange={handleNameQueryChange}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"default"}
          label="Name"
          onChange={handleTypeChange}
        >
          <MenuItem disabled value="default">
            <em>Select type</em>
          </MenuItem>
          {availableTypes.map((type) => (
            <MenuItem value={type} key={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchBar;
