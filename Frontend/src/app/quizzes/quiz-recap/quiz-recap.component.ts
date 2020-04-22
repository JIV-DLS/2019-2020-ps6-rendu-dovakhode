import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-recap',
  templateUrl: './quiz-recap.component.html',
  styleUrls: ['./quiz-recap.component.scss']
})
export class QuizRecapComponent implements OnInit {
  public quiz: Quiz;
  public index = 0;
  patientId: number;
  evolutionId: number;
  loading: boolean;
  constructor(private location: Location,
              private quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.evolutionId = +(this.route.snapshot.params.idEvolution);
    this.patientId = +(this.route.snapshot.params.idPatient);
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.loading = false;
        this.quiz = quiz;
      }, (error) => {this.retour(); });
  }

  precedent() {
    this.index = this.index > 0 ? this.index - 1 : 0;
  }


  suivant() {
    if (this.index < this.quiz.questions.length - 1) {
      this.index = this.index + 1;
    } else {
      this.router.navigate(['/quiz-do/' + this.quiz.id + '/end/' + this.patientId, { idEvolution: this.evolutionId}]);
    }

  }


  public retour() {
    this.location.back();
  }

}
