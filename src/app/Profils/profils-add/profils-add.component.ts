import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';

@Component({
  selector: 'app-profils-add',
  templateUrl: './profils-add.component.html',
  styleUrls: ['./profils-add.component.scss']
})
export class ProfilsAddComponent implements OnInit {
  public profilForm: FormGroup;
  imagePreview: string;
  constructor(private formbuilder: FormBuilder, private profilService: ProfilServices) { }

  ngOnInit(): void {
    this.initiForm();
  }

  get nom() {
    return this.profilForm.get('nom') as FormArray;
  }
  initiForm() {
    this.profilForm = this.formbuilder.group({
      nom: '',
      age: '',
      prenom: '',
      stade: '',
      sexe: '',
      recommandations: '',
      image: [null]
    });
  }

  addProfil() {
    const form = this.profilForm.value;
    const profil = new Profil();
    profil.prenom = form.prenom;
    profil.nom = form.nom;
    profil.age = +form.age;
    profil.stade = form.stade;
    profil.recommandations = form.recommandations;
    profil.sexe = this.profilForm.get('sexe').value;

    this.profilService.addProfil(profil, this.profilForm.get('image').value).subscribe();
    this.initiForm();

  }
}
