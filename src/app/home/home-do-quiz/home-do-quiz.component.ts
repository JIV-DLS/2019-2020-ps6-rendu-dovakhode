import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home-do-quiz',
  templateUrl: './home-do-quiz.component.html',
  styleUrls: ['./home-do-quiz.component.scss']
})
export class HomeDoQuizComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
profil() {
  alert(environment.maintenanceMessage);
}
}
