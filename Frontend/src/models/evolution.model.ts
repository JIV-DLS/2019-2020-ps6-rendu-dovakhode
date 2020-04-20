import {QuestionPlayed} from './questionPlayed.model';

export class Evolution {
  id: number;
  questionPlayed: QuestionPlayed[];
  quizId: number;
  patientId: number;
  dateCreation: Date;

  constructor(evolution?: Evolution) {
      if (evolution) {
        this.id = evolution.id;
        this.questionPlayed = evolution.questionPlayed;
        this.quizId = evolution.quizId;
        this.patientId = evolution.patientId;
        this.dateCreation = evolution.dateCreation;
      } else {
          this.id = 452;
          this.questionPlayed = [];
          this.dateCreation = new Date();
        }
  }
}
