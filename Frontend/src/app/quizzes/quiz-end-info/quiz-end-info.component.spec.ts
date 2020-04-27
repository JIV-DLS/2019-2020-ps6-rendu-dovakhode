import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEndInfoComponent } from './quiz-end-info.component';

describe('QuizEndInfoComponent', () => {
  let component: QuizEndInfoComponent;
  let fixture: ComponentFixture<QuizEndInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizEndInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizEndInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
