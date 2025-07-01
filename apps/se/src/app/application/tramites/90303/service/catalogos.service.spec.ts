import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatalogosService } from './catalogos.service';
import { Tramite90303Store } from '../state/Tramite90303.store';
import { Solicitud90303State } from '../state/Tramite90303.store';
import { ListaTabla, ListaTablaBaja } from '../models/registro.model';
import { PlantasTabla, SectorTabla, Mercancias, ProductorIndirecto } from '../../../shared/models/complementaria.model';
import { Bitacora } from '../../../shared/models/bitacora.model';

describe('CatalogosService', () => {
  let service: CatalogosService;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: any;

  beforeEach(() => {
    tramiteStoreMock = {
      setRegistroFederalContribuyentes: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setTipoModificacion: jest.fn(),
      setModificacionPrograma: jest.fn(),
      limpiarSolicitud: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CatalogosService,
        { provide: Tramite90303Store, useValue: tramiteStoreMock }
      ]
    });

    service = TestBed.inject(CatalogosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters in actualizarEstadoFormulario', () => {
    const datos: Solicitud90303State = {
      estatus: 'Activo',
      registroFederalContribuyentes: 'RFC',
      representacionFederal: 'REP',
      tipoModificacion: 'TIPO',
      modificacionPrograma: 'MOD'
    };
    service.actualizarEstadoFormulario(datos);
    expect(tramiteStoreMock.setRegistroFederalContribuyentes).toHaveBeenCalledWith('RFC');
    expect(tramiteStoreMock.setRepresentacionFederal).toHaveBeenCalledWith('REP');
    expect(tramiteStoreMock.setTipoModificacion).toHaveBeenCalledWith('TIPO');
    expect(tramiteStoreMock.setModificacionPrograma).toHaveBeenCalledWith('MOD');
  });

  it('should get registro toma muestras mercancias data', () => {
    const mockResponse: Solicitud90303State = {
      estatus: 'Activo',
      registroFederalContribuyentes: 'RFC',
      representacionFederal: 'REP',
      tipoModificacion: 'TIPO',
      modificacionPrograma: 'MOD'
    };
    service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/registro_toma_muestras_mercancias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get lista-tabla data', () => {
    const mockResponse: ListaTabla[] = [{ estatus: 'Activo', claveDeSector: 'A', sector: 'Sector A' }];
    service.obtenerTablaLista().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/lista-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaLista', () => {
    service.obtenerTablaLista().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/lista-tabla.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should get lista-tabla-baja data', () => {
    const mockResponse: ListaTablaBaja[] = [{ estatus: 'Baja', claveDeSector: 'B', sector: 'Sector B' }];
    service.obtenerTablaListaBaja().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/lista-tabla-baja.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaListaBaja', () => {
    service.obtenerTablaListaBaja().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/lista-tabla-baja.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should get plantas data', () => {
    const mockResponse: PlantasTabla[] = [{ calle: 'Calle', numeroExterior: 1, numeroInterior: 2, codigoPostal: 12345, colonia: 'Col', municipioOAlcaldia: 'Mun', estatus: 'Activo', estado: 'Edo', pais: 'Pais', registroFederal: 'RFC', razonSocial: 'RS', domicilioFiscal: 'DF' }];
    service.obtenerTablaPlantas().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/plantas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaPlantas', () => {
    service.obtenerTablaPlantas().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/plantas.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should get sector data', () => {
    const mockResponse: SectorTabla[] = [{ listaDeSectores: 'Sector', claveDelSector: 'Clave', estatus: 'Activo' }];
    service.obtenerTablaSector().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/sector.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaSector', () => {
    service.obtenerTablaSector().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/sector.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should get mercancia data', () => {
    const mockResponse: Mercancias[] = [{ fraccionArancelaria: '123', claveDelSector: 'A', eStatus: 'Activo' }];
    service.obtenerTablaMercancia().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaMercancia', () => {
    service.obtenerTablaMercancia().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/mercancia.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should get productor data', () => {
    const mockResponse: ProductorIndirecto[] = [{ registroFederal: 'RFC', denominacion: 'Den', correo: 'correo', eStatus: 'Activo' }];
    service.obtenerTablaProductor().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/productor.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaProductor', () => {
    service.obtenerTablaProductor().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/productor.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should get bitacora data', () => {
    const mockResponse: Bitacora[] = [{ tipoModificacion: 'Mod', fechaModificacion: '2023-01-01', valoresAnteriores: 'VA', valoresNuevos: 'VN' }];
    service.obtenerTablaBitacora().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/90303/bitacora.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in obtenerTablaBitacora', () => {
    service.obtenerTablaBitacora().subscribe({
      next: () => fail('Should error'),
      error: (err) => expect(err).toBeTruthy()
    });
    const req = httpMock.expectOne('assets/json/90303/bitacora.json');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });
});