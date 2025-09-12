import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService, Catalogo, CatalogoSelectComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Español' }] })),
      getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Entidad' }] })),
      getRepresentacion: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Representación' }] })),
    };
    tramiteStoreMock = {};
    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CatalogoSelectComponent, DatosCertificadoComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110201Store, useValue: tramiteStoreMock },
        { provide: Tramite110201Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIdioma and set optionsIdioma', () => {
    component.getIdioma();
    expect(registroServiceMock.getIdioma).toHaveBeenCalled();
  });

  it('should call getEntidad and set optionsEntidad', () => {
    component.getEntidad();
    expect(registroServiceMock.getEntidad).toHaveBeenCalled();
  });

  it('should call getRepresentacion and set optionsRepresentacion', () => {
    component.getRepresentacion();
    expect(registroServiceMock.getRepresentacion).toHaveBeenCalled();
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        observaciones: ['']
      })
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
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

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
     const storeMethod = jest.fn();
  component.store = { setNombre: storeMethod } as any; 
  const form = new FormBuilder().group({ campo: ['valor'] });
  component.entidadFederativaData = 'DURANGO';
  component.setValoresStore(form, 'campo', 'setNombre');
  expect(storeMethod).toHaveBeenCalledWith('valor');
  });

  it('should set isJustificacion true if VALOR === 8 and metodoNombre === setEntidad and entidadFederativaData === DURANGO', () => {
    const storeMethod = jest.fn();
    component.store = { setEntidad: storeMethod } as any;
    const form = new FormBuilder().group({ entidad: [8] });
    component.entidadFederativaData = 'DURANGO';
    component.isJustificacion = false;
    component.setValoresStore(form, 'entidad', 'setEntidad');
    expect(component.isJustificacion).toBe(true);
  });

  it('should set isJustificacion false if VALOR !== 8 or metodoNombre !== setEntidad', () => {
    const storeMethod = jest.fn();
    component.store = { setEntidad: storeMethod } as any;
    const form = new FormBuilder().group({ entidad: [7] });
    component.entidadFederativaData = 'DURANGO';
    component.isJustificacion = true;
    component.setValoresStore(form, 'entidad', 'setEntidad');
    expect(component.isJustificacion).toBe(false);
  });

  it('should return validacionForm', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeTruthy();
  });

  it('should set up forms in donanteDomicilio', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    expect(component.registroForm).toBeTruthy();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierNext = jest.spyOn(component.destroyed$, 'next');
    const destroyNotifierComplete = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierNext).toHaveBeenCalled();
    expect(destroyNotifierComplete).toHaveBeenCalled();
  });

  it('should set isJustificacion true if entidadDescripcion includes 8 and entidadFederativaData is DURANGO', () => {
    component.entidadDescripcion = ['8'];
    component.entidadFederativaData = 'DURANGO';
    component.ngOnInit();
    expect(component.isJustificacion).toBe(true);
  });

  it('should set isJustificacion false if entidadDescripcion does not include 8 or entidadFederativaData is not DURANGO', () => {
    component.entidadDescripcion = [7];
    component.entidadFederativaData = 'DURANGO';
    component.ngOnInit();
    expect(component.isJustificacion).toBe(false);

    component.entidadDescripcion = [8];
    component.entidadFederativaData = 'OTRO';
    component.ngOnInit();
    expect(component.isJustificacion).toBe(false);
  });
});