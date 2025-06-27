import { PantallasComponent } from './pantallas.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/31601/servicios-pantallas.model';

describe('PantallasComponent', () => {
  let component: PantallasComponent;

  beforeEach(() => {
    component = new PantallasComponent();
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
  });

  it('should update indice and call wizardComponent.siguiente on "cont" action', () => {
    const accion: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on other action', () => {
    const accion: AccionBoton = { valor: 1, accion: 'back' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range (too low)', () => {
    const accion: AccionBoton = { valor: 0, accion: 'cont' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range (too high)', () => {
    const accion: AccionBoton = { valor: 99, accion: 'cont' };
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});