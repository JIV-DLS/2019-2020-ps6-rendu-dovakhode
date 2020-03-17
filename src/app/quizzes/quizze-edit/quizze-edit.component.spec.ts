import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzeEditComponent } from './quizze-edit.component';

describe('QuizzeEditComponent', () => {
  let component: QuizzeEditComponent;
  let fixture: ComponentFixture<QuizzeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
