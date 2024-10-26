import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, toggleForm } from "../../store/slicers/gameSlicer";

export const ButtonStart = () => {
    const dispatch = useDispatch();
    const { participants = [], oldBookSelected, newBookSelected, isAllBookSelected, isOldBookSelected, 
      isNewBookSelected  } = useSelector(state => state.game);

    const [ btnStartDisabled, setBtnStartDisabled ] = useState(true);


    useEffect(() => {
      const isValidForm =  
            participants.length > 1 &&
            ( isAllBookSelected || 
              isOldBookSelected || 
              isNewBookSelected || 
              oldBookSelected.length > 0 || 
              newBookSelected.length > 0
            );
      setBtnStartDisabled( !isValidForm );
    }, [ participants, isAllBookSelected, isNewBookSelected, isOldBookSelected, oldBookSelected, newBookSelected  ]);

    const onStartGame = () => {
      dispatch(startGame())
    }
  return (
    <Box sx={{ mt: 5 }}>
      <Button
        variant="contained"
        sx={{ mr: 2 }}
        disabled={btnStartDisabled}
        onClick={onStartGame}
      >
        Iniciar
      </Button>
      <Button variant="outlined" onClick={() => dispatch(toggleForm())}>
        Cancelar
      </Button>
    </Box>
  );
};
