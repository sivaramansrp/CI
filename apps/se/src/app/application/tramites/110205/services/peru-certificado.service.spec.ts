import { TestBed } from '@angular/core/testing';
import { PeruCertificadoService } from './peru-certificado.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite110205Store } from '../estados/tramite110205.store';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { ProductorExportador, MercanciasHistorico } from '../models/peru-certificado.module';
import { Tramite110205State } from '../estados/tramite110205.store';

describe('PeruCertificadoService', () => {
  let service: PeruCertificadoService;
  let httpMock: HttpTestingController;
  let store: Tramite110205Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PeruCertificadoService,
        Tramite110205Store
      ]
    });
    service = TestBed.inject(PeruCertificadoService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Tramite110205Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerMenuDesplegable should fetch and map catalogos', (done) => {
    const mockResponse: RespuestaCatalogos = { data: [{ id: 1, descripcion: 'Test' }] as Catalogo[], code: 200, message: 'OK' };
    service.obtenerMenuDesplegable('menu.json').subscribe(data => {
      expect(data).toEqual(mockResponse.data);
      done();
    });
    const req = httpMock.expectOne('../../../../../assets/json/110205/menu.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('obtenerTablaDatos should fetch mercancias', (done) => {
    const mockData: Mercancia[] = [{
      fraccionArancelaria: '010101',
      numeroDeRegistrodeProductos: 'REG123',
      fechaExpedicion: '2023-01-01',
      fechaVencimiento: '2024-01-01',
      nombreTecnico: 'Nombre Técnico 1',
      nombreComercial: 'Nombre Comercial 1',
      normaOrigen: 'NORMA1',
      id: '1',
      cantidad: '100',
      umc: 'kg',
      tipoFactura: 'Tipo1',
      valorMercancia: '1000',
      fechaFinalInput: '2024-01-01',
      numeroFactura: 'FAC123',
      unidadMedidaMasaBruta: 'kg',
      complementoClasificacion: 'Clasificación 1',
      complementoDescripcion: 'Descripción 1'
    }];
    service.obtenerTablaDatos('data.json').subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('../../../../../assets/json/110205/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('obtenerProductorPorExportador should fetch productor/exportador', (done) => {
    const mockData: ProductorExportador = { datos: [] };
    service.obtenerProductorPorExportador().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('assets/json/110205/productor-exportador.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('obtenerMercancia should fetch mercancias historico', (done) => {
    const mockData: MercanciasHistorico = { datos: [] };
    service.obtenerMercancia().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('assets/json/110205/mercancias-seleccionadas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('actualizarEstadoFormulario should update store state', () => {
    const spy = jest.spyOn(store, 'update').mockImplementation(() => {});
    const datos: Tramite110205State = { campo: 'valor' } as any;
    service.actualizarEstadoFormulario(datos);
    expect(spy).toHaveBeenCalledWith(expect.any(Function));
    spy.mockRestore();
  });

  it('getRegistroTomaMuestrasMercanciasData should fetch prefill data', (done) => {
    const mockData: Tramite110205State = { campo: 'valor' } as any;
    service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('assets/json/110205/datos-prefill.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});