import { UpdateStateCallback } from '@datorama/akita';
import { Subject, of } from 'rxjs';
import { TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { CapturarSolicitud } from '../../models/220201/capturar-solicitud.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { AnimalesVivoContenedoraComponent } from './animales-vivo-contenedora.component';

describe('AnimalesVivoContenedoraComponent', () => {
  let component: AnimalesVivoContenedoraComponent;

  // Mocks
  let certificadoServiceMock: Partial<CertificadoZoosanitarioServiceService>;
  let zoosanitarioQueryMock: Partial<ZoosanitarioQuery>;
  let zoosanitarioStoreMock: Partial<ZoosanitarioStore>;

  // Declare subject for pushing values
  let seleccionarStateSubject: Subject<any>;

  beforeEach(() => {
    certificadoServiceMock = {
      obtenerRespuestaPorUrl: jest.fn().mockReturnValue(of({
        tipoRequisitoList: ['tipo1'],
        requisitoList: ['req1'],
        fraccionArancelariaList: [],
        nicoList: [],
        umtList: [],
        umcList: [],
        especieList: [],
        usoList: [],
        paisOrigenList: [],
        paisDeProcedenciaList: [],
        sexoList: []
      })),
    };

    seleccionarStateSubject = new Subject<any>();

    zoosanitarioQueryMock = {
      seleccionarState$: seleccionarStateSubject.asObservable(),
    };

    zoosanitarioStoreMock = {
      update: jest.fn((stateOrCallback: UpdateStateCallback<CapturarSolicitud> | Partial<CapturarSolicitud>) => {
        const prevState: CapturarSolicitud = {
          datosDeLaSolicitud: {
            tipoMercancia: '',
            aduanaIngreso: '',
            oficinaInspeccion: '',
            puntoInspeccion: '',
            claveUCON: '',
            establecimientoTIF: '',
            nombreVeterinario: '',
            numeroGuia: '',
            certificacion: '',
            regimen: '',
            datosDeMercancia: ''
          },
          datosParaMovilizacionNacional: {
            coordenadas: '',
            nombre: '',
            medio: '',
            transporte: '',
            punto: ''
          },
          pagoDeDerechos: {
            exentoPago: '',
            justificacion: '',
            claveReferencia: '',
            cadenaDependencia: '',
            banco: '',
            llavePago: '',
            importePago: '',
            fechaPago: ''
          },
          validarEnvio: {
            dataParaMovilizacion: false,
            dataDeLaSolicitud: false
          },
          tercerosRelacionados: [] as TercerosrelacionadosdestinoTable[],
          tablaDatos: [{
            id: 123456,
            noPartida: '001-2025',
            tipoRequisito: 'Sanitario',
            requisito: 'Certificación fitosanitaria vigente',
            numeroCertificadoInternacional: 'CINT-987654321',
            fraccionArancelaria: '01012101',
            descripcionFraccion: 'Animales vivos de la especie bovina',
            nico: 'NICO2025',
            descripcionNico: 'Código NICO para bovinos',
            descripcion: 'Animales vivos para exportación',
            umt: 'Kilogramos',
            cantidadUMT: 1500,
            umc: 'Cajas',
            cantidadUMC: '30',
            uso: 'Comercialización',
            tipoDeProducto: 'Bovinos',
            numeroDeLote: 'L20250715',
            paisDeOrigen: 'México',
            paisDeProcedencia: 'México',
            certificadoInternacionalElectronico: 'E-CERT-2025-0001',
            especie: 'Bovino',
            tipoPresentacion: 'En pie',
            tipoPlanta: 'Granja autorizada',
            plantaAutorizadaOrigen: 'Granja ABC',
            presentacion: 'Animales vivos'
          }],
          selectedDatos: [],
          datos: {
            aduanaDeIngreso: '',
            oficinaDeInspeccion: '',
            puntoDeInspeccion: '',
            numeroDeGuia: '',
            regimen: '',
            numeroDeCarro: '',
            tipoDeRequisito: '',
            requisito: '',
            numeroCertificadoInternacional: '',
            fraccionArancelaria: '',
            descripcionFraccion: '',
            nico: '',
            descripcionNico: '',
            descripcion: '',
            cantidadUMT: '',
            umt: '',
            cantidadUMC: '',
            umc: '',
            uso: '',
            tipoDeProducto: '',
            tipoMercancia: '',
          },
          datosForma: [],
          seletedTerceros: {} as TercerosrelacionadosdestinoTable,
          seletedExdora: {} as any,
        };

        if (typeof stateOrCallback === 'function') {
          return (stateOrCallback as UpdateStateCallback<CapturarSolicitud>)(prevState);
        } else {
          return { ...prevState, ...stateOrCallback };
        }
      }),
    };

    component = new AnimalesVivoContenedoraComponent(
      certificadoServiceMock as CertificadoZoosanitarioServiceService,
      zoosanitarioQueryMock as ZoosanitarioQuery,
      zoosanitarioStoreMock as ZoosanitarioStore,
    );
  });

  it('should create component and load initial catalogosDatos', async () => {
    expect(component).toBeTruthy();

    await Promise.resolve();

    expect(certificadoServiceMock.obtenerRespuestaPorUrl).toHaveBeenCalledWith('animales-vivo.json');
    expect(component.catalogosDatos.tipoRequisitoList).toContain('tipo1');
  });

  it('should subscribe to seleccionarState$ and update formularioSolicitud and cuerpoTabla', async () => {
    const mockState = {
      tablaDatos: [{ id: 123, requisito: 'reqMock' }],
      selectedDatos: [{
        id: 999,
        tipoRequisito: 'TR1',
        requisito: 'REQ1',
        numeroCertificadoInternacional: '123ABC',
        fraccionArancelaria: 'FA1',
        descripcionFraccion: 'descFA',
        nico: 'nico1',
        descripcionNico: 'descNico',
        descripcion: 'desc',
        cantidadUMT: 10,
        umt: 'UMT1',
        cantidadUMC: 20,
        umc: 'UMC1',
        especie: 'especie1',
        uso: 'uso1',
        paisDeOrigen: 'paisOrig',
        paisDeProcedencia: 'paisProc',
        noPartida: 'NP1',
        tipoDeProducto: 'tipoProd',
        numeroDeLote: 'numLote',
        certificadoInternacionalElectronico: 'certIntElect',
      }],
    };

    seleccionarStateSubject.next(mockState);
    await Promise.resolve();

    expect(component.cuerpoTabla).toEqual(mockState.tablaDatos);
    expect(component.formularioSolicitud.id).toBe(999);
    expect(component.formularioSolicitud.tipoRequisito).toBe('TR1');
    expect(component.formularioSolicitud.cantidadUMT).toBe('10'); // converted to string
  });

  it('should update datos in store on agregarDatosFormulario with existing id', () => {
    const formEventMock = {
      formulario: {
        id: 1,
        tipoRequisito: 'TR-Updated',
        requisito: 'REQ-Updated',
        numeroCertificadoInternacional: '123',
        fraccionArancelaria: 'FA',
        descripcionFraccion: 'descFA',
        nico: 'nico',
        descripcionNico: 'descNico',
        descripcion: 'descripcion',
        umt: 'UMT',
        cantidadUMT: '5',
        umc: 'UMC',
        cantidadUMC: '7',
        uso: 'uso',
        tipoDeProducto: 'tipoProd',
        numeroDeLote: 'numLote',
        paisDeOrigen: 'paisOrig',
        paisDeProcedencia: 'paisProc',
        especie: 'especie',
        certificadoInternacionalElectronico: 'certInt',
      },
    };

    component.agregarDatosFormulario(formEventMock as any);

    expect(zoosanitarioStoreMock.update).toHaveBeenCalled();

    const updaterFn = (zoosanitarioStoreMock.update as jest.Mock).mock.calls[0][0];
    const prevState = { tablaDatos: [{ id: 1, requisito: 'Old' }], selectedDatos: [] };
    const newState = updaterFn(prevState);

    expect(newState.tablaDatos.length).toBe(1);
    expect(newState.tablaDatos[0].tipoRequisito).toBe('TR-Updated');
  });

  it('should add new datos in store on agregarDatosFormulario with new id', () => {
    const formEventMock = {
      formulario: {
        id: 2,
        tipoRequisito: 'TR-New',
        requisito: 'REQ-New',
        numeroCertificadoInternacional: '',
        fraccionArancelaria: '',
        descripcionFraccion: '',
        nico: '',
        descripcionNico: '',
        descripcion: '',
        umt: '',
        cantidadUMT: '',
        umc: '',
        cantidadUMC: '',
        uso: '',
        tipoDeProducto: '',
        numeroDeLote: '',
        paisDeOrigen: '',
        paisDeProcedencia: '',
        especie: '',
        certificadoInternacionalElectronico: '',
      },
    };

    const prevState = { tablaDatos: [{ id: 1, requisito: 'Old' }], selectedDatos: [] };

    component.agregarDatosFormulario(formEventMock as any);

    const updaterFn = (zoosanitarioStoreMock.update as jest.Mock).mock.calls[0][0];
    const newState = updaterFn(prevState);

    expect(newState.tablaDatos.length).toBe(2);
    expect(newState.tablaDatos.find((item: any) => item.id === 2)?.tipoRequisito).toBe('TR-New');
  });

  it('should call next and complete on destroyNotifier$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
