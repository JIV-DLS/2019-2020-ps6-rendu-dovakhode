import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {QuestionsComponent} from '../../questions/questions.component';
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Question} from '../../../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private quizService: QuizService,
              @Inject(MAT_DIALOG_DATA) public quizDialog: Quiz) {
  }

  ngOnInit() {
    if (this.quizDialog != null) {
    this.quiz = this.quizDialog;
    } else if (this.route.snapshot.paramMap.has('id')) {
      this.quizService.getQuizById(+this.route.snapshot.paramMap.get('id'))
        .subscribe((quiz) => {
          this.quiz = quiz; });
    }
  }

   selectQuiz() {
    this.quizSelected.emit(true);
  }
  deleteQuiz() {
    this.quizDeleted.emit(this.quiz);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionsComponent, {
      width: '950px',
      maxHeight: '500px',
      data: this.quiz ? this.quiz.questions : DEFAULT_QUIZ.questions
    });
    dialogRef.afterClosed().subscribe(questions => {
      /* this.questionDialogOpened = false;
      this.questions.setValue( questions ? questions : this.questions ); */
    });
  }

  deleteQuestion(deleteState: boolean) {
    /* if(deleteState){

    } */
  }
}
