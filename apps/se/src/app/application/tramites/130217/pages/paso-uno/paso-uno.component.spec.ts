import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;

  beforeEach(() => {
    component = new PasoUnoComponent();
  });

  it('should initialize indice with 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });
});