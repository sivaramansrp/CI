import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelacionesComponent } from './cancelaciones.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WizardComponent, DatosPasos, ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../../80205/models/datos-info.model';
import { CANCELACIONES_PASOS } from '../../constantes/cancelaciones.enum';
import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard',
  template: ''
})
class MockWizardComponent {
  @Input() listaPasos!: ListaPasosWizard[];
  @Input() indice!: EventEmitter<any>;
  @Input() indiceActual!: number;
  @Input() estadoInicial!: boolean;
  @Input() lista!: any[];
  @Input() maximo!: number;
  @Input() wizardService!: any;

  siguiente() { }
  atras() { }
  ngOnChanges() { }
}

describe('CancelacionesComponent', () => {
  let component: CancelacionesComponent;
  let fixture: ComponentFixture<CancelacionesComponent>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as jest.Mocked<WizardComponent>;

    await TestBed.configureTestingModule({
      imports: [WizardComponent],
      declarations: [CancelacionesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
  fixture = TestBed.createComponent(CancelacionesComponent);
  component = fixture.componentInstance;

  const wizardInstance = new MockWizardComponent();
  jest.spyOn(wizardInstance, 'siguiente');
  jest.spyOn(wizardInstance, 'atras');

  component.wizardComponent = wizardInstance as any;

  fixture.detectChanges();
  });

  it('should not update indice if accion is invalid', () => {
    const event: AccionBoton = { valor: 10, accion: 'invalid' };

    component.getValorIndice(event);

    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize pantallasPasos with CANCELACIONES', () => {
    expect(component.pantallasPasos).toBe(CANCELACIONES_PASOS);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: component.pantallasPasos.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    });
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with invalid valor', () => {
    const spySiguiente = jest.spyOn(wizardComponentMock, 'siguiente');
    const spyAtras = jest.spyOn(wizardComponentMock, 'atras');
    component.getValorIndice({ valor: 5, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });
});