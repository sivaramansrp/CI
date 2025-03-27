import { AccionBoton } from '../../enums/accion-botton.enum';
import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculosUsadosAdaptadosComponent } from './vehiculos-usados-adaptados.component';
import { PASOS } from '../../constants/pasos.enum';

describe('ImportacionNeumaticosComercializarComponent', () => {
  let component: VehiculosUsadosAdaptadosComponent;
  let fixture: ComponentFixture<VehiculosUsadosAdaptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculosUsadosAdaptadosComponent],
      imports: [WizardComponent, BtnContinuarComponent, TituloComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosUsadosAdaptadosComponent);
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
});