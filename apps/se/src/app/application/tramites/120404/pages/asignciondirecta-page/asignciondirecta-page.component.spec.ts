import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciondirectaPageComponent } from './asignciondirecta-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ASIGNACION } from '../../constants/asignacion.enum';

describe('AsignciondirectaPageComponent', () => {
  let component: AsignciondirectaPageComponent;
  let fixture: ComponentFixture<AsignciondirectaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignciondirectaPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciondirectaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct steps', () => {
    expect(component.pasos).toEqual(ASIGNACION);
  });

  it('should initialize with the correct step index', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize DatosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: ASIGNACION.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and navigate forward', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any; 

    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and navigate backward', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    component.getValorIndice({ accion: 'back', valor: 1 });

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should ignore invalid indice values', () => {
    component.getValorIndice({ accion: 'cont', valor: 6 });

    expect(component.indice).toBe(1); 
  });
});
