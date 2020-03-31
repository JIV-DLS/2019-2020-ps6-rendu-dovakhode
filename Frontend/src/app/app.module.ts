import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizAddComponent } from './quizzes/quiz-add/quiz-add.component';
import {HttpClientModule} from '@angular/common/http';
import {Router, RouterModule, Routes} from '@angular/router';
import { QuestionComponent } from './questions/question/question.component';
import {QuestionsComponent} from './questions/questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  _MatMenuDirectivesModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatMenuModule, MatSnackBar, MatSnackBarModule
} from '@angular/material';
import { QuestionAddComponent } from './questions/question-add/question-add.component';
import {AnswersComponent } from './answers/answers.component';
import {AnswerEditComponent} from './answers/answer-edit/answer-edit.component';
import {AnswerAddComponent} from './answers/answer-add/answer-add.component';
import {AnswerComponent} from './answers/answer/answer.component';
import { QuizzeEditComponent } from './quizzes/quizze-edit/quizze-edit.component';
import { SnackComponent } from './snack/snack.component';
import { ModificationComponent } from './snack/modification/modification.component';
import { SnackModificationComponent } from './snack/snack-modification/snack-modification.component';
import { SnackSuccessComponent } from './snack/snack-success/snack-success.component';
import { UserComponent } from './user/user.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
import { EditableQuestionComponent } from './questions/editable-question/editable-question.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { QuizLessInfoComponent } from './quizzes/quiz-less-info/quiz-less-info.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { QuestionDoComponent } from './questions/question-do/question-do.component';
import { QuizDoComponent } from './quizzes/quiz-do/quiz-do.component';
import { NextQuestionComponent } from './questions/next-question/next-question.component';
import { QuizEndComponent } from './quizzes/quiz-end/quiz-end.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'quiz-edit/:id' , component: QuizzeEditComponent},
  {path: 'quiz-do/:id' , component: QuizDoComponent},
  {path: 'quiz/:idShowQuiz' , component: QuizComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'quiz-do/:id/end', component: QuizEndComponent},
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizAddComponent,
    QuestionComponent,
    QuestionsComponent,
    QuestionAddComponent,
    AnswersComponent,
    AnswerEditComponent,
    AnswerAddComponent,
    AnswerComponent,
    QuizzeEditComponent,
    SnackComponent,
    ModificationComponent,
    SnackModificationComponent,
    SnackSuccessComponent,
    UserComponent,
    UserNavComponent,
    EditQuestionComponent,
    EditableQuestionComponent,
    HomeComponent,
    QuizLessInfoComponent,
    QuestionDoComponent,
    QuizDoComponent,
    NextQuestionComponent,
    QuizEndComponent,
    Error404Component
  ],
  entryComponents: [
    QuestionsComponent,
    QuizAddComponent,
    QuizzeEditComponent,
    AnswerAddComponent,
    NextQuestionComponent,
    SnackModificationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    ScrollingModule,
    MatSelectModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
