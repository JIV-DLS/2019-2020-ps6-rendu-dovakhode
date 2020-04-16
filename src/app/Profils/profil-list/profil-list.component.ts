import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfilServices} from '../../../services/profil.services';
import {Profil} from '../../../models/profil.model';
import {DEFAULT_PROFIL} from '../../../mocks/profil-list.mock';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilListComponent implements OnInit {
  public profilsList: Profil[] = [];
  public searchedProfil: Profil = DEFAULT_PROFIL;
  public inviteToCreateProfil = null;
  public doQuizWithProfil;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  public loading;

  slides = [
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/les_pièrres...1585240035409.jpg' },
    {image: 'http://localhost:9428/images/quiz/les_pièrres...1585240035409.jpg' },
    {image: 'http://localhost:9428/images/quiz/les_pièrres...1585240035409.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },

    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },
    {image: 'http://localhost:9428/images/quiz/salut1587027225048.jpg' },

  ];

  constructor(private Activerouter: ActivatedRoute,
              private router: Router,
              private location: Location,
              public profilService: ProfilServices) {
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
  selectQuiz(profil: Profil) {
    if ( this.doQuizWithProfil) {
      // TODO route pour faire un quiz avec un profil
    } else {
      // TODO ouvri une boite de dialigue pour voir un profil
    }
  }


}

