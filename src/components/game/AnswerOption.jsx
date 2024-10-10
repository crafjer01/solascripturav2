import { FormControlLabel, Radio } from '@mui/material';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

export const AnswerOption = ({ answer, onSelectAnswer, answerSelected }) => {

  const handleSelectAnswer = useCallback(() => {
    if ( answerSelected.length === 0 ) onSelectAnswer(answer.description);
  }, [answer.description, onSelectAnswer]);

  const isDisabled = !!answerSelected && answerSelected !== answer.description;

  console.log(!!answerSelected && answerSelected !== answer.description);

  return (
    <FormControlLabel 
      value={ answer.description } 
      control={<Radio  disabled={ isDisabled } />} 
      label={ answer.description } 
      onClick={ handleSelectAnswer } 
      disabled={ isDisabled }
      />
  )
}

AnswerOption.propTypes = {
  answer: PropTypes.shape({
    description: PropTypes.string.isRequired
  }).isRequired,
  onSelectAnswer: PropTypes.func.isRequired,
  answerSelected: PropTypes.string.isRequired
};
    