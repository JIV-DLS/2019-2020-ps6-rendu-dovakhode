import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDoQuizComponent } from './home-do-quiz.component';

describe('HomeDoQuizComponent', () => {
  let component: HomeDoQuizComponent;
  let fixture: ComponentFixture<HomeDoQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDoQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDoQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
