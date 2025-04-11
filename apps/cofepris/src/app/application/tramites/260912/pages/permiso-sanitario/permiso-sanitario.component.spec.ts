import { PermisoSanitarioComponent } from './permiso-sanitario.component';
import { WizardComponent } from '@ng-mf/data-access-user';

describe('PermisoSanitarioComponent', () => {
  let component: PermisoSanitarioComponent;

  beforeEach(() => {
    component = new PermisoSanitarioComponent();
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
    expect(component.AVISO_DE_PRIVACIDAD).toBeDefined();
  });

  it('should update indice and call siguiente when accion is "cont"', () => {
    const event = { accion: 'cont', valor: 2 };
    component.getValorIndice(event);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras when accion is not "cont"', () => {
    const event = { accion: 'prev', valor: 2 };
    component.getValorIndice(event);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call methods if valor is out of range', () => {
    const event = { accion: 'cont', valor: 0 };
    component.getValorIndice(event);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call methods if valor is greater than 4', () => {
    const event = { accion: 'cont', valor: 5 };
    component.getValorIndice(event);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});