import {FormGroup} from '@angular/forms';

export class Answer {
  image: string;
  type?: string;
  value: string;
  isCorrect: boolean;
  id: number;
  questionId: number;
  quizId: number;

  constructor() {
    this.id = 0;
  }
  static questionFormValues(answerForm: FormGroup) {
    return answerForm.getRawValue() as Answer;
  }
}
