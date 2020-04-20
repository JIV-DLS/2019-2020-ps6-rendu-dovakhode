export class QuestionPlayed {
  id: number;
  EvolutionId: number;
  idQuestion: number;
  trials: number;
  dateCreation: Date;

  constructor() {
    this.id = 0;
    this.trials = 0;
    this.dateCreation = new Date();
  }
}
