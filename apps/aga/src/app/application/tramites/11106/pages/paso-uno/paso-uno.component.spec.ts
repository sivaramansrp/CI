import { TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { EventEmitter } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/11106/pasos.enum';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [],
    }).compileComponents();

    const fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.pasos).toBe(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should emit continuarEvento when continuar is called', () => {
    const emitSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(emitSpy).toHaveBeenCalledWith('');
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with "ant"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');

    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();

    component.getValorIndice({ accion: 'ant', valor: 6 });
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });
});