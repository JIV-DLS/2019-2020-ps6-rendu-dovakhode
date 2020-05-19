import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';
import {DialogService} from '../../../services/dialog.service';
import {Subject} from 'rxjs';
import {ProfilComponent} from '../profil/profil.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profils-carousel.component.html',
  styleUrls: ['./profils-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilsCarouselComponent implements OnInit {

  @Input()  profilChanged: Subject<any>;
  @Input()  profilSearched = '';
  @Input()
  public profilsList: Profil[] = [];
  public inviteToCreateProfil = null;
  @Input() public add = false;
  @Input() public modify = false;
  public doQuizWithProfil = false;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  public loading;
  @Output()
  profilSelected: EventEmitter<Profil> = new EventEmitter<Profil>();
  private eventEdit: boolean;
  constructor(private Activerouter: ActivatedRoute,
              private router: Router,
              private location: Location,
              public profilService: ProfilServices,
              public dialog: MatDialog,
              private matDialogService: DialogService) {
    if (this.profilsList.length === 0) {
    this.getAllProfils();
    }
  }

  ngOnInit() {
    this.doQuizWithProfil = (this.Activerouter.snapshot.params.do === 'true');
    if (this.profilChanged) {
      this.profilChanged.subscribe(_ => this.getAllProfils());
    }
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
    }
    if (this.doQuizWithProfil !== true && this.add) {
     this.goToAdd(profil);
    }
    if(this.doQuizWithProfil!==true && this.add!==true && this.modify)
    {
      console.log("ici");
      this.update(profil);
    }
    if (this.add !== true && this.modify!==true && this.doQuizWithProfil !== true) {
      this.viewProfil(profil);
    }
  }
  deleteProfil(profil: Profil) {
    this.profilService.deleteProfil(profil).subscribe(() => {
      this.getAllProfils();
    });
  }
  viewProfil(profil: Profil) {
    console.log(profil.nom);
    const dialogRef = this.dialog.open(ProfilComponent, {
      width: '70%',
      height: '80%',
      data: profil,
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if  (data.del) {
          this.deleteProfil(profil);
        }
        this.profilChanged.next(null);
      }
    });
  }

  update(profil:Profil)
  {
    this.router.navigate(['quiz-list',{do:false,idPatient:profil.id}]);
  }
  goToAdd(profil: Profil) {
    this.router.navigate(['quiz-add', {idPatient: profil.id}] );
  }
}

