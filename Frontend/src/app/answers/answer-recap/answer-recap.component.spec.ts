import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerRecapComponent } from './answer-recap.component';

describe('AnswerRecapComponent', () => {
  let component: AnswerRecapComponent;
  let fixture: ComponentFixture<AnswerRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
