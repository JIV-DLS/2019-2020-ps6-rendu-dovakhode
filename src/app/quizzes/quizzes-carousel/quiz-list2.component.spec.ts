import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizList2Component } from './quiz-list2.component';

describe('QuizList2Component', () => {
  let component: QuizList2Component;
  let fixture: ComponentFixture<QuizList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
