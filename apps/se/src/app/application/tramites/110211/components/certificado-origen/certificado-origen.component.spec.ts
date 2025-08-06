import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ConsultaioQuery, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { of, Subject, throwError } from 'rxjs';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CertificadoOrigenComponent } from './certificado-origen.component';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn()
  }))
}));

describe('CertificadoOrigenComponent', () => {
  let componente: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;

  let SUJETO_FORM_CERTIFICADO: Subject<any>;
  let SUJETO_CONSULTAIO: Subject<any>;

  const SERVICIO_MOCK_CAM_CERTIFICADO = {
    obtenerMenuDesplegable: jest.fn().mockReturnValue(of([])),
    obtenerTablaDatos: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Test' }] as unknown as Mercancia[]))
  };

  const STORE_MOCK = {
    setFormCertificadoGenric: jest.fn(),
    setFormMercancia: jest.fn(),
    setEstado: jest.fn(),
    setBloque: jest.fn(),
    setFormCertificado: jest.fn(),
    setFormValida: jest.fn()
  };

  let QUERY_MOCK = {
    formCertificado$: of({ test: 'valor' }),
    selectCam$: of({}),
    selectmercanciaTabla$: of([])
  };

  const SECCION_QUERY_MOCK = {
    selectSeccionState$: of({ readonly: false })
  };

  const CONSULTAIO_QUERY_MOCK = {
    selectConsultaioState$: of({ readonly: false })
  };

  beforeEach(async () => {
    SUJETO_CONSULTAIO = new Subject();
    CONSULTAIO_QUERY_MOCK.selectConsultaioState$ = SUJETO_CONSULTAIO.asObservable();

    await TestBed.configureTestingModule({
      imports: [CertificadoOrigenComponent],
      providers: [
        { provide: CamCertificadoService, useValue: SERVICIO_MOCK_CAM_CERTIFICADO },
        { provide: camCertificadoStore, useValue: STORE_MOCK },
        { provide: camCertificadoQuery, useValue: QUERY_MOCK },
        { provide: SeccionLibQuery, useValue: SECCION_QUERY_MOCK },
        { provide: ConsultaioQuery, useValue: CONSULTAIO_QUERY_MOCK },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    SUJETO_FORM_CERTIFICADO = new Subject();
    QUERY_MOCK = {
      formCertificado$: SUJETO_FORM_CERTIFICADO.asObservable(),
      selectCam$: of({}),
      selectmercanciaTabla$: of([])
    };

    TestBed.overrideProvider(camCertificadoQuery, { useValue: QUERY_MOCK });
    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    componente = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    fixture.detectChanges();
    expect(componente).toBeTruthy();
  });

  it('debe inicializar los datos en ngOnInit', fakeAsync(() => {
    fixture.detectChanges();
    SUJETO_FORM_CERTIFICADO.next({ test: 'valor' });
    tick(200);
    expect(componente.formCertificadoValues).toEqual({ test: 'valor' });

    expect(SERVICIO_MOCK_CAM_CERTIFICADO.obtenerMenuDesplegable).toHaveBeenCalledWith('estados.json');
    expect(SERVICIO_MOCK_CAM_CERTIFICADO.obtenerMenuDesplegable).toHaveBeenCalledWith('pais.json');
  }));

  it('debe establecer valores en el store correctamente', () => {
    const EVENTO = { formGroupName: 'fg', campo: 'nombre', valor: 'valor', storeStateName: 'store' };
    componente.setValoresStore(EVENTO);
    expect(STORE_MOCK.setFormCertificadoGenric).toHaveBeenCalledWith({ nombre: 'valor' });
  });

  it('debe llamar obtenerTablaDatos y establecer disponiblesDatos', () => {
    componente.conseguirDisponiblesDatos();
    expect(SERVICIO_MOCK_CAM_CERTIFICADO.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('debe llamar métodos del store desde otros manejadores de eventos', () => {
    const DUMMY = { id: 1, nombre: 'Perú', descripcion: 'País Perú' };
    componente.tipoEstadoSeleccion(DUMMY);
    expect(STORE_MOCK.setEstado).toHaveBeenCalledWith(DUMMY);

    componente.tipoSeleccion(DUMMY);
    expect(STORE_MOCK.setBloque).toHaveBeenCalledWith([DUMMY]);

    componente.obtenerDatosFormulario({ campo: 'valor' });
    expect(STORE_MOCK.setFormCertificado).toHaveBeenCalledWith({ campo: 'valor' });

    componente.setFormValida(true);
    expect(STORE_MOCK.setFormValida).toHaveBeenCalledWith({ certificado: true });
  });

  it('debe abrir y cerrar el modal', () => {
    const ELEMENTO_MOCK = document.createElement('div');
    componente.modifyModal = new ElementRef(ELEMENTO_MOCK);
    componente.ngAfterViewInit();
    const MERCANCIA_MOCK: Mercancia = {
      fraccionArancelaria: "12099199",
      numeroDeRegistrodeProductos: "REG-2025-001",
      fechaExpedicion: "2025-08-01",
      fechaVencimiento: "2026-08-01",
      nombreTecnico: "Zea mays L.",
      nombreComercial: "Maíz híbrido Premium",
      normaOrigen: "NOM-123-AGRO-2023",
      id: "mercancia-001",
      cantidad: "1000",
      umc: "KG",
      tipoFactura: "Exportación",
      valorMercancia: "150000.00",
      fechaFinalInput: "2025-08-15",
      numeroFactura: "FAC-EXP-789456",
      unidadMedidaMasaBruta: "TON",
      complementoClasificacion: "Clase A",
      complementoDescripcion: "Producto certificado para exportación",
      fraccionNaladi: "10059010",
      fraccionNaladiSa93: "10059010.93",
      fraccionNaladiSa96: "10059010.96",
      fraccionNaladiSa02: "10059010.02",
      nalad: "NA123456"
    };
    componente.abrirModificarModal(MERCANCIA_MOCK);
    expect(componente.datosSeleccionados).toEqual(MERCANCIA_MOCK);
    expect(STORE_MOCK.setFormMercancia).toHaveBeenCalledWith(MERCANCIA_MOCK);
    expect(componente.modalInstance.show).toHaveBeenCalled();

    componente.cerrarModificarModal();
    expect(componente.tablaSeleccionEvent).toBe(true);
    expect(componente.modalInstance.hide).toHaveBeenCalled();
  });

  it('debe destruir las suscripciones en ngOnDestroy', () => {
    const ESPÍA = jest.spyOn(componente['destroyNotifier$'], 'next');
    const ESPÍA_COMPLETAR = jest.spyOn(componente['destroyNotifier$'], 'complete');
    componente.ngOnDestroy();
    expect(ESPÍA).toHaveBeenCalled();
    expect(ESPÍA_COMPLETAR).toHaveBeenCalled();
  });

  it('debe manejar el error en estadoOpcion', () => {
    jest.spyOn(SERVICIO_MOCK_CAM_CERTIFICADO, 'obtenerMenuDesplegable').mockReturnValueOnce(
      throwError(() => new Error('Error de API'))
    );

    componente.estadoOpcion();
    expect(componente.estado).toEqual([]);
  });

  it('debe manejar el error en paisOpcion', () => {
    jest.spyOn(SERVICIO_MOCK_CAM_CERTIFICADO, 'obtenerMenuDesplegable').mockReturnValueOnce(
      throwError(() => new Error('Error de API'))
    );
    componente.paisOpcion();
    expect(componente.pais).toEqual([]);
  });

  it('debe establecer disponiblesDatos como arreglo vacío si la respuesta no es un arreglo', () => {
    jest.spyOn(SERVICIO_MOCK_CAM_CERTIFICADO, 'obtenerTablaDatos').mockReturnValueOnce(of({} as any));
    componente.conseguirDisponiblesDatos();
    expect(componente.disponiblesDatos).toEqual([]);
  });

  it('no debe lanzar error si modalInstance es indefinido en abrirModificarModal', () => {
    componente.modalInstance = undefined as any;
    expect(() => {
      componente.abrirModificarModal({} as Mercancia);
    }).not.toThrow();
  });

  it('no debe lanzar error si modalInstance es indefinido en cerrarModificarModal', () => {
    componente.modalInstance = undefined as any;
    expect(() => {
      componente.cerrarModificarModal();
    }).not.toThrow();
  });
});