import { TestBed } from '@angular/core/testing';
import { Solocitud80103Service } from './service80103service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite80104Store } from '../../../estados/tramites/tramite80104.store';
import { Tramite80101Store } from '../estados/tramite80101.store';
import { ComplementosSeccionStore } from '../../../estados/tramites/complementos-seccion.store';
import { FederatoriosStore } from '../../../estados/tramites/federatarios.store';
import { ComplementarStore } from '../../../estados/tramites/complementar.store';
import { ENVIRONMENT } from '../../../../environments/environment';

describe('Solocitud80103Service', () => {
  let service: Solocitud80103Service;
  let httpMock: HttpTestingController;

  const mockTramite80104Store = {
    setRfc: jest.fn(),
    setEstado: jest.fn(),
    setDisponibles: jest.fn(),
    setSeleccionadas: jest.fn(),
    setFraccionArancelaria: jest.fn(),
    setDescripcion: jest.fn(),
    setFraccionTres: jest.fn(),
    setDescripcionTres: jest.fn(),
    setAnexoDos: jest.fn(),
    setAnexoTres: jest.fn(),
  };

  const mockTramite80101Store = {
    setInfoRegistro: jest.fn(),
    setAduanaDeIngreso: jest.fn(),
    setDatosImmex: jest.fn(),
    setDatos: jest.fn(),
    setAduanaDeIngresoSeleccion: jest.fn(),
    setFormValida: jest.fn(),
    setRfcEmpresa: jest.fn(),
    setNumeroPrograma: jest.fn(),
    setTiempoPrograma: jest.fn(),
    setAnnexoDosTableLista: jest.fn(),
    setAnnexoTresTableLista: jest.fn(),
    setindicePrevioRuta: jest.fn(),
    setAnnexoUnoSeccionActiva: jest.fn(),
    setDatosParaNavegar: jest.fn(),
    setImportarDatosTabla: jest.fn(),
    setExportarDatosTabla: jest.fn(),
    setCamposEmpresa: jest.fn(),
    setEmpresas: jest.fn(),
    setServicios: jest.fn(),
    setPaisesOrigen: jest.fn(),
    eliminarDatosEmpresaExtranjera: jest.fn(),
    setDatosComplimentos: jest.fn(),
    setDatosSubcontratista: jest.fn(),
    setPlantasSubfabricantesAgregar: jest.fn(),
    setPlantasBuscadas: jest.fn(),
    eliminarPlantas: jest.fn(),
    setPlantasPorCompletar: jest.fn(),
    eliminarTablaDatosComplimentos: jest.fn(),
    eliminarTablaDatosComplimentosExtranjera: jest.fn(),
  };

  const mockComplementosSeccionStore = {
    setDynamicFieldValue: jest.fn(),
  };

  const mockFederatoriosStore = {
    setDynamicFieldValue: jest.fn(),
  };

  const mockComplementarStore = {
    setPermanecera: jest.fn(),
    setTipo: jest.fn(),
    setFechaDeFirma: jest.fn(),
    setFetchaDeFinDeVigencia: jest.fn(),
    setTipos: jest.fn(),
    setCantidad: jest.fn(),
    setDescripsion: jest.fn(),
    setMnx: jest.fn(),
    setTotalDeEmpleados: jest.fn(),
    setDirectos: jest.fn(),
    setIndirectos: jest.fn(),
    setDirecto: jest.fn(),
    setCedula: jest.fn(),
    setFechaCedula: jest.fn(),
    setIndirectosDatos: jest.fn(),
    setContrato: jest.fn(),
    setObjeto: jest.fn(),
    setFechaFirma: jest.fn(),
    setFechaFinVigencia: jest.fn(),
    setRfcEmpresa: jest.fn(),
    setRazonSocial: jest.fn(),
    setFraccionArancelariaProductoTerminado: jest.fn(),
    setUmt: jest.fn(),
    setDescripcionComercialProductoTerminado: jest.fn(),
    setTurnos: jest.fn(),
    setHorasPorTurno: jest.fn(),
    setCantidadEmpleados: jest.fn(),
    setCantidadMaquinaria: jest.fn(),
    setDescripcionMaquinaria: jest.fn(),
    setCapacidadInstaladaMensual: jest.fn(),
    setCapacidadInstaladaAnual: jest.fn(),
    setCalculoCapacidadInstalada: jest.fn(),
    setCapacidadUtilizadaPct: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite80104Store, useValue: mockTramite80104Store },
        { provide: Tramite80101Store, useValue: mockTramite80101Store },
        { provide: ComplementosSeccionStore, useValue: mockComplementosSeccionStore },
        { provide: FederatoriosStore, useValue: mockFederatoriosStore },
        { provide: ComplementarStore, useValue: mockComplementarStore },
      ],
    });

    service = TestBed.inject(Solocitud80103Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    httpMock.verify();
  });

  it('debe crearse correctamente el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener los datos de muestra de mercancías (Solicitud80104State)', () => {
    service.getRegistroTomaMuestrasMercanciasData().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('assets/json/80104/serviciosExtraordinarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('debe obtener los datos de formulario de mercancías (Tramite80101State)', () => {
    service.getRegistroTomaMuestrasMercanciasDatas().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('assets/json/80104/serviciosExtraordinarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('debe obtener los datos de complementos (ComplementosSeccionState)', () => {
    service.getRegistroComplementosData().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('assets/json/80104/serviciosExtraordinarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('debe obtener los datos de federatorios (FederatoriosState)', () => {
    service.getRegistroFederatoriosData().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('assets/json/80104/serviciosExtraordinarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('debe obtener los datos de complementar (ComplementarState)', () => {
    service.getRegistroComplementarData().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('assets/json/80104/serviciosExtraordinarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
