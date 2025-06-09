import { DatosComponent } from './datos.component';
import { of, Subject } from 'rxjs';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let consultaQueryMock: any;
  let consultaStoreMock: any;
  let expedicionServiceMock: any;
  let tramiteStoreMock: any;

  beforeEach(() => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true })
    };
    consultaStoreMock = {
      establecerConsultaio: jest.fn()
    };
    expedicionServiceMock = {
      getExpedienteCertificado: jest.fn().mockReturnValue(of({ foo: 'bar' })),
      setDatosFormulario: jest.fn()
    };
    tramiteStoreMock = {};
    component = new DatosComponent(
      consultaQueryMock,
      consultaStoreMock,
      expedicionServiceMock,
      tramiteStoreMock
    );
  });

  it('should set indice on seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta true and call setDatosFormulario in guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(expedicionServiceMock.setDatosFormulario).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
