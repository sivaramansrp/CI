import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AvisoDatosService } from './aviso-datos.service';
import { Tramite32504Store } from '../estados/tramite32504.store';
import { FormularioGrupo } from '../models/aviso.model';
import { LabelValueDatos } from '@ng-mf/data-access-user';

class Tramite32504StoreStub {
  update = jest.fn();
}

describe('AvisoDatosService', () => {
  let service: AvisoDatosService;
  let httpMock: HttpTestingController;
  let store: Tramite32504StoreStub;
  const baseUrl = 'assets/json/32504';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AvisoDatosService,
        { provide: Tramite32504Store, useClass: Tramite32504StoreStub },
      ],
    });

    service = TestBed.inject(AvisoDatosService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(
      Tramite32504Store
    ) as unknown as Tramite32504StoreStub;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDatos', () => {
    it('should fetch array of LabelValueDatos on success', () => {
      const mockData: LabelValueDatos[] = [
        { label: 'A', value: '1' },
        { label: 'B', value: '2' },
      ];

      service.getDatos('test.json').subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${baseUrl}/test.json`);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should return empty array on error', () => {
      service.getDatos('error.json').subscribe((data) => {
        expect(data).toEqual([]);
      });

      const req = httpMock.expectOne(`${baseUrl}/error.json`);
      req.error(new ErrorEvent('Network error'), { status: 500 });
    });
  });

  describe('getRegistroTomaMuestrasMercanciasData', () => {
    it('should fetch FormularioGrupo data', () => {
      const mockForm: FormularioGrupo = { field1: 'x', field2: 123 } as any;

      service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
        expect(data).toEqual(mockForm);
      });

      const req = httpMock.expectOne(
        `${baseUrl}/respuestaDeActualizacionDe.json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockForm);
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('should call store.update with merged state', () => {
      const payload: FormularioGrupo = { foo: 'bar' } as any;

      service.actualizarEstadoFormulario(payload);

      expect(store.update).toHaveBeenCalledTimes(1);
      const updaterFn = (store.update as jest.Mock).mock.calls[0][0];
      const initialState = { existing: true };
      const newState = updaterFn(initialState);
      expect(newState).toEqual({ existing: true, foo: 'bar' });
    });
  });
});
