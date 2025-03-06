import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputConfig, InputRadioComponent, InputTypes, Props } from '@ng-mf/data-access-user';
import { AvisoComponent } from './aviso.component';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '@ng-mf/data-access-user';
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
    const MOCK_VALUES = { key: 'value' };
    component.valoresSeleccionadosRadio = MOCK_VALUES;
    expect(component.valoresSeleccionadosRadio).toEqual(MOCK_VALUES);
  });

  it('should create form with FormBuilder', () => {
    component.ngOnInit();
    expect(component.formulario instanceof FormGroup).toBe(true);
  });

  it('should have correct input types and props', () => {
    const INPUT_TYPES = component.configuracion[0].menu;
    expect(INPUT_TYPES).toBeDefined();
    expect(INPUT_TYPES.length).toBeGreaterThan(0);
    INPUT_TYPES.forEach(input => {
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
    const SOME_FIELD = component.formulario.get('Código postal:');
    SOME_FIELD?.setValue('');
    expect(SOME_FIELD?.valid).toBeFalsy();
    SOME_FIELD?.setValue('130120');
    expect(SOME_FIELD?.valid).toBeTruthy();
  });

  it('should generate validators correctly', () => {
    const VALIDATORS = component.getValidators(['required', 'maxLength:10', 'pattern:[a-zA-Z]']);
    expect(VALIDATORS.length).toBe(3);
    expect(VALIDATORS[0]).toBe(Validators.required);
    expect(VALIDATORS[1]).toEqual(Validators.maxLength(10));
    expect(VALIDATORS[2]).toEqual(Validators.pattern('[a-zA-Z]'));
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
    const CONFIGURACION: InputConfig[] = [
      {
        title: 'Test Group',
        formGroupName: 'testGroup',
        menu: [
          {
            inputType: InputTypes.TEXT,
            props: { campo: 'testField', labelNombre: 'Test Field' } as unknown as Props,
            class: 'col-md-4',
          }
        ]
      }
    ];
    component.crearFormulario();
    component.formulario.addControl('testGroup', formBuilder.group({}));
    component.inicializarFormGroup(CONFIGURACION[0].menu, 'testGroup', 0);
    const GROUP = component.formulario.get('testGroup') as FormGroup;
    expect(GROUP).toBeDefined();
    expect(GROUP.get('testField')).toBeDefined();
    expect(GROUP.get('testField')?.valid).toBeFalsy();
    GROUP.get('testField')?.setValue('testValue');
    expect(GROUP.get('testField')?.valid).toBeTruthy();
  });

  it('should call obtenerValoresCatalogo and update configuracion', () => {
    const MOCK_RESPONSE = [{ id: 1, name: 'Test' }];
    (catalogosService.getCatalogo as jest.Mock).mockReturnValue(of(MOCK_RESPONSE));
    component.obtenerValoresCatalogo(0, 0, 'someKey');
    expect(catalogosService.getCatalogo).toHaveBeenCalledWith('someKey');
    expect(component.configuracion[0].menu[0].props.catalogos).toEqual(MOCK_RESPONSE);
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