import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubThemeComponent } from './sub-theme.component';

describe('SubThemeComponent', () => {
  let component: SubThemeComponent;
  let fixture: ComponentFixture<SubThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
