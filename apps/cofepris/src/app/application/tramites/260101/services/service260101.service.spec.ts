import { TestBed } from '@angular/core/testing';
import { Service260101Service } from './service260101.service';
import { Solicitud260101Store, Solicitud260101State } from '../estados/tramites260101.store';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Define ClavesDeLotes interface for testing purposes
interface ClavesDeLotes {
  clave: string;
  lotes: string;
  fabricacion: string;
  caducidad: string;
}

describe('Service260101Service', () => {
  let service: Service260101Service;
  let httpClientMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<Solicitud260101Store>;

  const mockState: Solicitud260101State = {
    razonSocial: 'Empresa S.A.',
    correoElectronico: 'test@email.com',
    codigoPostal: '12345',
    fraccionArancelaria: '010101',
    estado: 1,
    municipio: 'Benito Juárez',
    localidad: 'Centro',
    colonia: 'Roma',
    calle: 'Insurgentes',
    lada: 55,
    telefono: 12345678,
    avisoDeFuncionamiento: true,
    licenciaSanitaria: 'LS123',
    liveFreshFrozen: true,
    regimen: 1,
    aduana: 1,
    hacerlos: 'Hacer',
    rfc: 'RFC123',
    legalRazonSocial: 'Legal S.A.',
    apellidoPaterno: 'Pérez',
    apellidoMeterno: 'Gómez',
    mercanciasDatos: [],
    clasificaionProductos: 'Clasificación',
    tipoPersona: 'Moral',
    especificarProducto: 1,
    nombreProductoEspecifico: 'ProductoX',
    marca: 'MarcaX',
    tipoProducto: 1,
    descripcionFraccionArancelaria: 'Descripción',
    cantidadUMT: '10',
    umt: 'kg',
    cantidadUMC: '5',
    umc: 1,
    clavesDeLotes: [
      { clave: 'CL123', lotes: 'Lote1', fabricacion: '2024-01-01', caducidad: '2025-01-01' } as ClavesDeLotes,
      { clave: 'CL124', lotes: 'Lote2', fabricacion: '2024-02-01', caducidad: '2025-02-01' } as ClavesDeLotes
    ],
    claveDeLosLotes: 'CL123',
    fechaFabricacion: '2024-01-01',
    fechaCaducidad: '2025-01-01',
    manifesto: false,
    denominacion: '',
    modificarRFC: 'false',
    domicilioPais: 0,
    domicilioEstado: 0,
    domicilioMunicipio: 0,
    domicilioLocalidad: 0,
    domicilioColonia: 0,
    domiciliCalle: '',
    domiciliNumeroExterior: '',
    domiciliNumeroInterior: '',
    domiciliLada: '',
    domiciliTelefono: '',
    domiciliCorreoElectronioco: '',
    destinatarioDatos: [],
    claveDeReferencia: '',
    cadenaDeDependencia: '',
    banco: 0,
    liaveDePago: '',
    fechaDePago: '',
    importeDePago: '',
    domicilioCodigo: 0
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as any;

    storeMock = {
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setLiveFreshFrozen: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setHacerlos: jest.fn(),
      setRfc: jest.fn(),
      setLegalRazonSocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setMercanciasDatos: jest.fn(),
      setClasificacionProductos: jest.fn(),
      setTipoPersona: jest.fn(),
      setEspecificarProducto: jest.fn(),
      setNombreProductoEspecifico: jest.fn(),
      setMarca: jest.fn(),
      setTipoProducto: jest.fn(),
      setDescripcionFraccionArancelaria: jest.fn(),
      setCantidadUMT: jest.fn(),
      setUmt: jest.fn(),
      setCantidadUMC: jest.fn(),
      setUmc: jest.fn(),
      setClaveDeLosLotes: jest.fn(),
      setFechaFabricacion: jest.fn(),
      setFechaCaducidad: jest.fn(),
      setClavesDeLotes: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        Service260101Service,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Solicitud260101Store, useValue: storeMock }
      ]
    });
    service = TestBed.inject(Service260101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters with correct values in actualizarEstadoFormulario', () => {
    service.actualizarEstadoFormulario(mockState);

    expect(storeMock.setRazonSocial).toHaveBeenCalledWith(mockState.razonSocial);
    expect(storeMock.setCorreoElectronico).toHaveBeenCalledWith(mockState.correoElectronico);
    expect(storeMock.setCodigoPostal).toHaveBeenCalledWith(mockState.codigoPostal);
    expect(storeMock.setFraccionArancelaria).toHaveBeenCalledWith(mockState.fraccionArancelaria);
    expect(storeMock.setEstado).toHaveBeenCalledWith(mockState.estado);
    expect(storeMock.setMunicipio).toHaveBeenCalledWith(mockState.municipio);
    expect(storeMock.setLocalidad).toHaveBeenCalledWith(mockState.localidad);
    expect(storeMock.setColonia).toHaveBeenCalledWith(mockState.colonia);
    expect(storeMock.setCalle).toHaveBeenCalledWith(mockState.calle);
    expect(storeMock.setLada).toHaveBeenCalledWith(mockState.lada);
    expect(storeMock.setTelefono).toHaveBeenCalledWith(mockState.telefono);
    expect(storeMock.setAvisoDeFuncionamiento).toHaveBeenCalledWith(mockState.avisoDeFuncionamiento);
    expect(storeMock.setLicenciaSanitaria).toHaveBeenCalledWith(mockState.licenciaSanitaria);
    expect(storeMock.setLiveFreshFrozen).toHaveBeenCalledWith(mockState.liveFreshFrozen);
    expect(storeMock.setRegimen).toHaveBeenCalledWith(mockState.regimen);
    expect(storeMock.setAduana).toHaveBeenCalledWith(mockState.aduana);
    expect(storeMock.setHacerlos).toHaveBeenCalledWith(mockState.hacerlos);
    expect(storeMock.setRfc).toHaveBeenCalledWith(mockState.rfc);
    expect(storeMock.setLegalRazonSocial).toHaveBeenCalledWith(mockState.legalRazonSocial);
    expect(storeMock.setApellidoPaterno).toHaveBeenCalledWith(mockState.apellidoPaterno);
    expect(storeMock.setMercanciasDatos).toHaveBeenCalledWith(mockState.mercanciasDatos);
    expect(storeMock.setClasificacionProductos).toHaveBeenCalledWith(mockState.clasificaionProductos);
    expect(storeMock.setTipoPersona).toHaveBeenCalledWith(mockState.tipoPersona);
    expect(storeMock.setEspecificarProducto).toHaveBeenCalledWith(mockState.especificarProducto);
    expect(storeMock.setNombreProductoEspecifico).toHaveBeenCalledWith(mockState.nombreProductoEspecifico);
    expect(storeMock.setMarca).toHaveBeenCalledWith(mockState.marca);
    expect(storeMock.setTipoProducto).toHaveBeenCalledWith(mockState.tipoProducto);
    expect(storeMock.setDescripcionFraccionArancelaria).toHaveBeenCalledWith(mockState.descripcionFraccionArancelaria);
    expect(storeMock.setCantidadUMT).toHaveBeenCalledWith(mockState.cantidadUMT);
    expect(storeMock.setUmt).toHaveBeenCalledWith(mockState.umt);
    expect(storeMock.setCantidadUMC).toHaveBeenCalledWith(mockState.cantidadUMC);
    expect(storeMock.setUmc).toHaveBeenCalledWith(mockState.umc);
    expect(storeMock.setClaveDeLosLotes).toHaveBeenCalledWith(mockState.claveDeLosLotes);
    expect(storeMock.setFechaFabricacion).toHaveBeenCalledWith(mockState.fechaFabricacion);
    expect(storeMock.setFechaCaducidad).toHaveBeenCalledWith(mockState.fechaCaducidad);
    expect(storeMock.setClavesDeLotes).toHaveBeenCalledWith(mockState.clavesDeLotes);
  });

  it('should call http.get with correct URL in getRegistroTomaMuestrasMercanciasData', done => {
    const expectedUrl = 'assets/json/260101/registro_toma_muestras_mercancias.json';
    httpClientMock.get.mockReturnValue(of(mockState));

    service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
      expect(data).toEqual(mockState);
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
      done();
    });
  });

  it('should handle empty state in actualizarEstadoFormulario', () => {
    const emptyState: Solicitud260101State = {
     razonSocial : "",
     correoElectronico : "",
     codigoPostal : "",
     estado : 0,
     municipio : "",
     localidad : "",
     colonia : "",
    calle: "",
    lada:0,
    telefono : 0,
    avisoDeFuncionamiento : false,
    licenciaSanitaria : "",
    liveFreshFrozen : false,
    regimen : 0,
    aduana : 0,
    hacerlos : "",
    rfc : "",
    legalRazonSocial : "",
    apellidoPaterno : "",
    apellidoMeterno: "",
    mercanciasDatos : [],
    manifesto : false,
    clasificaionProductos : "",
    especificarProducto : 0,
    nombreProductoEspecifico : "",
    marca : "",
    tipoProducto : 0,
    fraccionArancelaria : "",
    descripcionFraccionArancelaria : "",
    cantidadUMT : "",
    umt : "",
    cantidadUMC : "",
    umc : 0,
    claveDeLosLotes : "",
    fechaFabricacion : "",
    fechaCaducidad : "",
    clavesDeLotes : [],
    tipoPersona : "",
    modificarRFC : "",
    denominacion : "",
    domicilioPais : 0,
    domicilioEstado : 0,
    domicilioMunicipio : 0,
    domicilioLocalidad : 0,
    domicilioCodigo : 0,
    domicilioColonia : 0,
    domiciliCalle: "",
    domiciliNumeroExterior : "",
    domiciliNumeroInterior : "",
    domiciliLada : "",
    domiciliTelefono : "",
    domiciliCorreoElectronioco : "",
    destinatarioDatos : [],
    claveDeReferencia : "",
    cadenaDeDependencia : "",
    banco : 0,
    liaveDePago : "",
    fechaDePago : "",
    importeDePago : ""
    };

    service.actualizarEstadoFormulario(emptyState);

    expect(storeMock.setRazonSocial).toHaveBeenCalledWith('');
    expect(storeMock.setCorreoElectronico).toHaveBeenCalledWith('');
    expect(storeMock.setCantidadUMT).toHaveBeenCalledWith(0);
    expect(storeMock.setClavesDeLotes).toHaveBeenCalledWith([]);
  });

  it('should propagate errors from http.get in getRegistroTomaMuestrasMercanciasData', done => {
    const errorResponse = new Error('Network error');
    httpClientMock.get.mockReturnValue(throwError(() => errorResponse));

    service.getRegistroTomaMuestrasMercanciasData().subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toBe(errorResponse);
        done();
      }
    });
  });
});