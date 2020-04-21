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
import { Error404Component } from './errors/error404/error404.component';
import { HomeQuizComponent } from './home/home-quiz/home-quiz.component';
import { HomeUserComponent } from './home/home-user/home-user.component';
import { HomeDoQuizComponent } from './home/home-do-quiz/home-do-quiz.component';
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
import { ProfilsCarouselComponent } from './Profils/profils-carousel/profils-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomePlayWithProfilesComponent } from './home/home-play-with-profiles/home-play-with-profiles.component';

import { HomeProfilComponent } from './home/home-profil/home-profil.component';
import { ProfilLessInfoComponent } from './Profils/profil-less-info/profil-less-info.component';
import { ProfilsListComponent } from './Profils/profil-list/profils-list.component';
import { FilterPipe } from './Profils/_pipes/filter.pipe';
import {ProfilComponent} from './Profils/profil/profil.component';
import {ProfilEditComponent} from './Profils/profil-edit/profil-edit.component';
import { ProfilListDisplayComponent } from './Profils/profil-list-display/profil-list-display.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { QuizDisplayListComponent } from './quizzes/quiz-display-list/quiz-display-list.component';
import { QuizList2Component } from './quizzes/quizzes-carousel/quiz-list2.component';
import { QuizSearchBarComponent } from './searchBar/quiz-search-bar/quiz-search-bar.component';
import { ProfilSearchBarComponent } from './searchBar/profil-search-bar/profil-search-bar.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import {RouteNames} from '../models/routeNames';
import { ThemeAddComponent } from './themes/theme-add/theme-add.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { SubThemeComponent } from './subThemes/sub-theme/sub-theme.component';
import { SubThemeAddComponent } from './subThemes/sub-theme-add/sub-theme-add.component';
import { SubThemeListComponent } from './subThemes/sub-theme-list/sub-theme-list.component';
import {SubthemeService} from '../services/subtheme.service';
import {ThemeServices} from '../services/theme.services';
import { QuizRecapComponent } from './quizzes/quiz-recap/quiz-recap.component';
import { QuestionRecapComponent } from './questions/question-recap/question-recap.component';
import {AnswerRecapComponent} from './answers/answer-recap/answer-recap.component';
import { NomprenomPipe } from './Profils/_pipes/subDirectory/nomprenom.pipe';
import { QuizStartRecapComponent } from './quizzes/quiz-start-recap/quiz-start-recap.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {routeName: 'Acceuil'}},
  {path: 'quiz-do/:id/recap/:idPatient', component: QuizRecapComponent, data: {routeName: 'Recapitulation des quizs'}},
  {path: 'quiz-do/:id/recap-start/:idPatient', component: QuizStartRecapComponent, data: {routeName: 'Recapitulation des quizs'}},
  {path: 'quiz-list', component: QuizDisplayListComponent, data: {routeName: 'Liste de quiz'}},
  {path: 'home-do-quiz', component: HomeDoQuizComponent, data: {routeName: 'Choix du type de quiz'}},
  {path: 'home-quiz-gestion', component: HomeQuizComponent, data: {routeName: 'Gestion des quizs'}},
  {path: 'home-profil-gestion', component: HomeProfilComponent, data: {routeName: 'Gestion des profils'}},
  {path: 'profil-add', component: ProfilsAddComponent, data: {routeName: 'Ajout d\'un profil'}},
  {path: 'home-user', component: HomeUserComponent, data: {routeName: 'Gestion utilisateur'}},
  {path: 'quiz-edit/:id' , component: QuizzeEditComponent, data: {routeName: 'Modification d\'un quiz'}},
  {path: 'quiz-do/:evol' , component: QuizDoComponent, data: {routeName: 'Jeu en cour'}},
  {path: 'quiz-do/:id/start' , component: QuizDoStartComponent, data: {routeName: 'Debut du quiz'}},
  {path: 'quiz/:idShowQuiz' , component: QuizComponent, data: {routeName: 'Affichage d\'un quiz'}},
  {path: 'profils-carousel', component: ProfilListDisplayComponent, data: {routeName: 'Choix du patient pour le jeu'}},
  {path: 'quiz-do/:id/end/:idPatient', component: QuizEndComponent, data: {routeName: 'Jeu de quiz par un patient'}},
  { path: 'not-found', component: Error404Component , data: {routeName: 'Page inacessible'}},
  { path: '**', redirectTo: 'not-found', data: {routeName: 'Page inacessible'} }
];
routes.forEach((eachRoute) => {
  RouteNames.routeNamesObject[eachRoute.path.split('/')[0]] = eachRoute.data.routeName; // now all route paths are added to this prop
});
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
    ProfilsCarouselComponent,
    HomePlayWithProfilesComponent,
    ProfilLessInfoComponent,
    ProfilsListComponent,
    FilterPipe,
    ProfilListDisplayComponent,
    MatConfirmDialogComponent,
    QuizDisplayListComponent,
    QuizList2Component,
    QuizSearchBarComponent,
    ProfilSearchBarComponent,
    AsideNavComponent,
    ThemeAddComponent,
    ThemeListComponent,
    SubThemeComponent,
    SubThemeAddComponent,
    SubThemeListComponent,
    QuizRecapComponent,
    QuestionRecapComponent,
    AnswerRecapComponent,
    NomprenomPipe,
    QuizStartRecapComponent,
  ],
  entryComponents: [
    QuestionsComponent,
    QuizAddComponent,
    QuizzeEditComponent,
    EditQuestionComponent,
    AnswerAddComponent,
    NextQuestionComponent,
    SnackModificationComponent,
    MatConfirmDialogComponent,
    ThemeListComponent,
    SubThemeListComponent
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
    MatTabsModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    EvolutionService,
    QuestionPlayedService,
    ProfilServices,
    QuizSearchPipe,
    ThemeServices,
    SubthemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
