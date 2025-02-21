import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosParaMovilizacionNacionalComponent } from './datos-para-movilizacion-nacional.component';

describe('DatosParaMovilizacionNacionalComponent', () => {
  let component: DatosParaMovilizacionNacionalComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosParaMovilizacionNacionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosParaMovilizacionNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});