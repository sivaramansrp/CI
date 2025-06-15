import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoSanitarioComponent } from './permiso-sanitario.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PASOS } from '@ng-mf/data-access-user';

describe('PermisoSanitarioComponent', () => {
  let component: PermisoSanitarioComponent;
  let fixture: ComponentFixture<PermisoSanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoSanitarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignore unknown components like WizardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoSanitarioComponent);
    component = fixture.componentInstance;

    // Mock wizardComponent before view init
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
    // Ensure wizardComponent is mocked for this test
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    const action = { accion: 'cont', valor: 2 };
    component.getValorIndice(action);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call atras on non-"cont" action', () => {
    // Ensure wizardComponent is mocked for this test
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
    expect(() => component.errorMessage('Test error')).toThrow('Method not implemented.');
    expect(component.message).toBe('Test error');
  });

  it('onSubmit static method should throw error', () => {
    expect(() => PermisoSanitarioComponent.onSubmit()).toThrow('Method not implemented.');
  });
});
