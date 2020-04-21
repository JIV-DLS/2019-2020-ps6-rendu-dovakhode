import {QuestionPlayed} from './questionPlayed.model';

export class Evolution {
  id: number;
  questionPlayed: QuestionPlayed[];
  quizId: number;
  patientId: number;
  dateCreation: Date;
  quizNom: string;
  quizDifficulty: string;
  quizQuestion: number;


  constructor(evolution?: Evolution) {
      if (evolution) {
        this.id = evolution.id;
        this.questionPlayed = evolution.questionPlayed;
        this.quizId = evolution.quizId;
        this.patientId = evolution.patientId;
        this.dateCreation = evolution.dateCreation;
        this.quizNom = evolution.quizNom;
        this.quizDifficulty = evolution.quizDifficulty;
        this.quizQuestion = evolution.quizQuestion;
      } else {
          this.id = 452;
          this.questionPlayed = [];
          this.dateCreation = new Date();
          this.quizNom = '';
          this.quizDifficulty = '';
        }
  }
}
