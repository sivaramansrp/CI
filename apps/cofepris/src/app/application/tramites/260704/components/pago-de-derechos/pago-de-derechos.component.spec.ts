import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let consultaServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerDatosBanco: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco 1' }])),
    };

    storeMock = {
      setFechaPago: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setCadenaDependecia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setImporteDePago: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        claveDeReferencia: 'ref',
        cadenaDependecia: 'dep',
        fechaPago: '2024-01-01',
        banco: 'Banco 1',
        liaveDePago: 'ref',
        importeDePago: '1000'
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,PagoDeDerechosComponent],
      providers: [
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: storeMock },
        { provide: Tramite260704Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    component.solicitudState = {
      claveDeReferencia: 'ref',
      cadenaDependecia: 'dep',
      fechaPago: '2024-01-01',
      banco: 'Banco 1',
      liaveDePago: 'ref',
      importeDePago: '1000'
    } as any;
    component.soloLectura = false;
    component.donanteDomicilio();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct values', () => {
    expect(component.pagoDeDerechosForm.value.claveDeReferencia).toBe('ref');
    expect(component.pagoDeDerechosForm.value.cadenaDependecia).toBe('dep');
    expect(component.pagoDeDerechosForm.value.fechaPago).toBe('2024-01-01');
    expect(component.pagoDeDerechosForm.value.banco).toBe('Banco 1');
    expect(component.pagoDeDerechosForm.value.liaveDePago).toBe('ref');
    expect(component.pagoDeDerechosForm.value.importeDePago).toBe('1000');
  });

  it('should call obtenerDatosBanco and set bancoCatalogo', () => {
    component.obtenerDatosBanco();
    expect(consultaServiceMock.obtenerDatosBanco).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos.length).toBe(1);
  });

  it('should patch fechaPago and call setValoresStore on cambioFechaPago', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaPago('2024-02-02');
    expect(component.pagoDeDerechosForm.value.fechaPago).toBe('2024-02-02');
    expect(spy).toHaveBeenCalledWith(component.pagoDeDerechosForm, 'fechaPago', 'setFechaPago');
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = component.pagoDeDerechosForm;
    expect(component.isValid(form, 'claveDeReferencia')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'claveDeReferencia');
  });

  it('should call store method in setValoresStore', () => {
    component.setValoresStore(component.pagoDeDerechosForm, 'claveDeReferencia', 'setClaveDeReferencia');
    expect(storeMock.setClaveDeReferencia).toHaveBeenCalledWith('ref');
  });

  it('should disable form in guardarDatosFormulario if soloLectura', () => {
    component.soloLectura = true;
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.disabled).toBe(true);
  });

  it('should enable form in guardarDatosFormulario if not soloLectura', () => {
    component.soloLectura = false;
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.enabled).toBe(true);
  });

  it('should call donanteDomicilio in inicializarEstadoFormulario if not soloLectura', () => {
    const spy = jest.spyOn(component, 'donanteDomicilio');
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario in inicializarEstadoFormulario if soloLectura', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});