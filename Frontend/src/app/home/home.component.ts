import {Component, OnInit, TemplateRef} from '@angular/core';
import {environment} from '../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {QuizAddComponent} from '../quizzes/quiz-add/quiz-add.component';
import {QuizComponent} from '../quizzes/quiz/quiz.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
