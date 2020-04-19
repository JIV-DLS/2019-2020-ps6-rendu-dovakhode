import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz-display-list',
  templateUrl: './quiz-display-list.component.html',
  styleUrls: ['./quiz-display-list.component.scss']
})
export class QuizDisplayListComponent implements OnInit {

  public doQuiz;
  bgColor = 'primary';
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.doQuiz = (this.route.snapshot.params.do === 'true');
  }

}
