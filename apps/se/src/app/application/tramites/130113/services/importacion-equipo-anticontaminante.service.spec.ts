import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportacionEquipoAnticontaminanteService } from './importacion-equipo-anticontaminante.service';
import { Tramite130113Store } from '../estados/tramites/tramites130113.store';
import { Catalogo } from '@ng-mf/data-access-user';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { Tramite130113State } from '../estados/tramites/tramites130113.store';

const catalogoMock: Catalogo = { id: 1, descripcion: 'Test' };
const productoResponseMock: ProductoResponse = { options: [], defaultSelect: '' };
const partidaMock: PartidasDeLaMercanciaModelo = { 
  id: '1',
  cantidad: '1',
  unidadDeMedida: 'kg',
  fraccionFrancelaria: '1234',
  descripcion: 'desc',
  precioUnitarioUSD: '100',
  totalUSD: '100',
  fraccionTigiePartidasDeLaMercancia: '',
  fraccionDescripcionPartidasDeLaMercancia: ''
};
const tramiteMock: Tramite130113State = {
  producto: '',
  descripcion: '',
  fraccion: '',
  cantidad: '0',
  valorPartidaUSD: 0,
  unidadMedida: '',
  solicitud: '',
  defaultSelect: '',
  defaultProducto: '',
  regimen: '',
  clasificacion: '',
  filaSeleccionada: [],
  cantidadPartidasDeLaMercancia: '',
  fraccionTigiePartidasDeLaMercancia: '',
  fraccionDescripcionPartidasDeLaMercancia: '',
  valorPartidaUSDPartidasDeLaMercancia: 0,
  descripcionPartidasDeLaMercancia: '',
  valorFacturaUSD: '',
  bloque: '',
  usoEspecifico: '',
  justificacionImportacionExportacion: '',
  observaciones: '',
  entidad: '',
  representacion: '',
  mostrarTabla: false
};

describe('ImportacionEquipoAnticontaminanteService', () => {
  let service: ImportacionEquipoAnticontaminanteService;
  let httpMock: HttpTestingController;
  let tramite130113Store: Tramite130113Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImportacionEquipoAnticontaminanteService,
        Tramite130113Store,
      ],
    });
    service = TestBed.inject(ImportacionEquipoAnticontaminanteService);
    httpMock = TestBed.inject(HttpTestingController);
    tramite130113Store = TestBed.inject(Tramite130113Store);
    jest.spyOn(tramite130113Store, 'actualizarEstado');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get lista de paises disponibles', () => {
    service.getListaDePaisesDisponibles().subscribe(data => {
      expect(data).toEqual([catalogoMock]);
    });
    const req = httpMock.expectOne('/assets/json/130113/pais-procenia.json');
    expect(req.request.method).toBe('GET');
    req.flush([catalogoMock]);
  });

  it('should get paises por bloque', () => {
    service.getPaisesPorBloque(1).subscribe(data => {
      expect(data).toEqual([catalogoMock]);
    });
    const req = httpMock.expectOne('/assets/json/130113/paises-por-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush([catalogoMock]);
  });

  it('should get entidad federativa', () => {
    service.getEntidadFederativa().subscribe(data => {
      expect(data).toEqual([catalogoMock]);
    });
    const req = httpMock.expectOne('/assets/json/130113/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush([catalogoMock]);
  });

  it('should get representacion federal', () => {
    service.getRepresentacionFederal().subscribe(data => {
      expect(data).toEqual([catalogoMock]);
    });
    const req = httpMock.expectOne('/assets/json/130113/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush([catalogoMock]);
  });

  it('should get solicitude options', () => {
    service.getSolicitudeOptions().subscribe(data => {
      expect(data).toEqual(productoResponseMock);
    });
    const req = httpMock.expectOne('assets/json/130113/solicitude-options.json');
    expect(req.request.method).toBe('GET');
    req.flush(productoResponseMock);
  });

  it('should get producto options', () => {
    service.getProductoOptions().subscribe(data => {
      expect(data).toEqual(productoResponseMock);
    });
    const req = httpMock.expectOne('assets/json/130113/producto-otions.json');
    expect(req.request.method).toBe('GET');
    req.flush(productoResponseMock);
  });

  it('should get fraccion descripcion partidas de la mercancia', () => {
    service.getFraccionDescripcionPartidasDeLaMercancia().subscribe(data => {
      expect(data).toEqual([catalogoMock]);
    });
    const req = httpMock.expectOne('/assets/json/130113/fraccion-descripcion-partidas-de-la-mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush([catalogoMock]);
  });

  it('should get tabla datos', () => {
    service.getTablaDatos().subscribe(data => {
      expect(data).toEqual([partidaMock]);
    });
    const req = httpMock.expectOne('assets/json/130113/partidas-de-la.json');
    expect(req.request.method).toBe('GET');
    req.flush([partidaMock]);
  });

  it('should actualizar estado formulario', () => {
    service.actualizarEstadoFormulario(tramiteMock);
    expect(tramite130113Store.actualizarEstado).toHaveBeenCalledWith(tramiteMock);
  });

  it('should get datos de la solicitud', () => {
    service.getDatosDeLaSolicitud().subscribe(data => {
      expect(data).toEqual(tramiteMock);
    });
    const req = httpMock.expectOne('assets/json/130113/datos-de-la-solicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(tramiteMock);
  });
});
