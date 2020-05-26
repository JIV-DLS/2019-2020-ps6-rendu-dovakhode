import {Component, Input, OnInit} from '@angular/core';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {difficulteSearch, themeSearch} from '../../../models/theme.models';
import {ThemeServices} from '../../../services/theme.services';
import {Theme} from '../../../models/themes.model';
import {Subscription} from 'rxjs';
import {SubthemeService} from '../../../services/subtheme.service';
import {Subtheme} from '../../../models/subtheme.model';

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
  subscription: Subscription;
  subThemesValues: Subtheme[] = [];
  @Input()
  searchedQuiz = DEFAULT_QUIZ;
  public themesValues: Theme[] = [];
  public difficultiesValues = Object.values(difficulteSearch);
  constructor(private router: Router , public location: Location, private themeService: ThemeServices, private subThemeService: SubthemeService) { }

  ngOnInit(): void {
    this.getAllTheme();
    this.subscription = this.subThemeService.subThemesSubject.subscribe((subthemes) => {
      this.subThemesValues = subthemes;
    });
  }
  private getAllTheme() {
    this.themeService.getTheme().subscribe((themes) => {
      this.themesValues = themes;
      this.themesValues.push(new Theme());
    });
  }
  getThemId(label: string ) {
    for (let i = 0 ; i <= this.themesValues.length; i++) {
      if (this.themesValues[i].label === label) {
        return this.themesValues[i].id;
      }
    }
  }
  getSubTheme(value) {
    const id = this.getThemId(value.value);
    this.subThemeService.getSubTheme(id).subscribe((subThemes) => {
      this.subThemeService.Subthemes = subThemes;
      this.subThemeService.emitSubThemes();
      this.subThemesValues.push(new Subtheme());
    });

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
}
