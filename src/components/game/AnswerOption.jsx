import { FormControlLabel, Radio } from '@mui/material';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { proceedQuestion, getAvailableQuestions } from '../../helpers/helpers';
import { CurrencyBitcoin } from '@mui/icons-material';

export const AnswerOption = ({ 
    answer, currentQuestion, onSelectAnswer, answerSelected, setIsAnswerCorrect, 
    setCurrentQuestion, questions, setQuestions, setCurrentQuestionProceed,
    currentParticipant, setCurrentParticipant 
  }) => {

  const handleSelectAnswer = useCallback(() => {
    if ( answerSelected.length === 0 ) {
      onSelectAnswer(answer.description);
      setIsAnswerCorrect(answer.is_correct);

      const questionProceed = {
          proceed: true,
          participant_name: currentParticipant.name,
          round_number: 1,
          answered_correct: answer.is_correct,
          comodin_cite_used: currentQuestion?.comodin_cite_used,
          comodin_call_used: currentQuestion?.comodin_call_used,
          comodin_5050_used: currentQuestion?.comodin_5050_used,
      };

      proceedQuestion(questionProceed, currentQuestion?.id);
      setQuestions(getAvailableQuestions());
      setCurrentQuestionProceed(true);

      // Current participant
      const {   answered, guess, fail } = currentParticipant;
      const newAnswered = 1;
      const newGuesses = answer.is_correct ? 1 : 0;
      const newFail = !answer.is_correct ? 1 : 0;

      setCurrentParticipant({
        ...currentParticipant, 
        answered: answered + newAnswered, 
        guess: guess + newGuesses, 
        fail: fail + newFail 
      });

    }
  }, [answer.description, onSelectAnswer]);

  const isDisabled = !!answerSelected && answerSelected !== answer.description;

  return (
    <FormControlLabel 
      value={ answer.description } 
      control={<Radio  disabled={ isDisabled } checked={!!answerSelected} />} 
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
    