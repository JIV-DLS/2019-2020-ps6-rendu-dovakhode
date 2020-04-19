import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsCarouselComponent } from './profils-carousel.component';

describe('ProfilListComponent', () => {
  let component: ProfilsCarouselComponent;
  let fixture: ComponentFixture<ProfilsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
