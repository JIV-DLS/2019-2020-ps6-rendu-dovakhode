import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Answer} from '../../../models/answer.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Question} from '../../../models/question.model';
import {AnswersService} from '../../../services/answers.service';

@Component({
  selector: 'app-answer-add',
  templateUrl: './answer-add.component.html',
  styleUrls: ['./answer-add.component.scss']
})

export class AnswerAddComponent implements OnInit {
constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<AnswerAddComponent>,
            @Inject(MAT_DIALOG_DATA) public answerWithImage) {}


  answerForm: FormGroup;
  public imagePreview: string;

  ngOnInit() {
    this.initializeAnswerForm();
  }
  private initializeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      type : [],
      value: [],
      isCorrect: false,
      image: null,
      imagePreview: ''
    });
  }
  addAnswer() {
    const answerConst: Answer =  (Answer.answerFormValues(this.answerForm)) as Answer;
    answerConst.tmpUrl = this.answerForm.get('imagePreview');
    this.dialogRef.close({answer:  answerConst});
    /*if (this.question.id && this.question.quizId) {
      answerConst.quizId = this.question.quizId;
      answerConst.questionId = this.question.id;
      this.answersService.addAnswer(answerConst).subscribe((ans) => {
        this.dialogRef.close( {answer : ans});
      });
    } else {
     }*/
  }
  createAnswer() {
   // this.answerCreated.emit(this.answerFormValue());
  }

}
