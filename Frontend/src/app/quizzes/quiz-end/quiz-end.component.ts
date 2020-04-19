import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {QuizService} from '../../../services/quiz.service';
import {EvolutionService} from '../../../services/evolution.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent implements OnInit {
  id: string;
  idPatient: number;
  quiz: Quiz;

  constructor(private route: ActivatedRoute, private router: Router,
              private cookiesService: CookieService, private quizSevice: QuizService , private evolution: EvolutionService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.idPatient = +(this.route.snapshot.params.idPatient);
    if (this.cookiesService.check(environment.runningQuiz)) {
      this.cookiesService.delete(environment.runningQuiz, '/');
    }
  }

  restart() {
    this.router.navigate([ '/quiz-do/' + this.id + '/start' , { idPatient: this.idPatient}]);
  }

  begining() {
    this.router.navigate(['quiz-list']);
  }
}
