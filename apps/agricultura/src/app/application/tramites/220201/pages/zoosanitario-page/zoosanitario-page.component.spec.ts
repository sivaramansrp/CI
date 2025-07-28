// zoosanitario-page.component.spec.ts

import { ZoosanitarioPageComponent } from './zoosanitario-page.component';

describe('ZoosanitarioPageComponent', () => {
  let component: ZoosanitarioPageComponent;

  // Mock for WizardComponent with trackable methods
  const wizardMock = {
    siguiente: jest.fn(),
    atras: jest.fn(),
  };

  // Mock for PasoUnoComponent with validation methods
  const pasoUnoMock = {
    validarFormularios: jest.fn(),
  };

  beforeEach(() => {
    component = new ZoosanitarioPageComponent();

    // Set mocks on ViewChild properties (simulate Angular @ViewChild)
    (component as any).wizardComponent = wizardMock;
    (component as any).pasoUnoComponent = pasoUnoMock;

    // Initialize indice and datosPasos accordingly
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

  it('should create the component with initial values', () => {
    expect(component).toBeDefined();
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.indice).toBe(1);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');
  });

  it('should navigate forward if validation passes on step 1', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(true);

    component.getValorIndice({ accion: 'cont', valor: 1 });

    // Wizard siguiente() should be called
    expect(wizardMock.siguiente).toHaveBeenCalled();
    // The index and datosPasos.indice should update
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.esFormaValido).toBe(false);
  });

  it('should NOT navigate forward if validation fails on step 1', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(false);

    component.getValorIndice({ accion: 'cont', valor: 1 });

    // Wizard siguiente() should NOT be called
    expect(wizardMock.siguiente).not.toHaveBeenCalled();
    // indice and datosPasos.indice should remain unchanged
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    // Flag to show form error should be set
    expect(component.esFormaValido).toBe(true);
  });

  it('should navigate backward when accion is "ant"', () => {
    component.indice = 2;
    component.datosPasos.indice = 2;

    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(wizardMock.atras).toHaveBeenCalled();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should not exceed bounds on navigation', () => {
    const maxStep = component.pasos.length;

    // Try to go beyond maxStep + 1 (invalid)
    component.indice = maxStep;
    component.datosPasos.indice = maxStep;
    component.getValorIndice({ accion: 'cont', valor: maxStep });

    expect(component.indice).toBe(maxStep); // should not change
    expect(component.datosPasos.indice).toBe(maxStep);
    expect(wizardMock.siguiente).not.toHaveBeenCalled();

    // Try to go below 1
    component.indice = 1;
    component.datosPasos.indice = 1;
    component.getValorIndice({ accion: 'ant', valor: 1 });

    expect(component.indice).toBe(1); // should not go below 1
    expect(component.datosPasos.indice).toBe(1);
    expect(wizardMock.atras).not.toHaveBeenCalled();
  });

  it('should update tituloMensaje correctly on enTabChange', () => {
    // The component originally sets the same message for all tabs, but test clearly
    component.enTabChange(1);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');

    component.enTabChange(3);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');

    component.enTabChange(999); // default case
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');
  });

  it('should return true if pasoUnoComponent is undefined in validarTodosFormulariosPasoUno', () => {
    (component as any).pasoUnoComponent = undefined;
    const result = (component as any).validarTodosFormulariosPasoUno();
    expect(result).toBe(true);
  });

  it('should return true if pasoUnoComponent.validarFormularios() returns true', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(true);
    const result = (component as any).validarTodosFormulariosPasoUno();
    expect(result).toBe(true);
  });

  it('should return false if pasoUnoComponent.validarFormularios() returns false', () => {
    pasoUnoMock.validarFormularios.mockReturnValue(false);
    const result = (component as any).validarTodosFormulariosPasoUno();
    expect(result).toBe(false);
  });

});
