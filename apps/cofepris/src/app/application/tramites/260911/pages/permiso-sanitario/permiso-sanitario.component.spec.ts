import { PermisoSanitarioComponent } from './permiso-sanitario.component';
import { ChangeDetectorRef } from '@angular/core';
import { Tramite260911Store } from '../../estados/tramite260911.store';
import { of } from 'rxjs';

describe('PermisoSanitarioComponent', () => {
  let component: PermisoSanitarioComponent;
  let cdr: ChangeDetectorRef;
  let store: Tramite260911Store;

  beforeEach(() => {
    cdr = { detectChanges: jest.fn() } as any;
    store = {
      _select: jest.fn()
    } as any;
    component = new PermisoSanitarioComponent(cdr, store);
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
    component.pasoUnoComponent = {
      validateRequiredFields: jest.fn().mockReturnValue(true),
      markAllFieldsTouched: jest.fn(),
      getPagoDeDerechosComponent: jest.fn().mockReturnValue({
        pagoDeDerechosForm: {
          valid: true,
          value: {
            claveDeReferencia: '123',
            cadenaPagoDependencia: 'abc',
            clave: '456',
            llaveDePago: '789',
            fecPago: '2024-01-01',
            impPago: '100'
          },
          controls: {
            claveDeReferencia: { updateValueAndValidity: jest.fn(), markAsTouched: jest.fn(), markAsDirty: jest.fn(), setErrors: jest.fn(), value: '123' },
            cadenaPagoDependencia: { updateValueAndValidity: jest.fn(), markAsTouched: jest.fn(), markAsDirty: jest.fn(), setErrors: jest.fn(), value: 'abc' },
            clave: { updateValueAndValidity: jest.fn(), markAsTouched: jest.fn(), markAsDirty: jest.fn(), setErrors: jest.fn(), value: '456' },
            llaveDePago: { updateValueAndValidity: jest.fn(), markAsTouched: jest.fn(), markAsDirty: jest.fn(), setErrors: jest.fn(), value: '789' },
            fecPago: { updateValueAndValidity: jest.fn(), markAsTouched: jest.fn(), markAsDirty: jest.fn(), setErrors: jest.fn(), value: '2024-01-01' },
            impPago: { updateValueAndValidity: jest.fn(), markAsTouched: jest.fn(), markAsDirty: jest.fn(), setErrors: jest.fn(), value: '100' }
          }
        },
        mostrarErroresDeCampoPago: false
      })
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update anterior button visibility', () => {
    component.indice = 1;
    component.updateAnteriorButtonVisibility();
    expect(component.ocultarBtnAnterior).toBe(true);
    component.indice = 2;
    component.updateAnteriorButtonVisibility();
    expect(component.ocultarBtnAnterior).toBe(false);
  });

  it('should handle getValorIndice for continuar action', () => {
    component.indice = 1;
    component.subTabIndex = 5;
    const event = { accion: 'cont', valor: 5 };
    component.getValorIndice(event);
    expect(component.indice).toBe(2);
    expect(component.subTabIndex).toBe(1);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should handle getValorIndice for atras action', () => {
    component.indice = 2;
    component.subTabIndex = 1;
    const event = { accion: 'atras', valor: 1 };
    component.getValorIndice(event);
    expect(component.indice).toBe(1);
    expect(component.subTabIndex).toBe(5);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should show payment modal if payment fields are not filled and hasTriedPagoValidation is false', () => {
    component.hasTriedPagoValidation = false;
    (store._select as jest.Mock).mockReturnValue(of({
      claveDeReferencia: '',
      cadenaPagoDependencia: '',
      clave: '',
      llaveDePago: '',
      fecPago: '',
      impPago: ''
    }));
    component.pasoUnoComponent.validateRequiredFields = jest.fn().mockReturnValue(true);
    const event = { accion: 'cont', valor: 2 };
    component.onContinuar(event);
    expect(component.showPaymentModal).toBe(true);
    expect(component.lastContinueEvent).toBe(event);
    expect(cdr.detectChanges).toHaveBeenCalled();
  });

  it('should not proceed if required fields are invalid', () => {
    component.hasTriedPagoValidation = true;
    (store._select as jest.Mock).mockReturnValue(of({
      claveDeReferencia: '123',
      cadenaPagoDependencia: 'abc',
      clave: '456',
      llaveDePago: '789',
      fecPago: '2024-01-01',
      impPago: '100'
    }));
    component.pasoUnoComponent.validateRequiredFields = jest.fn().mockReturnValue(false);
    const event = { accion: 'cont', valor: 2 };
    component.onContinuar(event);
    expect(component.message).toBe('¡Error de registro! Faltan campos por capturer');
  });

  it('should proceed if all fields are valid', () => {
    component.hasTriedPagoValidation = true;
    (store._select as jest.Mock).mockReturnValue(of({
      claveDeReferencia: '123',
      cadenaPagoDependencia: 'abc',
      clave: '456',
      llaveDePago: '789',
      fecPago: '2024-01-01',
      impPago: '100'
    }));
    component.pasoUnoComponent.validateRequiredFields = jest.fn().mockReturnValue(true);
    const event = { accion: 'cont', valor: 2 };
    component.onContinuar(event);
    expect(component.message).toBeUndefined();
  });

  it('should handle onPaymentModalYes with valid fields', () => {
    component.lastContinueEvent = { accion: 'cont', valor: 2 };
    component.onPaymentModalYes();
    expect(component.message).toBeUndefined();
    expect(component.hasTriedPagoValidation).toBe(true);
    expect(component.showPaymentModal).toBe(false);
    expect(component.lastContinueEvent).toBeNull();
  });

  it('should handle onPaymentModalYes with invalid payment fields', () => {
    component.pasoUnoComponent.getPagoDeDerechosComponent = jest.fn().mockReturnValue({
      pagoDeDerechosForm: {
        valid: false,
        value: {
          claveDeReferencia: '',
          cadenaPagoDependencia: '',
          clave: '',
          llaveDePago: '',
          fecPago: '',
          impPago: ''
        },
        controls: {}
      }
    });
    component.onPaymentModalYes();
    expect(component.message).toBe('Todos los campos de pago son requeridos');
    expect(component.hasTriedPagoValidation).toBe(false);
    expect(component.showPaymentModal).toBe(false);
  });

  it('should handle onPaymentModalNo', () => {
    jest.useFakeTimers();
    component.pasoUnoComponent.getPagoDeDerechosComponent = jest.fn().mockReturnValue({
      pagoDeDerechosForm: {
        controls: {
          claveDeReferencia: { markAsTouched: jest.fn(), markAsDirty: jest.fn(), updateValueAndValidity: jest.fn() }
        }
      },
      mostrarErroresDeCampoPago: false
    });
    component.onPaymentModalNo();
    expect(component.showPaymentModal).toBe(false);
    expect(component.lastContinueEvent).toBeNull();
    expect(component.hasTriedPagoValidation).toBe(false);
    expect(component.subTabIndex).toBe(4);
    jest.runAllTimers();
  });

  it('should reset hasTriedPagoValidation on onPagoFieldsCleared', () => {
    component.hasTriedPagoValidation = true;
    component.onPagoFieldsCleared();
    expect(component.hasTriedPagoValidation).toBe(false);
  });

  it('should handle onPasoUnoTabChanged', () => {
    component.pasoUnoComponent.getPagoDeDerechosComponent = jest.fn().mockReturnValue({
      mostrarErroresDeCampoPago: true
    });
    component.onPasoUnoTabChanged(3);
    expect(component.subTabIndex).toBe(3);
    expect(component.showPaymentModal).toBe(false);
    expect(component.lastContinueEvent).toBeNull();
  });

  it('should return true for shouldShowContinuarButton getter', () => {
    expect(component.shouldShowContinuarButton).toBe(true);
  });

  it('should return correct value for inSubTabOfMain1 getter', () => {
    component.indice = 1;
    component.subTabIndex = 2;
    expect(component.inSubTabOfMain1).toBe(true);
    component.subTabIndex = 1;
    expect(component.inSubTabOfMain1).toBe(false);
    component.indice = 2;
    component.subTabIndex = 2;
    expect(component.inSubTabOfMain1).toBe(false);
  });
});