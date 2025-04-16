import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloraFaunaComponent } from './flora-fauna.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { Datos250101Component } from '../datos-250101/datos-250101.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent,AlertComponent } from '@libs/shared/data-access-user/src';
import {
  WizardComponent,
  BtnContinuarComponent,
} from '@libs/shared/data-access-user/src';

const mockWizardComponent = {
  siguiente: jest.fn(),
  atras: jest.fn(),
};

const mockSolicitanteService = {
  validateTab: jest
    .fn()
    .mockImplementation((tabIndex: number) => tabIndex > 0 && tabIndex <= 5),
};

describe('FloraFaunaComponent', () => {
  let component: FloraFaunaComponent;
  let fixture: ComponentFixture<FloraFaunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloraFaunaComponent, Datos250101Component,PasoDosComponent, PasoTresComponent],
      imports: [
        CommonModule,
        AlertComponent,
        WizardComponent,
        SolicitanteComponent,
        BtnContinuarComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: 'SolicitanteService', useValue: mockSolicitanteService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloraFaunaComponent);
    component = fixture.componentInstance;
    component.wizardComponent = mockWizardComponent as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTO_DE_ALERTA with the correct value', () => {
    expect(component.TEXTO_FLORA_FAUNA_ALERT).toBe(
      'La solicitud ha quedado registrada con el número temporal 202768122. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada'
    );
  });

  it('should initialize datosPasos with the correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    const accionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with accion "ant"', () => {
    const accionBoton = { accion: 'ant', valor: 1 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with valor out of range', () => {
    const accionBoton = { accion: 'cont', valor: 6 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBeUndefined();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with valor less than 1', () => {
    const accionBoton = { accion: 'ant', valor: 0 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBeUndefined();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.siguiente at boundary value 1', () => {
    const accionBoton = { accion: 'cont', valor: 1 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.siguiente at boundary value 5', () => {
    const accionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(5);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
});
