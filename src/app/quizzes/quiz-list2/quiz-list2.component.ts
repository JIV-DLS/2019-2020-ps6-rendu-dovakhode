import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Profil} from '../../../models/profil.model';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {difficulteSearch, themeSearch} from '../../../models/theme.models';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quiz-list2',
  templateUrl: './quiz-list2.component.html',
  styleUrls: ['./quiz-list2.component.scss']
})
export class QuizList2Component implements OnInit {
  public quizList: Quiz[] = [];
  public inviteToCreateProfil = null;
  public doQuizWithProfil = false;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  public themesValues = Object.values(themeSearch);
  public difficultiesValues = Object.values(difficulteSearch);
  public loading;
  public doQuiz;
  public searchedQuiz: Quiz = DEFAULT_QUIZ;
  public idPatient: number;
  @Output()
  profilSelected: EventEmitter<Profil> = new EventEmitter<Profil>();

  constructor(private quizServicevice: QuizService, public route: ActivatedRoute, public router: Router, private location: Location) { }

  ngOnInit(): void {
    this.idPatient = + (this.route.snapshot.params.idPatient);
    this.doQuiz = (this.route.snapshot.params.do === 'true');
    this.getAllQuiz();
  }
  back() {
    if (this.doQuiz ) {
      if ( this.idPatient === 0 ) {
        this.router.navigateByUrl('/home-do-quiz' );
      } else {
        this.router.navigate(['/profil-list' , {do: true}]);
      }
    } else { this.location.back(); }
  }



  getAllQuiz() {
    this.loading = true;
    this.quizServicevice.getQuiz().subscribe((quiz) => {

      this.loading = false;
      if (!quiz) {
        // tslint:disable-next-line:max-line-length
        if (confirm('une erreur de chargement s\'est produite voulez-vous rééssayer?')) { this.getAllQuiz(); } else {alert('Veuillez conctater l\'administrateur'); return; }
      }

      this.quizList = quiz;

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





}
