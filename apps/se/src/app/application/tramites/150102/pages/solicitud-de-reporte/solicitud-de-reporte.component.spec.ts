import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDeReporteComponent } from './solicitud-de-reporte.component';
import { DatosComponent } from '../datos/datos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import {
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { REPORTE_ANUAL_PASOS } from '../../enums/reporte-anual.enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SolicitudDeReporteComponent', () => {
  let component: SolicitudDeReporteComponent;
  let fixture: ComponentFixture<SolicitudDeReporteComponent>;
  let wizardComponentSpy: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentSpy = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as unknown as jest.Mocked<WizardComponent>;

    await TestBed.configureTestingModule({
      imports: [
        SolicitudDeReporteComponent,
        CommonModule,
        WizardComponent,
        DatosComponent,
        PasoTresComponent,
        BtnContinuarComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDeReporteComponent);
    component = fixture.componentInstance;
    component.wizardComponent = wizardComponentSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should set pantallasPasos from REPORTE_ANUAL_PASOS', () => {
    expect(component.pantallasPasos).toBe(REPORTE_ANUAL_PASOS);
  });

  it('should call wizardComponent.siguiente and update indice when accion is "cont" and valor is valid', () => {
    wizardComponentSpy.siguiente = jest.fn();
    wizardComponentSpy.atras = jest.fn();
    component.wizardComponent = wizardComponentSpy;
    const accion = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(wizardComponentSpy.siguiente).toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should call wizardComponent.atras and update indice when accion is not "cont" and valor is valid', () => {
    wizardComponentSpy.atras = jest.fn();
    wizardComponentSpy.siguiente = jest.fn();
    component.wizardComponent = wizardComponentSpy;
    const accion = { accion: 'atras', valor: 3 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(3);
    expect(wizardComponentSpy.atras).toHaveBeenCalled();
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range (too low)', () => {
    const accion = { accion: 'cont', valor: 0 };
    component.indice = 1;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range (too high)', () => {
    const accion = { accion: 'cont', valor: 5 };
    component.indice = 1;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should have datosPasos initialized correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should generate HTML with validation messages', () => {
    const mockMessages = ['Error 1', 'Error 2'];

    component.datosComponent = {
      datosDeReporteAnnualComponent: {
        mensajesDeValidacion: mockMessages,
      },
    } as any;

    const html = component.generarValidacionHTML();

    expect(html).toContain('Corrija los siguientes errores:');
    expect(html).toContain('1.'); 
    expect(html).toContain('Error 1');
    expect(html).toContain('2.');
    expect(html).toContain('Error 2');
  });

  it('should set mensajeError and not proceed when datosComponent is invalid', () => {
    component.indice = 1;
    component.datosComponent = {
      indice: 3,
      datosDeReporteAnnualComponent: {
        validarTotalExportaciones: () => false,
        mensajesDeValidacion: ['Exportación inválida'],
      },
    } as any;

    const evento = { accion: 'cont', valor: 2 };
    component.getValorIndice(evento);

    expect(component.mensajeError).toContain('Corrija los siguientes errores');
    expect(component.datosPasos.indice).toBe(1);
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
  });

  it('should proceed when datosComponent is valid', () => {
    component.indice = 1;
    component.datosComponent = {
      indice: 3,
      datosDeReporteAnnualComponent: {
        validarTotalExportaciones: () => true,
        mensajesDeValidacion: [],
      },
    } as any;

    const evento = { accion: 'cont', valor: 2 };
    component.getValorIndice(evento);

    expect(component.indice).toBe(2);
    expect(component.mensajeError).toBe("");
  });
});
