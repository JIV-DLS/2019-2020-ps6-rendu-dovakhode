import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {difficulteSearch, themeSearch} from '../../../models/theme.models';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Location} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-quiz-display-list',
  templateUrl: './quiz-display-list.component.html',
  styleUrls: ['./quiz-display-list.component.scss']
})
export class QuizDisplayListComponent implements OnInit {
  constructor(public route: ActivatedRoute,
              private Activerouter: ActivatedRoute,
              private router: Router,
              private location: Location,
              public quizService: QuizService,
              private deviceService: DeviceDetectorService) {
    this.getAllQuiz(); }

  bgColor = 'primary';

  public quizList: Quiz[] = [];
  public doQuiz;
  public idPatient: number;
  public inviteToCreateQuiz = null;
  public searchedQuiz: Quiz = DEFAULT_QUIZ;
  loading: boolean;

  ngOnInit(): void {
    this.doQuiz = (this.route.snapshot.params.do === 'true');
    this.idPatient = + (this.Activerouter.snapshot.params.idPatient);
    this.getAllQuiz();
  }
  getAllQuiz() {
    this.loading = true;
    this.quizService.getQuiz().subscribe((quiz) => {

      this.loading = false;
      if (!quiz) {
        // tslint:disable-next-line:max-line-length
        if (confirm('une erreur de chargement s\'est produite voulez-vous rééssayer?')) { this.getAllQuiz(); } else {alert('Veuillez conctater l\'administrateur'); return; }
      }

      this.quizList = quiz;
      this.inviteToCreateQuiz = this.quizList.length === 0 ;

    });
  }
  quizSelected(selected: boolean) {
  }
  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz).subscribe(() => {
      this.getAllQuiz();
    });
  }


  selectQuiz(quiz: Quiz) {
    if ( this.doQuiz) {
      this.router.navigate([ '/quiz-do/' + quiz.id + '/start' , { idPatient: this.idPatient}]);
      //  this.router.navigate(['/quiz-list', { do: true, idPatient: profil.id } ]);
    } else {
      this.router.navigateByUrl('/quiz-edit/' + quiz.id);
    }
  }


  back() {
    if (this.doQuiz ) {
      if ( this.idPatient === 0 ) {
        this.router.navigateByUrl('/home-do-quiz' );
      } else {
        this.router.navigate(['/profils-carousel' , {do: true}]);
      }
    } else { this.location.back(); }
  }

  motQuitter() {
    if (this.deviceService.isTablet() || this.deviceService.isMobile()) {
      return 'Touchez sur la barre de progression pour quitter un quiz à tout moment';
    } else {
      return 'Appuyer sur echap 2 fois pour quitter un quiz à tout moment';

    }
  }
}
