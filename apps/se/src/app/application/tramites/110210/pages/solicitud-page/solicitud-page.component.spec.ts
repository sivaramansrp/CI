import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;

    // Mock del WizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    fixture.detectChanges();
  });

  beforeEach(() => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar pasos con PASOS', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('debe inicializar datosPasos con los valores correctos', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debe actualizar el indice cuando se llama seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debe llamar wizardComponent.siguiente cuando getValorIndice se llama con accion "cont"', () => {
    const accionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe llamar wizardComponent.atras cuando getValorIndice se llama con una accion diferente de "cont"', () => {
    const accionBoton = { accion: 'prev', valor: 1 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debe actualizar indice ni llamar métodos de wizardComponent si valor está fuera de rango', () => {
    const accionBoton = { accion: 'cont', valor: 6 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1); // Valor por defecto
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});