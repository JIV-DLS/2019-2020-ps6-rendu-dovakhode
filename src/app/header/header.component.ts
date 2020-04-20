import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from '../../environments/environment';
import {Quiz} from '../../models/quiz.model';
import {Location} from '@angular/common';
import {RouteNames} from '../../models/routeNames';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerName = environment.appName;
  routeName = '';
  isOpened = false;
  public routeNames = RouteNames;
  @Output()
  selectEmitter: EventEmitter<null> = new EventEmitter<null>();

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.updateHeaderName(this.router.url);
    this.location.onUrlChange((url, state) => {
      this.updateHeaderName(url);
    });
  }

  private updateHeaderName(url: string) {
    const internPathsString = url.split('/');
    switch (internPathsString.length) {
      case 2:
        const internPathString = internPathsString[1];
        if (internPathString.indexOf('quiz-list') === 0) {
          if (internPathString.indexOf('do=true') > 0) {
            this.routeName = 'Jouer à un quiz';
          } else {
            this.routeName = 'Modification d\'un quiz';
          }
        } else {
          this.routeName = this.routeNames.routeNamesObject[internPathString.split(';')[0]];
        }
        break;
      case 4:
        if (internPathsString[1].indexOf('start') === 0) {
          this.routeName = 'Début du quiz';
        } else {
          this.routeName = 'Fin du quiz';
        }
        break;
      default:
        this.routeName = this.routeNames.routeNamesObject[internPathsString[1]];
        break;
    }
    // this.routeName = this.routeNames.routeNamesObject[url.split('/')[1].split(';')[0]];
  }
}
