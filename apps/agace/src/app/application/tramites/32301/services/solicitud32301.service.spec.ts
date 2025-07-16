import { Solicitud32301Service } from './solicitud32301.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { INITIAL_STATE, Tramite32301Store } from '../estados/tramite32301.store';

describe('Solicitud32301Service', () => {
  let service: Solicitud32301Service;
  let httpMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<Tramite32301Store>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as any;

    storeMock = {
      setModalidadCertificacion: jest.fn(),
      setClientesProveedoresExtranjeros: jest.fn(),
      setProveedoresNacionales: jest.fn(),
      setModificacionesMiembros: jest.fn(),
      setCambiosDocumentosLegales: jest.fn(),
      setNotifiFusionOescision: jest.fn(),
      setAdicionalesFractions: jest.fn(),
      setAceptacion253: jest.fn(),
      setArchivoExtranjero: jest.fn(),
      setRegistrosProveedoresExtranjeros: jest.fn(),
      setSnsucarácterde: jest.fn(),
      setRfc: jest.fn(),
      setObligadoaTributarenMéxico: jest.fn(),
      setNacionalidad: jest.fn(),
      setModificacionGoceInmueble: jest.fn(),
      SetpersonaFusionEscisionDTO: jest.fn(),
      setNombreCompleto: jest.fn()
    } as any;

    service = new Solicitud32301Service(httpMock, storeMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters in actualizarEstadoFormulario', () => {
    const datos: typeof INITIAL_STATE = {
      tipoDevAviso: {
        modalidadCertificacion: 'mod1'
      },
      proveedorExtranjero: { proveedor: 'extranjero' },
      modificacionSocios: {
        ensucarácterde: 'caracter',
        rfc: 'RFC123',
        obligadoaTributarenMéxico: true,
        nacionalidad: 'MX',
        nombreCompleto: 'Nombre Completo'
      },
      modificacionGoceInmueble: { inmueble: 'inmueble' },
      personaFusionEscisionDTO: { persona: 'fusion' }
    } as any;

    service.actualizarEstadoFormulario(datos);

    expect(storeMock.setModalidadCertificacion).toHaveBeenCalledWith(datos.tipoDevAviso.modalidadCertificacion);
    expect(storeMock.setClientesProveedoresExtranjeros).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setProveedoresNacionales).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setModificacionesMiembros).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setCambiosDocumentosLegales).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setNotifiFusionOescision).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setAdicionalesFractions).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setAceptacion253).toHaveBeenCalledWith(datos.tipoDevAviso);
    expect(storeMock.setArchivoExtranjero).toHaveBeenCalledWith(datos.proveedorExtranjero);
    expect(storeMock.setRegistrosProveedoresExtranjeros).toHaveBeenCalledWith(datos.proveedorExtranjero);
    expect(storeMock.setSnsucarácterde).toHaveBeenCalledWith(datos.modificacionSocios.ensucarácterde);
    expect(storeMock.setRfc).toHaveBeenCalledWith(datos.modificacionSocios.rfc);
    expect(storeMock.setObligadoaTributarenMéxico).toHaveBeenCalledWith(datos.modificacionSocios.obligadoaTributarenMéxico);
    expect(storeMock.setNacionalidad).toHaveBeenCalledWith(datos.modificacionSocios.nacionalidad);
    expect(storeMock.setModificacionGoceInmueble).toHaveBeenCalledWith(datos.modificacionGoceInmueble);
    expect(storeMock.SetpersonaFusionEscisionDTO).toHaveBeenCalledWith(datos.personaFusionEscisionDTO);
    expect(storeMock.setNombreCompleto).toHaveBeenCalledWith(datos.modificacionSocios.nombreCompleto);
  });

  it('should call http.get with correct URL in getRegistroTomaMuestrasMercanciasData', () => {
    const mockResponse = { foo: 'bar' } as any;
    httpMock.get.mockReturnValue(of(mockResponse));

    const obs$ = service.getRegistroTomaMuestrasMercanciasData();

    expect(httpMock.get).toHaveBeenCalledWith('assets/json/32301/registro_toma_muestras_mercancias.json');
    obs$.subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  });

  it('should handle empty or partial DATOS in actualizarEstadoFormulario', () => {
    const partialDatos: any = {
      tipoDevAviso: {},
      proveedorExtranjero: {},
      modificacionSocios: {},
      modificacionGoceInmueble: {},
      personaFusionEscisionDTO: {}
    };

    service.actualizarEstadoFormulario(partialDatos);

    expect(storeMock.setModalidadCertificacion).toHaveBeenCalledWith(undefined);
    expect(storeMock.setClientesProveedoresExtranjeros).toHaveBeenCalledWith(partialDatos.tipoDevAviso);
    expect(storeMock.setArchivoExtranjero).toHaveBeenCalledWith(partialDatos.proveedorExtranjero);
    expect(storeMock.setSnsucarácterde).toHaveBeenCalledWith(undefined);
    expect(storeMock.setNombreCompleto).toHaveBeenCalledWith(undefined);
  });
});