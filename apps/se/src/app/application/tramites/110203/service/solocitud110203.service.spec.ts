import { TestBed } from '@angular/core/testing';
import { Solocitud110203Service } from './service110203.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Solicitud110203State } from '../../../estados/tramites/tramite110203.store';
import { Tramite110203Store } from '../../../estados/tramites/tramite110203.store';

describe('Solocitud110203Service', () => {
  let service: Solocitud110203Service;
  let httpClientMock: jest.Mocked<HttpClient>;
  let tramiteStoreMock: jest.Mocked<Tramite110203Store>;

  const MOCK_DATA: Solicitud110203State = {
    tratado: 'TLC',
    bloque: 'NAFTA',
    origen: 'México',
    destino: 'Canadá',
    expedicion: '2024-01-01',
    vencimiento: '2025-01-01',
    nombre: 'Juan',
    primer: 'Pérez',
    segundo: 'García',
    fiscal: 'RFC123456',
    razon: 'Empresa SA de CV',
    calle: 'Insurgentes',
    letra: 'A',
    ciudad: 'CDMX',
    correo: 'juan@empresa.com',
    fax: '5555555',
    telefono: '5551234567',
    medio: 'correo',
    observaciones: 'Ninguna',
    precisa: 'Descripción detallada',
    presenta: 'Representante',
    valorSeleccionado: 'Valor X',
    numeroDeCertificado: 'CERT-001',
    tratadoAcuerdo: 'TLCAN',
    paisBloque: 'Norteamérica',
    medida: 'kg',
    comercializacion: 'Exportación',
    tipo: 'Temporal'
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as unknown as jest.Mocked<HttpClient>;

    tramiteStoreMock = {
      setTratado: jest.fn(),
      setBloque: jest.fn(),
      setOrigen: jest.fn(),
      setDestino: jest.fn(),
      setExpedicion: jest.fn(),
      setVencimiento: jest.fn(),
      setNombre: jest.fn(),
      setPrimer: jest.fn(),
      setSegundo: jest.fn(),
      setFiscal: jest.fn(),
      setRazon: jest.fn(),
      setCalle: jest.fn(),
      setLetra: jest.fn(),
      setCiudad: jest.fn(),
      setCorreo: jest.fn(),
      setFax: jest.fn(),
      setTelefono: jest.fn(),
      setMedio: jest.fn(),
      setObservaciones: jest.fn(),
      setPrecisa: jest.fn(),
      setPresenta: jest.fn(),
      setValorSeleccionado: jest.fn(),
      setNumeroDeCertificado: jest.fn(),
      setTratadoAcuerdo: jest.fn(),
      setPaisBloque: jest.fn(),
      setMedida: jest.fn(),
      setComercializacion: jest.fn(),
      setTipo: jest.fn(),
    } as unknown as jest.Mocked<Tramite110203Store>;

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Tramite110203Store, useValue: tramiteStoreMock }
      ]
    });

    service = TestBed.inject(Solocitud110203Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters when actualizarEstadoFormulario is called', () => {
    service.actualizarEstadoFormulario(MOCK_DATA);

    expect(tramiteStoreMock.setTratado).toHaveBeenCalledWith(MOCK_DATA.tratado);
    expect(tramiteStoreMock.setBloque).toHaveBeenCalledWith(MOCK_DATA.bloque);
    expect(tramiteStoreMock.setOrigen).toHaveBeenCalledWith(MOCK_DATA.origen);
    expect(tramiteStoreMock.setDestino).toHaveBeenCalledWith(MOCK_DATA.destino);
    expect(tramiteStoreMock.setExpedicion).toHaveBeenCalledWith(MOCK_DATA.expedicion);
    expect(tramiteStoreMock.setVencimiento).toHaveBeenCalledWith(MOCK_DATA.vencimiento);
    expect(tramiteStoreMock.setNombre).toHaveBeenCalledWith(MOCK_DATA.nombre);
    expect(tramiteStoreMock.setPrimer).toHaveBeenCalledWith(MOCK_DATA.primer);
    expect(tramiteStoreMock.setSegundo).toHaveBeenCalledWith(MOCK_DATA.segundo);
    expect(tramiteStoreMock.setFiscal).toHaveBeenCalledWith(MOCK_DATA.fiscal);
    expect(tramiteStoreMock.setRazon).toHaveBeenCalledWith(MOCK_DATA.razon);
    expect(tramiteStoreMock.setCalle).toHaveBeenCalledWith(MOCK_DATA.calle);
    expect(tramiteStoreMock.setLetra).toHaveBeenCalledWith(MOCK_DATA.letra);
    expect(tramiteStoreMock.setCiudad).toHaveBeenCalledWith(MOCK_DATA.ciudad);
    expect(tramiteStoreMock.setCorreo).toHaveBeenCalledWith(MOCK_DATA.correo);
    expect(tramiteStoreMock.setFax).toHaveBeenCalledWith(MOCK_DATA.fax);
    expect(tramiteStoreMock.setTelefono).toHaveBeenCalledWith(MOCK_DATA.telefono);
    expect(tramiteStoreMock.setMedio).toHaveBeenCalledWith(MOCK_DATA.medio);
    expect(tramiteStoreMock.setObservaciones).toHaveBeenCalledWith(MOCK_DATA.observaciones);
    expect(tramiteStoreMock.setPrecisa).toHaveBeenCalledWith(MOCK_DATA.precisa);
    expect(tramiteStoreMock.setPresenta).toHaveBeenCalledWith(MOCK_DATA.presenta);
    expect(tramiteStoreMock.setValorSeleccionado).toHaveBeenCalledWith(MOCK_DATA.valorSeleccionado);
    expect(tramiteStoreMock.setNumeroDeCertificado).toHaveBeenCalledWith(MOCK_DATA.numeroDeCertificado);
    expect(tramiteStoreMock.setTratadoAcuerdo).toHaveBeenCalledWith(MOCK_DATA.tratadoAcuerdo);
    expect(tramiteStoreMock.setPaisBloque).toHaveBeenCalledWith(MOCK_DATA.paisBloque);
    expect(tramiteStoreMock.setMedida).toHaveBeenCalledWith(MOCK_DATA.medida);
    expect(tramiteStoreMock.setComercializacion).toHaveBeenCalledWith(MOCK_DATA.comercializacion);
    expect(tramiteStoreMock.setTipo).toHaveBeenCalledWith(MOCK_DATA.tipo);
  });

  it('should call HttpClient.get when getRegistroTomaMuestrasMercanciasData is called', (done) => {
    httpClientMock.get.mockReturnValue(of(MOCK_DATA));

    service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
      expect(data).toEqual(MOCK_DATA);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/110203/serviciosExtraordinarios.json');
      done();
    });
  });
});
