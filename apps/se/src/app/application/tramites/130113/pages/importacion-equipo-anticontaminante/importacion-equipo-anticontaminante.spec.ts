import { AccionBoton } from '../../enums/accion-botton.enum';
import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionEquipoAnticontaminanteComponent } from './importacion-equipo-anticontaminante';
import { PASOS } from '../../constants/pasos.enum';

describe('ImportacionEquipoAnticontaminanteComponent', () => {
  let component: ImportacionEquipoAnticontaminanteComponent;
  let fixture: ComponentFixture<ImportacionEquipoAnticontaminanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportacionEquipoAnticontaminanteComponent],
      imports: [WizardComponent, BtnContinuarComponent, TituloComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionEquipoAnticontaminanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have initial tabIndex value as 1', () => {
    expect(component.tabIndex).toBe(1);
  });

  it('should have pasos defined', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should not update indice if valor is out of range', () => {
    const initialIndice = component.indice;
    const accionBoton: AccionBoton = { valor: 5, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(initialIndice);
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
    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const accion: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on getValorIndice with "ant"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    const accion: AccionBoton = { valor: 1, accion: 'ant' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range', () => {
    const accion: AccionBoton = { valor: 5, accion: 'cont' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(1); // Default value
  });
});