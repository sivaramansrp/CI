import { TestBed } from '@angular/core/testing';
import { ServicioDeMensajesService } from './servicio-de-mensajes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CuposDisponibles, CuposDisponiblesDatos, PermisosDatos } from '../models/cancelacion-de-certificados.model';
import { DesistimientoStore } from '../estados/desistimiento-de-permiso.store'; 

class MockDesistimientoStore {
  actualizarDatosForma = jest.fn();
  _select = jest.fn().mockReturnValue(of({}));
  update = jest.fn();
}

describe('ServicioDeMensajesService methods', () => {
  let service: ServicioDeMensajesService;
  let httpMock: HttpTestingController;
  let desistimientoStore: MockDesistimientoStore;

  beforeEach(() => {
    desistimientoStore = new MockDesistimientoStore();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServicioDeMensajesService,
        { provide: DesistimientoStore, useValue: desistimientoStore }
      ]
    });

    service = TestBed.inject(ServicioDeMensajesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('enviarMensaje should emit value', (done) => {
    service.mensaje$.subscribe(val => {
      expect(val).toBe(true);
      done();
    });
    service.enviarMensaje(true);
  });

  it('enviarDevolverFacturasMensaje should emit value', (done) => {
    service.devolverFacturasMensaje$.subscribe(val => {
      expect(val).toBe(true);
      done();
    });
    service.enviarDevolverFacturasMensaje(true);
  });

  it('establecerDatosDePermiso should emit value', (done) => {
    service.datos$.subscribe(val => {
      expect(val).toBe(true);
      done();
    });
    service.establecerDatosDePermiso(true);
  });

  it('obtenerDatos should return observable from store', (done) => {
    service.obtenerDatos().subscribe(val => {
      expect(val).toEqual({});
      done();
    });
    expect(desistimientoStore._select).toHaveBeenCalled();
  });

  it('actualizarEstadoFormulario should call store.update with merged state', () => {
    const partial: Partial<CuposDisponiblesDatos> = { campo: 'valor' } as any;
    desistimientoStore.update.mockImplementation((updater: any) => {
      const previousState = { otro: 1 };
      const result = updater(previousState);
      expect(result).toEqual({ otro: 1, campo: 'valor' });
    });
    service.actualizarEstadoFormulario(partial);
    expect(desistimientoStore.update).toHaveBeenCalledWith(expect.any(Function));
  });
  });
