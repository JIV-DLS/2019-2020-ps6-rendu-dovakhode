import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDoStartComponent } from './quiz-do-start.component';

describe('QuizDoStartComponent', () => {
  let component: QuizDoStartComponent;
  let fixture: ComponentFixture<QuizDoStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDoStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDoStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
