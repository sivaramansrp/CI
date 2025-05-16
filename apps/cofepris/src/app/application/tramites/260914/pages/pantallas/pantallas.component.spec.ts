import { PantallasComponent } from './pantallas.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/enums/260604/aviso-exportacion.enum';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

describe('PantallasComponent', () => {
  let component: PantallasComponent;

  beforeEach(() => {
    component = new PantallasComponent();
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
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

  it('should update the index and call wizardComponent.siguiente when accion is "cont"', () => {
    const accionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update the index and call wizardComponent.atras when accion is not "cont"', () => {
    const accionBoton: AccionBoton = { accion: 'atras', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update the index if the value is out of range (less than 1)', () => {
    const accionBoton: AccionBoton = { accion: 'cont', valor: 0 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1); // Default value remains unchanged
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update the index if the value is out of range (greater than 4)', () => {
    const accionBoton: AccionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1); // Default value remains unchanged
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });
});