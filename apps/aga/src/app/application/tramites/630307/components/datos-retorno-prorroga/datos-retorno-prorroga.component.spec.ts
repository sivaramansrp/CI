import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosRetornoProrrogaComponent } from './datos-retorno-prorroga.component';

describe('DatosRetornoProrrogaComponent', () => {
  let component: DatosRetornoProrrogaComponent;
  let fixture: ComponentFixture<DatosRetornoProrrogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosRetornoProrrogaComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRetornoProrrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('debería inicializar el formulario con los campos requeridos y validaciones', () => {
      expect(component.datosImportacionRetornoProrrogaGeneralFormulario).toBeDefined();
      const form = component.datosImportacionRetornoProrrogaGeneralFormulario;

      expect(form.get('folioInformacionGeneralProrroga')).toBeDefined();
      expect(form.get('folioInformacionGeneralProrroga')?.validator).toBeTruthy();

      expect(form.get('fechaInicioProrroga')).toBeDefined();
      expect(form.get('fechaInicioProrroga')?.validator).toBeTruthy();

      expect(form.get('fechaVencimientoProrroga')).toBeDefined();
      expect(form.get('fechaVencimientoProrroga')?.validator).toBeTruthy();
    });
  });

  describe('cambioFechaVencimientoProrroga', () => {
    it('debería actualizar el valor de fechaVencimientoProrroga en el formulario', () => {
      const nuevoValor = '2023-10-15';
      component.cambioFechaVencimientoProrroga(nuevoValor);

      expect(
        component.datosImportacionRetornoProrrogaGeneralFormulario.get('fechaVencimientoProrroga')?.value
      ).toBe(nuevoValor);
    });
  });

  describe('cambioFechaInicioProrroga', () => {
    it('debería actualizar el valor de fechaInicioProrroga en el formulario', () => {
      const nuevoValor = '2023-10-01';
      component.cambioFechaInicioProrroga(nuevoValor);

      expect(
        component.datosImportacionRetornoProrrogaGeneralFormulario.get('fechaInicioProrroga')?.value
      ).toBe(nuevoValor);
    });
  });
});
