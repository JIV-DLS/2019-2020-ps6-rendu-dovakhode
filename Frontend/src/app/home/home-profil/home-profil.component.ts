import {Component, Input, OnInit} from '@angular/core';
import {Profil} from '../../../models/profil.model';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProfilComponent} from '../../Profils/profil/profil.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home-profil',
  templateUrl: './home-profil.component.html',
  styleUrls: ['./home-profil.component.scss']
})
export class HomeProfilComponent implements OnInit {
  public profilSearched: Profil = DEFAULT_PROFIL;
  constructor( public dialog: MatDialog,
               private dialogRef: MatDialogRef<ProfilComponent>) { }

  ngOnInit(): void {
  }
}
