import { TestBed } from '@angular/core/testing';
import { DireccionEmpresaComponent } from './direccion-empresa.component';
import { FormGroup, FormGroupDirective, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Tramite30401Store } from '../../estados/tramites30401.store';

describe('DireccionEmpresaComponent', () => {
  let component: DireccionEmpresaComponent;
  let formGroupDirective: FormGroupDirective;
  let tramite30401Store: Tramite30401Store;

  beforeEach(() => {
    tramite30401Store = {
      establecerDatos: jest.fn(),
    } as unknown as Tramite30401Store;

    formGroupDirective = {
      control: new FormGroup({}),
    } as unknown as FormGroupDirective;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DireccionEmpresaComponent],
      // declarations: [DireccionEmpresaComponent],
      providers: [
        { provide: FormGroupDirective, useValue: formGroupDirective },
        { provide: Tramite30401Store, useValue: tramite30401Store },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DireccionEmpresaComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group on ngOnInit', () => {
    const mockFormGroup = new FormGroup({});
    jest.spyOn(formGroupDirective.control, 'get').mockReturnValue(mockFormGroup);

    component.grupoDeFormulario = 'testGroup';
    component.ngOnInit();

    expect(formGroupDirective.control.get).toHaveBeenCalledWith('testGroup');
    expect(component.inicializarFormulario).toBe(mockFormGroup);
  });

  it('should call establecerDatos on setValoresStore', () => {
    const mockFormGroup = new FormGroup({});
    jest.spyOn(mockFormGroup, 'get').mockReturnValue({ value: 'testValue' } as any);

    component.setValoresStore(mockFormGroup, 'testField');

    expect(tramite30401Store.establecerDatos).toHaveBeenCalledWith({ testField: 'testValue' });
  });

  it('should return true if a control is invalid, touched, or dirty in esInvalido', () => {
    // Mock the form group and its get method
    const mockControl = {
      invalid: true,
      touched: true,
      dirty: false,
    };

    // Ensure inicializarFormulario is properly initialized
    component.inicializarFormulario = new FormGroup({
      testControl: new FormControl(),
    });

    jest.spyOn(component.inicializarFormulario, 'get').mockReturnValue(mockControl as any);

    const result = component.esInvalido('testControl');
    expect(result).toBe(true);
  });

  it('should return false if a control is valid in esInvalido', () => {
    // Mock the form group and its get method
    const mockControl = {
      invalid: false,
      touched: false,
      dirty: false,
    };

    // Ensure inicializarFormulario is properly initialized
    component.inicializarFormulario = new FormGroup({
      testControl: new FormControl(),
    });

    jest.spyOn(component.inicializarFormulario, 'get').mockReturnValue(mockControl as any);

    const result = component.esInvalido('testControl');
    expect(result).toBe(false);
  });
});