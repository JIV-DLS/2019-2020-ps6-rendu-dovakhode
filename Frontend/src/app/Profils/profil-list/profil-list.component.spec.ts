import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilListComponent } from './profil-list.component';

describe('ProfilList2Component', () => {
  let component: ProfilListComponent;
  let fixture: ComponentFixture<ProfilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
