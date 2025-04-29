import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanidadAcuicolaCertificadoComponent } from './sanidadAcuicolaCertificado.component';
import {
  WizardComponent,
  BtnContinuarComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PASOS } from '../../constantes/importador-exportador.enum';
import { PasoDosComponent } from '../PasoDos/PasoDos.component';
import { PasoTresComponent } from '../PasoTres/PasoTres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

describe('SanidadAcuicolaCertificadoComponent', () => {
  let component: SanidadAcuicolaCertificadoComponent;
  let fixture: ComponentFixture<SanidadAcuicolaCertificadoComponent>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as never;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CommonModule,
        SanidadAcuicolaCertificadoComponent,
        WizardComponent,
        BtnContinuarComponent,
        PasoTresComponent,
        PasoDosComponent,
        PasoUnoComponent,
      ],
      declarations: [],
      providers: [{ provide: WizardComponent, useValue: wizardComponentMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SanidadAcuicolaCertificadoComponent);
    component = fixture.componentInstance;
    component.wizardComponent = wizardComponentMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos).toEqual(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente() when getValorIndice is called with "cont" action', () => {
    const accionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call atras() when getValorIndice is called with non-"cont" action', () => {
    const accionBoton = { valor: 2, accion: 'prev' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    const accionBoton = { valor: 0, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
});
