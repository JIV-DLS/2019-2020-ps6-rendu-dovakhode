import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {difficulte, theme} from '../../../models/theme.models';

@Component({
  selector: ' app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themesValues = Object.values(theme);
  public difficultiesValues = Object.values(difficulte);
  constructor(public quizService: QuizService) {
    this.quizService.getQuiz().subscribe((quiz) => this.quizList = quiz);
  }

  ngOnInit() {
  }

  quizSelected(selected: boolean) {
  }
  deleteQuizz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }
}
