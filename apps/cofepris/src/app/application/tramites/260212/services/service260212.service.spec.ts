import { TestBed } from '@angular/core/testing';
import { Service260212Service } from './service260212.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite260212Store } from '../estados/tramite260212.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { Terceros260211Store } from '../../../estados/tramites/terceros260211.store';

describe('Service260212Service', () => {
  let service: Service260212Service;
  let httpMock: HttpTestingController;
  let tramite260212StoreMock: jest.Mocked<Tramite260212Store>;
  let terceros260211StoreMock: jest.Mocked<Terceros260211Store>;

  beforeEach(() => {
    tramite260212StoreMock = {
      setSelectedEstado: jest.fn(),
      setClave: jest.fn(),
      setDescripcion: jest.fn(),
      setDespecificarClasificacion: jest.fn(),
      setBanco: jest.fn(),
      setRfcDelResponsableSanitario: jest.fn(),
      setDenominacionRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setCodigoPostal: jest.fn(),
      setRegimen: jest.fn(),
      setEntradas: jest.fn(),
      setClaveDeReferncia: jest.fn(),
      setCadenaDeLaDependencia: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
      setLosDatos :jest.fn(),
      setRfc : jest.fn(),
      setNombre : jest.fn(),
      setPrimerApellido : jest.fn(),
      setSegundoApellido :jest.fn(),
      setAvisoclave :jest.fn(),
      setNoLicenciaSanitaria : jest.fn(),
    } as any;

    terceros260211StoreMock = {
      setTercerosNacionalidad: jest.fn(),
      setTipoPersona: jest.fn(),
      setRfc: jest.fn(),
      setNombre: jest.fn(),
      setPrimerApellido: jest.fn(),
      setSegundoApellido: jest.fn(),
      setCurp: jest.fn(),
      setDenominacionRazonSocial: jest.fn(),
      setPais: jest.fn(),
      setEstadoLocalidad: jest.fn(),
      setMunicipioAlcaldia: jest.fn(),
      setLocalidad: jest.fn(),
      setCodigoPostaloEquivalente: jest.fn(),
      setColonia: jest.fn(),
      setExtranjeroEstado: jest.fn(),
      setExtranjeroCodigo: jest.fn(),
      setExtranjeroColonia: jest.fn(),
      setCalle: jest.fn(),
      setNumeroExterior: jest.fn(),
      setNumeroInterior: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setColoniaoEquivalente: jest.fn(),
      setColoniaoEquivalenteLabel: jest.fn(),
      setCodigoPostaloEquivalentes: jest.fn(),
      setEstado: jest.fn(),
      setEntidadFederativa: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Service260212Service,
        { provide: Tramite260212Store, useValue: tramite260212StoreMock },
        { provide: Terceros260211Store, useValue: terceros260211StoreMock }
      ]
    });

    service = TestBed.inject(Service260212Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería tener las URLs correctas del ENVIRONMENT', () => {
    expect(service.urlServer).toBe(ENVIRONMENT.URL_SERVER);
    expect(service.urlServerCatalogos).toBe(ENVIRONMENT.URL_SERVER_JSON_AUXILIAR);
  });

  it('debería llamar a todos los setters del store en actualizarEstadoFormulario', () => {
    const datos: any = {
      estado: 'estado',
      selectedClave: 'clave',
      selectedDescripcion: 'desc',
      selecteDespecificarClasificacion: 'clasif',
      banco: 'banco',
      rfcDelResponsableSanitario: 'rfc',
      denominacionRazonSocial: 'denom',
      correoElectronico: 'correo',
      municipio: 'mun',
      localidad: 'loc',
      colonia: 'col',
      calle: 'calle',
      lada: 'lada',
      teléfono: 'tel',
      codigoPostal: 'cp',
      regimen: 'reg',
      entradas: 'ent',
      ClaveDeReferncia: 'claveRef',
      CadenaDeLaDependencia: 'cadena',
      llaveDePago: 'llave',
      setFechaDePago: 'fecha',
      importeDePago: 123
    };

    service.actualizarEstadoFormulario(datos);

    expect(tramite260212StoreMock.setSelectedEstado).toHaveBeenCalledWith('estado');
    expect(tramite260212StoreMock.setClave).toHaveBeenCalledWith('clave');
    expect(tramite260212StoreMock.setDescripcion).toHaveBeenCalledWith('desc');
    expect(tramite260212StoreMock.setDespecificarClasificacion).toHaveBeenCalledWith('clasif');
    expect(tramite260212StoreMock.setBanco).toHaveBeenCalledWith('banco');
    expect(tramite260212StoreMock.setRfcDelResponsableSanitario).toHaveBeenCalledWith('rfc');
    expect(tramite260212StoreMock.setDenominacionRazonSocial).toHaveBeenCalledWith('denom');
    expect(tramite260212StoreMock.setCorreoElectronico).toHaveBeenCalledWith('correo');
    expect(tramite260212StoreMock.setMunicipio).toHaveBeenCalledWith('mun');
    expect(tramite260212StoreMock.setLocalidad).toHaveBeenCalledWith('loc');
    expect(tramite260212StoreMock.setColonia).toHaveBeenCalledWith('col');
    expect(tramite260212StoreMock.setCalle).toHaveBeenCalledWith('calle');
    expect(tramite260212StoreMock.setLada).toHaveBeenCalledWith('lada');
    expect(tramite260212StoreMock.setTelefono).toHaveBeenCalledWith('tel');
    expect(tramite260212StoreMock.setCodigoPostal).toHaveBeenCalledWith('cp');
    expect(tramite260212StoreMock.setRegimen).toHaveBeenCalledWith('reg');
    expect(tramite260212StoreMock.setEntradas).toHaveBeenCalledWith('ent');
    expect(tramite260212StoreMock.setClaveDeReferncia).toHaveBeenCalledWith('claveRef');
    expect(tramite260212StoreMock.setCadenaDeLaDependencia).toHaveBeenCalledWith('cadena');
    expect(tramite260212StoreMock.setLlaveDePago).toHaveBeenCalledWith('llave');
    expect(tramite260212StoreMock.setFechaDePago).toHaveBeenCalledWith('fecha');
    expect(tramite260212StoreMock.setImporteDePago).toHaveBeenCalledWith(123);
  });

  it('debería obtener los datos de registro toma muestras mercancias', () => {
    const mockData = { foo: 'bar' };
    service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
      expect(data).toEqual(mockData as any);
    });
    const req = httpMock.expectOne('assets/json/260212/consulta.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debería llamar a los setters restantes en actualizarEstadoFormulario', () => {
    const datos: any = {
      losDatos: 'datos',
      rfc: 'rfc',
      nombre: 'nombre',
      primerApellido: 'apellido1',
      segundoApellido: 'apellido2',
      avisoclave: 'claveAviso',
      noLicenciaSanitaria: 'licencia'
    };

    service.actualizarEstadoFormulario(datos);

    expect(tramite260212StoreMock.setLosDatos).toHaveBeenCalledWith('datos');
    expect(tramite260212StoreMock.setRfc).toHaveBeenCalledWith('rfc');
    expect(tramite260212StoreMock.setNombre).toHaveBeenCalledWith('nombre');
    expect(tramite260212StoreMock.setPrimerApellido).toHaveBeenCalledWith('apellido1');
    expect(tramite260212StoreMock.setSegundoApellido).toHaveBeenCalledWith('apellido2');
    expect(tramite260212StoreMock.setAvisoclave).toHaveBeenCalledWith('claveAviso');
    expect(tramite260212StoreMock.setNoLicenciaSanitaria).toHaveBeenCalledWith('licencia');
  });

  it('debería llamar a todos los setters del store en actualizarEstadoTercerosFormulario', () => {
    const datos: any = {
      tercerosNacionalidad: 'nacional',
      tipoPersona: 'fisica',
      rfc: 'RFC123',
      nombre: 'Nombre',
      primerApellido: 'Apellido1',
      segundoApellido: 'Apellido2',
      curp: 'CURP123',
      denominacionRazonSocial: 'Denominacion',
      pais: 'México',
      estadoLocalidad: 'CDMX',
      municipioAlcaldia: 'Benito Juárez',
      localidad: 'Del Valle',
      codigoPostaloEquivalente: '03100',
      colonia: 'Colonia',
      extranjeroEstado: 'TX',
      extranjeroCodigo: '75000',
      extranjeroColonia: 'Downtown',
      calle: 'Insurgentes',
      numeroExterior: '100',
      numeroInterior: '202',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'email@example.com',
      coloniaoEquivalente: 'EquivCol',
      coloniaoEquivalenteLabel: 'EquivLabel',
      codigoPostaloEquivalentes: '99999',
      estado: 'Estado',
      entidadFederativa: 'CDMX'
    };

    service.actualizarEstadoTercerosFormulario(datos);

    expect(terceros260211StoreMock.setRfc).toHaveBeenCalledWith('RFC123');
    expect(terceros260211StoreMock.setNombre).toHaveBeenCalledWith('Nombre');
    expect(terceros260211StoreMock.setCorreoElectronico).toHaveBeenCalledWith('email@example.com');
    expect(terceros260211StoreMock.setCalle).toHaveBeenCalledWith('Insurgentes');
  });

  it('debería obtener los datos de terceros', () => {
    const mockData = { rfc: 'XAXX010101000' };
    service.getTercerosData().subscribe(data => {
      expect(data).toEqual(mockData as any);
    });
    const req = httpMock.expectOne('assets/json/260212/tercerosdata.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
  
});