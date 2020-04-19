import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import { QuizDoStartComponent } from './quizzes/quiz-do-start/quiz-do-start.component';
import { QuizEndComponent } from './quizzes/quiz-end/quiz-end.component';
import { Error404Component } from './error404/error404.component';
import { HomeQuizComponent } from './home-quiz/home-quiz.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeDoQuizComponent } from './home-do-quiz/home-do-quiz.component';
import {EvolutionService} from '../services/evolution.service';
import {QuestionPlayedService} from '../services/questionPlayed.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { QuizSearchPipe } from './quizzes/_pipes/quiz-search.pipe';

import { ProfilsAddComponent } from './Profils/profils-add/profils-add.component';

import { DragNDropPhotoDirective } from './drag-ndrop-photo.directive';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import {ProfilServices} from '../services/profil.services';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatRadioModule} from '@angular/material/radio';
import { ProfilListComponent } from './Profils/profil-list/profil-list.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomePlayWithProfilesComponent } from './home-play-with-profiles/home-play-with-profiles.component';

import { HomeProfilComponent } from './home-profil/home-profil.component';
import {ProfilComponent} from './Profils/profil/profil.component';
import {ProfilEditComponent} from './Profils/profil/profil-edit/profil-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'home-do-quiz', component: HomeDoQuizComponent},
  {path: 'home-quiz-gestion', component: HomeQuizComponent},
  {path: 'home-profil-gestion', component: HomeProfilComponent},
  {path: 'profil-add', component: ProfilsAddComponent},
  {path: 'profil-list', component: ProfilListComponent},
  {path: 'home-user', component: HomeUserComponent},
  {path: 'quiz-edit/:id' , component: QuizzeEditComponent},
  {path: 'quiz-do/:evol' , component: QuizDoComponent},
  {path: 'quiz-do/:id/start' , component: QuizDoStartComponent},
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
    QuizDoComponent,
    QuizDoStartComponent,
    QuizEndComponent,
    Error404Component,
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
    HomeQuizComponent,
    HomeUserComponent,
    HomeDoQuizComponent,
    HomeProfilComponent,
    QuizSearchPipe,
    ProfilEditComponent,

    ProfilsAddComponent,
    ProfilComponent,
    DragNDropPhotoDirective,
    ImageUploaderComponent,
    ProfilListComponent,
    HomePlayWithProfilesComponent,
  ],
  entryComponents: [
    QuestionsComponent,
    QuizAddComponent,
    QuizzeEditComponent,
    EditQuestionComponent,
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
        MatProgressSpinnerModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        FormsModule,
        MatSlideToggleModule,
        MatRadioModule,
        CarouselModule.forRoot(),
    ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    EvolutionService,
    QuestionPlayedService,
    ProfilServices,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
