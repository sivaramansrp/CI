import { TestBed } from '@angular/core/testing';
import { ImportacionMaterialDeInvestigacionCientificaComponent } from './importacion-material-de-investigacion-cientifica.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PASOS_IMPORTACION } from '../../constants/importacion-material-de-investigacion-cientifica-pasos.enum';
import { AccionBoton } from '../../enums/accion-botton.enum';

describe('ImportacionMaterialDeInvestigacionCientificaComponent', () => {
  let component: ImportacionMaterialDeInvestigacionCientificaComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportacionMaterialDeInvestigacionCientificaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionMaterialDeInvestigacionCientificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasosSolicitar with PASOS_IMPORTACION', () => {
    expect(component.pasosSolicitar).toEqual(PASOS_IMPORTACION);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS_IMPORTACION.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente() when accion is "cont"', () => {
    const wizardComponentSpy = {
      siguiente: jest.fn(),
      atras: jest.fn(),
      listaPasos: [],
      indice: 0,
      indiceActual: 0,
      estadoInicial: false,
      pasosCompletados: [],
      pasoActual: null,
      cambiarPaso: jest.fn(),
    };
    component.wizardComponent = wizardComponentSpy as any;

    const accionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(2);
    expect(wizardComponentSpy.siguiente).toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras() when accion is not "cont"', () => {
    const wizardComponentSpy = {
      siguiente: jest.fn(),
      atras: jest.fn(),
      listaPasos: [],
      indice: 0,
      indiceActual: 0,
      estadoInicial: false,
      pasosCompletados: [],
      pasoActual: null,
      cambiarPaso: jest.fn(),
    };
    component.wizardComponent = wizardComponentSpy as any;

    const accionBoton: AccionBoton = { accion: 'prev', valor: 1 };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.atras).toHaveBeenCalled();
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    const wizardComponentSpy = {
      siguiente: jest.fn(),
      atras: jest.fn(),
      listaPasos: [],
      indice: 0,
      indiceActual: 0,
      estadoInicial: false,
      pasosCompletados: [],
      pasoActual: null,
      cambiarPaso: jest.fn(),
    };
    component.wizardComponent = wizardComponentSpy as any;

    const accionBoton: AccionBoton = { accion: 'cont', valor: 5 }; // Out of range
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1); // Default value
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should handle getValorIndice correctly for valid values and actions', () => {
    const wizardComponentSpy = {
      siguiente: jest.fn(),
      atras: jest.fn(),
      listaPasos: [],
      indice: 0,
      indiceActual: 0,
      estadoInicial: false,
      pasosCompletados: [],
      pasoActual: null,
      cambiarPaso: jest.fn(),
    };
    component.wizardComponent = wizardComponentSpy as any;

    // Test case for "cont" action
    const accionBotonCont: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBotonCont);
    expect(component.indice).toBe(2);
    expect(wizardComponentSpy.siguiente).toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();

    // Test case for "prev" action
    const accionBotonPrev: AccionBoton = { accion: 'prev', valor: 1 };
    component.getValorIndice(accionBotonPrev);
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.atras).toHaveBeenCalled();
    expect(wizardComponentSpy.siguiente).toHaveBeenCalledTimes(1); // No additional calls
  });

  it('should not update indice or call wizardComponent methods for invalid values', () => {
    const wizardComponentSpy = {
      siguiente: jest.fn(),
      atras: jest.fn(),
      listaPasos: [],
      indice: 0,
      indiceActual: 0,
      estadoInicial: false,
      pasosCompletados: [],
      pasoActual: null,
      cambiarPaso: jest.fn(),
    };
    component.wizardComponent = wizardComponentSpy as any;

    // Test case for invalid value (out of range)
    const accionBotonInvalid: AccionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accionBotonInvalid);
    expect(component.indice).toBe(1); // Default value remains unchanged
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();

    // Test case for another invalid value (negative)
    const accionBotonNegative: AccionBoton = { accion: 'prev', valor: -1 };
    component.getValorIndice(accionBotonNegative);
    expect(component.indice).toBe(1); // Default value remains unchanged
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });
});