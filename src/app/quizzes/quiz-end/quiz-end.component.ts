import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {QuizService} from '../../../services/quiz.service';
import {EvolutionService} from '../../../services/evolution.service';
import {Quiz} from '../../../models/quiz.model';
import {Evolution} from '../../../models/evolution.model';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';
import {QuestionPlayed} from '../../../models/questionPlayed.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {QuizEndInfoComponent} from '../quiz-end-info/quiz-end-info.component';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';

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
  quit: number;


  constructor(private route: ActivatedRoute, private router: Router,
              private cookiesService: CookieService, private quizSevice: QuizService ,
              private evolutionService: EvolutionService, private questionPlayedService: QuestionPlayedService,
              public dialog: MatDialog, public dialogRef: MatDialogRef<QuizEndInfoComponent>
  ) { }

  ngOnInit() {
    this.quit = 0;
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

  info() {
    const dialogRef = this.dialog.open(QuizEndInfoComponent, {
      width: '60%',
      height: '60%',
      data: this.evolution ? this.evolution : null,
    });

  }
  @HostListener('window:keyup', ['$event'])
  onKey(e: any) {
    if (e.key === 'Escape') {
      this.quit += 1;
      if (this.quit >= 2) {
        this.quit = 0;
        this.dialog.closeAll();
        this.quitter();
      }
    }
  }
  quitter() {
    if (confirm('\nVoulez-vous vraiment retourner au choix de quiz?')) {
      this.router.navigate(['/quiz-list', {do: true, idPatient: this.evolution.patientId}]);
    }
  }

}
