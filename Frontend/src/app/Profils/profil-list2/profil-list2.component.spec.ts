import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilList2Component } from './profil-list2.component';

describe('ProfilList2Component', () => {
  let component: ProfilList2Component;
  let fixture: ComponentFixture<ProfilList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
