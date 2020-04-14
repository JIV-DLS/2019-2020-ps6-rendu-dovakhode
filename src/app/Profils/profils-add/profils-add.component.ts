import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profils-add',
  templateUrl: './profils-add.component.html',
  styleUrls: ['./profils-add.component.scss']
})
export class ProfilsAddComponent implements OnInit {
  public profilForm: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initiForm();
  }

  initiForm() {
    this.profilForm = this.formbuilder.group({
      nom: '',
      age: '',
      prenom: '',
      stade: '',
      sexe: '',
      recommandations: ''
    });
  }
}
