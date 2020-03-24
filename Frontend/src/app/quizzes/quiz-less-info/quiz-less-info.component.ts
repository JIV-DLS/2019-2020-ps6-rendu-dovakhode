import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-less-info',
  templateUrl: './quiz-less-info.component.html',
  styleUrls: ['./quiz-less-info.component.scss']
})
export class QuizLessInfoComponent implements OnInit {
  @Input() quiz: Quiz;
  @Output()
  selectEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  deleteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  hover: boolean;
  ngOnInit() {
    this.hover = false;
  }
  select() {
    this.selectEmitter.emit(true);
  }
  delete() {
    this.deleteEmitter.emit(confirm('voulez-vous vraiment supprimer (' + this.quiz.label + ') ?'));
  }
}
