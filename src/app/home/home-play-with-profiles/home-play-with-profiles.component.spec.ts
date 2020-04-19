import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlayWithProfilesComponent } from './home-play-with-profiles.component';

describe('HomePlayWithProfilesComponent', () => {
  let component: HomePlayWithProfilesComponent;
  let fixture: ComponentFixture<HomePlayWithProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePlayWithProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePlayWithProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
