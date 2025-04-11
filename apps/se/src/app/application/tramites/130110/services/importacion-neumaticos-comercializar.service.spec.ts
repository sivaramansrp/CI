import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ImportacionNeumaticosComercializarService } from './importacion-neumaticos-comercializar.service';

describe('ImportacionNeumaticosComercializarService', () => {
  let service: ImportacionNeumaticosComercializarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImportacionNeumaticosComercializarService]
    });
    service = TestBed.inject(ImportacionNeumaticosComercializarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch lista de países disponibles', () => {
    const dummyCatalogo: Catalogo[] = [{ id: 1, descripcion: 'País 1' }, { id: 2, descripcion: 'País 2' }];
    service.getListaDePaisesDisponibles().subscribe(catalogo => {
      expect(catalogo.length).toBe(2);
      expect(catalogo).toEqual(dummyCatalogo);
    });

    const req = httpMock.expectOne('/assets/json/130110/pais-procenia.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCatalogo);
  });

  it('should fetch lista de países por bloque', () => {
    const dummyCatalogo: Catalogo[] = [{ id: 1, descripcion: 'País 1' }, { id: 2, descripcion: 'País 2' }];
    service.getPaisesPorBloque(1).subscribe(catalogo => {
      expect(catalogo.length).toBe(2);
      expect(catalogo).toEqual(dummyCatalogo);
    });

    const req = httpMock.expectOne('/assets/json/130110/paises-por-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCatalogo);
  });

  it('should fetch lista de entidades federativas', () => {
    const dummyCatalogo: Catalogo[] = [{ id: 1, descripcion: 'Entidad 1' }, { id: 2, descripcion: 'Entidad 2' }];
    service.getEntidadFederativa().subscribe(catalogo => {
      expect(catalogo.length).toBe(2);
      expect(catalogo).toEqual(dummyCatalogo);
    });

    const req = httpMock.expectOne('/assets/json/130110/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCatalogo);
  });

  it('should fetch lista de representaciones federales', () => {
    const dummyCatalogo: Catalogo[] = [{ id: 1, descripcion: 'Representación 1' }, { id: 2, descripcion: 'Representación 2' }];
    service.getRepresentacionFederal().subscribe(catalogo => {
      expect(catalogo.length).toBe(2);
      expect(catalogo).toEqual(dummyCatalogo);
    });

    const req = httpMock.expectOne('/assets/json/130110/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCatalogo);
  });
});