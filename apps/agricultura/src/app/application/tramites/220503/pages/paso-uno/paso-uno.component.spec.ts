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

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    component.consultaState = { update: false } as ConsultaioState;
    jest.spyOn(consultaQueryMock.selectConsultaioState$, 'pipe').mockReturnValue({
      subscribe: (cb: any) => {
        cb({ update: false });
        return { unsubscribe: jest.fn() };
      },
    } as any);
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    component.consultaState = { update: true } as ConsultaioState;
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(consultaQueryMock.selectConsultaioState$, 'pipe').mockReturnValue({
      subscribe: (cb: any) => {
        cb({ update: true });
        return { unsubscribe: jest.fn() };
      },
    } as any);
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
});