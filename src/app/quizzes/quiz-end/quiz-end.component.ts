import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {QuizService} from '../../../services/quiz.service';
import {EvolutionService} from '../../../services/evolution.service';
import {Quiz} from '../../../models/quiz.model';
import {Evolution} from '../../../models/evolution.model';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';
import {QuestionPlayed} from '../../../models/questionPlayed.model';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent implements OnInit {
  id: string;
  idPatient: number;
  quiz: Quiz;
  evolution: Evolution;
  questionsPlayed: QuestionPlayed[];

  constructor(private route: ActivatedRoute, private router: Router,
              private cookiesService: CookieService, private quizSevice: QuizService ,
              private evolutionService: EvolutionService, private questionPlayedService: QuestionPlayedService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.idPatient = +(this.route.snapshot.params.idPatient);
    this.evolutionService.getEvolutionById(+this.route.snapshot.paramMap.get('idEvolution')).subscribe((evol) => {
      this.evolution = new Evolution(evol);
      this.questionPlayedService.getQuestionPlayed('' + this.evolution.id).subscribe((questions) => {
        this.questionsPlayed = questions;
      });
    });
    this.quizSevice.getQuizById(+this.id).subscribe((quiz) => {
      this.quiz = quiz;
    });
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
  resultat() {
    console.log(this.questionsPlayed);
    const resultat = [ 0 , 0 ];
    for (const question of this.questionsPlayed) {
      if (question.trials <= 1) {
        resultat[0] += 1;
      } else if (+question.trials === 2) {
        resultat[1] += 1;
      }
    }
    return resultat;
  }
}
