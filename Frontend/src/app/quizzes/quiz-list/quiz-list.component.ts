import {Component, EventEmitter, Input, OnInit, Output, AfterContentInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: ' app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  @Input()
  public quizList: Quiz[];
  @Input()
  loading: boolean;
  @Input()
  doQuiz: any;
  inviteToCreateQuiz: any;

  @Output()
  selectEmitter: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  @Output()
  deleteEmitter: EventEmitter<Quiz> = new EventEmitter<Quiz>();
constructor() {
}
  ngOnInit(): void {
  }

  selectQuiz(quiz: Quiz) {
    this.selectEmitter.emit(quiz);
    this.inviteToCreateQuiz = this.quizList.length === 0 ;
  }

  deleteQuiz($event: boolean, quiz: Quiz) {
      if ($event) {this.deleteEmitter.emit(quiz); }
  }

  col() {
    if (this.doQuiz) {
      return 9;
    } else {
      return 10;
    }
  }
}
