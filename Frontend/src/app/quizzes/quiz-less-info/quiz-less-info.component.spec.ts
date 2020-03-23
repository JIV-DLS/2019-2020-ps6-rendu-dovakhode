import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLessInfoComponent } from './quiz-less-info.component';

describe('QuizLessInfoComponent', () => {
  let component: QuizLessInfoComponent;
  let fixture: ComponentFixture<QuizLessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
