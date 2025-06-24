import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { BtnContinuarComponent, PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      imports: [BtnContinuarComponent ,WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pasos defined', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should have wizardComponent defined', () => {
    expect(component.wizardComponent).toBeDefined();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice value', () => {
    component.indice = 2;
    expect(component.indice).toBe(2);
  });

  it('should call wizardComponent methods', () => {
    jest.spyOn(component.wizardComponent, 'siguiente');
jest.spyOn(component.wizardComponent, 'atras');

    component.wizardComponent.siguiente();
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    component.wizardComponent.atras();
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });
});
describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      imports: [WizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pasos defined', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should have wizardComponent defined', () => {
    expect(component.wizardComponent).toBeDefined();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice value', () => {
    component.indice = 2;
    expect(component.indice).toBe(2);
  });

  it('should call wizardComponent methods', () => {
  jest.spyOn(component.wizardComponent, 'siguiente');
jest.spyOn(component.wizardComponent, 'atras');

    component.wizardComponent.siguiente();
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    component.wizardComponent.atras();
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should update indice and call siguiente when accion is cont', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    const event = { accion: 'cont', valor: 2 };
    component.getValorIndice(event);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call atras when accion is not cont', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    const event = { accion: 'back', valor: 3 };
    component.getValorIndice(event);
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    component.indice = 1;
    const event = { accion: 'cont', valor: 0 };
    component.getValorIndice(event);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();

    const event2 = { accion: 'cont', valor: 5 };
    component.getValorIndice(event2);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should have datosPasos initialized correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });
});
