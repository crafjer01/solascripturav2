import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import {
  calculateParticipantScores,
  calculateQuestionsByRound,
  determineWinner,
} from "../../helpers/helpers";
import { GameResult } from "./GameResult";
import { useSelector } from "react-redux";
import { Trophy, Medal, RefreshCw, Eye, Users } from "lucide-react";

export const FinalPanel = () => {
  const { participantsScore, currentRound, participants, rounds, questions } = useSelector(
    (state) => state.game
  );

  const participantsWithScores = calculateParticipantScores(participantsScore);
  const ganador = determineWinner(participantsWithScores);


  let participantsRounds = questions.filter(
    (question) => question.is_proceed === true
  );

  participantsRounds = calculateQuestionsByRound(participantsRounds); 
  console.log(participantsRounds);



  const getPositionIcon = (position) => {
    if (position === 0) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (position === 1) return <Medal className="w-8 h-8 text-gray-400" />;
    return <Medal className="w-8 h-8 text-amber-600" />;
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Card className="w-full max-w-3xl mx-auto">
          <div>
            <h3 className="text-center text-2xl font-bold p-4">
              Juego Finalizado
            </h3>
            {/* {isGameTied && (
              <div className="text-center text-muted-foreground mt-2">
                Hay un empate
              </div>
            )} */}
          </div>

          <CardContent>
            <section className="space-y-6 mb-8" aria-label="Rankings">
              {participantsWithScores.map((participant, index) => (
                <article
                  key={participant.name}
                  className="relative flex items-center gap-4 p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    {getPositionIcon(index)}
                    <header>
                      <h3 className="text-lg font-semibold">
                        {participant.name} 
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        Total: {participant.answered} de{" "}
                        {participant.guess} ({participant.percentage}%)
                      </div>
                    </header>
                  </div>

                  <div className="ml-auto flex gap-4">
                    {participantsRounds.map((participant, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-medium">
                          Ronda {idx + 1}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {participant.correctAnswers}/{participant.totalQuestions} 
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </section>

            <section
              className="flex items-center justify-center gap-8 mb-8 p-4 rounded-lg bg-neutral-100"
              aria-label="Match Statistics"
            >
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Participantes</div>
                <div className="text-lg">{participants.length}</div>
              </div>
              <div className="text-center">
                <Trophy className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Rondas</div>
                <div className="text-lg"> {rounds}
                </div>
              </div>
            </section>

            <footer className="flex flex-wrap justify-center gap-4">
            <Button
              variant="contained"
              className="flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Finalizar juego
            </Button>
            <Button
            variant="outlined"
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Ver respuestas
          </Button>
            </footer>

            
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
