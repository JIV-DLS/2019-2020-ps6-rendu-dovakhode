import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
@Component({
  selector: 'app-quiz-list2',
  templateUrl: './quiz-list2.component.html',
  styleUrls: ['./quiz-list2.component.scss']
})
export class QuizList2Component implements OnInit {

  @Input()
  public quizList: Quiz[] = [];
  @Input()
  public loading: boolean;
  itemsPerSlide = 3;
  singleSlideOffset = true;

  @Output()
  selectEmitter: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
     }

  ngOnInit(): void {
  }

  selectQuiz(quiz: Quiz) {
    console.log(quiz);
    this.selectEmitter.emit(quiz);
  }
}
