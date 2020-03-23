import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-less-info',
  templateUrl: './quiz-less-info.component.html',
  styleUrls: ['./quiz-less-info.component.scss']
})
export class QuizLessInfoComponent implements OnInit {
  @Input() quiz: Quiz;
  constructor() { }

  ngOnInit() {
  }

}
