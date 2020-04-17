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
  @Input() deletable = false;
  @Input() editable: boolean;
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()number = 0;
  ngOnInit(): void {
  }
  deleteEvent() {
    this.delete.emit(confirm('Êtes vous sûr de vouloir supprimer la question ' + this.question.label + '?'));
  }

  editEvent() {
    this.edit.emit(true);
  }
}