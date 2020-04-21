import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRecapComponent } from './question-recap.component';

describe('QuestionRecapComponent', () => {
  let component: QuestionRecapComponent;
  let fixture: ComponentFixture<QuestionRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
