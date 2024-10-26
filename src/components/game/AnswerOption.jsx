import {  FormGroup, Grid2, RadioGroup } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./Options";
import { getAnswersByQuestionId } from '../../api/getAnswersByQuestionId';
import {  setCurrentAnswers } from "../../store/slicers/gameSlicer";

export const AnswerOption = () => {
  const { currentQuestion =  {}, currentAnswers = {} } = useSelector(state => state.game);
  const dispatch = useDispatch();
  let timer;

  useEffect(() => {
    if ( !currentQuestion.comodin_5050_used ) {
      dispatch(setCurrentAnswers(getAnswersByQuestionId(currentQuestion.id)));    
    }
  }, [ currentAnswers, currentQuestion ]);

  return (
    <Grid2 size={8}>
      <h5>Selecione la respuesta correcta.</h5>
      <FormGroup>
        <RadioGroup
          aria-labelledby="answer-radio-buttons"
          name="answer-radio-buttons"
        >
          {currentAnswers.options?.map((answer) => (
            <Options key={answer.text} answer={answer}/>
          ))}
        </RadioGroup>
      </FormGroup>
    </Grid2>
  );
};
