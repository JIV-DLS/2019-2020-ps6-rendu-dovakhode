import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Question} from '../../models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() questionEdition = null;
  constructor(
    public dialogRef: MatDialogRef<QuestionsComponent>,
    // public questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) public questions: Question[]) {}


  ngOnInit(): void {
    if (this.questionEdition != null) {this.questions = this.questionEdition; }
  }

  addQuestion(question: Question) {
    this.close(question);
  }

  close(question: Question) {
    const questionSaved = question;
    this.dialogRef.close({...questionSaved});
  }
}

