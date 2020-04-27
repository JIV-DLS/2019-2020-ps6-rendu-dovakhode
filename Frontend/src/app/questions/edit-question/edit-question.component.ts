import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from '../../../models/question.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Answer} from '../../../models/answer.model';
import {AnswerAddComponent} from '../../answers/answer-add/answer-add.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  private deletedAnswers: Answer[] = [];
  constructor(public formBuilder: FormBuilder,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<EditQuestionComponent>,
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
    this.question = new Question(this.questionEdition);
    this.question.answers = [];
    this.imagePreview = this.questionEdition.tmpUrl != null ? this.questionEdition.tmpUrl : this.questionEdition.image;
    this.initializeQuestionForm();
  }
  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      id: this.question.id,
      label: [this.question.label],
      answers: this.formBuilder.array([]),
      image: [this.question.image],
      imagePreview: this.question.tmpUrl
    });
    this.questionEdition.answers.forEach(answer => this.answers.push(this.createAnswerByData(answer)));
  }
  private createAnswerByData(answer) {
    return this.formBuilder.group({
      id: answer.id,
      value: answer.value,
      isCorrect: answer.isCorrect,
      image: answer.image,
      tmpUrl: answer.tmpUrl,
      questionId: this.questionEdition.id,
      quizId: this.questionEdition.quizId
    });
  }
  dragAddAnswer() {
    this.answerWithImage.checked = true;
    this.addAnswer();
  }
  addAnswer() {
    if (this.answers.length < 4) {
      this.openDialog();
    } else {
      this.alertAnswersLenghtReached();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AnswerAddComponent, {
      width: '800px',
      height: this.answerWithImage.checked ? '380px' : '300px',
      data: this.answerWithImage.checked
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.answers.push(this.createAnswerByData(data.answer)); }
    });
  }
  answerHaveImage(i: number) {
    return (this.answers.at(i).value as Answer)?.tmpUrl?.length > 0 || (this.answers.at(i).value as Answer)?.image?.length > 0;
  }
  questionFormValue() {
    return Question.questionFormValues(this.questionForm) as Question;
  }

  deleteImage() {
    this.questionForm.get('image').reset();
    this.imagePreview = null;
  }
  clean(i: number) {
    if (this.answers.at(i).value.id !== 0) {
      this.deletedAnswers.push(this.answers.at(i).value as Answer);
    }
    this.answers.removeAt(i);
  }
  editTheQuestion() {
    if (this.conform()) {
      const question: Question =  (Question.questionFormValues(this.questionForm)) as Question;
      question.tmpUrl = this.questionForm.get('imagePreview').value;
      this.questionCreated.emit(question);
      /* tslint:disable */
      this.dialogRef.close({
        question : question ,
        deletedAnswers : this.deletedAnswers});
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

  close() {
    this.dialogRef.close(null);
  }

  alertAnswersLenghtReached() {
    alert('Vous ne pouvez pas ajouter plus de 4 réponses à une question, Veuillez en supprimé puis rééssayer.');
  }

  answersLenghtReached() {
    if(this.answers.length>3)this.alertAnswersLenghtReached();
  }
}
