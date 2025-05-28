import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenovacionesComponent } from './renovaciones.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { RENOVACIONES_PASOS } from '../../enums/renovaciones-muestras-mercancias.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { CommonModule } from '@angular/common';

describe('RenovacionesComponent', () => {
  let component: RenovacionesComponent;
  let fixture: ComponentFixture<RenovacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RenovacionesComponent,
        HttpClientTestingModule,
        WizardComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
        BtnContinuarComponent,
        AlertComponent,
        CommonModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RenovacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default error messages', () => {
    expect(component.errorMessage).toContain('Corrija los siguientes errores');
    expect(component.error).toContain('Error en el formulario');
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos).toBe(RENOVACIONES_PASOS);
    expect(component.datosPasos.nroPasos).toBe(RENOVACIONES_PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  describe('getValorIndice', () => {
    let mockWizard: jest.Mocked<WizardComponent>;
    let mockPasoUno: any;

    beforeEach(() => {
      mockWizard = {
        siguiente: jest.fn(),
        atras: jest.fn(),
      } as any;
      mockPasoUno = {
        pagoLineaDeCapturaComponent: {
          validarFormulario: jest.fn(),
        },
      };
      component.wizardComponent = mockWizard;
      component.pasoUnoComponent = mockPasoUno;
    });

    it('should call validarFormulario and not proceed if invalid on first step', () => {
      mockPasoUno.pagoLineaDeCapturaComponent.validarFormulario.mockReturnValue(
        false
      );
      component.indice = 1;
      component.esValido = true;
      const evento = { accion: 'cont', valor: 2 };
      component.getValorIndice(evento);
      expect(
        mockPasoUno.pagoLineaDeCapturaComponent.validarFormulario
      ).toHaveBeenCalled();
      expect(component.datosPasos.indice).toBe(1);
      expect(component.indice).toBe(1);
      expect(mockWizard.siguiente).not.toHaveBeenCalled();
    });

    it('should proceed to next step if valid on first step and accion is "cont"', () => {
      mockPasoUno.pagoLineaDeCapturaComponent.validarFormulario.mockReturnValue(
        true
      );
      component.indice = 1;
      component.esValido = true;
      const evento = { accion: 'cont', valor: 2 };
      component.getValorIndice(evento);
      expect(component.indice).toBe(2);
      expect(mockWizard.siguiente).toHaveBeenCalled();
    });

    it('should call wizard.atras if accion is not "cont"', () => {
      mockPasoUno.pagoLineaDeCapturaComponent.validarFormulario.mockReturnValue(
        true
      );
      component.indice = 1;
      component.esValido = true;
      const evento = { accion: 'back', valor: 2 };
      component.getValorIndice(evento);
      expect(component.indice).toBe(2);
      expect(mockWizard.atras).toHaveBeenCalled();
    });

    it('should not do anything if evento.valor is out of range', () => {
      component.indice = 2;
      const evento = { accion: 'cont', valor: 0 };
      component.getValorIndice(evento);
      expect(component.indice).toBe(2);
      expect(mockWizard.siguiente).not.toHaveBeenCalled();
      expect(mockWizard.atras).not.toHaveBeenCalled();
    });

    it('should not call validarFormulario if not on first step', () => {
      component.indice = 2;
      const evento = { accion: 'cont', valor: 3 };
      component.getValorIndice(evento);
      expect(component.indice).toBe(3);
      expect(mockWizard.siguiente).toHaveBeenCalled();
    });
  });
});
