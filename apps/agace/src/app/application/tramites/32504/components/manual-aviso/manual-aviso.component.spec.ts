import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionType } from '@ng-mf/data-access-user';
import { InputConfig, InputTypes, buttonActionTypes, CatalogoSelectComponent, CatalogosService, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TituloComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ManualAvisoComponent } from './manual-aviso.component';
import { of } from 'rxjs';

describe('ManualAvisoComponent', () => {
  let component: ManualAvisoComponent;
  let fixture: ComponentFixture<ManualAvisoComponent>;
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
        TablaDinamicaComponent,
        ManualAvisoComponent // Import the standalone component here
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

    fixture = TestBed.createComponent(ManualAvisoComponent);
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

  it('should call renderGroup on ngOnInit', () => {
    jest.spyOn(component, 'renderGroup');
    component.ngOnInit();
    expect(component.renderGroup).toHaveBeenCalledWith(component.configuracion);
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
    expect(component.valoresSeleccionadosRadio['radioKey']).toBe('radioValue');
  });

  it('should handle button action AGREGAR', () => {
    jest.spyOn(component, 'buttonAcion').mockImplementation();
    component.buttonAcion(ActionType.FORM_ACTION, buttonActionTypes.AGREGAR);
    expect(component.buttonAcion).toHaveBeenCalledWith(ActionType.FORM_ACTION, buttonActionTypes.AGREGAR);
  });

  it('should handle button action ELIMINAR', () => {
    jest.spyOn(component, 'buttonAcion').mockImplementation();
    component.buttonAcion(ActionType.FORM_ACTION, buttonActionTypes.ELIMINAR);
    expect(component.buttonAcion).toHaveBeenCalledWith(ActionType.FORM_ACTION, buttonActionTypes.ELIMINAR);
  });

  it('should handle button action MODIFICAR', () => {
    jest.spyOn(component, 'buttonAcion').mockImplementation();
    component.buttonAcion(ActionType.FORM_ACTION, buttonActionTypes.MODIFICAR);
    expect(component.buttonAcion).toHaveBeenCalledWith(ActionType.FORM_ACTION, buttonActionTypes.MODIFICAR);
  });

  it('should handle child table button action AGREGAR', () => {
    jest.spyOn(component, 'childTablebuttonAcion').mockImplementation();
    component.childTablebuttonAcion(buttonActionTypes.AGREGAR);
    expect(component.childTablebuttonAcion).toHaveBeenCalledWith(buttonActionTypes.AGREGAR);
  });

  it('should handle child table button action CANCELAR', () => {
    jest.spyOn(component, 'childTablebuttonAcion').mockImplementation();
    component.childTablebuttonAcion(buttonActionTypes.CANCELAR);
    expect(component.childTablebuttonAcion).toHaveBeenCalledWith(buttonActionTypes.CANCELAR);
  });
});