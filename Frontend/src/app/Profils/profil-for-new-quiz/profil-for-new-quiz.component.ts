import { Component, OnInit } from '@angular/core';
import {Profil} from "../../../models/profil.model";
import {DEFAULT_PROFIL} from "../../../mocks/profil-list.mock";

@Component({
  selector: 'app-profil-for-new-quiz',
  templateUrl: './profil-for-new-quiz.component.html',
  styleUrls: ['./profil-for-new-quiz.component.scss']
})
export class ProfilForNewQuizComponent implements OnInit {
  bgcolor = 'primary';
  color = 'accent';
  public profilSearched: Profil = DEFAULT_PROFIL;
  public add=true;
  constructor() { }

  ngOnInit(): void {
  }

}
