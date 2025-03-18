import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraccionComponent } from './fraccion.component';

describe('FraccionComponent', () => {
  let component: FraccionComponent;
  let fixture: ComponentFixture<FraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
