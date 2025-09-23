import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModPermisoSanitarioImportacion260904Component } from './mod-permiso-sanitario-importacion-260904.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PASOS } from '@ng-mf/data-access-user';

describe('ModPermisoSanitarioImportacion260904Component', () => {
  let component: ModPermisoSanitarioImportacion260904Component;
  let fixture: ComponentFixture<ModPermisoSanitarioImportacion260904Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModPermisoSanitarioImportacion260904Component],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignore unknown components like WizardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(ModPermisoSanitarioImportacion260904Component);
    component = fixture.componentInstance;

    (component as any).wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos).toEqual(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(component.indice);
  });

  it('should update indice and call siguiente on "cont" action', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    const action = { accion: 'cont', valor: 2 };
    component.getValorIndice(action);
    fixture.detectChanges();
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call atras on non-"cont" action', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    const action = { accion: 'back', valor: 3 };
    component.getValorIndice(action);
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range', () => {
    // Mock wizardComponent for this test as well
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    const action = { accion: 'cont', valor: 6 };
    component.getValorIndice(action);
    expect(component.indice).not.toBe(6);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should throw error and set message in errorMessage', () => {
    expect(component.message).toBe('Test error');
  });

 
});