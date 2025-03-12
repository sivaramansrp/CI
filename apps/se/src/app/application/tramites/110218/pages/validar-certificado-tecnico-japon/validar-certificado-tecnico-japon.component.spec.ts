import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCertificadoTecnicoJaponComponent } from './validar-certificado-tecnico-japon.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS_VALIDAR } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-wizard',
  template: '',
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('ValidarCertificadoTecnicoJaponComponent', () => {
  let component: ValidarCertificadoTecnicoJaponComponent;
  let fixture: ComponentFixture<ValidarCertificadoTecnicoJaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarCertificadoTecnicoJaponComponent, MockWizardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCertificadoTecnicoJaponComponent);
    component = fixture.componentInstance;
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default index as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PANTA_PASOS_VALIDAR.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update index and call wizardComponent.siguiente() on continue action', () => {
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update index and call wizardComponent.atras() on back action', () => {
    component.getValorIndice({ accion: 'ant', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update index or call wizard methods if valor is out of range', () => {
    component.getValorIndice({ accion: 'cont', valor: 6 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });
});