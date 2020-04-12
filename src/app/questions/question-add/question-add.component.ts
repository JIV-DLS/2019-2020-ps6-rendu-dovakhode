import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {Answer} from '../../../models/answer.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AnswersComponent} from '../../answers/answers.component';
import {AnswerAddComponent} from '../../answers/answer-add/answer-add.component';


// @ts-ignore
@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  constructor(public formBuilder: FormBuilder,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<QuestionAddComponent>,
              @Inject(MAT_DIALOG_DATA) public questionEdition: Question) { }
  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }
  full = false;
  questionForm: FormGroup;
  answerDialogOpened = false;
  @Input() question: Question = null;
  @Input() editable = false;
  @Output()
  fullState: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  editQuestion: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  questionCreated: EventEmitter<Question> = new EventEmitter<Question>();
  public imagePreview: string;

  ngOnInit() {
    this.question = new Question();
    this.initializeQuestionForm();
  }
  private initializeQuestionForm() {
    console.log('Here are the answers' + this.questionEdition.answers);
    this.questionForm = this.formBuilder.group({
      id: 0,
      label: [this.questionEdition.answers != null ? (this.questionEdition as Question).label : ''],
      answers: this.formBuilder.array( []),
      image: [this.questionEdition.answers != null ? (this.questionEdition as Question).image : null],
    });
    console.log('Image lors de l\'édition: ' + this.questionEdition.image);
    if (this.questionEdition.answers != null) {
      // this.imagePreview = this.questionEdition.image;
      (this.questionEdition as Question).answers.forEach(answer => this.answers.push(this.createAnswerByData(answer)));
    }
  }
  private createAnswerByData(answer: Answer) {
    return this.formBuilder.group({
      value: answer.value,
      isCorrect: answer.isCorrect,
    });
  }
  addAnswer() {
    if (this.answers.length < 4) {
      this.openDialog();
    } else {
      alert('Vous ne pouvez pas ajouter plus de 4 réponses à une question');
    }
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

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.questionForm.get('image').patchValue(file);
    this.questionForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.questionForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
  deleteImage() {
    this.questionForm.get('image').reset();
    this.imagePreview = null;
  }
  clean(i: number) {
    this.answers.removeAt(i);
    // this.answers.setValue(this.questionFormValue().answers.splice(i, 0));
    // (this.answers as unknown as Answer[]).splice(i,0);
  }
  createQuestion() {
    if (this.conform()) {
      this.questionCreated.emit(this.questionFormValue());
      this.dialogRef.close(this.questionFormValue());
    }
    // console.log(this.questionFormValue());
  }
  edit() {
    if (this.conform()) {
      this.editQuestion.emit(true);
      this.dialogRef.close(this.questionFormValue());
    }
  }
  cancel() {
    this.editQuestion.emit(false);
  }
  conform() {
    if (this.answers.length === 0) {
      alert('Ajoutez au moins une réponse à votre question');
      return false;
    }
    if (this.questionFormValue().label === '') {
      alert('Ajoutez un titre à votre question');
      return false;
    }
    return true;
  }
}
