import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SanidadAcuicolaImportacionService } from './sanidad-acuicola-importacion.service';
import { Catalogo } from "@libs/shared/data-access-user/src";
import { DatosDelTerceroDestinatario, Instalacion, Mercancia } from "../../220103/modelos/sanidad-acuicola-importacion.model";

describe('SanidadAcuicolaImportacionService', () => {
  let service: SanidadAcuicolaImportacionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SanidadAcuicolaImportacionService]
    });
    service = TestBed.inject(SanidadAcuicolaImportacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener el catálogo de mercancías', () => {
    const mockData: Mercancia[] = [{ /* datos de prueba */ } as Mercancia];
    service.getMercancias().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de aduanas de ingreso', () => {
    const mockData: Catalogo[] = [{ /* datos de prueba */ } as Catalogo];
    service.getAdunaDeIngreso().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/aduna-de-ingreso.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de medios de transporte', () => {
    const mockData: Catalogo[] = [{ } as Catalogo];
    service.getMedioDeTransporte().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/medio-de-transporte.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de países', () => {
    const mockData: Catalogo[] = [{ } as Catalogo];
    service.getPais().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de orígenes', () => {
    const mockData: Catalogo[] = [{ } as Catalogo];
    service.getOrigen().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/origen.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de UMC', () => {
    const mockData: Catalogo[] = [{ } as Catalogo];
    service.getUmc().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/umc.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de usos', () => {
    const mockData: Catalogo[] = [{ } as Catalogo];
    service.getUso().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/uso.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener el catálogo de colonias', () => {
    const mockData: Catalogo[] = [{ } as Catalogo];
    service.getColonia().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/colonia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener la lista de destinatarios', () => {
    const mockData: DatosDelTerceroDestinatario[] = [{ } as DatosDelTerceroDestinatario];
    service.getDestinatario().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/destinatario.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debe obtener la lista de instalaciones', () => {
    const mockData: Instalacion[] = [{ } as Instalacion];
    service.getInstalacion().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/json/220103/instalacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});