import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DatosestablecimientoComponent } from './datos-establecimiento.component';

describe('DatosestablecimientoComponent', () => {
  let COMPONENT: DatosestablecimientoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosestablecimientoComponent],
      providers: [FormBuilder],
    });

    const FIXTURE = TestBed.createComponent(DatosestablecimientoComponent);
    COMPONENT = FIXTURE.componentInstance;
    COMPONENT.datosdelestablecimiento = new FormBuilder().group({
      denominacion: [''],
    });
  });

  it('should create the form and disable it when esFormularioSoloLectura is true', () => {
    COMPONENT.esFormularioSoloLectura = true;
    COMPONENT.crearFormulario = jest.fn(() => {
      COMPONENT.datosdelestablecimiento = new FormBuilder().group({
        denominacion: ['Test Denominacion'],
      });
    });

    COMPONENT.guardarDatosFormulario();

    expect(COMPONENT.crearFormulario).toHaveBeenCalled();
    expect(COMPONENT.datosdelestablecimiento.disabled).toBe(true);
  });

  it('should create the form and enable it when esFormularioSoloLectura is false', () => {
    COMPONENT.esFormularioSoloLectura = false;
    COMPONENT.crearFormulario = jest.fn(() => {
      COMPONENT.datosdelestablecimiento = new FormBuilder().group({
        denominacion: ['Test Denominacion'],
      });
    });

    COMPONENT.guardarDatosFormulario();
    expect(COMPONENT.crearFormulario).toHaveBeenCalled();
    expect(COMPONENT.datosdelestablecimiento.enabled).toBe(true);
  });
});
