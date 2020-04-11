import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Answer} from '../../../models/answer.model';
import {AnswerAddComponent} from '../../answers/answer-add/answer-add.component';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {Location} from '@angular/common';
import {AnswersService} from '../../../services/answers.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  @Input() question: Question;
  questionEdit: Question;
  questionForm: FormGroup;
  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditQuestionComponent>,
              public dialog: MatDialog,
              public answersService: AnswersService,
              @Inject(MAT_DIALOG_DATA) public questionDialog: Question) { }

  ngOnInit() {
    this.question = new Question(this.questionDialog);
    this.initializeQuestionForm();
  }
  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      id: 0,
      label: [this.question.label],
      answers: this.formBuilder.array( [])
    });
    if (this.question) {
      this.question.answers.forEach(answer => this.answers.push(this.createAnswerByData(answer)));
    }
  }
  private createAnswerByData(answer: Answer) {
    return this.formBuilder.group({
      value: answer.value,
      isCorrect: answer.isCorrect,
    });
  }
  editQuestion() {
    this.question = Object.assign({}, this.questionEdit);
  }
  editionState($state: boolean) {
    if ($state) {this.editQuestion(); }
    this.save.emit(true);
  }
  clean(i: number) {
    this.answers.removeAt(i);
    // this.answers.setValue(this.questionFormValue().answers.splice(i, 0));
    // (this.answers as unknown as Answer[]).splice(i,0);
  }

  edit() {

  }
  /*selectAnswer(answer: Answer) {
      this.router.navigateByUrl('/quiz-edit/' + answer.questionId + '/' + answer.id);
  }*/
  col() {
    if (this.question.image) {
      return 6;
    } else {
      return 5;
    }
  }

  retour() {
    this.dialogRef.close();
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

  deleteAnswer(confirm: boolean, answer: Answer ) {
    if (confirm) {this.answersService.deleteAnswer(answer).subscribe(() => {
      this.getAllAnswers();
    }); }
  }
  getAllAnswers() {
    // this.answersService.getAnswer(this.question.quizId.toString(),
    // this.question.id.toString()).subscribe((answer) => this.answers = answer);
  }
}
