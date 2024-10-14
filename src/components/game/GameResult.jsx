import * as React from "react";

import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid2,
  TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Box 
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { calculateParticipantScores } from "../../helpers/helpers";

export const GameResult = () => {
  const questions = JSON.parse(localStorage.getItem("questions"));

  const participants = calculateParticipantScores();

  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Participant Summary
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: "100%", display: "flex" }}>
              {questions.map((question) => (
                <ListItem key={question.id} sx={{ width: "30%" }}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <ListItemText
                        primary={`${question.id}. ${question.description}`}
                        secondary={`Correct Answer: ${question.correct_answer}`}
                        sx={{ mr: 2 }}
                      />
                      <Chip
                        label={
                          question.answered_correct ? "Correct" : "Incorrect"
                        }
                        color={
                          question.answered_correct ? "primary" : "secondary"
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Cite: {question.cite}
                        <br />
                        Round: {question.round_number}
                        <br />
                        Participant: {question.participant_name}
                        <br />
                        {/* Add more details here */}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Container>

      <TableContainer component={Paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Game Results
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Bible Citation</TableCell>
              <TableCell>Round</TableCell>
              {participants.map((participant) => (
                <TableCell key={participant}>{participant.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions
              .filter((q) => q.proceed)
              .map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.id}</TableCell>
                  <TableCell>{question.description}</TableCell>
                  <TableCell>{question.correct_answer}</TableCell>
                  <TableCell>{question.cite}</TableCell>
                  <TableCell>{question.round_number}</TableCell>
                  {participants.map((participant) => (
                    <TableCell key={participant}>
                      {question.participant_name === participant.name && (
                        <Box>
                          <Chip
                            label={
                              question.answered_correct
                                ? "Correct"
                                : "Incorrect"
                            }
                            color={
                              question.answered_correct
                                ? "primary"
                                : "secondary"
                            }
                            size="small"
                          />
                          {question.comodin_cite_used && (
                            <Chip
                              label="Cita"
                              size="small"
                              style={{ marginLeft: 4 }}
                            />
                          )}
                          {question.comodin_call_used && (
                            <Chip
                              label="Llamada"
                              size="small"
                              style={{ marginLeft: 4 }}
                            />
                          )}
                          {question.comodin_5050_used && (
                            <Chip
                              label="50/50"
                              size="small"
                              style={{ marginLeft: 4 }}
                            />
                          )}
                        </Box>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
