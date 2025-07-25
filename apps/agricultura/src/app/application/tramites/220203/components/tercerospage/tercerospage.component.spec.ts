import { TercerospageComponent } from './tercerospage.component';

describe('TercerospageComponent', () => {
  let component: TercerospageComponent;

  const mockConsultaQuery = {
    selectConsultaioState$: {
      pipe: () => ({
        subscribe: jest.fn()
      })
    }
  };

  const mockCertificadoService = {
    getAllDatosForma: jest.fn().mockReturnValue({
      pipe: () => ({
        subscribe: jest.fn()
      })
    }),
    updateTercerosRelacionado: jest.fn()
  };

  const mockTercerosService = {
    obtenerSelectorList: jest.fn().mockReturnValue({
      pipe: () => ({
        subscribe: jest.fn()
      })
    })
  };

  const mockStore = {
    actualizarSelectedTerceros: jest.fn(),
    actualizarSelectedExdora: jest.fn(),
    updatedatosForma: jest.fn()
  };

  beforeEach(() => {
    component = new TercerospageComponent(
      mockConsultaQuery as any,
      mockCertificadoService as any,
      mockTercerosService as any,
      mockStore as any
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true from validarFormulario when tercerosRelacionados.validarFormulario returns true', () => {
    component.tercerosRelacionados = {
      validarFormulario: jest.fn().mockReturnValue(true)
    } as any;

    const result = component.validarFormulario();
    expect(result).toBe(true);
  });

  it('should initialize with default values', () => {
    expect(component.personas).toEqual([]);
    expect(component.datosForma).toEqual([]);
    expect(component.catalogosDatos).toEqual({});
    expect(component.esFormularioSoloLectura).toBe(false);
  });
});
