import { PasoUnoComponent } from './paso-uno.component';
import { of, Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let mockService260702Service: any;
  let mockConsultaQuery: any;
  let consultaStateMock: any;

  beforeEach(() => {
    consultaStateMock = { update: false };
    mockService260702Service = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    };
    mockConsultaQuery = {
      selectConsultaioState$: of(consultaStateMock),
    };
    component = new PasoUnoComponent(
      mockService260702Service,
      mockConsultaQuery
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    consultaStateMock.update = false;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    consultaStateMock.update = true;
    const guardarDatosFormularioSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should set esDatosRespuesta to true and call actualizarEstadoFormulario when guardarDatosFormulario receives response', fakeAsync(() => {
    const responseMock = { foo: 'bar' };
    mockService260702Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(responseMock));
    component.guardarDatosFormulario();
    tick();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockService260702Service.actualizarEstadoFormulario).toHaveBeenCalledWith(responseMock);
  }));

  it('should not call actualizarEstadoFormulario if guardarDatosFormulario receives falsy response', fakeAsync(() => {
    mockService260702Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    tick();
    expect(mockService260702Service.actualizarEstadoFormulario).not.toHaveBeenCalled();
  }));

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should assign consultaState from observable in ngOnInit', () => {
    consultaStateMock = { update: false, test: 123 };
    mockConsultaQuery.selectConsultaioState$ = of(consultaStateMock);
    component = new PasoUnoComponent(mockService260702Service, mockConsultaQuery);
    component.ngOnInit();
    expect(component.consultaState).toEqual(consultaStateMock);
  });
});