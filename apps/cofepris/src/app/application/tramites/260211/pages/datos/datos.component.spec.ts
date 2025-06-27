import { DatosComponent } from './datos.component';
import { of, Subject } from 'rxjs';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let consultaQueryMock: any;
  let sanitarioServiceMock: any;

  beforeEach(() => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };
    sanitarioServiceMock = {
      getSolicitudData: jest.fn().mockReturnValue(of({ test: 'data' })),
      actualizarEstadoFormulario: jest.fn()
    };
    component = new DatosComponent(consultaQueryMock, sanitarioServiceMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if update is false on init', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if update is true on init', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: true });
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('guardarDatosFormulario should set esDatosRespuesta to true and call actualizarEstadoFormulario when response exists', () => {
    sanitarioServiceMock.getSolicitudData.mockReturnValue(of({ test: 'data' }));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(sanitarioServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
  });

  it('guardarDatosFormulario should not call actualizarEstadoFormulario if response is falsy', () => {
    sanitarioServiceMock.getSolicitudData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(false);
    expect(sanitarioServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('seleccionaTab should update indice', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('seleccionaTab should update indice to 0', () => {
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });

  it('should have indice default to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should allow changing indice multiple times', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should not throw if seleccionaTab is called with negative value', () => {
    expect(() => component.seleccionaTab(-1)).not.toThrow();
    expect(component.indice).toBe(-1);
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroyNotifier$ = (component as any).destroyNotifier$ as Subject<void>;
    const completeSpy = jest.spyOn(destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should not throw if guardarDatosFormulario is called multiple times', () => {
    sanitarioServiceMock.getSolicitudData.mockReturnValue(of({ test: 'data' }));
    expect(() => {
      component.guardarDatosFormulario();
      component.guardarDatosFormulario();
    }).not.toThrow();
  });

  it('should set esDatosRespuesta to true if guardarDatosFormulario receives valid data', () => {
    sanitarioServiceMock.getSolicitudData.mockReturnValue(of({ foo: 'bar' }));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set esDatosRespuesta to false if guardarDatosFormulario receives null', () => {
    sanitarioServiceMock.getSolicitudData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(false);
  });
});
