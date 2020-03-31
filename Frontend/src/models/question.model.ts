import {Answer} from './answer.model';
import {FormGroup} from '@angular/forms';

export class Question {
    id: number;
    label: string;
    image?: string;
    answers: Answer[];
    quizId: number;

  constructor() {
    this.id = 0;
    this.answers = [];
  }
  static quizFormValues(questionForm: FormGroup) {
    return questionForm.getRawValue() as Question;
  }
    deleteAnswer?(pos: number) {
      this.answers.splice(pos, 0);
    }
  answersEqualsTo(answers: Answer[]): boolean {
    if (this.answers.length !== answers.length) { return false; }
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].id !== answers[i].id ||
        this.answers[i].value !== answers[i].value ||
        this.answers[i].isCorrect !== answers[i].isCorrect) { return false; }
    }

    return true;
  }
}
