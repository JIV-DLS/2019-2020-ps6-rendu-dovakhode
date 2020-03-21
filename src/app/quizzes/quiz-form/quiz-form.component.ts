import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {difficulte, theme} from '../../../models/theme.models';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {MatDialog, MatSnackBar} from '@angular/material';
import {QuestionsDialogComponent} from '../../questions/questions.component';
import {SnackModificationComponent} from '../../snack/snack-modification/snack-modification.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

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
    this.initializeTheForm();
  }
  initializeTheForm() {
    this.quizForm = this.quizzFormInitializer();
  }
  quizzFormInitializer() {
    return this.formBuilder.group({
      id: [this.quiz ? this.quiz.id : DEFAULT_QUIZ.id],
      name: [this.quiz ? this.quiz.name : DEFAULT_QUIZ.name],
      theme: [this.quiz ? this.quiz.theme : DEFAULT_QUIZ.theme],
      questions: [this.quiz ? this.quiz.questions : DEFAULT_QUIZ.questions]
    });
  }
  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
     const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
     // quizToCreate.questions = [];
     quizToCreate.dateCreation = new Date();
     quizToCreate.dateModification = quizToCreate.dateCreation;
    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
     // console.log('Add quiz: ', quizToCreate);

    // Now, question-add your quiz in the list!
     this.quizService.addQuiz(quizToCreate).subscribe(() => {
       console.log('success');
     }); // getQuiz().push(quizToCreate);
     this.snackBar.openFromComponent(SnackModificationComponent, {
      duration: 1000,
      data: 'Quizz created succesfuly!'
    });
     this.initializeTheForm();
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

  deleteQuestion(deleteState: boolean) {
    /* if(deleteState){

    } */
  }
}

