import { Grid2, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeParticipant } from '../../store/slicers/gameSlicer';

export const ShowParticipants = () => {
    const { participants} = useSelector(state => state.game);
    const dispatch = useDispatch();

  return (
    <>
      {
        (participants.length) 
        ? (
          <Grid2 size={12}>
            <Grid2 container spacing={2}>
              { participants.map( ({name}) => (
                  <Grid2 key={ name }>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <span>{ name }</span>
                        <IconButton   
                            aria-label="delete" 
                            sx={{ ml: 2, color: '#555' }}
                            onClick={() => dispatch(removeParticipant({name}))} >
                            <DeleteIcon />
                        </IconButton >
                    </Box>
                  </Grid2>
                )) 
              }  
            </Grid2>
          </Grid2>
        )
        : null
        
          
      }
    </>
  );
};
