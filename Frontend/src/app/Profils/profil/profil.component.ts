import {Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Profil} from '../../../models/profil.model';
import {ProfilEditComponent} from '../profil-edit/profil-edit.component';
import {EditQuestionComponent} from '../../questions/edit-question/edit-question.component';
import {Question} from '../../../models/question.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfilServices} from '../../../services/profil.services';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  private profilDialogOpened = false;
  public profilForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public profil: Profil,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ProfilComponent>,
              public formBuilder: FormBuilder,
              private profilService: ProfilServices,
              private router: Router,
              private matDialogService: DialogService) { }

  ngOnInit(): void {
    this.initiForm(this.profil);
  }
  initiForm(profil: Profil) {
    this.profilForm = this.formBuilder.group({
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
  public profilImage() {
    return this.profilForm.get('image').value;
  }
  addQuiz()
  {
    this.dialogRef.close();
    this.router.navigate(['/quiz-add',{idPatient:this.profil.id}]);
  }

  editProfile() {
    this.dialogRef.close();
    this.router.navigateByUrl('/profil-edit/' + this.profil.id);
   /*const dialogRef = this.dialog.open(ProfilEditComponent, {
    width: '950px',
    maxHeight: '500px',
    data: this.profil
  });
  dialogRef.afterClosed().subscribe(response => {
    this.profilDialogOpened = false;
    if (response != null) {
    this.replaceProfileByData(this.profil, {...this.createProfilByData(response.profil).getRawValue()});
    this.profil.image = response.image;
    /*this.dialogRef.close({
        del: false
      });
    }
  });*/
  }
  deleteProfile() {
    this.matDialogService.openConfirmDialog('Voulez vous vraiment supprimer le profil de  ' +
      this.profil.prenom + ' ' + this.profil.nom + ' ?').afterClosed().subscribe((res) => {
        if (res) {
          this.dialogRef.close({
            del: true
          });
        }
    });

  }

  results() {
    this.router.navigate(['resultats/' + '' + this.profil.id]);
    this.dialogRef.close(ProfilEditComponent);
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
}
