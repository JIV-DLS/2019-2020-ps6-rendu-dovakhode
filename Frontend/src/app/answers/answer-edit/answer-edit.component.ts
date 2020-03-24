import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/answer.model';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss']
})
export class AnswerEditComponent implements OnInit {
  @Input() answer: Answer;
  answerEdit: Answer;

  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.answerEdit = Object.assign({}, this.answer);
  }

  editAnswer() {
    this.answer = Object.assign({}, this.answerEdit);
  }

  editionState($state: boolean) {
    if ($state) {this.editAnswer(); }
    this.save.emit(true);
  }

}
