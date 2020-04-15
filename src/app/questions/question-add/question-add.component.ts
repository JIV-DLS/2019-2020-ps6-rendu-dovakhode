import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AnswerAddComponent} from '../../answers/answer-add/answer-add.component';
import {Answer} from '../../../models/answer.model';
import {MatSlideToggle} from '@angular/material/slide-toggle';


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
  @ViewChild('answerWithImage') answerWithImage: MatSlideToggle;

  ngOnInit() {
    this.question = new Question();
    this.initializeQuestionForm();
  }
  private initializeQuestionForm() {
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
  private createAnswerByData(answer) {
    return this.formBuilder.group({
      value: answer.value,
      isCorrect: answer.isCorrect,
      image: answer.image,
      tmpUrl: answer.tmpUrl
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
      data: this.answerWithImage.checked
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.answers.push(this.createAnswerByData(data.answer)); }
    });
  }
  answerHaveImage(i: number) {
    return (this.answers.at(i).value as Answer).tmpUrl.length > 0;
  }
  questionFormValue() {
    return Question.quizFormValues(this.questionForm) as Question;
  }

  deleteImage() {
    this.questionForm.get('image').reset();
    this.imagePreview = null;
  }
  clean(i: number) {
    this.answers.removeAt(i);
  }
  createQuestion() {
    if (this.conform()) {
      this.questionCreated.emit(this.questionFormValue());
      this.dialogRef.close(this.questionFormValue());
    }
  }
  edit() {
    if (this.conform()) {
      this.editQuestion.emit(true);
      this.dialogRef.close(this.questionForm);
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
