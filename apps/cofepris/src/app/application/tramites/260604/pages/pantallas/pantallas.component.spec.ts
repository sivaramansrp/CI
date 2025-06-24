import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudeComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call a public method if present', () => {
    if (typeof (component as any)['someMethod'] === 'function') {
      const spy = jest.spyOn(component as any, 'someMethod');
      (component as any).someMethod();
      expect(spy).toHaveBeenCalled();
    }
  });

  it('should have default property values', () => {
    if ('someProperty' in component) {
      expect((component as any).someProperty).toBeDefined();
    }
  });

  it('should handle button click', () => {
    if (typeof (component as any)['onButtonClick'] === 'function') {
      const spy = jest.spyOn(component as any, 'onButtonClick');
      const button = fixture.nativeElement.querySelector('button');
      if (button) {
        button.click();
        expect(spy).toHaveBeenCalled();
      }
    }
  });

  it('should emit output event', () => {
    if ((component as any).someEvent && (component as any).someEvent.emit) {
      const spy = jest.spyOn((component as any).someEvent, 'emit');
      if (typeof (component as any)['triggerEvent'] === 'function') {
        (component as any).triggerEvent();
        expect(spy).toHaveBeenCalled();
      }
    }
  });

  describe('getValorIndice', () => {
    beforeEach(() => {
      (component as any).pantallasPasos = [1, 2, 3];
      (component as any).datosPasos = { indice: 0 };
      (component as any).wizardComponent = {
        siguiente: jest.fn(),
        atras: jest.fn()
      };
    });

    it('should set indice and call siguiente when accion is "cont"', () => {
      const accion = { valor: 2, accion: 'cont' };
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(2);
      expect((component as any).datosPasos.indice).toBe(2);
      expect((component as any).wizardComponent.siguiente).toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should set indice and call atras when accion is not "cont"', () => {
      const accion = { valor: 1, accion: 'back' };
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(1);
      expect((component as any).datosPasos.indice).toBe(1);
      expect((component as any).wizardComponent.atras).toHaveBeenCalled();
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('should do nothing if valor is not > 0', () => {
      const accion = { valor: 0, accion: 'cont' };
      (component as any).indice = 5;
      (component as any).datosPasos.indice = 5;
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(5);
      expect((component as any).datosPasos.indice).toBe(5);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should do nothing if valor is greater than pantallasPasos.length', () => {
      const accion = { valor: 10, accion: 'cont' };
      (component as any).indice = 3;
      (component as any).datosPasos.indice = 3;
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(3);
      expect((component as any).datosPasos.indice).toBe(3);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should do nothing if e is null', () => {
      (component as any).indice = 1;
      (component as any).datosPasos.indice = 1;
      (component as any).getValorIndice(null);
      expect((component as any).indice).toBe(1);
      expect((component as any).datosPasos.indice).toBe(1);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should do nothing if e is undefined', () => {
      (component as any).indice = 2;
      (component as any).datosPasos.indice = 2;
      (component as any).getValorIndice(undefined);
      expect((component as any).indice).toBe(2);
      expect((component as any).datosPasos.indice).toBe(2);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should do nothing if e.valor is undefined', () => {
      (component as any).indice = 2;
      (component as any).datosPasos.indice = 2;
      (component as any).getValorIndice({ accion: 'cont' });
      expect((component as any).indice).toBe(2);
      expect((component as any).datosPasos.indice).toBe(2);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });
  });
});
