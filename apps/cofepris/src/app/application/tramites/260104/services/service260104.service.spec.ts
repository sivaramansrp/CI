import { Solocitud260104Service } from './service260104.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Solocitud260104Service', () => {
  let service: Solocitud260104Service;
  let httpMock: jest.Mocked<HttpClient>;
  let tramite260104StoreDosMock: any;
  let tramite260104StoreMock: any;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as any;

    tramite260104StoreDosMock = {
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoCheckbox: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setManifesto: jest.fn(),
      setHacerlosPublicos: jest.fn(),
      setClaveScianModal: jest.fn(),
      setClaveDescripcionModal: jest.fn(),
      setClasificacion: jest.fn(),
      setEspecificarClasificacionProducto: jest.fn(),
      setEspecifique: jest.fn(),
      setDenominacionEspecifica: jest.fn(),
      setMarca: jest.fn(),
      setEspecifiqueTipo: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setDescripcionFraccion: jest.fn(),
      setCantidadUMT: jest.fn(),
      setUMT: jest.fn(),
      setCantidadUMC: jest.fn(),
      setUMC: jest.fn(),
      setClaveDeLosLotes: jest.fn(),
      setFechaCaducidad: jest.fn(),
      setFechaFabricacion: jest.fn(),
      setTipoDeProducto: jest.fn(),
      setRfc: jest.fn(),
    };

    tramite260104StoreMock = {
      updatePagoDerechos: jest.fn(),
      updateDestinatarioFinalTablaDatos: jest.fn(),
      updateFabricanteTablaDatos: jest.fn(),
    };

    service = new Solocitud260104Service(httpMock, tramite260104StoreDosMock, tramite260104StoreMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all set methods in actualizarEstadoFormularioDos', () => {
    const datos: any = {
      razonSocial: 'A',
      correoElectronico: 'B',
      codigoPostal: 'C',
      estado: 'D',
      municipio: 'E',
      localidad: 'F',
      colonia: 'G',
      calle: 'H',
      lada: 'I',
      telefono: 'J',
      avisoCheckbox: true,
      licenciaSanitaria: 'K',
      regimen: 'L',
      aduana: 'M',
      manifesto: 'N',
      hacerlosPublicos: true,
      claveScianModal: 'O',
      claveDescripcionModal: 'P',
      clasificacion: 'Q',
      especificarClasificacionProducto: 'R',
      especifique: 'S',
      denominacionEspecifica: 'T',
      marca: 'U',
      especifiqueTipo: 'V',
      fraccionArancelaria: 'W',
      descripcionFraccion: 'X',
      cantidadUMT: 1,
      UMT: 'Y',
      cantidadUMC: 2,
      UMC: 'Z',
      claveDeLosLotes: 'AA',
      fechaCaducidad: 'BB',
      fechaFabricacion: 'CC',
      tipoDeProducto: 'DD',
      rfc: 'EE',
    };

    service.actualizarEstadoFormularioDos(datos);

    Object.keys(tramite260104StoreDosMock).forEach(key => {
      expect(tramite260104StoreDosMock[key]).toHaveBeenCalled();
    });
  });

  it('should call update methods in actualizarEstadoFormulario', () => {
    const datos: any = {
      pagoDerechos: { a: 1 },
      destinatarioFinalTablaDatos: [{ b: 2 }],
      fabricanteTablaDatos: [{ c: 3 }],
    };
    service.actualizarEstadoFormulario(datos);
    expect(tramite260104StoreMock.updatePagoDerechos).toHaveBeenCalledWith(datos.pagoDerechos);
    expect(tramite260104StoreMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(datos.destinatarioFinalTablaDatos);
    expect(tramite260104StoreMock.updateFabricanteTablaDatos).toHaveBeenCalledWith(datos.fabricanteTablaDatos);
  });

  it('should get registro toma muestras mercancias data dos', (done) => {
    const mockResponse = { test: 1 };
    httpMock.get.mockReturnValue(of(mockResponse));
    service.getRegistroTomaMuestrasMercanciasDataDos().subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith('assets/json/260104/registro_toma_muestras_mercancias.json');
      done();
    });
  });

  it('should get registro toma muestras mercancias data', (done) => {
    const mockResponse = { test: 2 };
    httpMock.get.mockReturnValue(of(mockResponse));
    service.getRegistroTomaMuestrasMercanciasData().subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith('assets/json/260104/registro_toma_muestras_mercancias_Pago.json');
      done();
    });
  });
});