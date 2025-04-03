import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportacionMineralesDeHierroComponent } from './exportacion-minerales-de-hierro.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/exportacion-minerales-de-hierro-pasos.enum';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ExportacionMineralesDeHierroComponent', () => {
  let component: ExportacionMineralesDeHierroComponent;
  let fixture: ComponentFixture<ExportacionMineralesDeHierroComponent>;
  let wizardComponentMock: WizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportacionMineralesDeHierroComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements like WizardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(ExportacionMineralesDeHierroComponent);
    component = fixture.componentInstance;

    // Mock WizardComponent instance
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    // Assign the mock to the component's ViewChild
    component.wizardComponent = wizardComponentMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasosSolicitar correctly', () => {
    expect(component.pasosSolicitar).toEqual(PASOS_EXPORTACION);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS_EXPORTACION.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  describe('getValorIndice', () => {
    it('should update indice and call wizardComponent.siguiente when accion is "cont"', () => {
      const accion: AccionBoton = { valor: 2, accion: 'cont' };

      // Spy on the wizardComponent.siguiente method
      const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');

      component.getValorIndice(accion);

      expect(component.indice).toBe(2);
      expect(siguienteSpy).toHaveBeenCalled();
    });

    it('should update indice and call wizardComponent.atras when accion is not "cont"', () => {
      const accion: AccionBoton = { valor: 3, accion: 'atras' };

      // Spy on the wizardComponent.atras method
      const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

      component.getValorIndice(accion);

      expect(component.indice).toBe(3);
      expect(atrasSpy).toHaveBeenCalled();
    });

    it('should not change indice or call any method if valor is out of range', () => {
      const accion: AccionBoton = { valor: 5, accion: 'cont' };

      const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
      const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');

      component.getValorIndice(accion);

      expect(component.indice).toBe(1); // Default index
      expect(siguienteSpy).not.toHaveBeenCalled();
      expect(atrasSpy).not.toHaveBeenCalled();
    });
  });

  describe('ViewChild - wizardComponent', () => {
    it('should have a wizardComponent instance', () => {
      expect(component.wizardComponent).toBeDefined();
    });

    it('should call siguiente on wizardComponent', () => {
      const siguienteSpy = jest.spyOn(wizardComponentMock, 'siguiente');
      component.wizardComponent.siguiente();
      expect(siguienteSpy).toHaveBeenCalled();
    });

    it('should call atras on wizardComponent', () => {
      const atrasSpy = jest.spyOn(wizardComponentMock, 'atras');
      component.wizardComponent.atras();
      expect(atrasSpy).toHaveBeenCalled();
    });
  });
});