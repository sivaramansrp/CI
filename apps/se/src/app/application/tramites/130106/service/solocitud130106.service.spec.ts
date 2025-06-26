import { TestBed } from '@angular/core/testing';
import { Solocitud130106Service } from './service130106.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite130106Store } from '../../../estados/tramites/tramite130106.store';
import { Solicitud130106State } from '../../../estados/tramites/tramite130106.store';
import { ENVIRONMENT } from '../../../../environments/environment';

describe('Solocitud130106Service', () => {
  let service: Solocitud130106Service;
  let httpMock: HttpTestingController;
  let storeMock: Partial<Record<keyof Tramite130106Store, jest.Mock>>;

const MOCK_STATE: Solicitud130106State = {
  regimen: 'A',
  clasificacion: 'B',
  solicitudDescripcion: 'Descripción de prueba',
  fraccion: '12345678',
  cantidad: '5',
  factura: '100',
  umt: 'PZA',
  mercanciaCantidad: '5',
  mercanciaFactura: '100',
  descripcion: 'Mercancía XYZ',
  especifico: 'Sí',
  justificacion: 'Justificación',
  observaciones: 'Ninguna',
  entidad: '01',
  representacion: 'REP01',
  bloque: 'B1',
  disponible: '2024-01-01',
  seleccionado: '2024-01-01',
  solicitud: 'SOL123456',
  producto: 'Producto ABC',
  selectRangoDias: ['2024-01-01']
};


  beforeEach(() => {
    storeMock = {
      setRegimen: jest.fn(),
      setClasificacion: jest.fn(),
      setSolicitudDescripcion: jest.fn(),
      setFraccion: jest.fn(),
      setCantidad: jest.fn(),
      setFactura: jest.fn(),
      setUmt: jest.fn(),
      setMercanciaCantidad: jest.fn(),
      setMercanciaFactura: jest.fn(),
      setDescripcion: jest.fn(),
      setEspecifico: jest.fn(),
      setJustificacion: jest.fn(),
      setObservaciones: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setBloque: jest.fn(),
      setDisponible: jest.fn(),
      setSeleccionado: jest.fn(),
      setSolicitud: jest.fn(),
      setProducto: jest.fn(),
      updateSelectRangoDias: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite130106Store, useValue: storeMock }
      ]
    });

    service = TestBed.inject(Solocitud130106Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensures no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update tramite130106 store with all fields when actualizarEstadoFormulario is called', () => {
    service.actualizarEstadoFormulario(MOCK_STATE);

    expect(storeMock.setRegimen).toHaveBeenCalledWith('A');
    expect(storeMock.setClasificacion).toHaveBeenCalledWith('B');
    expect(storeMock.setSolicitudDescripcion).toHaveBeenCalledWith('Descripción de prueba');
    expect(storeMock.setFraccion).toHaveBeenCalledWith('12345678');
    expect(storeMock.setCantidad).toHaveBeenCalledWith('5');
    expect(storeMock.setFactura).toHaveBeenCalledWith('100');
    expect(storeMock.setUmt).toHaveBeenCalledWith('PZA');
    expect(storeMock.setMercanciaCantidad).toHaveBeenCalledWith("5");
    expect(storeMock.setMercanciaFactura).toHaveBeenCalledWith("100");
    expect(storeMock.setDescripcion).toHaveBeenCalledWith('Mercancía XYZ');
    expect(storeMock.setEspecifico).toHaveBeenCalledWith('Sí');
    expect(storeMock.setJustificacion).toHaveBeenCalledWith('Justificación');
    expect(storeMock.setObservaciones).toHaveBeenCalledWith('Ninguna');
    expect(storeMock.setEntidad).toHaveBeenCalledWith("01");
    expect(storeMock.setRepresentacion).toHaveBeenCalledWith("REP01");
    expect(storeMock.setBloque).toHaveBeenCalledWith("B1");
    expect(storeMock.setDisponible).toHaveBeenCalledWith("2024-01-01");
    expect(storeMock.setSeleccionado).toHaveBeenCalledWith("2024-01-01");
    expect(storeMock.setSolicitud).toHaveBeenCalledWith('SOL123456');
    expect(storeMock.setProducto).toHaveBeenCalledWith('Producto ABC');
    expect(storeMock.updateSelectRangoDias).toHaveBeenCalledWith(['2024-01-01']);
  });

  it('should call HTTP GET and return mocked JSON data', () => {
    service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
      expect(data).toEqual(MOCK_STATE);
    });

    const req = httpMock.expectOne('assets/json/130106/serviciosExtraordinarios.json');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_STATE);
  });
});
