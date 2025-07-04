import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatosDelTramiteService } from './datos-del-tramite.service';
import { Solicitud10301State } from '../estados/tramite10301.store';

const mockResponse: Solicitud10301State = {
  tipoMercancia: 'Maquinaria',
  usoEspecifico: 'Industrial',
  marca: 'MarcaX',
  modelo: 'ModeloY',
  serie: 'S12345',
  calle: 'Calle 1',
  numeroExterior: 10,
  numeroInterior: 2,
  telefono: 5551234567,
  correoElectronico: 'test@example.com',
  codigoPostal: 1232,
  estado: 1,
  colonia: 1,
  opcion: 'A'
} as unknown as Solicitud10301State;

describe('DatosDelTramiteService', () => {
  let service: DatosDelTramiteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatosDelTramiteService]
    });
    service = TestBed.inject(DatosDelTramiteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch datos del tramite successfully', () => {
    service.getDatosDelTramite().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10301/datos-del-tramite.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error if getDatosDelTramite fails', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.getDatosDelTramite().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne('assets/json/10301/datos-del-tramite.json');
    req.flush({}, mockError);
  });
});