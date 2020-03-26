import {Component, OnInit, TemplateRef} from '@angular/core';
import {environment} from '../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {QuizAddComponent} from '../quizzes/quiz-add/quiz-add.component';
import {QuizComponent} from '../quizzes/quiz/quiz.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dialogWidth = '950px';
  dialogHeight = '500px';
  constructor(private dialog: MatDialog) { }

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
          width: this.dialogWidth,
          maxHeight: this.dialogHeight
        });
        dialogRef.afterClosed().subscribe(quiz => {
        if (quiz != null) {
          this.dialog.open(QuizComponent, {
            width: this.dialogWidth,
            maxHeight: this.dialogHeight,
            data: quiz
          });
        }
          /* this.questionDialogOpened = false;
          this.questions.setValue( questions ? questions : this.questions ); */
          });
        break;
      case 1:
        break;
    }

  }
  quiqQuiz() {
    alert(environment.maintenanceMessage);
  }
  addProfile() {
    alert(environment.maintenanceMessage);
  }
}
