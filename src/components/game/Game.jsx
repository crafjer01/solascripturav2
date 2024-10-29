import { useEffect, useState } from "react";
import { Container, Paper, Typography, Grid2 } from "@mui/material";
import { Question } from "./Question";
import { NavigationButtons } from "./NavigationButtons";
import { ParticipantPanel } from "./ParticipantPanel";

import { repositoryQuestions } from "../../data/repositoryQuestions";
import { saveCurrentParticipant } from "../../helpers/helpers";
import { MessageAlert } from "./MessageAlert";
import { Description } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentParticipant,
  setCurrentQuestion,
  setQuestionsAvailable,
} from "../../store/slicers/gameSlicer";
import { getAllQuestionByBooks } from "../../api/getAllQuestionByBooks";
import { AnswerOption } from "./AnswerOption";
import { Timer } from "./Timer";
import { Comodins } from "./Comodins";
import { AnswerResult } from "./AnswerResult";

let roundCounter = 1;
let participantRound = 1;
let questionCounter = 1;
let participantCounter = 0;

export const Game = () => {
  const {
    currentQuestion = {},
    rounds,
    currentRound,
    questionAmountByParticipant,
    questionAmountByParticipantIndex,
    currentParticipant,
    oldBookSelected,
    newBookSelected,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentParticipant());

    // Set available questions
    const booksToLookup = oldBookSelected.concat(newBookSelected);
    const allQUestionsAvailable = getAllQuestionByBooks(booksToLookup);
    dispatch(setQuestionsAvailable( allQUestionsAvailable ));
    dispatch(setCurrentQuestion());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: "center", mb: 3 }} >Juego en curso</Typography>
        <Grid2 container spacing={2}>
          <ParticipantPanel />
          <Grid2 size={8}>
                <Typography variant="h5" component="h2">{ currentQuestion.description }</Typography>
                <Grid2 container spacing={2} sx={{ mt: 2, justifyContent: "space-between" }} >
                    <AnswerOption />
                    <Timer />
                </Grid2>
                <Comodins />
                <AnswerResult />
                <NavigationButtons />
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};
