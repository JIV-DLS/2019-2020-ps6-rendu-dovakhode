import { Component, OnInit } from '@angular/core';
import {Profil} from '../../models/profil.model';
import {DEFAULT_PROFIL} from '../../mocks/profil-list.mock';

@Component({
  selector: 'app-home-profil',
  templateUrl: './home-profil.component.html',
  styleUrls: ['./home-profil.component.scss']
})
export class HomeProfilComponent implements OnInit {
  public searchedProfil: Profil = DEFAULT_PROFIL;

  constructor() { }

  ngOnInit(): void {
  }

}
