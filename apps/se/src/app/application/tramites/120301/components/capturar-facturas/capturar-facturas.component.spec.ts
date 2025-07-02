// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CapturarFacturasComponent } from './capturar-facturas.component';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockElegibilidadTextilesService {}

@Injectable()
class MockHttpClient {
  post() {}
}

@Injectable()
class MockElegibilidadDeTextilesStore {}

@Injectable()
class MockElegibilidadDeTextilesQuery {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

describe('CapturarFacturasComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ElegibilidadTextilesService,
          useClass: MockElegibilidadTextilesService,
        },
        { provide: HttpClient, useClass: MockHttpClient },
        FormBuilder,
        {
          provide: ElegibilidadDeTextilesStore,
          useClass: MockElegibilidadDeTextilesStore,
        },
        {
          provide: ElegibilidadDeTextilesQuery,
          useClass: MockElegibilidadDeTextilesQuery,
        },
        SeccionLibStore,
        SeccionLibQuery,
      ],
    })
      .overrideComponent(CapturarFacturasComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(CapturarFacturasComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = () => {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    const mockSeccionState = { readonly: true }; 
    const mockTextileState = { formaValida: [{ descripcion: 'Valida' }] };

    component.seccionQuery = {
      selectSeccionState$: observableOf(mockSeccionState),
    } as any;

    component.ElegibilidadDeTextilesQuery = {
      selectTextile$: observableOf(mockTextileState),
    } as any;

    component.initActionFormBuild = jest.fn();
    component.obtenerListasDesplegables = jest.fn();
    component.recuperarDatos = jest.fn();

    component.seccionStore = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    } as any;

    component.ElegibilidadDeTextilesStore = {
      setFormaValida: jest.fn(),
    } as any;

    component.facturaForm = {
      statusChanges: observableOf({}),
      valid: true,
      disable: jest.fn(),
    } as any;

    component.formularioDeshabilitado = true;

    component.capturarState = mockTextileState;

    component.ngOnInit();

    expect(component.initActionFormBuild).toHaveBeenCalled();
    expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    expect(component.recuperarDatos).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.capturarState = component.capturarState || {};
    component.capturarState.numeroFactura = 'numeroFactura';
    component.capturarState.cantidadTotal = 'cantidadTotal';
    component.capturarState.unidadDeMedida = 'unidadDeMedida';
    component.capturarState.valorDolares = 'valorDolares';
    component.capturarState.taxId = 'taxId';
    component.capturarState.razonSocial = 'razonSocial';
    component.capturarState.calle = 'calle';
    component.capturarState.ciudad = 'ciudad';
    component.capturarState.cp = 'cp';
    component.capturarState.pais = 'pais';
    component.initActionFormBuild();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerListasDesplegables();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', () => {
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'ABC123' }),
    } as any;

    const mockStore = {
      setTaxId: jest.fn(),
    } as any;

    component['ElegibilidadDeTextilesStore'] = mockStore;
    component.setValoresStore(mockForm, 'taxId', 'setTaxId');

    expect(mockForm.get).toHaveBeenCalledWith('taxId');
    expect(mockStore.setTaxId).toHaveBeenCalledWith('ABC123');
  });

  it('should run #obtenerIngresoSelectList() with data', () => {
    const mockData = [{ id: '1', descripcion: 'KG' }];
    component.ElegibilidadTextilesService = {
      obtenerMenuDesplegable: jest.fn().mockReturnValue(observableOf(mockData)),
    } as any;

    component.obtenerIngresoSelectList();

    expect(component.unidadDeMedida).toEqual(mockData);
  });

  it('should run #recuperarDatos() with data', () => {
    const mockFacturas = [
      {
        numeroDeLaFactura: 'F001',
        razonSocial: 'Empresa X',
        domicilio: 'CDMX',
        fechaExpedicionFactura: '2025-01-01',
        cantidadTotal: 100,
        cantidadDisponible: 100,
        unidadMedida: 'KG',
        valorDolares: 200,
      },
    ];
    component.ElegibilidadTextilesService = {
      obtenerTablaDatos: jest.fn().mockReturnValue(observableOf(mockFacturas)),
    } as any;

    component.recuperarDatos();

    expect(component.facturas).toEqual(mockFacturas);
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });
});
