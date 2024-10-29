

const geKeysValues = (entries) => {
    let questionProceed = {}

    entries.forEach(entry => {
        const [key, value] = entry;   
        questionProceed[key] = value; 
    });

    return questionProceed;
}

export const proceedQuestion = (questionProceed, currentQuestionId) => { 
    // get questions form localStorage
    const questionsFromStorage = JSON.parse(localStorage.getItem('questions')) || [];
    
    // update question in localStorage 
    const myEntries = Object.entries(questionProceed);
    const obj = geKeysValues(myEntries);
        
    const updatedQuestions = questionsFromStorage?.map(question =>
        question.id === currentQuestionId
            ? {...question,  ...obj}
            : question
    );

    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    return updatedQuestions;
}


export const getAvailableQuestions = () => {
    // get questions form localStorage
    const questionsFromStorage = JSON.parse(localStorage.getItem('questions')) || [];
    
    return questionsFromStorage.filter(question => question.proceed === false);
}

export const saveCurrentParticipant = ( currentParticipant ) => {
    const participants = JSON.parse(localStorage.getItem('participants')) || []; 

    const currentParticipants = [...participants, currentParticipant];

    localStorage.setItem('participants', JSON.stringify(currentParticipants)); 
}

export const calculateParticipantScores = (participants = []) => {
    let groupedParticipants = participants.reduce((acc, participant) => {
        const existingParticipant = acc.find(p => p.name === participant.name);
        if (existingParticipant) {
            existingParticipant.answered += participant.answered;
            existingParticipant.guess += participant.guess;
            existingParticipant.fail += participant.fail;
            existingParticipant.skip += participant.skip;
        } else {
            acc.push({...participant });
        }
        return acc;
    }, []); 

    groupedParticipants = groupedParticipants.map(participant => {
        return {
            ...participant,
            percentage: Math.round((participant.guess / participant.answered) * 100)
        }
    });
    return groupedParticipants;
}

export const determineWinner = (participants) => {
    const maxGuess = participants.reduce((max, participant) => {
        return participant.guess > max ? participant.guess : max;
    }, 0);

    const winners = participants.filter(participant => participant.guess === maxGuess);
  
    return winners.length > 1 ? "Hay un empate" : `El ganador es : ${winners[0].name}`;
}


/**
 * Calculates statistics for answered questions by round
 * @param {Array} questions - Array of question objects
 * @returns {Array} Array of round statistics objects
 */
export const calculateQuestionsByRound = (questions) => {
    // Group questions by round
    const questionsByRound = questions.reduce((acc, question) => {
      const roundNumber = question.round_number;
      if (!acc[roundNumber]) {
        acc[roundNumber] = [];
      }
      acc[roundNumber].push(question);
      return acc;
    }, {});
  
    // Calculate statistics for each round
    return Object.entries(questionsByRound).map(([roundNumber, roundQuestions]) => {
      const totalQuestions = roundQuestions.length;
      const correctAnswers = roundQuestions.filter(q => q.answered_correct).length;
      const percentage = (correctAnswers / totalQuestions) * 100;
      
      // Calculate comodin usage
      const comodinUsage = {
        cite: roundQuestions.filter(q => q.comodin_cite_used).length,
        call: roundQuestions.filter(q => q.comodin_call_used).length,
        fifty_fifty: roundQuestions.filter(q => q.comodin_5050_used).length
      };
  
      // Calculate book type distribution
      const bookTypes = roundQuestions.reduce((acc, q) => {
        if (!acc[q.book_type]) {
          acc[q.book_type] = 0;
        }
        acc[q.book_type]++;
        return acc;
      }, {});
  
      return {
        roundNumber: parseInt(roundNumber),
        totalQuestions,
        correctAnswers,
        incorrectAnswers: totalQuestions - correctAnswers,
        percentage: Math.round(percentage * 100) / 100,
        comodinUsage,
        bookTypes,
        questions: roundQuestions
      };
    }).sort((a, b) => a.roundNumber - b.roundNumber);
  };