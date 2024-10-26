import { useDispatch, useSelector } from 'react-redux';
import { oldBooksDB, newBooksDB } from '../../data/';
import { setIsAllBookSelected, setIsNewBookSelected, setIsOldBookSelected, 
  setNewBookSelected, setOldBookSelected } from '../../store/slicers/gameSlicer';
import { Checkbox, FormControlLabel, FormGroup, Grid2 } from '@mui/material';
import { SelectBook } from './SelectBook';

export const AddBooksSelected = () => {
  const { oldBookSelected, newBookSelected, isAllBookSelected, isOldBookSelected, isNewBookSelected } 
        = useSelector(state => state.game);
  const dispatch = useDispatch();

  const onOldBookSelectChange = ({ target }) => {
    dispatch(setOldBookSelected(target.value));
  }

  const onNewBookSelectChange = ({ target }) => {
    dispatch(setNewBookSelected(target.value));
  }

  
  const onCheckAllBooks = () => {
    dispatch(setOldBookSelected([]));
    dispatch(setNewBookSelected([]));
    dispatch(setIsAllBookSelected( !isAllBookSelected ));
    dispatch(setIsOldBookSelected(false));
    dispatch(setIsNewBookSelected(false));
  }

  const onCheckOldBook = () => {
    dispatch(setOldBookSelected([]));
    dispatch(setNewBookSelected([]));
    dispatch(setIsAllBookSelected(false));
    dispatch(setIsOldBookSelected( !isOldBookSelected ));
    dispatch(setIsNewBookSelected(false));
  }

  const onCheckNewBook = () => {
    dispatch(setOldBookSelected([]));
    dispatch(setNewBookSelected([]));
    dispatch(setIsAllBookSelected(false));
    dispatch(setIsOldBookSelected(false));
    dispatch(setIsNewBookSelected( !isNewBookSelected ));
  }

  const disabledSelectOldBook = (isAllBookSelected || isOldBookSelected || isNewBookSelected);
  const disabledSelectNewBook = (isAllBookSelected || isNewBookSelected || isOldBookSelected);
  return (
    <>
      <Grid2 size={6}>
        <SelectBook
          books={oldBooksDB}
          name="Viejo"
          onBookSelecChange={onOldBookSelectChange}
          booksSelected={oldBookSelected}
          selectDisabled={disabledSelectOldBook}
        />
      </Grid2>
      <Grid2 size={6}>
        <SelectBook
          books={newBooksDB}
          name="Nuevo"
          onBookSelecChange={onNewBookSelectChange}
          booksSelected={newBookSelected}
          selectDisabled={disabledSelectNewBook}
        />
      </Grid2>
      <Grid2 size={12}>
        <FormGroup row sx={{ justifyContent: 'space-between'}} >
            <FormControlLabel 
              control={
                <Checkbox 
                  size="small" 
                  onClick={ onCheckOldBook } 
                  disabled={(isAllBookSelected || isNewBookSelected)}  />} 
                  label="Todo el viejo testamento"
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  size="small" 
                  onClick={ onCheckAllBooks } 
                  disabled={(isNewBookSelected || isOldBookSelected)}  />} 
                  label="Toda la biblia"
            />
            <FormControlLabel 
              control={
                <Checkbox 
                size="small" 
                onClick={ onCheckNewBook } 
                disabled={(isAllBookSelected || isOldBookSelected)} />} 
                label="Todo el nuevo testamento" 
            />
          </FormGroup>
          </Grid2>
    </>
  );
};
