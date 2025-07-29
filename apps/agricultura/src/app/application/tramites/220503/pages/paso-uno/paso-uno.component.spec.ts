import { PasoUnoComponent } from './paso-uno.component';
import { Solocitud220503Service } from '../../services/service220503.service';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let solocitud220503ServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(() => {
    solocitud220503ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    component = new PasoUnoComponent(
      solocitud220503ServiceMock,
      consultaQueryMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    component.consultaState = { update: true } as ConsultaioState;
    jest.spyOn(component, 'guardarDatosFormulario');
    
    // Mock the pipe to return an observable that emits the update state
    consultaQueryMock.selectConsultaioState$ = {
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn().mockImplementation((callback: any) => {
          callback({ update: true });
          return { unsubscribe: jest.fn() };
        })
      })
    };
    
    component.ngOnInit();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true and call actualizarEstadoFormulario on guardarDatosFormulario', () => {
    const resp = { some: 'data' };
    solocitud220503ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(resp));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(solocitud220503ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
  });

  it('should not call actualizarEstadoFormulario if response is falsy in guardarDatosFormulario', () => {
    solocitud220503ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(solocitud220503ServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  describe('validarFormularios', () => {
    it('should return true when all forms are valid', () => {
      // Mock valid solicitante form
      component.solicitante = {
        form: {
          invalid: false,
          markAllAsTouched: jest.fn()
        }
      } as any;

      // Mock valid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      // Mock valid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(true);
      expect(component.solicitante.form.markAllAsTouched).not.toHaveBeenCalled();
    });

    it('should return false when solicitante form is invalid', () => {
      // Mock invalid solicitante form
      component.solicitante = {
        form: {
          invalid: true,
          markAllAsTouched: jest.fn()
        }
      } as any;

      // Mock valid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      // Mock valid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
      expect(component.solicitante.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should return false when solicitante is not available', () => {
      component.solicitante = undefined as any;
      
      // Mock valid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      // Mock valid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
    });

    it('should return false when solicitudDatos validation fails', () => {
      // Mock valid solicitante form
      component.solicitante = {
        form: {
          invalid: false,
          markAllAsTouched: jest.fn()
        }
      } as any;

      // Mock invalid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;

      // Mock valid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
    });

    it('should return false when solicitudDatos is not available', () => {
      // Mock valid solicitante form
      component.solicitante = {
        form: {
          invalid: false,
          markAllAsTouched: jest.fn()
        }
      } as any;

      component.solicitudDatos = undefined as any;

      // Mock valid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
    });

    it('should return false when revisionDocumental validation fails', () => {
      // Mock valid solicitante form
      component.solicitante = {
        form: {
          invalid: false,
          markAllAsTouched: jest.fn()
        }
      } as any;

      // Mock valid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      // Mock invalid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
    });

    it('should return false when revisionDocumental is not available', () => {
      // Mock valid solicitante form
      component.solicitante = {
        form: {
          invalid: false,
          markAllAsTouched: jest.fn()
        }
      } as any;

      // Mock valid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      component.revisionDocumental = undefined as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
    });

    it('should return false when solicitante form is null', () => {
      // Mock solicitante with null form
      component.solicitante = {
        form: null
      } as any;

      // Mock valid solicitudDatos
      component.solicitudDatos = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      // Mock valid revisionDocumental
      component.revisionDocumental = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
    });
  });

  it('should initialize properties correctly', () => {
    expect(component.esDatosRespuesta).toBe(false);
    expect(component.indice).toBe(1);
    expect((component as any).destroyNotifier$).toBeDefined();
  });
});