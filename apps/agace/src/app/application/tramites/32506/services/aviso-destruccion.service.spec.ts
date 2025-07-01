import { TestBed } from '@angular/core/testing';
import { AvisoDestruccionService } from './aviso-destruccion.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite32506Store } from '../estados/tramite32506.store';
import {
  AvisoTablaDatos,
  CatalogoLista,
  DatosSolicitante,
  DesperdicioTablaDatos,
  PedimentoTablaDatos,
  ProcesoTablaDatos,
  Tramite32506Aviso,
} from '../models/aviso-destruccion.model';

describe('AvisoDestruccionService', () => {
  let service: AvisoDestruccionService;
  let httpClientSpy: jest.Mocked<HttpClient>;
  let storeSpy: jest.Mocked<Tramite32506Store>;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    } as any;

    storeSpy = {
      setAvisoFormularioAdace: jest.fn(),
      setAvisoFormularioCalle: jest.fn(),
      setAvisoFormularioCodigoPostal: jest.fn(),
      setAvisoFormularioColonia: jest.fn(),
      setAvisoFormularioDelegacionMunicipio: jest.fn(),
      setAvisoFormularioEntidadFederativa: jest.fn(),
      setAvisoFormularioFechaTranslado: jest.fn(),
      setAvisoFormularioJustificacion: jest.fn(),
      setAvisoFormularioNombreComercial: jest.fn(),
      setAvisoFormularioNumeroExterior: jest.fn(),
      setAvisoFormularioNumeroInterior: jest.fn(),
      setAvisoFormularioTipoAviso: jest.fn(),
      setAvisoFormularioTipoCarga: jest.fn(),
      setAvisoFormularioValorAnioProgramaImmex: jest.fn(),
      setAvisoFormularioValorProgramaImmex: jest.fn(),
      setCantidadDesp: jest.fn(),
      setCantidadPedimento: jest.fn(),
      setCircunstanciaHechos: jest.fn(),
      setClaveAduanaPedimento: jest.fn(),
      setClaveFraccionArancelariaPedimento: jest.fn(),
      setClaveUnidadMedidaDesp: jest.fn(),
      setClaveUnidadMedidaPedimento: jest.fn(),
      setDatosSolicitante: jest.fn(),
      setDescripcionDesperdicio: jest.fn(),
      setDescripcionMercancia: jest.fn(),
      setDescripcionProcesoDestruccion: jest.fn(),
      setDomicilioFormularioCalle: jest.fn(),
      setDomicilioFormularioCodigoPostal: jest.fn(),
      setDomicilioFormularioColonia: jest.fn(),
      setDomicilioFormularioDelegacionMunicipio: jest.fn(),
      setDomicilioFormularioEntidadFederativa: jest.fn(),
      setDomicilioFormularioNombreComercial: jest.fn(),
      setDomicilioFormularioNumeroExterior: jest.fn(),
      setDomicilioFormularioNumeroInterior: jest.fn(),
      setDomicilioFormularioRfc: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AvisoDestruccionService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Tramite32506Store, useValue: storeSpy },
      ],
    });
    service = TestBed.inject(AvisoDestruccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerDatosSolicitante should call http.get with correct URL', (done) => {
    const mockData: DatosSolicitante = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerDatosSolicitante().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/datosSolicitante.json'
      );
      done();
    });
  });

  it('obtenerPedimentoTabla should call http.get with correct URL', (done) => {
    const mockData: PedimentoTablaDatos = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerPedimentoTabla().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/pedimento-tabla.json'
      );
      done();
    });
  });

  it('obtenerProcesoTabla should call http.get with correct URL', (done) => {
    const mockData: ProcesoTablaDatos = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerProcesoTabla().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/proceso-tabla.json'
      );
      done();
    });
  });

  it('obtenerDesperdicioTabla should call http.get with correct URL', (done) => {
    const mockData: DesperdicioTablaDatos = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerDesperdicioTabla().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/desperdicio-tabla.json'
      );
      done();
    });
  });

  it('obtenerAvisoTabla should call http.get with correct URL', (done) => {
    const mockData: AvisoTablaDatos = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerAvisoTabla().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/aviso-tabla.json'
      );
      done();
    });
  });

  it('obtenerColonias should call http.get with correct URL', (done) => {
    const mockData: CatalogoLista = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerColonias().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/entidad-federativa.json'
      );
      done();
    });
  });

  it('obtenerMunicipio should call http.get with correct URL', (done) => {
    const mockData: CatalogoLista = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerMunicipio().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/entidad-federativa.json'
      );
      done();
    });
  });

  it('obtenerFederativa should call http.get with correct URL', (done) => {
    const mockData: CatalogoLista = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerFederativa().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/entidad-federativa.json'
      );
      done();
    });
  });

  it('obtenerUnidadMedida should call http.get with correct URL', (done) => {
    const mockData: CatalogoLista = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerUnidadMedida().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/entidad-federativa.json'
      );
      done();
    });
  });

  it('obtenerFraccionArancelaria should call http.get with correct URL', (done) => {
    const mockData: CatalogoLista = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerFraccionArancelaria().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/entidad-federativa.json'
      );
      done();
    });
  });

  it('guardarDatosFormulario should call http.get with correct URL', (done) => {
    const mockData: Tramite32506Aviso = {} as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.guardarDatosFormulario().subscribe((data) => {
      expect(data).toBe(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'assets/json/32506/tramite-32506-aviso.json'
      );
      done();
    });
  });

  it('actualizarEstadoFormulario should update store with correct values', () => {
    const mockRespuesta: Tramite32506Aviso = {
      pasoActivo: 1,
      pestanaActiva: 2,
      datosSolicitante: {
        rfc: 'AAL0409235E6',
        denominacion: 'AGRICOLA ALPE S DE RL DE CV',
        actividadEconomica: 'Siembra, cultivo y cosecha de otros cultivos',
        correoElectronico: 'caguileram@ultrasist.com.mx',
        pais: 'ESTADOSUNIDOSMEXICANOS',
        codigoPostal: '34078',
        entidadFederativa: 'DURANGO',
        municipio: 'DURANGO',
        localidad: 'VICTORIADEDURANGO',
        colonia: 'LOSSAUCES',
        calle: 'PRIV.PINOPIÑON',
        nExt: '703',
        nInt: '',
        lada: '',
        telefono: '',
        adace: 'Occidente',
        horaDestruccion: '00:00',
        fechaDestruccion: '2023-10-01',
      },
      domicilioFormulario: {
        nombreComercial: 'NOMBRE COMERCIAL',
        claveEntidadFederativa: 'Test',
        claveDelegacionMunicipio: 'Test',
        claveColonia: 'Test',
        calle: 'Test',
        numeroExterior: '10',
        numeroInterior: '20',
        codigoPostal: '12345',
        rfc: 'AAL0409235E6',
      },
      avisoFormulario: {
        adace: 'adace',
        valorProgramaImmex: 'Test',
        valorAnioProgramaImmex: 'Test',
        tipoAviso: 'Test',
        justificacion: 'Test',
        periodicidadMensualDestruccion: 'Test',
        fechaTranslado: 'Test',
        nombreComercial: 'NOMBRE COMERCIAL',
        claveEntidadFederativa: 'Test',
        claveDelegacionMunicipio: 'Test',
        claveColonia: 'Test',
        calle: 'calle',
        numeroExterior: '10',
        numeroInterior: '20',
        codigoPostal: '12345',
        horaDestruccion: '00:00',
        fechaDestruccion: '2023-10-01',
        tipoCarga: 'Test',
      },
      procesoFormulario: {
        descripcionProcesoDestruccion:
          'esta es una descripción de prueba del proceso de destrucción',
      },
      desperdicioFormulario: {
        descripcionDesperdicio: 'Test',
        cantidadDesp: 'Test',
        claveUnidadMedidaDesp: 'Test',
        porcentaje: 'Test',
        descripcionMercancia: 'Test',
        circunstanciaHechos: 'Test',
      },
      pedimentoFormulario: {
        patenteAutorizacion: '2452',
        pedimento: '5254782',
        claveAduanaPedimento: 'ALTAMIRA',
        claveFraccionArancelariaPedimento: 'certificado',
        nicoPedimento: '02',
        cantidadPedimento: '25',
        claveUnidadMedidaPedimento: 'Litro',
      },
      tipoDocumento: '',
    };
    service.actualizarEstadoFormulario(mockRespuesta);

    expect(storeSpy.setAvisoFormularioAdace).toHaveBeenCalledWith('adace');
    expect(storeSpy.setAvisoFormularioCalle).toHaveBeenCalledWith('calle');
    expect(storeSpy.setAvisoFormularioCodigoPostal).toHaveBeenCalledWith('12345');
    expect(storeSpy.setAvisoFormularioColonia).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioDelegacionMunicipio).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioEntidadFederativa).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioFechaTranslado).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioJustificacion).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioNombreComercial).toHaveBeenCalledWith('NOMBRE COMERCIAL');
    expect(storeSpy.setAvisoFormularioNumeroExterior).toHaveBeenCalledWith('10');
    expect(storeSpy.setAvisoFormularioNumeroInterior).toHaveBeenCalledWith('20');
    expect(storeSpy.setAvisoFormularioTipoAviso).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioTipoCarga).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioValorAnioProgramaImmex).toHaveBeenCalledWith('Test');
    expect(storeSpy.setAvisoFormularioValorProgramaImmex).toHaveBeenCalledWith('Test');
    expect(storeSpy.setCantidadDesp).toHaveBeenCalledWith('Test');
    expect(storeSpy.setCantidadPedimento).toHaveBeenCalledWith('25');
    expect(storeSpy.setCircunstanciaHechos).toHaveBeenCalledWith('Test');
    expect(storeSpy.setClaveAduanaPedimento).toHaveBeenCalledWith('ALTAMIRA');
    expect(storeSpy.setClaveFraccionArancelariaPedimento).toHaveBeenCalledWith('certificado');
    expect(storeSpy.setClaveUnidadMedidaDesp).toHaveBeenCalledWith('Test');
    expect(storeSpy.setClaveUnidadMedidaPedimento).toHaveBeenCalledWith('Litro');
    expect(storeSpy.setDatosSolicitante).toHaveBeenCalledWith({
      rfc: 'AAL0409235E6',
      denominacion: 'AGRICOLA ALPE S DE RL DE CV',
      actividadEconomica: 'Siembra, cultivo y cosecha de otros cultivos',
      correoElectronico: 'caguileram@ultrasist.com.mx',
      pais: 'ESTADOSUNIDOSMEXICANOS',
      codigoPostal: '34078',
      entidadFederativa: 'DURANGO',
      municipio: 'DURANGO',
      localidad: 'VICTORIADEDURANGO',
      colonia: 'LOSSAUCES',
      calle: 'PRIV.PINOPIÑON',
      nExt: '703',
      nInt: '',
      lada: '',
      telefono: '',
      adace: 'Occidente',
      horaDestruccion: '00:00',
      fechaDestruccion: '2023-10-01',
    });
    expect(storeSpy.setDescripcionDesperdicio).toHaveBeenCalledWith('Test');
    expect(storeSpy.setDescripcionMercancia).toHaveBeenCalledWith('Test');
    expect(storeSpy.setDescripcionProcesoDestruccion).toHaveBeenCalledWith(
      'esta es una descripción de prueba del proceso de destrucción'
    );
    expect(storeSpy.setDomicilioFormularioCalle).toHaveBeenCalledWith('Test');
    expect(storeSpy.setDomicilioFormularioCodigoPostal).toHaveBeenCalledWith('12345');
    expect(storeSpy.setDomicilioFormularioColonia).toHaveBeenCalledWith('Test');
    expect(storeSpy.setDomicilioFormularioDelegacionMunicipio).toHaveBeenCalledWith('Test');
    expect(storeSpy.setDomicilioFormularioEntidadFederativa).toHaveBeenCalledWith('Test');
    expect(storeSpy.setDomicilioFormularioNombreComercial).toHaveBeenCalledWith('NOMBRE COMERCIAL');
    expect(storeSpy.setDomicilioFormularioNumeroExterior).toHaveBeenCalledWith('10');
    expect(storeSpy.setDomicilioFormularioNumeroInterior).toHaveBeenCalledWith('20');
    expect(storeSpy.setDomicilioFormularioRfc).toHaveBeenCalledWith('AAL0409235E6');
  });
});