import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ProfilServices} from '../../../../services/profil.services';
import {Profil} from '../../../../models/profil.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProfilComponent} from '../profil.component';
import {Question} from '../../../../models/question.model';

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
    this.initiForm();
  }

  get nom() {
    return this.profilForm.get('nom') as FormArray;
  }
  initiForm() {
    this.profilForm = this.formbuilder.group({
      nom: this.profil.nom,
      age: this.profil.age,
      prenom: this.profil.prenom,
      stade: this.profil.stade,
      sexe: this.profil.sexe,
      recommandations: this.profil.recommandations,
      image: this.profil.image
    });
  }

  editTheProfil() {
    if (this.conform()) {
      const profil: Profil =  (this.profilForm.getRawValue()) as Profil;
      // profil.tmpUrl = this.profilForm.get('imagePreview').value;
      this.profileCreated.emit(profil);
      alert( profil.age + '-- Age sent --');
      /* tslint:disable */
      this.dialogRef.close({

        profil : profil});
    }
    /*const form = this.profilForm.value;
    const profil = ;
    profil.prenom = form.prenom;
    profil.nom = form.nom;
    profil.age = +form.age;
    profil.stade = form.stade;
    profil.recommandations = form.recommandations;
    profil.sexe = this.profilForm.get('sexe').value;*/
  }
  conform(){
    return true;
  }
}
