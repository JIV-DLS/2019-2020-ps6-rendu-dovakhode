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
  showFiller = false;
  playingState() {
    const paths = this.location.path(true).split('/');
    return !(paths[1] === 'quiz-do' && paths[3] === undefined) && !(paths[1] === 'quiz-do' && paths[3] === 'end');
  }
  ngOnInit(): void {
    if (this.playingState()) {
      this.runningQuizId = this.cookiesService.get(environment.runningQuiz);
      if (this.runningQuizId) {
        if (confirm('La progression d\'un quiz a été retrouvé. Voulez-vous la reprendre?')) {
          this.router.navigateByUrl('/quiz-do/' + this.runningQuizId);
        } else {
          alert('La progression a été supprimé');
          this.cookiesService.delete(environment.runningQuiz);
        }
      }
    }
  }
}
