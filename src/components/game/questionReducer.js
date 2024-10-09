

export const questionReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_QUESTION':
            return state;
        case 'PROCEED_QUESTION':
            return state.map(question =>
                question.id === action.payload.id
                   ? {...question, proceed: action.payload.proceed }
                    : question
            );
        case 'GET_QUESTION':
            return state.filter(question => question.proceed === false);
        default:
            return state;
    }
}