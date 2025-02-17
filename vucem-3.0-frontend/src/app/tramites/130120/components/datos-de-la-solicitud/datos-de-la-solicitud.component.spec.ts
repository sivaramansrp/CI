import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { InputConfig } from '../../../../core/models/130120/permiso-importacion-modification.model';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { InputTypes } from '../../../../core/models/130120/permiso-importacion-modification.enum';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { of } from 'rxjs';

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
            getCatalogo: jasmine.createSpy('getCatalogo').and.returnValue(of([]))
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
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.formulario).toBeDefined();
  });

  it('should call crearFormulario', () => {
    spyOn(component, 'crearFormulario').and.callThrough();
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
    const validators = component.getValidators(['required', 'maxLength:10', 'pattern:[a-zA-Z]']);
    expect(validators.length).toBe(3);
  });

  it('should handle date change', () => {
    spyOn(component, 'fechaCambiado').and.callThrough();
    component.fechaCambiado('2023-01-01');
    expect(component.fechaCambiado).toHaveBeenCalledWith('2023-01-01');
  });

  it('should handle catalog selection', () => {
    spyOn(component, 'seleccionCatalogo').and.callThrough();
    component.seleccionCatalogo('someControl', 'someValue');
    expect(component.seleccionCatalogo).toHaveBeenCalledWith('someControl', 'someValue');
  });

  it('should handle radio value change', () => {
    spyOn(component, 'cambioValorRadio').and.callThrough();
    component.cambioValorRadio('radioKey', 'radioValue');
    expect(component.cambioValorRadio).toHaveBeenCalledWith('radioKey', 'radioValue');
  });

  it('should fetch catalog values and update configuration', () => {
    spyOn(component, 'obtenerValoresCatalogo').and.callThrough();
    component.obtenerValoresCatalogo(0, 0, 'someKey');
    expect(component.obtenerValoresCatalogo).toHaveBeenCalledWith(0, 0, 'someKey');
  });

  it('should initialize form group correctly', () => {
    component.ngOnInit();
    const configuracion: InputConfig[] = [
      {
        title: 'Test Group',
        formGroupName: 'testGroup',
        menu: [
          {
            inputType: InputTypes.TEXT,
            props: { campo: 'testField', labelNombre: 'Test Field' },
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.SELECT,
            props: { campo: 'testField', labelNombre: 'Test Field' },
            class: 'col-md-8',
          }
        ]
      }
    ];
    component.formulario = formBuilder.group('testGroup', {});
    component.formulario.addControl('testGroup', formBuilder.group({}));
    component.inicializarFormGroup(configuracion[0].menu, 'testGroup', 0);
    const group = component.formulario.get('testGroup') as FormGroup;
    expect(group).toBeDefined();
    expect(group.get('testField')).toBeDefined();
    expect(group.get('testField')?.valid).toBeFalsy();
    group.get('testField')?.setValue('testValue');
    expect(group.get('testField')?.valid).toBeTruthy();
  });
});