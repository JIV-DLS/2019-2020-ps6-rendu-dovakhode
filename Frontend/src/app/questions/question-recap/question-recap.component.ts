import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question} from '../../../models/question.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {Evolution} from '../../../models/evolution.model';
import {MatDialog} from '@angular/material/dialog';
import {NextQuestionComponent} from '../next-question/next-question.component';

@Component({
  selector: 'app-question-recap',
  templateUrl: './question-recap.component.html',
  styleUrls: ['./question-recap.component.scss']
})
export class QuestionRecapComponent implements OnInit {
  breakpoint;
  rightAnswer;
  @Input() question: Question = DEFAULT_QUESTION;
  @Input() evolution: Evolution ;
  @Output()
  next: EventEmitter<number> = new EventEmitter<number>();
  constructor( public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.rightAns();
  }

  rightAns() {
    let i = 0;
    this.rightAnswer = new Array();
    for (const answer of this.question.answers) {
      if (answer.isCorrect) {
        this.rightAnswer.push(answer);
        i++;
      }
    }
    return this.rightAnswer;
  }
}
