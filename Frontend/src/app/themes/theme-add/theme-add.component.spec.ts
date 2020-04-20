import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeAddComponent } from './theme-add.component';

describe('ThemeAddComponent', () => {
  let component: ThemeAddComponent;
  let fixture: ComponentFixture<ThemeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
