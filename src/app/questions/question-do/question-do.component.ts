import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {MatDialog} from '@angular/material/dialog';
import {NextQuestionComponent} from '../next-question/next-question.component';

@Component({
  selector: 'app-question-do',
  templateUrl: './question-do.component.html',
  styleUrls: ['./question-do.component.scss']
})
export class QuestionDoComponent implements OnInit {
  @Input() question: Question = DEFAULT_QUESTION;
  @Output()
  next: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(  public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  nextQuestion(next: boolean) {
    if (next) {
      const dialogRef = this.dialog.open(NextQuestionComponent, {
        width: '950px',
        maxHeight: '500px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.next.emit(true);
      });
    }
  }
}
