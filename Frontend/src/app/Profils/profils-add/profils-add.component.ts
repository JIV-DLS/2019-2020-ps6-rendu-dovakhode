import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profils-add',
  templateUrl: './profils-add.component.html',
  styleUrls: ['./profils-add.component.scss']
})
export class ProfilsAddComponent implements OnInit {
  bgColor = 'primary';
  public profilForm: FormGroup;
  imagePreview: string;
  constructor(private formbuilder: FormBuilder, private profilService: ProfilServices, private Activerouter: ActivatedRoute,
              private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.initiForm();
  }

  get nom() {
    return this.profilForm.get('nom') as FormArray;
  }
  initiForm() {
    this.profilForm = this.formbuilder.group({
      nom: '',
      age: [ 70 , [ Validators.required, Validators.min(50)]],
      prenom: '',
      stade: '',
      sexe: '',
      recommandations: '',
      image: [null]
    });
  }
  get age() {
    return this.profilForm.get('age') as FormArray;
  }
  getAgeErrorMessage() {
    if (this.age.hasError('required')) {
      return environment.incorrectAge;
    }
  }

  back() {
    this.location.back();
  }
  addProfil() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    if (this.profilForm.invalid) {
      alert(environment.formFieldsRequired);
      this.profilForm.markAllAsTouched();
      return;
    }
    const form = this.profilForm.value;
    const profil = new Profil();
    profil.prenom = form.prenom;
    profil.nom = form.nom;
    profil.age = +form.age;
    profil.stade = form.stade;
    profil.recommandations = form.recommandations;
    profil.sexe = this.profilForm.get('sexe').value;

    this.profilService.addProfil(profil, this.profilForm.get('image').value).subscribe((prof) => {
      if (prof !== undefined) {
        this.router.navigate(['/home-profil-gestion']);
      }
    });
    this.initiForm();

  }

}
