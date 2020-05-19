import { Component, OnInit } from '@angular/core';
import {Profil} from "../../../models/profil.model";
import {DEFAULT_PROFIL} from "../../../mocks/profil-list.mock";

@Component({
  selector: 'app-profil-for-edit-quiz',
  templateUrl: './profil-for-edit-quiz.component.html',
  styleUrls: ['./profil-for-edit-quiz.component.scss']
})
export class ProfilForEditQuizComponent implements OnInit {
  bgcolor = 'primary';
  color = 'accent';
  modify = true;
  public profilSearched: Profil = DEFAULT_PROFIL;
  constructor() { }

  ngOnInit(): void {
  }

}
