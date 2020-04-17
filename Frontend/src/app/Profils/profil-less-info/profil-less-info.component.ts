import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profil} from '../../../models/profil.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profil-less-info',
  templateUrl: './profil-less-info.component.html',
  styleUrls: ['./profil-less-info.component.scss']
})
export class ProfilLessInfoComponent implements OnInit {

  @Input() profil: Profil;
  @Input() do: boolean;
  @Output()
  selectEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  deleteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  hover: boolean;
  ngOnInit() {
    this.hover = false;
  }
  select() {
    this.selectEmitter.emit(true);
  }
  delete() {
    this.deleteEmitter.emit(confirm(environment.deleteWarning + this.profil.nom + ') ?'));
  }

  col() {
    if (this.do) {
      return 9;
    } else {
      return 10;
    }
  }

}
