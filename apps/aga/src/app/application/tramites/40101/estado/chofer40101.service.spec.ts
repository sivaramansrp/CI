import { TestBed } from '@angular/core/testing';
import { Chofer40101Service } from './chofer40101.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Chofer40101Store } from './chofer40101.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosDelVehículo } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { DatosDelChoferNacional, DirectorGeneralData, ChoferesExtranjeros } from '../models/registro-muestras-mercancias.model';

describe('Chofer40101Service', () => {
  let service: Chofer40101Service;
  let httpMock: HttpTestingController;
  let store: Chofer40101Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Chofer40101Service, Chofer40101Store]
    });
    service = TestBed.inject(Chofer40101Service);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Chofer40101Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get chofer nacional data', () => {
    const mockData: DatosDelVehículo[] = [{ id: 1, descripcion: 'Vehículo 1' } as any];
    service.getChoferNacionalData().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(service['urlServer']);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get estados', () => {
    const mockEstados = [{ clave: '1', descripcion: 'CDMX' }];
    service.getEstados().subscribe(data => {
      expect(data).toEqual(mockEstados);
    });
    const req = httpMock.expectOne(`${service['urlServer']}/estados`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEstados);
  });

  it('should get municipios', () => {
    const mockMunicipios = [{ clave: '1', descripcion: 'Benito Juárez' }];
    service.getMunicipios('1').subscribe(data => {
      expect(data).toEqual(mockMunicipios);
    });
    const req = httpMock.expectOne(`${service['urlServer']}/municipios?estado=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMunicipios);
  });

  it('should get colonias', () => {
    const mockColonias = [{ clave: '1', descripcion: 'Del Valle' }];
    service.getColonias('1').subscribe(data => {
      expect(data).toEqual(mockColonias);
    });
    const req = httpMock.expectOne(`${service['urlServer']}/colonias?municipio=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockColonias);
  });

  it('should get tipo vehiculo arrastre', () => {
    const mockCatalogo: Catalogo[] = [{ id: 1, descripcion: 'Arrastre' }];
    service.getTipoVehiculoArrastreAGA().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('/assets/json/40101/tipo-vehiculo-arrastre.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('should update datos del chofer nacional in store', () => {
    const spy = jest.spyOn(store, 'update');
    const data: DatosDelChoferNacional[] = [{ nombre: 'Juan' } as any];
    service.updateDatosDelChoferNacional(data);
    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should update datos del chofer extranjero in store', () => {
    const spy = jest.spyOn(store, 'update');
    const data: ChoferesExtranjeros[] = [{ nombre: 'Pedro' } as any];
    service.updateDatosDelChoferExtranjero(data);
    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should get director general data', () => {
    const mockDG: DirectorGeneralData = { 
      nombre: 'Director', 
      primerApellido: 'Apellido', 
      segundoApellido: '', 
      apellidoMaternoCHN: '',
      apellidoPaterno: 'Apellido Paterno', 
    };
    service.getDirectorGeneralData().subscribe(data => {
      expect(data).toEqual(mockDG);
    });
    const req = httpMock.expectOne(`${service['url']}director-general-mockdata.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDG);
  });

  it('should get estados por pais', () => {
    const mockEstados: Catalogo[] = [{ id: 1, descripcion: 'CDMX' }];
    service.getEstadosPorPais(1).subscribe(data => {
      expect(data).toEqual(mockEstados);
    });
    const req = httpMock.expectOne('/assets/json/40101/estado.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEstados);
  });

  it('should get municipios por estado', () => {
    const mockMunicipios: Catalogo[] = [{ id: 1, descripcion: 'Benito Juárez' }];
    service.getMunicipiosPorEstado(1).subscribe(data => {
      expect(data).toEqual(mockMunicipios);
    });
    const req = httpMock.expectOne('/assets/json/40101/municipio.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockMunicipios);
  });

  it('should get colonias por municipio', () => {
    const mockColonias: Catalogo[] = [{ id: 1, descripcion: 'Del Valle' }];
    service.getColoniasPorMunicipio(1).subscribe(data => {
      expect(data).toEqual(mockColonias);
    });
    const req = httpMock.expectOne('/assets/json/40101/colonia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockColonias);
  });

  it('should get nacionalidad', () => {
    const mockNacionalidad: Catalogo[] = [{ id: 1, descripcion: 'Mexicana' }];
    service.getNacionaliDadChe().subscribe(data => {
      expect(data).toEqual(mockNacionalidad);
    });
    const req = httpMock.expectOne('/assets/json/40101/nacionalidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockNacionalidad);
  });

  it('should get chofer data', () => {
    const mockChofer: Catalogo[] = [{ id: 1, descripcion: 'Chofer 1' }];
    service.getChoferData().subscribe(data => {
      expect(data).toEqual(mockChofer);
    });
    const req = httpMock.expectOne('/assets/json/40101/chofer.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockChofer);
  });

  it('should obtener tabla datos', () => {
    const mockData = [{ id: 1, nombre: 'Test' }];
    service.obtenerTablaDatos<any>('test.json').subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(service['url'] + 'test.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

});