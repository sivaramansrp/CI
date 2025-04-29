import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let componente: PasoUnoComponent;

  beforeEach(() => {
    componente = new PasoUnoComponent();
  });

  it('debería inicializar indice con 1', () => {
    expect(componente.indice).toBe(1);
  });

  it('debería actualizar indice cuando se llama a seleccionaTab', () => {
    componente.seleccionaTab(2);
    expect(componente.indice).toBe(2);

    componente.seleccionaTab(1);
    expect(componente.indice).toBe(1);
  });
});