import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService, Catalogo, CatalogosSelect, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Tratado' }] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Pais' }] })),
      getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'UMC' }] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Unidad' }] })),
      getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Factura' }] })),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([])),
    };
    tramiteStoreMock = {
      setEstablecerSiCasilla: jest.fn(),
    };
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
      imports: [ReactiveFormsModule, CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110207Store, useValue: tramiteStoreMock },
        { provide: Tramite110207Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call manejarClic and open modal', () => {
    document.body.innerHTML = `<div id="datosMercancia"></div>`;
    expect(() => component.manejarClic({})).not.toThrow();
  });

  it('should call establecerSiCasilla and update store', () => {
    const event = { target: { checked: true } } as any;
    component.establecerSiCasilla(event);
    expect(tramiteStoreMock.setEstablecerSiCasilla).toHaveBeenCalledWith(true);
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: ['', Validators.required]
      })
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should mark all as touched if mercanciaForm is invalid in validarMercanciaForm', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        cantidad: ['', Validators.required]
      })
    });
    jest.spyOn(component.mercanciaForm, 'markAllAsTouched');
    component.mercanciaForm.setErrors({ invalid: true });
    component.validarMercanciaForm();
    expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call all catalog methods and donanteDomicilio on ngOnInit', () => {
    jest.spyOn(component, 'getTratado');
    jest.spyOn(component, 'getPais');
    jest.spyOn(component, 'getUMC');
    jest.spyOn(component, 'getUnidadMedida');
    jest.spyOn(component, 'getTipoFactura');
    jest.spyOn(component, 'getSolicitudesTabla');
    jest.spyOn(component, 'inicializarEstadoFormulario');
    jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(component.getTratado).toHaveBeenCalled();
    expect(component.getPais).toHaveBeenCalled();
    expect(component.getUMC).toHaveBeenCalled();
    expect(component.getUnidadMedida).toHaveBeenCalled();
    expect(component.getTipoFactura).toHaveBeenCalled();
    expect(component.getSolicitudesTabla).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
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
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.soloLectura = true;
    jest.spyOn(component.registroForm, 'disable');
    jest.spyOn(component, 'donanteDomicilio');
    component.guardarDatosFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.registroForm.disable).toHaveBeenCalled();

    component.soloLectura = false;
    jest.spyOn(component.registroForm, 'enable');
    component.guardarDatosFormulario();
    expect(component.registroForm.enable).toHaveBeenCalled();
  });

  it('should patch value and call setValoresStore in cambioFechaInicial', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        fechaInicial: ['']
      })
    });
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaInicial('2024-01-01');
    expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionForm, 'fechaInicial', 'setFechInicioB');
  });

  it('should patch value and call setValoresStore in cambioFechaFinal', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        fechaFinal: ['']
      })
    });
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFinal('2024-12-31');
    expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionForm, 'fechaFinal', 'setFechFinB');
  });

  it('should patch value and call setValoresStore in cambioFechaFactura', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fecha: ['']
      })
    });
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFactura('2024-06-01');
    expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionMercanciaForm, 'fecha', 'setFecha');
  });

  it('should update hayMercanciasDisponibles in buscarMercancias', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: [0]
      })
    });
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(false);

    component.registroForm.get('validacionForm.tratado')?.setValue(1);
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(true);
  });

  it('should add a new item in agregar if mercanciaForm is valid', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fraccionMercanArancelaria: ['A'],
        cantidad: ['1'],
        unidadMedida: ['U'],
        valordelamercancia: ['100'],
        tipoFactura: ['F'],
        numeroFactura: ['N'],
        complementoDelaDescripcion: ['C'],
        fecha: ['2024-01-01']
      })
    });
    component.mercanciaSeleccionadasTablaData = [];
    component.agregar();
    expect(component.esMercanciaEnEdicion).toBe(true);
    expect(component.mercanciaSeleccionadasTablaData.length).toBe(1);
  });

  it('should set esMercanciaEnEdicion to false in modificar', () => {
    component.esMercanciaEnEdicion = true;
    component.modificar();
    expect(component.esMercanciaEnEdicion).toBe(false);
  });

  it('should set cargarArchivo to true in cargaArchivo', () => {
    component.cargarArchivo = false;
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
  });

  it('should set mostrarErrores to true and cargarArchivo to false in darError', () => {
    component.mostrarErrores = false;
    component.cargarArchivo = true;
    component.darError();
    expect(component.mostrarErrores).toBe(true);
    expect(component.cargarArchivo).toBe(false);
  });

  it('should call registroService.getTratado and set optionsTratado in getTratado', () => {
    component.getTratado();
    expect(registroServiceMock.getTratado).toHaveBeenCalled();
    expect(component.optionsTratado).toBeDefined();
  });

  it('should call registroService.getPais and set optionsPais in getPais', () => {
    component.getPais();
    expect(registroServiceMock.getPais).toHaveBeenCalled();
    expect(component.optionsPais).toBeDefined();
  });

  it('should call registroService.getUMC and set optionsUMC in getUMC', () => {
    component.getUMC();
    expect(registroServiceMock.getUMC).toHaveBeenCalled();
    expect(component.optionsUMC).toBeDefined();
  });

  it('should call registroService.getUnidadMedida and set optionsUnidadMedida in getUnidadMedida', () => {
    component.getUnidadMedida();
    expect(registroServiceMock.getUnidadMedida).toHaveBeenCalled();
    expect(component.optionsUnidadMedida).toBeDefined();
  });

  it('should call registroService.getTipoFactura and set optionsTipoFactura in getTipoFactura', () => {
    component.getTipoFactura();
    expect(registroServiceMock.getTipoFactura).toHaveBeenCalled();
    expect(component.optionsTipoFactura).toBeDefined();
  });

  it('should set cargarArchivo to false in cerrarAdjuntarArchivoMercancias', () => {
    component.cargarArchivo = true;
    component.cerrarAdjuntarArchivoMercancias();
    expect(component.cargarArchivo).toBe(false);
  });

  it('should set nombreArchivo in alSeleccionarArchivo', () => {
    const file = new File([''], 'test.txt');
    const event = { target: { files: [file] } } as any;
    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('test.txt');
    const event2 = { target: { files: [] } } as any;
    component.alSeleccionarArchivo(event2);
    expect(component.nombreArchivo).toBe('No se eligió ningún archivo');
  });

  it('should not throw on onSubmit if form is valid', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.registroForm.setErrors(null);
    expect(() => component.onSubmit()).not.toThrow();
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const storeMethod = jest.fn();
    component.store = { setFechInicioB: storeMethod } as any;
    const form = new FormBuilder().group({ fechaInicial: ['valor'] });
    component.setValoresStore(form, 'fechaInicial', 'setFechInicioB');
    expect(storeMethod).toHaveBeenCalledWith('valor');
  });

  it('should return validacionForm', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeTruthy();
  });

  it('should return validacionMercanciaForm', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({})
    });
    expect(component.validacionMercanciaForm).toBeTruthy();
  });

  it('should set up forms in donanteDomicilio', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    expect(component.registroForm).toBeTruthy();
    expect(component.mercanciaForm).toBeTruthy();
  });

  it('should set mercanciaDisponsiblesTablaDatos in getSolicitudesTabla', () => {
    component.getSolicitudesTabla();
    expect(registroServiceMock.getSolicitudesTabla).toHaveBeenCalled();
    expect(component.mercanciaDisponsiblesTablaDatos).toBeDefined();
  });

  it('should set mercanciaSeleccionadasTablaData in getSolicitudesDataTabla', () => {
    component.getSolicitudesDataTabla();
    expect(registroServiceMock.getSolicitudesDataTabla).toHaveBeenCalled();
    expect(component.mercanciaSeleccionadasTablaData).toBeDefined();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});