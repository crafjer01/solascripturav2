import { FormControl, Box, InputLabel, Select, MenuItem, OutlinedInput, Chip  } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
}

export const SelectBook = ({ books, name, onBookSelecChange, booksSelected, selectDisabled }) => {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id={`${name}-book-label`}>{ (!selectDisabled) ? `Seleccione el ${name} testamento` : '' }</InputLabel>
      <Select
        disabled={selectDisabled}
        labelId={`${name}-book--label`} 
        label={`${name}-book`} 
        multiple
        value={booksSelected}
        onChange={ onBookSelecChange }
        // input={<OutlinedInput id={`${name}-book`} label="Chip" />}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
        {books.map((book) => (
          <MenuItem key={book} value={book}>
            {book}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
