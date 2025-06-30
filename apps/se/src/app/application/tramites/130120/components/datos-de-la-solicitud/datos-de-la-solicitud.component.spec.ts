import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of as observableOf, Subject } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CatalogosService, SeccionLibStore, SeccionLibQuery, ConsultaioQuery } from '@ng-mf/data-access-user';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
      imports: [FormsModule, ReactiveFormsModule, DatosDeLaSolicitudComponent, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useClass: MockCatalogosService },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore },
        { provide: SeccionLibQuery, useClass: MockSeccionLibQuery },
        { provide: PermisoImportacionStore, useClass: MockPermisoImportacionStore },
        { provide: Tramite130120Query, useClass: MockTramite130120Query },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery }
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
});