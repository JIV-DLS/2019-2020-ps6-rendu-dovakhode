import { Component, OnInit } from '@angular/core';
import {Profil} from '../../models/profil.model';
import {DEFAULT_PROFIL} from '../../mocks/profil-list.mock';
import {ProfilServices} from '../../services/profil.services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profil-list-display',
  templateUrl: './profil-list-display.component.html',
  styleUrls: ['./profil-list-display.component.scss']
})
export class ProfilListDisplayComponent implements OnInit {
  public loading: boolean;
  public profilList: Profil[] = [ ];
  inviteToCreateProfil: boolean;
  public doquiz;
  public profilSearched: Profil = DEFAULT_PROFIL;
  bgcolor = 'primary';
  color = 'accent';
  constructor(public profilService: ProfilServices, public route: ActivatedRoute) { }

  ngOnInit( ): void {
    this.doquiz = (this.route.snapshot.params.do === 'true');
  }

  getAllProfils() {
    this.loading = true;
    this.profilService.getProfil().subscribe((profil) => {

      this.loading = false;
      if (!profil) {
        // tslint:disable-next-line:max-line-length
        if (confirm('une erreur de chargement s\'est produite voulez-vous rééssayer?')) { this.getAllProfils(); } else {alert('Veuillez conctater l\'administrateur'); return; }
      }

      this.profilList = profil;
      this.inviteToCreateProfil = this.profilList.length === 0 ;

    });
  }
}
