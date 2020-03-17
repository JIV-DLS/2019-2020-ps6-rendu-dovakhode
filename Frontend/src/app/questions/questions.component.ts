import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Question} from '../../models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsDialogComponent implements OnInit {
  addFull = false;
  @Input() questionEdition = null;
  constructor(
    public dialogRef: MatDialogRef<QuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public questions: Question[]) {}


  ngOnInit(): void {
    if (this.questionEdition != null) {this.questions = this.questionEdition; }
  }
  addQuestion(question: Question) {
    this.questions.push(question);
  }
  changeFull(toFull: boolean) {
    this.addFull = toFull;
  }
  close() {
    this.dialogRef.close(this.questions);
  }
}
