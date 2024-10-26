import { FormControlLabel, Radio } from '@mui/material'
import { processQuestion, setAnsweredCorrect, setAnswerText, setQuestionParticipant, setQuestionRound, setScoreCurrentParticipant } from '../../store/slicers/gameSlicer';
import { useDispatch, useSelector } from 'react-redux';

export const Options = ({ answer }) => {
    const { currentQuestion =  {}, currentParticipant, currentRound } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const selectAnswer = (theAnswer) => {
        if ( !currentQuestion.is_proceed ) {
            const newAnswered = 1;
            const newGuesses = theAnswer.is_correct ? 1 : 0;
            const newFail = !theAnswer.is_correct ? 1 : 0;
            const participant = {
                name: currentParticipant.name,
                answered: currentParticipant.answered + newAnswered,
                guess: currentParticipant.guess + newGuesses,
                fail: currentParticipant.fail + newFail,
            }
            dispatch( setScoreCurrentParticipant(participant) );

            dispatch(processQuestion() );
            dispatch( setQuestionParticipant(currentParticipant.name));
            dispatch(setQuestionRound(currentRound));
            dispatch(setAnsweredCorrect(theAnswer.is_correct));
            dispatch(setAnswerText(theAnswer.text));
           // clearInterval(timer);
        }
       
    };
  return (
    <FormControlLabel 
      value={ answer.text } 
      control={<Radio   
            checked={currentQuestion.answer_text === answer.text} 
            disabled={ currentQuestion.is_proceed }
            /> 
        } 
      label={ answer.text } 
      onClick={ () => selectAnswer(answer) }
       disabled={ currentQuestion.is_proceed }
    />
  )
}
