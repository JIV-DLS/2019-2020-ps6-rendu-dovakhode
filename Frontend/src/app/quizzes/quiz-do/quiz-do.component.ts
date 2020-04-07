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
              private questionplayed: QuestionPlayedService) {


  }

  ngOnInit() {

    this.evolutionSubscription = this.evolService.evolutionSubject.subscribe((evolution) => {
      this.evolution = evolution;
    //  console.log('evol de quiz do  first' + this.evolution.id);
    });
    this.evolService.emitEvolution();
    this.loading = true;
    this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
      .subscribe((quiz) => {
        this.initializeTheForm(quiz);
      }, (error) => {this.retour(); });
    const idEvol = +(this.route.snapshot.params.evol);
   // console.log(idEvol);
    this.evolService.getEvolutionById(idEvol).subscribe((evol) =>
    this.evolution = evol),
   // console.log('evol de quiz do  second' + this.evolution.id);
    this.getQuestiontoshow();

    if (this.questionList.length !== 0) {
      this.index = this.questionList.length;
    }
  }
  initializeTheForm(quiz) {
    this.quiz = quiz;
    this.quizForm = this.quizzFormInitializer();

  }
  getQuestiontoshow() {
    this.questionplayed.getQuestionPlayed('' + this.evolution.id).subscribe((questions) => {
      this.questionList = [];
      this.questionList = questions;
      console.log('nombre de question de cette nouvelle evolution: ' + this.questionList.length);
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
  nextQuestion() {
    if (this.index < this.quiz.questions.length - 1) {
    //  console.log('evoooooooooooooooooooooooooo' + this.evolution.quizId);
      this.index = this.index + 1;
    } else {
      this.router.navigate(['/quiz-do/' + this.quiz.id + '/end']);
    }
  }
  retour() {
    this.location.back();
  }
}
