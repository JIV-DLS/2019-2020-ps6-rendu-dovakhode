import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDisplayListComponent } from './quiz-display-list.component';

describe('QuizDisplayListComponent', () => {
  let component: QuizDisplayListComponent;
  let fixture: ComponentFixture<QuizDisplayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDisplayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDisplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
