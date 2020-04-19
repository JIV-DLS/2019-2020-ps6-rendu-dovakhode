import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfilComponent } from './home-profil.component';

describe('HomeProfilComponent', () => {
  let component: HomeProfilComponent;
  let fixture: ComponentFixture<HomeProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
