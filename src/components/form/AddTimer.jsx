import { Grid2, Slider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../../store/slicers/gameSlicer";

export const AddTimer = () => {
    const { time } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const onSecondAnswerChange = ({ target }) => {
        dispatch(setTime(target.value))
    }
  return (
    <Grid2 size={6} sx={{ alignSelf: "end" }}>
      <Slider
        sx={{ p: 0 }}
        value={time}
        aria-label="Segundo-a-responder"
        valueLabelDisplay="auto"
        shiftStep={60}
        step={10}
        marks
        min={60}
        max={180}
        name="secondAnswer"
        onChange={onSecondAnswerChange}
      />
    </Grid2>
  );
};
