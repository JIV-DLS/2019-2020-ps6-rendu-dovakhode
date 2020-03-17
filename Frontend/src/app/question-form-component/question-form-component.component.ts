import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question-form-component',
  templateUrl: './question-form-component.component.html',
  styleUrls: ['./question-form-component.component.scss']
})
export class QuestionFormComponentComponent implements OnInit {

  questionForm: FormGroup;
  constructor(private formbuild: FormBuilder) {
    this.InitialiseQuestionForm();
  }

  ngOnInit() {
  }
  InitialiseQuestionForm() {
    this.questionForm = this.formbuild.group({
      label: [''],
      answers: this.formbuild.array([])
  });
  }

  getAnswers() {
    return this.questionForm.get('answers') as FormArray;
  }
  createAnswer() {
    return this.formbuild.group(
      {
        value: '',
        isCorrect: 'false'
      }
    );
  }
  addAnswer() {
this.getAnswers().push(this.createAnswer());
  }
}
