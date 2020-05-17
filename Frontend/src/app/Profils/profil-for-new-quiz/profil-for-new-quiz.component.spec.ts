import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilForNewQuizComponent } from './profil-for-new-quiz.component';

describe('ProfilForNewQuizComponent', () => {
  let component: ProfilForNewQuizComponent;
  let fixture: ComponentFixture<ProfilForNewQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilForNewQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilForNewQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
