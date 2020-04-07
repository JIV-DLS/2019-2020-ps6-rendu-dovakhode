import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quiz-do-start',
  templateUrl: './quiz-do-start.component.html',
  styleUrls: ['./quiz-do-start.component.scss']
})
export class QuizDoStartComponent implements OnInit {
  quiz: Quiz = DEFAULT_QUIZ;

  constructor(public quizService: QuizService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.initialize(quiz);
      }, (error) => {this.retour(); });
  }

  retour() {
    this.location.back();
  }
  initialize(quiz) {
    this.quiz = quiz;
  }
  start(quiz) {
    this.router.navigateByUrl('/quiz-do/' + quiz.id);
  }

}