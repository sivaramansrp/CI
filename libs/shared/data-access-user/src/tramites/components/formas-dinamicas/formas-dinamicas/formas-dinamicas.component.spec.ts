import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormasDinamicasComponent } from './formas-dinamicas.component';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src/core/models/shared/forms-model';

describe('FormasDinamicasComponent', () => {
  let component: FormasDinamicasComponent;
  let fixture: ComponentFixture<FormasDinamicasComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    formBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [FormasDinamicasComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(FormasDinamicasComponent);
    component = fixture.componentInstance;
    component.forma = formBuilder.group({});
    component.formularioDatos = [
      {
        label_nombre: 'RFC',
        campo: 'rfc',
        clase: 'col-md-4',
        tipo_input: 'text',
        validadores: [{ tipo: 'required' }],
        desactivado: false,
        solo_lectura: false,
      },
    ];
    component.state = {
      rfc: '',
      nombre: 'Mock Name',
      apellidoPaterno: 'Mock Surname',
      apellidoMaterno: 'Mock Maternal Name'
    };
    component.inicializarFormulario();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add controls to the FormGroup based on formularioDatos', () => {
    component.inicializarFormulario();
    expect(component.forma.contains('rfc')).toBe(true);
    expect(component.forma.get('rfc')?.value).toEqual('');
  });

  it('should not overwrite existing controls', () => {
    component.forma.addControl('rfc', new FormControl(''));
    jest.spyOn(FormasDinamicasComponent, 'obtenerValidadores').mockReturnValue([]);
    component.inicializarFormulario();
    expect(component.forma.get('rfc')?.value).toEqual('');
  });

  it('should return true for a valid campo', () => {
    const validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    (component as any).validacionesService = {
      ...validacionesServiceMock,
      rfcPattern: '',
      horaPattern: '',
      patronDeNumero: '',
      llavePagoPattern: '',
    };
    component.forma = new FormGroup({
      rfc: new FormControl('1234567890', Validators.required),
    });
    const result = component.isValid('rfc');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.forma, 'rfc');
    expect(result).toBe(true);
  });

  it('should return false for an invalid campo', () => {
    const validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(false),
    };
    (component as any).validacionesService = {
      ...validacionesServiceMock,
      rfcPattern: '',
      horaPattern: '',
      patronDeNumero: '',
      llavePagoPattern: '',
    };
    component.forma = new FormGroup({
      rfc: new FormControl('', Validators.required),
    });
    const result = component.isValid('rfc');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.forma, 'rfc');
    expect(result).toBe(false);
  });

  it('should return null for a campo that does not exist in FormGroup', () => {
    const validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(null),
    };
    (component as any).validacionesService = {
      ...validacionesServiceMock,
      rfcPattern: '',
      horaPattern: '',
      patronDeNumero: '',
      llavePagoPattern: '',
    };
    component.forma = new FormGroup({
      nombre: new FormControl('John Doe', Validators.required),
    });
    const result = component.isValid('rfc');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.forma, 'rfc');
    expect(result).toBeNull();
  });

  it('should return true when validadores contains "required"', () => {
    component.forma.addControl(
      'mockCampo',
      new FormControl('', Validators.required)
    );

    const item: ModeloDeFormaDinamica = {
      label_nombre: 'Mock Label',
      campo: 'mockCampo',
      clase: 'mockClase',
      tipo_input: 'text',
      desactivado: false,
      validadores: [{ tipo: 'required' }, { tipo: 'maxLength' }],
    };
    const result = component.seRequiere(item.campo);
    expect(result).toBe(true);
  });

  it('should return false when validadores does not contain "required"', () => {
    const item: ModeloDeFormaDinamica = {
      label_nombre: 'Mock Label',
      campo: 'mockCampo',
      clase: 'mockClase',
      tipo_input: 'text',
      desactivado: false,
      validadores: [{ tipo: 'maxLength' }],
    };
    const result = component.seRequiere(item.campo);
    expect(result).toBe(false);
  });

  it('should return false when validadores is an empty array', () => {
    const item: ModeloDeFormaDinamica = {
      label_nombre: 'Mock Label',
      campo: 'mockCampo',
      clase: 'mockClase',
      tipo_input: 'text',
      desactivado: false,
      validadores: [],
    };
    const result = component.seRequiere(item.campo);
    expect(result).toBe(false);
  });

  it('should return false when validadores is undefined', () => {
    const item: ModeloDeFormaDinamica = {
      label_nombre: 'Mock Label',
      campo: 'mockCampo',
      clase: 'mockClase',
      tipo_input: 'text',
      desactivado: false,
      validadores: undefined,
    };
    const result = component.seRequiere(item.campo);
    expect(result).toBe(false);
  });

  it('should update valorSeleccionado with a string value', () => {
    component.cambiarRadio('testValue');
    expect(component.valorSeleccionado).toBe('testValue');
  });

  it('should update valorSeleccionado with an empty string', () => {
    component.cambiarRadio('');
    expect(component.valorSeleccionado).toBe('');
  });

  it('should return "col-12" for screen width between 768 and 991', () => {
    component.screenWidth = 800;
    const result = component.getResponsiveClass('col-md-4');
    expect(result).toBe('col-12');
  });

  it('should return the provided clase for screen width greater than 991', () => {
    component.screenWidth = 1024;
    const result = component.getResponsiveClass('col-md-4');
    expect(result).toBe('col-md-4');
  });

  it('should return "col-12" for screen width less than 768', () => {
    component.screenWidth = 600;
    const result = component.getResponsiveClass('col-md-4');
    expect(result).toBe('col-12');
  });

  it('should return "col-12" for screen width exactly 768', () => {
    component.screenWidth = 768;
    const result = component.getResponsiveClass('col-md-4');
    expect(result).toBe('col-12');
  });

  it('should return "col-12" for screen width exactly 991', () => {
    component.screenWidth = 991;
    const result = component.getResponsiveClass('col-md-4');
    expect(result).toBe('col-12');
  });

  it('should return an empty string when screen width is greater than 991 and clase is empty', () => {
    component.screenWidth = 1024;
    const result = component.getResponsiveClass('');
    expect(result).toBe('');
  });

  it('should emit event when item is provided', () => {
    jest.spyOn(component.emitirEventoDeClic, 'emit');
    const mockItem: ModeloDeFormaDinamica = {
      id: 'button1',
      label_nombre: 'Click Me',
      campo: 'submit',
      clase: 'btn-primary',
      tipo_input: 'button',
      desactivado: false
    };
    component.onButtonClick(mockItem);
    expect(component.emitirEventoDeClic.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should emit event correctly on consecutive calls', () => {
    jest.spyOn(component.emitirEventoDeClic, 'emit');
  
    const mockItem1: ModeloDeFormaDinamica = {
      id: 'button1',
      label_nombre: 'First Button',
      campo: 'save',
      clase: 'btn-primary',
      tipo_input: 'button',
      desactivado: false
    };
  
    const mockItem2: ModeloDeFormaDinamica = {
      id: 'button2',
      label_nombre: 'Second Button',
      campo: 'cancel',
      clase: 'btn-secondary',
      tipo_input: 'button',
      desactivado: true
    };
  
    component.onButtonClick(mockItem1);
    component.onButtonClick(mockItem2);
  
    expect(component.emitirEventoDeClic.emit).toHaveBeenCalledTimes(2);
    expect(component.emitirEventoDeClic.emit).toHaveBeenCalledWith(mockItem1);
    expect(component.emitirEventoDeClic.emit).toHaveBeenCalledWith(mockItem2);
  });

  it('should add controls for keys not already present in the form', () => {
    const mockValue = { name: 'John Doe', age: 30 };
    component.writeValue(mockValue);
  
    const nameControl = component.forma.get('name');
    const ageControl = component.forma.get('age');
  
    expect(nameControl).toBeTruthy();
    expect(nameControl?.value).toBe('John Doe');
    expect(ageControl).toBeTruthy();
    expect(ageControl?.value).toBe(30);
  });

  it('should patch values for existing controls', () => {
    component.forma.addControl('name', new FormControl('Initial Name'));
    const mockValue = { name: 'Patched Name' };
    component.writeValue(mockValue);
    const nameControl = component.forma.get('name');
    expect(nameControl).toBeTruthy();
    expect(nameControl?.value).toBe('Patched Name');
  });

  it('should handle null values', () => {
    const mockValue = { name: null, age: null };
    component.writeValue(mockValue);
    const nameControl = component.forma.get('name');
    const ageControl = component.forma.get('age');
    expect(nameControl).toBeTruthy();
    expect(nameControl?.value).toBeNull();
    expect(ageControl).toBeTruthy();
    expect(ageControl?.value).toBeNull();
  });

  it('should not patch values when value is undefined', () => {
    component.forma.addControl('name', new FormControl('Initial Name'));
    const mockValue = { name: undefined };
    component.writeValue(mockValue);
    const nameControl = component.forma.get('name');
    expect(nameControl).toBeTruthy();
    expect(nameControl?.value).toBe('Initial Name');
  });

  it('should patch multiple values simultaneously', () => {
    component.forma.addControl('name', new FormControl('Initial Name'));
    component.forma.addControl('age', new FormControl(25));
    const mockValue = { name: 'Patched Name', age: 30 };
    component.writeValue(mockValue);
    const nameControl = component.forma.get('name');
    const ageControl = component.forma.get('age');
    expect(nameControl?.value).toBe('Patched Name');
    expect(ageControl?.value).toBe(30);
  });

  it('should register onChange handler', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    expect(FormasDinamicasComponent.onChange).toBe(mockOnChange);
  });

  it('should call onChange handler on form value change', () => {
    const mockOnChange = jest.fn();
    component.forma.addControl('testField', new FormControl('initialValue'));
    component.registerOnChange(mockOnChange);
    component.forma.patchValue({ testField: 'newValue' });
    expect(mockOnChange).toHaveBeenCalledWith({ rfc: '', testField: 'newValue' });
  });

  it('should call onChange handler with empty object when form is empty', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    component.forma.patchValue({});
    expect(mockOnChange).toHaveBeenCalledWith({rfc: ''});
  });
  
  it('should not call onChange handler if emitEvent is false', () => {
    const mockOnChange = jest.fn();
    component.forma.addControl('testField', new FormControl('initialValue'));
    component.registerOnChange(mockOnChange);
    component.forma.patchValue({ testField: 'newValue' }, { emitEvent: false });
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should call onChange handler multiple times on consecutive value changes', () => {
    const mockOnChange = jest.fn();
    component.forma.addControl('field1', new FormControl('value1'));
    component.forma.addControl('field2', new FormControl('value2'));
    component.registerOnChange(mockOnChange);
    component.forma.patchValue({ field1: 'newValue1' });
    component.forma.patchValue({ field2: 'newValue2' });
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith({ rfc: '', field1: 'newValue1', field2: 'value2' });
    expect(mockOnChange).toHaveBeenCalledWith({ rfc: '', field1: 'newValue1', field2: 'newValue2' });
  });
});
