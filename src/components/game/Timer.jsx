import { useDispatch, useSelector } from "react-redux";
import { setTimeLeft } from "../../store/slicers/gameSlicer";
import { Box, Grid2 } from "@mui/material";
import { useEffect } from "react";

let timer;
export const Timer = () => {
    const { timeLeft, time, currentQuestion } = useSelector(state => state.game);
    const dispatch = useDispatch();

    useEffect(() => {       
        if ( !currentQuestion.is_proceed && timeLeft > 0 ) {
          timer = setInterval(() => {
            dispatch( setTimeLeft() );
          }, 1000);
        }
        return () => {
          clearInterval(timer);
        };
    }, [timeLeft]);

    useEffect(() => {
        if ( currentQuestion.is_proceed  ) {
            clearInterval(timer);
        }
    }, [currentQuestion.is_proceed]);
  return (
    <Grid2 size={4}>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          height: "100%",
          p: 2,
        }}
      >
        <Box className="clock" sx={{ background: "#00838f" }}>
          { timeLeft }
        </Box>
      </Grid2>
    </Grid2>
  );
};
