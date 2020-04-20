import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {difficulte, theme} from '../../../models/theme.models';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {MatDialog} from '@angular/material';
import {environment} from '../../../environments/environment';
import {MatDialogRef} from '@angular/material/dialog';
import {QuestionAddComponent} from '../../questions/question-add/question-add.component';
import {EditQuestionComponent} from '../../questions/edit-question/edit-question.component';
import {Question} from '../../../models/question.model';
import {ThemeServices} from '../../../services/theme.services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.scss']
})

export class QuizAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuizAddComponent>,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              public quizService: QuizService,
              private themeService: ThemeServices) {

    }
    // Form creation
    // You can also question-add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }
  get theme() {
    return this.quizForm.get('theme') as FormArray;
  }
  get label() {
    return this.quizForm.get('label') as FormArray;
  }

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  @Input() quiz: Quiz = null;
  public quizForm: FormGroup;
  Subject: Subscription;
  public themesValues = [];
  public SubThemesValues = [];
  public difficultiesValues = Object.values(difficulte);
  private questionDialogOpened = false;
  public imagePreview: string;
  files: any = [];

  ngOnInit() {
    this.quiz = new Quiz();
    this.initializeTheForm();
  }

  initializeTheForm() {
    this.quizForm = this.quizzFormInitializer();
  }
  quizzFormInitializer() {
    return this.formBuilder.group({
      id: [DEFAULT_QUIZ.id],
      label: [ DEFAULT_QUIZ.label , [ Validators.required, Validators.minLength(5)]],
      theme: [ DEFAULT_QUIZ.theme, [ Validators.required, Validators.minLength(3)]],
      subTheme: [null],
      difficulty: [null],
      questions: this.formBuilder.array([]),
      image: [null]
    });
  }
  private createQuestionByData(question) {
    return this.formBuilder.group({
      id: question.id,
      label: question.label,
      answers: this.formBuilder.array(question.answers),
      image: question.image,
      tmpUrl: question.tmpUrl,
      quizId: 0
    });
  }

  getSubTheme() {

  }
  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    if (this.quizForm.invalid) {
      alert(environment.formFieldsRequired);
      this.quizForm.markAllAsTouched();
      return;
    }
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
     // quizToCreate.question = [];
    if (quizToCreate.subTheme == null) {
      quizToCreate.subTheme = quizToCreate.theme;
    }
    if (quizToCreate.difficulty == null) {
      quizToCreate.difficulty = difficulte.Normale;
    }
    quizToCreate.dateCreation = new Date();
    quizToCreate.dateModification = quizToCreate.dateCreation;
    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
     // console.log('Add quiz: ', quizToCreate);

    // Now, question-add your quiz in the list!
    this.quizService.addQuiz(quizToCreate, this.quizForm.get('image').value, this.questions.value).subscribe((quiz) => {
      if (quiz !== undefined) {
       this.quiz = quiz;
       this.dialogRef.close(quiz);
       this.initializeTheForm();
      }
     }); // getQuiz().push(quizToCreate);
     /*this.snackBar.openFromComponent(SnackModificationComponent, {
      duration: 1000,
      data: 'Quizz created succesfuly!'
    });*/
  }


  quizFormValue() {
    return Quiz.quizFormValues(this.quizForm);
  }

  addQuestion() {
    this.questionDialogOpened = true;
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      width: '850px',
      maxHeight: '500px',
      data: this.quiz ? this.quiz.questions : DEFAULT_QUIZ.questions
    });
    dialogRef.afterClosed().subscribe(questionForm => {
      this.questionDialogOpened = false;
      // if (questionImage.question && questionImage.question.label) {
      if (questionForm) {
        this.questions.push(this.createQuestionByData(questionForm)); }
    });
  }
  deleteQuestion(deleteState: boolean) {
    /* if(deleteState){

    } */
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

  deleteImage() {
    this.quizForm.get('image').reset();
    this.imagePreview = null;
  }

  deletedQuestion($event: boolean, index: number) {
    if ($event) {
      this.questions.removeAt(index);
    }
  }

  editQuestion($event: boolean, i: number) {
    const dialogRef = this.dialog.open(EditQuestionComponent, {
      width: '950px',
      maxHeight: '500px',
      data: this.questions.at(i).value
    });
    dialogRef.afterClosed().subscribe(response => {
      this.questionDialogOpened = false;
      if (response != null) {
        if (response.question && response.question.label) {
          if (response.question && response.question.label) {
            this.questions.at(i).patchValue({...Question.questionFormValues(this.createQuestionByData( response.question))});
          }
        }
      }

    });
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
}

