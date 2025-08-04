import { TestBed } from '@angular/core/testing';
import { Service260101Service } from './service260101.service';
import {
  Solicitud260101Store,
  Solicitud260101State,
} from '../estados/tramites260101.store';
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
    razonSocial: '',
    correoElectronico: '',
    codigoPostal: '',
    estado: 0,
    municipio: '',
    localidad: '',
    colonia: '',
    calle: '',
    lada: 0,
    telefono: 0,
    avisoDeFuncionamiento: false,
    licenciaSanitaria: '',
    liveFreshFrozen: false,
    regimen: 0,
    aduana: 0,
    hacerlos: '',
    rfc: '',
    legalRazonSocial: '',
    apellidoPaterno: '',
    apellidoMeterno: '',
    mercanciasDatos: [],
    manifesto: false,
    clasificaionProductos: '',
    especificarProducto: 0,
    nombreProductoEspecifico: '',
    marca: '',
    tipoProducto: 0,
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidadUMT: '',
    umt: '',
    cantidadUMC: '',
    umc: 0,
    claveDeLosLotes: '',
    fechaFabricacion: '',
    fechaCaducidad: '',
    clavesDeLotes: [],
    tipoPersona: '',
    modificarRFC: '',
    denominacion: '',
    denominacionNombre: '',
    denominacionApellidoPaterno: '',
    denominacionApellidoMaterno: '',
    domicilioPais: '',
    domicilioEstado: '',
    domicilioMunicipio: '',
    domicilioLocalidad: '',
    domicilioCodigo: '',
    domicilioColonia: '',
    domiciliCalle: '',
    domiciliNumeroExterior: '',
    domiciliNumeroInterior: '',
    domiciliLada: '',
    domiciliTelefono: '',
    domiciliCorreoElectronioco: '',
    tercerosNacionalidad: 0,
    tercerosTipoPersona: 0,
    tercerosRFC: '',
    tercerosCurp: '',
    tercerosDenominacion: '',
    tercerosDenominacionNombre: '',
    tercerosApellidoPaterno: '',
    tercerosApellidoMaterno: '',
    tercerosPais: '',
    tercerosEstado: '',
    tercerosMunicipio: '',
    tercerosLocalidad: '',
    tercerosCodigo: '',
    tercerosColonia: '',
    tercerosCalle: '',
    tercerosNumeroExterior: '',
    tercerosNumeroInterior: '',
    tercerosLada: '',
    tercerosTelefono: '',
    tercerosCorreoElectronico: '',
    destinatarioDatos: [],
    claveDeReferencia: '',
    cadenaDeDependencia: '',
    banco: 0,
    liaveDePago: '',
    fechaDePago: '',
    importeDePago: '',
    modificarDestinatario: false,
    modificarFabricante: false,
    scianSeleccionados: [],
    mercanciasSeleccionados: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    httpClientMock = {
      get: jest.fn(() => of()),
    } as any;

    storeMock = {
      setRazonSocial: jest.fn(() => of()),
      setCorreoElectronico: jest.fn(() => of()),
      setCodigoPostal: jest.fn(() => of()),
      setFraccionArancelaria: jest.fn(() => of()),
      setEstado: jest.fn(() => of()),
      setMunicipio: jest.fn(() => of()),
      setLocalidad: jest.fn(() => of()),
      setColonia: jest.fn(() => of()),
      setCalle: jest.fn(() => of()),
      setLada: jest.fn(() => of()),
      setTelefono: jest.fn(() => of()),
      setAvisoDeFuncionamiento: jest.fn(() => of()),
      setLicenciaSanitaria: jest.fn(() => of()),
      setLiveFreshFrozen: jest.fn(() => of()),
      setRegimen: jest.fn(() => of()),
      setAduana: jest.fn(() => of()),
      setHacerlos: jest.fn(() => of()),
      setRfc: jest.fn(() => of()),
      setLegalRazonSocial: jest.fn(() => of()),
      setApellidoPaterno: jest.fn(() => of()),
      setMercanciasDatos: jest.fn(() => of()),
      setClasificacionProductos: jest.fn(() => of()),
      setTipoPersona: jest.fn(() => of()),
      setEspecificarProducto: jest.fn(() => of()),
      setNombreProductoEspecifico: jest.fn(() => of()),
      setMarca: jest.fn(() => of()),
      setTipoProducto: jest.fn(() => of()),
      setDescripcionFraccionArancelaria: jest.fn(() => of()),
      setCantidadUMT: jest.fn(() => of()),
      setUmt: jest.fn(() => of()),
      setApellidoMeterno: jest.fn(() => of()),
      setCantidadUMC: jest.fn(() => of()),
      setUmc: jest.fn(() => of()),
      setClaveDeLosLotes: jest.fn(() => of()),
      setFechaFabricacion: jest.fn(() => of()),
      setFechaCaducidad: jest.fn(() => of()),
      setClavesDeLotes: jest.fn(() => of()),
      setDenominacion: jest.fn(() => of()),
      setDenominacionNombre: jest.fn(() => of()),
      setDenominacionApellidoPaterno: jest.fn(() => of()),
      setDenominacionApellidoMaterno: jest.fn(() => of()),
      setModificarRFC: jest.fn(() => of()),
      setManifesto: jest.fn(() => of()),
      setClaveDeReferencia: jest.fn(() => of()),
      setCadenaDeDependencia: jest.fn(() => of()),
      setBanco: jest.fn(() => of()),
      setLiaveDePago: jest.fn(() => of()),
      setFechaDePago: jest.fn(() => of()),
      setImporteDePago: jest.fn(() => of()),
      setModificarDestinatario: jest.fn(() => of()),
      setModificarFabricante: jest.fn(() => of()),
      setScianSeleccionados: jest.fn(() => of()),
      setMercanciasSeleccionados: jest.fn(() => of()),
      setDomicilioPais: jest.fn(() => of()),
      setDomicilioEstado: jest.fn(() => of()),
      setDomicilioMunicipio: jest.fn(() => of()),
      setDomicilioLocalidad: jest.fn(() => of()),
      setDomicilioCodigoPostal: jest.fn(() => of()),
      setDomicilioColonia: jest.fn(() => of()),
      setDomicilioCalle: jest.fn(() => of()),
      setDomicilioNumeroExterior: jest.fn(() => of()),
      setDomicilioNumeroInterior: jest.fn(() => of()),
      setDomicilioLada: jest.fn(() => of()),
      setDomicilioTelefono: jest.fn(() => of()),
      setDomicilioCorreoElectronico: jest.fn(() => of()),
      setTercerosTipoPersona: jest.fn(() => of()),
      setTercerosRFC: jest.fn(() => of()),
      setTercerosCurp: jest.fn(() => of()),
      setTercerosDenominacion: jest.fn(() => of()),
      setTercerosDenominacionNombre: jest.fn(() => of()),
      setTercerosApellidoPaterno: jest.fn(() => of()),
      setTercerosApellidoMaterno: jest.fn(() => of()),
      setTercerosPais: jest.fn(() => of()),
      setTercerosEstado: jest.fn(() => of()),
      setTercerosMunicipio: jest.fn(() => of()),
      setTercerosLocalidad: jest.fn(() => of()),
      setTercerosColonia: jest.fn(() => of()),
      setTercerosCalle: jest.fn(() => of()),
      setTercerosNumeroExterior: jest.fn(() => of()),
      setTercerosNumeroInterior: jest.fn(() => of()),
      setTercerosLada: jest.fn(() => of()),
      setTercerosTelefono: jest.fn(() => of()),
      setTercerosCorreoElectronico: jest.fn(() => of()),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        Service260101Service,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Solicitud260101Store, useValue: storeMock },
      ],
    });
    service = TestBed.inject(Service260101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters with correct values in actualizarEstadoFormulario', () => {
    service.actualizarEstadoFormulario(mockState);

    expect(storeMock.setDenominacion).toHaveBeenCalledWith(
      mockState.denominacion
    );
    expect(storeMock.setDenominacionNombre).toHaveBeenCalledWith(
      mockState.denominacionNombre
    );
    expect(storeMock.setDenominacionApellidoPaterno).toHaveBeenCalledWith(
      mockState.denominacionApellidoPaterno
    );
    expect(storeMock.setDenominacionApellidoMaterno).toHaveBeenCalledWith(
      mockState.denominacionApellidoMaterno
    );
    expect(storeMock.setModificarRFC).toHaveBeenCalledWith(
      mockState.modificarRFC
    );
    expect(storeMock.setClaveDeReferencia).toHaveBeenCalledWith(
      mockState.claveDeReferencia
    );
    expect(storeMock.setCadenaDeDependencia).toHaveBeenCalledWith(
      mockState.cadenaDeDependencia
    );
    expect(storeMock.setBanco).toHaveBeenCalledWith(mockState.banco);
    expect(storeMock.setLiaveDePago).toHaveBeenCalledWith(
      mockState.liaveDePago
    );
    expect(storeMock.setFechaDePago).toHaveBeenCalledWith(
      mockState.fechaDePago
    );
    expect(storeMock.setImporteDePago).toHaveBeenCalledWith(
      mockState.importeDePago
    );
    expect(storeMock.setModificarDestinatario).toHaveBeenCalledWith(
      mockState.modificarDestinatario
    );
    expect(storeMock.setModificarFabricante).toHaveBeenCalledWith(
      mockState.modificarFabricante
    );
    expect(storeMock.setDomicilioPais).toHaveBeenCalledWith(
      mockState.domicilioPais
    );
    expect(storeMock.setDomicilioEstado).toHaveBeenCalledWith(
      mockState.domicilioEstado
    );
    expect(storeMock.setDomicilioMunicipio).toHaveBeenCalledWith(
      mockState.domicilioMunicipio
    );
    expect(storeMock.setDomicilioLocalidad).toHaveBeenCalledWith(
      mockState.domicilioLocalidad
    );
    expect(storeMock.setDomicilioColonia).toHaveBeenCalledWith(
      mockState.domicilioColonia
    );
    expect(storeMock.setTercerosTipoPersona).toHaveBeenCalledWith(
      mockState.tercerosTipoPersona
    );
    expect(storeMock.setTercerosRFC).toHaveBeenCalledWith(
      mockState.tercerosRFC
    );
    expect(storeMock.setTercerosCurp).toHaveBeenCalledWith(
      mockState.tercerosCurp
    );
    expect(storeMock.setTercerosDenominacion).toHaveBeenCalledWith(
      mockState.tercerosDenominacion
    );
    expect(storeMock.setTercerosDenominacionNombre).toHaveBeenCalledWith(
      mockState.tercerosDenominacionNombre
    );
    expect(storeMock.setTercerosApellidoPaterno).toHaveBeenCalledWith(
      mockState.tercerosApellidoPaterno
    );
    expect(storeMock.setTercerosApellidoMaterno).toHaveBeenCalledWith(
      mockState.tercerosApellidoMaterno
    );
    expect(storeMock.setTercerosPais).toHaveBeenCalledWith(
      mockState.tercerosPais
    );
    expect(storeMock.setTercerosEstado).toHaveBeenCalledWith(
      mockState.tercerosEstado
    );
    expect(storeMock.setTercerosMunicipio).toHaveBeenCalledWith(
      mockState.tercerosMunicipio
    );
    expect(storeMock.setTercerosLocalidad).toHaveBeenCalledWith(
      mockState.tercerosLocalidad
    );
    expect(storeMock.setTercerosColonia).toHaveBeenCalledWith(
      mockState.tercerosColonia
    );
    expect(storeMock.setTercerosCalle).toHaveBeenCalledWith(
      mockState.tercerosCalle
    );
    expect(storeMock.setScianSeleccionados).toHaveBeenCalledWith(
      mockState.scianSeleccionados
    );
    expect(storeMock.setMercanciasSeleccionados).toHaveBeenCalledWith(
      mockState.mercanciasSeleccionados
    );
    expect(storeMock.setManifesto).toHaveBeenCalledWith(mockState.manifesto);

    expect(storeMock.setRazonSocial).toHaveBeenCalledWith(
      mockState.razonSocial
    );
    expect(storeMock.setCorreoElectronico).toHaveBeenCalledWith(
      mockState.correoElectronico
    );
    expect(storeMock.setCodigoPostal).toHaveBeenCalledWith(
      mockState.codigoPostal
    );
    expect(storeMock.setFraccionArancelaria).toHaveBeenCalledWith(
      mockState.fraccionArancelaria
    );
    expect(storeMock.setEstado).toHaveBeenCalledWith(mockState.estado);
    expect(storeMock.setMunicipio).toHaveBeenCalledWith(mockState.municipio);
    expect(storeMock.setLocalidad).toHaveBeenCalledWith(mockState.localidad);
    expect(storeMock.setColonia).toHaveBeenCalledWith(mockState.colonia);
    expect(storeMock.setCalle).toHaveBeenCalledWith(mockState.calle);
    expect(storeMock.setLada).toHaveBeenCalledWith(mockState.lada);
    expect(storeMock.setApellidoMeterno).toHaveBeenCalledWith(
      mockState.apellidoMeterno
    );
    expect(storeMock.setTelefono).toHaveBeenCalledWith(mockState.telefono);
    expect(storeMock.setAvisoDeFuncionamiento).toHaveBeenCalledWith(
      mockState.avisoDeFuncionamiento
    );
    expect(storeMock.setLicenciaSanitaria).toHaveBeenCalledWith(
      mockState.licenciaSanitaria
    );
    expect(storeMock.setLiveFreshFrozen).toHaveBeenCalledWith(
      mockState.liveFreshFrozen
    );
    expect(storeMock.setRegimen).toHaveBeenCalledWith(mockState.regimen);
    expect(storeMock.setAduana).toHaveBeenCalledWith(mockState.aduana);
    expect(storeMock.setHacerlos).toHaveBeenCalledWith(mockState.hacerlos);
    expect(storeMock.setRfc).toHaveBeenCalledWith(mockState.rfc);
    expect(storeMock.setLegalRazonSocial).toHaveBeenCalledWith(
      mockState.legalRazonSocial
    );
    expect(storeMock.setApellidoPaterno).toHaveBeenCalledWith(
      mockState.apellidoPaterno
    );
    expect(storeMock.setMercanciasDatos).toHaveBeenCalledWith(
      mockState.mercanciasDatos
    );
    expect(storeMock.setClasificacionProductos).toHaveBeenCalledWith(
      mockState.clasificaionProductos
    );
    expect(storeMock.setTipoPersona).toHaveBeenCalledWith(
      mockState.tipoPersona
    );
    expect(storeMock.setEspecificarProducto).toHaveBeenCalledWith(
      mockState.especificarProducto
    );
    expect(storeMock.setNombreProductoEspecifico).toHaveBeenCalledWith(
      mockState.nombreProductoEspecifico
    );
    expect(storeMock.setMarca).toHaveBeenCalledWith(mockState.marca);
    expect(storeMock.setTipoProducto).toHaveBeenCalledWith(
      mockState.tipoProducto
    );
    expect(storeMock.setDescripcionFraccionArancelaria).toHaveBeenCalledWith(
      mockState.descripcionFraccionArancelaria
    );
    expect(storeMock.setCantidadUMT).toHaveBeenCalledWith(
      mockState.cantidadUMT
    );
    expect(storeMock.setUmt).toHaveBeenCalledWith(mockState.umt);
    expect(storeMock.setCantidadUMC).toHaveBeenCalledWith(
      mockState.cantidadUMC
    );
    expect(storeMock.setUmc).toHaveBeenCalledWith(mockState.umc);
    expect(storeMock.setClaveDeLosLotes).toHaveBeenCalledWith(
      mockState.claveDeLosLotes
    );
    expect(storeMock.setFechaFabricacion).toHaveBeenCalledWith(
      mockState.fechaFabricacion
    );
    expect(storeMock.setFechaCaducidad).toHaveBeenCalledWith(
      mockState.fechaCaducidad
    );
    expect(storeMock.setClavesDeLotes).toHaveBeenCalledWith(
      mockState.clavesDeLotes
    );
  });

  it('should call http.get with correct URL in getRegistroTomaMuestrasMercanciasData', (done) => {
    const expectedUrl =
      'assets/json/260101/registro_toma_muestras_mercancias.json';
    httpClientMock.get.mockReturnValue(of(mockState));

    service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
      expect(data).toEqual(mockState);
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
      done();
    });
  });

  it('should handle empty state in actualizarEstadoFormulario', () => {
    const emptyState: Solicitud260101State = {
      razonSocial: '',
      correoElectronico: '',
      codigoPostal: '',
      estado: 0,
      municipio: '',
      localidad: '',
      colonia: '',
      calle: '',
      lada: 0,
      telefono: 0,
      avisoDeFuncionamiento: false,
      licenciaSanitaria: '',
      liveFreshFrozen: false,
      regimen: 0,
      aduana: 0,
      hacerlos: '',
      rfc: '',
      legalRazonSocial: '',
      apellidoPaterno: '',
      apellidoMeterno: '',
      mercanciasDatos: [],
      manifesto: false,
      clasificaionProductos: '',
      especificarProducto: 0,
      nombreProductoEspecifico: '',
      marca: '',
      tipoProducto: 0,
      fraccionArancelaria: '',
      descripcionFraccionArancelaria: '',
      cantidadUMT: '',
      umt: '',
      cantidadUMC: '',
      umc: 0,
      claveDeLosLotes: '',
      fechaFabricacion: '',
      fechaCaducidad: '',
      clavesDeLotes: [],
      tipoPersona: '',
      modificarRFC: '',
      denominacion: '',
      denominacionNombre: '',
      denominacionApellidoPaterno: '',
      denominacionApellidoMaterno: '',
      domicilioPais: '',
      domicilioEstado: '',
      domicilioMunicipio: '',
      domicilioLocalidad: '',
      domicilioCodigo: '',
      domicilioColonia: '',
      domiciliCalle: '',
      domiciliNumeroExterior: '',
      domiciliNumeroInterior: '',
      domiciliLada: '',
      domiciliTelefono: '',
      domiciliCorreoElectronioco: '',
      tercerosNacionalidad: 0,
      tercerosTipoPersona: 0,
      tercerosRFC: '',
      tercerosCurp: '',
      tercerosDenominacion: '',
      tercerosDenominacionNombre: '',
      tercerosApellidoPaterno: '',
      tercerosApellidoMaterno: '',
      tercerosPais: '',
      tercerosEstado: '',
      tercerosMunicipio: '',
      tercerosLocalidad: '',
      tercerosCodigo: '',
      tercerosColonia: '',
      tercerosCalle: '',
      tercerosNumeroExterior: '',
      tercerosNumeroInterior: '',
      tercerosLada: '',
      tercerosTelefono: '',
      tercerosCorreoElectronico: '',
      destinatarioDatos: [],
      claveDeReferencia: '',
      cadenaDeDependencia: '',
      banco: 0,
      liaveDePago: '',
      fechaDePago: '',
      importeDePago: '',
      modificarDestinatario: false,
      modificarFabricante: false,
      scianSeleccionados: [],
      mercanciasSeleccionados: [],
    };
    service.actualizarEstadoFormulario(emptyState);

    expect(storeMock.setRazonSocial).toHaveBeenCalledWith('');
    expect(storeMock.setCorreoElectronico).toHaveBeenCalledWith('');
    expect(storeMock.setCantidadUMT).toHaveBeenCalledWith('');
    expect(storeMock.setClavesDeLotes).toHaveBeenCalledWith([]);
  });

  it('should propagate errors from http.get in getRegistroTomaMuestrasMercanciasData', (done) => {
    const errorResponse = new Error('Network error');
    httpClientMock.get.mockReturnValue(throwError(() => errorResponse));

    service.getRegistroTomaMuestrasMercanciasData().subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toBe(errorResponse);
        done();
      },
    });
  });
});
