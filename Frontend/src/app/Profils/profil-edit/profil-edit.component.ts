import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProfilComponent} from '../profil/profil.component';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProfilEditComponent implements OnInit {
  public StateType: any;
  private stateSubject: BehaviorSubject<any>;
  public profilForm: FormGroup;
  public value;
  imagePreview: string;
  public imageChanged: boolean;
  public imageEvent: EventEmitter<boolean>;
  public savedImage: string;
  imageReestablisher: Subject<null> = new Subject();

  @Output()
  profileCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(@Inject(MAT_DIALOG_DATA) public profil: Profil,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ProfilComponent>,
              private formbuilder: FormBuilder,
              private profilService: ProfilServices,
              private router: Router,
              private Activerouter: ActivatedRoute) { }
  ngOnInit() {
    this.profilService.getProfilById ( + this.Activerouter.snapshot.paramMap.get('id'))
      .subscribe((profil) => {
        this.initiForm(profil);
      }, (error) => {this.cancelEdit(); });

  }
  deleteImage() {
    this.imageChanged = true;
    this.profil.image = '';
  }
  get nom() {
    return this.profilForm.get('nom') as FormArray;
  }
  initiForm(profil: Profil) {
    this.imageChanged = false;
    this.imagePreview = profil.image.length > 1 ? profil.image : null;
    this.savedImage = this.imagePreview;
    this.profilForm = this.formbuilder.group({
      nom: [profil.nom],
      age: [profil.age],
      prenom: [profil.prenom],
      stade: [profil.stade],
      sexe: [profil.sexe],
      recommandations: [profil.recommandations],
      image: [null],
      id: profil.id
    });
  }
  editTheProfil() {
    if (this.conform()) {
      const profilToModify: Profil =  (this.profilForm.getRawValue()) as Profil;
      profilToModify.image = this.profil.image;
      alert('this.profilFrom.get(\'image\').value = ' + this.profilForm.get('image').value);
      this.profilService
        .updateProfil(profilToModify,  this.profilForm.get('image').value )
        .subscribe((profil) => {
          if (profil !== undefined) {
            this.profil = profil;
            this.savedImage = profil.image;
            this.initiForm(profil);
          }
        });
      this.router.navigateByUrl('/home-profil-gestion');
    }
  }
  cancelEdit() {
    this.router.navigateByUrl('/home-profil-gestion');
  }
  conform() {
    return true;
  }
}
