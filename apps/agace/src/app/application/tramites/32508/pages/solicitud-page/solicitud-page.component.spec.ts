import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PASOS } from '@ng-mf/data-access-user';

// Mock WizardComponent
@Component({ selector: 'wizard-component', template: '' })
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent, MockWizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTO_DE_ALERTA and pasos', () => {
    expect(component.TEXTO_DE_ALERTA).toBe(
      'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.'
    );
    expect(component.pasos).toEqual(PASOS);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice in seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should not update indice if valor is out of range in getValorIndice', () => {
    component.getValorIndice({ accion: 'cont', valor: 6 });
    expect(component.indice).toBe(1);
  });

});