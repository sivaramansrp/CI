import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src/core/enums/130301/modificacion.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let mockWizardComponent: { siguiente: jest.Mock; atras: jest.Mock };

  beforeEach(async () => {
    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.wizardComponent = mockWizardComponent as any;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    if (component) {
      component.indice = 1;
    }
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar indice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe inicializar pasos con PASOS', () => {
    expect(component.pasos).toBe(PASOS);
  });

  it('debe inicializar datosPasos correctamente', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debe actualizar indice y llamar a wizardComponent.siguiente al ejecutar getValorIndice con "cont"', () => {
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe actualizar indice y llamar a wizardComponent.atras al ejecutar getValorIndice con "atras"', () => {
    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
  });

  it('no debe actualizar indice ni llamar métodos de wizardComponent si valor está fuera de rango', () => {
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });
});
