import { AvisoAgenteComponent } from './aviso-agente.component';
import { FormBuilder } from '@angular/forms';

describe('AvisoAgenteComponent', () => {
  let component: AvisoAgenteComponent;
  let routerMock: any;
  let routeMock: any;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    routeMock = {};
    component = new AvisoAgenteComponent(new FormBuilder(), routerMock, routeMock);
  });

  it('should initialize formAgente on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formAgente).toBeDefined();
    expect(component.formAgente.get('nombres')).toBeTruthy();
    expect(component.formAgente.get('primerApellido')).toBeTruthy();
  });

  it('should call router.navigate on AgregarTransportias', () => {
    component.AgregarTransportias();
    expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-agente'], { relativeTo: routeMock });
  });

  it('should set modal property to default value', () => {
    expect(component.modal).toBe('modal');
  });

  it('should initialize avisoAgenteDatos as empty array', () => {
    expect(Array.isArray(component.avisoAgenteDatos)).toBe(true);
    expect(component.avisoAgenteDatos.length).toBe(0);
  });
});
