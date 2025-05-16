import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidacionDeFormularioService } from './validacion-de-formulario.service';

describe('ValidacionDeFormularioService', () => {
  let service: ValidacionDeFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacionDeFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerForm', () => {
    it('should register a form if it is not already registered', () => {
      const form = new FormGroup({
        field1: new FormControl(''),
      });

      service.registerForm('testForm', form);

      expect(service.getForm('testForm')).toBe(form);
    });

    it('should not overwrite an already registered form', () => {
      const form1 = new FormGroup({
        field1: new FormControl(''),
      });
      const form2 = new FormGroup({
        field2: new FormControl(''),
      });

      service.registerForm('testForm', form1);
      service.registerForm('testForm', form2);

      expect(service.getForm('testForm')).toBe(form1);
    });
  });

  describe('getForm', () => {
    it('should return the registered form by name', () => {
      const form = new FormGroup({
        field1: new FormControl(''),
      });

      service.registerForm('testForm', form);

      expect(service.getForm('testForm')).toBe(form);
    });

    it('should return undefined if the form is not registered', () => {
      expect(service.getForm('nonExistentForm')).toBeUndefined();
    });
  });

  describe('setFormValue', () => {
    it('should set values in the registered form', () => {
      const form = new FormGroup({
        field1: new FormControl(''),
        field2: new FormControl(''),
      });

      service.registerForm('testForm', form);

      service.setFormValue('testForm', { field1: 'value1', field2: 'value2' });

      expect(form.value).toEqual({ field1: 'value1', field2: 'value2' });
    });

    it('should do nothing if the form is not registered', () => {
      expect(() => service.setFormValue('nonExistentForm', { field1: 'value1' })).not.toThrow();
    });
  });

  describe('getFormValue', () => {
    it('should return the current values of the registered form', () => {
      const form = new FormGroup({
        field1: new FormControl('value1'),
        field2: new FormControl('value2'),
      });

      service.registerForm('testForm', form);

      expect(service.getFormValue('testForm')).toEqual({ field1: 'value1', field2: 'value2' });
    });

    it('should return undefined if the form is not registered', () => {
      expect(service.getFormValue('nonExistentForm')).toBeUndefined();
    });
  });

  describe('resetForm', () => {
    it('should reset the registered form to its initial state', () => {
      const form = new FormGroup({
        field1: new FormControl('value1'),
        field2: new FormControl('value2'),
      });

      service.registerForm('testForm', form);

      service.resetForm('testForm');

      expect(form.value).toEqual({ field1: null, field2: null });
    });

    it('should do nothing if the form is not registered', () => {
      expect(() => service.resetForm('nonExistentForm')).not.toThrow();
    });
  });

  describe('isFormValid', () => {
    it('should return true if the form is valid', () => {
      const form = new FormGroup({
        field1: new FormControl('value1'),
      });

      service.registerForm('testForm', form);

      expect(service.isFormValid('testForm')).toBe(true);
    });

    it('should return false if the form is invalid', () => {
      const form = new FormGroup({
        field1: new FormControl('', { validators: (control) => (control.value ? null : { required: true }) }),
      });

      service.registerForm('testForm', form);

      expect(service.isFormValid('testForm')).toBe(false);
    });

    it('should return undefined if the form is not registered', () => {
      expect(service.isFormValid('nonExistentForm')).toBeUndefined();
    });
  });

  describe('removeControl', () => {
    it('should remove a control from the registered form', () => {
      const form = new FormGroup({
        field1: new FormControl('value1'),
        field2: new FormControl('value2'),
      });

      service.registerForm('testForm', form);

      service.removeControl('testForm', 'field1');

      expect(form.contains('field1')).toBe(false);
      expect(form.contains('field2')).toBe(true);
    });

    it('should do nothing if the form is not registered', () => {
      expect(() => service.removeControl('nonExistentForm', 'field1')).not.toThrow();
    });

    it('should do nothing if the control does not exist in the form', () => {
      const form = new FormGroup({
        field1: new FormControl('value1'),
      });

      service.registerForm('testForm', form);

      expect(() => service.removeControl('testForm', 'nonExistentField')).not.toThrow();
    });
  });
});
