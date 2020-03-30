import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-next-question',
  templateUrl: './next-question.component.html',
  styleUrls: ['./next-question.component.scss']
})
export class NextQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NextQuestionComponent>) { }

  ngOnInit() {
  }
  next() {
    this.dialogRef.close();
  }
}
