import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RegistroService } from './registro.service';
import { Tramite110207Store } from '../state/Tramite110207.store';

describe('RegistroService', () => {
  let service: RegistroService;
  let httpMock: any;
  let storeMock: any;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    };
    storeMock = {
      setTratado: jest.fn(),
      setPais: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setNumRegistro: jest.fn(),
      setNomComercial: jest.fn(),
      setFechInicioB: jest.fn(),
      setFechFinB: jest.fn(),
      setArchivo: jest.fn(),
      setObservaciones: jest.fn(),
      setPresica: jest.fn(),
      setPresenta: jest.fn(),
      setIdioma: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPrimer: jest.fn(),
      setApellidoSegundo: jest.fn(),
      setNumeroFiscal: jest.fn(),
      setRazonSocial: jest.fn(),
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setNacion: jest.fn(),
      setTransporte: jest.fn(),
      setfraccionMercanArancelaria: jest.fn(),
      setnombretecnico: jest.fn(),
      setnomreeningles: jest.fn(),
      setcriterioparaconferir: jest.fn(),
      setmarca: jest.fn(),
      setcantidad: jest.fn(),
      setUMC: jest.fn(),
      setvalordelamercancia: jest.fn(),
      setcomplementodeladescripcion: jest.fn(),
      setmasabruta: jest.fn(),
      setnombrecomercialdelamercancia: jest.fn(),
      setUnidadMedida: jest.fn(),
      setTipoFactura: jest.fn(),
      setFecha: jest.fn(),
      setNFactura: jest.fn(),
      setJustificacion: jest.fn(),
      setCheckbox: jest.fn(),
      setEstablecerSiCasilla: jest.fn(),
      setRutaCompleta: jest.fn(),
      setPuertoEmbarque: jest.fn(),
      setPuertoDesembarque: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        RegistroService,
        { provide: HttpClient, useValue: httpMock },
        { provide: Tramite110207Store, useValue: storeMock }
      ]
    });
    service = TestBed.inject(RegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update all store values in actualizarEstadoFormulario', () => {
    const datos: any = {
      tratado: 1, pais: 2, fraccionArancelaria: 3, numeroRegistro: 4, nombreComercial: 5, fechaInicial: 6, fechaFinal: 7, archivo: 8, observaciones: 9, presica: 10, presenta: 11, idioma: 12, entidad: 13, representacion: 14, nombre: 15, apellidoPrimer: 16, apellidoSegundo: 17, numeroFiscal: 18, razonSocial: 19, ciudad: 20, calle: 21, numeroLetra: 22, lada: 23, telefono: 24, fax: 25, correoElectronico: 26, nacion: 27, transporte: 28, fraccionMercanciaArancelaria: 29, nombreTecnico: 30, nombreEnIngles: 31, criterioParaConferir: 32, marca: 33, cantidad: 34, umc: 35, valorDelaMercancia: 36, complementoDelaDescripcion: 37, masaBruta: 38, nombreComercialDelaMercancia: 39, unidadMedida: 40, tipoFactura: 41, fecha: 42, numeroFactura: 43, justificacion: 44, casillaVerificacion: 45, siCasilla: 46, rutaCompleta: 47, puertoEmbarque: 48, puertoDesembarque: 49
    };
    service.actualizarEstadoFormulario(datos);
    Object.keys(storeMock).forEach(key => {
      expect(storeMock[key]).toHaveBeenCalled();
    });
  });

  it('should call http.get for getRegistroTomaMuestrasMercanciasData', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getRegistroTomaMuestrasMercanciasData().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/registro_toma_muestras_mercancias.json');
  });

  it('should call http.get for getTratado', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getTratado().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/tratado.json');
  });

  it('should call http.get for getPais', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getPais().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/pais.json');
  });

  it('should call http.get for getIdioma', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getIdioma().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/idioma.json');
  });

  it('should call http.get for getPaisDestino', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getPaisDestino().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/pais.json');
  });

  it('should call http.get for getTransporte', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getTransporte().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/pais.json');
  });

  it('should call http.get for getEntidad', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getEntidad().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/entidad.json');
  });

  it('should call http.get for getRepresentacion', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getRepresentacion().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/entidad.json');
  });

  it('should call http.get for getTipoFactura', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getTipoFactura().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/tipofactura.json');
  });

  it('should call http.get for getUMC', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getUMC().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/umc.json');
  });

  it('should call http.get for getUnidadMedida', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getUnidadMedida().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/umc.json');
  });

  it('should call http.get for getCatalogoById', () => {
    httpMock.get.mockReturnValue(of({}));
    service.urlServerCatalogos = 'mockUrl';
    service.getCatalogoById(5).subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('mockUrl/5');
  });

  it('should call http.get for getSolicitudesTabla and handle error', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getSolicitudesTabla().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/mercancia-disponsible.json');
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getSolicitudesTabla().subscribe({ error: () => expect(true).toBeTruthy() });
  });

  it('should call http.get for getSolicitudesDataTabla and handle error', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getSolicitudesDataTabla().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/mercancia-seleccionadas.json');
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getSolicitudesDataTabla().subscribe({ error: () => expect(true).toBeTruthy() });
  });
});