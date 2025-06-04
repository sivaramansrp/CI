import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ACCIONBOTON } from '../../models/prosec.module';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ProsecComponent } from './prosec.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ProsecComponent', () => {
  let component: ProsecComponent;
  let fixture: ComponentFixture<ProsecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent, BtnContinuarComponent, PasoUnoComponent, HttpClientModule],
      declarations: [ProsecComponent],
      schemas: [NO_ERRORS_SCHEMA] // Add this to allow any custom elements
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProsecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should navigate to the next step when getValorIndice is called with "cont" action', () => {
    jest.spyOn(component.wizardComponent, 'siguiente');
    const ACCION: ACCIONBOTON = { accion: 'cont', valor: 2 };
    component.getValorIndice(ACCION);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should navigate to the previous step when getValorIndice is called with "ant" action', () => {
    jest.spyOn(component.wizardComponent, 'atras');
    const ACCION: ACCIONBOTON = { accion: 'ant', valor: 1 };
    component.getValorIndice(ACCION);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not navigate if the valor is out of range', () => {
    jest.spyOn(component.wizardComponent, 'siguiente');
    const ACCION: ACCIONBOTON = { accion: 'cont', valor: 5 };
    component.getValorIndice(ACCION);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });
});