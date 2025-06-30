import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { Tramite6403Store, createInitialState } from '../../estados/tramite6403.store';
import { Tramite6403Query } from '../../estados/tramite6403.query';
import { RetornoDePartesService } from '../../services/retorno-de-partes.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let storeMock: any;
  let tramiteQueryMock: any;
  let consultaQueryMock: any;
  let retornoDePartesServiceMock: any;

  beforeEach(async () => {
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
        pestanaActiva: 1,
      }),
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    retornoDePartesServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({
        success: true,
        datos: {
          solicitudFormulario: { ...createInitialState().solicitudFormulario, cveAduana: '1' },
          mercanciaFormulario: { ...createInitialState().mercanciaFormulario, tipoMercancia: 'tipo' }
        }
      })),
      obtenerDatosSolicitante: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, SolicitanteComponent, SolicitudComponent, HttpClientTestingModule],
      providers: [
        { provide: Tramite6403Store, useValue: storeMock },
        { provide: Tramite6403Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: RetornoDePartesService, useValue: retornoDePartesServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    component.tramiteState = createInitialState();
    component.consultaState = { update: false } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tramiteState and consultaState in ngOnInit', () => {
    component.tramiteState = undefined as any;
    component.consultaState = undefined as any;
    component.ngOnInit();
    expect(component.tramiteState).toBeDefined();
    expect(component.consultaState).toBeDefined();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.esDatosRespuesta = false;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });
   it('should set esDatosRespuesta to true if consultaState.update is true in ngOnInit', () => {
    component.consultaState = { update: true } as any;
    component.esDatosRespuesta = true;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call store setters and set esDatosRespuesta in guardarDatosFormularios', () => {
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(storeMock.setCveAduana).toHaveBeenCalledWith('1');
    expect(storeMock.setTipoMercancia).toHaveBeenCalledWith('tipo');
  });

  it('should update indice and call setPestanaActiva in seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    expect(storeMock.setPestanaActiva).toHaveBeenCalledWith(2);
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});