import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRecapComponent } from './quiz-recap.component';

describe('QuizRecapComponent', () => {
  let component: QuizRecapComponent;
  let fixture: ComponentFixture<QuizRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
