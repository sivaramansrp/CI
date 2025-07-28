import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SolicitudComponent } from './Solicitud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { RegistroSolicitudService } from '../services/registro-solicitud-service.service';
import { Tramite31803Store } from '../state/Tramite31803.store';
import { Tramite31803Query } from '../state/Tramite31803.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  let mockRegistroSolicitudService = {
    obtenerDatosBanco: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco Test' }])),
  };

  let mockConsultaQuery = {
    selectConsultaioState$: of({ esSoloLectura: true, readonly: true }),
    getValue: () => ({ esSoloLectura: true, readonly: true }),
  };

  let mockQuery = {
    selectSolicitud$: of({
      banco: 'Banco Test',
      llave: 'LLAVE',
      manifiesto1: 'Man1',
      manifiesto2: 'Man2',
      numeroOperacion: '123',
      fechaPago: '2025-01-01',
    }),
  };

  let mockStore = {
    setFechaPago: jest.fn(),
  };

  let mockValidaciones = {
    isValid: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, SolicitudComponent],
      providers: [
        FormBuilder,
        { provide: RegistroSolicitudService, useValue: mockRegistroSolicitudService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: Tramite31803Query, useValue: mockQuery },
        { provide: Tramite31803Store, useValue: mockStore },
        { provide: ValidacionesFormularioService, useValue: mockValidaciones },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDatosBanco and update bancoCatalogo', fakeAsync(() => {
    mockRegistroSolicitudService.obtenerDatosBanco.mockClear();
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    expect(component.bancoCatalogo.catalogos.length).toBe(0);
  }));

  it('should initialize the form in ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.registroForm).toBeDefined();
    expect(component.registroForm.get('banco')?.value).toBe('Banco Test');
  }));

  it('should call guardarDatosDelFormulario when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    const guardarSpy = jest.spyOn(component as any, 'guardarDatosDelFormulario');
    const datosDeAvisoSpy = jest.spyOn(component as any, 'datosDeAvisoForm');
    component.inicializarEstadoFormulario();
    expect(guardarSpy).toHaveBeenCalled();
    expect(datosDeAvisoSpy).not.toHaveBeenCalled();
  });

  it('should call datosDeAvisoForm when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    const guardarSpy = jest.spyOn(component as any, 'guardarDatosDelFormulario');
    const datosDeAvisoSpy = jest.spyOn(component as any, 'datosDeAvisoForm');
    component.inicializarEstadoFormulario();
    expect(datosDeAvisoSpy).toHaveBeenCalled();
    expect(guardarSpy).not.toHaveBeenCalled();
  });

  it('should disable form fields when esFormularioSoloLectura is true in datosDeAvisoForm', () => {
    component.registroForm = component.fb.group({
      banco: ['valor'],
      manifiesto1: ['valor'],
      manifiesto2: ['valor'],
      llave: ['valor'],
      numeroOperacion: ['valor'],
      fechaPago: ['valor'],
      monedaNacional: ['valor'],
    });

    component.esFormularioSoloLectura = true;

    Object.keys(component.registroForm.controls).forEach(key => {
      component.registroForm.get(key)?.enable();
      expect(component.registroForm.get(key)?.disabled).toBe(false);
    });

    component.datosDeAvisoForm();

    expect(component.registroForm.get('banco')?.disabled).toBe(true);
    expect(component.registroForm.get('manifiesto1')?.disabled).toBe(true);
    expect(component.registroForm.get('manifiesto2')?.disabled).toBe(true);
    expect(component.registroForm.get('llave')?.disabled).toBe(true);
    expect(component.registroForm.get('numeroOperacion')?.disabled).toBe(true);
    expect(component.registroForm.get('fechaPago')?.disabled).toBe(true);
    expect(component.registroForm.get('monedaNacional')?.disabled).toBe(true);
  });

  it('should not disable form fields when esFormularioSoloLectura is false in datosDeAvisoForm', () => {
    component.registroForm = component.fb.group({
      banco: ['valor'],
      manifiesto1: ['valor'],
      manifiesto2: ['valor'],
      llave: ['valor'],
      numeroOperacion: ['valor'],
      fechaPago: ['valor'],
      monedaNacional: ['valor'],
    });

    component.esFormularioSoloLectura = false;

    Object.keys(component.registroForm.controls).forEach(key => {
      component.registroForm.get(key)?.enable();
      expect(component.registroForm.get(key)?.disabled).toBe(false);
    });

    component.datosDeAvisoForm();

    expect(component.registroForm.get('banco')?.disabled).toBe(false);
    expect(component.registroForm.get('manifiesto1')?.disabled).toBe(false);
    expect(component.registroForm.get('manifiesto2')?.disabled).toBe(false);
    expect(component.registroForm.get('llave')?.disabled).toBe(false);
    expect(component.registroForm.get('numeroOperacion')?.disabled).toBe(false);
    expect(component.registroForm.get('fechaPago')?.disabled).toBe(false);
    expect(component.registroForm.get('monedaNacional')?.disabled).toBe(false);
  });

  it('should set readonly mode and disable form fields', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.registroForm.disabled).toBe(false);
  }));

  it('should update fechaPago in the form and store', () => {
    component.registroForm = component.fb.group({
      fechaPago: [''],
    });

    component.cambioFechaPago('2025-06-15');

    expect(component.registroForm.get('fechaPago')?.value).toBe('2025-06-15');
    expect(mockStore.setFechaPago).toHaveBeenCalledWith('2025-06-15');
  });

  it('should mark form as touched if invalid', () => {
    component.registroForm = component.fb.group({
      banco: ['', { validators: [] }],
    });
    const validators = [component.fb.control('').validator, (control: { value: any; }) => !control.value ? { required: true } : null].filter(
      (v): v is import('@angular/forms').ValidatorFn => v !== null
    );
    component.registroForm.get('banco')?.setValidators(validators);
    component.registroForm.get('banco')?.updateValueAndValidity();

    const markAllTouchedSpy = jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(markAllTouchedSpy).toHaveBeenCalled();
  });

  it('should check if form field is valid', () => {
    const result = component.esValido(component.fb.group({}), 'testField');
    expect(result).toBe(true);
  });

  it('should destroy observables on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});