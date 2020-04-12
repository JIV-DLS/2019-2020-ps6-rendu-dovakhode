import { Question } from '../models/question.model';
import {Answer} from '../models/answer.model';

/*
export const QUESTION_ACTOR: Question = {
     label: 'Jean Gabin a joué dans...',
     answers: [
         {
             value: 'Les tuches II',
             isCorrect: false,
         },
         {
             value: 'La grande illusion',
            isCorrect: true,
         }
     ]
 };

export const QUESTION_SPORTS: Question = {
  label: 'Lebron James est un ... ',
  answers: [
    {
      value: 'Un Basketteur qui joue dans les Lakers',
      isCorrect: true,
    },
    {
      value: 'Un Basketeur qui joue dans la Golden State',
      isCorrect: false,
    }
  ]

}

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        question: [QUESTION_ACTOR],
    },
    {
        id: '2',
        name: 'Les Sports',
        theme: 'Basket-Ball',
        question: [QUESTION_ACTOR],
    }
];

*/
export const DEFAULT_QUESTION: Question = {
  answersEqualsTo(answers: Answer[]): boolean {
    return false;
  },

  id: 2,
  label: 'Question',
  answers : [],
  quizId: 2

};
