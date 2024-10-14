

export const questionReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_QUESTION':
            return state;
        case 'PROCEED_QUESTION':
            const myEntries = Object.entries(action.payload.questionProceed);

            let questionProceed = {}
            myEntries.forEach(entries => {
                const [key, value] = entries;   
                questionProceed[key] = value; 
            });

            return state.map(question =>
                question.id === action.payload.id
                   ? {...question,  ...questionProceed}
                    : question
            );
            
        default:
            return state;
    }
}