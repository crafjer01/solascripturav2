import { Fab, Grid2, Tooltip } from '@mui/material'
import {ImportContactsOutlined, SmartphoneOutlined, ExploreOffOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswers, useComodin5050, useComodinCallAFriend, useComodinCite } from '../../store/slicers/gameSlicer';
import { Question } from './Question';

export const Comodins = () => {
    const { comodin5050, comodinCall, comodinCite, currentAnswers } = useSelector(state => state.game);
    const dispatch = useDispatch();


    const useComodin5050Local = () => {
       dispatch( useComodin5050() );

        const answersFalsy = currentAnswers.options.filter(option => option.is_correct === false); 
        const answersTruthy = currentAnswers.options.filter(option => option.is_correct === true);
        const answersFalsySlice = answersFalsy.slice(0, 1);
        const answersUpdated = {
            question_id: currentAnswers.question_id,
            options: [...answersTruthy, ...answersFalsySlice]
        };

       dispatch( setCurrentAnswers(answersUpdated) );
    }

  return (
    <Grid2
        container
        spacing={2}
        sx={{ width: '100%', justifyContent: 'end', mb: 2 }}
    >
        <Grid2 size={3}>
        <Tooltip title="Cita bibilica">
            <Fab
            size="small"
            color="primary"
            aria-label="cite-bible"
            sx={{ mr: 1 }}
            onClick={ () => dispatch( useComodinCite() ) }
            disabled={ comodinCite }
            >
            <ImportContactsOutlined />
            </Fab>
        </Tooltip>
        <Tooltip title="Llamar un amigo">
            <Fab
            size="small"
            color="secondary"
            aria-label="call-a-friend"
            sx={{ mr: 1 }}
            onClick={ () => dispatch( useComodinCallAFriend() ) }
            disabled={ comodinCall }
            >
            <SmartphoneOutlined />
            </Fab>
        </Tooltip>
        <Tooltip title="50/50">
            <Fab
            size="small"
            color="error"
            aria-label="fifty-fifty"
            sx={{ mr: 1 }}
            onClick={ useComodin5050Local }
            disabled={ comodin5050 }
            >
            <ExploreOffOutlined />
            </Fab>
        </Tooltip>
        </Grid2>
    </Grid2>
  )
}
