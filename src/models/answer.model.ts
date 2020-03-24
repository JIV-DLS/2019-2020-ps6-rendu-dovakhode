import {FormGroup} from '@angular/forms';

export class Answer {
  type?: string;
  value: string;
  isCorrect: boolean;
  id: number;
  questionId: number;
  quizId: number;

  constructor() {
  }
  static questionFormValues(answerForm: FormGroup) {
    return answerForm.getRawValue() as Answer;
  }
}
