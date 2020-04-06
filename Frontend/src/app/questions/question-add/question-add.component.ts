import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {Answer} from '../../../models/answer.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AnswersComponent} from '../../answers/answers.component';
import {AnswerAddComponent} from '../../answers/answer-add/answer-add.component';


// @ts-ignore
@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  constructor(public formBuilder: FormBuilder, public dialog: MatDialog, private dialogRef: MatDialogRef<QuestionAddComponent >  ) { }
  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }
  full = false;
  questionForm: FormGroup;
  answerDialogOpened = false;
  @Input() questionEdition = null;
  @Input() question: Question = null;
  @Input() fullScrenable = false;
  @Input() editable = false;
  @Output()
  fullState: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  editQuestion: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  questionCreated: EventEmitter<Question> = new EventEmitter<Question>();

  ngOnInit() {
    this.question = new Question();
    this.initializeQuestionForm();
  }
  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      id: 0,
      label: [this.questionEdition ? (this.questionEdition as Question).label : ''],
      answers: this.formBuilder.array( [])
    });
    if (this.questionEdition) {
      (this.questionEdition as Question).answers.forEach(answer => this.answers.push(this.createAnswerByData(answer)));
    }
  }
  private createAnswerByData(answer: Answer) {
    return this.formBuilder.group({
      value: answer.value,
      isCorrect: answer.isCorrect,
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AnswerAddComponent, {
      width: '950px',
      maxHeight: '500px',
      data: this.question ? this.question : DEFAULT_QUESTION
    });
    dialogRef.afterClosed().subscribe(data => {
      this.answers.push(this.createAnswerByData(data.answer));
    });
  }
  questionFormValue() {
    return Question.quizFormValues(this.questionForm) as Question;
  }
  createQuestion() {
    this.questionCreated.emit(this.questionFormValue());
    this.dialogRef.close();
    // console.log(this.questionFormValue());
  }

  clean(i: number) {
    this.answers.removeAt(i);
    // this.answers.setValue(this.questionFormValue().answers.splice(i, 0));
    // (this.answers as unknown as Answer[]).splice(i,0);
  }

  edit() {
    this.editQuestion.emit(true);
  }

  cancel() {
    this.editQuestion.emit(false);
  }
}
