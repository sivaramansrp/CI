import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionOtrosVehiculosUsadosPageComponent } from './importacion-otros-vehiculos-usados-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ImportacionOtrosVehiculosUsadosPageComponent', () => {
  let component: ImportacionOtrosVehiculosUsadosPageComponent;
  let fixture: ComponentFixture<ImportacionOtrosVehiculosUsadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportacionOtrosVehiculosUsadosPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionOtrosVehiculosUsadosPageComponent);
    component = fixture.componentInstance;

    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct default values', () => {
    expect(component.indice).toBe(1);
    expect(component.pantallasPasos).toBeDefined();
    expect(component.pantallasPasos).toBeDefined();
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update the indice and call "siguiente" when action is "cont"', () => {
    const mockEvent = { accion: 'cont', valor: 2 };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update the indice and call "atras" when action is not "cont"', () => {
    const mockEvent = { accion: 'prev', valor: 2 };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update the indice or call any wizard methods if valor is out of range', () => {
    const mockEvent = { accion: 'cont', valor: 0 };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});