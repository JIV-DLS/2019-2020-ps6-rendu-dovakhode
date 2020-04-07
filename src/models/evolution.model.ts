import {QuestionPlayed} from './questionPlayed.model';

export class Evolution {
  id: number;
  questionPlayed: QuestionPlayed[];
  quizId: number;
  dateCreation: Date;

  constructor() {
    this.id = 452 ;
    this.questionPlayed = [];
    this.dateCreation = new Date();
  }
}
