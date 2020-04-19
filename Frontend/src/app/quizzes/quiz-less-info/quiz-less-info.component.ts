import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {environment} from '../../../environments/environment';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-quiz-less-info',
  templateUrl: './quiz-less-info.component.html',
  styleUrls: ['./quiz-less-info.component.scss']
})
export class QuizLessInfoComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() do: boolean;
  @Output()
  selectEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  deleteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private matDialogService: DialogService) { }
  hover: boolean;
  ngOnInit() {
    this.hover = false;
  }
  select() {
    this.selectEmitter.emit(true);
  }
  delete() {
    this.matDialogService.openConfirmDialog(environment.deleteWarning + this.quiz.label + ') ?'
     ).afterClosed().subscribe((res) => {
      if (res) {
        this.deleteEmitter.emit(true);
      }
    });

  }

  col() {
    if (this.do) {
      return 9;
    } else {
      return 10;
    }
  }
}
