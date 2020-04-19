import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizSearchPipe} from '../_pipes/quiz-search.pipe';
import {Quiz} from '../../../models/quiz.model';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {difficulteSearch, themeSearch} from '../../../models/theme.models';

@Component({
  selector: 'app-quiz-display-list',
  templateUrl: './quiz-display-list.component.html',
  styleUrls: ['./quiz-display-list.component.scss']
})
export class QuizDisplayListComponent implements OnInit {

  public doQuiz;
  bgColor = 'primary';
  quizzes = [];
  public themesValues = Object.values(themeSearch);
  public difficultiesValues = Object.values(difficulteSearch);
  public searchedQuiz: Quiz = DEFAULT_QUIZ;
  constructor(public route: ActivatedRoute, private quizPipe: QuizSearchPipe) { }

  ngOnInit(): void {
    this.doQuiz = (this.route.snapshot.params.do === 'true');
  }
  listOfQuiz() {
    return this.quizPipe.transform( this.quizzes, {
      questionsEqualsTo: null,
      id: 0,
      questions: [],
      label: this.searchedQuiz.label,
      theme: this.searchedQuiz.theme,
      subTheme: this.searchedQuiz.subTheme,
      difficulty: this.searchedQuiz.difficulty});
  }
  back() {
  }
}
