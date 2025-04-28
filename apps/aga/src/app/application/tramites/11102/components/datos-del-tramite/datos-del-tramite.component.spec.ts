import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ModificacionDonacionesImmexService } from '../../services/modificacion-donaciones-immex.service';
import { Tramite11102Store } from '../../estados/tramite11102.store';
import { Tramite11102Query } from '../../estados/tramite11102.query';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ElementRef } from '@angular/core';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let modificacionService: ModificacionDonacionesImmexService;
  let store: Tramite11102Store;
  let query: Tramite11102Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, DatosDelTramiteComponent],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: ModificacionDonacionesImmexService,
          useValue: {
            getAduana: jest.fn().mockReturnValue(of({ data: [] })),
            getTipoDeMercancia: jest.fn().mockReturnValue(of({ data: [] })),
            getCondicionMercancia: jest.fn().mockReturnValue(of({ data: [] })),
            getUnidadMedida: jest.fn().mockReturnValue(of({ data: [] })),
            getAno: jest.fn().mockReturnValue(of({ data: [] })),
            getPais: jest.fn().mockReturnValue(of({ data: [] })),
          },
        },
        {
          provide: Tramite11102Store,
          useValue: {
            setAduana: jest.fn(),
            setTipoDeMercancia: jest.fn(),
            setCondicionMercancia: jest.fn(),
            setUnidadMedida: jest.fn(),
            setAno: jest.fn(),
            setPais: jest.fn(),
            setOrganismoPublico: jest.fn(),
          },
        },
        {
          provide: Tramite11102Query,
          useValue: {
            selectSolicitud$: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    modificacionService = TestBed.inject(ModificacionDonacionesImmexService);
    store = TestBed.inject(Tramite11102Store);
    query = TestBed.inject(Tramite11102Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogs on ngOnInit', () => {
    const getAduanaSpy = jest.spyOn(modificacionService, 'getAduana');
    const getTipoDeMercanciaSpy = jest.spyOn(
      modificacionService,
      'getTipoDeMercancia'
    );
    const getCondicionMercanciaSpy = jest.spyOn(
      modificacionService,
      'getCondicionMercancia'
    );
    const getUnidadMedidaSpy = jest.spyOn(
      modificacionService,
      'getUnidadMedida'
    );
    const getAnoSpy = jest.spyOn(modificacionService, 'getAno');
    const getPaisSpy = jest.spyOn(modificacionService, 'getPais');

    component.ngOnInit();

    expect(getAduanaSpy).toHaveBeenCalled();
    expect(getTipoDeMercanciaSpy).toHaveBeenCalled();
    expect(getCondicionMercanciaSpy).toHaveBeenCalled();
    expect(getUnidadMedidaSpy).toHaveBeenCalled();
    expect(getAnoSpy).toHaveBeenCalled();
    expect(getPaisSpy).toHaveBeenCalled();
  });

  it('should initialize tramiteForm and agregarMercanciasForm on donanteDomicilio', () => {
    component.donanteDomicilio();
    expect(component.tramiteForm).toBeDefined();
    expect(component.agregarMercanciasForm).toBeDefined();
  });

  it('should call setAduana when aduanaSeleccion is called', () => {
    component.tramiteForm = component.formBuilder.group({
      modificacionDonacionesImmex: component.formBuilder.group({
        aduana: ['Test Aduana'],
      }),
    });

    component.aduanaSeleccion();
    expect(store.setAduana).toHaveBeenCalledWith('Test Aduana');
  });

  it('should call setTipoDeMercancia when tipoDeMercanciaSeleccion is called', () => {
    component.agregarMercanciasForm = component.formBuilder.group({
      datosMercancia: component.formBuilder.group({
        tipoDeMercancia: ['Test Tipo'],
      }),
    });

    component.tipoDeMercanciaSeleccion();
    expect(store.setTipoDeMercancia).toHaveBeenCalledWith('Test Tipo');
  });

  it('should call setCondicionMercancia when condicionMercanciaSeleccion is called', () => {
    component.agregarMercanciasForm = component.formBuilder.group({
      datosMercancia: component.formBuilder.group({
        condicionMercancia: ['Test Condición'],
      }),
    });

    component.condicionMercanciaSeleccion();
    expect(store.setCondicionMercancia).toHaveBeenCalledWith('Test Condición');
  });

  it('should call setUnidadMedida when unidadMedidaSeleccion is called', () => {
    component.agregarMercanciasForm = component.formBuilder.group({
      datosMercancia: component.formBuilder.group({
        unidadMedida: ['Test Unidad'],
      }),
    });

    component.unidadMedidaSeleccion();
    expect(store.setUnidadMedida).toHaveBeenCalledWith('Test Unidad');
  });

  it('should call setAno when anoSeleccion is called', () => {
    component.agregarMercanciasForm = component.formBuilder.group({
      datosMercancia: component.formBuilder.group({
        ano: ['2023'],
      }),
    });

    component.anoSeleccion();
    expect(store.setAno).toHaveBeenCalledWith('2023');
  });

  it('should call setPais when paisSeleccion is called', () => {
    component.tramiteForm = component.formBuilder.group({
      modificacionDonacionesImmex: component.formBuilder.group({
        pais: ['Test País'],
      }),
    });

    component.paisSeleccion();
    expect(store.setPais).toHaveBeenCalledWith('Test País');
  });

  it('should open modal when abrirDialogoMercancias is called', () => {
    const modalElement = document.createElement('div');
    component.modalElement = { nativeElement: modalElement } as ElementRef;

    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abrirDialogoMercancias();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should close modal when cerrarModal is called', () => {
    const closeModalElement = document.createElement('button');
    component.closeModal = { nativeElement: closeModalElement } as ElementRef;

    const clickSpy = jest.spyOn(closeModalElement, 'click');
    component.cerrarModal();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(
      component['destroyNotifier$'],
      'next'
    );
    const destroyNotifierCompleteSpy = jest.spyOn(
      component['destroyNotifier$'],
      'complete'
    );

    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
