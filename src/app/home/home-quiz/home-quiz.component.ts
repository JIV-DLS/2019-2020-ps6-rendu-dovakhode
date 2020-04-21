import { Component, OnInit } from '@angular/core';
import {QuizAddComponent} from '../../quizzes/quiz-add/quiz-add.component';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
@Component({
  selector: 'app-home-quiz',
  templateUrl: './home-quiz.component.html',
  styleUrls: ['./home-quiz.component.scss']
})
export class HomeQuizComponent implements OnInit {
  dialogWidth = '950px';
  dialogHeight = '500px';
  constructor(public location: Location, private dialog: MatDialog) { }

  ngOnInit() {
  }
  createAQuiz() {
    this.openDialog(0);
  }
  openDialog(dialogNumber: number): void {
    let dialogRef;
    switch (dialogNumber) {
      case 0:
        dialogRef = this.dialog.open(QuizAddComponent, {
          width: '70%',
          height: '90%',
          closeOnNavigation: true
        });
        /*dialogRef.afterClosed().subscribe(quiz => {
        /*f (quiz != null) {
          this.dialog.open(QuizComponent, {
            width: this.dialogWidth,
            maxHeight: this.dialogHeight,
            data: quiz
          });
          };
            })*/
        /* this.questionDialogOpened = false;
        this.question.setValue( question ? question : this.question ); */
        break;
      case 1:
        break;
    }

  }
}
