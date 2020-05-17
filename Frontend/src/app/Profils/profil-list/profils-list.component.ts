import {difficulteSearch, themeSearch} from '../../../models/theme.models';
import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Profil} from '../../../models/profil.model';
import {ProfilServices} from '../../../services/profil.services';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-profil-list2',
  templateUrl: './profils-list.component.html',
  styleUrls: ['./profils-list.component.scss']
})
export class ProfilsListComponent implements OnInit {
  @Input()
  public profilList: Profil[] = [];
  public doQuiz;
  public inviteToCreateProfil = null;
  @Output()
  profilClicked: EventEmitter<Profil> = new EventEmitter<Profil>();
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
 profilSelected(profil: Profil) {
    this.profilClicked.emit(profil);
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
