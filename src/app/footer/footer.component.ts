import {Component, Input, OnInit} from '@angular/core';
import {EvolutionService} from '../../services/evolution.service';
import {Location} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input()
  isPlaying: boolean;
  isTablet: boolean;
  isMobile: boolean;
  progression: {did: number, total: number};
  constructor(public evolutionService: EvolutionService, private location: Location, private deviceService: DeviceDetectorService) {
      this.isTablet =  this.deviceService.isTablet();
      this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.evolutionService.evolutionProgressValue.subscribe(progression => this.progression = progression);
  }

  interruptProgression() {
    if ( this.isTablet || this.isMobile ) {
      // tslint:disable-next-line:max-line-length
      if (confirm((this.progression.did > 0 ? (this.progression.did + ' ' + (this.progression.did > 1 ? 'questions jouées' : 'questios joué') + ' sur ' + this.progression.total) : 'Aucune question n\'a été jouée! ' + this.progression.total + ' questions restantes.') +
        '\nVoulez-vous vraiment retourner au choix de quiz?')) {
        this.location.back();
        this.location.back();
      }
    }
  }
}
