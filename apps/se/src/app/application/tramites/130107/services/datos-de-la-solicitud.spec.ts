import { TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudService } from './datos-de-la-solicitud.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ImportacionesAgropecuariasStore } from '../estados/importaciones-agropecuarias.store';

describe('DatosDeLaSolicitudService', () => {
  let service: DatosDeLaSolicitudService;
  let httpMock: any;
  let storeMock: any;

  beforeEach(() => {
    httpMock = { get: jest.fn() };
    storeMock = { setDynamicFieldValue: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        DatosDeLaSolicitudService,
        { provide: HttpClient, useValue: httpMock },
        { provide: ImportacionesAgropecuariasStore, useValue: storeMock }
      ]
    });

    service = TestBed.inject(DatosDeLaSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get importacion definitiva data', (done) => {
    const mockData = { campo: 'valor' };
    httpMock.get.mockReturnValue(of(mockData));
    service.getImportacionDefinitivaData().subscribe(result => {
      expect(result).toEqual(mockData);
      expect(httpMock.get).toHaveBeenCalledWith('assets/json/130107/solicitud-datos.json');
      done();
    });
  });

  it('should update store with actualizarEstadoFormulario', () => {
    service.actualizarEstadoFormulario('pais', 'México');
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('pais', 'México');
  });
});