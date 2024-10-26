import { PersonAddAlt } from '@mui/icons-material';
import { Grid2, TextField, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { setParticipant } from '../../store/slicers/gameSlicer';
import { useDispatch, useSelector } from 'react-redux';

export const AddParticipant = () => {
    const { participants } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const [ name, setName ] = useState('');
    const [ maxParticipantAllowed, setMaxParticipantAllowed ] = useState(false);

    const onNameChange = ({ target }) => {
        setName(target.value);
    }

    const add = () => {
        if ( name === '' ) return;
  
        const newParticipants = {
        name,
        answered: 0, 
        guess: 0, 
        fail: 0, 
        };
        
        dispatch(setParticipant(newParticipants));
        setName('');
      }

    useEffect(() => {
        setMaxParticipantAllowed(participants.length === 4)
    }, [ participants ]);


  return (
    <Grid2 size={6} >
      <Grid2 container spacing={1} sx={{ alignItems: "center" }}>
        <Grid2 sx={{ flexGrow: 1 }}>
          <TextField
            name="participant"
            label="Participantes"
            variant="standard"
            fullWidth
            autoComplete="off"
            disabled={ maxParticipantAllowed }
            value={name}
            onChange={onNameChange}
          />
        </Grid2>
        <IconButton
          variant="text"
          size="sm"
          sx={{ minWidth: 0, p: 0, alignSelf: "end" }}
          disabled={ maxParticipantAllowed }
          onClick={ add }
        >
          <PersonAddAlt color={`${maxParticipantAllowed ? "" : "primary"}`} />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};
