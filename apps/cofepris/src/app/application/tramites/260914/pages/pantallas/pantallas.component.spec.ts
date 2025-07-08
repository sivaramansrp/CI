import { PantallasComponent } from './pantallas.component';
import { DatosComponent } from '../datos/datos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@ng-mf/data-access-user';

describe('PantallasComponent', () => {
  let component: PantallasComponent;

  beforeEach(() => {
    component = new PantallasComponent();
    // Mock de los pasos
    component.pantallasPasos = [
      { nombre: 'Paso 1' },
      { nombre: 'Paso 2' },
      { nombre: 'Paso 3' }
    ] as any;
    component.datosPasos = {
      nroPasos: component.pantallasPasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    // Mock de wizardComponent y datosComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
    component.datosComponent = {
      obtenerValoresFormulario: jest.fn().mockReturnValue({
        solicitante: { nombre: 'Juan' },
        datosSolicitud: [{ id: 1 }],
        pagoDeDerechos: [{ id: 2 }],
        tramitesAsociados: [{ id: 3 }]
      })
    } as any;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el índice inicial en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debería actualizar el índice y llamar a siguiente si accion es "cont"', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 2 } as any;
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.cargaUtil.solicitante).toEqual({ nombre: 'Juan' });
  });

  it('debería actualizar el índice y llamar a atras si accion es diferente de "cont"', () => {
    const accion: AccionBoton = { accion: 'atras', valor: 1 } as any;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debería actualizar el índice si el valor está fuera de rango', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 0 } as any;
    component.indice = 1;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('debería mostrar error si datosComponent no está inicializado', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.datosComponent = undefined as any;
    const accion: AccionBoton = { accion: 'cont', valor: 2 } as any;
    component.getValorIndice(accion);
    expect(spy).toHaveBeenCalledWith('PasoUnoPagesComponent no está inicializado.');
    spy.mockRestore();
  });

  it('debería obtener los valores del formulario correctamente', () => {
    const resultado = component.obtenerValoresDelFormulario();
    expect(resultado.datos?.solicitante).toEqual({ nombre: 'Juan' });
    expect(resultado.datos?.datosSolicitud).toEqual([{ id: 1 }]);
    expect(resultado.datos?.pagoDeDerechos).toEqual([{ id: 2 }]);
    expect(resultado.datos?.tramitesAsociados).toEqual([{ id: 3 }]);
  });

  it('debería retornar objeto vacío si datosComponent no está inicializado en obtenerValoresDelFormulario', () => {
    component.datosComponent = undefined as any;
    const resultado = component.obtenerValoresDelFormulario();
    expect(resultado.datos).toBeUndefined();
  });
});