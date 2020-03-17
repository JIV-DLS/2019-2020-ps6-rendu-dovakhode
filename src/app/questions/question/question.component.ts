import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() editable: boolean;
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  makeEditable() {
    this.edit.emit(true);
  }
  deleteEvent() {
    this.delete.emit(confirm('Êtes vous sûr de vouloir supprimer la question ' + this.question.label + '?'));
  }
}
