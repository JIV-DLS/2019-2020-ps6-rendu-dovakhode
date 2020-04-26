import {Component, HostListener, OnInit} from '@angular/core';
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
  quit: number;
  constructor(private location: Location,
              private quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.quit = 0;
    this.evolutionId = +(this.route.snapshot.params.idEvolution);
    this.patientId = +(this.route.snapshot.params.idPatient);
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.loading = false;
        this.quiz = quiz;
      }, (error) => {this.retour(); });
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
  precedent() {
    this.index = this.index > 0 ? this.index - 1 : 0;
  }

  goToEnd() {
    this.router.navigate(['/quiz-do/' + this.quiz.id + '/end/' + this.patientId, { idEvolution: this.evolutionId}]);
  }

  suivant() {
    if (this.index < this.quiz.questions.length - 1) {
      this.index = this.index + 1;
    } else {
      this.goToEnd();
    }

  }


  public retour() {
    this.location.back();
  }

}
