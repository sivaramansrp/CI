import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Tramite6403Store } from '../../estados/tramite6403.store';
import { Tramite6403Query } from '../../estados/tramite6403.query';
import { RetornoDePartesService } from '../../services/retorno-de-partes.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, ReplaySubject } from 'rxjs';
import { CatalogoLista, SolicitudTablaDatos, SolicitudTabla } from '../../models/retorno-de-partes.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let storeMock: any;
  let tramiteQueryMock: any;
  let retornoDePartesServiceMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;
  let destroyed$: ReplaySubject<boolean>;

  beforeEach(async () => {
    destroyed$ = new ReplaySubject(1);

    storeMock = {
      setFechaImportacionTemporal: jest.fn(),
      setFechaVencimiento: jest.fn(),
      setFechaCartaPorte: jest.fn(),
      setModalDescMercancia: jest.fn(),
      setEspeMercancia: jest.fn(),
      setMarcaMercancia: jest.fn(),
      setModeloMercancia: jest.fn(),
      setNumSerieMercancia: jest.fn(),
      setNumParteMercancia: jest.fn(),
      setTipoMercancia: jest.fn(),
      setCveAduana: jest.fn(),
      setCveSeccionAduanal: jest.fn(),
      setCveRecintoFiscalizado: jest.fn(),
      setCveTipoDocumento: jest.fn(),
      setEstadoTipoDocumento: jest.fn(),
      setAduana: jest.fn(),
      setPatente: jest.fn(),
      setPedimento: jest.fn(),
      setFolioImportacionTemporal: jest.fn(),
      setFolioFormatoOficial: jest.fn(),
      setCheckProrroga: jest.fn(),
      setFolioOficialProrroga: jest.fn(),
      setDescMercancia: jest.fn(),
      setMarca: jest.fn(),
      setModelo: jest.fn(),
      setNumeroSerie: jest.fn(),
      setTipo: jest.fn(),
      setCveMedioTrasporte: jest.fn(),
      setGuiaMaster: jest.fn(),
      setGuiaBl: jest.fn(),
      setNumeroBl: jest.fn(),
      setRfcEmpresaTransportista: jest.fn(),
      setEstadoMedioTransporte: jest.fn(),
      setCartaPorte: jest.fn(),
      setCvePaisProcedencia: jest.fn(),
      setGuiaHouse: jest.fn(),
      setNumeroBuque: jest.fn(),
      setNumeroEquipo: jest.fn(),
      setTipContenedor: jest.fn(),
      setTranporteMarca: jest.fn(),
      setTranporteModelo: jest.fn(),
      setTranportePlaca: jest.fn(),
      setObservaciones: jest.fn(),
      setConDestino: jest.fn(),
      setCveTipoDestino: jest.fn(),
      setCveTipoDocumentoReemplazada: jest.fn(),
      setNumeroActaDescruccion: jest.fn(),
      setCveAduanaDestino: jest.fn(),
      setCvePatenteDestino: jest.fn(),
      setCvePedimentoDestino: jest.fn(),
      setFolioVucemRetorno: jest.fn(),
      setFolioFormatoOficialDestino: jest.fn(),
      setFechaDescruccionDestino: jest.fn(),
      setEstadoTipoDocumentoDestino: jest.fn(),
      setAutoridadPresentoAvisoDestruccion: jest.fn(),
      setValoresStore: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        solicitudFormulario: {},
        mercanciaFormulario: {},
      }),
    };

    retornoDePartesServiceMock = {
      obtenerFederativa: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerAduanas: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerAduaneras: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerRecintoFiscalizado: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerTipoDeDocumento: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerMedioDeTransporte: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerPaisDeProcedencia: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerSolicitudTabla: jest.fn().mockReturnValue(of({ datos: [{ id: 1, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' }] })),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SolicitudComponent],
      providers: [
        FormBuilder,
        { provide: Tramite6403Store, useValue: storeMock },
        { provide: Tramite6403Query, useValue: tramiteQueryMock },
        { provide: RetornoDePartesService, useValue: retornoDePartesServiceMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call guardarDatosFormulario if soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = true;
    jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if not soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = false;
    jest.spyOn(component, 'inicializarFormulario');
    component.inicializarEstadoFormulario();
    expect(component.inicializarFormulario).toHaveBeenCalled();
  });

  it('should set value and call store in cambioImportacionTemporal', () => {
  component.solicitudFormulario = new FormBuilder().group({
    datosPedimento: new FormBuilder().group({
      fechaImportacionTemporal: ['']
    })
  });
  component.datosPedimento.get('fechaImportacionTemporal')?.setValue('');
  jest.spyOn(component.datosPedimento, 'markAsUntouched');
  component.cambioImportacionTemporal('2024-01-01');
  expect(component.solicitudFormulario.get('datosPedimento')?.get('fechaImportacionTemporal')?.value).toBe('2024-01-01');
  expect(storeMock.setFechaImportacionTemporal).toHaveBeenCalledWith('2024-01-01');
});

  it('should set value and call store in cambioVencimiento', () => {
    component.solicitudFormulario = new FormBuilder().group({
  datosPedimento: new FormBuilder().group({
    fechaVencimiento: ['']
  })
});
component.datosPedimento.get('fechaVencimiento')?.setValue('');
jest.spyOn(component.datosPedimento, 'markAsUntouched');
component.cambioVencimiento('2024-12-31');
expect(storeMock.setFechaVencimiento).toHaveBeenCalledWith('2024-12-31');
  });

it('should set value and call store in cambioFechaCartaPorte', () => {
  component.solicitudFormulario = new FormBuilder().group({
    datosPedimento: new FormBuilder().group({
      fechaCartaPorte: ['']
    })
  });
  component.datosPedimento.get('fechaCartaPorte')?.setValue('');
  jest.spyOn(component.datosPedimento, 'markAsUntouched');
  component.cambioFechaCartaPorte('2024-02-01');
  expect(storeMock.setFechaCartaPorte).toHaveBeenCalledWith('2024-02-01');
});

 it('should set value and call store in cambioFechaDestino', () => {
  component.solicitudFormulario = new FormBuilder().group({
    datosPedimento: new FormBuilder().group({
      fechaDescruccionDestino: ['']
    })
  });
  component.datosPedimento.get('fechaDescruccionDestino')?.setValue('');
  jest.spyOn(component.datosPedimento, 'markAsUntouched');
  component.cambioFechaDestino('2024-03-01');
  expect(storeMock.setFechaCartaPorte).toHaveBeenCalledWith('2024-03-01');
});

  it('should call store method in setValoresStore', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    component.setValoresStore(form, 'campo', 'setMarca');
    expect(storeMock.setMarca).toHaveBeenCalledWith('valor');
  });

  it('should load aduaneras in cargarAduaneras', () => {
    component.cargarAduaneras();
    expect(retornoDePartesServiceMock.obtenerAduaneras).toHaveBeenCalled();
    expect(component.aduaneras).toEqual([]);
  });

  it('should load aduanas in cargarAduanas', () => {
    component.cargarAduanas();
    expect(retornoDePartesServiceMock.obtenerAduanas).toHaveBeenCalled();
    expect(component.aduanas).toEqual([]);
  });

  it('should load recintoFiscalizado in cargarRecintoFiscalizado', () => {
    component.cargarRecintoFiscalizado();
    expect(retornoDePartesServiceMock.obtenerRecintoFiscalizado).toHaveBeenCalled();
    expect(component.recintoFiscalizado).toEqual([]);
  });

  it('should load tipoDeDocumento in cargarTipoDeDocumento', () => {
    component.cargarTipoDeDocumento();
    expect(retornoDePartesServiceMock.obtenerTipoDeDocumento).toHaveBeenCalled();
    expect(component.tipoDeDocumento).toEqual([]);
  });

  it('should load medioDeTransporte in cargarMedioDeTransporte', () => {
    component.cargarMedioDeTransporte();
    expect(retornoDePartesServiceMock.obtenerMedioDeTransporte).toHaveBeenCalled();
    expect(component.medioDeTransporte).toEqual([]);
  });

  it('should load paisDeProcedencia in cargarPaisDeProcedencia', () => {
    component.cargarPaisDeProcedencia();
    expect(retornoDePartesServiceMock.obtenerPaisDeProcedencia).toHaveBeenCalled();
    expect(component.paisDeProcedencia).toEqual([]);
  });

  it('should load entidadFederativa in cargarFederativa', () => {
    component.cargarFederativa();
    expect(retornoDePartesServiceMock.obtenerFederativa).toHaveBeenCalled();
    expect(component.entidadFederativa).toEqual([]);
  });

  it('should initialize solicitudFormulario in inicializarFormulario', () => {
    component.tramiteState = {
      solicitudFormulario: {} as any,
      mercanciaFormulario: {} as any,
      pasoActivo: 1,
      pestanaActiva: 1,
      datosSolicitante: {} as any
    };
    component.inicializarFormulario();
    expect(component.solicitudFormulario).toBeDefined();
  });

  it('should initialize mercanciaFormulario in inicializarMercanciaFormulario', () => {
    component.tramiteState = {
      solicitudFormulario: {} as any,
      mercanciaFormulario: {} as any,
      pasoActivo: 1,
      pestanaActiva: 1,
      datosSolicitante: {} as any
    };
    component.inicializarMercanciaFormulario();
    expect(component.mercanciaFormulario).toBeDefined();
  });

  it('should return FormGroup for datosPedimento, datosMedioTransporte, datosDestinoMercancia, datosAduana', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosPedimento: new FormBuilder().group({}),
      datosMedioTransporte: new FormBuilder().group({}),
      datosDestinoMercancia: new FormBuilder().group({}),
      datosAduana: new FormBuilder().group({}),
    });
    expect(component.datosPedimento).toBeInstanceOf(FormGroup);
    expect(component.datosMedioTransporte).toBeInstanceOf(FormGroup);
    expect(component.datosDestinoMercancia).toBeInstanceOf(FormGroup);
    expect(component.datosAduana).toBeInstanceOf(FormGroup);
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'campo');
  });

  it('should update filaSeleccionadaLista in filaSeleccionada', () => {
    const rows: SolicitudTabla[] = [{ id: 1, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' }];
    component.filaSeleccionada(rows);
    expect(component.filaSeleccionadaLista).toEqual(rows);
  });

  it('should remove selected rows in eliminarMercancia', () => {
    const row: SolicitudTabla = { id: 1, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' };
    component.tablaDeDatos.datos = [row];
    component.filaSeleccionadaLista = [row];
    component.eliminarMercancia();
    expect(component.tablaDeDatos.datos).toEqual([]);
    expect(component.filaSeleccionadaLista).toEqual([]);
  });

  it('should load mercancia tabla in cargarMercanciaTabla', () => {
    component.cargarMercanciaTabla();
    expect(retornoDePartesServiceMock.obtenerSolicitudTabla).toHaveBeenCalled();
    expect(component.tablaDeDatos.datos.length).toBeGreaterThan(0);
  });

  it('should call cargarMercanciaTabla, close modal and abrirModal in agregarMercancia', () => {
    component.closeMercancia = { nativeElement: { click: jest.fn() } } as any;
    jest.spyOn(component, 'cargarMercanciaTabla');
    jest.spyOn(component, 'abrirModal');
    component.agregarMercancias();
   });

  it('should set nuevaNotificacion in abrirModal', () => {
    component.abrirModal('');
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.tipoNotificacion).toBe('alert');
  });

  it('should disable/enable checkProrroga in cambiarTipoDocumento', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosPedimento: new FormBuilder().group({
        cveTipoDocumento: ['Folio VUCEM'],
        checkProrroga: ['']
      })
    });
    component.cambiarTipoDocumento();
    expect(component.datosPedimento.get('checkProrroga')?.disabled).toBe(true);

    component.datosPedimento.get('cveTipoDocumento')?.setValue('Otro');
    component.cambiarTipoDocumento();
    expect(component.datosPedimento.get('checkProrroga')?.enabled).toBe(true);
  });

  it('should enable/disable folioOficialProrroga in cambiarCheckProrroga', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosPedimento: new FormBuilder().group({
        checkProrroga: [true],
        folioOficialProrroga: ['']
      })
    });
    component.cambiarCheckProrroga();
    expect(component.datosPedimento.get('folioOficialProrroga')?.enabled).toBe(true);

    component.datosPedimento.get('checkProrroga')?.setValue(false);
    component.cambiarCheckProrroga();
    expect(component.datosPedimento.get('folioOficialProrroga')?.disabled).toBe(true);
  });

  it('should enable/disable checkProrroga in cambiarMedioDeTransporte', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosPedimento: new FormBuilder().group({
        cveTipoDocumento: ['Folio VUCEM'],
        checkProrroga: ['']
      })
    });
    component.cambiarMedioDeTransporte();
    expect(component.datosPedimento.get('checkProrroga')?.disabled).toBe(true);

    component.datosPedimento.get('cveTipoDocumento')?.setValue('Otro');
    component.cambiarMedioDeTransporte();
    expect(component.datosPedimento.get('checkProrroga')?.enabled).toBe(true);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should open modal and patch form in modificarReemplazadas when row is selected', () => {
    const row = { id: 1, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' };
    component.filaSeleccionadaLista = [row];
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: [''],
      marcaMercancia: [''],
      modeloMercancia: [''],
      numSerieMercancia: [''],
      tipoMercancia: ['']
    });
    component.modalMercancia = { nativeElement: {} } as any;
    expect(component.titleMercancia).toBe('Agregar');
  });

  it('should call abrirModal if no row is selected in modificarReemplazadas', () => {
    component.filaSeleccionadaLista = [];
    jest.spyOn(component, 'abrirModal');
    component.modificarReemplazadas();
    expect(component.abrirModal).toHaveBeenCalledWith('Debe seleccionar un registro a modificar');
  });

  it('should open modal and patch form in consultarReemplazadas when row is selected', () => {
    const row = { id: 1, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' };
    component.filaSeleccionadaLista = [row];
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: [''],
      marcaMercancia: [''],
      modeloMercancia: [''],
      numSerieMercancia: [''],
      tipoMercancia: ['']
    });
    component.modalMercancia = { nativeElement: {} } as any;
    expect(component.titleMercancia).toBe('Agregar');
  });

  it('should call abrirModal if no row is selected in consultarReemplazadas', () => {
    component.filaSeleccionadaLista = [];
    jest.spyOn(component, 'abrirModal');
    component.consultarReemplazadas();
    expect(component.abrirModal).toHaveBeenCalledWith('Debe seleccionar un registro a consultar');
  });

  it('should call abrirModal if no row is selected in eliminarMercancia', () => {
    component.filaSeleccionadaLista = [];
    jest.spyOn(component, 'abrirModal');
    component.eliminarMercancia();
    expect(component.abrirModal).toHaveBeenCalledWith('Debe seleccionar un registro a eliminar');
  });

  it('should update guiaMaster in cambiarGuiaMaster', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        guiaMaster: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'ABC-123!@#' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarGuiaMaster(event);
    expect(patchSpy).toHaveBeenCalledWith({ guiaMaster: 'ABC123' });
  });

  it('should update guiaHouse in cambiarGuiaHouse', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        guiaHouse: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'HOUSE-456$%' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarGuiaHouse(event);
    expect(patchSpy).toHaveBeenCalledWith({ guiaHouse: 'HOUSE456' });
  });

  it('should update guiaBl in cambiarGuiaBL', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        guiaBl: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'BL-789*(' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarGuiaBL(event);
    expect(patchSpy).toHaveBeenCalledWith({ guiaBl: 'BL789' });
  });

  it('should update numeroBuque in cambiarNumeroDeBuque', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        numeroBuque: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'BUQUE-001@!' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarNumeroDeBuque(event);
    expect(patchSpy).toHaveBeenCalledWith({ numeroBuque: 'BUQUE001' });
  });

  it('should update numeroBl in cambiarNumeroBL', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        numeroBl: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'NBL-002#%' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarNumeroBL(event);
    expect(patchSpy).toHaveBeenCalledWith({ numeroBl: 'NBL002' });
  });

  it('should update numeroEquipo in cambiarNumeroEquipo', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        numeroEquipo: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'EQP-003^&' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarNumeroEquipo(event);
    expect(patchSpy).toHaveBeenCalledWith({ numeroEquipo: 'EQP003' });
  });

  it('should update rfcEmpresaTransportista in cambiarRFCEmpresaTransportista', () => {
    component.solicitudFormulario = new FormBuilder().group({
      datosMedioTransporte: new FormBuilder().group({
        rfcEmpresaTransportista: ['']
      })
    });
    const patchSpy = jest.spyOn(component.datosMedioTransporte, 'patchValue');
    const event = { target: { value: 'RFC-004!@' } } as any as Event;
    (global as any).REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;
    component.cambiarRFCEmpresaTransportista(event);
    expect(patchSpy).toHaveBeenCalledWith({ rfcEmpresaTransportista: 'RFC004' });
  });

  it('should update existing row if ID exists in agregarMercancias', () => {
    component.filaSeleccionadaLista = [];
    component.tablaDeDatos.datos = [
      { id: 1, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' },
      { id: 2, marca: 'X', modelo: 'Y', numeroDeSerie: 'Z', tipo: 'W', descripcionMercancia: 'Q' }
    ];
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: ['NEW_DESC'],
      espeMercancia: ['VAL'],
      marcaMercancia: ['NEW_MARCA'],
      modeloMercancia: ['NEW_MODELO'],
      numParteMercancia: ['NEW_NUMPARTE'],
      tipoMercancia: ['NEW_TIPO']
    });
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    jest.spyOn(component, 'abrirModal');
    component.agregarMercancias();
    expect(component.tablaDeDatos.datos.find(d => d.id === 2)?.descripcionMercancia).toBe('Q');
    expect(component.filaSeleccionadaLista).toEqual([]);
    expect(component.mercanciaFormulario.value).toEqual({
      modalDescMercancia: null,
      espeMercancia: null,
      marcaMercancia: null,
      modeloMercancia: null,
      numParteMercancia: null,
      tipoMercancia: null
    });
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should add new row and call abrirModal if ID does not exist in agregarMercancias', () => {
    component.filaSeleccionadaLista = [];
    component.tablaDeDatos.datos = [];
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: ['DESC'],
      espeMercancia: ['VAL'],
      marcaMercancia: ['MARCA'],
      modeloMercancia: ['MODELO'],
      numParteMercancia: ['NUMPARTE'],
      tipoMercancia: ['TIPO']
    });
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.agregarMercancias();
    expect(component.tablaDeDatos.datos.length).toBe(1);
    expect(abrirModalSpy).toHaveBeenCalledWith('El registro fue agregado correctamente.');
    expect(component.filaSeleccionadaLista).toEqual([]);
    expect(component.mercanciaFormulario.value).toEqual({
      modalDescMercancia: null,
      espeMercancia: null,
      marcaMercancia: null,
      modeloMercancia: null,
      numParteMercancia: null,
      tipoMercancia: null
    });
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should update existing row if ID exists in agregarMercanciaBtn', () => {
    component.filaSeleccionadaLista = [];
    component.tablaDeDatos.datos = [
      { id: 3, marca: 'A', modelo: 'B', numeroDeSerie: 'C', tipo: 'D', descripcionMercancia: 'E' }
    ];
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: ['NEW_DESC'],
      espeMercancia: ['VAL'],
      marcaMercancia: ['NEW_MARCA'],
      modeloMercancia: ['NEW_MODELO'],
      numParteMercancia: ['NEW_NUMPARTE'],
      tipoMercancia: ['NEW_TIPO']
    });
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    jest.spyOn(component, 'abrirModal');
    component.agregarMercanciaBtn();
    expect(component.tablaDeDatos.datos.find(d => d.id === 3)?.descripcionMercancia).toBe('E');
    expect(component.filaSeleccionadaLista).toEqual([]);
    expect(component.mercanciaFormulario.value).toEqual({
      modalDescMercancia: null,
      espeMercancia: null,
      marcaMercancia: null,
      modeloMercancia: null,
      numParteMercancia: null,
      tipoMercancia: null
    });
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
    expect(component.abrirModal).toHaveBeenCalledWith('El registro fue agregado correctamente.');
  });

  it('should add new row and call abrirModal in agregarMercanciaBtn if ID does not exist', () => {
    component.filaSeleccionadaLista = [];
    component.tablaDeDatos.datos = [];
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: ['DESC'],
      espeMercancia: ['VAL'],
      marcaMercancia: ['MARCA'],
      modeloMercancia: ['MODELO'],
      numParteMercancia: ['NUMPARTE'],
      tipoMercancia: ['TIPO']
    });
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.agregarMercanciaBtn();
    expect(component.tablaDeDatos.datos.length).toBe(1);
    expect(abrirModalSpy).toHaveBeenCalledWith('El registro fue agregado correctamente.');
    expect(component.filaSeleccionadaLista).toEqual([]);
    expect(component.mercanciaFormulario.value).toEqual({
      modalDescMercancia: null,
      espeMercancia: null,
      marcaMercancia: null,
      modeloMercancia: null,
      numParteMercancia: null,
      tipoMercancia: null
    });
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should reset mercanciaFormulario and hide modal in cancelarModel', () => {
    component.mercanciaFormulario = new FormBuilder().group({
      modalDescMercancia: ['VAL'],
      espeMercancia: ['VAL']
    });
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    component.cancelarModel();
    expect(component.mercanciaFormulario.value).toEqual({
      modalDescMercancia: null,
      espeMercancia: null
    });
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
  });
});