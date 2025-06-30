import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioOperacionComercialComponent } from './formulario-operacion-comercial.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { CommonModule } from '@angular/common';

// Mocks for required dependencies
class MockSolicitudService {
  getClave() {
    return of([{ id: 1, descripcion: 'Mock Clave' }]);
  }
}
class MockTramite260212Store {
  setRegimen = jest.fn();
  setEntradas = jest.fn();
}
class MockTramite260212Query {
  selectedRegimen$ = of('mockRegimen');
  selectedEntradas$ = of('mockEntradas');
}
class MockConsultaioQuery {
  selectConsultaioState$ = of({ readonly: true });
}

describe('FormularioOperacionComercialComponent', () => {
  let component: FormularioOperacionComercialComponent;
  let fixture: ComponentFixture<FormularioOperacionComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FormularioOperacionComercialComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useClass: MockSolicitudService },
        { provide: 'Tramite260212Store', useClass: MockTramite260212Store },
        { provide: 'Tramite260212Query', useClass: MockTramite260212Query },
        { provide: 'ConsultaioQuery', useClass: MockConsultaioQuery },
        // Angular DI tokens for constructor injection
        { provide: require('../../estados/tramite260212.store').Tramite260212Store, useClass: MockTramite260212Store },
        { provide: require('../../estados/tramite260212.query').Tramite260212Query, useClass: MockTramite260212Query },
        ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioOperacionComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los valores por defecto', () => {
    expect(component.formularioOperacionForm).toBeDefined();
    expect(component.formularioOperacionForm.controls['noLicenciaSanitaria'].value).toBe('');
    // El valor inicial de 'regimen' es 'mockRegimen' por el observable simulado
    expect(component.formularioOperacionForm.controls['regimen'].value).toBe('mockRegimen');
  });

  it('debe validar "regimen" como campo requerido', () => {
    const regimenControl = component.formularioOperacionForm.controls['regimen'];
    // El valor inicial es 'mockRegimen', así que debe ser válido
    expect(regimenControl.valid).toBeTruthy();
    regimenControl.setValue('');
    expect(regimenControl.valid).toBeFalsy();
    regimenControl.setValue('Valor Válido');
    expect(regimenControl.valid).toBeTruthy();
  });

  it('debe cargar datos de clave desde el servicio', () => {
    component.actualizarEstado();
    expect(component.clave).toEqual([{ id: 1, descripcion: 'Mock Clave' }]);
  });

  it('debe establecer regimen y entradas desde los observables', () => {
    component.actualizarEstado();
    expect(component.formularioOperacionForm.get('regimen')?.value).toBe('mockRegimen');
    expect(component.formularioOperacionForm.get('entradas')?.value).toBe('mockEntradas');
  });

  it('debe establecer cadena vacía si los observables emiten valores falsy', () => {
    (component as any).selectedRegimen$ = of('');
    (component as any).selectedEntradas$ = of(null);
    component.actualizarEstado();
    expect(component.formularioOperacionForm.get('regimen')?.value).toBe('');
    expect(component.formularioOperacionForm.get('entradas')?.value).toBe('');
  });

  it('debe alternar el estado de solo lectura en alternarSoloLectura', () => {
    component.esSoloLectura = true;
    const event = { target: { checked: true } } as any;
    component.alternarSoloLectura(event);
    expect(component.esSoloLectura).toBe(false);
  });

it('debe deshabilitar el formulario en modo solo lectura', () => {
    component.formularioOperacionForm.enable();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formularioOperacionForm.disabled).toBe(true);
  });

  it('debe habilitar el formulario en modo edición', () => {
    component.formularioOperacionForm.disable();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.formularioOperacionForm.enabled).toBe(true);
  });

  it('no debe lanzar error si guardarDatosFormulario se llama antes de inicializar el formulario', () => {
    (component as any).formularioOperacionForm = undefined;
    expect(() => component.guardarDatosFormulario()).not.toThrow();
  });

  it('no debe lanzar error si inicializarEstadoFormulario se llama antes de inicializar el formulario', () => {
    (component as any).formularioOperacionForm = undefined;
    expect(() => component.inicializarEstadoFormulario()).not.toThrow();
  });

it('debe retornar los controles del formulario mediante el getter', () => {
    expect(component.formControls).toBe(component.formularioOperacionForm.controls);
  });

  it('debe retornar clave mediante getClaveCatalog', () => {
    component.clave = [{ id: 2, descripcion: 'Test' }];
    expect(component.getClaveCatalog()).toEqual([{ id: 2, descripcion: 'Test' }]);
  });
});
