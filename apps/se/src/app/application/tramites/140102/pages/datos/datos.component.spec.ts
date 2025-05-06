import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;

  beforeEach(() => {
    component = new DatosComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice set to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should emit pestanaCambiado and update indice when seleccionaTab is called', () => {
    const emitSpy = jest.spyOn(component.pestanaCambiado, 'emit');

    component.seleccionaTab(2);

    expect(component.indice).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should store elementoDeTablaSeleccionado', () => {
    const mockElemento = { id: 1, nombre: 'Elemento de prueba' } as any;
    component.elementoDeTablaSeleccionado = mockElemento;

    expect(component.elementoDeTablaSeleccionado).toEqual(mockElemento);
  });

  it('should accept pestanaDosFormularioValido as input', () => {
    component.pestanaDosFormularioValido = true;
    expect(component.pestanaDosFormularioValido).toBe(true);
  });
});
