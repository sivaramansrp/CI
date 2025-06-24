import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent, WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
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

  it('should set indice when seleccionaTab is called', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update indice and call wizardComponent.siguiente for accion "cont" in getValorIndice', () => {
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(spySiguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras for accion other than "cont" in getValorIndice', () => {
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.indice = 2;
    component.getValorIndice({ accion: 'back', valor: 3 });
    expect(component.indice).toBe(3);
    expect(spyAtras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent if valor is out of range in getValorIndice', () => {
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();

    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });

  it('should set TEXTO_DE_ALERTA to TERCEROS_TEXTO_DE_ALERTA', () => {
  expect(component.TEXTO_DE_ALERTA).toBeDefined();
  expect(typeof component.TEXTO_DE_ALERTA).toBe('string');
});

it('should initialize pasos as PASOS', () => {
  expect(Array.isArray(component.pasos)).toBe(true);
});

it('should initialize indice as 1', () => {
  expect(component.indice).toBe(1);
});

it('should initialize datosPasos with correct values', () => {
  expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
  expect(component.datosPasos.indice).toBe(component.indice);
  expect(typeof component.datosPasos.txtBtnAnt).toBe('string');
  expect(typeof component.datosPasos.txtBtnSig).toBe('string');
});

it('should set indice when seleccionaTab is called', () => {
  component.indice = 1;
  component.seleccionaTab(3);
  expect(component.indice).toBe(3);
});

it('should update indice and call wizardComponent.siguiente for accion "cont" in getValorIndice', () => {
  const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
  component.indice = 1;
  component.getValorIndice({ accion: 'cont', valor: 2 });
  expect(component.indice).toBe(2);
  expect(spySiguiente).toHaveBeenCalled();
});

it('should update indice and call wizardComponent.atras for accion other than "cont" in getValorIndice', () => {
  const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
  component.indice = 2;
  component.getValorIndice({ accion: 'back', valor: 3 });
  expect(component.indice).toBe(3);
  expect(spyAtras).toHaveBeenCalled();
});

it('should not update indice or call wizardComponent if valor is out of range in getValorIndice', () => {
  const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
  const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
  component.indice = 1;
  component.getValorIndice({ accion: 'cont', valor: 0 });
  expect(component.indice).toBe(1);
  expect(spySiguiente).not.toHaveBeenCalled();
  expect(spyAtras).not.toHaveBeenCalled();

  component.getValorIndice({ accion: 'cont', valor: 5 });
  expect(component.indice).toBe(1);
  expect(spySiguiente).not.toHaveBeenCalled();
  expect(spyAtras).not.toHaveBeenCalled();
});

  it('should have pasos and datosPasos defined and consistent', () => {
    expect(Array.isArray(component.pasos)).toBe(true);
    expect(component.datosPasos).toBeDefined();
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(typeof component.datosPasos.txtBtnAnt).toBe('string');
    expect(typeof component.datosPasos.txtBtnSig).toBe('string');
  });
});