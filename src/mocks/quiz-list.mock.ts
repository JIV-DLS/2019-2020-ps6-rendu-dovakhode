import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import {theme} from '../models/theme.models';
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
        questions: [QUESTION_ACTOR],
    },
    {
        id: '2',
        name: 'Les Sports',
        theme: 'Basket-Ball',
        questions: [QUESTION_ACTOR],
    }
];

*/
export const DEFAULT_QUIZ: Quiz = {

  id: 2,
  name: 'nom du quiz',
  theme: Object.values(theme)[0],
  questions: []

};
