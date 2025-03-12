import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/certificado-sgp.enum';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [NO_ERRORS_SCHEMA] // To ignore unknown elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with PASOS constant', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should initialize indice with default value 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    });
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with accion "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 2, accion: 'atras' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with invalid valor', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 5, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});