import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeruCertificadoService } from './peru-certificado.service';
import { Tramite110205State } from '../estados/tramite110205.store';
import { Catalogo } from '@ng-mf/data-access-user';

describe('PeruCertificadoService', () => {
  let service: PeruCertificadoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeruCertificadoService]
    });

    service = TestBed.inject(PeruCertificadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch menu desplegable data', () => {
    const mockCatalogoData: Catalogo[] = [
      { id: 1, descripcion: 'Option 1' },
      { id: 2, descripcion: 'Option 2' }
    ];

    service.obtenerMenuDesplegable('menu.json').subscribe((data) => {
      expect(data).toEqual(mockCatalogoData);
    });

    const req = httpMock.expectOne('../../../../../assets/json/110205/menu.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockCatalogoData });
  });

  test('should fetch tabla datos', () => {
    const mockMercanciaData = [
      { id: 1, nombre: 'Mercancia 1' },
      { id: 2, nombre: 'Mercancia 2' }
    ];

    service.obtenerTablaDatos('tabla.json').subscribe((data) => {
      expect(data).toEqual(mockMercanciaData);
    });

    const req = httpMock.expectOne('../../../../../assets/json/110205/tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockMercanciaData);
  });

  test('should update estado formulario', () => {
    const mockState: Tramite110205State = {
      formCertificado: { si: true },
      estado: { id: 1, descripcion: 'Estado' },
      paisBloques: [{ id: 1, descripcion: 'Bloque 1' }],
      mercanciaForm: {},
      mercanciaTabla: [],
      formDatosCertificado: {},
      idiomaDatosSeleccion: { id: 2, descripcion: 'Español' },
      entidadFederativaSeleccion: { id: 3, descripcion: 'Entidad Federativa' },
      representacionFederalSeleccion: { id: 4, descripcion: 'Representación Federal' },
      formDatosDelDestinatario: {},
      formExportor: {},
      fraccionArancelaria: '1234.56.78',
      nombreComercialMercancia: 'Mercancia Comercial',
      nombreTecnico: 'Mercancia Técnica',
      nombreIngles: 'Technical Merchandise',
      otrasInstancias: 'Instancias',
      criterioParaConferirOrigen: 'Criterio',
      cantidad: '100',
      umc: [{ id: 5, descripcion: 'Unidad' }],
      valorMercancia: '1000',
      complementoDescripcion: 'Descripción adicional',
      numeroFactura: 'FAC12345',
      tipoFactura: [{ id: 6, descripcion: 'Factura Tipo' }],
      formaValida: { valid: true },
      formDestinatario: {},
      datosConfidencialesProductor: true,
      productorMismoExportador: false,
      agregarDatosProductorFormulario: {},
      formulario: {},
      disponiblesDatos: [],
      procductoUno: []
    };

    jest.spyOn(service.tramite110205Store, 'update');
    service.actualizarEstadoFormulario(mockState);

    expect(service.tramite110205Store.update).toHaveBeenCalledWith(expect.any(Function));
  });

  test('should fetch registro toma muestras mercancias data', () => {
    const mockPrefillData: Tramite110205State = {
      formCertificado: { si: true },
      estado: { id: 1, descripcion: 'Estado' },
      paisBloques: [{ id: 1, descripcion: 'Bloque 1' }],
      mercanciaForm: {},
      mercanciaTabla: [],
      formDatosCertificado: {},
      idiomaDatosSeleccion: { id: 2, descripcion: 'Español' },
      entidadFederativaSeleccion: { id: 3, descripcion: 'Entidad Federativa' },
      representacionFederalSeleccion: { id: 4, descripcion: 'Representación Federal' },
      formDatosDelDestinatario: {},
      formExportor: {},
      fraccionArancelaria: '1234.56.78',
      nombreComercialMercancia: 'Mercancia Comercial',
      nombreTecnico: 'Mercancia Técnica',
      nombreIngles: 'Technical Merchandise',
      otrasInstancias: 'Instancias',
      criterioParaConferirOrigen: 'Criterio',
      cantidad: '100',
      umc: [{ id: 5, descripcion: 'Unidad' }],
      valorMercancia: '1000',
      complementoDescripcion: 'Descripción adicional',
      numeroFactura: 'FAC12345',
      tipoFactura: [{ id: 6, descripcion: 'Factura Tipo' }],
      formaValida: { valid: true },
      formDestinatario: {},
      datosConfidencialesProductor: true,
      productorMismoExportador: false,
      agregarDatosProductorFormulario: {},
      formulario: {},
      disponiblesDatos: [],
      procductoUno: []
    };

    service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
      expect(data).toEqual(mockPrefillData);
    });

    const req = httpMock.expectOne('assets/json/110205/datos-prefill.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPrefillData);
  });
});