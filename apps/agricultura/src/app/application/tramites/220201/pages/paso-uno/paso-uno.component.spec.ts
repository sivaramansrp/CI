// paso-uno.component.spec.ts

import { Subject, of, throwError } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;

  let seccionStoreMock: any;
  let certificadoServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(() => {
    // Mocks for injected dependencies
    seccionStoreMock = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    };

    // Mock guardarDatosFormulario to return an Observable to avoid .pipe() error
    certificadoServiceMock = {
      guardarDatosFormulario: jest.fn().mockReturnValue(of({})),
      storeDatosFormulario: jest.fn(),
    };

    // Subject to simulate consultaQuery observable
    consultaQueryMock = {
      selectConsultaioState$: new Subject<any>(),
    };

    // Instantiate component with mocks
    component = new PasoUnoComponent(
      seccionStoreMock,
      certificadoServiceMock,
      consultaQueryMock
    );

    // Mock child components with necessary properties/methods
    component.solicitante = {
      form: {
        invalid: false,
        markAllAsTouched: jest.fn()
      }
    } as any;

    component.datosDelaSolicitu = {
      validarFormulario: jest.fn(() => true)
    } as any;

    component.datosParaMovilizacionNacional = {
      validarFormulario: jest.fn(() => true)
    } as any;

    component.pagoDeDerechosComponent = {
      validarFormulario: jest.fn(() => true)
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and call guardarDatosFormulario on update=true', (done) => {
    // Spy on guardarDatosFormulario
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');

    component.ngOnInit();

    // Emit update=true to simulate observable emission
    (consultaQueryMock.selectConsultaioState$ as Subject<any>).next({ update: true });

    setTimeout(() => {
      expect(guardarSpy).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should call service methods correctly on guardarDatosFormulario success', (done) => {
    const fakeData = { foo: 'bar' };
    certificadoServiceMock.guardarDatosFormulario.mockReturnValue(of(fakeData));

    component.guardarDatosFormulario();

    setTimeout(() => {
      expect(certificadoServiceMock.guardarDatosFormulario).toHaveBeenCalled();
      expect(certificadoServiceMock.storeDatosFormulario).toHaveBeenCalledWith(fakeData);
      expect(seccionStoreMock.establecerFormaValida).toHaveBeenCalledWith([true]);
      expect(seccionStoreMock.establecerSeccion).toHaveBeenCalledWith([true]);
      done();
    }, 0);
  });

  it('should handle error in guardarDatosFormulario', (done) => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    certificadoServiceMock.guardarDatosFormulario.mockReturnValue(throwError(() => new Error('API error')));

    component.guardarDatosFormulario();

    setTimeout(() => {
      expect(certificadoServiceMock.guardarDatosFormulario).toHaveBeenCalled();
      expect(certificadoServiceMock.storeDatosFormulario).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      consoleSpy.mockRestore();
      done();
    }, 0);
  });

  describe('validarFormularios', () => {

    it('should return false if any child component is missing or invalid', () => {
      // No solicitante component
      component.solicitante = undefined as any;
      expect(component.validarFormularios()).toBe(false);

      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      // datosDelaSolicitu missing
      component.datosDelaSolicitu = undefined as any;
      expect(component.validarFormularios()).toBe(false);

      // datosParaMovilizacionNacional missing
      component.datosDelaSolicitu = { validarFormulario: () => true } as any;
      component.datosParaMovilizacionNacional = undefined as any;
      expect(component.validarFormularios()).toBe(false);

      // pagoDeDerechosComponent missing
      component.datosParaMovilizacionNacional = { validarFormulario: () => true } as any;
      component.pagoDeDerechosComponent = undefined as any;
      expect(component.validarFormularios()).toBe(false);
    });
  });

  it('should update indice on seleccionaTab', () => {
    expect(component.indice).toBe(1);
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call destroyNotifier$ next and complete on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
