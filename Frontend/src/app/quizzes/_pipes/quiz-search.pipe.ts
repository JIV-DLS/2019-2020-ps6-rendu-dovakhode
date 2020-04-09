import { Pipe, PipeTransform } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';

@Pipe({
  name: 'quizSearch'
})
export class QuizSearchPipe implements PipeTransform {

  transform(quizzes: Quiz[], quiz: Quiz): Quiz[] {
      if (quiz) {
        return quizzes.filter((item: Quiz) =>
          ( quiz.label === '' || item.label.toLowerCase().indexOf(quiz.label.toLowerCase()) > -1)
          && ( quiz.difficulty === '' || item.difficulty === quiz.difficulty)
          && ( quiz.theme === '' || item.theme === quiz.theme)
          && ( quiz.subTheme === '' || item.subTheme === quiz.subTheme));
      }
      return quizzes;
  }

}
