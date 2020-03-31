import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent implements OnInit {
id: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  restart() {
    this.router.navigate(['quiz-do/' + this.id + '/start']);
  }

  begining() {
this.router.navigate(['quiz-list;do=true']);
  }
}
