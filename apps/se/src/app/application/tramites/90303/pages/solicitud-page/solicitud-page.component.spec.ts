import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.TEXTO_DE_ALERTA).toBe(
      'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.'
    );
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update the indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should handle getValorIndice with "cont" action', () => {
    const mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    component.wizardComponent = mockWizardComponent;

    const accionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should handle getValorIndice with "ant" action', () => {
    const mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    component.wizardComponent = mockWizardComponent;

    const accionBoton = { accion: 'ant', valor: 1 };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range in getValorIndice', () => {
    const mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    component.wizardComponent = mockWizardComponent;

    const accionBoton = { accion: 'cont', valor: 6 }; 
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });
});