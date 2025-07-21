import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanidadAcuicolaCertificadoComponent } from './sanidadAcuicolaCertificado.component';
import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/importador-exportador.enum';
import { CommonModule } from '@angular/common';
import { PasoTresComponent } from '../PasoTres/PasoTres.component';
import { PasoDosComponent } from '../PasoDos/PasoDos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SanidadAcuicolaCertificadoComponent', () => {
  let component: SanidadAcuicolaCertificadoComponent;
  let fixture: ComponentFixture<SanidadAcuicolaCertificadoComponent>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [SanidadAcuicolaCertificadoComponent,
        CommonModule,
          WizardComponent,
          BtnContinuarComponent,
          PasoTresComponent,
          PasoDosComponent,
          PasoUnoComponent,
          HttpClientTestingModule
        ],
    }).compileComponents();

    fixture = TestBed.createComponent(SanidadAcuicolaCertificadoComponent);
    component = fixture.componentInstance;
    // Inject mock
    component.wizardComponent = wizardComponentMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos from PASOS', () => {
    expect(component.pasos).toBe(PASOS);
  });

  it('should initialize indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente() when accion is "cont" and valor is valid', () => {
    const accion = { valor: 2, accion: 'cont' };
    component.getValorIndice(accion as any);
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras() when accion is not "cont" and valor is valid', () => {
    const accion = { valor: 3, accion: 'ant' };
    component.getValorIndice(accion as any);
    expect(component.indice).toBe(3);
    expect(wizardComponentMock.atras).toHaveBeenCalled();
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    const accion = { valor: 0, accion: 'cont' };
    component.getValorIndice(accion as any);
    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();

    const accion2 = { valor: 5, accion: 'ant' };
    component.getValorIndice(accion2 as any);
    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should handle multiple valid transitions', () => {
    component.getValorIndice({ valor: 2, accion: 'cont' } as any);
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalledTimes(1);

    component.getValorIndice({ valor: 3, accion: 'ant' } as any);
    expect(component.indice).toBe(3);
    expect(wizardComponentMock.atras).toHaveBeenCalledTimes(1);
  });
});