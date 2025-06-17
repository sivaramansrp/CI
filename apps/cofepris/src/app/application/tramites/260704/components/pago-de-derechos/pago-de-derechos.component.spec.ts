import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let consultaServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerDatosBanco: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco1' }])),
    };
    tramiteStoreMock = {
      setFechaPago: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setCadenaDependecia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setImporteDePago: jest.fn(),
    };
    tramiteQueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: 'REF123',
        cadenaDependecia: 'CADENA',
        fechaPago: '2024-01-01',
        banco: 'BANAMEX',
        liaveDePago: 'LLAVE123',
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
      imports: [ReactiveFormsModule, PagoDeDerechosComponent],
      providers: [
        FormBuilder,
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: tramiteStoreMock },
        { provide: Tramite260704Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: 'ConsultaioQuery', useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and call obtenerDatosBanco and inicializarEstadoFormulario on ngOnInit', () => {
    jest.spyOn(component, 'donanteDomicilio');
    jest.spyOn(component, 'obtenerDatosBanco');
    jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.obtenerDatosBanco).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = true;
    jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call donanteDomicilio if not soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = false;
    jest.spyOn(component, 'donanteDomicilio');
    component.inicializarEstadoFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should call donanteDomicilio and enable/disable form in guardarDatosFormulario', () => {
    component.pagoDeDerechosForm = new FormBuilder().group({
      claveDeReferencia: [''],
      cadenaDependecia: [''],
      fechaPago: [''],
      banco: [''],
      liaveDePago: [''],
      importeDePago: [''],
    });
    component.soloLectura = true;
    jest.spyOn(component.pagoDeDerechosForm, 'disable');
    jest.spyOn(component, 'donanteDomicilio');
    component.guardarDatosFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.pagoDeDerechosForm.disable).toHaveBeenCalled();

    component.soloLectura = false;
    jest.spyOn(component.pagoDeDerechosForm, 'enable');
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.enable).toHaveBeenCalled();
  });

  it('should call consultaService.obtenerDatosBanco and set bancoCatalogo.catalogos in obtenerDatosBanco', () => {
    component.obtenerDatosBanco();
    expect(consultaServiceMock.obtenerDatosBanco).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([{ id: 1, descripcion: 'Banco1' }]);
  });

  it('should patch value and call setValoresStore in cambioFechaPago', () => {
    component.pagoDeDerechosForm = new FormBuilder().group({
      fechaPago: ['']
    });
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaPago('2024-01-01');
    expect(component.setValoresStore).toHaveBeenCalledWith(component.pagoDeDerechosForm, 'fechaPago', 'setFechaPago');
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const form = new FormBuilder().group({ claveDeReferencia: ['REF123'] });
    component.setValoresStore(form, 'claveDeReferencia', 'setClaveDeReferencia');
    expect(tramiteStoreMock.setClaveDeReferencia).toHaveBeenCalledWith('REF123');
  });

  it('should initialize pagoDeDerechosForm in donanteDomicilio', () => {
    component.solicitudState = {
      claveDeReferencia: 'REF123',
      cadenaDependecia: 'CADENA',
      fechaPago: '2024-01-01',
      banco: 'BANAMEX',
      liaveDePago: 'LLAVE123',
      importeDePago: '1000'
    } as any;
    component.donanteDomicilio();
    expect(component.pagoDeDerechosForm).toBeTruthy();
    expect(component.pagoDeDerechosForm.get('claveDeReferencia')?.value).toBe('REF123');
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});