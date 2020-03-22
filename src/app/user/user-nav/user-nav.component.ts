import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkProfil() {
    alert(environment.maintenanceMessage);
  }

  logout() {
    alert(environment.maintenanceMessage);
  }
}
