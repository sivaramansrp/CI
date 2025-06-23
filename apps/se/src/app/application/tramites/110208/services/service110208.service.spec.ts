import { TestBed } from '@angular/core/testing';
import { Solocitud110208Service } from './service110208.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite110208Store } from '../../../estados/tramites/tramite110208.store';
import { Solicitud110208State } from '../../../estados/tramites/tramite110208.store';

describe('Solocitud110208Service', () => {
  let service: Solocitud110208Service;
  let httpMock: HttpTestingController;
  let tramite110208StoreMock: any;

  beforeEach(() => {
    tramite110208StoreMock = {
      setEntidadFederativa: jest.fn(),
      setBloque: jest.fn(),
      setFraccionArancelariaForm: jest.fn(),
      setRegistroProductoForm: jest.fn(),
      setNombreComercialForm: jest.fn(),
      setFechaInicio: jest.fn(),
      setFechaFinal: jest.fn(),
      setTercerOperador: jest.fn(),
      setMarca: jest.fn(),
      setUmc: jest.fn(),
      setCantidad: jest.fn(),
      setValorDeLa: jest.fn(),
      setComplementoDescripcion: jest.fn(),
      setNFactura: jest.fn(),
      setTipoDeFactura: jest.fn(),
      setFechaFactura: jest.fn(),
      setNombres: jest.fn(),
      setPrimerApellido: jest.fn(),
      setSegundoApellido: jest.fn(),
      setNumeroFiscal: jest.fn(),
      setRazonSocial: jest.fn(),
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setPaisDestino: jest.fn(),
      setMedioTransporte: jest.fn(),
      setRutaCompleta: jest.fn(),
      setPuertoDeEmbarque: jest.fn(),
      setPuertoDeDesembarque: jest.fn(),
      setObservaciones: jest.fn(),
      setIdioma: jest.fn(),
      setEntidadFederativaCertificado: jest.fn(),
      setRepresentacionFederal: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite110208Store, useValue: tramite110208StoreMock }
      ]
    });

    service = TestBed.inject(Solocitud110208Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update store with provided DATOS in actualizarEstadoFormulario', () => {
    const datos: Solicitud110208State = {
      entidadFederativa: 'A',
      bloque: 'B',
      fraccionArancelariaForm: 'C',
      registroProductoForm: 'D',
      nombreComercialForm: 'E',
      fechaInicio: '2023-01-01',
      fechaFinal: '2023-12-31',
      tercerOperador: 'F',
      marca: 'G',
      umc: 'H',
      cantidad: '10',
      valorDeLa: '100',
      complementoDescripcion: 'I',
      nFactura: 'J',
      tipoDeFactura: 'K',
      fechaFactura: '2023-06-01',
      nombres: 'L',
      primerApellido: 'M',
      segundoApellido: 'N',
      numeroFiscal: 'O',
      razonSocial: 'P',
      ciudad: 'Q',
      calle: 'R',
      numeroLetra: 'S',
      lada: 'T',
      telefono: 'U',
      fax: 'V',
      correoElectronico: 'W',
      paisDestino: 'X',
      medioTransporte: 'Y',
      rutaCompleta: 'Z',
      puertoDeEmbarque: 'AA',
      puertoDeDesembarque: 'AB',
      observaciones: 'AC',
      idioma: 'AD',
      entidadFederativaCertificado: 'AE',
      representacionFederal: 'AF'
    };

    service.actualizarEstadoFormulario(datos);

    expect(tramite110208StoreMock.setEntidadFederativa).toHaveBeenCalledWith('A');
    expect(tramite110208StoreMock.setBloque).toHaveBeenCalledWith('B');
    expect(tramite110208StoreMock.setFraccionArancelariaForm).toHaveBeenCalledWith('C');
    expect(tramite110208StoreMock.setRegistroProductoForm).toHaveBeenCalledWith('D');
    expect(tramite110208StoreMock.setNombreComercialForm).toHaveBeenCalledWith('E');
    expect(tramite110208StoreMock.setFechaInicio).toHaveBeenCalledWith('2023-01-01');
    expect(tramite110208StoreMock.setFechaFinal).toHaveBeenCalledWith('2023-12-31');
    expect(tramite110208StoreMock.setTercerOperador).toHaveBeenCalledWith('F');
    expect(tramite110208StoreMock.setMarca).toHaveBeenCalledWith('G');
    expect(tramite110208StoreMock.setUmc).toHaveBeenCalledWith('H');
    expect(tramite110208StoreMock.setCantidad).toHaveBeenCalledWith('10');
    expect(tramite110208StoreMock.setValorDeLa).toHaveBeenCalledWith('100');
    expect(tramite110208StoreMock.setComplementoDescripcion).toHaveBeenCalledWith('I');
    expect(tramite110208StoreMock.setNFactura).toHaveBeenCalledWith('J');
    expect(tramite110208StoreMock.setTipoDeFactura).toHaveBeenCalledWith('K');
    expect(tramite110208StoreMock.setFechaFactura).toHaveBeenCalledWith('2023-06-01');
    expect(tramite110208StoreMock.setNombres).toHaveBeenCalledWith('L');
    expect(tramite110208StoreMock.setPrimerApellido).toHaveBeenCalledWith('M');
    expect(tramite110208StoreMock.setSegundoApellido).toHaveBeenCalledWith('N');
    expect(tramite110208StoreMock.setNumeroFiscal).toHaveBeenCalledWith('O');
    expect(tramite110208StoreMock.setRazonSocial).toHaveBeenCalledWith('P');
    expect(tramite110208StoreMock.setCiudad).toHaveBeenCalledWith('Q');
    expect(tramite110208StoreMock.setCalle).toHaveBeenCalledWith('R');
    expect(tramite110208StoreMock.setNumeroLetra).toHaveBeenCalledWith('S');
    expect(tramite110208StoreMock.setLada).toHaveBeenCalledWith('T');
    expect(tramite110208StoreMock.setTelefono).toHaveBeenCalledWith('U');
    expect(tramite110208StoreMock.setFax).toHaveBeenCalledWith('V');
    expect(tramite110208StoreMock.setCorreoElectronico).toHaveBeenCalledWith('W');
    expect(tramite110208StoreMock.setPaisDestino).toHaveBeenCalledWith('X');
    expect(tramite110208StoreMock.setMedioTransporte).toHaveBeenCalledWith('Y');
    expect(tramite110208StoreMock.setRutaCompleta).toHaveBeenCalledWith('Z');
    expect(tramite110208StoreMock.setPuertoDeEmbarque).toHaveBeenCalledWith('AA');
    expect(tramite110208StoreMock.setPuertoDeDesembarque).toHaveBeenCalledWith('AB');
    expect(tramite110208StoreMock.setObservaciones).toHaveBeenCalledWith('AC');
    expect(tramite110208StoreMock.setIdioma).toHaveBeenCalledWith('AD');
    expect(tramite110208StoreMock.setEntidadFederativaCertificado).toHaveBeenCalledWith('AE');
    expect(tramite110208StoreMock.setRepresentacionFederal).toHaveBeenCalledWith('AF');
  });

  it('should fetch registro toma muestras mercancias data', () => {
    const mockResponse = { campo: 'valor' };
    service.getRegistroTomaMuestrasMercanciasData().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/110208/registro_toma_muestras_mercancias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});