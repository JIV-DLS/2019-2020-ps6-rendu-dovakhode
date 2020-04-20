import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubThemeAddComponent } from './sub-theme-add.component';

describe('SubThemeAddComponent', () => {
  let component: SubThemeAddComponent;
  let fixture: ComponentFixture<SubThemeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubThemeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubThemeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
