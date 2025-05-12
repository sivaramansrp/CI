import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReplaySubject, of } from 'rxjs'; // Import `of` here

import { SolicitudComponent } from './solicitud.component';
import { RegistroSolicitudService } from './../services/registro-solicitud-service.service';
import { FormBuilder } from '@angular/forms';
import { Tramite31802Store } from '../state/Tramite31802.store';
import { Tramite31802Query } from '../state/Tramite31802.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FECHAINICIAL, FECHAFINAL, FECHAPAGO } from '../model/registro.model';
import { Solicitud31802Enum } from '../constants/solicitud31802.enum';

// Mock implementations
class MockRegistroSolicitudService {
  getBancoData = jest.fn(() => of({})); // Mock method returning an observable
}

class MockTramite31802Store {
  setValoresStore = jest.fn();
  limpiarSolicitud = jest.fn();
}

class MockTramite31802Query {
  selectSolicitud$ = of({});
}
type Tramite31802StoreMethods = {
  setValoresStore: (value: unknown) => void;
  limpiarSolicitud: () => void;
};
class MockValidacionesFormularioService {
  isValid = jest.fn(); 
}
describe('SolicitudComponent', () => {
  let fixture: ComponentFixture<SolicitudComponent>;
  let component: SolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,SolicitudComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: RegistroSolicitudService, useClass: MockRegistroSolicitudService },
        FormBuilder,
        { provide: Tramite31802Store, useClass: MockTramite31802Store },
        { provide: Tramite31802Query, useClass: MockTramite31802Query },
        { provide: ValidacionesFormularioService, useClass: MockValidacionesFormularioService }, // Mock service
      ],
    })
      .overrideComponent(SolicitudComponent, {
        set: { providers: [{ provide: RegistroSolicitudService, useClass: MockRegistroSolicitudService }] },
      })
      .compileComponents();
  
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnDestroy()', () => {
    jest.spyOn(component.destroyed$, 'next');
    jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalledWith(true);
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it('should initialize destroyed$ as a ReplaySubject', () => {
    expect(component.destroyed$).toBeInstanceOf(ReplaySubject);
  });

  it('should initialize fechaInicialInput with FECHAINICIAL', () => {
    expect(component.fechaInicialInput).toEqual(FECHAINICIAL);
  });

  it('should initialize fechaFinalInput with FECHAFINAL', () => {
    expect(component.fechaFinalInput).toEqual(FECHAFINAL);
  });

  it('should initialize fechaPagoInput with FECHAPAGO', () => {
    expect(component.fechaPagoInput).toEqual(FECHAPAGO);
  });

  it('should initialize solicitudEnum with Solicitud31802Enum', () => {
    expect(component.solicitudEnum).toEqual(Solicitud31802Enum);
  });

  it('should run #cambioFechaPago()', async () => {
    component.registroForm = component.fb.group({
      fechaPago: [''],
    });
  
    jest.spyOn(component.registroForm, 'patchValue');
    component.setValoresStore = jest.fn();
  
    const mockEvent = '2025-01-01'; 
    component.cambioFechaPago(mockEvent);
  
    expect(component.registroForm.patchValue).toHaveBeenCalled();
    expect(component.setValoresStore).toHaveBeenCalled();
  });

  it('should run #enviarFormulario()', async () => {
    component.registroForm = component.fb.group({
      testField: ['', Validators.required], 
    });
  
    jest.spyOn(component, 'validarDestinatarioFormulario');
    component.enviarFormulario();
    expect(component.validarDestinatarioFormulario).toHaveBeenCalled();
  });
  it('should run #esValido()', async () => {
    const mockForm = component.fb.group({
      testField: ['', Validators.required], // Add a required control
    });
  
    const mockField = 'testField';
  
    jest.spyOn(component.validacionesService, 'isValid');
    component.esValido(mockForm, mockField);
    expect(component.validacionesService.isValid).toHaveBeenCalledWith(mockForm, mockField);
  });
  it('should run #validarDestinatarioFormulario()', async () => {
    component.registroForm = component.fb.group({
      testField: ['', Validators.required], 
    });
  
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });
  
  it('should run #setValoresStore()', async () => {
    const form = {
      get: jest.fn().mockReturnValue({ value: 'testValue' }),
    };
    const field = 'testField';
    jest.spyOn(component.store, 'setFechaPago');
    component.setValoresStore(form as any, field, 'setFechaPago');
    expect(component.store.setFechaPago).toHaveBeenCalledWith('testValue');
  });

  it('should run #donanteDomicilio()', async () => {
    jest.spyOn(component.fb, 'group');
    component.solicitudState = {
      llave: 'testLlave',
      manifiesto1: 'testManifiesto1',
      manifiesto2: 'testManifiesto2',
      manifiesto3: 'testManifiesto3',
      numeroOperacion: 12345,
      fechaPago: '2025-01-01',
      monedaNacional: 'MXN',
    } as any;
    component.donanteDomicilio();
    expect(component.fb.group).toHaveBeenCalled();
  });
});