import { TestBed } from '@angular/core/testing';
import { RegistroService } from './registro.service';
import { Tramite110207Store } from '../state/Tramite110207.store';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

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
        { provide: HttpClient, useValue: httpMock },
        { provide: Tramite110207Store, useValue: storeMock }
      ]
    });
    service = TestBed.inject(RegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters in actualizarEstadoFormulario', () => {
    const datos: any = {
      tratado: [],
      pais: [],
      fraccionArancelaria: 'a',
      numeroRegistro: 'b',
      nombreComercial: 'c',
      fechaInicial: 'd',
      fechaFinal: 'e',
      archivo: 'f',
      observaciones: 'g',
      presica: 'h',
      presenta: 'i',
      idioma: [],
      entidad: [],
      representacion: [],
      nombre: 'j',
      apellidoPrimer: 'k',
      apellidoSegundo: 'l',
      numeroFiscal: 'm',
      razonSocial: 'n',
      ciudad: 'o',
      calle: 'p',
      numeroLetra: 'q',
      lada: 'r',
      telefono: 's',
      fax: 't',
      correoElectronico: 'u',
      nacion: [],
      transporte: [],
      fraccionMercanciaArancelaria: 'v',
      nombreTecnico: 'w',
      nombreEnIngles: 'x',
      criterioParaConferir: 'y',
      marca: 'z',
      cantidad: '1',
      umc: [],
      valorDelaMercancia: '2',
      complementoDelaDescripcion: '3',
      masaBruta: '4',
      nombreComercialDelaMercancia: '5',
      unidadMedida: [],
      tipoFactura: [],
      fecha: '6',
      numeroFactura: '7',
      justificacion: '8',
      casillaVerificacion: '9',
      siCasilla: true,
      rutaCompleta: '10',
      puertoEmbarque: '11',
      puertoDesembarque: '12'
    };
    service.actualizarEstadoFormulario(datos);
    expect(storeMock.setTratado).toHaveBeenCalledWith(datos.tratado);
    expect(storeMock.setPais).toHaveBeenCalledWith(datos.pais);
    expect(storeMock.setFraccionArancelaria).toHaveBeenCalledWith(datos.fraccionArancelaria);
    expect(storeMock.setNumRegistro).toHaveBeenCalledWith(datos.numeroRegistro);
    expect(storeMock.setNomComercial).toHaveBeenCalledWith(datos.nombreComercial);
    expect(storeMock.setFechInicioB).toHaveBeenCalledWith(datos.fechaInicial);
    expect(storeMock.setFechFinB).toHaveBeenCalledWith(datos.fechaFinal);
    expect(storeMock.setArchivo).toHaveBeenCalledWith(datos.archivo);
    expect(storeMock.setObservaciones).toHaveBeenCalledWith(datos.observaciones);
    expect(storeMock.setPresica).toHaveBeenCalledWith(datos.presica);
    expect(storeMock.setPresenta).toHaveBeenCalledWith(datos.presenta);
    expect(storeMock.setIdioma).toHaveBeenCalledWith(datos.idioma);
    expect(storeMock.setEntidad).toHaveBeenCalledWith(datos.entidad);
    expect(storeMock.setRepresentacion).toHaveBeenCalledWith(datos.representacion);
    expect(storeMock.setNombre).toHaveBeenCalledWith(datos.nombre);
    expect(storeMock.setApellidoPrimer).toHaveBeenCalledWith(datos.apellidoPrimer);
    expect(storeMock.setApellidoSegundo).toHaveBeenCalledWith(datos.apellidoSegundo);
    expect(storeMock.setNumeroFiscal).toHaveBeenCalledWith(datos.numeroFiscal);
    expect(storeMock.setRazonSocial).toHaveBeenCalledWith(datos.razonSocial);
    expect(storeMock.setCiudad).toHaveBeenCalledWith(datos.ciudad);
    expect(storeMock.setCalle).toHaveBeenCalledWith(datos.calle);
    expect(storeMock.setNumeroLetra).toHaveBeenCalledWith(datos.numeroLetra);
    expect(storeMock.setLada).toHaveBeenCalledWith(datos.lada);
    expect(storeMock.setTelefono).toHaveBeenCalledWith(datos.telefono);
    expect(storeMock.setFax).toHaveBeenCalledWith(datos.fax);
    expect(storeMock.setCorreoElectronico).toHaveBeenCalledWith(datos.correoElectronico);
    expect(storeMock.setNacion).toHaveBeenCalledWith(datos.nacion);
    expect(storeMock.setTransporte).toHaveBeenCalledWith(datos.transporte);
    expect(storeMock.setfraccionMercanArancelaria).toHaveBeenCalledWith(datos.fraccionMercanciaArancelaria);
    expect(storeMock.setnombretecnico).toHaveBeenCalledWith(datos.nombreTecnico);
    expect(storeMock.setnomreeningles).toHaveBeenCalledWith(datos.nombreEnIngles);
    expect(storeMock.setcriterioparaconferir).toHaveBeenCalledWith(datos.criterioParaConferir);
    expect(storeMock.setmarca).toHaveBeenCalledWith(datos.marca);
    expect(storeMock.setcantidad).toHaveBeenCalledWith(datos.cantidad);
    expect(storeMock.setUMC).toHaveBeenCalledWith(datos.umc);
    expect(storeMock.setvalordelamercancia).toHaveBeenCalledWith(datos.valorDelaMercancia);
    expect(storeMock.setcomplementodeladescripcion).toHaveBeenCalledWith(datos.complementoDelaDescripcion);
    expect(storeMock.setmasabruta).toHaveBeenCalledWith(datos.masaBruta);
    expect(storeMock.setnombrecomercialdelamercancia).toHaveBeenCalledWith(datos.nombreComercialDelaMercancia);
    expect(storeMock.setUnidadMedida).toHaveBeenCalledWith(datos.unidadMedida);
    expect(storeMock.setTipoFactura).toHaveBeenCalledWith(datos.tipoFactura);
    expect(storeMock.setFecha).toHaveBeenCalledWith(datos.fecha);
    expect(storeMock.setNFactura).toHaveBeenCalledWith(datos.numeroFactura);
    expect(storeMock.setJustificacion).toHaveBeenCalledWith(datos.justificacion);
    expect(storeMock.setCheckbox).toHaveBeenCalledWith(datos.casillaVerificacion);
    expect(storeMock.setEstablecerSiCasilla).toHaveBeenCalledWith(datos.siCasilla);
    expect(storeMock.setRutaCompleta).toHaveBeenCalledWith(datos.rutaCompleta);
    expect(storeMock.setPuertoEmbarque).toHaveBeenCalledWith(datos.puertoEmbarque);
    expect(storeMock.setPuertoDesembarque).toHaveBeenCalledWith(datos.puertoDesembarque);
  });

  it('should call http.get for getRegistroTomaMuestrasMercanciasData', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getRegistroTomaMuestrasMercanciasData().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/registro_toma_muestras_mercancias.json');
  });

  it('should call http.get for getTratado', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getTratado().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/tratado.json');
  });

  it('should call http.get for getPais', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getPais().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/pais.json');
  });

  it('should call http.get for getIdioma', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getIdioma().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/idioma.json');
  });

  it('should call http.get for getPaisDestino', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getPaisDestino().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/pais.json');
  });

  it('should call http.get for getTransporte', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getTransporte().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/pais.json');
  });

  it('should call http.get for getEntidad', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getEntidad().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/entidad.json');
  });

  it('should call http.get for getRepresentacion', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getRepresentacion().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/entidad.json');
  });

  it('should call http.get for getTipoFactura', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getTipoFactura().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/tipofactura.json');
  });

  it('should call http.get for getUMC', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getUMC().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/umc.json');
  });

  it('should call http.get for getUnidadMedida', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getUnidadMedida().subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/umc.json');
  });

  it('should call http.get for getCatalogoById', () => {
    httpMock.get.mockReturnValue(of({}));
    service.urlServerCatalogos = 'url';
    service.getCatalogoById(5).subscribe(res => {
      expect(res).toEqual({});
    });
    expect(httpMock.get).toHaveBeenCalledWith('url/5');
  });

  it('should call http.get for getSolicitudesTabla and handle success', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getSolicitudesTabla().subscribe(res => {
      expect(res).toEqual([]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/mercancia-disponsible.json');
  });

  it('should call http.get for getSolicitudesTabla and handle error', () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getSolicitudesTabla().subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });

  it('should call http.get for getSolicitudesDataTabla and handle success', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getSolicitudesDataTabla().subscribe(res => {
      expect(res).toEqual([]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110207/mercancia-seleccionadas.json');
  });

  it('should call http.get for getSolicitudesDataTabla and handle error', () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getSolicitudesDataTabla().subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});