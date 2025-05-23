import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermisoSanitarioProductosService } from './permiso-sanitario-productos.service';
import { DatosDeLaSolicitudComponent } from '../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { of } from 'rxjs';

describe('PermisoSanitarioProductosService', () => {
  let service: PermisoSanitarioProductosService;
  let httpMock: HttpTestingController;
  let mockDatosSolicitudComponent: Partial<DatosDeLaSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PermisoSanitarioProductosService]
    });

    service = TestBed.inject(PermisoSanitarioProductosService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock component with form values
    mockDatosSolicitudComponent = {
      
    };
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setDatosSolicitudComponents', () => {
    it('should set the datosSolicitudComponents array', () => {
      const components = [mockDatosSolicitudComponent as DatosDeLaSolicitudComponent];
      service.setDatosSolicitudComponents(components);
      expect(service['datosSolicitudComponents']).toEqual(components);
    });
  });

  describe('collectFormValues', () => {
    it('should return empty object when no components are set', () => {
      const result = service.collectFormValues();
      expect(result).toEqual({ datosSolicitud: [] });
    });

    it('should collect form values from all components', () => {
      const components = [
        mockDatosSolicitudComponent,
        { ...mockDatosSolicitudComponent, solicitudForm: { value: { campo1: 'valor3' } } }
      ] as DatosDeLaSolicitudComponent[];
      
      service.setDatosSolicitudComponents(components);
      const result = service.collectFormValues();

      expect(result.datosSolicitud?.length).toBe(2);
      expect(result.datosSolicitud?.[0].solicitudForm).toEqual(mockDatosSolicitudComponent.solicitudForm?.value);
      expect(result.datosSolicitud?.[1].solicitudForm).toEqual({ campo1: 'valor3' });
    });
  });

  describe('HTTP Requests', () => {
    const testUrl = 'assets/json/260104/';
    const mockCatalogosSelect = { options: [{ value: '1', label: 'Option 1' }] };
    const mockRespuestaTabla = { data: [{ id: 1, name: 'Item 1' }] };
    const mockRespuestaCatalogos = { catalogos: [{ id: 1, nombre: 'Estado 1' }] };
    const mockMercanciasTabla = { mercancias: [{ id: 1, nombre: 'Mercancia 1' }] };

    it('should fetch estado catalogo', () => {
      service.obtenerEstadoCatalogo().subscribe(data => {
        expect(data).toEqual(mockCatalogosSelect);
      });

      const req = httpMock.expectOne('../../../assets/json/260104/estado-catalogo.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockCatalogosSelect);
    });

    it('should fetch tabla datos', () => {
      service.obtenerTablaDatos().subscribe(data => {
        expect(data).toEqual(mockRespuestaTabla);
      });

      const req = httpMock.expectOne(testUrl + 'tablaDatos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockRespuestaTabla);
    });

    it('should fetch estado list', () => {
      service.obtenerEstadoList().subscribe(data => {
        expect(data).toEqual(mockRespuestaCatalogos);
      });

      const req = httpMock.expectOne(testUrl + 'seleccion.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockRespuestaCatalogos);
    });

    it('should fetch mercancias datos', () => {
      service.obtenerMercanciasDatos().subscribe(data => {
        expect(data).toEqual(mockMercanciasTabla);
      });

      const req = httpMock.expectOne(testUrl + 'mercanciasDatos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockMercanciasTabla);
    });
  });

  describe('Payload Management', () => {
    it('should initialize with empty payload', () => {
      expect(service.payload).toEqual({});
    });

    it('should update payload when collectFormValues is called', () => {
      const components = [mockDatosSolicitudComponent as DatosDeLaSolicitudComponent];
      service.setDatosSolicitudComponents(components);
      
      const result = service.collectFormValues();
      service.payload = result;
      
      expect(service.payload.datosSolicitud?.length).toBe(1);
      expect(service.payload.datosSolicitud?.[0].solicitudForm).toEqual(mockDatosSolicitudComponent.solicitudForm?.value);
    });
  });
});