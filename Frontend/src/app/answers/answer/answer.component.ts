import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/answer.model';
import {Question} from '../../../models/question.model';
import {Evolution} from '../../../models/evolution.model';
import {QuestionPlayedService} from '../../../services/questionPlayed.service';

@Component({
  selector: ' app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  trials = 0;
  @Input()
  answer: Answer;

  @Input() question: Question;
  @Input() evolution: Evolution;
  @Output()
  goodAnswerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private questionplayed: QuestionPlayedService) { }


  ngOnInit() {

  }

  deleteEvent() {
    this.delete.emit(confirm('Êtes vous sûr de vouloir supprimer la réponse ' + this.answer.value + '?'));
  }

  isTrue(answer) {
    console.log(answer);
    const styleButton = document.getElementById(answer).style;
    console.log('premier trial' + this.trials);
    if (this.answer.isCorrect) {
      console.log('trials' + this.trials);
      styleButton.backgroundColor = 'green';
      styleButton.fontWeight = 'bold';
      setTimeout(() =>    this.goodAnswerSelected.emit(true)
    , 1000);
    } else {
      this.trials++;
      console.log('trials' + this.trials);
      document.getElementById(answer).style.visibility = 'hidden';


    }
  }
}
