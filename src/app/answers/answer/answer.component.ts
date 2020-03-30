import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/answer.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input()
  answer: Answer;
  @Output()
  goodAnswerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

  }

  isTrue(answer) {
    console.log(answer);
    const styleButton = document.getElementById(answer).style;
    if (this.answer.isCorrect) {
     styleButton.backgroundColor = 'green';
     styleButton.fontWeight = 'bold';
     setTimeout(() =>    this.goodAnswerSelected.emit(true)
    , 1000);
    } else {
      document.getElementById(answer).style.visibility = 'hidden';
    }
  }
}
