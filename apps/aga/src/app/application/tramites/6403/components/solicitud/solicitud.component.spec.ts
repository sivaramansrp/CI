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
    fixture.detectChanges();
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

  // it('should disable/enable forms in guardarDatosFormulario', () => {
  //   component.solicitudFormulario = new FormBuilder().group({});
  //   component.mercanciaFormulario = new FormBuilder().group({});
  //   component.soloLectura = true;
  //   jest.spyOn(component.solicitudFormulario, 'disable');
  //   jest.spyOn(component.mercanciaFormulario, 'disable');
  //   component.guardarDatosFormulario();
  //   expect(component.solicitudFormulario.disable).toHaveBeenCalled();
  //   expect(component.mercanciaFormulario.disable).toHaveBeenCalled();

  //   component.soloLectura = false;
  //   jest.spyOn(component.solicitudFormulario, 'enable');
  //   jest.spyOn(component.mercanciaFormulario, 'enable');
  //   component.guardarDatosFormulario();
  //   expect(component.solicitudFormulario.enable).toHaveBeenCalled();
  //   expect(component.mercanciaFormulario.enable).toHaveBeenCalled();
  // });

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

  // it('should open modal in abiertoMercancia', () => {
  //   component.modalMercancia = { nativeElement: document.createElement('div') } as any;
  //   const showSpy = jest.spyOn(window as any, 'Modal').mockImplementation(() => ({ show: jest.fn() }));
  //   component.abiertoMercancia();
  //   expect(showSpy).toHaveBeenCalled();
  //   showSpy.mockRestore();
  // });

  it('should load mercancia tabla in cargarMercanciaTabla', () => {
    component.cargarMercanciaTabla();
    expect(retornoDePartesServiceMock.obtenerSolicitudTabla).toHaveBeenCalled();
    expect(component.tablaDeDatos.datos.length).toBeGreaterThan(0);
  });

  it('should call cargarMercanciaTabla, close modal and abrirModal in agregarMercancia', () => {
    component.closeMercancia = { nativeElement: { click: jest.fn() } } as any;
    jest.spyOn(component, 'cargarMercanciaTabla');
    jest.spyOn(component, 'abrirModal');
    component.agregarMercancia();
    expect(component.cargarMercanciaTabla).toHaveBeenCalled();
    expect(component.closeMercancia.nativeElement.click).toHaveBeenCalled();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should set nuevaNotificacion in abrirModal', () => {
    component.abrirModal();
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
});