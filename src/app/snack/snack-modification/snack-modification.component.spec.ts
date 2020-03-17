import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackModificationComponent } from './snack-modification.component';

describe('SnackModificationComponent', () => {
  let component: SnackModificationComponent;
  let fixture: ComponentFixture<SnackModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
