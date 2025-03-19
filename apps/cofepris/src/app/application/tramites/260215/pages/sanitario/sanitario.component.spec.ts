import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SanitarioComponent } from './sanitario.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

describe('SanitarioComponent', () => {
  let component: SanitarioComponent;
  let fixture: ComponentFixture<SanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanitarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Handle unknown elements like 'app-wizard'
    }).compileComponents();

    fixture = TestBed.createComponent(SanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos).toBeDefined();
    expect(component.datosPasos).toEqual({
      nroPasos: component.pasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and call wizardComponent.siguiente() when getValorIndice is called with "cont"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.indice = 1;

    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras() when getValorIndice is called with "ant"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.indice = 3;

    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    const wizardSpySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const wizardSpyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.indice = 1;

    component.getValorIndice({ accion: 'cont', valor: 0 });
    component.getValorIndice({ accion: 'ant', valor: 6 });

    expect(component.indice).toBe(1);
    expect(wizardSpySiguiente).not.toHaveBeenCalled();
    expect(wizardSpyAtras).not.toHaveBeenCalled();
  });

  it('should not call wizardComponent methods if wizardComponent is undefined', () => {
    component.wizardComponent = undefined as unknown as WizardComponent;

    expect(() => {
      component.getValorIndice({ accion: 'cont', valor: 2 });
    }).not.toThrow();
  });
});
