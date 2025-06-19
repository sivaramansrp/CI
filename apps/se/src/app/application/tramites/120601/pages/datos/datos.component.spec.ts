import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for properties', () => {
    expect(Array.isArray(component.pasos)).toBe(true);
    expect(Array.isArray(component.pantallasPasos)).toBe(true);
    expect(typeof component.indice).toBe('number');
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  describe('getValorIndice', () => {
    beforeEach(() => {
      // Mock wizardComponent with jest.fn()
      component.wizardComponent = {
        siguiente: jest.fn(),
        atras: jest.fn()
      } as any;
    });

    it('should update indice and call wizardComponent.siguiente for accion "cont"', () => {
      component.indice = 1;
      component.getValorIndice({ valor: 2, accion: 'cont' });
      expect(component.indice).toBe(2);
      expect(component.wizardComponent.siguiente).toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should update indice and call wizardComponent.atras for accion not "cont"', () => {
      component.indice = 2;
      component.getValorIndice({ valor: 3, accion: 'atras' });
      expect(component.indice).toBe(3);
      expect(component.wizardComponent.atras).toHaveBeenCalled();
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('should not update indice or call wizard methods if valor is out of range', () => {
      component.indice = 1;
      component.getValorIndice({ valor: 0, accion: 'cont' });
      expect(component.indice).toBe(1);
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();

      component.getValorIndice({ valor: 5, accion: 'cont' });
      expect(component.indice).toBe(1);
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });
  });
});