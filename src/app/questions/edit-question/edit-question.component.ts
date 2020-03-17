import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  @Input() question: Question;
  questionEdit: Question;

  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.questionEdit = Object.assign({}, this.question);
  }
  editQuestion() {
    this.question = Object.assign({}, this.questionEdit);

  }
  editionState($state: boolean) {
    if ($state) {this.editQuestion(); }
    this.save.emit(true);
  }
}
