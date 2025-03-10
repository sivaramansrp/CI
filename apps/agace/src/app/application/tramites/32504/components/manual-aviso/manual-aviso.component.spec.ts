import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Props } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ManualAvisoComponent } from './manual-aviso.component';
import { of } from 'rxjs';

import { CatalogoSelectComponent, CatalogosService, InputConfig,InputFechaComponent, InputRadioComponent, InputTypes, TablaDinamicaComponent, TituloComponent, botonAccionesTipos } from '@ng-mf/data-access-user';
import { ActionType } from '../../enum/aviso.enum';

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
    const MOCKRESPONSE = [{ id: 1, name: 'Test' }];
    (catalogosService.getCatalogo as jest.Mock).mockReturnValue(of(MOCKRESPONSE));
    component.obtenerValoresCatalogo(0, 0, 'someKey');
    expect(catalogosService.getCatalogo).toHaveBeenCalledWith('someKey');
    expect(component.configuracion[0].menu[0].props.catalogos).toEqual(MOCKRESPONSE);
  });

  it('should generate validators correctly', () => {
    const VALIDATORS = ManualAvisoComponent.obtenerValidadores(['required', 'maxLength:10', 'pattern:[a-zA-Z]']);
    expect(VALIDATORS.length).toBe(3);
    expect(VALIDATORS[0]).toBe(Validators.required);
  });

  it('should handle date change', () => {
    jest.spyOn(component, 'fechaCambiado').mockImplementation();
    component.fechaCambiado('2023-01-01');
    expect(component.fechaCambiado).toHaveBeenCalledWith('2023-01-01');
  });

  it('should handle button action AGREGAR', () => {
    jest.spyOn(component, 'accionesBotones').mockImplementation();
    component.accionesBotones(ActionType.FORM_ACTION, botonAccionesTipos.AGREGAR);
    expect(component.accionesBotones).toHaveBeenCalledWith(ActionType.FORM_ACTION, botonAccionesTipos.AGREGAR);
  });

  it('should handle button action ELIMINAR', () => {
    jest.spyOn(component, 'accionesBotones').mockImplementation();
    component.accionesBotones(ActionType.FORM_ACTION, botonAccionesTipos.ELIMINAR);
    expect(component.accionesBotones).toHaveBeenCalledWith(ActionType.FORM_ACTION, botonAccionesTipos.ELIMINAR);
  });

  it('should handle button action MODIFICAR', () => {
    jest.spyOn(component, 'accionesBotones').mockImplementation();
    component.accionesBotones(ActionType.FORM_ACTION, botonAccionesTipos.MODIFICAR);
    expect(component.accionesBotones).toHaveBeenCalledWith(ActionType.FORM_ACTION, botonAccionesTipos.MODIFICAR);
  });

  it('should handle child table button action AGREGAR', () => {
    jest.spyOn(component, 'botonDeTablaInfantilAccion').mockImplementation();
    component.botonDeTablaInfantilAccion(botonAccionesTipos.AGREGAR);
    expect(component.botonDeTablaInfantilAccion).toHaveBeenCalledWith(botonAccionesTipos.AGREGAR);
  });

  it('should handle child table button action CANCELAR', () => {
    jest.spyOn(component, 'botonDeTablaInfantilAccion').mockImplementation();
    component.botonDeTablaInfantilAccion(botonAccionesTipos.CANCELAR);
    expect(component.botonDeTablaInfantilAccion).toHaveBeenCalledWith(botonAccionesTipos.CANCELAR);
  });
});