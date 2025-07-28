import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([])),
    };
    tramiteStoreMock = {
      setEstablecerSiCasilla: jest.fn(),
      setTratado: jest.fn(),
      setPais: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setfraccionMercanArancelaria: jest.fn(),
      setnombretecnico: jest.fn(),
      setnomreeningles: jest.fn(),
      setcriterioparaconferir: jest.fn(),
      setmarca: jest.fn(),
      setcantidad: jest.fn(),
      setUMC: jest.fn(),
      setUnidadMedida: jest.fn(),
      setTipoFactura: jest.fn(),
      setFecha: jest.fn(),
      setNFactura: jest.fn(),
      setJustificacion: jest.fn(),
      setvalordelamercancia: jest.fn(),
      setcomplementodeladescripcion: jest.fn(),
      setmasabruta: jest.fn(),
      setnombrecomercialdelamercancia: jest.fn(),
      setNumRegistro: jest.fn(),
      setNomComercial: jest.fn(),
      setFechInicioB: jest.fn(),
      setFechFinB: jest.fn(),
      setArchivo: jest.fn(),
      setObservaciones: jest.fn(),
      setPresica: jest.fn(),
      setPresenta: jest.fn(),
      setIdioma: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPrimer: jest.fn(),
      setApellidoSegundo: jest.fn(),
      setNumeroFiscal: jest.fn(),
      setRazonSocial: jest.fn(),
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setNacion: jest.fn(),
      setTransporte: jest.fn(),
      setCheckbox: jest.fn(),
      setRutaCompleta: jest.fn(),
      setPuertoEmbarque: jest.fn(),
      setPuertoDesembarque: jest.fn(),
      limpiarSolicitud: jest.fn(),
    };
    queryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110207Store, useValue: tramiteStoreMock },
        { provide: Tramite110207Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    component.solicitudState = {} as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

it('should call donanteDomicilio and enable/disable form in guardarDatosFormulario', () => {
  const donanteSpy = jest.spyOn(component, 'donanteDomicilio');

  const mockFormGroup = new FormBuilder().group({});
  const disableSpy = jest.spyOn(mockFormGroup, 'disable');
  const enableSpy = jest.spyOn(mockFormGroup, 'enable');

  donanteSpy.mockImplementation(() => {
    component.registroForm = mockFormGroup;
  });

  component.soloLectura = true;
  component.guardarDatosFormulario();
  expect(donanteSpy).toHaveBeenCalled();
  expect(disableSpy).toHaveBeenCalled();

  component.soloLectura = false;
  component.guardarDatosFormulario();
  expect(enableSpy).toHaveBeenCalled();
});


  it('should call setEstablecerSiCasilla in establecerSiCasilla', () => {
    const event = { target: { checked: true } } as any;
    component.establecerSiCasilla(event);
    expect(tramiteStoreMock.setEstablecerSiCasilla).toHaveBeenCalledWith(true);
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should mark all as touched if mercanciaForm is invalid in validarMercanciaForm', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({})
    });
    jest.spyOn(component.mercanciaForm, 'markAllAsTouched');
    component.mercanciaForm.setErrors({ invalid: true });
    component.validarMercanciaForm();
    expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call getTratado, getPais, getUMC, getUnidadMedida, getTipoFactura, getSolicitudesTabla, inicializarEstadoFormulario, donanteDomicilio, and subscribe in ngOnInit', () => {
    const tratadoSpy = jest.spyOn(component, 'getTratado');
    const paisSpy = jest.spyOn(component, 'getPais');
    const umcSpy = jest.spyOn(component, 'getUMC');
    const unidadSpy = jest.spyOn(component, 'getUnidadMedida');
    const tipoFacturaSpy = jest.spyOn(component, 'getTipoFactura');
    const solicitudesTablaSpy = jest.spyOn(component, 'getSolicitudesTabla');
    const inicializarSpy = jest.spyOn(component, 'inicializarEstadoFormulario');
    const donanteSpy = jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(tratadoSpy).toHaveBeenCalled();
    expect(paisSpy).toHaveBeenCalled();
    expect(umcSpy).toHaveBeenCalled();
    expect(unidadSpy).toHaveBeenCalled();
    expect(tipoFacturaSpy).toHaveBeenCalled();
    expect(solicitudesTablaSpy).toHaveBeenCalled();
    expect(inicializarSpy).toHaveBeenCalled();
    expect(donanteSpy).toHaveBeenCalled();
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

  it('should patch value and call setValoresStore in cambioFechaInicial', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({ fechaInicial: '' })
    });
    const setValoresSpy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaInicial('2024-01-01');
    expect(setValoresSpy).toHaveBeenCalledWith(component.validacionForm, 'fechaInicial', 'setFechInicioB');
  });

  it('should patch value and call setValoresStore in cambioFechaFinal', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({ fechaFinal: '' })
    });
    const setValoresSpy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFinal('2024-01-02');
    expect(setValoresSpy).toHaveBeenCalledWith(component.validacionForm, 'fechaFinal', 'setFechFinB');
  });

  it('should patch value and call setValoresStore in cambioFechaFactura', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({ fecha: '' })
    });
    const setValoresSpy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFactura('2024-01-03');
    expect(setValoresSpy).toHaveBeenCalledWith(component.validacionMercanciaForm, 'fecha', 'setFecha');
  });

  it('should set hayMercanciasDisponibles to false if tratado is 0 in buscarMercancias', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({ tratado: 0 })
    });
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(false);
  });

  it('should set hayMercanciasDisponibles to true if tratado is not 0 in buscarMercancias', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({ tratado: 1 })
    });
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(true);
  });

  it('should call getTratado, getPais, getUMC, getUnidadMedida, getTipoFactura in buscarMercancias', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({ tratado: 1 })
    });
    const tratadoSpy = jest.spyOn(component, 'getTratado');
    const paisSpy = jest.spyOn(component, 'getPais');
    const umcSpy = jest.spyOn(component, 'getUMC');
    const unidadSpy = jest.spyOn(component, 'getUnidadMedida');
    const tipoFacturaSpy = jest.spyOn(component, 'getTipoFactura');
    component.buscarMercancias();
    expect(tratadoSpy).toHaveBeenCalled();
    expect(paisSpy).toHaveBeenCalled();
    expect(umcSpy).toHaveBeenCalled();
    expect(unidadSpy).toHaveBeenCalled();
    expect(tipoFacturaSpy).toHaveBeenCalled();
  });

  it('should call getTratado, getPais, getUMC, getUnidadMedida, getTipoFactura and update mercanciaSeleccionadasTablaData in agregar if mercanciaForm is valid', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fraccionMercanArancelaria: 'A',
        cantidad: '1',
        unidadMedida: 'kg',
        valordelamercancia: '100',
        tipoFactura: 'Factura',
        numeroFactura: '123',
        complementoDelaDescripcion: 'desc',
        fecha: '2024-01-01'
      })
    });
    component.mercanciaSeleccionadasTablaData = [{} as any];
    jest.spyOn(component.mercanciaForm, 'valid', 'get').mockReturnValue(true);
    const tratadoSpy = jest.spyOn(component, 'getTratado');
    const paisSpy = jest.spyOn(component, 'getPais');
    const umcSpy = jest.spyOn(component, 'getUMC');
    const unidadSpy = jest.spyOn(component, 'getUnidadMedida');
    const tipoFacturaSpy = jest.spyOn(component, 'getTipoFactura');
    component.agregar();
    expect(tratadoSpy).toHaveBeenCalled();
    expect(paisSpy).toHaveBeenCalled();
    expect(umcSpy).toHaveBeenCalled();
    expect(unidadSpy).toHaveBeenCalled();
    expect(tipoFacturaSpy).toHaveBeenCalled();
    expect(component.mercanciaSeleccionadasTablaData[0].fraccionArancelaria).toBe('A');
  });

  it('should set esMercanciaEnEdicion to false and call getTratado, getPais, getUMC, getUnidadMedida, getTipoFactura in modificar', () => {
    const tratadoSpy = jest.spyOn(component, 'getTratado');
    const paisSpy = jest.spyOn(component, 'getPais');
    const umcSpy = jest.spyOn(component, 'getUMC');
    const unidadSpy = jest.spyOn(component, 'getUnidadMedida');
    const tipoFacturaSpy = jest.spyOn(component, 'getTipoFactura');
    component.modificar();
    expect(component.esMercanciaEnEdicion).toBe(false);
    expect(tratadoSpy).toHaveBeenCalled();
    expect(paisSpy).toHaveBeenCalled();
    expect(umcSpy).toHaveBeenCalled();
    expect(unidadSpy).toHaveBeenCalled();
    expect(tipoFacturaSpy).toHaveBeenCalled();
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

  it('should update optionsTratado in getTratado', () => {
    component.getTratado();
    expect(component.optionsTratado).toEqual([]);
  });

  it('should update optionsPais in getPais', () => {
    component.getPais();
    expect(component.optionsPais).toEqual([]);
  });

  it('should update optionsUMC in getUMC', () => {
    component.getUMC();
    expect(component.optionsUMC).toEqual([]);
  });

  it('should update optionsUnidadMedida in getUnidadMedida', () => {
    component.getUnidadMedida();
    expect(component.optionsUnidadMedida).toEqual([]);
  });

  it('should update optionsTipoFactura in getTipoFactura', () => {
    component.getTipoFactura();
    expect(component.optionsTipoFactura).toEqual([]);
  });

  it('should set cargarArchivo to false in cerrarAdjuntarArchivoMercancias', () => {
    component.cargarArchivo = true;
    component.cerrarAdjuntarArchivoMercancias();
    expect(component.cargarArchivo).toBe(false);
  });

  it('should set nombreArchivo when file is selected in alSeleccionarArchivo', () => {
    const file = new File([''], 'test.txt');
    const event = { target: { files: [file] } } as any;
    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('test.txt');
  });

  it('should set nombreArchivo to default when no file is selected in alSeleccionarArchivo', () => {
    const event = { target: { files: [] } } as any;
    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('No se eligió ningún archivo');
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const storeMethod = jest.fn();
    component.store = { setFechFinB: storeMethod } as any;
    const form = new FormBuilder().group({ fechaFinal: ['valor'] });
    component.setValoresStore(form, 'fechaFinal', 'setFechFinB');
    expect(storeMethod).toHaveBeenCalledWith('valor');
  });

  it('should call registroService.getSolicitudesTabla and update mercanciaDisponsiblesTablaDatos in getSolicitudesTabla', () => {
    component.mercanciaDisponsiblesTablaDatos = [];
    component.getSolicitudesTabla();
    expect(registroServiceMock.getSolicitudesTabla).toHaveBeenCalled();
    expect(component.mercanciaDisponsiblesTablaDatos).toEqual([]);
  });

  it('should call registroService.getSolicitudesDataTabla and update mercanciaSeleccionadasTablaData in getSolicitudesDataTabla', () => {
    component.mercanciaSeleccionadasTablaData = [];
    component.getSolicitudesDataTabla();
    expect(registroServiceMock.getSolicitudesDataTabla).toHaveBeenCalled();
    expect(component.mercanciaSeleccionadasTablaData).toEqual([]);
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should run #onSubmit()', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.registroForm.markAllAsTouched();
    component.onSubmit();
  });

  it('should run #manejarClic()', () => {
    const div = document.createElement('div');
  div.id = 'datosMercancia';
  document.body.appendChild(div);
  const showSpy = jest.fn();
  (window as any).Modal = function () {
    return { show: showSpy };
  };

  component.manejarClic({});
  expect(component.esFormulario).toBe(true);

  document.body.removeChild(div);
  });
});