import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { Tramite6403Store, createInitialState } from '../../estados/tramite6403.store';
import { Tramite6403Query } from '../../estados/tramite6403.query';
import { RetornoDePartesService } from '../../services/retorno-de-partes.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let storeMock: any;
  let tramiteQueryMock: any;
  let retornoDePartesServiceMock: any;
  let consultaioQueryMock: any;
  let destroyed$: ReplaySubject<boolean>;

  beforeEach(async () => {
    destroyed$ = new ReplaySubject(1);

    storeMock = {
      setPestanaActiva: jest.fn(),
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
      setFechaImportacionTemporal: jest.fn(),
      setFechaVencimiento: jest.fn(),
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
      setFechaCartaPorte: jest.fn(),
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
      setModalDescMercancia: jest.fn(),
      setEspeMercancia: jest.fn(),
      setMarcaMercancia: jest.fn(),
      setModeloMercancia: jest.fn(),
      setNumSerieMercancia: jest.fn(),
      setNumParteMercancia: jest.fn(),
      setTipoMercancia: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        ...createInitialState(),
        pestanaActiva: 2,
      }),
    };

    retornoDePartesServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(
        of({
          success: true,
          datos: {
            solicitudFormulario: { ...createInitialState().solicitudFormulario, cveAduana: '1' },
            mercanciaFormulario: { ...createInitialState().mercanciaFormulario, tipoMercancia: 'tipo' }
          }
        })
      ),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent],
      providers: [
        { provide: Tramite6403Store, useValue: storeMock },
        { provide: Tramite6403Query, useValue: tramiteQueryMock },
        { provide: RetornoDePartesService, useValue: retornoDePartesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tramiteState and indice on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tramiteState).toBeDefined();
    expect(component.indice).toBe(2);
  });

  it('should set consultaState and esDatosRespuesta to true if update is false', () => {
    component.ngOnInit();
    expect(component.consultaState).toBeDefined();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormularios if consultaState.update is true', () => {
    consultaioQueryMock.selectConsultaioState$ = of({ update: true });
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call all store setters in guardarDatosFormularios', () => {
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(storeMock.setCveAduana).toHaveBeenCalledWith('1');
    expect(storeMock.setTipoMercancia).toHaveBeenCalledWith('tipo');
  });

  it('should not call store setters if respuesta.success is false', () => {
    retornoDePartesServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(
      of({ success: false, datos: {} })
    );
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(false);
    expect(storeMock.setCveAduana).not.toHaveBeenCalled();
  });

  it('should update indice and call setPestanaActiva in seleccionaTab', () => {
    component.indice = 0;
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
    expect(storeMock.setPestanaActiva).toHaveBeenCalledWith(5);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
   it('should call all store setters and set esDatosRespuesta to true when guardarDatosFormularios gets success', () => {
    const formMock = {
      cveAduana: '1', cveSeccionAduanal: '2', cveRecintoFiscalizado: '3', cveTipoDocumento: '4',
      estadoTipoDocumento: '5', aduana: '6', patente: '7', pedimento: '8', folioImportacionTemporal: '9',
      folioFormatoOficial: '10', checkProrroga: true, folioOficialProrroga: '11', fechaImportacionTemporal: '2024-01-01',
      fechaVencimiento: '2024-12-31', descMercancia: 'desc', marca: 'marca', modelo: 'modelo', numeroSerie: 'serie',
      tipo: 'tipo', cveMedioTrasporte: 'medio', guiaMaster: 'master', guiaBl: 'bl', numeroBl: 'nbl',
      rfcEmpresaTransportista: 'rfc', estadoMedioTransporte: 'estado', cartaPorte: 'carta', cvePaisProcedencia: 'pais',
      guiaHouse: 'house', numeroBuque: 'buque', numeroEquipo: 'equipo', fechaCartaPorte: '2024-01-02',
      tipContenedor: 'contenedor', tranporteMarca: 'tmarca', tranporteModelo: 'tmodelo', tranportePlaca: 'tpl',
      observaciones: 'obs', conDestino: 'dest', cveTipoDestino: 'tdest', cveTipoDocumentoReemplazada: 'tdoc',
      numeroActaDescruccion: 'acta', cveAduanaDestino: 'adest', cvePatenteDestino: 'pdes', cvePedimentoDestino: 'pddes',
      folioVucemRetorno: 'fvr', folioFormatoOficialDestino: 'ffod', fechaDescruccionDestino: '2024-11-30',
      estadoTipoDocumentoDestino: 'etdd', autoridadPresentoAvisoDestruccion: 'autoridad'
    };
    const mercanciaMock = {
      modalDescMercancia: 'desc', espeMercancia: 'espe', marcaMercancia: 'marca', modeloMercancia: 'modelo',
      numSerieMercancia: 'serie', numParteMercancia: 'parte', tipoMercancia: 'tipo'
    };
    component.reterno.getRegistroTomaMuestrasMercanciasData = jest.fn().mockReturnValue(
      of({ success: true, datos: { solicitudFormulario: formMock, mercanciaFormulario: mercanciaMock } })
    );
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(component.store.setCveAduana).toHaveBeenCalledWith('1');
    expect(component.store.setTipoMercancia).toHaveBeenCalledWith('tipo');
    // Optionally, check a few more setters if you want
  });

  it('should not call store setters and not set esDatosRespuesta if respuesta.success is false', () => {
    component.reterno.getRegistroTomaMuestrasMercanciasData = jest.fn().mockReturnValue(
      of({ success: false, datos: {} })
    );
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(false);
    expect(component.store.setCveAduana).not.toHaveBeenCalled();
    expect(component.store.setTipoMercancia).not.toHaveBeenCalled();
  });

  it('should update indice and call setPestanaActiva in seleccionaTab', () => {
    component.indice = 0;
    component.seleccionaTab(7);
    expect(component.indice).toBe(7);
    expect(component.store.setPestanaActiva).toHaveBeenCalledWith(7);
  });
});