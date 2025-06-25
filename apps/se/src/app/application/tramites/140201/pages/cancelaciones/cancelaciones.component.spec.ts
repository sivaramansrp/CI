import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelacionesComponent } from './cancelaciones.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CANCELACIONES_PASOS } from '../../constantes/cancelaciones.enum';

describe('CancelacionesComponent', () => {
  let component: CancelacionesComponent;
  let fixture: ComponentFixture<CancelacionesComponent>;
  let mockWizardComponent: { siguiente: jest.Mock; atras: jest.Mock };

  beforeEach(async () => {
    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CancelacionesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.wizardComponent = mockWizardComponent as any;
  });

  beforeEach(() => {
    mockWizardComponent.siguiente.mockClear();
    mockWizardComponent.atras.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.indice).toBe(1);
    expect(component.pantallasPasos).toBe(CANCELACIONES_PASOS);
    expect(component.datosPasos.nroPasos).toBe(CANCELACIONES_PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente on getValorIndice with accion "cont"', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras on getValorIndice with accion "atras"', () => {
    component.indice = 2;
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent if valor is out of range (0)', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent if valor is out of range (5)', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 5, accion: 'atras' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should call atras if accion is not "cont"', () => {
    component.indice = 2;
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(mockWizardComponent.atras).toHaveBeenCalled();
  });

  it('should call siguiente if accion is "cont"', () => {
    component.indice = 2;
    component.getValorIndice({ valor: 3, accion: 'cont' });
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should not throw if wizardComponent is undefined', () => {
    component.wizardComponent = undefined as any;
    expect(() => component.getValorIndice({ valor: 2, accion: 'cont' })).not.toThrow();
    expect(() => component.getValorIndice({ valor: 2, accion: 'atras' })).not.toThrow();
  });

});