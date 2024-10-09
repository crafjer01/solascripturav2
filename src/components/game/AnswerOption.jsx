import { FormControlLabel, Radio } from '@mui/material';

export const AnswerOption = ({ answer }) => {
  return (
    <FormControlLabel value={ answer.description } control={<Radio />} label={ answer.description } />
  )
}
    