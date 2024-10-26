import { Typography, Grid2, FormGroup, RadioGroup, FormControlLabel, Box, Radio, Fab, Tooltip } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import { AnswerOption } from './AnswerOption';
import { useEffect, useRef, useState } from 'react';
import { AnswerResult } from './AnswerResult';
import { useSelector } from 'react-redux';
import { Timer } from './Timer';
import { Comodins } from './Comodins';

export const Question = () => {    
    const { currentQuestion } = useSelector(state => state.game);
  
  return (
    <>
      <Typography variant="h5" component="h2">{ currentQuestion.description }</Typography>
    
    </>
  );
};
