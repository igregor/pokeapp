import { ChangeEvent, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

const defaultTypeValue = "default-value";

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
  const [type, setType] = useState(defaultTypeValue);

  const isTypeSelectDisabled = availableTypes.length === 0;

  const handleTypeChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value;

    onTypeSelect(value);
    setType(value);
  };

  const handleNameQueryChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    onNameQueryChange(event.target.value);
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <TextField
        placeholder="Filter by name"
        variant="outlined"
        onChange={handleNameQueryChange}
        fullWidth={true}
      />

      <FormControl fullWidth>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="Name"
          onChange={handleTypeChange}
          fullWidth={true}
          disabled={isTypeSelectDisabled}
        >
          <MenuItem disabled value={defaultTypeValue}>
            <em>Select type</em>
          </MenuItem>
          {availableTypes.map((type) => (
            <MenuItem value={type} key={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SearchBar;
