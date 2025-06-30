import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SanitarioComponent } from './sanitario.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

describe('SanitarioComponent', () => {
  let component: SanitarioComponent;
  let fixture: ComponentFixture<SanitarioComponent>;
  let wizardMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanitarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar pasos y datosPasos correctamente', () => {
    expect(component.pasos).toBeDefined();
    expect(component.datosPasos).toEqual({
      nroPasos: component.pasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debería actualizar el índice y llamar a wizardComponent.siguiente() cuando getValorIndice es llamado con "cont"', () => {
    wizardMock = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardMock;
    component.indice = 1;

    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardMock.siguiente).toHaveBeenCalled();
  });

  it('debería actualizar el índice y llamar a wizardComponent.atras() cuando getValorIndice es llamado con "ant"', () => {
    wizardMock = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardMock;
    component.indice = 3;

    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(component.indice).toBe(2);
    expect(wizardMock.atras).toHaveBeenCalled();
  });

  it('no debería actualizar el índice ni llamar métodos de wizardComponent si el valor está fuera de rango', () => {
    wizardMock = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = wizardMock;
    component.indice = 1;

    component.getValorIndice({ accion: 'cont', valor: 0 });
    component.getValorIndice({ accion: 'ant', valor: 6 });

    expect(component.indice).toBe(1);
    expect(wizardMock.siguiente).not.toHaveBeenCalled();
    expect(wizardMock.atras).not.toHaveBeenCalled();
  });

});
