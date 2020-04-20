import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubThemeListComponent } from './sub-theme-list.component';

describe('SubThemeListComponent', () => {
  let component: SubThemeListComponent;
  let fixture: ComponentFixture<SubThemeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubThemeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubThemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
