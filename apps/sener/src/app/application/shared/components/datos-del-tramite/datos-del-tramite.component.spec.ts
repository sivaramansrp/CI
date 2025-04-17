import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;

  beforeEach(() => {
    component = new DatosDelTramiteComponent();
    component.form = new FormGroup({
      testControl: new FormControl('', [Validators.required]),
    });
    component.inputFields = [
      {
        label: 'Test Label',
        placeholder: 'Test Placeholder',
        required: true,
        controlName: 'testControl',
      },
    ];
    component.catalogosArray = [[{ id: 1, nombre: 'Test Catalog' }]];
    component.solicitudOpciones = ['Option1', 'Option2'];
    component.setValoresStoreEvent = new EventEmitter();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('esInvalido', () => {
    it('should return true if the control is invalid and touched', () => {
      const control = component.form.get('testControl');
      control?.markAsTouched();
      expect(component.esInvalido('testControl')).toBe(true);
    });

    it('should return true if the control is invalid and dirty', () => {
      const control = component.form.get('testControl');
      control?.markAsDirty();
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
    it('should emit the setValoresStoreEvent with the correct payload', () => {
      const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit');
      const form = component.form;
      const campo = 'testControl';

      component.setValoresStore(form, campo);

      expect(emitSpy).toHaveBeenCalledWith({ form, campo });
    });
  });

  describe('Input properties', () => {
    it('should have default values for inputFields', () => {
      const defaultComponent = new DatosDelTramiteComponent();
      expect(defaultComponent.inputFields).toEqual([]);
    });

    it('should have default values for catalogosArray', () => {
      const defaultComponent = new DatosDelTramiteComponent();
      expect(defaultComponent.catalogosArray).toEqual([]);
    });

    it('should have default values for solicitudOpciones', () => {
      const defaultComponent = new DatosDelTramiteComponent();
      expect(defaultComponent.solicitudOpciones).toEqual([]);
    });
  });

  describe('Output properties', () => {
    it('should initialize setValoresStoreEvent as an EventEmitter', () => {
      expect(component.setValoresStoreEvent).toBeInstanceOf(EventEmitter);
    });
  });
});