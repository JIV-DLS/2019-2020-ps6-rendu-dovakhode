import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profils-add',
  templateUrl: './profils-add.component.html',
  styleUrls: ['./profils-add.component.scss']
})
export class ProfilsAddComponent implements OnInit {
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
      age: 70,
      prenom: '',
      stade: '',
      sexe: '',
      recommandations: '',
      image: [null]
    });
  }

  back() {
  this.location.back();
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

    this.profilService.addProfil(profil, this.profilForm.get('image').value).subscribe((prof) => {
      if (prof !== undefined) {
        this.router.navigate(['/home-profil-gestion']);
      }
    });
    this.initiForm();

  }

}
