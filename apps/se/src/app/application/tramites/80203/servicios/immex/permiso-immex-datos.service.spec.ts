import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermisoImmexDatosService } from './permiso-immex-datos.service';
import { ImmexRegistroStore } from '../../estados/tramites/tramite80203.store';
import { immexRegistroform } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { ImmexRegistroState } from '../../estados/tramites/tramite80203.store';

describe('PermisoImmexDatosService', () => {
  let service: PermisoImmexDatosService;
  let httpMock: HttpTestingController;
  let storeMock: { setImmexRegistro: jest.Mock };

  beforeEach(() => {
    storeMock = { setImmexRegistro: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PermisoImmexDatosService,
        { provide: ImmexRegistroStore, useValue: storeMock }
      ]
    });

    service = TestBed.inject(PermisoImmexDatosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get IMMEX table data from JSON', () => {
    const mockData = [{ id: 1, name: 'test' }];
    service.getDatos().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/80203/immex-table.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get registro toma muestras y mercancías data from JSON', () => {
    const mockRegistro: ImmexRegistroState = { test: 'value' } as any;
    service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
      expect(data).toEqual(mockRegistro);
    });

    const req = httpMock.expectOne('assets/json/80203/immexRegistro.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRegistro);
  });

  it('should update the store with provided form data', () => {
    const mockForm: immexRegistroform = { test: 'value' } as any;
    service.actualizarEstadoFormulario(mockForm);
    expect(storeMock.setImmexRegistro).toHaveBeenCalledWith(mockForm);
  });
});