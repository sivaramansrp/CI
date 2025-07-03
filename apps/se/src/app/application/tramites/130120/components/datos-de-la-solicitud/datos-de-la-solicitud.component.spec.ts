import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of as observableOf, Subject } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CatalogosService, SeccionLibStore, SeccionLibQuery, ConsultaioQuery } from '@ng-mf/data-access-user';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';
import { provideHttpClientTesting } from '@angular/common/http/testing';

@Injectable()
class MockPermisoImportacionStore {
  actualizarDatosGrupos = jest.fn();
  setFacturaFecha = jest.fn();
  setFecha_documento = jest.fn();
  setPersona_tipo = jest.fn();
  setDenominación_razón_social = jest.fn();
  setPersonales_nombre = jest.fn();
  setPrimer_apellido = jest.fn();
  setSegundo_apellido = jest.fn();
  setExportadorPersona_tipo = jest.fn();
  setExportadorDenominación_razón_social = jest.fn();
  setExportadorPersonales_nombre = jest.fn();
  setExportadorPrimer_apellido = jest.fn();
  setExportadorSegundo_apellido = jest.fn();
}

@Injectable()
class MockTramite130120Query {
  select = jest.fn().mockReturnValue(observableOf({
    datosProductor: { persona_tipo: '' },
    datosExportador: { persona_tipo: '' }
  }));
}

@Injectable()
class MockSeccionLibStore {
  establecerSeccion = jest.fn();
  establecerFormaValida = jest.fn();
}

@Injectable()
class MockSeccionLibQuery {
  selectSeccionState$ = observableOf({});
}

@Injectable()
class MockCatalogosService {
  getCatalogo = jest.fn().mockReturnValue(observableOf([]));
}

@Injectable()
class MockConsultaioQuery {
  selectConsultaioState$ = observableOf({});
}

describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: DatosDeLaSolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosDeLaSolicitudComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useClass: MockCatalogosService },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore },
        { provide: SeccionLibQuery, useClass: MockSeccionLibQuery },
        { provide: PermisoImportacionStore, useClass: MockPermisoImportacionStore },
        { provide: Tramite130120Query, useClass: MockTramite130120Query },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
        provideHttpClientTesting()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component.destroyNotifier$) {
      component.destroyNotifier$.next();
      component.destroyNotifier$.complete();
    }
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    component.configuracion = [
      { title: '', formGroupName: '', menu: [] },
      { title: '', formGroupName: '', menu: [] },
      { title: '', formGroupName: '', menu: [] },
      {
        title: '',
        formGroupName: '',
        menu: [
          {
            inputType: '',
            class: '',
            props: {
              labelNombre: '',
              campo: '',
              disabled: false,
              required: true,
              validators: [],
              catalogos: [],
              radioOptions: [],
              radioSelectedValue: '',
              placeholder: '',
              primerOpcion: '',
              jsonDataFileName: '', 
              habilitado: true
            }
          }
        ]
      },
      {
        title: '',
        formGroupName: '',
        menu: [
          {
            inputType: '',
            class: '',
            props: {
              labelNombre: '',
              campo: '',
              disabled: false,
              required: true,
              validators: [],
              catalogos: [],
              radioOptions: [],
              radioSelectedValue: '',
              placeholder: '',
              primerOpcion: '',
              jsonDataFileName: '',
              habilitado: true
            }
          }
        ]
      }
    ];
    component.inicializarFormGroup = jest.fn();
    component.formulario = new FormGroup({});
    jest.spyOn(component.formulario, 'get').mockReturnValue({
      valid: true,
      value: {},
      setValue: jest.fn(),
      markAsDirty: jest.fn(),
      markAsTouched: jest.fn(),
    } as any);
    component.formulario.patchValue = jest.fn();
    Object.defineProperty(component.formulario, 'valueChanges', { get: () => observableOf({}) });
    component.setFormGroupValidity = jest.fn();
    component.ngOnInit();
    expect(component.inicializarFormGroup).toHaveBeenCalled();
  });

  it('should run #crearFormulario()', () => {
    component.fb = new FormBuilder();
    component.crearFormulario();
    expect(component.formulario).toBeDefined();
  });

  it('should run #inicializarFormGroup()', () => {
    component.formulario = new FormBuilder().group({
      test: new FormBuilder().group({})
    });
    component.fb = new FormBuilder();
    component.obtenerValoresCatalogo = jest.fn();
    component.inicializarFormGroup([
      {
        props: {
          labelNombre: '',
          campo: 'campo1',
          disabled: false,
          required: true,
          validators: [],
          catalogos: [],
          radioOptions: [],
          radioSelectedValue: '',
          placeholder: '',
          primerOpcion: '',
          jsonDataFileName: '',
          habilitado: true
        },
        inputType: '',
        class: ''
      }
    ], 'test', 0);
    expect(component.obtenerValoresCatalogo).not.toHaveBeenCalled();
  });

  it('should run #obtenerValoresCatalogo()', () => {
    component.catalogosServicios = new MockCatalogosService() as any;
    component.configuracion = [
      {
        title: '',
        formGroupName: '',
        menu: [
          {
            inputType: '',
            class: '',
            props: {
              labelNombre: '',
              campo: '',
              disabled: false,
              required: true,
              validators: [],
              catalogos: [],
              radioOptions: [],
              radioSelectedValue: '',
              placeholder: '',
              primerOpcion: '',
              jsonDataFileName: '',
              habilitado: true
            }
          }
        ]
      }
    ];
    component.obtenerValoresCatalogo(0, 0, '');
    expect(component.catalogosServicios.getCatalogo).toHaveBeenCalled();
  });

  it('should run #getValidators()', () => {
    const validators = DatosDeLaSolicitudComponent.getValidators(['required', 'maxLength:10', 'pattern:^\\d+$']);
    expect(validators.length).toBe(3);
  });

  it('should run #fechaCambiado()', () => {
    component.formulario = new FormBuilder().group({});
    component.formulario.patchValue = jest.fn();
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();
    component.fechaCambiado('');
    expect(component.formulario.patchValue).toHaveBeenCalled();
    expect(component.permisoImportacionStore.setFacturaFecha).toHaveBeenCalled();
  });

  it('should run #fechaDocumento()', () => {
    component.formulario = new FormBuilder().group({});
    component.formulario.patchValue = jest.fn();
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();
    component.fechaDocumento('');
    expect(component.formulario.patchValue).toHaveBeenCalled();
    expect(component.permisoImportacionStore.setFecha_documento).toHaveBeenCalled();
  });

  it('should run #seleccionCatalogo()', () => {
    component.formulario = new FormBuilder().group({});
    const mockControl = {
      setValue: jest.fn(),
      markAsDirty: jest.fn(),
      markAsTouched: jest.fn()
    };
    jest.spyOn(component.formulario, 'get').mockReturnValue(mockControl as any);
    Object.defineProperty(component.formulario, 'value', { get: () => 'value' });
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();
    component.seleccionCatalogo('test', 'event' as any);
    expect(mockControl.setValue).toHaveBeenCalled();
    expect(mockControl.markAsDirty).toHaveBeenCalled();
    expect(mockControl.markAsTouched).toHaveBeenCalled();
    expect(component.permisoImportacionStore.actualizarDatosGrupos).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', () => {
    component.store = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.formulario = new FormBuilder().group({});
    component.formulario.patchValue({});
    const mockControl = {
      value: '',
      markAsDirty: jest.fn(),
      markAsTouched: jest.fn()
    };
    const mockForm = {
      get: jest.fn().mockReturnValue(mockControl)
    } as any;
    component.setValoresStore(mockForm, '', '', 'actualizarDatosGrupos' as any);
    expect(mockControl.markAsDirty).toHaveBeenCalled();
    expect(mockControl.markAsTouched).toHaveBeenCalled();
    expect(component.permisoImportacionStore.actualizarDatosGrupos).toHaveBeenCalled();
  });

  it('should run #setFormGroupValidity()', () => {
    component.formulario = new FormBuilder().group({
      datosRealizer: new FormBuilder().group({}),
      datosMercanica: new FormBuilder().group({}),
      datosExporta: new FormBuilder().group({}),
      datosProductor: new FormBuilder().group({}),
      datosExportador: new FormBuilder().group({}),
      datosFederal: new FormBuilder().group({})
    });
    jest.spyOn(component.formulario, 'get').mockReturnValue({
      valid: true,
      value: {},
      setValue: jest.fn(),
      markAsDirty: jest.fn(),
      markAsTouched: jest.fn(),
    } as any);
    component.seccionStore = new MockSeccionLibStore() as any;
    component.setFormGroupValidity();
    expect(component.seccionStore.establecerSeccion).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
  });


  it('should run #ngOnDestroy()', () => {
    component.destroyNotifier$ = new Subject();
    jest.spyOn(component.destroyNotifier$, 'next');
    jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });


  it('should call setPersona_tipo and setFormGroupValidity in onTipoPersonaProductorChange', () => {
    component.formulario = new FormBuilder().group({
      datosProductor: new FormBuilder().group({
        persona_tipo: [''],
        personales_nombre: [''],
        primer_apellido: [''],
        segundo_apellido: [''],
        denominación_razón_social: [''],
        domicilio: ['']
      })
    });
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();

    const grupo = component.formulario.get('datosProductor') as FormGroup;
    Object.keys(grupo.controls).forEach(key => {
      jest.spyOn(grupo.get(key)!, 'setValidators');
      jest.spyOn(grupo.get(key)!, 'clearValidators');
      jest.spyOn(grupo.get(key)!, 'setValue');
      jest.spyOn(grupo.get(key)!, 'updateValueAndValidity');
    });

    component.onTipoPersonaProductorChange('Física');
    expect(component.permisoImportacionStore.setPersona_tipo).toHaveBeenCalledWith('Física');
    expect(component.setFormGroupValidity).toHaveBeenCalled();
    Object.keys(grupo.controls).forEach(key => {
      expect(grupo.get(key)?.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  it('should call setPersona_tipo and setFormGroupValidity in onTipoPersonaProductorChange for Moral', () => {
    component.formulario = new FormBuilder().group({
      datosProductor: new FormBuilder().group({
        persona_tipo: [''],
        personales_nombre: [''],
        primer_apellido: [''],
        segundo_apellido: [''],
        denominación_razón_social: [''],
        domicilio: ['']
      })
    });
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();

    const grupo = component.formulario.get('datosProductor') as FormGroup;
    Object.keys(grupo.controls).forEach(key => {
      jest.spyOn(grupo.get(key)!, 'setValidators');
      jest.spyOn(grupo.get(key)!, 'clearValidators');
      jest.spyOn(grupo.get(key)!, 'setValue');
      jest.spyOn(grupo.get(key)!, 'updateValueAndValidity');
    });

    component.onTipoPersonaProductorChange('Moral');
    expect(component.permisoImportacionStore.setPersona_tipo).toHaveBeenCalledWith('Moral');
    expect(component.setFormGroupValidity).toHaveBeenCalled();
    Object.keys(grupo.controls).forEach(key => {
      expect(grupo.get(key)?.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  it('should call establecerSeccion and establecerFormaValida when all groups are valid in setFormGroupValidity', () => {
    // Arrange
    const mockGroup = {
      valid: true,
      value: {},
      setValue: jest.fn(),
      markAsDirty: jest.fn(),
      markAsTouched: jest.fn(),
    };
    component.formulario = new FormBuilder().group({
      datosRealizer: new FormBuilder().group({}),
      datosMercanica: new FormBuilder().group({}),
      datosExporta: new FormBuilder().group({}),
      datosProductor: new FormBuilder().group({}),
      datosExportador: new FormBuilder().group({}),
      datosFederal: new FormBuilder().group({})
    });
    // Mock .get to always return a valid group
    jest.spyOn(component.formulario, 'get').mockReturnValue(mockGroup as any);
    component.seccionStore = new MockSeccionLibStore() as any;

    // Act
    component.setFormGroupValidity();

    // Assert
    expect(component.seccionStore.establecerSeccion).toHaveBeenCalledWith([true]);
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalledWith([true]);
  });

  it('should not call establecerSeccion and establecerFormaValida if any group is invalid in setFormGroupValidity', () => {
    // Arrange
    const validGroup = { valid: true };
    const invalidGroup = { valid: false };
    component.formulario = new FormBuilder().group({
      datosRealizer: new FormBuilder().group({}),
      datosMercanica: new FormBuilder().group({}),
      datosExporta: new FormBuilder().group({}),
      datosProductor: new FormBuilder().group({}),
      datosExportador: new FormBuilder().group({}),
      datosFederal: new FormBuilder().group({})
    });
    // Mock .get to return one invalid group
    const getMock = jest.spyOn(component.formulario, 'get');
    getMock.mockImplementation((path: string | (string | number)[]) => {
      const key = Array.isArray(path) ? path[0] : path;
      if (key === 'datosExporta') return invalidGroup as any;
      return validGroup as any;
    });
    component.seccionStore = new MockSeccionLibStore() as any;

    // Act
    component.setFormGroupValidity();

    // Assert
    expect(component.seccionStore.establecerSeccion).not.toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).not.toHaveBeenCalled();
  });
  it('should update radioSelectedValue when cambioValorRadio is called', () => {
    // Arrange
    component.configuracion = [
      {
        title: '',
        formGroupName: '',
        menu: [
          {
            inputType: '',
            class: '',
            props: {
              labelNombre: '',
              campo: '',
              disabled: false,
              required: true,
              validators: [],
              catalogos: [],
              radioOptions: [],
              radioSelectedValue: '',
              placeholder: '',
              primerOpcion: '',
              jsonDataFileName: '',
              habilitado: true
            }
          }
        ]
      }
    ];
    const groupIndex = 0;
    const menuIndex = 0;
    const claveRadio = 'testRadio';
    const evento = 'nuevoValor';

    // Act
    component.cambioValorRadio(claveRadio, groupIndex, menuIndex, evento);

    // Assert
    expect(component.configuracion[groupIndex].menu[menuIndex].props.radioSelectedValue).toBe(evento);
  });
  it('should calculate and update valor_total_factura_usd in setTotalMercanciaImportar', () => {
    // Arrange
    const setValueMock = jest.fn();
    const markAsDirtyMock = jest.fn();
    const markAsTouchedMock = jest.fn();

    const mockDatosMercanica = {
      get: jest.fn((field: string) => {
        if (field === 'valor_total_factura') {
          return { value: '10' }; // parseFloat('10') = 10
        }
        if (field === 'valor_total_factura_usd') {
          return {
            setValue: setValueMock,
            markAsDirty: markAsDirtyMock,
            markAsTouched: markAsTouchedMock
          };
        }
        return null;
      })
    };

    component.formulario = new FormBuilder().group({});
    jest.spyOn(component.formulario, 'get').mockImplementation((path: string | (string | number)[]) => {
      const key = Array.isArray(path) ? path[0] : path;
      if (key === 'datosMercanica') return mockDatosMercanica as any;
      return null;
    });

    // Act
    component.setTotalMercanciaImportar();

    // Assert
    expect(setValueMock).toHaveBeenCalledWith(32.7, { emitEvent: false });
    expect(markAsDirtyMock).toHaveBeenCalled();
    expect(markAsTouchedMock).toHaveBeenCalled();
  });

  it('should return early if datosMercanica is not found in setTotalMercanciaImportar', () => {
    component.formulario = new FormBuilder().group({});
    jest.spyOn(component.formulario, 'get').mockReturnValue(null as any);
    // Should not throw
    expect(() => component.setTotalMercanciaImportar()).not.toThrow();
  });

  it('should not update valor_total_factura_usd if control is missing in setTotalMercanciaImportar', () => {
    const mockDatosMercanica = {
      get: jest.fn((field: string) => {
        if (field === 'valor_total_factura') {
          return { value: '10' };
        }
        if (field === 'valor_total_factura_usd') {
          return null;
        }
        return null;
      })
    };
    component.formulario = new FormBuilder().group({});
    // Should not throw or call setValue
    expect(() => component.setTotalMercanciaImportar()).not.toThrow();
  });

  it('should set value, mark as dirty/touched, call actualizarDatosGrupos and setFormGroupValidity in seleccionCatalogo', () => {
    // Arrange
    const setValueMock = jest.fn();
    const markAsDirtyMock = jest.fn();
    const markAsTouchedMock = jest.fn();
    const controlMock = {
      setValue: setValueMock,
      markAsDirty: markAsDirtyMock,
      markAsTouched: markAsTouchedMock
    };
    component.formulario = new FormBuilder().group({});
    jest.spyOn(component.formulario, 'get').mockReturnValue(controlMock as any);
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();
    Object.defineProperty(component.formulario, 'value', { get: () => ({ test: 'value' }) });
    component.seleccionCatalogo('someControl', 'someEvent' as any);
    expect(setValueMock).toHaveBeenCalledWith('someEvent');
    expect(markAsDirtyMock).toHaveBeenCalled();
    expect(markAsTouchedMock).toHaveBeenCalled();
    expect(component.permisoImportacionStore.actualizarDatosGrupos).toHaveBeenCalledWith({ test: 'value' });
    expect(component.setFormGroupValidity).toHaveBeenCalled();
  });

  it('should not throw if control is not found in seleccionCatalogo', () => {
    component.formulario = new FormBuilder().group({});
    jest.spyOn(component.formulario, 'get').mockReturnValue(undefined as any);
    expect(() => component.seleccionCatalogo('missingControl', 'event' as any)).not.toThrow();
  });
  it('should patch the form, call setFecha_documento and setFormGroupValidity in fechaDocumento', () => {
    // Arrange
    component.formulario = new FormBuilder().group({});
    component.formulario.patchValue = jest.fn();
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();

    // Act
    component.fechaDocumento('2024-06-01');

    // Assert
    expect(component.formulario.patchValue).toHaveBeenCalledWith({
      datosExportador: { fecha_documento: '2024-06-01' },
    });
    expect(component.permisoImportacionStore.setFecha_documento).toHaveBeenCalledWith('2024-06-01');
    expect(component.setFormGroupValidity).toHaveBeenCalled();
  });
  it('should patch the form, call setFacturaFecha and setFormGroupValidity in fechaCambiado', () => {
    // Arrange
    component.formulario = new FormBuilder().group({});
    component.formulario.patchValue = jest.fn();
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();

    // Act
    component.fechaCambiado('2024-06-01');

    // Assert
    expect(component.formulario.patchValue).toHaveBeenCalledWith({
      datosMercanica: { factura_fecha: '2024-06-01' },
    });
    expect(component.permisoImportacionStore.setFacturaFecha).toHaveBeenCalledWith('2024-06-01');
    expect(component.setFormGroupValidity).toHaveBeenCalled();
  });
  it('should generate correct Angular validators in getValidators', () => {
    // Arrange
    const validators = DatosDeLaSolicitudComponent.getValidators([
      'required',
      'maxLength:5',
      'pattern:^abc$'
    ]);

    // Act
    const testControl = new FormBuilder().control('');

    // Apply each validator and check their effects
    // 1. required
    testControl.setValidators([validators[0]]);
    testControl.setValue('');
    expect(testControl.valid).toBe(false);
    testControl.setValue('x');
    expect(testControl.valid).toBe(true);

    // 2. maxLength
    testControl.setValidators([validators[1]]);
    testControl.setValue('123456');
    expect(testControl.valid).toBe(false);
    testControl.setValue('12345');
    expect(testControl.valid).toBe(true);

    // 3. pattern
    testControl.setValidators([validators[2]]);
    testControl.setValue('abc');
    expect(testControl.valid).toBe(true);
    testControl.setValue('abcd');
    expect(testControl.valid).toBe(false);

    // 4. All together
    testControl.setValidators(validators);
    testControl.setValue('');
    expect(testControl.valid).toBe(false); // required fails
    testControl.setValue('abc');
    expect(testControl.valid).toBe(true); // passes all
    testControl.setValue('abcdef');
    expect(testControl.valid).toBe(false); // maxLength and pattern fail
  });


  it('should set initialValue to 1 for datosMercanica group and menuIndex 11', () => {
    // Arrange
    const addControlMock = jest.fn();
    const getMock = jest.fn();
    const testFormGroup = { addControl: addControlMock } as any;
    getMock.mockReturnValue(testFormGroup);

    // Mock fb.control
    const controlMock = {};
    component.fb = {
      control: jest.fn().mockReturnValue(controlMock)
    } as any;

    // Mock formulario.get
    component.formulario = { get: getMock } as any;

    // Mock obtenerValoresCatalogo
    component.obtenerValoresCatalogo = jest.fn();

    // Prepare configuracion with menuIndex 11
    const configuracion: any[] = [];
    for (let i = 0; i < 12; i++) {
      configuracion.push({
        inputType: 'TEXT',
        props: {
          campo: `campo${i}`,
          disabled: false,
          validators: []
        }
      });
    }

    // Act
    component.inicializarFormGroup(configuracion, 'datosMercanica', 1);

    // Assert
    // The 12th call (menuIndex 11) should have initialValue 1
    expect(component.fb.control).toHaveBeenNthCalledWith(
      12,
      { value: 1, disabled: false },
      expect.any(Array)
    );
  });
  it('should create a form group with all expected subgroups in crearFormulario', () => {
    component.fb = new FormBuilder();
    component.crearFormulario();
    expect(component.formulario instanceof FormGroup).toBe(true);
    expect(component.formulario.contains('datosRealizer')).toBe(true);
    expect(component.formulario.contains('datosMercanica')).toBe(true);
    expect(component.formulario.contains('datosExporta')).toBe(true);
    expect(component.formulario.contains('datosProductor')).toBe(true);
    expect(component.formulario.contains('datosExportador')).toBe(true);
    expect(component.formulario.contains('datosFederal')).toBe(true);
    expect(component.formulario.get('datosRealizer') instanceof FormGroup).toBe(true);
    expect(component.formulario.get('datosMercanica') instanceof FormGroup).toBe(true);
    expect(component.formulario.get('datosExporta') instanceof FormGroup).toBe(true);
    expect(component.formulario.get('datosProductor') instanceof FormGroup).toBe(true);
    expect(component.formulario.get('datosExportador') instanceof FormGroup).toBe(true);
    expect(component.formulario.get('datosFederal') instanceof FormGroup).toBe(true);
  });
  it('should call setExportadorPersona_tipo and setFormGroupValidity in onTipoPersonaExportadorChange', () => {
    component.formulario = new FormBuilder().group({
      datosExportador: new FormBuilder().group({
        persona_tipo: [''],
        personales_nombre: [''],
        primer_apellido: [''],
        segundo_apellido: [''],
        denominación_razón_social: [''],
        domicilio: [''],
        observaciones: ['']
      })
    });
    component.permisoImportacionStore = new MockPermisoImportacionStore() as any;
    component.setFormGroupValidity = jest.fn();

    const grupo = component.formulario.get('datosExportador') as FormGroup;
    Object.keys(grupo.controls).forEach(key => {
      jest.spyOn(grupo.get(key)!, 'setValidators');
      jest.spyOn(grupo.get(key)!, 'clearValidators');
      jest.spyOn(grupo.get(key)!, 'setValue');
      jest.spyOn(grupo.get(key)!, 'updateValueAndValidity');
    });

    component.onTipoPersonaExportadorChange('Física');
    expect(component.permisoImportacionStore.setExportadorPersona_tipo).toHaveBeenCalledWith('Física');
    expect(component.setFormGroupValidity).toHaveBeenCalled();
    Object.keys(grupo.controls).forEach(key => {
      expect(grupo.get(key)?.updateValueAndValidity).toHaveBeenCalled();
    });
  });
  it('should correctly update validators and call store methods for "Ninguno" in onTipoPersonaProductorChange', () => {
    // Arrange
    component.formulario = new FormBuilder().group({
      datosProductor: new FormBuilder().group({
        persona_tipo: [''],
        personales_nombre: [''],
        primer_apellido: [''],
        segundo_apellido: [''],
        denominación_razón_social: [''],
        domicilio: ['']
      })
    });
    component.permisoImportacionStore = {
      setPersona_tipo: jest.fn(),
      setPersonales_nombre: jest.fn(),
      setPrimer_apellido: jest.fn(),
      setSegundo_apellido: jest.fn(),
      setDenominación_razón_social: jest.fn()
    } as any;
    component.setFormGroupValidity = jest.fn();

    const grupo = component.formulario.get('datosProductor') as FormGroup;
    Object.keys(grupo.controls).forEach(key => {
      jest.spyOn(grupo.get(key)!, 'setValidators');
      jest.spyOn(grupo.get(key)!, 'clearValidators');
      jest.spyOn(grupo.get(key)!, 'setValue');
      jest.spyOn(grupo.get(key)!, 'updateValueAndValidity');
    });

    // Act
    component.onTipoPersonaProductorChange('Ninguno');

    // Assert
    expect(component.permisoImportacionStore.setPersona_tipo).toHaveBeenCalledWith('Ninguno');
    expect(component.permisoImportacionStore.setPersonales_nombre).toHaveBeenCalledWith('');
    expect(component.permisoImportacionStore.setPrimer_apellido).toHaveBeenCalledWith('');
    expect(component.permisoImportacionStore.setSegundo_apellido).toHaveBeenCalledWith('');
    expect(component.permisoImportacionStore.setDenominación_razón_social).toHaveBeenCalledWith('');
    expect(grupo.get('domicilio')?.setValidators).toHaveBeenCalledWith([Validators.required, expect.any(Function)]);
    expect(grupo.get('personales_nombre')?.setValue).toHaveBeenCalledWith('');
    expect(grupo.get('personales_nombre')?.clearValidators).toHaveBeenCalled();
    expect(grupo.get('denominación_razón_social')?.setValue).toHaveBeenCalledWith('');
    expect(grupo.get('denominación_razón_social')?.clearValidators).toHaveBeenCalled();
    Object.keys(grupo.controls).forEach(key => {
      expect(grupo.get(key)?.updateValueAndValidity).toHaveBeenCalled();
    });
    expect(component.setFormGroupValidity).toHaveBeenCalled();
  });
  it('should clean up subscriptions on ngOnDestroy', () => {
    component.destroyNotifier$ = new Subject<void>();
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  it('should initialize radio options and patch form values in ngOnInit', () => {
    // Arrange
    component.configuracion = [
      {}, {}, {},
      { menu: [{ props: {} }] }, // index 3 for datosProductor
      { menu: [{ props: {} }] }, // index 4 for datosExportador
    ] as any;
    component.inicializarFormGroup = jest.fn();
    component.formulario = new FormBuilder().group({
      datosRealizer: new FormBuilder().group({}),
      datosMercanica: new FormBuilder().group({}),
      datosExporta: new FormBuilder().group({}),
      datosProductor: new FormBuilder().group({}),
      datosExportador: new FormBuilder().group({}),
      datosFederal: new FormBuilder().group({})
    });
    component.seccionQuery = {
      selectSeccionState$: observableOf({ test: 'state' })
    } as any;
    component.seccionStore = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn()
    } as any;
    component.tramiteQuery = {
      select: jest.fn().mockReturnValue(observableOf({
        datosProductor: { persona_tipo: 'Moral' },
        datosExportador: { persona_tipo: 'Física' }
      }))
    } as any;
    component.permisoImportacionStore = { actualizarDatosGrupos: jest.fn() } as any;
    component.setFormGroupValidity = jest.fn();
    component.consultaQuery = {
      selectConsultaioState$: observableOf({ readonly: true })
    } as any;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.configuracion[3].menu[0].props.radioOptions).toEqual([
      { label: 'Física', value: 'Física' },
      { label: 'Moral', value: 'Moral' },
      { label: 'Ninguno', value: 'Ninguno' }
    ]);
    expect(component.configuracion[3].menu[0].props.radioSelectedValue).toBe('Física');
    expect(component.configuracion[4].menu[0].props.radioOptions).toEqual([
      { label: 'Física', value: 'Física' },
      { label: 'Moral', value: 'Moral' }
    ]);
    expect(component.configuracion[4].menu[0].props.radioSelectedValue).toBe('Física');
    expect(component.tipoPersonaProductor).toBe('Moral');
    expect(component.tipoPersonaExportador).toBe('Física');
    expect(component.esFormularioSoloLectura).toBe(true);
  });
});