import {Component, Input, OnInit} from '@angular/core';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {difficulteSearch, themeSearch} from '../../../models/theme.models';

@Component({
  selector: 'app-quiz-search-bar',
  templateUrl: './quiz-search-bar.component.html',
  styleUrls: ['./quiz-search-bar.component.scss']
})
export class QuizSearchBarComponent implements OnInit {
  @Input()
  idPatient: number;
  @Input()
  public doQuiz;
  @Input()
  searchedQuiz = DEFAULT_QUIZ;
  public themesValues = Object.values(themeSearch);
  public difficultiesValues = Object.values(difficulteSearch);
  constructor(private router: Router , public location: Location) { }

  ngOnInit(): void {
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
}
