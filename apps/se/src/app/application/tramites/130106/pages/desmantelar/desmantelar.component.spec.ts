import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { DesmantelarComponent } from './desmantelar.component';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { ListaPasosWizard, DatosPasos } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from '@libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';

@Component({
  selector: 'app-wizard',
  template: ''
})
class MockWizardComponent {
  // Add all required properties from WizardComponent
  listaPasos: any;
  indice: number = 0;
  indiceActual: number = 0;
  estadoInicial: any;
  datosPasos: any;
  pasoActual: any;
  pasos: any;
  // Mocked methods
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('DesmantelarComponent', () => {
  let component: DesmantelarComponent;
  let fixture: ComponentFixture<DesmantelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesmantelarComponent, MockWizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DesmantelarComponent);
    component = fixture.componentInstance;

    // Assign mocked ViewChild manually after view init
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should call wizardComponent.siguiente() when accion is "cont" and valor is in range', () => {
    // Assign a mock instance to wizardComponent
    component.wizardComponent = new MockWizardComponent() as any;
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');

    const evento: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(evento);

    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras() when accion is not "cont" and valor is in range', () => {
    // Assign a mock instance to wizardComponent
    component.wizardComponent = new MockWizardComponent() as any;
    const spy = jest.spyOn(component.wizardComponent, 'atras');

    const evento: AccionBoton = { accion: 'back', valor: 3 };
    component.getValorIndice(evento);

    expect(component.indice).toBe(3);
    expect(spy).toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    // Assign a mock instance to wizardComponent
    component.wizardComponent = new MockWizardComponent() as any;
    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');

    const evento: AccionBoton = { accion: 'cont', valor: 6 }; // out of range
    component.getValorIndice(evento);

    expect(component.indice).toBe(1); // remains unchanged
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });
});
