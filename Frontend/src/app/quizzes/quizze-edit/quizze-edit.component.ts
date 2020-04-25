import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {difficulte, theme} from '../../../models/theme.models';
import {QuestionsComponent} from '../../questions/questions.component';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import {QuestionService} from '../../../services/question.service';
import {Question} from '../../../models/question.model';
import {AnswersService} from '../../../services/answers.service';
import {Subject, Subscription} from 'rxjs';
import {QuestionAddComponent} from '../../questions/question-add/question-add.component';
import {EditQuestionComponent} from '../../questions/edit-question/edit-question.component';
import {ThemeServices} from "../../../services/theme.services";
import {Theme} from "../../../models/themes.model";
import {Subtheme} from "../../../models/subtheme.model";
import {SubthemeService} from "../../../services/subtheme.service";

@Component({
  selector: 'app-quizze-edit',
  templateUrl: './quizze-edit.component.html',
  styleUrls: ['./quizze-edit.component.scss']
})
export class QuizzeEditComponent implements OnInit {
  constructor(private location: Location,
              public quizService: QuizService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              private questionService: QuestionService,
              private answerService: AnswersService,
              private themeServices: ThemeServices,
              private subThemeService: SubthemeService
  ) { }
  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }
  get theme() {
    return this.quizForm.get('theme') as FormArray;
  }
  get label() {
    return this.quizForm.get('label') as FormArray;
  }
  public subThemesValues: Subtheme[]=[];
  quiz: Quiz;
  public imageChanged: boolean;
  public savedImage: string;
  private savedQuestions: Question[];
  private questionDialogOpened = false;
  public quizForm: FormGroup;
  public themesValues : Theme[] = [];
  public difficultiesValues = Object.values(difficulte);
  public imagePreview: string;
  loading: boolean;
  others: boolean;
  private deletedQuestions = [];
  subscription: Subscription;
  private deletedAnswers = [];
  imageReestablisher: Subject<null> = new Subject();
  ngOnInit() {
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.loading = false;
        this.subscription = this.subThemeService.subThemesSubject.subscribe((subthemes) => {
          this.subThemesValues=subthemes;
        });
        this.initializeTheForm(quiz);
        this.imagePreview = quiz.image.length > 1 ? quiz.image : null;
        this.savedImage = this.imagePreview;
        this.getAllTheme();
        this.subThemesValues.push(new Subtheme(quiz.subTheme));
}, (error) => {this.retour(); });


  }
  getThemId(label: string ) {
    for (let i = 0 ; i <= this.themesValues.length; i++) {
      if (this.themesValues[i].label === label) {
        return this.themesValues[i].id;
      }
    }
  }

  getSubTheme() {
    console.log("here");
    console.log(this.quizForm.get('theme').value)
    const id=this.getThemId(this.quizForm.get('theme').value);
    this.subThemeService.getSubTheme(id).subscribe((subThemes) => {
      this.subThemeService.Subthemes = subThemes;
      console.log(this.subThemesValues);
      this.subThemeService.emitSubThemes(); });
  }
  private getAllTheme() {
    this.themeServices.getTheme().subscribe((themes) => {
      this.themesValues = themes;

    });
  }
  initializeTheForm(quiz) {
    this.others = false;
    this.imageChanged = false;
    this.quiz = new Quiz(quiz);
    this.savedQuestions = quiz.questions;
    this.quizForm = this.quizzFormInitializer();
  }
  quizzFormInitializer() {
    return this.formBuilder.group({
      id: this.quiz.id,
      label: [this.quiz.label, [ Validators.required, Validators.minLength(5)]],
      theme: [this.quiz.theme, [ Validators.required, Validators.minLength(3)]],
      subTheme: [this.quiz.subTheme],
      difficulty: [this.quiz.difficulty],
      questions: this.formBuilder.array(this.quiz.questions != null ? this.quiz.questions : []),
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
      quizId: question.quizId
    });
  }
  openDialog(): void {
    const questionsDialog = [];
    this.quiz.questions.forEach(question => questionsDialog.push(question));
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      width: '950px',
      maxHeight: '500px',
      data:  questionsDialog
    });
    dialogRef.afterClosed().subscribe(questionForm => {
      this.questionDialogOpened = false;
      if (questionForm) {
        // this.quiz.questions.push(questionImage.question);
        this.others = true;
        this.questions.push(this.createQuestionByData(questionForm));
      }
    });
  }
  modifyQuiz() {
    if (this.quizForm.invalid) {
      alert(environment.formFieldsRequired);
      this.quizForm.markAllAsTouched();
      return;
    }
    const quizToModify: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToModify.dateModification = new Date();
    quizToModify.image = this.quiz.image;
    quizToModify.theme = this.quizForm.get('theme').value;
    if (this.quizForm.get('subTheme').value != null) {
      quizToModify.subTheme = this.quizForm.get('subTheme').value;
    }
    if (this.deletedQuestions) {this.questionService.deleteQuestions(this.deletedQuestions); }
    if (this.deletedAnswers) {this.answerService.deleteAnswers(this.deletedAnswers); }
    this.quizService.updateQuiz(quizToModify,  this.quizForm.get('image').value, this.questions.value).subscribe((quiz) => {
      if (quiz !== undefined) {
        this.quiz = quiz;
        this.savedImage = quiz.image;
        this.deletedQuestions = [];
        this.deletedAnswers = [];
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
  anyChangement() {
    return this.quizForm.dirty || this.imageChanged || this.others;
  }
  retour() {
    if (this.anyChangement()) {
      alert('Une modification est en cour. Veuillez la valider(modifier) ou l\'annuler(annuler) avant de continuer!');
    } else { this.location.back(); }
  }

deleteImage() {
    this.quiz.image = '';
  }

resetQuiz() {
    this.others = false;
    this.imageChanged = false;
    this.quiz.questions = this.savedQuestions;
    this.initializeTheForm(this.quiz);
    this.imageReestablisher.next(null);
    this.quiz.image = this.imagePreview;
    this.deletedQuestions = [];
    this.deletedAnswers = [];
  }

deletedQuestion($event: boolean, index: number) {
    if ($event) {
      if (!this.others) {this.others = true; }
      if (this.quiz.questions[index].id !== 0) {
        this.deletedQuestions.push(this.quiz.questions[index]);
      }
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
        if (response.deletedAnswers) {
          response.deletedAnswers.forEach(answerDeleted => this.deletedAnswers.push(answerDeleted));
        }
        if (response.question && response.question.label) {
          if (!this.others) {this.others = true; }
          if (response.question && response.question.label) {
            this.questions.at(i).patchValue({...Question.questionFormValues(this.createQuestionByData( response.question ))});
          }
        }
      }
    });
  }
}
