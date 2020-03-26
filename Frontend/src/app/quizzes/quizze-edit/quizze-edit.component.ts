import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {difficulte, theme} from '../../../models/theme.models';
import {QuestionsComponent} from '../../questions/questions.component';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-quizze-edit',
  templateUrl: './quizze-edit.component.html',
  styleUrls: ['./quizze-edit.component.scss']
})
export class QuizzeEditComponent implements OnInit {
  quiz: Quiz;
  private questionDialogOpened = false;
  public quizForm: FormGroup;
  public themesValues = Object.values(theme);
  public difficultiesValues = Object.values(difficulte);
  private imagePreview: string;
  loading: boolean;
  constructor(private location: Location,
              public quizService: QuizService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.loading = false;
        this.initializeTheForm(quiz);
        this.imagePreview = quiz.image.length > 1 ? quiz.image : null; }, (error) => {this.retour(); });
  }
  initializeTheForm(quiz) {
    this.quiz = quiz;
    this.quizForm = this.quizzFormInitializer();
  }
  quizzFormInitializer() {
    return this.formBuilder.group({
      id: this.quiz.id,
      label: [this.quiz.label, [ Validators.required, Validators.minLength(5)]],
      theme: [this.quiz.theme, [ Validators.required, Validators.minLength(3)]],
      subTheme: [this.quiz.subTheme],
      difficulty: [this.quiz.difficulty],
      questions: this.quiz.questions,
      image: [this.quiz.image]
    });
  }
  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }
  get theme() {
    return this.quizForm.get('theme') as FormArray;
  }
  get label() {
    return this.quizForm.get('label') as FormArray;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionsComponent, {
      width: '950px',
      maxHeight: '500px',
      data: this.quiz ? this.quiz.questions : DEFAULT_QUIZ.questions
    });
    dialogRef.afterClosed().subscribe(questions => {
      this.questionDialogOpened = false;
      this.questions.setValue( questions ? questions : this.questions );
    });
  }
  modifyQuiz() {
    if (this.quizForm.invalid) {
      alert(environment.formFieldsRequired);
      this.quizForm.markAllAsTouched();
      return;
    }
    const quizToModify: Quiz = this.quizForm.getRawValue() as Quiz;
    // quizToCreate.questions = [];
    quizToModify.dateModification = new Date();
    this.quizService.updateQuiz(quizToModify,  this.quizForm.get('image').value).subscribe((quiz) => {
      if (quiz !== undefined) {
        this.quiz = quiz;
        this.initializeTheForm(quiz);
      }
    });
  }

  getLabelErrorMessage() {
    if (this.label.hasError('required')) {
      return environment.formFieldRequired;
    }
    return this.label.hasError('minLenght') ? 'Veuillez entrer 5 caractère au minimum' : '';
  }
  getThemeErrorMessage() {
    if (this.theme.hasError('required')) {
      return environment.formSelectRequired;
    }
    return this.theme.hasError('minLenght') ? 'Veuillez entrer 3 caractère au minimum' : '';
  }
  retour() {
    this.location.back();
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.quizForm.get('image').patchValue(file);
    this.quizForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.quizForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  deleteImage() {
    this.quizForm.get('image').reset();
    this.imagePreview = null;
  }
}
