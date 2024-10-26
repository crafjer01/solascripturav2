import { Typography, Grid2 } from '@mui/material';
import { useSelector } from "react-redux"

export const ParticipantDuplicatedMessage = () => {
    const { nameDuplicated } = useSelector(state => state.game);
  return (
    <>
        { nameDuplicated && 
        <Grid2 size={6}>
          <Typography 
              component="p" 
              sx={{ color: 'red', fontStyle: 'italic', fontSize: '14px' }}>
              El participante esta duplicado.
          </Typography>
        </Grid2>
      }
    </>
  )
}
