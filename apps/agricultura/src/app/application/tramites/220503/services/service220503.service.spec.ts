import { Solocitud220503Service } from './service220503.service';
import { Solicitud220503Store, Solicitud220503State } from '../estados/tramites220503.store';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Solocitud220503Service', () => {
  let service: Solocitud220503Service;
  let httpMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<Solicitud220503Store>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as any;

    storeMock = {
      setCertificadosAutorizados: jest.fn(),
      setMercancia: jest.fn(),
      setHoraDeInspeccion: jest.fn(),
      setAduanaDeIngreso: jest.fn(),
      setSanidadAgropecuaria: jest.fn(),
      setPuntoDeInspeccion: jest.fn(),
      setFechaDeInspeccion: jest.fn(),
      setNombre: jest.fn(),
      setPrimerapellido: jest.fn(),
      setSegundoapellido: jest.fn(),
      setTipocontenedor: jest.fn(),
      setTransporteIdMedio: jest.fn(),
      setIdentificacionTransporte: jest.fn(),
      setEsSolicitudFerros: jest.fn(),
      setTotalDeGuiasAmparadas: jest.fn(),
      setFoliodel: jest.fn(),
      setAduanaIngreso: jest.fn(),
      setOficinaInspeccion: jest.fn(),
      setPuntoInspeccion: jest.fn(),
      setClaveUCON: jest.fn(),
      setEstablecimientoTIF: jest.fn(),
      setNumeroguia: jest.fn(),
      setRegimen: jest.fn(),
      setMovilizacion: jest.fn(),
      setTransporte: jest.fn(),
      setNombreEmpresa: jest.fn(),
      setPunto: jest.fn(),
      setExentoPagoNo: jest.fn(),
      setJustificacion: jest.fn(),
      setClaveReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setIlavePago: jest.fn(),
      setImportePago: jest.fn(),
    } as any;

    service = new Solocitud220503Service(httpMock, storeMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters with correct values in actualizarEstadoFormulario', () => {
    const datos: Solicitud220503State = {
      certificadosAutorizados: 1,
      mercancia: 'mercancia',
      horaDeInspeccion: 1000,
      aduanaDeIngreso: 123, // Use a number instead of a string
      sanidadAgropecuaria: 1,
      puntoInspeccion: 1,
      puntoDeInspeccion: 1, // Added missing property
      fechaDeInspeccion: '2024-01-01',
      nombre: 'Juan',
      primerapellido: 'Perez',
      segundoapellido: 'Lopez',
      tipocontenedor: 1,
      transporteIdMedio: 1,
      identificacionTransporte: 'idTransporte',
      esSolicitudFerros: 1,
      totalDeGuiasAmparadas: '5',
      foliodel: 'folio',
      aduanaIngreso: 456,
      oficinaInspeccion: 789,
      claveUCON: 'clave',
      establecimientoTIF: 'tif',
      numeroguia: 'num',
      regimen: 1,
      movilizacion: 123,
      transporte: 'transporte',
      nombreEmpresa: 123, // Use a number instead of a string
      punto: 2,
      exentoPagoNo: 0,
      justificacion: 'justificacion',
      claveReferencia: 'ref',
      cadenaDependencia: 'cadena',
      banco: 1,
      llavePago: 'llave',
      importePago: '1000',
      fetchapago: '', // Added missing property, set to empty string or appropriate value
    };

    service.actualizarEstadoFormulario(datos);

    expect(storeMock.setCertificadosAutorizados).toHaveBeenCalledWith(datos.certificadosAutorizados);
    expect(storeMock.setMercancia).toHaveBeenCalledWith(datos.mercancia);
    expect(storeMock.setHoraDeInspeccion).toHaveBeenCalledWith(datos.horaDeInspeccion);
    expect(storeMock.setAduanaDeIngreso).toHaveBeenCalledWith(datos.aduanaDeIngreso);
    expect(storeMock.setSanidadAgropecuaria).toHaveBeenCalledWith(datos.sanidadAgropecuaria);
    expect(storeMock.setPuntoDeInspeccion).toHaveBeenCalledWith(datos.puntoInspeccion);
    expect(storeMock.setFechaDeInspeccion).toHaveBeenCalledWith(datos.fechaDeInspeccion);
    expect(storeMock.setNombre).toHaveBeenCalledWith(datos.nombre);
    expect(storeMock.setPrimerapellido).toHaveBeenCalledWith(datos.primerapellido);
    expect(storeMock.setSegundoapellido).toHaveBeenCalledWith(datos.segundoapellido);
    expect(storeMock.setTipocontenedor).toHaveBeenCalledWith(datos.tipocontenedor);
    expect(storeMock.setTransporteIdMedio).toHaveBeenCalledWith(datos.transporteIdMedio);
    expect(storeMock.setIdentificacionTransporte).toHaveBeenCalledWith(datos.identificacionTransporte);
    expect(storeMock.setEsSolicitudFerros).toHaveBeenCalledWith(datos.esSolicitudFerros);
    expect(storeMock.setTotalDeGuiasAmparadas).toHaveBeenCalledWith(datos.totalDeGuiasAmparadas);
    expect(storeMock.setFoliodel).toHaveBeenCalledWith(datos.foliodel);
    expect(storeMock.setAduanaIngreso).toHaveBeenCalledWith(datos.aduanaIngreso);
    expect(storeMock.setOficinaInspeccion).toHaveBeenCalledWith(datos.oficinaInspeccion);
    expect(storeMock.setPuntoInspeccion).toHaveBeenCalledWith(datos.puntoInspeccion);
    expect(storeMock.setClaveUCON).toHaveBeenCalledWith(datos.claveUCON);
    expect(storeMock.setEstablecimientoTIF).toHaveBeenCalledWith(datos.establecimientoTIF);
    expect(storeMock.setNumeroguia).toHaveBeenCalledWith(datos.numeroguia);
    expect(storeMock.setRegimen).toHaveBeenCalledWith(datos.regimen);
    expect(storeMock.setMovilizacion).toHaveBeenCalledWith(datos.movilizacion);
    expect(storeMock.setTransporte).toHaveBeenCalledWith(datos.transporte);
    expect(storeMock.setNombreEmpresa).toHaveBeenCalledWith(datos.nombreEmpresa);
    expect(storeMock.setPunto).toHaveBeenCalledWith(datos.punto);
    expect(storeMock.setExentoPagoNo).toHaveBeenCalledWith(datos.exentoPagoNo);
    expect(storeMock.setJustificacion).toHaveBeenCalledWith(datos.justificacion);
    expect(storeMock.setClaveReferencia).toHaveBeenCalledWith(datos.claveReferencia);
    expect(storeMock.setCadenaDependencia).toHaveBeenCalledWith(datos.cadenaDependencia);
    expect(storeMock.setBanco).toHaveBeenCalledWith(datos.banco);
    expect(storeMock.setIlavePago).toHaveBeenCalledWith(datos.llavePago);
    expect(storeMock.setImportePago).toHaveBeenCalledWith(datos.importePago);
  });

  it('should call http.get with correct URL in getRegistroTomaMuestrasMercanciasData', () => {
    const mockResponse = { some: 'data' } as any;
    httpMock.get.mockReturnValue(of(mockResponse));

    const obs$ = service.getRegistroTomaMuestrasMercanciasData();

    expect(httpMock.get).toHaveBeenCalledWith(
      'assets/json/220503/registro_toma_muestras_mercancias.json'
    );

    obs$.subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  });

  it('should have urlServer and urlServerCatalogos from ENVIRONMENT', () => {
    expect(service.urlServer).toBeDefined();
    expect(service.urlServerCatalogos).toBeDefined();
  });
});