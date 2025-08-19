import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { DespachoMercanciasSolicitudComponent } from './despacho-mercancias-solicitud.component';
import { Tramite303StoreService } from '../../../../core/estados/tramites/tramite303.store';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';

describe('DespachoMercanciasSolicitudComponent', () => {
  let component: DespachoMercanciasSolicitudComponent;
  let mockTramite303State: Partial<Tramite303StoreService>;
  let mockTramite303Query: Partial<Tramite303Query>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    // Crear mocks simples para los servicios
    mockTramite303State = {
      setSelectImmex: jest.fn(),
      setCheckboxesImmex: jest.fn(),
      setCumplimientoValue: jest.fn(),
      setAutorizarValue: jest.fn(),
      setListadoValue: jest.fn(),
      setCertificadosValue: jest.fn(),
      setArt17Value: jest.fn(),
      setBuzonValue: jest.fn(),
      setCuentaImmexValue: jest.fn(),
      setCheckboxImportacion1Value: jest.fn(),
      setCheckboxImportacion2Value: jest.fn()
    };

    mockTramite303Query = {
      selectSolicitud$: of({
        mostrarCheckboxesImmex: false,
        mostrarSelectImmex: true,
        cumplimiento: 'a',
        autorizar: 'a',
        listado: 'a',
        certificados: 'a',
        art17: 'a',
        buzon: 'a',
        cuentaImmex: 'a',
        checkboxImportacion1: false,
        checkboxImportacion2: false,
        indice: 0,
        tipoFigura: ''
      })
    };

    formBuilder = new FormBuilder();
    component = new DespachoMercanciasSolicitudComponent(
      formBuilder,
      mockTramite303State as Tramite303StoreService,
      mockTramite303Query as Tramite303Query
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component correctly on ngOnInit', () => {
    component.ngOnInit();

    // El catNumeroIMMEX puede ser undefined en el entorno de pruebas debido al import del JSON
    expect(component.formDespacho).toBeDefined();
    expect(component.mostrarSelectImmex).toBe(true);
    expect(component.mostrarCheckboxesImmex).toBe(false);
  });

  it('should create form with all required controls', () => {
    component.ngOnInit();

    const form = component.formDespacho;
    expect(form.get('cumplimiento')).toBeTruthy();
    expect(form.get('autorizar')).toBeTruthy();
    expect(form.get('listado')).toBeTruthy();
    expect(form.get('certificados')).toBeTruthy();
    expect(form.get('art17')).toBeTruthy();
    expect(form.get('buzon')).toBeTruthy();
    expect(form.get('cuentaImmex')).toBeTruthy();
    expect(form.get('checkboxImportacion1')).toBeTruthy();
    expect(form.get('checkboxImportacion2')).toBeTruthy();
    expect(form.get('immex')).toBeTruthy();
  });

  it('should create notification object correctly', () => {
    component.notificaciones();

    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: 'alert',
      categoria: 'info',
      modo: 'action',
      titulo: '',
      mensaje: 'Es un requisito necesario para acceder al Registro de Despacho de Mercancías de las empresas, de conformidad con la regla 7.5.1. de las.G.C.E.',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    });
  });

  it('should call store service methods in setValoresStore', () => {
    component.ngOnInit();
    
    component.setValoresStore(component.formDespacho, 'cumplimiento', 'setCumplimientoValue');
    expect(mockTramite303State.setCumplimientoValue).toHaveBeenCalledWith('a');
  });

  it('should handle checkbox values correctly in setValoresStore', () => {
    component.ngOnInit();
    component.formDespacho.get('checkboxImportacion1')?.setValue(true);
    
    component.setValoresStore(component.formDespacho, 'checkboxImportacion1', 'setCheckboxImportacion1Value');
    expect(mockTramite303State.setCheckboxImportacion1Value).toHaveBeenCalledWith(true);
  });

  it('should toggle IMMEX display when cuentaImmex changes to "a"', () => {
    component.ngOnInit();

    component.formDespacho.get('cuentaImmex')?.setValue('a');
    
    expect(component.mostrarSelectImmex).toBe(true);
    expect(component.mostrarCheckboxesImmex).toBe(false);
    expect(mockTramite303State.setSelectImmex).toHaveBeenCalledWith(true);
    expect(mockTramite303State.setCheckboxesImmex).toHaveBeenCalledWith(false);
  });

  it('should toggle IMMEX display when cuentaImmex changes to "aa"', () => {
    component.ngOnInit();

    component.formDespacho.get('cuentaImmex')?.setValue('aa');
    
    expect(component.mostrarSelectImmex).toBe(false);
    expect(component.mostrarCheckboxesImmex).toBe(true);
    expect(mockTramite303State.setSelectImmex).toHaveBeenCalledWith(false);
    expect(mockTramite303State.setCheckboxesImmex).toHaveBeenCalledWith(true);
  });

  it('should call notificaciones when specific form values change', () => {
    component.ngOnInit();
    jest.spyOn(component, 'notificaciones');

    component.formDespacho.get('cumplimiento')?.setValue('aa');
    expect(component.notificaciones).toHaveBeenCalled();
  });

  it('should complete destroyNotifier on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
