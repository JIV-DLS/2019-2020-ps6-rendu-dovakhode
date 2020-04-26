import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';
import {QuestionPlayed} from '../../../models/questionPlayed.model';
import {QuestionService} from '../../../services/question.service';
@Component({
  selector: 'app-quiz-do',
  templateUrl: './quiz-do.component.html',
  styleUrls: ['./quiz-do.component.scss']
})
export class QuizDoComponent implements OnInit {
  progression: {did: number, total: number};
  evolution: Evolution;
  questionList: QuestionPlayed[] = [];
  index = 0;
  quiz: Quiz = DEFAULT_QUIZ;
  loading: boolean;
  constructor(private location: Location,
              public quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              private evolService: EvolutionService,
              private questionplayed: QuestionPlayedService,
              private questionService: QuestionService, private evolutionService: EvolutionService) {}

  ngOnInit() {
    this.evolutionService.evolutionProgressValue.subscribe(progression => this.progression = progression);
    this.startWithEvolution();
  }

  startWithEvolution() {
    this.loading = true;
    this.index = 0;
    const idEvol = +(this.route.snapshot.params.evol);
    this.evolService.getEvolutionById(idEvol).subscribe((evol) => {
        this.evolution = evol;
        this.quizService.getQuizById(+evol.quizId)
          .subscribe((quiz) => {
            this.loading = false;
            if (quiz) {
              this.quiz = quiz;
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.quiz.questions.length; i++) {
                this.shuffle(this.quiz.questions[i].answers);
              }
              this.getQuestionPlayedList();
              this.shuffle(this.quiz.questions);
              this.evolService.evolutionProgressValue.next({did: this.index, total: this.quiz.questions.length});
            }
          }, (error) => {this.retour(); });
      }
    );
  }
  shuffle(array) {
    // tslint:disable-next-line:one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;
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
        this.router.navigate(['/quiz-do/' + this.quiz.id + '/recap-start/' + this.evolution.patientId, { idEvolution: this.evolution.id}]);
      }
    });
  }

  nextQuestion(trials: number) {
    this.questionplayed.addQuestionPlayed(this.quiz.questions[this.index].id, this.evolution.id, trials).subscribe();
    if (this.index < this.quiz.questions.length - 1) {
      this.index++;
      this.evolService.evolutionProgressValue.next({did: this.index, total: this.quiz.questions.length});
    } else {
      this.startWithEvolution();
    }
  }
  retour() {
    this.location.back();
  }
}
