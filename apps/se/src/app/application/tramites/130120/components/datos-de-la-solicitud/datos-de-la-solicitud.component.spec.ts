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
describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService;
  let tramite630104Store: Tramite630104Store;
  let tramite630104Query: Tramite630104Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputFechaComponent,
        FormasDinamicasComponent,
        TituloComponent,
        DatosDeLaSolicitudComponent
      ],
      providers: [
        FormBuilder,
        {
          provide: EquipoEInstrumentosMusicalesService,
          useValue: {
            getAduanaDeIngreso: jest.fn().mockReturnValue(of([])),
            getSeccionAduanera: jest.fn().mockReturnValue(of([])),
            getProrroga: jest.fn().mockReturnValue(of([]))
          }
        },
        {
          provide: Tramite630104Store,
          useValue: {
            setTramite630104State: jest.fn()
          }
        },
        {
          provide: Tramite630104Query,
          useValue: {
            selectTramite630104State$: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    equipoEInstrumentosMusicalesService = TestBed.inject(EquipoEInstrumentosMusicalesService);
    tramite630104Store = TestBed.inject(Tramite630104Store);
    tramite630104Query = TestBed.inject(Tramite630104Query);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    jest.spyOn(component, 'inizializarFormulario');
    jest.spyOn(component, 'getValorStore');
    jest.spyOn(component, 'getAduanaDeIngreso');
    jest.spyOn(component, 'getSeccionAduanera');
    jest.spyOn(component, 'getProrroga');

    component.ngOnInit();

    expect(component.inizializarFormulario).toHaveBeenCalled();
    expect(component.getValorStore).toHaveBeenCalled();
    expect(component.getAduanaDeIngreso).toHaveBeenCalled();
    expect(component.getSeccionAduanera).toHaveBeenCalled();
    expect(component.getProrroga).toHaveBeenCalled();
  });

  it('should initialize reactive form', () => {
    component.inizializarFormulario();
    expect(component.datosImportacionTemporalFormulario).toBeDefined();
  });

  it('should fetch AduanaDeIngreso options', () => {
    const mockData = [{ id: '1', name: 'Aduana 1' }];
    jest.spyOn(equipoEInstrumentosMusicalesService, 'getAduanaDeIngreso').mockReturnValue(of(mockData));

    component.getAduanaDeIngreso();

    expect(equipoEInstrumentosMusicalesService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduanaIngreso = component.formularioDatosSolicitud.find(item => item.id === 'cveAduana');
    expect(aduanaIngreso?.opciones).toEqual(mockData);
  });

  it('should fetch SeccionAduanera options', () => {
    const mockData = [{ id: '1', name: 'Seccion 1' }];
    jest.spyOn(equipoEInstrumentosMusicalesService, 'getSeccionAduanera').mockReturnValue(of(mockData));

    component.getSeccionAduanera();

    expect(equipoEInstrumentosMusicalesService.getSeccionAduanera).toHaveBeenCalled();
    const seccionAduanera = component.formularioDatosSolicitud.find(item => item.id === 'cveSeccionAduanera');
    expect(seccionAduanera?.opciones).toEqual(mockData);
  });

  it('should fetch Prorroga options', () => {
    const mockData = [{ id: '1', name: 'Prorroga 1' }];
    jest.spyOn(equipoEInstrumentosMusicalesService, 'getProrroga').mockReturnValue(of(mockData));

    component.getProrroga();

    expect(equipoEInstrumentosMusicalesService.getProrroga).toHaveBeenCalled();
    expect(component.prorrogaOpciones).toEqual(mockData);
  });

  it('should fetch tramite state from store', () => {
    const mockState = { key: 'value' };
    jest.spyOn(tramite630104Query, 'selectTramite630104State$').mockReturnValue(of(mockState));

    component.getValorStore();

    expect(tramite630104Query.selectTramite630104State$).toHaveBeenCalled();
    expect(component.estadoSeleccionado).toEqual(mockState);
  });

  it('should set tramite state on value change', () => {
    const mockEvent = { campo: 'testCampo', valor: { id: '123' } };
    component.establecerCambioDeValor(mockEvent);

    expect(tramite630104Store.setTramite630104State).toHaveBeenCalledWith('testCampo', '123');
  });

  it('should handle primitive value change in establecerCambioDeValor', () => {
    const mockEvent = { campo: 'testCampo', valor: 'testValue' };
    component.establecerCambioDeValor(mockEvent);

    expect(tramite630104Store.setTramite630104State).toHaveBeenCalledWith('testCampo', 'testValue');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    jest.spyOn(component['destroyed$'], 'next');
    jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyed$'].next).toHaveBeenCalled();
    expect(component['destroyed$'].complete).toHaveBeenCalled();
  });
});