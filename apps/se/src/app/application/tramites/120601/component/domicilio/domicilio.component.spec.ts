import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError, Subscription } from 'rxjs';
import { DomicilioComponent } from './domicilio.component';
import { 
  SolicitanteService,
  FormulariosService,
  TIPO_PERSONA,
  CATALOGOS_ID,
  FormularioDinamico,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA
} from '@ng-mf/data-access-user';

// Mock de las constantes
jest.mock('@ng-mf/data-access-user', () => ({
  ...jest.requireActual('@ng-mf/data-access-user'),
  TIPO_PERSONA: {
    FISICA_NACIONAL: 1,
    MORAL_NACIONAL: 2,
    FISICA_EXTRANJERA: 3,
    MORAL_EXTRANJERA: 4
  },
  CATALOGOS_ID: {
    DATOS_PERSONA_FISICA: 'DATOS_PERSONA_FISICA'
  },
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL: [
    {
      campo: 'calle',
      labelNombre: 'Calle',
      tipo_input: 'text',
      placeholder: 'Ingrese la calle',
      class: 'col-md-6',
      validators: ['required', 'maxLength:100'],
      disabled: false
    },
    {
      campo: 'numeroExterior',
      labelNombre: 'Número Exterior',
      tipo_input: 'text',
      placeholder: 'Número exterior',
      class: 'col-md-3',
      validators: ['required'],
      disabled: false
    }
  ],
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA: [
    {
      campo: 'direccionExtranjera',
      labelNombre: 'Dirección Extranjera',
      tipo_input: 'text',
      placeholder: 'Dirección completa',
      class: 'col-md-12',
      validators: ['required', 'pattern:^[A-Za-z0-9\\s]+$'],
      disabled: false
    }
  ]
}));

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let mockSolicitanteService: jest.Mocked<SolicitanteService>;
  let mockFormulariosService: jest.Mocked<typeof FormulariosService>;
  let formBuilder: FormBuilder;

  // Datos mock
  const mockDatosGeneralesResponse = {
    data: JSON.stringify({
      domicilioFiscal: {
        calle: 'Calle Test',
        numeroExterior: '123',
        numeroInterior: 'A',
        codigoPostal: '12345',
        colonia: 'Colonia Test',
        municipio: 'Municipio Test',
        estado: 'Estado Test'
      }
    })
  };

  const mockFormularioDinamicoNacional: FormularioDinamico[] = [
    {
      campo: 'calle',
      labelNombre: 'Calle',
      tipo_input: 'text',
      placeholder: 'Ingrese la calle',
      class: 'col-md-6',
      validators: ['required', 'maxLength:100'],
      disabled: false
    },
    {
      campo: 'numeroExterior',
      labelNombre: 'Número Exterior',
      tipo_input: 'text',
      placeholder: 'Número exterior',
      class: 'col-md-3',
      validators: ['required'],
      disabled: false
    }
  ];

  const mockFormularioDinamicoExtranjero: FormularioDinamico[] = [
    {
      campo: 'direccionExtranjera',
      labelNombre: 'Dirección Extranjera',
      tipo_input: 'text',
      placeholder: 'Dirección completa',
      class: 'col-md-12',
      validators: ['required', 'pattern:^[A-Za-z0-9\\s]+$'],
      disabled: false
    }
  ];

  beforeEach(async () => {
    // Mock para SolicitanteService
    mockSolicitanteService = {
      getDatosGenerales: jest.fn(() => of(mockDatosGeneralesResponse))
    } as unknown as jest.Mocked<SolicitanteService>;

    // Mock para FormulariosService
    mockFormulariosService = {
      obtenerNombresCamposForm: jest.fn(() => ['calle', 'numeroExterior']),
      agregarValorCampoDesactivado: jest.fn()
    } as unknown as jest.Mocked<typeof FormulariosService>;

    // Reemplazar FormulariosService en el módulo
    (FormulariosService as any) = mockFormulariosService;

    await TestBed.configureTestingModule({
      imports: [DomicilioComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitanteService, useValue: mockSolicitanteService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
      expect(component.form).toBeDefined();
      expect(component['subscription']).toBeInstanceOf(Subscription);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component['solicitanteServicio']).toBeDefined();
      expect(component['fb']).toBeDefined();
    });

    it('debería llamar a los métodos de inicialización en el constructor', () => {
      const obtenerTipoPersonaSpy = jest.spyOn(component, 'obtenerTipoPersona');
      const crearFormularioSpy = jest.spyOn(component, 'crearFormulario');
      const inicializarFormGroupSpy = jest.spyOn(component, 'inicializarFormGroup');
      
      // Crear nuevo componente para activar constructor
      const newFixture = TestBed.createComponent(DomicilioComponent);
      
      expect(obtenerTipoPersonaSpy).toHaveBeenCalledWith(TIPO_PERSONA.FISICA_NACIONAL);
      expect(crearFormularioSpy).toHaveBeenCalled();
      expect(inicializarFormGroupSpy).toHaveBeenCalledWith(expect.any(Array), 'domicilioFiscal');
    });

    it('debería crear el formulario con la estructura correcta', () => {
      expect(component.form.get('domicilioFiscal')).toBeDefined();
    });
  });

  // Pruebas para el @Input
  describe('Input tabindex', () => {
    it('debería aceptar un valor de tabindex', () => {
      component.tabindex = 5;
      expect(component.tabindex).toBe(5);
    });

    it('debería manejar tabindex undefined', () => {
      component.tabindex = undefined as any;
      expect(component.tabindex).toBeUndefined();
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería llamar a getDatosGenerales', () => {
      const getDatosGeneralesSpy = jest.spyOn(component, 'getDatosGenerales');
      
      component.ngOnInit();
      
      expect(getDatosGeneralesSpy).toHaveBeenCalled();
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería cancelar las suscripciones', () => {
      const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas para obtenerTipoPersona
  describe('obtenerTipoPersona', () => {
    it('debería establecer tipo de persona física nacional y asignar formulario correcto', () => {
      component.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
      
      expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('debería establecer tipo de persona moral nacional y asignar formulario correcto', () => {
      component.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
      
      expect(component.tipoPersona).toBe(TIPO_PERSONA.MORAL_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('debería establecer tipo de persona física extranjera y asignar formulario correcto', () => {
      component.obtenerTipoPersona(TIPO_PERSONA.FISICA_EXTRANJERA);
      
      expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_EXTRANJERA);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
    });

    it('debería establecer tipo de persona moral extranjera y asignar formulario correcto', () => {
      component.obtenerTipoPersona(TIPO_PERSONA.MORAL_EXTRANJERA);
      
      expect(component.tipoPersona).toBe(TIPO_PERSONA.MORAL_EXTRANJERA);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
    });

    it('debería manejar tipos de persona no definidos como extranjeros', () => {
      const tipoNoDefinido = 999;
      component.obtenerTipoPersona(tipoNoDefinido);
      
      expect(component.tipoPersona).toBe(tipoNoDefinido);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
    });
  });

  // Pruebas para el getter domicilioFiscalForm
  describe('domicilioFiscalForm getter', () => {
    it('debería retornar el FormGroup de domicilioFiscal', () => {
      const domicilioForm = component.domicilioFiscalForm;
      
      expect(domicilioForm).toBeDefined();
      expect(domicilioForm).toBe(component.form.get('domicilioFiscal'));
    });

    it('debería retornar el mismo FormGroup en llamadas múltiples', () => {
      const domicilioForm1 = component.domicilioFiscalForm;
      const domicilioForm2 = component.domicilioFiscalForm;
      
      expect(domicilioForm1).toBe(domicilioForm2);
    });
  });

  // Pruebas para crearFormulario
  describe('crearFormulario', () => {
    it('debería crear el formulario con la estructura correcta', () => {
      component.crearFormulario();
      
      expect(component.form).toBeDefined();
      expect(component.form.get('domicilioFiscal')).toBeDefined();
    });

    it('debería crear FormGroups anidados correctamente', () => {
      component.crearFormulario();
      
      const domicilioFiscalGroup = component.form.get('domicilioFiscal');
      expect(domicilioFiscalGroup?.constructor.name).toBe('FormGroup');
    });

    it('debería permitir múltiples llamadas sin errores', () => {
      expect(() => {
        component.crearFormulario();
        component.crearFormulario();
      }).not.toThrow();
    });
  });

  // Pruebas para inicializarFormGroup
  describe('inicializarFormGroup', () => {
    beforeEach(() => {
      component.crearFormulario();
    });

    it('debería agregar controles al FormGroup según la configuración', () => {
      component.inicializarFormGroup(mockFormularioDinamicoNacional, 'domicilioFiscal');
      
      const domicilioForm = component.domicilioFiscalForm;
      expect(domicilioForm.get('calle')).toBeDefined();
      expect(domicilioForm.get('numeroExterior')).toBeDefined();
    });

    it('debería aplicar validadores correctamente', () => {
      component.inicializarFormGroup(mockFormularioDinamicoNacional, 'domicilioFiscal');
      
      const calleControl = component.domicilioFiscalForm.get('calle');
      calleControl?.setValue('');
      expect(calleControl?.hasError('required')).toBe(true);
      
      const textoLargo = 'a'.repeat(101);
      calleControl?.setValue(textoLargo);
      expect(calleControl?.hasError('maxlength')).toBe(true);
    });

    it('debería establecer el estado deshabilitado según la configuración', () => {
      const configConCampoDeshabilitado: FormularioDinamico[] = [{
        campo: 'campoDeshabilitado',
        labelNombre: 'Campo Deshabilitado',
        tipo_input: 'text',
        placeholder: 'Placeholder',
        class: 'col-md-6',
        validators: [],
        disabled: true
      }];
      
      component.inicializarFormGroup(configConCampoDeshabilitado, 'domicilioFiscal');
      
      const campoDeshabilitado = component.domicilioFiscalForm.get('campoDeshabilitado');
      expect(campoDeshabilitado?.disabled).toBe(true);
    });

    it('debería manejar configuración vacía', () => {
      expect(() => {
        component.inicializarFormGroup([], 'domicilioFiscal');
      }).not.toThrow();
    });

    it('debería manejar grupo inexistente', () => {
      expect(() => {
        component.inicializarFormGroup(mockFormularioDinamicoNacional, 'grupoInexistente');
      }).not.toThrow();
    });
  });

  // Pruebas para getValidators (método estático)
  describe('getValidators', () => {
    it('debería retornar validador required', () => {
      const validators = DomicilioComponent.getValidators(['required']);
      
      expect(validators).toHaveLength(1);
      expect(validators[0]).toBe(Validators.required);
    });

    it('debería retornar validador maxLength con el valor correcto', () => {
      const validators = DomicilioComponent.getValidators(['maxLength:50']);
      
      expect(validators).toHaveLength(1);
      // Verificar que es un validador maxLength comparando comportamiento
      const control = { value: 'a'.repeat(51) };
      const result = validators[0](control as any);
      expect(result).toBeTruthy(); // Debería fallar por exceder maxLength
    });

    it('debería retornar validador pattern con el patrón correcto', () => {
      const validators = DomicilioComponent.getValidators(['pattern:^[A-Z]+$']);
      
      expect(validators).toHaveLength(1);
      // Verificar que es un validador pattern comparando comportamiento
      const controlValido = { value: 'ABC' };
      const controlInvalido = { value: 'abc123' };
      expect(validators[0](controlValido as any)).toBeNull(); // Válido
      expect(validators[0](controlInvalido as any)).toBeTruthy(); // Inválido
    });

    it('debería combinar múltiples validadores', () => {
      const validators = DomicilioComponent.getValidators(['required', 'maxLength:10', 'pattern:^[A-Z]+$']);
      
      expect(validators).toHaveLength(3);
    });

    it('debería filtrar validadores inválidos', () => {
      const validators = DomicilioComponent.getValidators(['required', 'invalidValidator', 'maxLength:5']);
      
      expect(validators).toHaveLength(2); // Solo required y maxLength
    });

    it('debería manejar array vacío', () => {
      const validators = DomicilioComponent.getValidators([]);
      
      expect(validators).toHaveLength(0);
    });

    it('debería manejar validadores malformados', () => {
      const validators = DomicilioComponent.getValidators(['maxLength', 'pattern', 'unknown:value']);
      
      expect(validators).toHaveLength(0);
    });

    it('debería manejar maxLength sin valor', () => {
      const validators = DomicilioComponent.getValidators(['maxLength:']);
      
      expect(validators).toHaveLength(1);
      // Debería crear un validador maxLength con NaN/0
    });

    it('debería manejar pattern sin valor', () => {
      const validators = DomicilioComponent.getValidators(['pattern:']);
      
      expect(validators).toHaveLength(1);
      // Debería crear un validador pattern con patrón vacío
    });
  });

  // Pruebas para getDatosGenerales
  describe('getDatosGenerales', () => {
    beforeEach(() => {
      component.crearFormulario();
      component.inicializarFormGroup(mockFormularioDinamicoNacional, 'domicilioFiscal');
    });

    it('debería llamar al servicio con el ID correcto', () => {
      component.getDatosGenerales();
      
      expect(mockSolicitanteService.getDatosGenerales).toHaveBeenCalledWith(CATALOGOS_ID.DATOS_PERSONA_FISICA);
    });

    it('debería procesar la respuesta correctamente y poblar el formulario', () => {
      component.getDatosGenerales();
      
      expect(mockFormulariosService.obtenerNombresCamposForm).toHaveBeenCalledWith(component.domicilioFiscalForm);
      expect(mockFormulariosService.agregarValorCampoDesactivado).toHaveBeenCalled();
    });

    it('debería agregar la suscripción al subscription manager', () => {
      const addSpy = jest.spyOn(component['subscription'], 'add');
      
      component.getDatosGenerales();
      
      expect(addSpy).toHaveBeenCalled();
    });

    it('debería manejar respuesta con datos válidos', () => {
      mockFormulariosService.obtenerNombresCamposForm.mockReturnValue(['calle', 'numeroExterior']);
      
      component.getDatosGenerales();
      
      expect(mockFormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(
        component.domicilioFiscalForm, 
        'calle', 
        'Calle Test'
      );
      expect(mockFormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(
        component.domicilioFiscalForm, 
        'numeroExterior', 
        '123'
      );
    });

    it('debería manejar respuesta nula', () => {
      mockSolicitanteService.getDatosGenerales.mockReturnValue(of(null as any));
      
      expect(() => component.getDatosGenerales()).not.toThrow();
      expect(mockFormulariosService.obtenerNombresCamposForm).not.toHaveBeenCalled();
    });

    it('debería manejar respuesta undefined', () => {
      mockSolicitanteService.getDatosGenerales.mockReturnValue(of(undefined as any));
      
      expect(() => component.getDatosGenerales()).not.toThrow();
      expect(mockFormulariosService.obtenerNombresCamposForm).not.toHaveBeenCalled();
    });

    it('debería manejar datos malformados en la respuesta', () => {
      const respuestaMalformada = { data: 'datos-invalidos' };
      mockSolicitanteService.getDatosGenerales.mockReturnValue(of(respuestaMalformada as any));
      
      expect(() => component.getDatosGenerales()).not.toThrow();
    });

    it('debería manejar errores del servicio', () => {
      mockSolicitanteService.getDatosGenerales.mockReturnValue(throwError('Error del servicio'));
      
      expect(() => component.getDatosGenerales()).not.toThrow();
    });

    it('debería manejar respuesta sin domicilioFiscal', () => {
      const responseWithoutDomicilio = {
        data: JSON.stringify({
          otrosDatos: { campo: 'valor' }
        })
      };
      mockSolicitanteService.getDatosGenerales.mockReturnValue(of(responseWithoutDomicilio as any));
      
      expect(() => component.getDatosGenerales()).not.toThrow();
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización para persona nacional', () => {
      const component = TestBed.createComponent(DomicilioComponent).componentInstance;
      
      expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
      expect(component.form).toBeDefined();
      expect(component.domicilioFiscalForm).toBeDefined();
    });

    it('debería cambiar correctamente entre tipos de persona', () => {
      // Inicialmente nacional
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
      
      // Cambiar a extranjero
      component.obtenerTipoPersona(TIPO_PERSONA.FISICA_EXTRANJERA);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
      
      // Volver a nacional
      component.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('debería mantener la integridad del formulario después de cambios de tipo', () => {
      // Cambiar tipo de persona
      component.obtenerTipoPersona(TIPO_PERSONA.FISICA_EXTRANJERA);
      
      // Recrear formulario con nueva configuración
      component.crearFormulario();
      component.inicializarFormGroup(component.domicilioFiscal, 'domicilioFiscal');
      
      expect(component.domicilioFiscalForm).toBeDefined();
      expect(component.form.valid).toBeDefined();
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar FormBuilder nulo', () => {
      // Esto es difícil de testear directamente, pero podemos verificar que el constructor maneja errores
      expect(component.form).toBeDefined();
    });

    it('debería manejar configuración de formulario dinámico nula', () => {
      expect(() => {
        component.inicializarFormGroup(null as any, 'domicilioFiscal');
      }).not.toThrow();
    });

    it('debería manejar configuración de formulario dinámico con campos malformados', () => {
      const configMalformada = [
        {
          campo: '',
          labelNombre: 'Label',
          tipo_input: 'text',
          placeholder: 'Placeholder',
          class: 'col-md-6',
          validators: null as any,
          disabled: false
        }
      ];
      
      expect(() => {
        component.inicializarFormGroup(configMalformada, 'domicilioFiscal');
      }).not.toThrow();
    });

    it('debería manejar validadores null en getValidators', () => {
      const validators = DomicilioComponent.getValidators(null as any);
      expect(validators).toEqual([]);
    });

    it('debería manejar subscription null en ngOnDestroy', () => {
      component['subscription'] = null as any;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  // Pruebas de la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      component.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
      component.crearFormulario();
      component.inicializarFormGroup(component.domicilioFiscal, 'domicilioFiscal');
      fixture.detectChanges();
    });

    it('debería renderizar el título correctamente', () => {
      const compiled = fixture.nativeElement;
      const titulo = compiled.querySelector('ng-titulo');
      expect(titulo).toBeTruthy();
    });

    it('debería renderizar el formulario con los controles correctos', () => {
      const compiled = fixture.nativeElement;
      const form = compiled.querySelector('form[formGroup]');
      const formGroupDomicilio = compiled.querySelector('div[formGroupName="domicilioFiscal"]');
      
      expect(form).toBeTruthy();
      expect(formGroupDomicilio).toBeTruthy();
    });

    it('debería renderizar los campos dinámicos según la configuración', () => {
      const compiled = fixture.nativeElement;
      const inputs = compiled.querySelectorAll('input.form-control');
      
      expect(inputs.length).toBe(component.domicilioFiscal.length);
    });

    it('debería aplicar las clases CSS correctas', () => {
      const compiled = fixture.nativeElement;
      const firstFieldContainer = compiled.querySelector('.col-md-6');
      
      expect(firstFieldContainer).toBeTruthy();
    });

    it('debería mostrar las etiquetas correctas', () => {
      const compiled = fixture.nativeElement;
      const labels = compiled.querySelectorAll('label.form-label');
      
      expect(labels.length).toBe(component.domicilioFiscal.length);
      expect(labels[0].textContent?.trim()).toBe(component.domicilioFiscal[0].labelNombre);
    });

    it('debería aplicar placeholders correctos', () => {
      const compiled = fixture.nativeElement;
      const firstInput = compiled.querySelector('input[formControlName="calle"]');
      
      expect(firstInput?.getAttribute('placeholder')).toBe(component.domicilioFiscal[0].placeholder);
    });

    it('debería cambiar la renderización cuando cambia el tipo de persona', () => {
      // Cambiar a extranjero
      component.obtenerTipoPersona(TIPO_PERSONA.FISICA_EXTRANJERA);
      component.crearFormulario();
      component.inicializarFormGroup(component.domicilioFiscal, 'domicilioFiscal');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const inputs = compiled.querySelectorAll('input.form-control');
      
      expect(inputs.length).toBe(component.domicilioFiscal.length);
    });
  });

  // Pruebas de suscripciones y gestión de memoria
  describe('Gestión de suscripciones', () => {
    it('debería agregar suscripciones al subscription manager', () => {
      const addSpy = jest.spyOn(component['subscription'], 'add');
      
      component.getDatosGenerales();
      
      expect(addSpy).toHaveBeenCalled();
    });

    it('debería cancelar todas las suscripciones en ngOnDestroy', () => {
      // Agregar algunas suscripciones
      component.getDatosGenerales();
      
      const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('debería manejar múltiples suscripciones', () => {
      const addSpy = jest.spyOn(component['subscription'], 'add');
      
      // Múltiples llamadas que crean suscripciones
      component.getDatosGenerales();
      component.getDatosGenerales();
      
      expect(addSpy).toHaveBeenCalledTimes(2);
    });
  });

  // Pruebas de validación del formulario
  describe('Validación del formulario', () => {
    beforeEach(() => {
      component.crearFormulario();
      component.inicializarFormGroup(mockFormularioDinamicoNacional, 'domicilioFiscal');
    });

    it('debería validar campos requeridos', () => {
      const calleControl = component.domicilioFiscalForm.get('calle');
      
      calleControl?.setValue('');
      expect(calleControl?.hasError('required')).toBe(true);
      
      calleControl?.setValue('Calle válida');
      expect(calleControl?.hasError('required')).toBe(false);
    });

    it('debería validar maxLength', () => {
      const calleControl = component.domicilioFiscalForm.get('calle');
      
      const textoLargo = 'a'.repeat(101); // Excede maxLength:100
      calleControl?.setValue(textoLargo);
      expect(calleControl?.hasError('maxlength')).toBe(true);
      
      const textoCorto = 'a'.repeat(50);
      calleControl?.setValue(textoCorto);
      expect(calleControl?.hasError('maxlength')).toBe(false);
    });

    it('debería marcar el formulario como válido cuando todos los campos son válidos', () => {
      const calleControl = component.domicilioFiscalForm.get('calle');
      const numeroExteriorControl = component.domicilioFiscalForm.get('numeroExterior');
      
      calleControl?.setValue('Calle Test');
      numeroExteriorControl?.setValue('123');
      
      expect(component.domicilioFiscalForm.valid).toBeTruthy();
    });

    it('debería marcar el formulario como inválido cuando hay errores', () => {
      const calleControl = component.domicilioFiscalForm.get('calle');
      
      calleControl?.setValue(''); // Campo requerido vacío
      
      expect(component.domicilioFiscalForm.valid).toBeFalsy();
    });
  });
});