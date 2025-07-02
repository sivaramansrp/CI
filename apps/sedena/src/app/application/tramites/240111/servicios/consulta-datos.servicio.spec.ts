import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsultaDatosService } from './consulta-datos.servicio';
import { Tramite240111Store } from '../estados/tramite240111Store.store';

class MockTramite240111Store {
  updateDatosDelTramiteFormState = jest.fn();
  updatePagoDerechosFormState = jest.fn();
  updateDestinatarioFinalTablaDatos = jest.fn();
  updateProveedorTablaDatos = jest.fn();
  updateMercanciaTablaDatos = jest.fn();
}

describe('ConsultaDatosService', () => {
  let service: ConsultaDatosService;
  let httpMock: HttpTestingController;
  let tramiteStore: MockTramite240111Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite240111Store, useClass: MockTramite240111Store }
      ]
    });
    service = TestBed.inject(ConsultaDatosService);
    httpMock = TestBed.inject(HttpTestingController);
    tramiteStore = TestBed.inject(Tramite240111Store) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch datos de la solicitud', () => {
    const mockResponse = { foo: 'bar' } as any;
    service.getDatosDeLaSolicitudData().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/240111/consulta-datos.json');
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
    const req = httpMock.expectOne('assets/json/240111/consulta-datos.json');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should allow unsubscribing from getDatosDeLaSolicitudData observable', () => {
    const subscription = service.getDatosDeLaSolicitudData().subscribe({});
    subscription.unsubscribe();
    expect(subscription.closed).toBe(true);
  });

  it('should call updateDatosDelTramiteFormState', () => {
    const datos = { permisoGeneral: '', usoFinal: '', aduanasSeleccionadas: [], paisDestino: '' };
    service.updateDatosDel(datos);
    expect(tramiteStore.updateDatosDelTramiteFormState).toHaveBeenCalledWith(datos);
  });

  it('should call updatePagoDerechosFormState', () => {
    const datos = { claveReferencia: '', cadenaDependencia: '', banco: '', llavePago: '', fechaPago: '', monto: 0, importePago: '' };
    service.updatePagoDerechos(datos);
    expect(tramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(datos);
  });

  it('should call updateDestinatarioFinalTablaDatos', () => {
    const datos = [{ nombre: '', direccion: '', pais: '' }] as any;
    service.updateDestinatario(datos);
    expect(tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call updateProveedorTablaDatos', () => {
    const datos = [{ nombre: '', rfc: '', direccion: '' }] as any;
    service.updateProveedor(datos);
    expect(tramiteStore.updateProveedorTablaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call updateMercanciaTablaDatos', () => {
    const datos = [{ descripcion: '', cantidad: 0, unidad: '' }] as any;
    service.updateMercancia(datos);
    expect(tramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call all update methods in actualizarEstadoFormulario', () => {
    const datos: any = {
      datosDelTramite: { permisoGeneral: '', usoFinal: '', aduanasSeleccionadas: [], paisDestino: '' },
      pagoDerechos: { claveReferencia: '', cadenaDependencia: '', banco: '', llavePago: '', fechaPago: '', monto: 0, importePago: '' },
      destinatarioFinalTablaDatos: [{ nombre: '', direccion: '', pais: '' }],
      proveedorTablaDatos: [{ nombre: '', rfc: '', direccion: '' }],
      merccancialTablaDatos: [{ descripcion: '', cantidad: 0, unidad: '' }]
    };
    service.actualizarEstadoFormulario(datos);
    expect(tramiteStore.updateDatosDelTramiteFormState).toHaveBeenCalledWith(datos.datosDelTramite);
    expect(tramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(datos.pagoDerechos);
    expect(tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(datos.destinatarioFinalTablaDatos);
    expect(tramiteStore.updateProveedorTablaDatos).toHaveBeenCalledWith(datos.proveedorTablaDatos);
    expect(tramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(datos.merccancialTablaDatos);
  });
});
