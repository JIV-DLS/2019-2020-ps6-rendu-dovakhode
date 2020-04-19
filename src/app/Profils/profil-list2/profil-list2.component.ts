import {Component, Input, OnInit} from '@angular/core';
import {difficulteSearch, themeSearch} from '../../../models/theme.models';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Profil} from '../../../models/profil.model';
import {ProfilServices} from '../../../services/profil.services';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-profil-list2',
  templateUrl: './profil-list2.component.html',
  styleUrls: ['./profil-list2.component.scss']
})
export class ProfilList2Component implements OnInit {
  @Input()
  public profilList: Profil[] = [];
  public themesValues = Object.values(themeSearch);
  public difficultiesValues = Object.values(difficulteSearch);
  public doQuiz;
  public inviteToCreateProfil = null;
  loading: boolean;
  constructor(private Activerouter: ActivatedRoute,
              private router: Router,
              private location: Location,
              public profilService: ProfilServices,
              private matDialogService: DialogService) {
    this.getAllProfil();
  }

  ngOnInit() {
    this.doQuiz = (this.Activerouter.snapshot.params.do === 'true');
  }
  getAllProfil() {
    this.loading = true;
    this.profilService.getProfil().subscribe((profil) => {

      this.loading = false;
      if (!profil) {
        // tslint:disable-next-line:max-line-length
        if (confirm('une erreur de chargement s\'est produite voulez-vous rééssayer?')) { this.getAllProfil(); } else {alert('Veuillez conctater l\'administrateur'); return; }
      }

      this.profilList = profil;
      this.inviteToCreateProfil = this.profilList.length === 0 ;

    });
  }
  quizSelected(selected: boolean) {
  }
  deleteProfil(comfirm: boolean, profil: Profil) {
    if (comfirm) {this.profilService.deleteProfil(profil).subscribe(() => {
      this.getAllProfil();
    }); }
  }


  SelectProfil(profil: Profil) {
  this.matDialogService.openConfirmDialog('Voulez vous vraiment lancer une partie de quiz avec le patient: ' +
    profil.nom + ' ' + profil.prenom + ' ?').afterClosed().subscribe((res) => {
    if (res) {
      this.router.navigate(['/quiz-list', { do: true, idPatient: profil.id } ]);
    }
  });
  }

  col() {
    if (this.doQuiz) {
      return 10;
    } else {
      return 11;
    }
  }

  back() {
    if (this.doQuiz) {this.router.navigateByUrl('/home-do-quiz'); } else { this.location.back(); }
  }

}
