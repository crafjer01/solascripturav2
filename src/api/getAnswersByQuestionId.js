import { allAnswers } from './AllAnswers';


export const getAnswersByQuestionId = (questionId) => {
    return allAnswers.find(answer => answer.question_id === questionId);
}