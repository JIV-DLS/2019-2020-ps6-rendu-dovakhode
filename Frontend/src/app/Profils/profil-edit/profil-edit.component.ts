import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProfilComponent} from '../profil/profil.component';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss']
})
export class ProfilEditComponent implements OnInit {
  public profilForm: FormGroup;
  imagePreview: string;
  @Output()
  profileCreated: EventEmitter<Profil> = new EventEmitter<Profil>();
  constructor(@Inject(MAT_DIALOG_DATA) public profil: Profil,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ProfilComponent>,
              private formbuilder: FormBuilder,
              private profilService: ProfilServices,
              private Activerouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initiForm(this.profil);
  }

  get nom() {
    return this.profilForm.get('nom') as FormArray;
  }
  initiForm(profil: Profil) {
    this.profilForm = this.formbuilder.group({
      nom: profil.nom,
      age: profil.age,
      prenom: profil.prenom,
      stade: profil.stade,
      sexe: profil.sexe,
      recommandations: profil.recommandations,
      image: profil.image,
      id: profil.id
    });
  }

  editTheProfil() {
    if (this.conform()) {
      const profilToModify: Profil =  (this.profilForm.getRawValue()) as Profil;
      profilToModify.image = this.profil.image;
      this.profileCreated.emit(profilToModify);

      this.profilService
        .updateProfil(profilToModify,  this.profilForm.get('image') == null ? null : this.profilForm.get('image').value )
        .subscribe((profil) => {
          if (profil !== undefined) {
            this.profil = profil;
            this.imagePreview = profil.image;
            this.initiForm(profil);
          }
        });
      /* tslint:disable */
      this.dialogRef.close({
        profil : profilToModify});

    }

  }

  conform(){
    return true;
  }
}
