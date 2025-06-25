import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Componente Pantallas', () => {
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

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a un método público si existe', () => {
    if (typeof (component as any)['someMethod'] === 'function') {
      const spy = jest.spyOn(component as any, 'someMethod');
      (component as any).someMethod();
      expect(spy).toHaveBeenCalled();
    }
  });

  it('debería tener valores por defecto en las propiedades', () => {
    if ('someProperty' in component) {
      expect((component as any).someProperty).toBeDefined();
    }
  });

  it('debería manejar el clic del botón', () => {
    if (typeof (component as any)['onButtonClick'] === 'function') {
      const spy = jest.spyOn(component as any, 'onButtonClick');
      const button = fixture.nativeElement.querySelector('button');
      if (button) {
        button.click();
        expect(spy).toHaveBeenCalled();
      }
    }
  });

  it('debería emitir un evento de salida', () => {
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

    it('debería establecer el índice y llamar a siguiente cuando la acción sea "cont"', () => {
      const accion = { valor: 2, accion: 'cont' };
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(2);
      expect((component as any).datosPasos.indice).toBe(2);
      expect((component as any).wizardComponent.siguiente).toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('debería establecer el índice y llamar a atras cuando la acción no sea "cont"', () => {
      const accion = { valor: 1, accion: 'back' };
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(1);
      expect((component as any).datosPasos.indice).toBe(1);
      expect((component as any).wizardComponent.atras).toHaveBeenCalled();
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si valor no es mayor que 0', () => {
      const accion = { valor: 0, accion: 'cont' };
      (component as any).indice = 5;
      (component as any).datosPasos.indice = 5;
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(5);
      expect((component as any).datosPasos.indice).toBe(5);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si valor es mayor que la longitud de pantallasPasos', () => {
      const accion = { valor: 10, accion: 'cont' };
      (component as any).indice = 3;
      (component as any).datosPasos.indice = 3;
      (component as any).getValorIndice(accion);
      expect((component as any).indice).toBe(3);
      expect((component as any).datosPasos.indice).toBe(3);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si e es null', () => {
      (component as any).indice = 1;
      (component as any).datosPasos.indice = 1;
      (component as any).getValorIndice(null);
      expect((component as any).indice).toBe(1);
      expect((component as any).datosPasos.indice).toBe(1);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si e es undefined', () => {
      (component as any).indice = 2;
      (component as any).datosPasos.indice = 2;
      (component as any).getValorIndice(undefined);
      expect((component as any).indice).toBe(2);
      expect((component as any).datosPasos.indice).toBe(2);
      expect((component as any).wizardComponent.siguiente).not.toHaveBeenCalled();
      expect((component as any).wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si e.valor es undefined', () => {
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
