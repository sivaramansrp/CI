import { FormGroup, FormControl } from '@angular/forms';
import { ServicioDeFormularioService } from './formulario-validacion.service';

describe('ServicioDeFormularioService', () => {
  let service: ServicioDeFormularioService;

  beforeEach(() => {
    service = new ServicioDeFormularioService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register and retrieve a form', () => {
    const form = new FormGroup({ campo: new FormControl('valor') });
    service.registerForm('testForm', form);
    expect(service.getForm('testForm')).toBe(form);
  });

  it('should not overwrite an existing form on register', () => {
    const form1 = new FormGroup({ campo: new FormControl('valor1') });
    const form2 = new FormGroup({ campo: new FormControl('valor2') });
    service.registerForm('testForm', form1);
    service.registerForm('testForm', form2);
    expect(service.getForm('testForm')).toBe(form1);
  });

  it('should set and get form value', () => {
    const form = new FormGroup({ campo: new FormControl('') });
    service.registerForm('testForm', form);
    service.setFormValue('testForm', { campo: 'nuevoValor' });
    expect(service.getFormValue('testForm')).toEqual({ campo: 'nuevoValor' });
  });

  it('should reset a form', () => {
    const form = new FormGroup({ campo: new FormControl('valor') });
    service.registerForm('testForm', form);
    service.setFormValue('testForm', { campo: 'otroValor' });
    service.resetForm('testForm');
    expect(form.value).toEqual({ campo: null });
  });

  it('should return form validity', () => {
    const form = new FormGroup({ campo: new FormControl('valor') });
    service.registerForm('testForm', form);
    expect(service.isFormValid('testForm')).toBe(true);
  });

  it('should return undefined for validity if form does not exist', () => {
    expect(service.isFormValid('noForm')).toBeUndefined();
  });

  it('should remove a control from a form', () => {
    const form = new FormGroup({ campo: new FormControl('valor'), otro: new FormControl('otro') });
    service.registerForm('testForm', form);
    service.removeControl('testForm', 'campo');
    expect(form.contains('campo')).toBe(false);
    expect(form.contains('otro')).toBe(true);
  });

  it('should do nothing when removing a control from a non-existent form', () => {
    expect(() => service.removeControl('noForm', 'campo')).not.toThrow();
  });

  it('should do nothing when removing a non-existent control', () => {
    const form = new FormGroup({ campo: new FormControl('valor') });
    service.registerForm('testForm', form);
    expect(() => service.removeControl('testForm', 'otro')).not.toThrow();
    expect(form.contains('campo')).toBe(true);
  });
});