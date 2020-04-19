import {Component, Input, OnInit} from '@angular/core';
import {Profil} from '../../../models/profil.model';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil-search-bar',
  templateUrl: './profil-search-bar.component.html',
  styleUrls: ['./profil-search-bar.component.scss']
})
export class ProfilSearchBarComponent implements OnInit {

  profilSearched = DEFAULT_PROFIL;
  @Input()
  doQuiz: any;
  constructor(public location: Location, private router: Router) { }

  ngOnInit(): void {

  }

  back() {
    if (this.doQuiz) {this.router.navigateByUrl('/home-do-quiz'); } else { this.location.back(); }
  }
  col() {
    if (this.doQuiz) {
      return 10;
    } else {
      return 11;
    }
  }
}
