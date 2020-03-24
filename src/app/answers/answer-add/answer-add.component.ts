import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Answer} from '../../../models/answer.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-answer-add',
  templateUrl: './answer-add.component.html',
  styleUrls: ['./answer-add.component.scss']
})
export class AnswerAddComponent implements OnInit {
constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<AnswerAddComponent>,
            @Inject(MAT_DIALOG_DATA) public answers: Answer[]) {}


  answerForm: FormGroup;

  ngOnInit() {
    this.initializeAnswerForm();
  }
  private initializeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      type : [],
      value: [],
      isCorrect: []
    });
  }
  addAnswer() {
    console.log((this.answerForm.getRawValue() as Answer));
    this.dialogRef.close( {answer : (Answer.questionFormValues(this.answerForm))});
  }
  createAnswer() {
   // this.answerCreated.emit(this.answerFormValue());
  }

}
