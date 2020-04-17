import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Profil} from '../../../models/profil.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public profil: Profil) { }

  ngOnInit(): void {
  }

}
