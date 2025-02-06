import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosDeFerrocarrilComponent } from './carros-de-ferrocarril.component';

describe('CarrosDeFerrocarrilComponent', () => {
  let component: CarrosDeFerrocarrilComponent;
  let fixture: ComponentFixture<CarrosDeFerrocarrilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrosDeFerrocarrilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrosDeFerrocarrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
