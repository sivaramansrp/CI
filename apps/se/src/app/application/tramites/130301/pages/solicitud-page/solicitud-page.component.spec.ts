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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize pasos with PASOS', () => {
    expect(component.pasos).toBe(PASOS);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and call wizardComponent.siguiente on getValorIndice with "cont"', () => {
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on getValorIndice with "atras"', () => {
    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });
});
