import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profil} from '../../../models/profil.model';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

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
  constructor(private  Activerouter: ActivatedRoute) { }
  hover: boolean;
  ngOnInit() {
    this.hover = false;
    this.do = (this.Activerouter.snapshot.params.do === 'true');
  }
  select() {
    this.selectEmitter.emit(true);
  }
  delete() {
    this.deleteEmitter.emit(confirm(environment.deleteWarning + this.profil.nom + ') ?'));
  }

  col() {
    if (this.do) {
      // alert('Doing quiz');
      return 9;
    } else {
      alert('Edition');
      return 10;
    }
  }

}
