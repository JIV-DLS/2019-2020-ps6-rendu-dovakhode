import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDoComponent } from './quiz-do.component';

describe('QuizDoComponent', () => {
  let component: QuizDoComponent;
  let fixture: ComponentFixture<QuizDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
