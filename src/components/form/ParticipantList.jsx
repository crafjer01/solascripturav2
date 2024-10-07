import { Grid2, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ParticipantList = ({ participants, onHandleDelete }) => {

  return (
    <Grid2 container spacing={2}>
         { participants.map( participant => (
        <Grid2
            key={ participant }
        >
        <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <span>{ participant }</span>
            <IconButton   aria-label="delete" onClick={() => onHandleDelete(participant)} sx={{ ml: 2, color: '#555' }}>
                <DeleteIcon />
            </IconButton >
        </Box>
       
      </Grid2>

    )) }  
    </Grid2>
  );
};
