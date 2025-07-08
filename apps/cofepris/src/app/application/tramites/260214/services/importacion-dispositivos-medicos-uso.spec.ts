import { TestBed } from '@angular/core/testing';
import { ImportacionDispositivosMedicosUsoService } from './importacion-dispositivos-medicos-uso.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite260214State } from '../estados/tramite260214Store.store';

jest.mock('@angular/common/http');

describe('ImportacionDispositivosMedicosUsoService', () => {
  let service: ImportacionDispositivosMedicosUsoService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = { get: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        ImportacionDispositivosMedicosUsoService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });

    service = TestBed.inject(ImportacionDispositivosMedicosUsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRegistroTomaMuestrasMercanciasData', () => {
    it('should call http.get with correct URL and return observable', (done) => {
      const mockData: Tramite260214State = { campo: 'valor' } as any;
      httpClientMock.get.mockReturnValue(of(mockData));
      service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
        expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/260214/respuestaDeActualizacionDe.json');
        expect(data).toEqual(mockData);
        done();
      });
    });
  });
});