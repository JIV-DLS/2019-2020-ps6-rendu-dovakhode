import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/answer.model';
import {Question} from '../../../models/question.model';
import {Evolution} from '../../../models/evolution.model';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';

@Component({
  selector: 'app-answer-recap',
  templateUrl: './answer-recap.component.html',
  styleUrls: ['./answer-recap.component.scss']
})
export class AnswerRecapComponent implements OnInit {
  @Input()
  answer: Answer;

  @Input() question: Question;
  @Input() evolution: Evolution;
  @Output()
  goodAnswerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  checked = null;
  constructor(private questionplayed: QuestionPlayedService) { }


  ngOnInit() {

  }

  deleteEvent() {
    this.delete.emit(confirm('Êtes vous sûr de vouloir supprimer la réponse ' + this.answer.value + '?'));
  }

}
