import {Answer} from './answer.model';
import {FormGroup} from '@angular/forms';

export class Question {
    id: number;
    label: string;
    answers: Answer[];
    quizId: number;
  static quizFormValues(questionForm: FormGroup) {
    return questionForm.getRawValue() as Question;
  }

    deleteAnswer?(pos: number) {
      this.answers.splice(pos, 0);
    }
}
