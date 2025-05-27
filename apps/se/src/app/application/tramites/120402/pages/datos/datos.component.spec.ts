import { DatosComponent } from './datos.component';
import { of, Subject } from 'rxjs';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let mockPantallasSvc: any;
  let mockSolocitud120402Service: any;
  let mockConsultaQuery: any;

beforeEach(() => {
  mockPantallasSvc = {};
  mockSolocitud120402Service = {
    getRegistroTomaMuestrasMercanciasData: jest.fn(),
    actualizarEstadoFormulario: jest.fn(),
  };
  mockConsultaQuery = {
    selectConsultaioState$: of({ update: false }), // <-- fix here
  };

  component = new DatosComponent(
    mockPantallasSvc,
    mockSolocitud120402Service,
    mockConsultaQuery
  );
});

  it('should create the component with default values', () => {
    expect(component).toBeTruthy();
    expect(component.indice).toBe(1);
    expect(component.totalPestanas).toBe(5);
    expect(component.esDatosRespuesta).toBe(false);
  });

it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
  mockConsultaQuery.selectConsultaioState$ = of({ update: false }); // <-- fix here
  component = new DatosComponent(
    mockPantallasSvc,
    mockSolocitud120402Service,
    mockConsultaQuery
  );
  component.ngOnInit(); // <-- uncomment this line
  expect(component.esDatosRespuesta).toBe(true);
});

// it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
//   const localMockConsultaQuery = {
//     selectConsultaioState$: of({ update: true }),
//   };
//   // Create a spy on the prototype BEFORE instantiation
//   const spy = jest.spyOn(DatosComponent.prototype, 'guardarDatosFormulario');
//   component = new DatosComponent(
//     mockPantallasSvc,
//     mockSolocitud120402Service,
//     localMockConsultaQuery as any
//   );
//   //component.ngOnInit();
//   expect(spy).toHaveBeenCalled();
//   spy.mockRestore(); // Clean up the spy
// });

  it('guardarDatosFormulario should call actualizarEstadoFormulario if response exists', () => {
    const resp = { foo: 'bar' };
    mockSolocitud120402Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(resp));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockSolocitud120402Service.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
  });

  it('guardarDatosFormulario should not call actualizarEstadoFormulario if response is falsy', () => {
    mockSolocitud120402Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(mockSolocitud120402Service.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('esPrimeraPestana should return true if indice is 1', () => {
    component.indice = 1;
    expect(component.esPrimeraPestana).toBe(true);
  });

  it('esUltimaPestana should return true if indice equals totalPestanas', () => {
    component.indice = component.totalPestanas;
    expect(component.esUltimaPestana).toBe(true);
  });

  it('seleccionaTab should update indice if within range', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('seleccionaTab should not update indice if out of range', () => {
    component.indice = 2;
    component.seleccionaTab(0);
    expect(component.indice).toBe(2);
    component.seleccionaTab(6);
    expect(component.indice).toBe(2);
  });

  it('avanzarTab should increment indice if not last tab', () => {
    component.indice = 2;
    component.avanzarTab();
    expect(component.indice).toBe(3);
  });

  it('avanzarTab should not increment indice if last tab', () => {
    component.indice = component.totalPestanas;
    component.avanzarTab();
    expect(component.indice).toBe(component.totalPestanas);
  });

  it('retrocederTab should decrement indice if not first tab', () => {
    component.indice = 3;
    component.retrocederTab();
    expect(component.indice).toBe(2);
  });

  it('retrocederTab should not decrement indice if first tab', () => {
    component.indice = 1;
    component.retrocederTab();
    expect(component.indice).toBe(1);
  });

  it('resetTabs should set indice to 1', () => {
    component.indice = 4;
    component.resetTabs();
    expect(component.indice).toBe(1);
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});