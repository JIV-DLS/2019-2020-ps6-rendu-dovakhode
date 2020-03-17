import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quizze-edit',
  templateUrl: './quizze-edit.component.html',
  styleUrls: ['./quizze-edit.component.scss']
})
export class QuizzeEditComponent implements OnInit {
  quiz: Quiz;
  constructor(public quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quiz = this.quizService.getQuizByIndex(+this.route.snapshot.paramMap.get('id'));
    // console.log(this.quiz);
  }

}
