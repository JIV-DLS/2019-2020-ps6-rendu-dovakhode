import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {difficulte, theme} from '../../../models/theme.models';
import {Location} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';

@Component({
  selector: 'app-quiz-do',
  templateUrl: './quiz-do.component.html',
  styleUrls: ['./quiz-do.component.scss']
})
export class QuizDoComponent implements OnInit {
  index = 0;
  quiz: Quiz = DEFAULT_QUIZ;
  private imageChanged: boolean;
  private savedImage: string;
  private questionDialogOpened = false;
  public quizForm: FormGroup;
  public themesValues = Object.values(theme);
  public difficultiesValues = Object.values(difficulte);
  private imagePreview: string;
  loading: boolean;
  constructor(private location: Location,
              public quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.initializeTheForm(quiz);
      }, (error) => {this.retour(); });

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
      questions: [this.quiz.questions != null ? this.quiz.questions : []],
      image: [null]
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
  nextQuestion() {
    if (this.index < this.quiz.questions.length - 1) {
      this.index = this.index + 1;
    } else {
      this.router.navigate(['/quiz-do/' + this.quiz.id + '/end']);
    }
  }
  retour() {
    this.location.back();
  }
}
