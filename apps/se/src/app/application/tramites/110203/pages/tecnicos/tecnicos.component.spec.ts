import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TecnicosComponent } from './tecnicos.component';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TecnicosComponent', () => {
  let component: TecnicosComponent;
  let fixture: ComponentFixture<TecnicosComponent>;

  const mockWizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TecnicosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TecnicosComponent);
    component = fixture.componentInstance;
    component.wizardComponent = mockWizardComponent as unknown as WizardComponent;
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update indice and call wizard.siguiente when accion is "cont"', () => {
    const accion: AccionBoton = { valor: 2, accion: 'cont' };

    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call wizard.atras when accion is not "cont"', () => {
    const accion: AccionBoton = { valor: 3, accion: 'back' };

    component.getValorIndice(accion);

    expect(component.indice).toBe(3);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should ignore invalid valor outside 1-4', () => {
    const accion: AccionBoton = { valor: 0, accion: 'cont' };

    component.getValorIndice(accion);

    // Value remains default 1
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });
});
