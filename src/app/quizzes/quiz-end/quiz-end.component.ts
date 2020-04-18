import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent implements OnInit {
  id: string;
  idPatient: number;
  constructor(private route: ActivatedRoute, private router: Router,
              private cookiesService: CookieService) { }

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
