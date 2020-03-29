import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDoComponent } from './question-do.component';

describe('QuestionDoComponent', () => {
  let component: QuestionDoComponent;
  let fixture: ComponentFixture<QuestionDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
