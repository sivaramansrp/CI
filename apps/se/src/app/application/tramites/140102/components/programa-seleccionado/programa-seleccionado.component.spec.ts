import { ProgramaSeleccionadoComponent } from './programa-seleccionado.component';
import { CancelacionStore } from '../../estados/cancelacion-de-autorizaciones.store';
import { CancelacionQuery } from '../../estados/cancelacion-de-autorizaciones.query';
import { ValidacionDeFormularioService } from '../../services/forma-servicio/validacion-de-formulario.service';
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';

const mockCancelacionStore = {
  setDynamicFieldValue: jest.fn(),
};

const mockCancelacionQuery = {
  selectSolicitud$: of({ testKey: 'testValue' }),
};

const mockValidacionDeFormularioService = {
  registerForm: jest.fn(),
  setFormValue: jest.fn(),
};

let component: ProgramaSeleccionadoComponent;

beforeEach(() => {
  component = new ProgramaSeleccionadoComponent(
    mockCancelacionStore as any,
    mockCancelacionQuery as any,
    mockValidacionDeFormularioService as any
  );
});

test('should create component with default values', () => {
  expect(component).toBeDefined();
  expect(component.forma instanceof FormGroup).toBe(true);
  expect(component.programaSeleccionado.length).toBeGreaterThan(0);
});

test('should initialize and subscribe in ngOnInit', () => {
  component.ngOnInit();
  expect(mockValidacionDeFormularioService.registerForm).toHaveBeenCalledWith(
    'programaSeleccionadoForm',
    component.ninoFormGroup
  );
  expect(component.solicitudState).toEqual({ testKey: 'testValue' });
});

test('should set value on establecerCambioDeValor', () => {
  const mockEvent = {
    campo: 'field1',
    valor: 'value1',
  };
  component.establecerCambioDeValor(mockEvent);
  expect(mockCancelacionStore.setDynamicFieldValue).toHaveBeenCalledWith('field1', 'value1');
  expect(mockValidacionDeFormularioService.setFormValue).toHaveBeenCalledWith('programaSeleccionadoForm', {
    field1: 'value1',
  });
});

test('should not set value if event is falsy', () => {
  component.establecerCambioDeValor(null as any);
  expect(mockCancelacionStore.setDynamicFieldValue).not.toHaveBeenCalled();
  expect(mockValidacionDeFormularioService.setFormValue).not.toHaveBeenCalled();
});

test('should complete destroy$ on ngOnDestroy', () => {
  const completeSpy = jest.spyOn(component['destroy$'], 'complete');
  const nextSpy = jest.spyOn(component['destroy$'], 'next');
  component.ngOnDestroy();
  expect(nextSpy).toHaveBeenCalled();
  expect(completeSpy).toHaveBeenCalled();
});
