import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';

@Component({
  selector: 'app-question-do',
  templateUrl: './question-do.component.html',
  styleUrls: ['./question-do.component.scss']
})
export class QuestionDoComponent implements OnInit {
  @Input() question: Question = DEFAULT_QUESTION;
  constructor() { }

  ngOnInit() {
  }

}
