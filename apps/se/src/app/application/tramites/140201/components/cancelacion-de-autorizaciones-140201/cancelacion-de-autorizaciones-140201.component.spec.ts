import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CancelacionDeAutorizaciones140201Component } from './cancelacion-de-autorizaciones-140201.component';
import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service';
import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';
import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('../../services/cancelaciones-140201.service');
jest.mock('../../estados/cancelaciones.store');
jest.mock('../../estados/cancelaciones.query');

describe('CancelacionDeAutorizaciones140201Component', () => {
  let component: CancelacionDeAutorizaciones140201Component;
  let fixture: ComponentFixture<CancelacionDeAutorizaciones140201Component>;
  let cancelacionesService: jest.Mocked<Cancelaciones140201Service>;
  let cancelacionesStore: jest.Mocked<Cancelaciones140201Store>;
  let cancelacionesQuery: jest.Mocked<Cancelaciones140201Query>;

  beforeEach(async () => {
    // Properly mock Cancelaciones140201Query
    cancelacionesQuery = {
      rfcIngresado$: of('RFC123456789'),
      motivoCancelacion$: of('Motivo de cancelación'),
    } as unknown as jest.Mocked<Cancelaciones140201Query>;

    // Mock service methods
    cancelacionesService = {
      getCancelacionDeAutorizaciones: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<Cancelaciones140201Service>;

    // Mock store methods
    cancelacionesStore = {
      setRfcIngresado: jest.fn(),
      setMotivoCancelacion: jest.fn(),
    } as unknown as jest.Mocked<Cancelaciones140201Store>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CancelacionDeAutorizaciones140201Component, HttpClientModule], // Added HttpClientModule to fix NullInjectorError
      providers: [
        { provide: Cancelaciones140201Service, useValue: cancelacionesService },
        { provide: Cancelaciones140201Store, useValue: cancelacionesStore },
        { provide: Cancelaciones140201Query, useValue: cancelacionesQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeAutorizaciones140201Component);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.cancelacionForm).toBeDefined();
    expect(component.cancelacionForm.get('rfcIngresado')).toBeDefined();
    expect(component.cancelacionForm.get('motivoCancelacion')).toBeDefined();
  });

  it('should update the form state with observable values', () => {
    component.ngOnInit();
    component.updateState();
    expect(component.cancelacionForm.get('rfcIngresado')?.value).toBe('RFC123456789');
    expect(component.cancelacionForm.get('motivoCancelacion')?.value).toBe('Motivo de cancelación');
  });

  it('should call setRfcIngresado on updateRfcIngresado', () => {
    component.ngOnInit();
    component.cancelacionForm.get('rfcIngresado')?.setValue('RFC123456789');
    component.updateRfcIngresado();
    expect(cancelacionesStore.setRfcIngresado).toHaveBeenCalledWith('RFC123456789');
  });

  it('should call setMotivoCancelacion on updateMotivoCancelacion', () => {
    component.ngOnInit();
    component.cancelacionForm.get('motivoCancelacion')?.setValue('Motivo de cancelación');
    component.updateMotivoCancelacion();
    expect(cancelacionesStore.setMotivoCancelacion).toHaveBeenCalledWith('Motivo de cancelación');
  });

  it('should toggle mostrarContenido on alternarContenido', () => {
    component.mostrarContenido = false;
    component.alternarContenido();
    expect(component.mostrarContenido).toBeTruthy();
    component.alternarContenido();
    expect(component.mostrarContenido).toBeFalsy();
  });

  it('should get cancelacion data from service', () => {
    component.ngOnInit();
    component.getCancelacioneServiceData();
    expect(cancelacionesService.getCancelacionDeAutorizaciones).toHaveBeenCalled();
    expect(component.cancelacionData).toEqual([]);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
