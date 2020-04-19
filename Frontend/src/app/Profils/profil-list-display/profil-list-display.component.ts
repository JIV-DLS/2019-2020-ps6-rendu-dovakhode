import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-list-display',
  templateUrl: './profil-list-display.component.html',
  styleUrls: ['./profil-list-display.component.scss']
})
export class ProfilListDisplayComponent implements OnInit {

  bgcolor = 'primary';
  color = 'accent';
  constructor() { }

  ngOnInit(): void {
  }

}
