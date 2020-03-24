import { Question } from './question.model';
import {FormGroup} from '@angular/forms';

export class Quiz {
    id: number;
    label: string;
    theme?: string;
    subTheme?: string;
    difficulty?: string;
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
}


