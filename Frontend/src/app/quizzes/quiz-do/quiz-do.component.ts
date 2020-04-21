import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {difficulte, theme} from '../../../models/theme.models';
import {Location} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';
import {Subscription} from 'rxjs';
import {QuestionPlayed} from '../../../models/questionPlayed.model';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-quiz-do',
  templateUrl: './quiz-do.component.html',
  styleUrls: ['./quiz-do.component.scss']
})
export class QuizDoComponent implements OnInit {
  evolution: Evolution;
  questionList: QuestionPlayed[] = [];
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
  evolutionSubscription: Subscription;
  constructor(private location: Location,
              public quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              private evolService: EvolutionService,
              private questionplayed: QuestionPlayedService,
              private questionService: QuestionService) {

  }

  ngOnInit() {
    this.loading = true;
    this.startWithEvolution();
  }
  startWithEvolution() {
    this.index = 0;
    const idEvol = +(this.route.snapshot.params.evol);
    this.evolService.getEvolutionById(idEvol).subscribe((evol) => {
        this.evolution = evol;
        this.quizService.getQuizById(+evol.quizId)
          .subscribe((quiz) => {
            if (quiz) {
              this.quiz = quiz;
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.quiz.questions.length; i++) {
                this.shuffle(this.quiz.questions[i].answers);
              }
              this.getQuestionPlayedList();

              this.shuffle(this.quiz.questions);
            }
          }, (error) => {this.retour(); });
      }
    );
  }

  shuffle(array) {
    // tslint:disable-next-line:one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  initializeTheForm() {
    this.quizForm = this.quizzFormInitializer();

  }

  getQuestionPlayedList() {
    this.questionplayed.getQuestionPlayed('' + this.evolution.id).subscribe((questions) => {
      this.questionList = [];
      this.questionList = questions;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].trials < 2) {
          const id = this.questionList[i].idQuestion;
          this.questionService.deleteQuestionFromQuiz(this.questionService.getQuestionByIdFromQuiz(id, this.quiz), this.quiz);
        }
      }
      this.loading = false;
      if (this.index >= this.quiz.questions.length ) {
        this.router.navigate(['/quiz-do/' + this.quiz.id + '/end/' + this.evolution.patientId, { idEvolution: this.evolution.id}]);
      }
    });
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
  nextQuestion(trials: number) {
    this.questionplayed.addQuestionPlayed(this.quiz.questions[this.index].id, this.evolution.id, trials).subscribe((questionPlayed) => {
     console.log('ici' + questionPlayed); });

    if (this.index < this.quiz.questions.length - 1) {
      this.index = this.index + 1;
    } else {
      this.startWithEvolution();
    }
  }
  retour() {
    this.location.back();
  }
}
