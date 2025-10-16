import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { of, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { PeruCertificadoService } from '../../../110205/services/peru-certificado.service';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { ConsultaioQuery, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

// Mock services and dependencies
const mockStore = {
  setPaisBloqu: jest.fn(),
  setPaisBloque: jest.fn(),
  setFormCertificadoGenric: jest.fn(),
  setEstado: jest.fn(),
  setBloque: jest.fn(),
  setFormMercancia: jest.fn(),
  setmercanciaTabla: jest.fn(),
  setFormValida: jest.fn(),
  setFormValidity: jest.fn(),
  setDisponsiblesDatos: jest.fn(),
};

const mockQuery = {
  selectPaisBloque$: of([]),
  selectPaisBloqu$: of([]),
  selectSolicitud$: of({
    mercanciaTabla: [],
    disponiblesDatos: [],
    formCertificado: { entidadFederativa: '1', bloque: 'MX' },
  }),
  formCertificado$: of({ bloque: 'MX' }),
  selectPaisBloque: jest.fn(() => of([])),
  selectPaisBloqu: jest.fn(() => of([])),
  selectSolicitud: jest.fn(() =>
    of({
      mercanciaTabla: [],
      disponiblesDatos: [],
      formCertificado: { entidadFederativa: '1', bloque: 'MX' },
    })
  ),
};

const mockSeccionQuery = {
  selectSeccionState$: of({}),
};

const mockConsultaQuery = {
  selectConsultaioState$: of({ readonly: false }),
};

const mockValidarInicialmenteCertificadoService = {
  getPaisBloqu: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Test' }] })),
  obtenerPaisBloque: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Bloque' }])),
  obtenerMercanciasDisponibles: jest.fn().mockReturnValue(of({ datos: [{ fraccionArancelaria: '1234' }] })),
};

const mockPeruCertificadoService = {
  obtenerMenuDesplegable: jest.fn(() => of([{ id: 1, descripcion: 'Mock Estado' }])),
};

describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CertificadoOrigenComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: PeruCertificadoService, useValue: mockPeruCertificadoService },
        { provide: Tramite110214Store, useValue: mockStore },
        { provide: Tramite110214Query, useValue: mockQuery },
        { provide: SeccionLibQuery, useValue: mockSeccionQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: ValidarInicialmenteCertificadoService, useValue: mockValidarInicialmenteCertificadoService },
        ToastrService,
        provideToastr({
        positionClass: 'toast-top-right',
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize observables and call helper methods', () => {
      const paisSpy = jest.spyOn(component, 'paisOpcion');
      const estadoSpy = jest.spyOn(component, 'estadoOpcion');
      const cargarSpy = jest.spyOn(component, 'cargarBloque');
      const paisBloquSpy = jest.spyOn(component, 'paisBloqu');

      component.ngOnInit();

      expect(component.pais$).toBeTruthy();
      expect(component.paisBloqu$).toBeTruthy();
      expect(estadoSpy).toHaveBeenCalled();
      expect(paisSpy).toHaveBeenCalled();
      expect(cargarSpy).toHaveBeenCalled();
      expect(paisBloquSpy).toHaveBeenCalled();
    });
  });

  describe('paisBloqu', () => {
    it('should call store.setPaisBloqu with data', () => {
      component.paisBloqu();
      expect(mockValidarInicialmenteCertificadoService.getPaisBloqu).toHaveBeenCalled();
      expect(mockStore.setPaisBloqu).toHaveBeenCalledWith([{ id: 1, descripcion: 'Test' }]);
    });

    it('should handle error gracefully', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      mockValidarInicialmenteCertificadoService.getPaisBloqu.mockReturnValueOnce(throwError(() => new Error('Error')));
      component.paisBloqu();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('cargarBloque', () => {
    it('should call store.setPaisBloque with data', () => {
      component.cargarBloque();
      expect(mockValidarInicialmenteCertificadoService.obtenerPaisBloque).toHaveBeenCalled();
      expect(mockStore.setPaisBloque).toHaveBeenCalledWith([{ id: 1, descripcion: 'Bloque' }]);
    });

    it('should handle error gracefully', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      mockValidarInicialmenteCertificadoService.obtenerPaisBloque.mockReturnValueOnce(
        throwError(() => new Error('Error'))
      );
      component.cargarBloque();
      expect(console.error).toHaveBeenCalled();
    });
  });

  it('should fetch estado options', () => {
    const mockData = [{ id: 1, descripcion: 'Activo' }];
    mockPeruCertificadoService.obtenerMenuDesplegable.mockReturnValue(of(mockData));

    component.estadoOpcion();
    expect(mockPeruCertificadoService.obtenerMenuDesplegable).toHaveBeenCalledWith('estados.json');
  });

  it('should handle error in estadoOpcion', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockPeruCertificadoService.obtenerMenuDesplegable.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ error: 'Error' }))
    );
    component.estadoOpcion();
    expect(console.error).toHaveBeenCalled();
  });

  it('should fetch pais options', () => {
    const mockData = [{ id: 1, descripcion: 'México' }];
    mockPeruCertificadoService.obtenerMenuDesplegable.mockReturnValue(of(mockData));
    component.paisOpcion();
    expect(mockPeruCertificadoService.obtenerMenuDesplegable).toHaveBeenCalledWith('pais.json');
  });

  it('should handle error in paisOpcion', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockPeruCertificadoService.obtenerMenuDesplegable.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ error: 'Error' }))
    );
    component.paisOpcion();
    expect(console.error).toHaveBeenCalled();
  });

  it('should call store.setEstado when tipoEstadoSeleccion is called', () => {
    const estado = { id: 1, descripcion: 'Activo' };
    component.tipoEstadoSeleccion(estado);
    expect(mockStore.setEstado).toHaveBeenCalledWith(estado);
  });

  it('should call store.setBloque when tipoSeleccion is called', () => {
    const estado = { id: 1, descripcion: 'Bloque Test' };
    component.tipoSeleccion(estado);
    expect(mockStore.setBloque).toHaveBeenCalledWith('Bloque Test');
  });

  it('should open and close modal correctly', () => {
    const mockModal = { show: jest.fn(), hide: jest.fn() } as unknown as Modal;
    component.modalInstance = mockModal;
    component.abrirModificarModal({} as any, true);
    expect(mockStore.setFormMercancia).toHaveBeenCalled();
    expect(mockModal.show).toHaveBeenCalled();

    component.cerrarModificarModal();
    expect(mockModal.hide).toHaveBeenCalled();
  });

  it('should call store.setmercanciaTabla when emitmercaniasDatos is called', () => {
    const mercancia = { id: 1, nombre: 'Producto A' } as any;
    component.emitmercaniasDatos(mercancia);
    expect(mockStore.setmercanciaTabla).toHaveBeenCalledWith([mercancia]);
  });

  it('should set form validity in store', () => {
    component.setFormValida(true);
    expect(mockStore.setFormValida).toHaveBeenCalledWith({ certificado: true });
    expect(mockStore.setFormValidity).toHaveBeenCalledWith('certificadoOrigen', true);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
