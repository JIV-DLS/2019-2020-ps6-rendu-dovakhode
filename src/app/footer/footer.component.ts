import {Component, Input, OnInit} from '@angular/core';
import {EvolutionService} from '../../services/evolution.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input()
  isPlaying: boolean;
  progression: {did: number, total: number};
  constructor(public evolutionService: EvolutionService, private location: Location) { }

  ngOnInit(): void {
    this.evolutionService.evolutionProgressValue.subscribe(progression => this.progression = progression);
  }

  interruptProgression() {
    // tslint:disable-next-line:max-line-length
    if (confirm((this.progression.did > 0 ? (this.progression.did + ' ' + (this.progression.did > 1 ? 'questions jouées' : 'questios joué') + ' sur ' + this.progression.total) : 'Aucune question n\'a été jouée! ' + this.progression.total + ' questions restantes.') +
      '\nVoulez-vous vraiment retourner au choix de quiz?')) {
      this.location.back();
      this.location.back();
    }
  }
}
