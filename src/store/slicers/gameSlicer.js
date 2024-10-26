import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isGameStarted: false,
  isGameEnd: false,
  isFormOpen: false,
  rounds: 1,
  currentRound: 1,
  currentRoundIndex: 1,
  participants: [],
  nameDuplicated: false,
  currentParticipantIndex: 0,
  currentParticipant: {},
  participantRoundsIndex: 0,
  questions: [],
  currentQuestionIndex: 0,
  currentQuestion: {},
  questionAmountByParticipant: 5,
  questionAmountByParticipantIndex: 1,
  currentAnswers: {},
  time: 60,
  timeLeft: 60,
  oldBookSelected: [],
  newBookSelected: [],
  isAllBookSelected: false,
  isOldBookSelected: false,
  isNewBookSelected: false,
  comodin5050: false,
  comodinCite: false,
  comodinCall: false
}

export const gameSlicer = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setQuestionsAvailable: (state, action) => {
      state.questions = action.payload.questions;
    },
    setCurrentAnswers: (state, action) => {
      state.currentAnswers = action.payload;
    },
    setTimeLeft: (state) => {
      state.timeLeft =  state.timeLeft - 1;
    },
    setTime: (state, action) => {
      state.time =  action.payload;
      state.timeLeft = action.payload;
    },
    setCurrentQuestion: (state) => {
      state.currentQuestion = state.questions[state.currentQuestionIndex];
    },
    setQuestionAmountByParticipant: (state, action) => {
      state.questionAmountByParticipant = action.payload;
    },
    setParticipant: (state, action) => {
        const nameExists = state.participants.find(participant => participant.name === action.payload.name);

        if ( nameExists )  {
          state.nameDuplicated = true;
        } else {
          state.nameDuplicated = false;
          state.participants = [...state.participants, action.payload];
        }
    },
    removeParticipant: (state, action) => {
      state.participants = state.participants.filter(participant => participant.name !== action.payload.name);
    },
    setCurrentParticipant: (state) => {
      state.currentParticipant = state.participants[state.currentParticipantIndex];
    },
    setScoreCurrentParticipant: (state, action) => {
      state.currentParticipant = action.payload;
    },
    processQuestion: (state) => {
      state.currentQuestion.is_proceed = true;
    },
    setQuestionParticipant: (state, action) => {
      state.currentQuestion.participant_name = action.payload
    },
    setQuestionRound: (state, action) => {
      state.currentQuestion.round_number = action.payload
    },
    setAnsweredCorrect: (state, action) => {
      state.currentQuestion.answered_correct = action.payload
    },
    setAnswerText: (state, action) => {
      state.currentQuestion.answer_text = action.payload
    },
    useComodinCite: ( state) => {
      state.currentQuestion.comodin_cite_used = true;
      state.comodinCite = true;
    },
    useComodinCallAFriend: ( state) => {
      state.currentQuestion.comodin_call_used = true;
      state.comodinCall = true;
    },
    useComodin5050: ( state) => {
      state.currentQuestion.comodin_5050_used = true;
      state.comodin5050 = true;
    },
    newQuestion: (state) => {

      // Next participant if all questions have been answered for a participant
      if ( state.questionAmountByParticipantIndex ===  state.questionAmountByParticipant) {

        // Next round if all participants have answered all questions
        if (state.participantRoundsIndex === state.participants.length-1 ) {

          if ( state.currentRound >= state.rounds ) {
            alert('All rounds have been played. Game over!');
          } 
          // Next Round
          else {
            alert('Next Rounds!');
            state.currentRound++;
            state.currentQuestionIndex++;
            state.questionAmountByParticipantIndex = 1;
            state.currentParticipantIndex = 0;
            state.participantRoundsIndex = 0;
            state.comodin5050 = false;
            state.comodinCite = false;
            state.comodinCall = false;
    
            state.currentQuestion = state.questions[state.currentQuestionIndex];
            state.currentParticipant = state.participants[state.currentParticipantIndex];
    
            state.timeLeft = state.time;
          }
        } 
        // Next participant if all questions have not been answered for a participant
        else {
          alert('Next participant!');
          state.currentQuestionIndex++;
          state.currentParticipantIndex++;
          state.participantRoundsIndex++;
          state.questionAmountByParticipantIndex = 1;
          state.comodin5050 = false;
          state.comodinCite = false;
          state.comodinCall = false;
  
          state.currentQuestion = state.questions[state.currentQuestionIndex];
          state.currentParticipant = state.participants[state.currentParticipantIndex];
  
          state.timeLeft = 60;
         
        }
       
      } 
        // Next question for a participant
      else {
        state.currentQuestionIndex++;
        state.questionAmountByParticipantIndex = state.questionAmountByParticipantIndex + 1;

        state.currentQuestion = state.questions[state.currentQuestionIndex];
       
        state.timeLeft = 60;
      }
      
    },
    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
    },
    setRounds: (state, action) =>{
      state.rounds = action.payload;
    },
    startGame: (state) => {
      state.isGameStarted = true;
    },
    setOldBookSelected: (state, action) => {
      state.oldBookSelected = typeof action.payload === 'string' 
                                          ? action.payload.split(',') 
                                          : action.payload
    },
    setNewBookSelected: (state, action) => {
      state.newBookSelected = typeof action.payload === 'string' 
                                          ? action.payload.split(',') 
                                          : action.payload
    },
    setIsAllBookSelected: (state, action) => {
      state.isAllBookSelected = action.payload;
    },
    setIsOldBookSelected: (state, action) => {
      state.isOldBookSelected = action.payload;
    },
    setIsNewBookSelected: (state, action) => {
      state.isNewBookSelected = action.payload;
    },    
  },
})

// Action creators are generated for each case reducer function
export const { setQuestionsAvailable, setCurrentAnswers, setTimeLeft, setCurrentQuestion,
  setParticipant, setCurrentParticipant,  processQuestion, newQuestion, setQuestionParticipant,
  setQuestionRound, setAnsweredCorrect, setAnswerText, useComodinCite, useComodinCallAFriend, useComodin5050, 
  toggleForm, setRounds, setTime, setQuestionAmountByParticipant, startGame, removeParticipant, setOldBookSelected,
  setNewBookSelected, setIsAllBookSelected, setIsNewBookSelected, setIsOldBookSelected, setScoreCurrentParticipant
 } = gameSlicer.actions