import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question} from '../../../models/question.model';
import {DEFAULT_QUESTION} from '../../../mocks/question-list.mock';
import {MatDialog} from '@angular/material/dialog';
import {NextQuestionComponent} from '../next-question/next-question.component';
import {Evolution} from '../../../models/evolution.model';

@Component({
  selector: 'app-question-do',
  templateUrl: './question-do.component.html',
  styleUrls: ['./question-do.component.scss']
})
export class QuestionDoComponent implements OnInit, OnChanges  {
  @Input() question: Question = DEFAULT_QUESTION;
  @Input() evolution: Evolution ;
  trials: number;
  @Output()
  next: EventEmitter<number> = new EventEmitter<number>();
  constructor( public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.trials = 0;
  }

  nextQuestion(next: boolean) {
    if (next) {
      const dialogRef = this.dialog.open(NextQuestionComponent, {
        width: '950px',
        maxHeight: '500px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.next.emit(this.trials);
      });
    }
  }

  cliked() {
    this.trials++;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.trials = 0;
    console.log(changes);
  }
}
