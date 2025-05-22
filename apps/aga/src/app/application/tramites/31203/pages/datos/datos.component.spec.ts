import { DatosComponent } from './datos.component';

describe('DatosPageComponent', () => {
  let component: DatosComponent;

  beforeEach(() => {
    component = new DatosComponent();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should have indice initialized to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });
});