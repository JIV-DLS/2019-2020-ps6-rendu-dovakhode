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
    constructor(quiz?: Quiz) {
      if (quiz) {
        this.id = quiz.id;
        this.label = quiz.label;
        this.theme = quiz.theme;
        this.subTheme = quiz.subTheme;
        this.difficulty = quiz.difficulty;
        this.image = quiz.image;
        this.questions = [];
        quiz.questions.forEach(question => this.questions.push(new Question(question)));
        this.dateCreation = quiz.dateCreation;
        this.dateModification = quiz.dateModification;
     } else {
        this.id = 0;
        this.questions = []; }
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
        // if (!this.questions[i].answersEqualsTo(questions[i].answers)) {return false; }
      }
      return true;
  }
}


