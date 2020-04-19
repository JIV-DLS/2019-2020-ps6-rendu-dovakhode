import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsListComponent } from './profils-list.component';

describe('ProfilList2Component', () => {
  let component: ProfilsListComponent;
  let fixture: ComponentFixture<ProfilsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
