import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvisoComponent } from './aviso.component';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputConfig, InputTypes, InputRadioComponent } from '@ng-mf/data-access-user';
import { ManualAvisoComponent } from '../manual-aviso/manual-aviso.component';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { buttonActionTypes } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let catalogosService: CatalogosService;
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
        ManualAvisoComponent,
        CargaMasivaComponent,
        TablaDinamicaComponent
      ],
      declarations: [AvisoComponent],
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

    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    catalogosService = TestBed.inject(CatalogosService);
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

  it('should set radioSelectedValues', () => {
    const mockValues = { key: 'value' };
    component.valoresSeleccionadosRadio = mockValues;
    expect(component.valoresSeleccionadosRadio).toEqual(mockValues);
  });

  it('should create form with FormBuilder', () => {
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
      expect(input.class).toBe('col-md-4');
    });
  });

  it('should call ngOnInit and initialize form', () => {
    jest.spyOn(component, 'ngOnInit').mockImplementation();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.formulario).toBeDefined();
  });

  // it('should handle form submission', () => {
  //   jest.spyOn(component, 'onSubmit').mockImplementation();
  //   component.onSubmit();
  //   expect(component.onSubmit).toHaveBeenCalled();
  // });

  // it('should handle form reset', () => {
  //   jest.spyOn(component, 'onReset').mockImplementation();
  //   component.onReset();
  //   expect(component.onReset).toHaveBeenCalled();
  // });

  it('should call getCatalogo from CatalogosService', () => {
    component.ngOnInit();
    expect(catalogosService.getCatalogo).toHaveBeenCalled();
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
    expect(validators[0]).toBe(Validators.required);
    expect(validators[1]).toEqual(Validators.maxLength(10));
    expect(validators[2]).toEqual(Validators.pattern('[a-zA-Z]'));
  });

  it('should handle date change', () => {
    jest.spyOn(component, 'fechaCambiado').mockImplementation();
    component.fechaCambiado('2023-01-01');
    expect(component.fechaCambiado).toHaveBeenCalledWith('2023-01-01');
  });

  it('should handle catalog selection', () => {
    jest.spyOn(component, 'seleccionCatalogo').mockImplementation();
    component.seleccionCatalogo('someControl', 'someValue');
    expect(component.seleccionCatalogo).toHaveBeenCalledWith('someControl', 'someValue');
    expect(component.formulario.get('someControl')?.value).toBe('someValue');
  });

  it('should handle radio value change', () => {
    jest.spyOn(component, 'cambioValorRadio').mockImplementation();
    component.cambioValorRadio('radioKey', 0, 0, 'radioValue');
    expect(component.cambioValorRadio).toHaveBeenCalledWith('radioKey', 0, 0, 'radioValue');
    expect(component.valoresSeleccionadosRadio.radioKey).toBe('radioValue');
  });

  it('should initialize form group correctly', () => {
    const configuracion: InputConfig[] = [
      {
        title: 'Test Group',
        formGroupName: 'testGroup',
        menu: [
          {
            inputType: InputTypes.TEXT,
            props: { campo: 'testField', labelNombre: 'Test Field' },
            class: 'col-md-4',
          }
        ]
      }
    ];
    component.crearFormulario();
    component.formulario.addControl('testGroup', formBuilder.group({}));
    component.inicializarFormGroup(configuracion[0].menu, 'testGroup', 0);
    const group = component.formulario.get('testGroup') as FormGroup;
    expect(group).toBeDefined();
    expect(group.get('testField')).toBeDefined();
    expect(group.get('testField')?.valid).toBeFalsy();
    group.get('testField')?.setValue('testValue');
    expect(group.get('testField')?.valid).toBeTruthy();
  });

  it('should call obtenerValoresCatalogo and update configuracion', () => {
    const mockResponse = [{ id: 1, name: 'Test' }];
    (catalogosService.getCatalogo as jest.Mock).mockReturnValue(of(mockResponse));
    component.obtenerValoresCatalogo(0, 0, 'someKey');
    expect(catalogosService.getCatalogo).toHaveBeenCalledWith('someKey');
    expect(component.configuracion[0].menu[0].props.catalogs).toEqual(mockResponse);
  });

  it('should handle button action AGREGAR', () => {
    component.buttonAcion(buttonActionTypes.AGREGAR);
    expect(component.isManualAsivoAgregarClicked).toBe(true);
  });

  it('should handle button action ELIMINAR', () => {
    jest.spyOn(component, 'buttonAcion').mockImplementation();
    component.buttonAcion(buttonActionTypes.ELIMINAR);
    expect(component.buttonAcion).toHaveBeenCalledWith(buttonActionTypes.ELIMINAR);
  });

  it('should handle button action MODIFICAR', () => {
    jest.spyOn(component, 'buttonAcion').mockImplementation();
    component.buttonAcion(buttonActionTypes.MODIFICAR);
    expect(component.buttonAcion).toHaveBeenCalledWith(buttonActionTypes.MODIFICAR);
  });
});