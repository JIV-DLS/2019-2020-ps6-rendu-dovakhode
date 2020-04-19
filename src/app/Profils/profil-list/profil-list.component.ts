import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilListComponent implements OnInit {
  @Input()
  public profilsList: Profil[] = [];
  public inviteToCreateProfil = null;
  public doQuizWithProfil = false;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  public loading;
  @Output()
  profilSelected: EventEmitter<Profil> = new EventEmitter<Profil>();

  constructor(private Activerouter: ActivatedRoute,
              private router: Router,
              private location: Location,
              public profilService: ProfilServices,
              private matDialogService: DialogService) {
    this.getAllProfils();
  }

  ngOnInit() {
    this.doQuizWithProfil = (this.Activerouter.snapshot.params.do === 'true');

  }

  getAllProfils() {
    this.loading = true;
    this.profilService.getProfil().subscribe((profil) => {

      this.loading = false;
      if (!profil) {
        // tslint:disable-next-line:max-line-length
        if (confirm('une erreur de chargement s\'est produite voulez-vous rééssayer?')) { this.getAllProfils(); } else {alert('Veuillez conctater l\'administrateur'); return; }
      }

      this.profilsList = profil;
      this.inviteToCreateProfil = this.profilsList.length === 0 ;

    });
  }
  selectProfil(profil: Profil) {
    if ( this.doQuizWithProfil) {
      this.matDialogService.openConfirmDialog('Voulez vous vraiment lancer une partie de quiz avec le patient: ' +
        profil.nom + ' ' + profil.prenom + ' ?').afterClosed().subscribe((res) => {
        if (res) {
          this.router.navigate(['/quiz-list', { do: true, idPatient: profil.id } ]);
        }
      });
    } else {
      this.profilSelected.emit(profil);
    }
  }


}

