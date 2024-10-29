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
  TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Box, 
  Card
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { calculateParticipantScores } from "../../helpers/helpers";
import { useSelector } from "react-redux";

export const GameResult = () => {
  const { questions, participantsScore} = useSelector(state => state.game);

  const participantsWithScores = calculateParticipantScores(participantsScore);

  return (
    <>
      <Card>
        
      </Card>
    </>
  );
};
