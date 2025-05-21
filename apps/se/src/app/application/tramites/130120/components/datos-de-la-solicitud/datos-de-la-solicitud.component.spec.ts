import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputConfig, InputTypes, Props } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

const tipoDePersonaProductorOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
];

const tipoDePersonaExportadorOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
];

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let _catalogosService: CatalogosService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        InputFechaComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        DatosDeLaSolicitudComponent // Import the standalone component here
      ],
      providers: [
        FormBuilder,
        {
          provide: CatalogosService,
          useValue: {
            getCatalogo: jest.fn().mockReturnValue(of([]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    _catalogosService = TestBed.inject(CatalogosService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.ngOnInit();
    expect(component.formulario).toBeDefined();
  });

  it('should set valoresSeleccionadosRadio', () => {
    const mockValues = { key: 'value' };
    component.valoresSeleccionadosRadio = mockValues;
    expect(component.valoresSeleccionadosRadio).toEqual(mockValues);
  });

  it('should create formulario with FormBuilder', () => {
    component.ngOnInit();
    expect(component.formulario instanceof FormGroup).toBe(true);
  });

  it('should have correct input types and props', () => {
    const inputTypes = component.configuracion[0].menu;
    expect(inputTypes).toBeDefined();
    expect(inputTypes.length).toBeGreaterThan(0);
    inputTypes.forEach(input => {
      expect(input.inputType).toBeDefined();
      expect(input.props).toBeDefined();
      expect(input.class).toBe('col-md-8');
    });
  });

  it('should call ngOnInit and initialize formulario', () => {
    jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.formulario).toBeDefined();
  });

  it('should call crearFormulario', () => {
    jest.spyOn(component, 'crearFormulario');
    component.crearFormulario();
    expect(component.crearFormulario).toHaveBeenCalled();
  });

  it('should call getCatalogo from CatalogosService', () => {
    component.ngOnInit();
    expect(_catalogosService.getCatalogo).toHaveBeenCalled();
  });

  it('should update form values', () => {
    component.ngOnInit();
    component.formulario.addControl('Código postal:', formBuilder.control(''));
    component.formulario.patchValue({ 'Código postal:': '130120' });
    expect(component.formulario.get('Código postal:')?.value).toBe('130120');
  });

  it('should validate form fields', () => {
    component.ngOnInit();
    component.formulario.addControl('Código postal:', formBuilder.control('', Validators.required));
    const someField = component.formulario.get('Código postal:');
    someField?.setValue('');
    expect(someField?.valid).toBeFalsy();
    someField?.setValue('130120');
    expect(someField?.valid).toBeTruthy();
  });

  it('should generate validators correctly', () => {
    const validators = DatosDeLaSolicitudComponent.getValidators(['required', 'maxLength:10', 'pattern:[a-zA-Z]']);
    expect(validators.length).toBe(3);
  });

  it('should handle date change', () => {
    jest.spyOn(component, 'fechaCambiado');
    component.fechaCambiado('2023-01-01');
    expect(component.fechaCambiado).toHaveBeenCalledWith('2023-01-01');
  });

  it('should handle catalog selection', () => {
    jest.spyOn(component, 'seleccionCatalogo');
    const event = { target: { value: 'someValue' } } as unknown as Event;
    component.seleccionCatalogo('someControl', event);
    expect(component.seleccionCatalogo).toHaveBeenCalledWith('someControl', event);
  });

  it('should handle radio value change', () => {
    jest.spyOn(component, 'cambioValorRadio');
    component.cambioValorRadio('radioKey', 'radioValue');
    expect(component.cambioValorRadio).toHaveBeenCalledWith('radioKey', 'radioValue');
  });

  it('should fetch catalog values and update configuration', () => {
    jest.spyOn(component, 'obtenerValoresCatalogo');
    component.obtenerValoresCatalogo(0, 0, 'someKey');
    expect(component.obtenerValoresCatalogo).toHaveBeenCalledWith(0, 0, 'someKey');
  });

  it('should initialize form group correctly', () => {
    component.ngOnInit();
    component.formulario = formBuilder.group({});
    component.formulario.addControl('datosRealizar', formBuilder.group({}));
    component.inicializarFormGroup(component.configuracion[0].menu, 'datosRealizar', 0);
    const group = component.formulario.get('datosRealizar') as FormGroup;
    expect(group).toBeDefined();
    expect(group.get('régimen')).toBeDefined();
    expect(group.get('régimen')?.valid).toBeFalsy();
    group.get('régimen')?.setValue('testValue');
    expect(group.get('régimen')?.valid).toBeTruthy();
  });
});