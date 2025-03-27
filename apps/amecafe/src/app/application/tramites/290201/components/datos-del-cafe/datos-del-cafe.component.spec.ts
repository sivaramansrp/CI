// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { of } from 'rxjs'; // Import 'of' from rxjs
import { Component } from '@angular/core';
import { DatosDelCafeComponent } from './datos-del-cafe.component';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';


@Injectable()
class MockRegistrarSolicitudService {
  getUtilicoCafeComoData = jest.fn().mockReturnValue(of([])); // Mock implementation returning an observable
  getEnvasadoenData = jest.fn().mockReturnValue(of([])); // Mock other methods as needed
  getPaisDeImportacionData = jest.fn().mockReturnValue(of([]));
  getFraccionArancelariaData = jest.fn().mockReturnValue(of([]));
  getUnidadDeMedidaData = jest.fn().mockReturnValue(of([]));
  getDollarData = jest.fn().mockReturnValue(of([]));
  getMediaDeTransporte = jest.fn().mockReturnValue(of([]));
}
@Injectable()
class MockSolicitud290201Store {
  [key: string]: jest.Mock; // Allow dynamic methods to be mocked

  metodoNombre = jest.fn(); // Example mock method
}
@Injectable()
class MockSolicitud290201Query {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('DatosDelCafeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosDelCafeComponent ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistrarSolicitudService, useClass: MockRegistrarSolicitudService },
        FormBuilder,
        { provide: Solicitud290201Store, useClass: MockSolicitud290201Store },
        { provide: Solicitud290201Query, useClass: MockSolicitud290201Query }
      ]
    }).overrideComponent(DatosDelCafeComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDelCafeComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {}; // Safely set ngOnDestroy if component exists
    }
    if (fixture) {
      fixture.destroy(); // Destroy the fixture if it exists
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
    // expect(component.dataCafeForm.get).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.dataCafeState = component.dataCafeState || {};
    component.dataCafeState.envasadoen = 'envasadoen';
    component.dataCafeState.utilizoCafeComo = 'utilizoCafeComo';
    component.dataCafeState.cantidadutilizada = 'cantidadutilizada';
    component.dataCafeState.numerodepedimento = 'numerodepedimento';
    component.dataCafeState.paisdeimportacion = 'paisdeimportacion';
    component.dataCafeState.fraccionarancelaria = 'fraccionarancelaria';
    component.dataCafeState.cantidad = 'cantidad';
    component.dataCafeState.unidaddemedida = 'unidaddemedida';
    component.dataCafeState.precioapplicable = 'precioapplicable';
    component.dataCafeState.dolar = 'dolar';
    component.dataCafeState.lote = 'lote';
    component.dataCafeState.otrasmarcas = 'otrasmarcas';
    component.dataCafeState.elcafe = 'elcafe';
    component.dataCafeState.fechaexportacion = 'fechaexportacion';
    component.dataCafeState.paisdetransbordo = 'paisdetransbordo';
    component.dataCafeState.mediodetransporte = 'mediodetransporte';
    component.dataCafeState.Identificadordel = 'Identificadordel';
    component.dataCafeState.observaciones = 'observaciones';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled(); // Verify that the form group was created
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud290201Query = component.solicitud290201Query || {};
    component.solicitud290201Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
  });

  it('should run #getEnvasadoenData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getEnvasadoenData = jest.fn().mockReturnValue(observableOf({}));
    component.envasadoenData = component.envasadoenData || {};
    component.envasadoenData.catalogos = 'catalogos';
    component.getEnvasadoenData();
     expect(component.registrarsolicitud.getEnvasadoenData).toHaveBeenCalled();
  });

  it('should run #getUtilicoCafeComoData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getUtilicoCafeComoData = jest.fn().mockReturnValue(observableOf({}));
    component.utilizoCafeComoData = component.utilizoCafeComoData || {};
    component.utilizoCafeComoData.catalogos = 'catalogos';
    component.getUtilicoCafeComoData();
     expect(component.registrarsolicitud.getUtilicoCafeComoData).toHaveBeenCalled();
  });

  it('should run #getPaisDeImportacionData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getPaisDeImportacionData = jest.fn().mockReturnValue(observableOf({}));
    component.paisdeimportacionData = component.paisdeimportacionData || {};
    component.paisdeimportacionData.catalogos = 'catalogos';
    component.getPaisDeImportacionData();
     expect(component.registrarsolicitud.getPaisDeImportacionData).toHaveBeenCalled();
  });

  it('should run #getFraccionArancelariaData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getFraccionArancelariaData = jest.fn().mockReturnValue(observableOf({}));
    component.fraccionarancelariaData = component.fraccionarancelariaData || {};
    component.fraccionarancelariaData.catalogos = 'catalogos';
    component.getFraccionArancelariaData();
     expect(component.registrarsolicitud.getFraccionArancelariaData).toHaveBeenCalled();
  });

  it('should run #getUnidadDeMedidaData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getUnidadDeMedidaData = jest.fn().mockReturnValue(observableOf({}));
    component.unidaddemedidaData = component.unidaddemedidaData || {};
    component.unidaddemedidaData.catalogos = 'catalogos';
    component.getUnidadDeMedidaData();
     expect(component.registrarsolicitud.getUnidadDeMedidaData).toHaveBeenCalled();
  });

  it('should run #getDollarData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getDollarData = jest.fn().mockReturnValue(observableOf({}));
    component.dolarData = component.dolarData || {};
    component.dolarData.catalogos = 'catalogos';
    component.getDollarData();
     expect(component.registrarsolicitud.getDollarData).toHaveBeenCalled();
  });

  it('should run #getElcafeData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getUtilicoCafeComoData = jest.fn().mockReturnValue(observableOf({}));
    component.elcafeData = component.elcafeData || {};
    component.elcafeData.catalogos = 'catalogos';
    component.getElcafeData();
     expect(component.registrarsolicitud.getUtilicoCafeComoData).toHaveBeenCalled();
  });

  it('should run #getPaisDeTransbordoData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getPaisDeImportacionData = jest.fn().mockReturnValue(observableOf({}));
    component.paisdetransbordoData = component.paisdetransbordoData || {};
    component.paisdetransbordoData.catalogos = 'catalogos';
    component.getPaisDeTransbordoData();
     expect(component.registrarsolicitud.getPaisDeImportacionData).toHaveBeenCalled();
  });

  it('should run #getMediaDeTransporte()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getMediaDeTransporte = jest.fn().mockReturnValue(observableOf({}));
    component.mediodetransporteData = component.mediodetransporteData || {};
    component.mediodetransporteData.catalogos = 'catalogos';
    component.getMediaDeTransporte();
     expect(component.registrarsolicitud.getMediaDeTransporte).toHaveBeenCalled();
  });

  it('should run #onSubmit()', async () => {
    // Mock the form value
    component.dataCafeForm = {
      value: {
        envasadoen: { id: 1 },
        utilizoCafeComo: { id: 2 },
        paisdeimportacion: { id: 3 },
        fraccionarancelaria: { id: 4 },
        unidaddemedida: { id: 5 },
        dolar: { id: 6 },
        elcafe: { id: 7 },
        paisdetransbordo: { id: 8 },
        mediodetransporte: { id: 9 },
      },
      reset: jest.fn(),
    } as any;
  
    // Mock the catalog data
    component.envasadoenData = {
      catalogos: [
        { id: 1, descripcion: 'Mock Envasadoen' },
      ],
    };
    component.utilizoCafeComoData = {
      catalogos: [
        { id: 2, descripcion: 'Mock UtilizoCafeComo' },
      ],
    };
    component.paisdeimportacionData = {
      catalogos: [
        { id: 3, descripcion: 'Mock PaisDeImportacion' },
      ],
    };
    component.fraccionarancelariaData = {
      catalogos: [
        { id: 4, descripcion: 'Mock FraccionArancelaria' },
      ],
    };
    component.unidaddemedidaData = {
      catalogos: [
        { id: 5, descripcion: 'Mock UnidadDeMedida' },
      ],
    };
    component.dolarData = {
      catalogos: [
        { id: 6, descripcion: 'Mock Dolar' },
      ],
    };
    component.elcafeData = {
      catalogos: [
        { id: 7, descripcion: 'Mock ElCafe' },
      ],
    };
    component.paisdetransbordoData = {
      catalogos: [
        { id: 8, descripcion: 'Mock PaisDeTransbordo' },
      ],
    };
    component.mediodetransporteData = {
      catalogos: [
        { id: 9, descripcion: 'Mock MedioDeTransporte' },
      ],
    };
  
    // Mock the tableData array
    component.tableData = [];
    jest.spyOn(component.tableData, 'push');
  
    // Call the method
    component.onSubmit();
  
    // Verify the tableData.push was called
    expect(component.tableData.push).toHaveBeenCalledWith({
      envasadoen: { id: 1, descripcion: 'Mock Envasadoen' },
      utilizoCafeComo: { id: 2, descripcion: 'Mock UtilizoCafeComo' },
      paisdeimportacion: { id: 3, descripcion: 'Mock PaisDeImportacion' },
      fraccionarancelaria: { id: 4, descripcion: 'Mock FraccionArancelaria' },
      unidaddemedida: { id: 5, descripcion: 'Mock UnidadDeMedida' },
      dolar: { id: 6, descripcion: 'Mock Dolar' },
      elcafe: { id: 7, descripcion: 'Mock ElCafe' },
      paisdetransbordo: { id: 8, descripcion: 'Mock PaisDeTransbordo' },
      mediodetransporte: { id: 9, descripcion: 'Mock MedioDeTransporte' },
    });
  
    // Verify the form was reset
    expect(component.dataCafeForm.reset).toHaveBeenCalled();
  });

  it('should run #onAgregar()', async () => {
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.valid = 'valid';
    component.onAgregar();

  });

  it('should run #onRowClick()', async () => {
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.patchValue = jest.fn();
    component.envasadoenData = component.envasadoenData || {};
    component.envasadoenData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.utilizoCafeComoData = component.utilizoCafeComoData || {};
    component.utilizoCafeComoData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.paisdeimportacionData = component.paisdeimportacionData || {};
    component.paisdeimportacionData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.fraccionarancelariaData = component.fraccionarancelariaData || {};
    component.fraccionarancelariaData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.unidaddemedidaData = component.unidaddemedidaData || {};
    component.unidaddemedidaData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.dolarData = component.dolarData || {};
    component.dolarData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.elcafeData = component.elcafeData || {};
    component.elcafeData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.paisdetransbordoData = component.paisdetransbordoData || {};
    component.paisdetransbordoData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.mediodetransporteData = component.mediodetransporteData || {};
    component.mediodetransporteData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.onRowClick({
      datosDelTramiteRealizar: {
        envasadoen: {},
        utilizoCafeComo: {},
        paisdeimportacion: {},
        fraccionarancelaria: {},
        unidaddemedida: {},
        dolar: {},
        elcafe: {},
        paisdetransbordo: {},
        mediodetransporte: {}
      }
    });
    expect(component.dataCafeForm.patchValue).toHaveBeenCalled();
  });

  it('should run #onCheckboxClick()', async () => {
    // Mock the selectedRows object
    component.selectedRows = new Set(); // Use a Set to simulate the selectedRows behavior
    jest.spyOn(component.selectedRows, 'has');
    jest.spyOn(component.selectedRows, 'delete');
    jest.spyOn(component.selectedRows, 'add');
  
    // Call the method with a mock event and row
    const mockEvent = { stopPropagation: jest.fn() }; // Mock the event
    const mockRow = { id: 1 }; // Mock a row object
  
    component.onCheckboxClick(mockEvent, mockRow);
  
    // Verify the expected behavior
    expect(mockEvent.stopPropagation).toHaveBeenCalled(); // Ensure stopPropagation was called
    expect(component.selectedRows.has).toHaveBeenCalledWith(mockRow); // Ensure has was called with the row
    expect(component.selectedRows.add).toHaveBeenCalledWith(mockRow); // Ensure add was called if the row was not already selected
  });

  it('should run #onDeleteSelectedRows()', async () => {
    component.tableData = component.tableData || {};
    component.tableData = ['tableData'];
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.has = jest.fn();
    component.selectedRows.clear = jest.fn();
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.reset = jest.fn();
    component.onDeleteSelectedRows();
    expect(component.selectedRows.has).toHaveBeenCalled();
    expect(component.selectedRows.clear).toHaveBeenCalled();
    expect(component.dataCafeForm.reset).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud290201Store = TestBed.inject(Solicitud290201Store); // Use the mock store
  
    // Mock the dynamic method
    const mockMethod = jest.fn();
    component.solicitud290201Store['metodoNombre'] = mockMethod;
  
    // Call the method
    component.setValoresStore(
      {
        get: function () {
          return {
            value: 'mockValue',
          };
        },
      } as any, // Mocked FormGroup
      'campo',
      'metodoNombre' as keyof Solicitud290201Store
    );
  
    // Verify the dynamic method was called with the correct value
    expect(mockMethod).toHaveBeenCalledWith('mockValue');
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});