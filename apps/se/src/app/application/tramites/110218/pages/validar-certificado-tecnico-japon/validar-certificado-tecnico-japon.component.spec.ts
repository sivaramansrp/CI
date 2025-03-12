import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCertificadoTecnicoJaponComponent } from './validar-certificado-tecnico-japon.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ValidarCertificadoTecnicoJaponComponent', () => {
  let component: ValidarCertificadoTecnicoJaponComponent;
  let fixture: ComponentFixture<ValidarCertificadoTecnicoJaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarCertificadoTecnicoJaponComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Avoid errors due to missing imports for WizardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarCertificadoTecnicoJaponComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasosSolicitar.length);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizard.siguiente() when action is "cont"', () => {
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as unknown as WizardComponent;

    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizard.atras() when action is not "cont"', () => {
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as unknown as WizardComponent;

    component.getValorIndice({ accion: 'ant', valor: 3 });

    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice if value is out of bounds', () => {
    const initialIndice = component.indice;

    component.getValorIndice({ accion: 'cont', valor: 0 }); // Invalid value
    expect(component.indice).toBe(initialIndice);

    component.getValorIndice({ accion: 'cont', valor: 5 }); // Out of range
    expect(component.indice).toBe(initialIndice);
  });
});
