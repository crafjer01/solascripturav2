import { Grid2, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionAmountByParticipant } from "../../store/slicers/gameSlicer";

export const AddQuestionNumber = () => {
    const { questionAmountByParticipant } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const onQuestionsQuantityChange = ({ target }) => {
        const { value, name} = target;
  
        if ( value.length === '' ) return;
  
        const numberValue = parseInt(value);
  
        if ( numberValue < 5 ) {
         dispatch(setQuestionAmountByParticipant(5));
        }
        else if ( numberValue > 15 ) {
          dispatch(setQuestionAmountByParticipant(15));
        } 
        else {
          dispatch(setQuestionAmountByParticipant(numberValue));
        }
        
      }
  return (
    <Grid2 size={6}>
      <TextField
        name="questionsQuantity"
        type="number"
        label="Preguntas"
        variant="standard"
        fullWidth
        autoComplete="off"
        value={questionAmountByParticipant}
        onChange={onQuestionsQuantityChange}
      />
    </Grid2>
  );
};
