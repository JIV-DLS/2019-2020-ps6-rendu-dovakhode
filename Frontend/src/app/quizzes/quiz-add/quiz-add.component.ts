import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {difficulte, theme} from '../../../models/theme.models';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {MatDialog, MatSnackBar} from '@angular/material';
import {QuestionsDialogComponent} from '../../questions/questions.component';
import {SnackModificationComponent} from '../../snack/snack-modification/snack-modification.component';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.scss']
})

export class QuizAddComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  @Input() quiz: Quiz = null;
  public quizForm: FormGroup;
  public themesValues = Object.values(theme);
  public difficultiesValues = Object.values(difficulte);
  private questionDialogOpened = false;
  constructor(private location: Location, private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              public quizService: QuizService) {
    // Form creation
    // You can also question-add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

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
      questions: [DEFAULT_QUIZ.questions]
    });
  }
  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    if (this.quizForm.invalid) {
      alert(environment.formFieldsRequired);
      this.quizForm.markAllAsTouched();
      return;
    }
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
     // quizToCreate.questions = [];
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
    this.quizService.addQuiz(quizToCreate).subscribe((quiz) => {
      if (quiz !== undefined) {
       this.quiz = quiz;
       console.log(quiz);
      }
     }); // getQuiz().push(quizToCreate);
     /*this.snackBar.openFromComponent(SnackModificationComponent, {
      duration: 1000,
      data: 'Quizz created succesfuly!'
    });*/
    this.initializeTheForm();
  }


  quizFormValue() {
    return Quiz.quizFormValues(this.quizForm);
  }

  addQuestion() {
    this.questionDialogOpened = true;
    this.openDialog();
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
    const dialogRef = this.dialog.open(QuestionsDialogComponent, {
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
    const quizToModify: Quiz = this.quizForm.getRawValue() as Quiz;
    // quizToCreate.questions = [];
    quizToModify.dateModification = new Date();
    this.quizService.updateQuiz(quizToModify);
    this.snackBar.openFromComponent(SnackModificationComponent, {
      duration: 1000,
      data: 'Quizz modified succesfuly!'
    });
    this.location.back();
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
}

