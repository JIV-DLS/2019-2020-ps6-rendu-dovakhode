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
  @Input()
  answer: Answer;
  @Input() question: Question;
  @Input() evolution: Evolution;
  @Output()
  goodAnswerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private questionplayed: QuestionPlayedService) { }


  ngOnInit() {

  }

  deleteEvent() {
    this.delete.emit(confirm('Êtes vous sûr de vouloir supprimer la réponse ' + this.answer.value + '?'));
  }

  isTrue(answer) {
    console.log(answer);
    const styleButton = document.getElementById(answer).style;
    if (this.answer.isCorrect) {
      this.questionplayed.addQuestionPlayed(this.question.id, this.evolution.id).subscribe();

      styleButton.backgroundColor = 'green';
      styleButton.fontWeight = 'bold';
      setTimeout(() =>    this.goodAnswerSelected.emit(true)
    , 1000);
    } else {
      document.getElementById(answer).style.visibility = 'hidden';

    }
  }
}
