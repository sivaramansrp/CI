import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosExtraordinariosComponent } from './servicios-extraordinarios.component';

describe('ServiciosExtraordinariosComponent', () => {
  let component: ServiciosExtraordinariosComponent;
  let fixture: ComponentFixture<ServiciosExtraordinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosExtraordinariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiciosExtraordinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
