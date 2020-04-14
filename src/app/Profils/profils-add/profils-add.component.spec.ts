import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsAddComponent } from './profils-add.component';

describe('ProfilsAddComponent', () => {
  let component: ProfilsAddComponent;
  let fixture: ComponentFixture<ProfilsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
