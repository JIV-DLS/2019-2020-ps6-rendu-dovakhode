import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  @Input() position: number;
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.closeEvent.emit(true);
  }
}
