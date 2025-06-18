import { TestBed } from '@angular/core/testing';
import { SolicitudPantallasService } from './solicitud-pantallas.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Solicitud220502Store } from '../estados/tramites220502.store';
import {
  CargarDatosIniciales,
  DatosDeLaSolicitud,
  DatosDelTramiteRealizar,
  TipoContenedor
} from '../models/solicitud-pantallas.model';
import { of } from 'rxjs';

describe('SolicitudPantallasService', () => {
  let service: SolicitudPantallasService;
  let httpMock: HttpTestingController;
  let storeSpy: jest.Mocked<Solicitud220502Store>;

  beforeEach(() => {
    const spy = {
      setCertificadosAutorizados: jest.fn(()=> of()),
      setHoraDeInspeccion: jest.fn(()=> of()),
      setAduanaDeIngreso: jest.fn(()=> of()),
      setSanidadAgropecuaria: jest.fn(()=> of()),
      setPuntoDeInspeccion: jest.fn(()=> of()),
      setFechaDeInspeccion: jest.fn(()=> of()),
      setNombre: jest.fn(()=> of()),
      setPrimerapellido: jest.fn(()=> of()),
      setSegundoapellido: jest.fn(()=> of()),
      setMercancia: jest.fn(()=> of()),
      setTipocontenedor: jest.fn(()=> of()),
      setTransporteIdMedio: jest.fn(()=> of()),
      setIdentificacionTransporte: jest.fn(()=> of())
    } as unknown as jest.Mocked<Solicitud220502Store>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolicitudPantallasService,
        { provide: Solicitud220502Store, useValue: spy }
      ]
    });

    service = TestBed.inject(SolicitudPantallasService);
    httpMock = TestBed.inject(HttpTestingController);
    storeSpy = TestBed.inject(Solicitud220502Store) as jest.Mocked<Solicitud220502Store>;
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData() in constructor', () => {
    httpMock.match('../../../assets/json/220502/solicitud-pantallas-mock-data.json');
  });

  it('should fetch CargarDatosIniciales with getData()', (done) => {
    const mockData: CargarDatosIniciales = {} as any;
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('../../../assets/json/220502/solicitud-pantallas-mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch DatosDelTramiteRealizar with getDataDatosDelTramite()', (done) => {
    const mockData: DatosDelTramiteRealizar = {} as any;
    service.getDataDatosDelTramite().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('../../../assets/json/220502/solicitud-pantallas-mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch TipoContenedor with getDataResponsableInspeccion()', (done) => {
    const mockData: TipoContenedor = {} as any;
    service.getDataResponsableInspeccion().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('../../../assets/json/220502/solicitud-pantallas-mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch DatosDeLaSolicitud with getDatosDeLaSolicitud()', (done) => {
    const mockData: DatosDeLaSolicitud = {} as any;
    service.getDatosDeLaSolicitud().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('assets/json/220502/datos-de-la-solicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update store with actualizarEstadoFormulario()', () => {
    const datos: DatosDeLaSolicitud = {
      certificadosAutorizados: 'cert',
      horaDeInspeccion: '10:00',
      aduanaDeIngreso: 'aduana',
      sanidadAgropecuaria: 'sanidad',
      puntoDeInspeccion: 'punto',
      fechaDeInspeccion: '2024-01-01',
      nombre: 'Juan',
      primerapellido: 'Perez',
      segundoapellido: 'Lopez',
      mercancia: 'mercancia',
      tipocontenedor: 'contenedor',
      transporteIdMedio: 'transporte',
      identificacionTransporte: 'id'
    } as any;

    service.actualizarEstadoFormulario(datos);

    expect(storeSpy.setCertificadosAutorizados).toHaveBeenCalledWith(datos.certificadosAutorizados);
    expect(storeSpy.setHoraDeInspeccion).toHaveBeenCalledWith(datos.horaDeInspeccion);
    expect(storeSpy.setAduanaDeIngreso).toHaveBeenCalledWith(datos.aduanaDeIngreso);
    expect(storeSpy.setSanidadAgropecuaria).toHaveBeenCalledWith(datos.sanidadAgropecuaria);
    expect(storeSpy.setPuntoDeInspeccion).toHaveBeenCalledWith(datos.puntoDeInspeccion);
    expect(storeSpy.setFechaDeInspeccion).toHaveBeenCalledWith(datos.fechaDeInspeccion);
    expect(storeSpy.setNombre).toHaveBeenCalledWith(datos.nombre);
    expect(storeSpy.setPrimerapellido).toHaveBeenCalledWith(datos.primerapellido);
    expect(storeSpy.setSegundoapellido).toHaveBeenCalledWith(datos.segundoapellido);
    expect(storeSpy.setMercancia).toHaveBeenCalledWith(datos.mercancia);
    expect(storeSpy.setTipocontenedor).toHaveBeenCalledWith(datos.tipocontenedor);
    expect(storeSpy.setTransporteIdMedio).toHaveBeenCalledWith(datos.transporteIdMedio);
    expect(storeSpy.setIdentificacionTransporte).toHaveBeenCalledWith(datos.identificacionTransporte);
  });
});