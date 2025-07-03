import { TestBed } from '@angular/core/testing';
import { ConsultaDatosService } from './consulta-datos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TramiteStore } from '../estados/tramite32516Store.store';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TramiteState } from '../estados/tramite32516Store.store';

describe('ConsultaDatosService', () => {
  let service: ConsultaDatosService;
  let httpMock: HttpTestingController;
  let tramiteStore: { setSolicitudTramite: jest.Mock; setMercanciaTramite: jest.Mock };
  let seccionStore: SeccionLibStore;

  beforeEach(() => {
    tramiteStore = {
      setSolicitudTramite: jest.fn(),
      setMercanciaTramite: jest.fn()
    };
    seccionStore = {} as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConsultaDatosService,
        { provide: TramiteStore, useValue: tramiteStore },
        { provide: SeccionLibStore, useValue: seccionStore }
      ]
    });

    service = TestBed.inject(ConsultaDatosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update solicitud in store', () => {
    const solicitud = { foo: 'bar' } as any;
    service.updateSolicitud(solicitud);
    expect(tramiteStore.setSolicitudTramite).toHaveBeenCalledWith(solicitud);
  });

  it('should update region (mercancia) in store', () => {
    const mercancia = { bar: 'baz' } as any;
    service.updateRegion(mercancia);
    expect(tramiteStore.setMercanciaTramite).toHaveBeenCalledWith(mercancia);
  });

  it('should update full formulario state in store', () => {
    const datos: TramiteState = {
      SolicitudState: { a: 1 } as any,
      MercanciaState: { b: 2 } as any
    } as any;
    service.actualizarEstadoFormulario(datos);
    expect(tramiteStore.setSolicitudTramite).toHaveBeenCalledWith(datos.SolicitudState);
    expect(tramiteStore.setMercanciaTramite).toHaveBeenCalledWith(datos.MercanciaState);
  });

  it('should get datos de la solicitud from JSON', () => {
    const mockData = {
      SolicitudState: { x: 1 },
      MercanciaState: { y: 2 }
    } as unknown as TramiteState;
    let result: TramiteState | undefined;
    service.getDatosDeLaSolicitudData().subscribe(data => (result = data));

    const req = httpMock.expectOne('assets/json/32516/consulta-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(result).toEqual(mockData);
  });
});