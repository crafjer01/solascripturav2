import { Grid2, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRounds } from '../../store/slicers/gameSlicer';

export const AddRounds = () => {
    const { rounds } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const onRoundsQuantityChange = ({ target }) => {
        const { value, name} = target;
  
        if ( value.length === '' ) return;
  
        const numberValue = parseInt(value);
  
        if ( numberValue < 1 ) {
          dispatch(setRounds(1));
        }
        else if ( numberValue > 4 ) {
          dispatch(setRounds(4));
        } 
        else {
          dispatch(setRounds(numberValue));
        }
        
      }
  return (
    <Grid2 size={6} >
        <TextField 
            name="roundsQuantity" 
            type="number" 
            label="Rondas" 
            variant="standard" 
            fullWidth  
            autoComplete="off" 
            value={ rounds }
            onChange={ onRoundsQuantityChange }
        />
    </Grid2>
  )
}
