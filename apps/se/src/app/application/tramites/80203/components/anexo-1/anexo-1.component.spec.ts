// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of as observableOf, Subject } from 'rxjs';

import { Anexo1Component } from './anexo-1.component';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';
import { NicoService } from '../../servicios/nico/nico.service';
import { ImmexRegistroQuery } from '../../estados/queries/tramite80203.query';
import { ImmexRegistroStore } from '../../estados/tramites/tramite80203.store';
import { SeccionLibQuery, ConsultaioQuery } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

@Injectable()
class MockPermisoImmexDatosService {
  getDatos = jest.fn().mockReturnValue(observableOf({
    permisoImmexDatos: [{ IMMEX_Columna_3: 'foo', IMMEX_Columna_4: 'bar' }],
    fraccionDatos: [{ FRACCION_Columna_2: 'baz', FRACCION_Columna_5: 'qux', FRACCION_Columna_6: 'quux' }],
    nicoDatos: [{}],
  }));
}
@Injectable()
class MockNicoService {
  obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf([{ id: 1, nombre: 'Nico1' }]));
}
@Injectable()
class MockImmexRegistroQuery {
  selectImmexRegistro$ = observableOf({ immexRegistro: {} });
}
@Injectable()
class MockImmexRegistroStore {
  setImmexRegistro = jest.fn();
}
@Injectable()
class MockSeccionLibQuery {
  selectSeccionState$ = observableOf({ formaValida: [false, false, false], readonly: false });
  getValue = () => ({ formaValida: [false, false, false], readonly: false });
}
@Injectable()
class MockSeccionLibStore {
  establecerFormaValida = jest.fn();
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective { @Input() myCustom; }
@Pipe({ name: 'translate' }) class TranslatePipe implements PipeTransform { transform(v) { return v; } }
@Pipe({ name: 'phoneNumber' }) class PhoneNumberPipe implements PipeTransform { transform(v) { return v; } }
@Pipe({ name: 'safeHtml' }) class SafeHtmlPipe implements PipeTransform { transform(v) { return v; } }

function getMockState() {
  return {
    permisoImmexDatos: [],
    fraccionDatos: [],
    nicoDatos: [],
    fraccionArancelariaExportacion: '',
    productoArancelariaExportacion: '',
    fraccionArancelariaDesc: '',
    productoDescExportacion: '',
    FraccionDescExportacion: '',
    exportacionDescExportacion: '',
    Nico: '',
    commodityImportacion: '',
    commodityDescImportacion: '',
    commodityNicoDescImportacion: '',
    candiadAnual: '',
    capacidadPeriodo: '',
    candidadPorPeriodo: ''
  };
}

function createMockForm(fb: FormBuilder, state = getMockState()) {
  return fb.group({
    exportacionForm: fb.group({
      permisoImmexDatos: [state.permisoImmexDatos],
      fraccionDatos: [state.fraccionDatos],
      nicoDatos: [state.nicoDatos],
      fraccionArancelariaExportacion: [state.fraccionArancelariaExportacion],
      productoArancelariaExportacion: [state.productoArancelariaExportacion],
      fraccionArancelariaDesc: [state.fraccionArancelariaDesc],
      productoDescExportacion: [state.productoDescExportacion],
      FraccionDescExportacion: [state.FraccionDescExportacion],
      exportacionDescExportacion: [state.exportacionDescExportacion],
      Nico: [state.Nico],
    }),
    importacionForm: fb.group({
      fraccionDatos: [state.fraccionDatos],
      nicoDatos: [state.nicoDatos],
      commodityImportacion: [state.commodityImportacion],
      commodityDescImportacion: [state.commodityDescImportacion],
      commodityNicoDescImportacion: [state.commodityNicoDescImportacion],
      candiadAnual: [state.candiadAnual],
      capacidadPeriodo: [state.capacidadPeriodo],
      candidadPorPeriodo: [state.candidadPorPeriodo],
      Nico: [state.Nico],
    }),
  });
}

describe('Anexo1Component', () => {
  let fixture;
  let component;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Anexo1Component, FormsModule, ReactiveFormsModule],
      declarations: [TranslatePipe, PhoneNumberPipe, SafeHtmlPipe, MyCustomDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: PermisoImmexDatosService, useClass: MockPermisoImmexDatosService },
        { provide: NicoService, useClass: MockNicoService },
        { provide: ImmexRegistroQuery, useClass: MockImmexRegistroQuery },
        { provide: ImmexRegistroStore, useClass: MockImmexRegistroStore },
        { provide: SeccionLibQuery, useClass: MockSeccionLibQuery },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore },
        ConsultaioQuery
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Anexo1Component);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.seccionQuery = TestBed.inject(SeccionLibQuery);
    component.seccionStore = TestBed.inject(SeccionLibStore);
    component.immexRegitroAnexoState = getMockState();
  });

  afterEach(() => {
    if (component) component.ngOnDestroy = () => {};
    if (fixture) fixture.destroy();
  });

  it('should create and initialize form', () => {
    component.ngOnInit();
    expect(component.immexRegistroform).toBeInstanceOf(FormGroup);
    expect(component.immexRegistroform.get('exportacionForm')).toBeTruthy();
    expect(component.immexRegistroform.get('importacionForm')).toBeTruthy();
  });

  it('should create a form group in creatFormSolicitud', () => {
    component.fb = fb;
    component.immexRegitroAnexoState = getMockState();
    component.creatFormSolicitud();
    expect(component.immexRegistroform instanceof FormGroup).toBe(true);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifier$ = { next: jest.fn(), complete: jest.fn() };
    component.destroyNotifier$ = destroyNotifier$;
    component.ngOnDestroy();
    expect(destroyNotifier$.next).toHaveBeenCalled();
    expect(destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should fetch data and patch form', () => {
    component.immexRegistroform = fb.group({
      exportacionForm: fb.group({}),
      importacionForm: fb.group({})
    });
    component.immexRegistroform.patchValue = jest.fn();
    component.permisoImmexDatosService = TestBed.inject(PermisoImmexDatosService);
    component.fetchData();
    expect(component.immexRegistroform.patchValue).toHaveBeenCalled();
    expect(Array.isArray(component.immexTableDatos)).toBe(true);
    expect(Array.isArray(component.fraccionTablaDatos)).toBe(true);
    expect(Array.isArray(component.nicoTablaDatos)).toBe(true);
  });

  it('should update nico on obtenerIngresoSelectList', () => {
    component.nicoService = TestBed.inject(NicoService);
    component.obtenerIngresoSelectList();
    expect(Array.isArray(component.nico)).toBe(true);
  });


  it('should call get on immexRegistroform in disableFormControls', () => {
    const getMock = jest.fn().mockReturnValue({ disable: jest.fn() });
    component.immexRegistroform = { get: getMock };
    component.disableFormControls();
    expect(getMock).toHaveBeenCalled();
  });
});