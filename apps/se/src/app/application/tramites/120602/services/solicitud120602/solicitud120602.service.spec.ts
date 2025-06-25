import { TestBed } from '@angular/core/testing';
import { Solicitud120602Service } from './solicitud120602.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite120602Store } from '../../../../estados/tramites/tramite120602.store';

describe('Solicitud120602Service', () => {
  let service: Solicitud120602Service;
  let httpMock: HttpTestingController;
  let tramite120602StoreMock: any;

  beforeEach(() => {
    tramite120602StoreMock = {
      setEstado: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setTipoEmpresa: jest.fn(),
      setEspecifique: jest.fn(),
      setActividadEconomicaPreponderante: jest.fn(),
      setDescripcion: jest.fn(),
      setPais: jest.fn(),
      setCodigoPostal: jest.fn(),
      setEstadoDomicilio: jest.fn(),
      setMunicipioAlcaldia: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setNumeroExterior: jest.fn(),
      setNumeroInterior: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setNacionalidad: jest.fn(),
      setTipoDePersona: jest.fn(),
      setTaxId: jest.fn(),
      setDenominacion: jest.fn(),
      setDatosPais: jest.fn(),
      setDatosCodigoPostal: jest.fn(),
      setDatosEstado: jest.fn(),
      setCorreoElectronico: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite120602Store, useValue: tramite120602StoreMock }
      ]
    });

    service = TestBed.inject(Solicitud120602Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener los datos de la empresa para la solicitud', () => {
    const mockResponse = { estado: 'CDMX' };
    service.getEmpresaSolicitudData().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120602/empresa-solicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe actualizar el store con los DATOS proporcionados en actualizarEstadoFormulario', () => {
    const datos: any = {
      estado: 'CDMX',
      representacionFederal: 'Federal',
      tipoEmpresa: 'SA',
      especifique: 'Especifique',
      actividadEconomicaPreponderante: 'Comercio',
      descripcion: 'Desc',
      pais: 'MX',
      codigoPostal: '12345',
      estadoDomicilio: 'CDMX',
      municipioAlcaldia: 'Benito Juarez',
      localidad: 'Centro',
      colonia: 'Roma',
      calle: 'Insurgentes',
      numeroExterior: '100',
      numeroInterior: '10',
      lada: '55',
      telefono: '12345678',
      nacionalidad: 'Mexicana',
      tipoDePersona: 'Moral',
      taxId: 'TAX123',
      denominacion: 'Empresa SA',
      datosPais: 'MX',
      datosCodigoPostal: '12345',
      datosEstado: 'CDMX',
      correoElectronico: 'test@mail.com'
    };

    service.actualizarEstadoFormulario(datos);

    expect(tramite120602StoreMock.setEstado).toHaveBeenCalledWith('CDMX');
    expect(tramite120602StoreMock.setRepresentacionFederal).toHaveBeenCalledWith('Federal');
    expect(tramite120602StoreMock.setTipoEmpresa).toHaveBeenCalledWith('SA');
    expect(tramite120602StoreMock.setEspecifique).toHaveBeenCalledWith('Especifique');
    expect(tramite120602StoreMock.setActividadEconomicaPreponderante).toHaveBeenCalledWith('Comercio');
    expect(tramite120602StoreMock.setDescripcion).toHaveBeenCalledWith('Desc');
    expect(tramite120602StoreMock.setPais).toHaveBeenCalledWith('MX');
    expect(tramite120602StoreMock.setCodigoPostal).toHaveBeenCalledWith('12345');
    expect(tramite120602StoreMock.setEstadoDomicilio).toHaveBeenCalledWith('CDMX');
    expect(tramite120602StoreMock.setMunicipioAlcaldia).toHaveBeenCalledWith('Benito Juarez');
    expect(tramite120602StoreMock.setLocalidad).toHaveBeenCalledWith('Centro');
    expect(tramite120602StoreMock.setColonia).toHaveBeenCalledWith('Roma');
    expect(tramite120602StoreMock.setCalle).toHaveBeenCalledWith('Insurgentes');
    expect(tramite120602StoreMock.setNumeroExterior).toHaveBeenCalledWith('100');
    expect(tramite120602StoreMock.setNumeroInterior).toHaveBeenCalledWith('10');
    expect(tramite120602StoreMock.setLada).toHaveBeenCalledWith('55');
    expect(tramite120602StoreMock.setTelefono).toHaveBeenCalledWith('12345678');
    expect(tramite120602StoreMock.setNacionalidad).toHaveBeenCalledWith('Mexicana');
    expect(tramite120602StoreMock.setTipoDePersona).toHaveBeenCalledWith('Moral');
    expect(tramite120602StoreMock.setTaxId).toHaveBeenCalledWith('TAX123');
    expect(tramite120602StoreMock.setDenominacion).toHaveBeenCalledWith('Empresa SA');
    expect(tramite120602StoreMock.setDatosPais).toHaveBeenCalledWith('MX');
    expect(tramite120602StoreMock.setDatosCodigoPostal).toHaveBeenCalledWith('12345');
    expect(tramite120602StoreMock.setDatosEstado).toHaveBeenCalledWith('CDMX');
    expect(tramite120602StoreMock.setCorreoElectronico).toHaveBeenCalledWith('test@mail.com');
  });

  it('debe llamar a los setters del store con valores por defecto si faltan campos opcionales', () => {
    const datos: any = {
      estado: 'CDMX',
      representacionFederal: 'Federal',
      // tipoEmpresa, especifique, datosPais, datosCodigoPostal, datosEstado faltan
    };

    service.actualizarEstadoFormulario(datos);

    expect(tramite120602StoreMock.setTipoEmpresa).toHaveBeenCalledWith('');
    expect(tramite120602StoreMock.setDatosPais).toHaveBeenCalledWith('');
    expect(tramite120602StoreMock.setDatosCodigoPostal).toHaveBeenCalledWith('');
    expect(tramite120602StoreMock.setDatosEstado).toHaveBeenCalledWith('');
  });
});