import {Component, HostListener, OnInit} from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Location} from '@angular/common';
import {EvolutionService} from '../../../services/evolution.service';
import {Evolution} from '../../../models/evolution.model';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-quiz-do-start',
  templateUrl: './quiz-do-start.component.html',
  styleUrls: ['./quiz-do-start.component.scss']
})
export class QuizDoStartComponent implements OnInit {
  quiz: Quiz = DEFAULT_QUIZ;
  Evolution: Evolution;
  idPatient: number;
  quit: number;
  constructor(public quizService: QuizService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private evolservice: EvolutionService,
              private cookiesService: CookieService,
              private matDialogService: DialogService) {

  }


  ngOnInit() {
    this.quit = 0;
    this.idPatient = + (this.route.snapshot.params.idPatient);
    this.quizService.getQuizById ( + this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.initialize(quiz);
      }, (error) => {this.retour(); });

  }

  retour() {
    this.router.navigate(['/quiz-list', { do: true, idPatient: this.idPatient } ]);
  }
  initialize(quiz) {
    this.quiz = quiz;
  }
  start(quiz) {
    this.evolservice.addEvolution(this.quiz, +this.idPatient).subscribe((evol ) => {
      if (evol !== undefined) {
        console.log('voici l evol créée ' + evol.id + '' + evol.quizId);
        this.Evolution = evol;
        console.log('ok' + this.Evolution.id);
        this.cookiesService.set(environment.runningQuiz, this.Evolution.id + '');
        this.router.navigateByUrl('/quiz-do/' + this.Evolution.id);
      }
    });


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
    this.matDialogService.openConfirmDialog(( 'Voulez-vous vraiment retourner au choix de quiz?')).afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['/quiz-list', {do: true, idPatient: this.idPatient}]);
      }
    });
  }

}
