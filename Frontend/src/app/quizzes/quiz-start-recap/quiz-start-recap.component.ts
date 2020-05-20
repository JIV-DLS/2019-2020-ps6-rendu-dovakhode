import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../services/dialog.service';
import {QuizService} from '../../../services/quiz.service';
import {EvolutionService} from '../../../services/evolution.service';
import {Quiz} from '../../../models/quiz.model';
import {Evolution} from '../../../models/evolution.model';

@Component({
  selector: 'app-quiz-start-recap',
  templateUrl: './quiz-start-recap.component.html',
  styleUrls: ['./quiz-start-recap.component.scss']
})
export class QuizStartRecapComponent implements OnInit {
  quit: number;
  quiz: Quiz;
  quizId: number;

  evolution: Evolution;
  patientId: number;
  evolutionId: number;
  constructor( private route: ActivatedRoute,
               private router: Router, private matDialogService: DialogService,
               private quizService: QuizService,
               private evolutionService: EvolutionService) { }

  ngOnInit(): void {
    this.quit = 0;
    this.quizId = +(this.route.snapshot.params.id);
    this.evolutionId = +(this.route.snapshot.params.idEvolution);
    this.evolutionService.getEvolutionById(this.evolutionId).subscribe((evolution) => {
        this.evolution = evolution;
        this.quizService.getQuizById(evolution.quizId).subscribe((quiz) => {
          this.quiz = quiz;
          const pourcentage = this.evolutionService.Pourcentage(this.evolution.questionPlayed, this.quiz);

          this.evolution.succesRate = +pourcentage;

          this.evolutionService.updateEvolution(this.evolution).subscribe();
        });
      }
    );
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
    // tslint:disable-next-line:max-line-length
    this.matDialogService.openConfirmDialog(( 'Voulez-vous vraiment retourner au choix de quiz?')).afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['/quiz-list', {do: true, idPatient: this.patientId}]);
      }
    });
  }
  goRecap() {
    this.router.navigate(['/quiz-do/' + this.quizId + '/recap/' + this.patientId, { idEvolution: this.evolutionId}]);
  }
}
