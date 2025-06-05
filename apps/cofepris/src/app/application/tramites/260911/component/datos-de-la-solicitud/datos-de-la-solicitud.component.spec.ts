// This is a Jest test suite for DatosDeLaSolicitudComponent

import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { Tramite260911Query } from '../../estados/tramite260911.query';
import { Tramite260911Store } from '../../estados/tramite260911.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let tramite260911QueryMock: any;
  let tramite260911StoreMock: any;
  let consultaioQueryMock: any;

  beforeEach(() => {
    tramite260911QueryMock = {
      selectTramite260911$: of({
        btonDeRadio: 'option1',
        justificacion: 'test justification',
        rfcDel: 'RFC123',
        denominacion: 'Test Denomination',
        correo: 'test@example.com',
      }),
    };

    tramite260911StoreMock = {
      setTramite260911State: jest.fn(),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260911Query, useValue: tramite260911QueryMock },
        { provide: Tramite260911Store, useValue: tramite260911StoreMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new DatosDeLaSolicitudComponent(
      fb,
      tramite260911QueryMock,
      tramite260911StoreMock,
      consultaioQueryMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call crearFormulario', () => {
    const crearFormularioSpy = jest.spyOn(component, 'crearFormulario');
    component.ngOnInit();
    expect(crearFormularioSpy).toHaveBeenCalled();
  });

  it('should create the form with correct controls and validators', () => {
    component.crearFormulario();
    expect(component.form.contains('btonDeRadio')).toBe(true);
    expect(component.form.contains('justificacion')).toBe(true);
    expect(component.datosDelEstablecimiento.contains('rfcDel')).toBe(true);
    expect(component.datosDelEstablecimiento.contains('denominacion')).toBe(true);
    expect(component.datosDelEstablecimiento.contains('correo')).toBe(true);
  });

  it('should toggle form controls', () => {
    component.crearFormulario();
    component.datosDelEstablecimiento.get('rfcDel')?.disable();
    component.toggleFormControls();
    expect(component.datosDelEstablecimiento.get('rfcDel')?.enabled).toBe(true);
  });

  it('should toggle the collapsible property', () => {
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });

  it('should update the store with setValorStore', () => {
    component.crearFormulario();
    component.form.get('btonDeRadio')?.setValue('option1');
    component.setValorStore(component.form, 'btonDeRadio');
    expect(tramite260911StoreMock.setTramite260911State).toHaveBeenCalledWith({
      btonDeRadio: 'option1',
    });
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call crearFormulario if esFormularioSoloLectura is false', () => {
    const crearSpy = jest.spyOn(component, 'crearFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(crearSpy).toHaveBeenCalled();
  });

  it('should disable forms in guardarDatosFormulario when readonly', () => {
    component.crearFormulario();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.form.disabled).toBe(true);
    expect(component.datosDelEstablecimiento.disabled).toBe(true);
  });

  it('should enable forms in guardarDatosFormulario when not readonly', () => {
    component.crearFormulario();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.form.enabled).toBe(true);
    expect(component.datosDelEstablecimiento.enabled).toBe(true);
  });
});