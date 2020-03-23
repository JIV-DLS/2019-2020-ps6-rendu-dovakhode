import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {difficulte, theme} from '../../../models/theme.models';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: ' app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themesValues = Object.values(theme);
  public difficultiesValues = Object.values(difficulte);
  constructor(private router: Router,
              private location: Location,
              public quizService: QuizService) {
    this.getAllQuiz();
  }

  ngOnInit() {
  }
  getAllQuiz() {
    this.quizService.getQuiz().subscribe((quiz) => this.quizList = quiz);
  }
  quizSelected(selected: boolean) {
  }
  deleteQuiz(comfirm: boolean, quiz: Quiz) {
    if (comfirm) {this.quizService.deleteQuiz(quiz).subscribe(() => {
      this.getAllQuiz();
    }); }
  }

  selectQuiz(quiz: Quiz) {
    this.router.navigateByUrl('/quiz-edit/' + quiz.id);
  }
}
