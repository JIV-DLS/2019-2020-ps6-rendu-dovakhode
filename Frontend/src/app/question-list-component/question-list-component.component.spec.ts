import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListComponentComponent } from './question-list-component.component';

describe('QuestionListComponentComponent', () => {
  let component: QuestionListComponentComponent;
  let fixture: ComponentFixture<QuestionListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
