import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz-start-recap',
  templateUrl: './quiz-start-recap.component.html',
  styleUrls: ['./quiz-start-recap.component.scss']
})
export class QuizStartRecapComponent implements OnInit {
  quizId: number;
  patientId: number;
  evolutionId: number;
  constructor( private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.quizId = +(this.route.snapshot.params.id);
    this.evolutionId = +(this.route.snapshot.params.idEvolution);
    this.patientId = +(this.route.snapshot.params.idPatient);
  }

  goRecap() {
    this.router.navigate(['/quiz-do/' + this.quizId + '/quiz-recap/' + this.patientId, { idEvolution: this.evolutionId}]);
  }
}
