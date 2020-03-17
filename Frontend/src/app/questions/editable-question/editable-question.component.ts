import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-editable-question',
  templateUrl: './editable-question.component.html',
  styleUrls: ['./editable-question.component.scss']
})
export class EditableQuestionComponent implements OnInit {
  edit = false;
  @Input() question: Question;
  constructor() { }

  ngOnInit() {
  }

  editionMode(editionValue: boolean) {
    this.edit = editionValue;
  }

}
