import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;

  beforeEach(() => {
    component = new DatosComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });
});
