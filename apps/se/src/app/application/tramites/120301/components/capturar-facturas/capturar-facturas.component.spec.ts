import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { CapturarFacturasComponent } from './capturar-facturas.component';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-fecha',
  template: '<input />',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MockInputFechaComponent,
      multi: true
    }
  ]
})
class MockInputFechaComponent implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
@Injectable()
class MockElegibilidadTextilesService {}
@Injectable()
class MockHttpClient { post() {} }
@Injectable()
class MockElegibilidadDeTextilesStore {}
@Injectable()
class MockElegibilidadDeTextilesQuery {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any): any { return value; }
}
@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any { return value; }
}
@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any): any { return value; }
}

describe('CapturarFacturasComponent', () => {
  let component: CapturarFacturasComponent;
  let fixture: ComponentFixture<CapturarFacturasComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CapturarFacturasComponent],
      providers: [
        FormBuilder,
        { provide: HttpClient, useValue: { get: jest.fn().mockReturnValue(observableOf({})) } },
        { provide: ElegibilidadTextilesService, useClass: MockElegibilidadTextilesService },
        { provide: ElegibilidadDeTextilesStore, useClass: MockElegibilidadDeTextilesStore },
        { provide: ElegibilidadDeTextilesQuery, useClass: MockElegibilidadDeTextilesQuery },
        { provide: SeccionLibStore, useValue: { establecerFormaValida: jest.fn() } },
        { provide: SeccionLibQuery, useValue: { selectSeccionState$: observableOf({}) } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(CapturarFacturasComponent);
    component = fixture.componentInstance;
  });
  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });
  it('debe inicializar el formulario en español', () => {
    component.facturaForm = new FormBuilder().group({
      unidadDeMedida: [''],
      pais: [''],
      fechaExpedicionFactura: ['']
    });
    expect(component.facturaForm).toBeDefined();
    expect(typeof component.facturaForm.get).toBe('function');
  });

  it('debe crear el componente correctamente (constructor)', async () => {
    expect(component).toBeTruthy();
  });

  it('debe retornar facturaForm desde el getter formGroup', () => {
    const grupoMock = { test: 'valor' } as any;
    component.facturaForm = grupoMock;
    expect(component.formGroup).toBe(grupoMock);
  });

  it('debe mapear correctamente las columnas de la tabla', () => {
    expect(component.tableColumns.length).toBe(8);
    const filaEjemplo = {
      numeroDeLaFactura: 'F001',
      razonSocial: 'Empresa X',
      domicilio: 'CDMX',
      fechaExpedicionFactura: '2025-01-01',
      cantidadTotal: '100',
      cantidadDisponible: '50',
      unidadMedida: 'KG',
      valorDolares: '200',
      idExpedicion: 1,
    };
    expect(component.tableColumns[0].clave(filaEjemplo)).toBe('F001');
    expect(component.tableColumns[1].clave(filaEjemplo)).toBe('Empresa X');
    expect(component.tableColumns[2].clave(filaEjemplo)).toBe('CDMX');
    expect(component.tableColumns[3].clave(filaEjemplo)).toBe('2025-01-01');
    expect(component.tableColumns[4].clave(filaEjemplo)).toBe('100');
    expect(component.tableColumns[5].clave(filaEjemplo)).toBe('50');
    expect(component.tableColumns[6].clave(filaEjemplo)).toBe('KG');
    expect(component.tableColumns[7].clave(filaEjemplo)).toBe('200');
  });

  it('debe manejar continuar() cuando el formulario es válido', () => {
    component['facturaForm'] = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: true,
    } as any;
    component['cdr'] = { detectChanges: jest.fn() } as any;
    window.scrollTo = jest.fn();
    component['mostrarTabs'] = { emit: jest.fn() } as any;
    component.continuar();
    expect(component.formularioAlertaError).toBe('');
    expect(component.esFormaValido).toBe(false);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component['mostrarTabs'].emit).toHaveBeenCalledWith(true);
  });

  it('debe ejecutar ngOnInit correctamente', () => {
    const estadoSeccionMock = { readonly: true };
    const estadoTextilMock = { formaValida: [{ descripcion: 'Valida' }] };

    component['seccionQuery'] = {
      selectSeccionState$: observableOf(estadoSeccionMock),
    } as any;

    component['ElegibilidadDeTextilesQuery'] = {
      selectTextile$: observableOf(estadoTextilMock),
    } as any;

      component['initActionFormBuild'] = jest.fn();
      component['obtenerListasDesplegables'] = jest.fn();
      component['recuperarDatos'] = jest.fn();

    component['seccionStore'] = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    } as any;

    component['ElegibilidadDeTextilesStore'] = {
      setFormaValida: jest.fn(),
    } as any;

    component['facturaForm'] = new FormBuilder().group({
      unidadDeMedida: [''],
      pais: [''],
      fechaExpedicionFactura: ['']
    });

    component['formularioDeshabilitado'] = true;
    component['capturarState'] = estadoTextilMock as any;

  component.ngOnInit();

  expect(component['initActionFormBuild']).toHaveBeenCalled();
  expect(component['obtenerListasDesplegables']).toHaveBeenCalled();
  });

  it('debe ejecutar #initActionFormBuild()', async () => {
  jest.spyOn(component['fb'], 'group').mockImplementation(jest.fn());
    component['capturarState'] = {
      numeroFactura: 'numeroFactura',
      cantidadTotal: 'cantidadTotal',
      unidadDeMedida: 'unidadDeMedida',
      valorDolares: 'valorDolares',
      taxId: 'taxId',
      razonSocial: 'razonSocial',
      calle: 'calle',
      ciudad: 'ciudad',
      cp: 'cp',
      pais: 'pais',
      formaValida: [],
    } as any;
  component.initActionFormBuild();
  expect(component['fb'].group).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerListasDesplegables();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('debe ejecutar #setValoresStore()', () => {
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

  it('debe ejecutar #obtenerIngresoSelectList() con datos', () => {
    const mockData = [{ id: '1', descripcion: 'KG' }];
    component['ElegibilidadTextilesService'] = {
      obtenerMenuDesplegable: jest.fn().mockReturnValue(observableOf(mockData)),
    } as any;

    component.obtenerIngresoSelectList();

    expect(component.unidadDeMedida).toEqual(mockData);
  });

  it('debe ejecutar #recuperarDatos() con datos', () => {
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
        idExpedicion: 1,
      },
    ];
    component['ElegibilidadTextilesService'] = {
      obtenerTablaDatos: jest.fn().mockReturnValue(observableOf(mockFacturas)),
    } as any;

    component.recuperarDatos();

    expect(component.facturas).toEqual(mockFacturas);
  });

  it('debe ejecutar #ngOnDestroy()', async () => {
  component['destroyNotifier$'] = component['destroyNotifier$'] || {};
  component['destroyNotifier$'].next = jest.fn();
  component['destroyNotifier$'].complete = jest.fn();
  component.ngOnDestroy();
  expect(component['destroyNotifier$'].next).toHaveBeenCalled();
  expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});
