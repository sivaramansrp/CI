import { ZoosanitarioPageComponent } from './zoosanitario-page.component';

describe('ZoosanitarioPageComponent', () => {
  let component: ZoosanitarioPageComponent;

  // Mock para WizardComponent con métodos rastreables
  const wizardMock = {
    siguiente: jest.fn(),
    atras: jest.fn(),
  };

  // Mock para PasoUnoComponent con métodos de validación
  const pasoUnoMock = {
    validarFormularios: jest.fn(),
  };

  beforeEach(() => {
    component = new ZoosanitarioPageComponent();

    (component as any).wizardComponent = wizardMock;
    (component as any).pasoUnoComponent = pasoUnoMock;

    component.indice = 1;
    component.datosPasos = {
      nroPasos: component.pasos.length,
      indice: component.indice,
      txtBtnAnt: 'Guardar',
      txtBtnSig: 'Continuar',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear el componente con valores iniciales', () => {
    expect(component).toBeDefined();
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.indice).toBe(1);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');
  });

  it('debe navegar hacia adelante si la validación pasa en el paso 1', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(true);

    component.getValorIndice({ accion: 'cont', valor: 1 });

    expect(wizardMock.siguiente).toHaveBeenCalled();
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.esFormaValido).toBe(false);
  });

  it('no debe navegar hacia adelante si la validación falla en el paso 1', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(false);

    component.getValorIndice({ accion: 'cont', valor: 1 });

    expect(wizardMock.siguiente).not.toHaveBeenCalled();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.esFormaValido).toBe(true);
  });

  it('debe navegar hacia atrás cuando la acción es "ant"', () => {
    component.indice = 2;
    component.datosPasos.indice = 2;

    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(wizardMock.atras).toHaveBeenCalled();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('no debe exceder los límites en la navegación', () => {
    const maxStep = component.pasos.length;

    component.indice = maxStep;
    component.datosPasos.indice = maxStep;
    component.getValorIndice({ accion: 'cont', valor: maxStep });

    expect(component.indice).toBe(maxStep);
    expect(component.datosPasos.indice).toBe(maxStep);
    expect(wizardMock.siguiente).not.toHaveBeenCalled();

    component.indice = 1;
    component.datosPasos.indice = 1;
    component.getValorIndice({ accion: 'ant', valor: 1 });

    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(wizardMock.atras).not.toHaveBeenCalled();
  });

  it('debe actualizar el tituloMensaje correctamente en enTabChange', () => {
    component.enTabChange(1);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');

    component.enTabChange(3);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');

    component.enTabChange(999);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');
  });

  it('debe retornar true si pasoUnoComponent es undefined en validarTodosFormulariosPasoUno', () => {
    (component as any).pasoUnoComponent = undefined;
    const result = (component as any).validarTodosFormulariosPasoUno();
    expect(result).toBe(true);
  });

  it('debe retornar true si pasoUnoComponent.validarFormularios() retorna true', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(true);
    const result = (component as any).validarTodosFormulariosPasoUno();
    expect(result).toBe(true);
  });

  it('debe retornar false si pasoUnoComponent.validarFormularios() retorna false', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(false);
    const result = (component as any).validarTodosFormulariosPasoUno();
    expect(result).toBe(false);
  });

});
