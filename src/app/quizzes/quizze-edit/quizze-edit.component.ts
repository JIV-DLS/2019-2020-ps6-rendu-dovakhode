import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {difficulte, theme} from '../../../models/theme.models';
import {QuestionsDialogComponent} from '../../questions/questions.component';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';

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
  loading: boolean;
  constructor(private location: Location,
              public quizService: QuizService, private route: ActivatedRoute,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.loading = false;
        this.initializeTheForm(quiz); });
  }
  initializeTheForm(quiz) {
    this.quiz = quiz;
    this.quizForm = this.quizzFormInitializer();
  }
  quizzFormInitializer() {
    return this.formBuilder.group({
      id: this.quiz.id,
      label: this.quiz.name,
      theme: this.quiz.theme,
      questions: this.quiz.questions
    });
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
  modifyQuiz() {
    const quizToModify: Quiz = this.quizForm.getRawValue() as Quiz;
    // quizToCreate.questions = [];
    quizToModify.dateModification = new Date();
    this.quizService.updateQuiz(quizToModify);
  }

  cancel() {
    this.location.back();
  }
}
