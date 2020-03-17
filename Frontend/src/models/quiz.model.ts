import { Question } from './question.model';
import {FormGroup} from '@angular/forms';

export class Quiz {
    id: string;
    name: string;
    theme?: string;
    questions: Question[];
    dateCreation?: Date;
    dateModification?: Date;

    static quizFormValues(quizForm: FormGroup) {
      return quizForm.getRawValue() as Quiz;
    }
}


