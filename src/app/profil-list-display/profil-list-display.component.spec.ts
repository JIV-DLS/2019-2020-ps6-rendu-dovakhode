import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilListDisplayComponent } from './profil-list-display.component';

describe('ProfilListDisplqyComponent', () => {
  let component: ProfilListDisplayComponent;
  let fixture: ComponentFixture<ProfilListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
