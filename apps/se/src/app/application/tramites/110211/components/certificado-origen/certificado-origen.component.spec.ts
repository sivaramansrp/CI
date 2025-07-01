import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { SeccionLibQuery, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { of, Subject, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { Mercancia } from '../../../../shared/models/modificacion.enum';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn()
  }))
}));

describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;

  let formCertificadoSubject: Subject<any>;

  let consultaioSubject: Subject<any>;

  const mockCamCertificadoService = {
    obtenerMenuDesplegable: jest.fn().mockReturnValue(of([])),
    obtenerTablaDatos: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Test' }] as unknown as Mercancia[]))
  };

  const mockStore = {
    setFormCertificadoGenric: jest.fn(),
    setFormMercancia: jest.fn(),
    setEstado: jest.fn(),
    setBloque: jest.fn(),
    setFormCertificado: jest.fn(),
    setFormValida: jest.fn()
  };

  let mockQuery = {
    formCertificado$: of({ test: 'value' }),
    selectCam$: of({}),
    selectmercanciaTabla$: of([])
  };

  const mockSeccionQuery = {
    selectSeccionState$: of({ readonly: false })
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: false })
  };


  beforeEach(async () => {
    consultaioSubject = new Subject();
    mockConsultaioQuery.selectConsultaioState$ = consultaioSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [CertificadoOrigenComponent],
      providers: [
        { provide: CamCertificadoService, useValue: mockCamCertificadoService },
        { provide: camCertificadoStore, useValue: mockStore },
        { provide: camCertificadoQuery, useValue: mockQuery },
        { provide: SeccionLibQuery, useValue: mockSeccionQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    formCertificadoSubject = new Subject();
    mockQuery = {
    formCertificado$: formCertificadoSubject.asObservable(),
    selectCam$: of({}),
    selectmercanciaTabla$: of([])
  };

  TestBed.overrideProvider(camCertificadoQuery, { useValue: mockQuery });
    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', fakeAsync(() => {
  fixture.detectChanges();
  formCertificadoSubject.next({ test: 'value' }); // emit value
  tick(200); // allow delay(100) to resolve
  expect(component.formCertificadoValues).toEqual({ test: 'value' });

  expect(mockCamCertificadoService.obtenerMenuDesplegable).toHaveBeenCalledWith('estados.json');
  expect(mockCamCertificadoService.obtenerMenuDesplegable).toHaveBeenCalledWith('pais.json');
}));


  it('should set valores store correctly', () => {
    const event = { formGroupName: 'fg', campo: 'nombre', valor: 'valor', storeStateName: 'store' };
    component.setValoresStore(event);
    expect(mockStore.setFormCertificadoGenric).toHaveBeenCalledWith({ nombre: 'valor' });
  });

  it('should call obtenerTablaDatos and set disponiblesDatos', () => {
    component.conseguirDisponiblesDatos();
    expect(mockCamCertificadoService.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('should call store methods from other event handlers', () => {
    const dummy = { id: 1, nombre: 'Perú', descripcion: 'País Perú' };
    component.tipoEstadoSeleccion(dummy);
    expect(mockStore.setEstado).toHaveBeenCalledWith(dummy);

    component.tipoSeleccion(dummy);
    expect(mockStore.setBloque).toHaveBeenCalledWith([dummy]);

    component.obtenerDatosFormulario({ campo: 'valor' });
    expect(mockStore.setFormCertificado).toHaveBeenCalledWith({ campo: 'valor' });

    component.setFormValida(true);
    expect(mockStore.setFormValida).toHaveBeenCalledWith({ certificado: true });
  });

  it('should open and close modal', () => {
    const mockElement = document.createElement('div');
    component.modifyModal = new ElementRef(mockElement);
    component.ngAfterViewInit();

    const mockMercancia: Mercancia = {
      fraccionArancelaria: '12345678',
      numeroDeRegistrodeProductos: 'REG-001',
      fechaExpedicion: '2024-06-01',
      fechaVencimiento: '2025-06-01',
      nombreTecnico: 'Producto Técnico',
      nombreComercial: 'Producto Comercial',
      normaOrigen: 'NORMA-XYZ',
      id: '1',
      cantidad: '100',
      umc: 'kg',
      tipoFactura: 'TipoA',
      valorMercancia: '5000',
      fechaFinalInput: '2024-12-31',
      numeroFactura: 'FAC-12345',
      unidadMedidaMasaBruta: 'kg',
      complementoClasificacion: 'Clasificación Extra',
      complementoDescripcion: 'Descripción Extra',
    };
    component.abrirModificarModal(mockMercancia);
    expect(component.datosSeleccionados).toEqual(mockMercancia);
    expect(mockStore.setFormMercancia).toHaveBeenCalledWith(mockMercancia);
    expect(component.modalInstance.show).toHaveBeenCalled();

    component.cerrarModificarModal();
    expect(component.tablaSeleccionEvent).toBe(true);
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should handle error in estadoOpcion', () => {
  jest.spyOn(mockCamCertificadoService, 'obtenerMenuDesplegable').mockReturnValueOnce(
    throwError(() => new Error('API error'))
  );

  component.estadoOpcion();
  expect(component.estado).toEqual([]); // it should fallback to empty
});

it('should handle error in paisOpcion', () => {
  jest.spyOn(mockCamCertificadoService, 'obtenerMenuDesplegable').mockReturnValueOnce(
    throwError(() => new Error('API error'))
  );
  component.paisOpcion();
  expect(component.pais).toEqual([]); 
});

it('should set disponiblesDatos to empty array if response is not array', () => {
  jest.spyOn(mockCamCertificadoService, 'obtenerTablaDatos').mockReturnValueOnce(of({} as any));
  component.conseguirDisponiblesDatos();
  expect(component.disponiblesDatos).toEqual([]);
});

it('should not throw error if modalInstance is undefined in abrirModificarModal', () => {
  component.modalInstance = undefined as any;
  expect(() => {
    component.abrirModificarModal({} as Mercancia);
  }).not.toThrow();
});

it('should not throw error if modalInstance is undefined in cerrarModificarModal', () => {
  component.modalInstance = undefined as any;
  expect(() => {
    component.cerrarModificarModal();
  }).not.toThrow();
});


});
