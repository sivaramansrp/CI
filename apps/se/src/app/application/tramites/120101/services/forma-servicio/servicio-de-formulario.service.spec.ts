import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioDeFormularioService } from './servicio-de-formulario.service';

describe('ServicioDeFormularioService', () => {
  let service: ServicioDeFormularioService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ServicioDeFormularioService],
    });
    service = TestBed.inject(ServicioDeFormularioService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a form if not already registered', () => {
    const form = fb.group({
      nombre: new FormControl(''),
    });
    service.registerForm('testForm', form);

    const result = service.getForm('testForm');
    expect(result).toBe(form);
  });

  it('should not overwrite existing form when registering again', () => {
    const form1 = fb.group({ field1: ['A'] });
    const form2 = fb.group({ field2: ['B'] });

    service.registerForm('testForm', form1);
    service.registerForm('testForm', form2);

    const result = service.getForm('testForm');
    expect(result).toBe(form1);
    expect(result).not.toBe(form2);
  });

  it('should return undefined if form not found', () => {
    const result = service.getForm('nonexistentForm');
    expect(result).toBeUndefined();
  });

  it('should patch value of form if it exists', () => {
    const form = fb.group({ name: [''] });
    service.registerForm('patchForm', form);
    service.setFormValue('patchForm', { name: 'John' });

    const result = service.getForm('patchForm');
    expect(result?.value.name).toBe('John');
  });

  it('should return form value if form exists', () => {
    const form = fb.group({ name: ['Jane'] });
    service.registerForm('valueForm', form);

    const result = service.getFormValue('valueForm');
    expect(result).toEqual({ name: 'Jane' });
  });

  it('should return undefined form value if form does not exist', () => {
    const result = service.getFormValue('missingForm');
    expect(result).toBeUndefined();
  });

  it('should reset the form', () => {
    const form = fb.group({ age: ['30'] });
    service.registerForm('resetForm', form);

    service.resetForm('resetForm');
    expect(form.value.age).toBeNull(); // reset clears the value
  });

  it('should validate form correctly', () => {
    const form = fb.group({ email: ['', Validators.required] });
    service.registerForm('validForm', form);

    expect(service.isFormValid('validForm')).toBe(false);

    form.patchValue({ email: 'example@test.com' });
    expect(service.isFormValid('validForm')).toBe(true);
  });

  it('should return undefined validity if form not found', () => {
    expect(service.isFormValid('unknownForm')).toBeUndefined();
  });

  it('should remove control if exists in form', () => {
    const form = fb.group({
      control1: ['value1'],
      control2: ['value2'],
    });

    service.registerForm('removeForm', form);
    service.removeControl('removeForm', 'control1');

    expect(form.contains('control1')).toBe(false);
    expect(form.contains('control2')).toBe(true);
  });

  it('should not fail when removing a control from a non-existing form', () => {
    expect(() => service.removeControl('noForm', 'controlX')).not.toThrow();
  });

  it('should not fail when removing a non-existing control', () => {
    const form = fb.group({ control1: ['value'] });
    service.registerForm('edgeForm', form);
    expect(() => service.removeControl('edgeForm', 'nonexistent')).not.toThrow();
  });
});
