import { TestBed } from '@angular/core/testing';
import { ImportacionDefinitivaService } from './importacion-definitiva.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../estados/tramites/tramite130103.store';

describe('ImportacionDefinitivaService', () => {
  let service: ImportacionDefinitivaService;
  let httpMock: HttpTestingController;
  let mockStore: jest.Mocked<Tramite130103Store>;
  
  beforeEach(() => {
    mockStore = {
      setDynamicFieldValue: jest.fn()
    } as unknown as jest.Mocked<Tramite130103Store>;
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImportacionDefinitivaService,
        { provide: Tramite130103Store, useValue: mockStore }
      ]
    });
    service = TestBed.inject(ImportacionDefinitivaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener datos de importación definitiva desde un archivo JSON', () => {
    const mockResponse: ImportacionDefinitiva130103State = {
      datosEmpresa: { nombre: 'Empresa X' },
      especifico: [],
    };

    service.getImportacionDefinitivaData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130103/importacion-definitiva.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería llamar a store.setDynamicFieldValue cuando se llama a actualizarEstadoFormulario', () => {
    service.actualizarEstadoFormulario('pais', 'México');
    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith('pais', 'México');
  });
});
