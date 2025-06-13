import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosestablecimientoComponent } from './datos-establecimiento.component';

describe('DatosestablecimientoComponent', () => {
  let component: DatosestablecimientoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosestablecimientoComponent],
      providers: [FormBuilder],
    });

    const fixture = TestBed.createComponent(DatosestablecimientoComponent);
    component = fixture.componentInstance;
    component.datosdelestablecimiento = new FormBuilder().group({
      denominacion: [''],
    });
  });

  it('should create the form and disable it when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.crearFormulario = jest.fn(() => {
      component.datosdelestablecimiento = new FormBuilder().group({
        denominacion: ['Test Denominacion'],
      });
    });

    component.guardarDatosFormulario();

    expect(component.crearFormulario).toHaveBeenCalled();
    expect(component.datosdelestablecimiento.disabled).toBe(true);
  });

  it('should create the form and enable it when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.crearFormulario = jest.fn(() => {
      component.datosdelestablecimiento = new FormBuilder().group({
        denominacion: ['Test Denominacion'],
      });
    });

    component.guardarDatosFormulario();
    expect(component.crearFormulario).toHaveBeenCalled();
    expect(component.datosdelestablecimiento.enabled).toBe(true);
  });
});
