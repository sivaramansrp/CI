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
        { provide: require('@ng-mf/data-access-user').ConsultaioQuery, useClass: MockConsultaioQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioOperacionComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formularioOperacionForm).toBeDefined();
    expect(component.formularioOperacionForm.controls['noLicenciaSanitaria'].value).toBe('');
    expect(component.formularioOperacionForm.controls['regimen'].value).toBe('');
  });

  it('should validate "regimen" as a required field', () => {
    const regimenControl = component.formularioOperacionForm.controls['regimen'];
    expect(regimenControl.valid).toBeFalsy();
    regimenControl.setValue('Valid Value');
    expect(regimenControl.valid).toBeTruthy();
  });

  it('should load clave data from the service', () => {
    component.actualizarEstado();
    expect(component.clave).toEqual([{ id: 1, descripcion: 'Mock Clave' }]);
  });

  it('should set regimen and entradas from observables', () => {
    component.actualizarEstado();
    expect(component.formularioOperacionForm.get('regimen')?.value).toBe('mockRegimen');
    expect(component.formularioOperacionForm.get('entradas')?.value).toBe('mockEntradas');
  });

  it('should set empty string if observables emit falsy values', () => {
    // Patch observables to emit falsy values
    (component as any).selectedRegimen$ = of('');
    (component as any).selectedEntradas$ = of(null);
    component.actualizarEstado();
    expect(component.formularioOperacionForm.get('regimen')?.value).toBe('');
    expect(component.formularioOperacionForm.get('entradas')?.value).toBe('');
  });

  it('should toggle readonly state on alternarSoloLectura', () => {
    component.esSoloLectura = true;
    const event = { target: { checked: true } } as any;
    component.alternarSoloLectura(event);
    expect(component.esSoloLectura).toBe(false);
  });

  it('should call setRegimen and setEntradas on updateRegimen/updateEntradas', () => {
    const store = TestBed.inject('Tramite260212Store' as any) as MockTramite260212Store;
    component.formularioOperacionForm.get('regimen')?.setValue('testRegimen');
    component.formularioOperacionForm.get('entradas')?.setValue('testEntradas');
    component.updateRegimen();
    component.updateEntradas();
    expect(store.setRegimen).toHaveBeenCalledWith('testRegimen');
    expect(store.setEntradas).toHaveBeenCalledWith('testEntradas');
  });

  it('should disable form in readonly mode', () => {
    component.formularioOperacionForm.enable();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formularioOperacionForm.disabled).toBe(true);
  });

  it('should enable form in edit mode', () => {
    component.formularioOperacionForm.disable();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.formularioOperacionForm.enabled).toBe(true);
  });

  it('should not throw if guardarDatosFormulario called before form init', () => {
    (component as any).formularioOperacionForm = undefined;
    expect(() => component.guardarDatosFormulario()).not.toThrow();
  });

  it('should not throw if inicializarEstadoFormulario called before form init', () => {
    (component as any).formularioOperacionForm = undefined;
    expect(() => component.inicializarEstadoFormulario()).not.toThrow();
  });

  it('should clean up on destroy', () => {
    const destroySpy = spyOn((component as any).destroy$, 'next').and.callThrough();
    const completeSpy = spyOn((component as any).destroy$, 'complete').and.callThrough();
    const unsubSpy = spyOn((component as any).subscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
    expect(unsubSpy).toHaveBeenCalled();
  });

  it('should return form controls via getter', () => {
    expect(component.formControls).toBe(component.formularioOperacionForm.controls);
  });

  it('should return clave via getClaveCatalog', () => {
    component.clave = [{ id: 2, descripcion: 'Test' }];
    expect(component.getClaveCatalog()).toEqual([{ id: 2, descripcion: 'Test' }]);
  });
});
