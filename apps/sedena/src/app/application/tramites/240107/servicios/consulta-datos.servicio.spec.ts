import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsultaDatosService } from './consulta-datos.servicio';
import { Tramite240107Store } from '../estados/tramite240107Store.store';
import { SeccionLibStore } from '@ng-mf/data-access-user';

class MockTramite240107Store {
  updateDatosDelTramiteFormState = jest.fn();
  updatePagoDerechosFormState = jest.fn();
  updateDestinatarioFinalTablaDatos = jest.fn();
  updateProveedorTablaDatos = jest.fn();
  updateMercanciaTablaDatos = jest.fn();
}

class MockSeccionLibStore {}

describe('ConsultaDatosService', () => {
  let service: ConsultaDatosService;
  let httpMock: HttpTestingController;
  let tramiteStore: MockTramite240107Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite240107Store, useClass: MockTramite240107Store },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore }
      ]
    });
    service = TestBed.inject(ConsultaDatosService);
    httpMock = TestBed.inject(HttpTestingController);
    tramiteStore = TestBed.inject(Tramite240107Store) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateDatosDelTramiteFormState in updateDatosDel', () => {
    const datos = { permisoGeneral: '', usoFinal: '', aduanasSeleccionadas: [], paisDestino: '' };
    service.updateDatosDel(datos);
    expect(tramiteStore.updateDatosDelTramiteFormState).toHaveBeenCalledWith(datos);
  });


  it('should call updateDestinatarioFinalTablaDatos in updateDestinatario', () => {
    const datos = [{} as any];
    service.updateDestinatario(datos);
    expect(tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call updateProveedorTablaDatos in updateProveedor', () => {
    const datos = [{} as any];
    service.updateProveedor(datos);
    expect(tramiteStore.updateProveedorTablaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call updateMercanciaTablaDatos in updateMercancia', () => {
    const datos = [{} as any];
    service.updateMercancia(datos);
    expect(tramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call all update methods in actualizarEstadoFormulario', () => {
    const datos: any = {
      datosDelTramite: { a: 1 },
      pagoDerechos: { b: 2 },
      destinatarioFinalTablaDatos: { c: 3 },
      proveedorTablaDatos: { d: 4 },
      merccancialTablaDatos: { e: 5 }
    };
    service.actualizarEstadoFormulario(datos);
    expect(tramiteStore.updateDatosDelTramiteFormState).toHaveBeenCalledWith(datos.datosDelTramite);
    expect(tramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(datos.pagoDerechos);
    expect(tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(datos.destinatarioFinalTablaDatos);
    expect(tramiteStore.updateProveedorTablaDatos).toHaveBeenCalledWith(datos.proveedorTablaDatos);
    expect(tramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(datos.merccancialTablaDatos);
  });

  it('should fetch datos de la solicitud', () => {
    const mockResponse = { foo: 'bar' } as any;
    service.getDatosDeLaSolicitudData().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/240107/consulta-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error in getDatosDeLaSolicitudData', (done) => {
    service.getDatosDeLaSolicitudData().subscribe({
      next: () => {},
      error: (err) => {
        expect(err.status).toBe(500);
        done();
      }
    });
    const req = httpMock.expectOne('assets/json/240107/consulta-datos.json');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should allow unsubscribing from getDatosDeLaSolicitudData observable', () => {
    const subscription = service.getDatosDeLaSolicitudData().subscribe({});
    subscription.unsubscribe();
    expect(subscription.closed).toBe(true);
  });
});
