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

  constructor(answer?: Answer) {
    if (answer) {
      this.id = answer.id;
      this.type = answer.type;
      this.value = answer.value;
      this.isCorrect = answer.isCorrect;
      this.quizId = answer.quizId;
      this.tmpUrl = answer.tmpUrl;
    } else {
      this.id = 0;
    }
  }

  static questionFormValues(answerForm: FormGroup) {
    return answerForm.getRawValue() as Answer;
  }
}
