import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz-start-recap',
  templateUrl: './quiz-start-recap.component.html',
  styleUrls: ['./quiz-start-recap.component.scss']
})
export class QuizStartRecapComponent implements OnInit {
  quit: number;
  quizId: number;
  patientId: number;
  evolutionId: number;
  constructor( private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.quit = 0;
    this.quizId = +(this.route.snapshot.params.id);
    this.evolutionId = +(this.route.snapshot.params.idEvolution);
    this.patientId = +(this.route.snapshot.params.idPatient);
  }
  @HostListener('window:keyup', ['$event'])
  onKey(e: any) {
    if (e.key === 'Escape') {
      this.quit += 1;
      if (this.quit >= 2) {
        this.quit = 0;
        this.quitter();
      }
    }
  }
  quitter() {
    if (confirm(( 'Voulez-vous vraiment retourner au choix de quiz?'))) {
      this.router.navigate(['/quiz-list', {do: true, idPatient: this.patientId}]);
    }
  }
  goRecap() {
    this.router.navigate(['/quiz-do/' + this.quizId + '/recap/' + this.patientId, { idEvolution: this.evolutionId}]);
  }
}
