import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSearchBarComponent } from './profil-search-bar.component';

describe('ProfilSearchBarComponent', () => {
  let component: ProfilSearchBarComponent;
  let fixture: ComponentFixture<ProfilSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
