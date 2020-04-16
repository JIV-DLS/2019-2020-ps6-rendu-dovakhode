import {FormGroup} from '@angular/forms';

export class Answer {
  image: string;
  type?: string;
  value: string;
  isCorrect: boolean;
  id: number;
  questionId: number;
  quizId: number;
  tmpUrl: string;
  constructor() {
    this.id = 0;
  }
  static answerFormValues(answerForm: FormGroup) {
    return answerForm.getRawValue() as Answer;
  }
}
