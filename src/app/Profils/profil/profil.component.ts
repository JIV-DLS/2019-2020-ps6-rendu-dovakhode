import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Profil} from '../../../models/profil.model';
import {ProfilEditComponent} from '../profil-edit/profil-edit.component';
import {EditQuestionComponent} from '../../questions/edit-question/edit-question.component';
import {Question} from '../../../models/question.model';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  private profilDialogOpened = false;
  constructor(@Inject(MAT_DIALOG_DATA) public profil: Profil,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ProfilComponent>,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  editProfile() {
    const dialogRef = this.dialog.open(ProfilEditComponent, {
      width: '950px',
      maxHeight: '500px',
      data: this.profil
    });
    dialogRef.afterClosed().subscribe(response => {
      this.profilDialogOpened = false;
      if (response != null) {
      this.replaceProfileByData(this.profil, {...this.createProfilByData(response.profil).getRawValue()});
      alert('-- New profil image --' + this.profil.image);
      }
      });
  }
  private createProfilByData(profil) {
      return this.formBuilder.group({
        nom : profil.nom,
        age : profil.age,
        prenom: profil.prenom,
        stade: profil.stade,
        sexe: profil.sexe,
        recommandations: profil.recommandations,
        image: profil.image
      });
    }
    replaceProfileByData(profil, data) {
      profil.age = data.age;
      profil.nom = data.nom;
      profil.prenom = data.prenom;
      profil.stade = data.stade;
      profil.recommandations = data.recommandations;
      profil.sexe = data.sexe;
      profil.image = data.image;
    }
    deleteProfile() {
    }
}
