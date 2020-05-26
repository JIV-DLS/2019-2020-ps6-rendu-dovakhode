import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilForEditQuizComponent } from './profil-for-edit-quiz.component';

describe('ProfilForEditQuizComponent', () => {
  let component: ProfilForEditQuizComponent;
  let fixture: ComponentFixture<ProfilForEditQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilForEditQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilForEditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
