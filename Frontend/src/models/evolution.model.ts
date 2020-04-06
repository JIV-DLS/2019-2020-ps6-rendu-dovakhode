export class Evolution {
  id: number;
  questionPlayed: any[];
  quizId: number;
  dateCreation: Date;

  constructor() {
    this.id = 0 ;
    this.questionPlayed = [];
    this.dateCreation = new Date();
  }
}
