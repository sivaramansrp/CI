import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioDinamicoComponent } from './formularioDinamico.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioDinamico, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite261702Store } from '../../../../estados/tramites/tramite261702.store';
import { Tramite261702Query } from '../../../../estados/queries/tramite261702.query';
import { of } from 'rxjs';

describe('FormularioDinamicoComponent', () => {
  let component: FormularioDinamicoComponent;
  let fixture: ComponentFixture<FormularioDinamicoComponent>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;
  let mockStore: jest.Mocked<Tramite261702Store>;
  let mockQuery: jest.Mocked<Tramite261702Query>;

  beforeEach(async () => {
    // const tramite261702QueryMock = {
    //   selectRetiros$: of({
    //     folio: '123',
    //     tipoDeSolicitud: 'test',
    //     motivoDesistimiento: 'test description'
    //   }),
    // };
  
    mockStore = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<Tramite261702Store>;

    mockQuery = {
      selectRetiros$: of({
        folio: '123',
        tipoDeSolicitud: 'test',
        motivoDesistimiento: 'test description',
      }),
    } as unknown as jest.Mocked<Tramite261702Query>;


    mockValidacionesService = {
      isValid: jest.fn(),
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      imports: [FormularioDinamicoComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
        { provide: Tramite261702Store, useValue: mockStore },
        { provide: Tramite261702Query, useValue: mockQuery }
      ],

    }).compileComponents();

    fixture = TestBed.createComponent(FormularioDinamicoComponent);
    component = fixture.componentInstance;
    // Mock data for formularioDatos
    component.formularioDatos = [
      {
        labelNombre: 'Folio',
        campo: 'folio',
        class: 'col-md-12',
        tipo_input: 'number',
        disabled: true,
        validators: [''],
        placeholder: '',
      },
      {
        labelNombre: 'Tipo de solicitud',
        campo: 'tipoDeSolicitud',
        class: 'col-md-12',
        tipo_input: 'textarea',
        disabled: true,
        validators: [''],
        placeholder: '',
      }
    ] as FormularioDinamico[];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    jest.spyOn(component, 'inicializarFormulario');
    component.ngOnInit();
    expect(component.inicializarFormulario).toHaveBeenCalled();
    expect(component.forma.get('folio')).toBeTruthy();
    expect(component.forma.get('tipoDeSolicitud')).toBeTruthy();
  });

  it('should validate a field correctly', () => {
    component.ngOnInit();
    const control = component.forma.get('folio');
    control?.setValue(null);
    mockValidacionesService.isValid.mockReturnValue(false);
    expect(component.isValid('folio')).toBe(false);

    control?.setValue('Juan');
    mockValidacionesService.isValid.mockReturnValue(true);
    expect(component.isValid('folio')).toBe(true);
  });

  it('should call store when field value changes', () => {
    const campoName = 'folio';
    component.ngOnInit();
    component.forma.get(campoName)?.setValue('123456789');
    component.changeInValoresStore(component.forma, campoName);
    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith(campoName, '123456789');
  });

  it('should clean up on destroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalledTimes(1);
    expect(destroyNotifierCompleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should return correct validators from obtenerValidadores()', () => {
    const validators = FormularioDinamicoComponent.obtenerValidadores(['required']);
    expect(validators).toContain(Validators.required);
  
    const emptyValidators = FormularioDinamicoComponent.obtenerValidadores([]);
    expect(emptyValidators.length).toBe(0);
  });

  it('should set default values for form controls', () => {
    component.retirosCofeprisState = {
      folio: '0402600201020254006000001',
      tipoDeSolicitud: 'Permiso Sanitario de Importación de Medicamentos y Materias Primas Destinados a Pruebas de Laboratorio',
    } as any;
  
    component.inicializarFormulario();
  
    expect(component.forma.get('folio')?.value).toBe('0402600201020254006000001');
    expect(component.forma.get('tipoDeSolicitud')?.value).toBe(
      'Permiso Sanitario de Importación de Medicamentos y Materias Primas Destinados a Pruebas de Laboratorio'
    );
  });

});
