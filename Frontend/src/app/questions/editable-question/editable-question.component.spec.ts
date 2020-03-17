import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableQuestionComponent } from './editable-question.component';

describe('EditableQuestionComponent', () => {
  let component: EditableQuestionComponent;
  let fixture: ComponentFixture<EditableQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
