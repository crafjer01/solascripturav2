import { allQuestions } from './allQuestions';

export const getAllQuestionByBooks = ( books = [] ) => {
    const booksLower = books.map(book => book.toLocaleLowerCase());
    return allQuestions.filter(question => booksLower.includes(question.book));
}