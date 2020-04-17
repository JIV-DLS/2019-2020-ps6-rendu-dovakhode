import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLessInfoComponent } from './profil-less-info.component';

describe('ProfilLessInfoComponent', () => {
  let component: ProfilLessInfoComponent;
  let fixture: ComponentFixture<ProfilLessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilLessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilLessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
