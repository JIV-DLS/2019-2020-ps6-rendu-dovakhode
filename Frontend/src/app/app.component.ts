import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private runningQuizId = null;
  constructor(private cookiesService: CookieService, private router: Router,
              private location: Location) {
  }
  title = environment.appName;
  playingState() {
    return !(this.location.path(true).split('/')[1] === 'quiz-do');
  }
  patientPlaying() {
    const paths = this.location.path(true).split('/');
    return (paths.length <= 3 && paths[1] === 'quiz-do');
  }
  ngOnInit(): void {

  }
}
