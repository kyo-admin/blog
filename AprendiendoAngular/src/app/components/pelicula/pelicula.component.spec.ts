import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliComponent } from './pelicula.component';

describe('PeliComponent', () => {
  let component: PeliComponent;
  let fixture: ComponentFixture<PeliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
