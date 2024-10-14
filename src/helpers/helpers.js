

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

export const calculateParticipantScores = () => { 
    const participants = JSON.parse(localStorage.getItem('participants') || []);
    const groupedParticipants = participants.reduce((acc, participant) => {
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

    return groupedParticipants;
}

export const determineWinner = (participants) => {
    const maxGuess = participants.reduce((max, participant) => {
        return participant.guess > max ? participant.guess : max;
    }, 0);

    const winners = participants.filter(participant => participant.guess === maxGuess);
  
    return winners.length > 1 ? "Hay un empate" : `El ganador es : ${winners[0].name}`;
}
