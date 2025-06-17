import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosComponent } from '../datos/datos.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/enums/260604/aviso-exportacion.enum';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos with PANTA_PASOS', () => {
    expect(component.pantallasPasos).toBe(PANTA_PASOS);
  });

  it('should have a default index value of 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: component.pantallasPasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should have default values for properties', () => {
    expect(Array.isArray(component.pantallasPasos)).toBe(true);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
    expect(typeof component.cargaUtil).toBe('object');
  });

  describe('getValorIndice', () => {
    it('should collect form values and call wizardComponent.siguiente for accion "cont"', () => {
      component.datosComponent = { obtenerValoresFormulario: jest.fn().mockReturnValue({ test: 1 }) } as any;
      component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
      const event = { valor: 2, accion: 'cont' };
      component.getValorIndice(event);
      expect(component.cargaUtil).toEqual({ test: 1 });
      expect(component.indice).toBe(2);
      expect(component.wizardComponent.siguiente).toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should collect form values and call wizardComponent.atras for accion not "cont"', () => {
      component.datosComponent = { obtenerValoresFormulario: jest.fn().mockReturnValue({ test: 2 }) } as any;
      component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
      const event = { valor: 3, accion: 'atras' };
      component.getValorIndice(event);
      expect(component.cargaUtil).toEqual({ test: 2 });
      expect(component.indice).toBe(3);
      expect(component.wizardComponent.atras).toHaveBeenCalled();
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('should not update indice or call wizard methods if valor is out of range', () => {
      component.datosComponent = { obtenerValoresFormulario: jest.fn().mockReturnValue({ test: 3 }) } as any;
      component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
      const event = { valor: 0, accion: 'cont' };
      component.getValorIndice(event);
      expect(component.indice).toBe(1);
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should log error if datosComponent is undefined', () => {
      component.datosComponent = undefined as any;
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
      component.getValorIndice({ valor: 2, accion: 'cont' });
      expect(consoleSpy).toHaveBeenCalledWith('PasoUnoPagesComponent no está inicializado.');
      consoleSpy.mockRestore();
    });
  });

  describe('obtenerValoresDelFormulario', () => {
    it('should return all form values if datosComponent exists', () => {
      const mockValores = {
        solicitante: { nombre: 'Juan' },
        datosSolicitud: [{ campo: 'valor' }],
        pagoDeDerechos: [{ pago: 123 }],
        tramitesAsociados: [{ tramite: 'A' }],
      };
      component.datosComponent = { obtenerValoresFormulario: jest.fn().mockReturnValue(mockValores) } as any;
      const result = component.obtenerValoresDelFormulario();
      expect(result.datos).toEqual(mockValores);
    });

    it('should return empty object if datosComponent does not exist', () => {
      component.datosComponent = undefined as any;
      const result = component.obtenerValoresDelFormulario();
      expect(result.datos).toBeUndefined();
    });
  });
});