import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CancelacionDeAutorizacionesComponent } from './cancelacion-de-autorizaciones.component';
import { CancelacionesService } from '../../services/cancelaciones.service';
import { CancelacionesStore } from '../../estados/cancelaciones.store';
import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('../../services/cancelaciones.service');
jest.mock('../../estados/cancelaciones.store');
jest.mock('../../estados/cancelaciones.query');

describe('CancelacionDeAutorizacionesComponent', () => {
  let component: CancelacionDeAutorizacionesComponent;
  let fixture: ComponentFixture<CancelacionDeAutorizacionesComponent>;
  let cancelacionesService: jest.Mocked<CancelacionesService>;
  let cancelacionesStore: jest.Mocked<CancelacionesStore>;
  let cancelacionesQuery: jest.Mocked<CancelacionesQuery>;

  beforeEach(async () => {
    // Properly mock CancelacionesQuery
    cancelacionesQuery = {
      rfcIngresado$: of('RFC123456789'),
      motivoCancelacion$: of('Motivo de cancelación'),
    } as unknown as jest.Mocked<CancelacionesQuery>;

    // Mock service methods
    cancelacionesService = {
      getCancelacionDeAutorizaciones: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<CancelacionesService>;

    // Mock store methods
    cancelacionesStore = {
      setRfcIngresado: jest.fn(),
      setMotivoCancelacion: jest.fn(),
    } as unknown as jest.Mocked<CancelacionesStore>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CancelacionDeAutorizacionesComponent, HttpClientModule], // Added HttpClientModule to fix NullInjectorError
      providers: [
        { provide: CancelacionesService, useValue: cancelacionesService },
        { provide: CancelacionesStore, useValue: cancelacionesStore },
        { provide: CancelacionesQuery, useValue: cancelacionesQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeAutorizacionesComponent);
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
    component.actualizarEstado();
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
