import { Question } from './question.model';
import {FormGroup} from '@angular/forms';

export class Quiz {
    id: number;
    label: string;
    theme?: string;
    subTheme?: string;
    difficulty?: string;
    image?: string;
    questions: Question[];
    dateCreation?: Date;
    dateModification?: Date;
    constructor() {
      this.id = 34894;
      this.questions = [];
    }
    static quizFormValues(quizForm: FormGroup) {
      return quizForm.getRawValue() as Quiz;
    }
    questionsEqualsTo(questions: Question[]): boolean {
      if (this.questions.length !== questions.length) { return false; }
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].id !== questions[i].id ||
          this.questions[i].label !== questions[i].label ||
          this.questions[i].image !== questions[i].image) { return false; }
        if (!this.questions[i].answersEqualsTo(questions[i].answers)) {return false; }
      }
      return true;
  }
}


