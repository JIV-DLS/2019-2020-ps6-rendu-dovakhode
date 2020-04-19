import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSearchBarComponent } from './quiz-search-bar.component';

describe('QuizSearchBarComponent', () => {
  let component: QuizSearchBarComponent;
  let fixture: ComponentFixture<QuizSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
