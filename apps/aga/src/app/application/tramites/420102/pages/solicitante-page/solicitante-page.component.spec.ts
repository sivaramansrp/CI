// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/concluir-relacion.enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,
        SolicitantePageComponent,
        WizardComponent,
        PasoUnoComponent,
        PasoDosComponent,
        BtnContinuarComponent,
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with PASOS constant', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should set continueTrigger to false by default', () => {
    expect(component.continueTrigger).toBe(false);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and navigate forward when getValorIndice is called with "cont"', () => {
    const wizardComponentSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(wizardComponentSpy).toHaveBeenCalled();
  });

  it('should update indice and navigate backward when getValorIndice is called with "atras"', () => {
    const wizardComponentSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ valor: 1, accion: 'atras' });
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy).toHaveBeenCalled();
  });
});