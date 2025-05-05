import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatalogosService } from './catalogos.service';
import { ListaTabla, ListaTablaBaja } from '../models/registro.model';
import { PlantasTabla, SectorTabla, Mercancias, ProductorIndirecto } from '../../../shared/models/complementaria.model';
import { Bitacora } from '../../../shared/models/bitacora.model';

describe('CatalogosService', () => {
  let service: CatalogosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatalogosService],
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

  it('should fetch lista-tabla data', () => {
    const mockResponse: ListaTabla[] = [
      {
        estatus: 'Activado',
        claveDeSector: 'XIXa',
        sector: 'De la Industria Automotriz y de Autopartes a)',
      },
    ];
  
    service.obtenerTablaLista().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/90303/lista-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('should fetch lista-tabla-baja data', () => {
    const mockResponse: ListaTablaBaja[] = [
      {
        estatus: 'Baja',
        claveDeSector: 'XIXa',
        sector: 'De la Industria Automotriz y de Autopartes a)',
      },
    ];
  
    service.obtenerTablaListaBaja().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/90303/lista-tabla-baja.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch plantas data', () => {
    const mockResponse: PlantasTabla[] = [
      {
        calle: 'Calle 1',
        numeroExterior: 123,
        numeroInterior: 1,
        codigoPostal: 12345,
        colonia: 'Colonia 1',
        municipioOAlcaldia: 'Municipio 1',
        estatus: 'Activo',
        estado: 'Estado 1',
        pais: 'País 1',
        registroFederal: 'RFC1',
        razonSocial: 'Razón Social 1',
        domicilioFiscal: 'Domicilio Fiscal 1',
      },
      {
        calle: 'Calle 2',
        numeroExterior: 456,
        numeroInterior: 2,
        codigoPostal: 67890,
        colonia: 'Colonia 2',
        municipioOAlcaldia: 'Municipio 2',
        estatus: 'Inactivo',
        estado: 'Estado 2',
        pais: 'País 2',
        registroFederal: 'RFC2',
        razonSocial: 'Razón Social 2',
        domicilioFiscal: 'Domicilio Fiscal 2',
      },
    ];
  
    service.obtenerTablaPlantas().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/90303/plantas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('should fetch sector data', () => {
    const mockResponse: SectorTabla[] = [
      { listaDeSectores: 'Sector 1', claveDelSector: 'Clave 1', estatus: 'Activo' },
      { listaDeSectores: 'Sector 2', claveDelSector: 'Clave 2', estatus: 'Inactivo' },
    ];

    service.obtenerTablaSector().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/90303/sector.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch mercancia data', () => {
    const mockResponse: Mercancias[] = [
      { fraccionArancelaria: '1234.56.78', claveDelSector: 'Clave 1', eStatus: 'Activo' },
      { fraccionArancelaria: '9876.54.32', claveDelSector: 'Clave 2', eStatus: 'Inactivo' },
    ];

    service.obtenerTablaMercancia().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/90303/mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch productor data', () => {
    const mockResponse: ProductorIndirecto[] = [
      { registroFederal: 'RFC1', denominacion: 'Denominación 1', correo: 'correo1@example.com', eStatus: 'Activo' },
      { registroFederal: 'RFC2', denominacion: 'Denominación 2', correo: 'correo2@example.com', eStatus: 'Inactivo' },
    ];

    service.obtenerTablaProductor().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/90303/productor.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch bitacora data', () => {
    const mockResponse: Bitacora[] = [
      {
        tipoModificacion: 'Modificación 1',
        fechaModificacion: '2023-01-01',
        valoresAnteriores: 'Valor Anterior 1',
        valoresNuevos: 'Valor Nuevo 1',
      },
      {
        tipoModificacion: 'Modificación 2',
        fechaModificacion: '2023-01-02',
        valoresAnteriores: 'Valor Anterior 2',
        valoresNuevos: 'Valor Nuevo 2',
      },
    ];

    service.obtenerTablaBitacora().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/90303/bitacora.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors', () => {
    const errorMessage = 'Error occurred';

    service.obtenerTablaLista().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne('assets/json/90303/lista-tabla.json');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});