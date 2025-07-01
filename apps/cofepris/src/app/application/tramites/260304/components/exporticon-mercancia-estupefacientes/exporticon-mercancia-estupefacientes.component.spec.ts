// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ExporticonMercanciaEstupefacientesComponent } from './exporticon-mercancia-estupefacientes.component';
import { FormBuilder } from '@angular/forms';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';
import { Location } from '@angular/common';

@Injectable()
class MockDatosSolicitudService {
  obtenerRespuestaPorUrl = function() {};
}

@Injectable()
class MockTramite260304Query {}

@Injectable()
class MockTramite260304Store {}



describe('ExporticonMercanciaEstupefacientesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, ExporticonMercanciaEstupefacientesComponent, ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        { provide: Tramite260304Query, useClass: MockTramite260304Query },
        { provide: Tramite260304Store, useClass: MockTramite260304Store },
      ]
    }).overrideComponent(ExporticonMercanciaEstupefacientesComponent, {

      set: { providers: [{ provide: DatosSolicitudService, useClass: MockDatosSolicitudService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(ExporticonMercanciaEstupefacientesComponent);
    component = fixture.debugElement.componentInstance;
  });

 it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramite260304Query = component.tramite260304Query || {};
    component.tramite260304Query.selectTramiteState$ = observableOf({});
    component.crearMercanciaForm = jest.fn();
    component.ngOnInit();
  });

  it('should run #obtenerMensajeError()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      errors: {},
      value: {}
    });
    component.obtenerMensajeError({});
    expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

  it('should run #obtenerValor()', async () => {
    component.mercanciaFormState = component.mercanciaFormState || {};
    component.mercanciaFormState.field = 'field';
    component.obtenerValor({});

  });

  it('should run #esInvalido()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      dirty: {},
      touched: {},
      invalid: {}
    });
    component.esInvalido({});
    expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

  it('should run #crearMercanciaForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.obtenerValor = jest.fn();
    component.crearMercanciaForm();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.obtenerValor).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.isValid({
      controls: {
        campo: {
          errors: {},
          touched: {}
        }
      },
      errors: {},
      touched: {}
    }, {});
  });



  it('should run #isValid() with control errors and touched', async () => {
    const mockControl = {
      errors: { required: true },
      touched: true
    };
    const result = component.isValid(mockControl);
    expect(result).toBe(true);
  });



  it('should run #obtenerMensajeError() with required error', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      errors: { required: true },
      value: 'test'
    });
    const result = component.obtenerMensajeError('testField');
    expect(result).toBe('Este campo es obligatorio');
    expect(component.mercanciaForm.get).toHaveBeenCalledWith('testField');
  });




  it('should run #obtenerMensajeError() with no control', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue(null);
    const result = component.obtenerMensajeError('nonExistentField');
    expect(result).toBe('');
  });

  it('should run #obtenerMensajeError() with no errors', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      errors: null,
      value: '123.45'
    });
    const result = component.obtenerMensajeError('testField');
    expect(result).toBe('');
  });

  it('should run #formaFarmaceuticaSeleccionadasChange()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: jest.fn()
    });
    component.formaFarmaceuticaSeleccionadasChange(['test1', 'test2']);
    expect(component.seleccionadasFormaFormaceuticaDatos).toEqual(['test1', 'test2']);
    expect(component.mercanciaForm.get).toHaveBeenCalledWith('formaFarmaceutica');
  });

  it('should run #formaFarmaceuticaSeleccionadasChange() with empty array', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: jest.fn()
    });
    component.formaFarmaceuticaSeleccionadasChange([]);
    expect(component.seleccionadasFormaFormaceuticaDatos).toEqual([]);
    expect(component.mercanciaForm.get).not.toHaveBeenCalled();
  });

  it('should run #usoEspesificoSeleccionadasChange()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: jest.fn()
    });
    component.usoEspesificoSeleccionadasChange(['usage1', 'usage2']);
    expect(component.seleccionadasUsoEspesificoDatos).toEqual(['usage1', 'usage2']);
    expect(component.mercanciaForm.get).toHaveBeenCalledWith('usoEspecifico');
  });

  it('should run #usoEspesificoSeleccionadasChange() with empty array', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: jest.fn()
    });
    component.usoEspesificoSeleccionadasChange([]);
    expect(component.mercanciaForm.get).not.toHaveBeenCalled();
  });

  it('should run #mostrarColapsable()', async () => {
    component.formFormaceuticaColapsable = false;
    component.usoEspesificoColapsable = false;
    
    component.mostrarColapsable(1);
    expect(component.formFormaceuticaColapsable).toBe(true);
    
    component.mostrarColapsable(2);
    expect(component.usoEspesificoColapsable).toBe(true);
    
    component.mostrarColapsable(3);
    // Should not change any values for orden 3
    expect(component.formFormaceuticaColapsable).toBe(true);
    expect(component.usoEspesificoColapsable).toBe(true);
  });

  it('should run #agregarMercancia()', async () => {
    component.mercanciaSeleccionado = jest.fn();
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.value = 'value';
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.agregarMercancia();
    expect(component.mercanciaSeleccionado).toHaveBeenCalled();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #limpiarMercancia()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.reset = jest.fn();
    component.limpiarMercancia();
    expect(component.mercanciaForm.reset).toHaveBeenCalled();
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #mercanciaSeleccionado()', async () => {
    component.tramiteState = component.tramiteState || {};
    component.tramiteState.tablaMercanciasConfigDatos = {
      findIndex: function() {
        return [
          {
            "clasificacionProducto": {}
          }
        ];
      },
      splice: function() {}
    };
    component.tramite260304Store = component.tramite260304Store || {};
    component.tramite260304Store.update = jest.fn().mockReturnValue([
      null
    ]);
    component.mercanciaSeleccionado({
      clasificacionProducto: {},
      especificarClasificacionProducto: {},
      denominacionCumonInternacional: {},
      marcaComercialDenominacion: {},
      cantidadDeLotes: {},
      kgPorLote: {},
      numeroDePiezasAFabricar: {},
      descripcionNumeroDePiezas: {},
      formaFarmaceutica: {},
      estadoFisico: {},
      fraccionArancelaria: {},
      descripcionFraccion: {},
      unidadMedidaComercializacion: {},
      cantidadUMC: {},
      unidadMedidaTarifa: {},
      cantidadUMT: {},
      presentacion: {},
      numeroRegistroSanitario: {},
      paisOrigen: {},
      paisProcedencia: {},
      tipoProducto: {},
      usoEspecifico: {},
      numeroCAS: {},
      paisDeDestino: {}
    });
    expect(component.tramite260304Store.update).toHaveBeenCalled();
  });

  it('should run #eliminarDetalleMercancia()', async () => {
    component.detalleMercanciaDatos = [{ registroSanitario: 'test123', presentacion: 'test', cantidad: '10' }];
    component.tablaMercanciasLista = [{ registroSanitario: 'test123', denominacion: 'test' }];
    
    component.eliminarDetalleMercancia();
    expect(component.detalleMercanciaDatos).toEqual([]);
  });

  it('should run #eliminarDetalleMercancia() with multiple items', async () => {
    component.detalleMercanciaDatos = [
      { registroSanitario: 'test123', presentacion: 'test1', cantidad: '10' },
      { registroSanitario: 'test456', presentacion: 'test2', cantidad: '20' }
    ];
    component.tablaMercanciasLista = [{ registroSanitario: 'test123', denominacion: 'test' }];
    
    const mockSome = jest.fn().mockReturnValue(true);
    component.tablaMercanciasLista.some = mockSome;
    
    component.eliminarDetalleMercancia();
    expect(mockSome).toHaveBeenCalled();
  });

  it('should run #eliminarDetalleMercancia() with no matching items', async () => {
    component.detalleMercanciaDatos = [{ registroSanitario: 'test789', presentacion: 'test', cantidad: '10' }];
    component.tablaMercanciasLista = [{ registroSanitario: 'test123', denominacion: 'test' }];
    
    const mockSome = jest.fn().mockReturnValue(false);
    component.tablaMercanciasLista.some = mockSome;
    
    component.eliminarDetalleMercancia();
    expect(mockSome).toHaveBeenCalled();
  });

  it('should run #agregarDetalleMercancia()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockImplementation((field) => {
      const values = {
        'presentacion': { value: 'testPresentacion' },
        'cantidadUMC': { value: '100' },
        'numeroRegistroSanitario': { value: 'REG123' }
      };
      return values[field];
    });
    component.detalleMercanciaDatos = [];
    component.detalleMercanciaDatos.push = jest.fn();
    
    component.agregarDetalleMercancia();
    
    expect(component.mercanciaForm.get).toHaveBeenCalledWith('presentacion');
    expect(component.mercanciaForm.get).toHaveBeenCalledWith('cantidadUMC');
    expect(component.mercanciaForm.get).toHaveBeenCalledWith('numeroRegistroSanitario');
    expect(component.detalleMercanciaDatos.push).toHaveBeenCalledWith({
      presentacion: 'testPresentacion',
      cantidad: '100',
      registroSanitario: 'REG123'
    });
  });

  it('should run #agregarDetalleMercancia() with no values', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({ value: null });
    component.detalleMercanciaDatos = [];
    component.detalleMercanciaDatos.push = jest.fn();
    
    component.agregarDetalleMercancia();
    
    expect(component.detalleMercanciaDatos.push).not.toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });



  it('should test aduanasEntradaBotons functionality', async () => {
    component.crossList = {
      toArray: jest.fn().mockReturnValue([{
        agregar: jest.fn(),
        quitar: jest.fn()
      }])
    };
    
    // Test all button functions
    component.aduanasEntradaBotons[0].funcion(); // Agregar todos
    component.aduanasEntradaBotons[1].funcion(); // Agregar selección
    component.aduanasEntradaBotons[2].funcion(); // Restar selección
    component.aduanasEntradaBotons[3].funcion(); // Restar todos
    
    const crossListInstance = component.crossList.toArray()[0];
    expect(crossListInstance.agregar).toHaveBeenCalledWith('t');
    expect(crossListInstance.agregar).toHaveBeenCalledWith('');
    expect(crossListInstance.quitar).toHaveBeenCalledWith('');
    expect(crossListInstance.quitar).toHaveBeenCalledWith('t');
  });

  it('should run #obtenerValor() with detalleMercanciaDatosSeleccionados', async () => {
    component.detalleMercanciaDatosSeleccionados = {
      clasificacionProducto: 'testValue'
    };
    component.mercanciaFormState = {};
    
    const result = component.obtenerValor('clasificacionProducto');
    expect(result).toBe('testValue');
  });

  it('should run #obtenerValor() with mercanciaFormState fallback', async () => {
    component.detalleMercanciaDatosSeleccionados = null;
    component.mercanciaFormState = {
      clasificacionProducto: 'fallbackValue'
    };
    
    const result = component.obtenerValor('clasificacionProducto');
    expect(result).toBe('fallbackValue');
  });

  it('should run #obtenerValor() with undefined values', async () => {
    component.detalleMercanciaDatosSeleccionados = null;
    component.mercanciaFormState = {};
    
    const result = component.obtenerValor('nonExistentField');
    expect(result).toBeUndefined();
  });

  it('should run #esInvalido() with no control', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue(null);
    
    const result = component.esInvalido('nonExistentControl');
    expect(result).toBe(false);
  });

  it('should run #esInvalido() with valid control', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      invalid: false,
      touched: true,
      dirty: false
    });
    
    const result = component.esInvalido('validControl');
    expect(result).toBe(false);
  });

  it('should run #esInvalido() with invalid and dirty control', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      invalid: true,
      touched: false,
      dirty: true
    });
    
    const result = component.esInvalido('invalidControl');
    expect(result).toBe(true);
  });

  it('should run #mercanciaSeleccionado() with existing index', async () => {
    component.tramiteState = {
      tablaMercanciasConfigDatos: [
        { clasificacionProducto: 'existing' }
      ]
    };
    component.tramite260304Store = {
      update: jest.fn()
    };
    
    const mockEvent = {
      clasificacionProducto: 'existing',
      especificarClasificacionProducto: 'test',
      denominacionCumonInternacional: 'test',
      marcaComercialDenominacion: 'test',
      cantidadDeLotes: 1,
      kgPorLote: 1,
      numeroDePiezasAFabricar: 1,
      descripcionNumeroDePiezas: 'test',
      formaFarmaceutica: 'test',
      estadoFisico: 'test',
      fraccionArancelaria: 'test',
      descripcionFraccion: 'test',
      unidadMedidaComercializacion: 'test',
      cantidadUMC: 1,
      unidadMedidaTarifa: 'test',
      cantidadUMT: 1,
      presentacion: 'test',
      numeroRegistroSanitario: 'test',
      paisOrigen: 'test',
      paisProcedencia: 'test',
      tipoProducto: 'test',
      usoEspecifico: 'test',
      numeroCAS: 'test',
      paisDeDestino: 'test'
    };
    
    component.mercanciaSeleccionado(mockEvent);
    expect(component.tramite260304Store.update).toHaveBeenCalled();
  });

  it('should test ngOnInit with existing seleccionadoTablaMercanciasDatos', async () => {
    component.tramite260304Query = {
      selectTramiteState$: observableOf({
        mercanciaForm: {},
        tablaMercanciasConfigDatos: [{ test: 'data' }],
        seleccionadoTablaMercanciasDatos: [{ test: 'selected' }]
      })
    };
    component.crearMercanciaForm = jest.fn();
    
    component.ngOnInit();
    
    expect(component.crearMercanciaForm).toHaveBeenCalled();
    expect(component.detalleMercanciaDatosSeleccionados).toEqual({ test: 'selected' });
  });

  it('should test ngOnInit without seleccionadoTablaMercanciasDatos', async () => {
    component.tramite260304Query = {
      selectTramiteState$: observableOf({
        mercanciaForm: {},
        tablaMercanciasConfigDatos: [],
        seleccionadoTablaMercanciasDatos: []
      })
    };
    component.crearMercanciaForm = jest.fn();
    
    component.ngOnInit();
    
    expect(component.crearMercanciaForm).toHaveBeenCalled();
    expect(component.detalleMercanciaDatosSeleccionados).toBeUndefined();
  });
});