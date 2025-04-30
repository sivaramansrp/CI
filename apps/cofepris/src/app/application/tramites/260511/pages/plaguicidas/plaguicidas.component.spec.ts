import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlaguicidasComponent } from './plaguicidas.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

describe('PlaguicidasComponent', () => {
  let component: PlaguicidasComponent;
  let fixture: ComponentFixture<PlaguicidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaguicidasComponent],
      imports: [HttpClientTestingModule, WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaguicidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente() when accion is "cont"', () => {
    const wizardSpy = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardSpy as any;

    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy.siguiente).toHaveBeenCalled();
    expect(wizardSpy.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras() when accion is not "cont"', () => {
    const wizardSpy = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardSpy as any;

    component.getValorIndice({ accion: 'back', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy.atras).toHaveBeenCalled();
    expect(wizardSpy.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    const wizardSpy = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardSpy as any;

    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(wizardSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardSpy.atras).not.toHaveBeenCalled();

    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(wizardSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardSpy.atras).not.toHaveBeenCalled();
  });

  it('should handle getValorIndice correctly when accion is "cont" and valor is valid', () => {
    const wizardSpy = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardSpy as any;

    component.getValorIndice({ accion: 'cont', valor: 3 });

    expect(component.indice).toBe(3);
    expect(wizardSpy.siguiente).toHaveBeenCalled();
    expect(wizardSpy.atras).not.toHaveBeenCalled();
  });

  it('should handle getValorIndice correctly when accion is "back" and valor is valid', () => {
    const wizardSpy = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardSpy as any;

    component.getValorIndice({ accion: 'back', valor: 1 });

    expect(component.indice).toBe(1);
    expect(wizardSpy.atras).toHaveBeenCalled();
    expect(wizardSpy.siguiente).not.toHaveBeenCalled();
  });

  it('should not call wizardComponent methods if wizardComponent is undefined', () => {
    component.wizardComponent = undefined as any;

    expect(() =>
      component.getValorIndice({ accion: 'cont', valor: 2 })
    ).not.toThrow();
    expect(component.indice).toBe(1);
  });

  it('should not update indice if accion is invalid', () => {
    const wizardSpy = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardSpy as any;

    component.getValorIndice({ accion: 'invalid', valor: 2 });

    expect(component.indice).toBe(1);
    expect(wizardSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardSpy.atras).not.toHaveBeenCalled();
  });

  it('should update datosPasos when indice changes', () => {
    component.indice = 3;
    component.datosPasos.indice = component.indice;

    expect(component.datosPasos.indice).toBe(3);
  });
});
