import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;

  beforeEach(() => {
    component = new DatosDeLaMercanciaComponent();
    component.form = new FormGroup({
      testControl: new FormControl('', Validators.required),
      plazo: new FormControl(''),
    });
    component.mercanciaInputValues = [
      { label: 'Test Label', placeholder: 'Test Placeholder', required: true, controlName: 'testControl' },
    ];
    component.productoOpciones = [];
    component.mercanciaCatalogoArray = [];
    component.setValoresStoreEvent = new EventEmitter();
    component.alCambioDelCampoValores = new EventEmitter();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('esInvalido', () => {
    it('should return true if the control is invalid and touched or dirty', () => {
      const control = component.form.get('testControl');
      control?.markAsTouched();
      expect(component.esInvalido('testControl')).toBe(true);
    });

    it('should return false if the control is valid', () => {
      const control = component.form.get('testControl');
      control?.setValue('Valid Value');
      expect(component.esInvalido('testControl')).toBe(false);
    });

    it('should return false if the control does not exist', () => {
      expect(component.esInvalido('nonExistentControl')).toBe(false);
    });
  });

  describe('setValoresStore', () => {
    it('should emit setValoresStoreEvent with the correct data', () => {
      const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit');
      component.setValoresStore(component.form, 'testField');
      expect(emitSpy).toHaveBeenCalledWith({ form: component.form, campo: 'testField' });
    });
  });

  describe('alCambioDelCampo', () => {
    it('should emit alCambioDelCampoValores with the correct data for index 0', () => {
      const emitSpy = jest.spyOn(component.alCambioDelCampoValores, 'emit');
      component.alCambioDelCampo(component.form, 'testControl', 0);
      expect(emitSpy).toHaveBeenCalledWith({
        form: component.form,
        campo: 'testControl',
        metodoNombre: 'setFraccion',
      });
    });

    it('should emit alCambioDelCampoValores with the correct data for index 1', () => {
      const emitSpy = jest.spyOn(component.alCambioDelCampoValores, 'emit');
      component.alCambioDelCampo(component.form, 'testControl', 1);
      expect(emitSpy).toHaveBeenCalledWith({
        form: component.form,
        campo: 'testControl',
        metodoNombre: 'setUmt',
      });
    });

    it('should emit alCambioDelCampoValores with the correct data for index 2', () => {
      const emitSpy = jest.spyOn(component.alCambioDelCampoValores, 'emit');
      component.alCambioDelCampo(component.form, 'testControl', 2);
      expect(emitSpy).toHaveBeenCalledWith({
        form: component.form,
        campo: 'testControl',
        metodoNombre: 'setNico',
      });
    });
  });

  describe('alCambiarPlazo', () => {
    it('should update the plazo control value and call setValoresStore', () => {
      const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
      component.alCambiarPlazo('newPlazo');
      expect(component.form.get('plazo')?.value).toBe('newPlazo');
      expect(setValoresStoreSpy).toHaveBeenCalledWith(component.form, 'plazo');
    });
  });
});