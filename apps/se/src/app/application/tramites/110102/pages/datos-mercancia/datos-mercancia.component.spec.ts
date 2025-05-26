import { DatosMercanciaComponent } from './datos-mercancia.component';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;

  beforeEach(() => {
    component = new DatosMercanciaComponent();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el índice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('seleccionaTab debe cambiar el índice', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });
});