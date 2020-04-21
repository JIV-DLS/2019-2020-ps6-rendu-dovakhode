import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStartRecapComponent } from './quiz-start-recap.component';

describe('QuizStartRecapComponent', () => {
  let component: QuizStartRecapComponent;
  let fixture: ComponentFixture<QuizStartRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizStartRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizStartRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
