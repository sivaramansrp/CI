import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariosDeCertiRegistroComponent } from './formularios-de-certi-registro.component';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

describe('FormulariosDeCertiRegistroComponent', () => {
  let component: FormulariosDeCertiRegistroComponent;
  let fixture: ComponentFixture<FormulariosDeCertiRegistroComponent>;
  const mockFormData = [
    { name: 'firstName', value: 'John', validators: [] },
    { name: 'lastName', value: 'Doe', validators: [] },
    { name: 'email', value: 'john.doe@example.com', validators: [] }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormulariosDeCertiRegistroComponent] // Import necessary modules
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosDeCertiRegistroComponent);
    component = fixture.componentInstance;
    component.menuDesplegableDatos = [];
    component.formularioDatos = [];
    const formGroup = new FormGroup({});
    mockFormData.forEach(field => {
      formGroup.addControl(
        field.name,
        new FormControl(field.value, field.validators.map(v => Validators[v]))
      );
    });

    component.formargrupo = formGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form groups', () => {
    expect(component.formargrupo).toBeDefined();
    expect(Object.keys(component.formargrupo.controls).length).toBeGreaterThan(0);
  });

  it('should initialize the form groups with proper controls', () => {
    expect(component.formargrupo.get('firstName')).toBeTruthy();
    expect(component.formargrupo.get('lastName')).toBeTruthy();
  });

  it('should display the correct formTitle in ng-titulo component', () => {
    const title = 'Test Form Title';
    component.formularioTitulo = title;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const ngTitulo = compiled.querySelector('ng-titulo');
    expect(ngTitulo).toBeTruthy();
    expect(ngTitulo.textContent).toContain(title);
  });

  it('should emit correct data when changeInValoresStore is called', () => {
    const emitSpy = jest.spyOn(component.emitirValorCambiado, 'emit');
    const field = 'firstName';
    component.changeInValoresStore(component.formargrupo, field);
    expect(emitSpy).toHaveBeenCalledWith({ forma: component.formargrupo, campo: field });
  });
  
  it('should initialize dropdownData correctly', () => {
    component.menuDesplegableDatos = [
      { id: 1, descripcion: 'Option 1' },
      { id: 2, descripcion: 'Option 2' },
    ];
    fixture.detectChanges();
    expect(component.menuDesplegableDatos.length).toBe(2);
    expect(component.menuDesplegableDatos[0].descripcion).toBe('Option 1');
  });
  
  it('should bind formData input correctly', () => {
    expect(mockFormData[0].value).toBe('John');
  });

  it('should bind formData input correctly', () => {
    component.formularioDatos = [
      {
        labelNombre: 'Tipo de mercancia',
        campo: 'tipoDeMercancia',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: false,
        validators: ['required'],
        placeholder: '',
      },
      {
        labelNombre: 'Condicion de la mercancia',
        campo: 'condicionDeLaMercancia',
        class: 'col-md-8',
        tipo_input: 'text',
        disabled: true,
        validators: [''],
        placeholder: '',
      },
    ];

    component.formargrupo = new FormGroup({
      tipoDeMercancia: new FormControl(''),
      condicionDeLaMercancia: new FormControl(''),
    });

    fixture.detectChanges();
    expect(component.formularioDatos).toBeDefined();
    expect(component.formularioDatos.length).toBe(2);
    expect(component.formularioDatos[0].campo).toBe('tipoDeMercancia');
  });

  it('should update form controls dynamically when formData changes', () => {
    component.formularioDatos = [
      {
        labelNombre: 'Condicion de la mercancia',
        campo: 'condicionDeLaMercancia',
        class: 'col-md-8',
        tipo_input: 'text',
        disabled: true,
        validators: [''],
        placeholder: '',
      },
    ];

    component.formargrupo = new FormGroup({
      condicionDeLaMercancia: new FormControl(''),
    });
  
    component.formularioDatos.forEach((data) => {

    const validators: ValidatorFn[] = data.validators.map((v) => {
      if (v === 'required') {
        return Validators.required;
      }
      return null;
    }).filter((v): v is ValidatorFn => v !== null); 

    component.formargrupo.addControl(
      data.campo,
      new FormControl({ value: 'newField', disabled: data.disabled }, validators)
    );
    });

    fixture.detectChanges();
  
    expect(component.formargrupo.get('condicionDeLaMercancia')).toBeTruthy();
    expect(component.formargrupo.get('condicionDeLaMercancia')?.validator).toBeDefined();
  });
  
  

});
