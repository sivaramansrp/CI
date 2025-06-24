// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockAgriculturaApiService {
  getAllDatosForma = function() {
    return observableOf({
      datos: {},
      tablaDatos: {}
    });
  };
}

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

describe('DatosDeLaSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DatosDeLaSolicitudComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AgriculturaApiService, useClass: MockAgriculturaApiService },
        ConsultaioQuery
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.forma = {
      valueChanges: observableOf({}),
      get valid() { return true; }
    };
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.actualizarFormaValida = jest.fn();
    component.obtenerTodosLosDatosDeLaLista = jest.fn();
    component.createFromFields = jest.fn();
    component.ngOnInit();
    expect(component.agriculturaApiService.actualizarFormaValida).toHaveBeenCalled();
    expect(component.obtenerTodosLosDatosDeLaLista).toHaveBeenCalled();
    expect(component.createFromFields).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.createFromFields = jest.fn();
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #createFromFields()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarCamposFormulario = jest.fn();
    component.createFromFields();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.inicializarCamposFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarCamposFormulario()', async () => {
    component.crearCamposRequeridos = jest.fn();
    component.crearCamposOpcionales = jest.fn();
    component.inicializarCamposFormulario();
    expect(component.crearCamposRequeridos).toHaveBeenCalled();
    expect(component.crearCamposOpcionales).toHaveBeenCalled();
  });

  it('should run #crearCamposRequeridos()', async () => {
    component.formulariodataStore = component.formulariodataStore || {};
    component.formulariodataStore.aduanaDeIngreso = 'aduanaDeIngreso';
    component.formulariodataStore.oficinaDeInspeccion = 'oficinaDeInspeccion';
    component.formulariodataStore.puntoDeInspeccion = 'puntoDeInspeccion';
    component.formulariodataStore.regimen = 'regimen';
    component.formulariodataStore.numeroDeGuia = 'numeroDeGuia';
    component.formulariodataStore.numeroDeCarro = 'numeroDeCarro';
    component.crearCamposRequeridos();

  });

  it('should run #crearCamposOpcionales()', async () => {
    component.formulariodataStore = component.formulariodataStore || {};
    component.formulariodataStore.numeroDeGuia = 'numeroDeGuia';
    component.formulariodataStore.requisito = 'requisito';
    component.formulariodataStore.numeroCertificadoInternacional = 'numeroCertificadoInternacional';
    component.formulariodataStore.descripcionFraccion = 'descripcionFraccion';
    component.formulariodataStore.descripcionNico = 'descripcionNico';
    component.formulariodataStore.descripcion = 'descripcion';
    component.crearCamposOpcionales();

  });

  it('should run #obtenerTodosLosDatosDeLaLista()', async () => {
    component.getaduanaLista = jest.fn();
    component.getagropecuariaLista = jest.fn();
    component.getPuntoLista = jest.fn();
    component.getRegimenLista = jest.fn();
    component.getArancelariaLista = jest.fn();
    component.getNicoLista = jest.fn();
    component.getProductoLista = jest.fn();
    component.getUmCLista = jest.fn();
    component.getusoLista = jest.fn();
    component.obtenerTodosLosDatosDeLaLista();
    expect(component.getaduanaLista).toHaveBeenCalled();
    expect(component.getagropecuariaLista).toHaveBeenCalled();
    expect(component.getPuntoLista).toHaveBeenCalled();
    expect(component.getRegimenLista).toHaveBeenCalled();
    expect(component.getArancelariaLista).toHaveBeenCalled();
    expect(component.getNicoLista).toHaveBeenCalled();
    expect(component.getProductoLista).toHaveBeenCalled();
    expect(component.getUmCLista).toHaveBeenCalled();
    expect(component.getusoLista).toHaveBeenCalled();
  });

  it('should run #mostrar_colapsable()', async () => {

    component.mostrar_colapsable();

  });

  it('should run #getaduanaLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getaduanaLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getagropecuariaLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getagropecuariaLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getPuntoLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getPuntoLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getRegimenLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getRegimenLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getArancelariaLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getArancelariaLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getNicoLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getNicoLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getUmCLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getUmCLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getusoLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getusoLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #getProductoLista()', async () => {
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.getProductoLista();
    expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.forma = component.forma || {};
    component.forma.value = 'value';
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.updateDatosForma = jest.fn();
    component.setValoresStore({}, {});
    expect(component.agriculturaApiService.updateDatosForma).toHaveBeenCalled();
  });

  it('should run #seleccionFila()', async () => {
    component.forma = component.forma || {};
    component.forma.patchValue = jest.fn();
    component.seleccionFila({});
    expect(component.forma.patchValue).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should patch the form with correct values when seleccionFila is called with an event', async () => {
    component.forma = {
      patchValue: jest.fn()
    };
    const mockEvent = { some: 'data' }; // event is only checked for truthiness
    component.seleccionFila(mockEvent as any);
    expect(component.forma.patchValue).toHaveBeenCalledWith({
      aduanaDeIngreso: "1",
      oficinaDeInspeccion: "1",
      puntoDeInspeccion: "1",
      numeroDeGuia: "GUIA123456",
      regimen: "1",
      numeroDeCarro: "CARRO7890",
      requisito: "Certificado Zoosanitario",
      numeroCertificadoInternacional: "CERTINTL2024",
      descripcionFraccion: "Caballos de raza pura",
      descripcionNico: "Caballos para carreras",
      descripcion: "Importación de caballos de carreras"
    });
  });

  it('should not patch the form if seleccionFila is called with a falsy event', async () => {
    component.forma = {
      patchValue: jest.fn()
    };
    component.seleccionFila(undefined as any);
    expect(component.forma.patchValue).not.toHaveBeenCalled();
  });

  it('should return an object combining required and optional fields from crearCamposRequeridos and crearCamposOpcionales', async () => {
    // Arrange: mock the required and optional fields
    const requiredFields = { field1: 'required1', field2: 'required2' };
    const optionalFields = { field3: 'optional1', field4: 'optional2' };
    component.crearCamposRequeridos = jest.fn().mockReturnValue(requiredFields);
    component.crearCamposOpcionales = jest.fn().mockReturnValue(optionalFields);

    // Act
    const result = component.inicializarCamposFormulario();

    // Assert
    expect(component.crearCamposRequeridos).toHaveBeenCalled();
    expect(component.crearCamposOpcionales).toHaveBeenCalled();
    expect(result).toEqual({
      field1: 'required1',
      field2: 'required2',
      field3: 'optional1',
      field4: 'optional2'
    });
  });

  it('should disable the form when esFormularioSoloLectura is true in guardarDatosFormulario', async () => {
    component.forma = {
      disable: jest.fn(),
      enable: jest.fn()
    };
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.forma.disable).toHaveBeenCalled();
    expect(component.forma.enable).not.toHaveBeenCalled();
  });

  it('should enable the form when esFormularioSoloLectura is false in guardarDatosFormulario', async () => {
    component.forma = {
      disable: jest.fn(),
      enable: jest.fn()
    };
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.forma.enable).toHaveBeenCalled();
    expect(component.forma.disable).not.toHaveBeenCalled();
  });

  it('should return correct optional fields with values from formulariodataStore and respect esFormularioSoloLectura', () => {
    // Arrange
    component.formulariodataStore = {
      numeroDeGuia: 'guia123',
      requisito: 'req456',
      numeroCertificadoInternacional: 'cert789',
      descripcionFraccion: 'descFrac',
      descripcionNico: 'descNico',
      descripcion: 'desc'
    };
    component.esFormularioSoloLectura = true;

    // Act
    const result = component.crearCamposOpcionales();

    // Assert
    expect(result).toEqual({
      numeroDeGuia: [{ value: 'guia123', disabled: true }],
      requisito: [{ value: 'req456', disabled: true }],
      numeroCertificadoInternacional: [{ value: 'cert789', disabled: true }],
      descripcionFraccion: [{ value: 'descFrac', disabled: true }],
      descripcionNico: [{ value: 'descNico', disabled: true }],
      descripcion: [{ value: 'desc', disabled: true }]
    });
  });

  it('should return optional fields with empty string if formulariodataStore properties are undefined', () => {
    // Arrange
    component.formulariodataStore = {};
    component.esFormularioSoloLectura = false;

    // Act
    const result = component.crearCamposOpcionales();

    // Assert
    expect(result).toEqual({
      numeroDeGuia: [{ value: '', disabled: false }],
      requisito: [{ value: '', disabled: false }],
      numeroCertificadoInternacional: [{ value: '', disabled: false }],
      descripcionFraccion: [{ value: '', disabled: false }],
      descripcionNico: [{ value: '', disabled: false }],
      descripcion: [{ value: '', disabled: false }]
    });
  });

  it('should call agriculturaApiService.updateDatosForma with the form value in setValoresStore', () => {
    // Arrange
    const mockFormValue = { some: 'value' };
    component.forma = { value: mockFormValue } as any;
    component.agriculturaApiService = {
      updateDatosForma: jest.fn()
    } as any;

    // Act
    component.setValoresStore();

    // Assert
    expect(component.agriculturaApiService.updateDatosForma).toHaveBeenCalledWith(mockFormValue);
  });

  it('should call destroyNotifier$.next and destroyNotifier$.complete when ngOnDestroy is called', () => {
    component.destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn()
    } as any;

    component.ngOnDestroy();

    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should toggle colapsable property when mostrar_colapsable is called', () => {
    component.colapsable = false;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });

it('should fetch aduana list and assign it to aduanaList in getaduanaLista', async () => {
  // Arrange
  const mockAduanaList = [{ id: 1, nombre: 'Aduana 1' }, { id: 2, nombre: 'Aduana 2' }];
  const mockObservable = {
    pipe: jest.fn().mockReturnThis(),
    subscribe: jest.fn((cb) => cb(mockAduanaList))
  };
  component.agriculturaApiService = {
    obtenerSelectorList: jest.fn().mockReturnValue(mockObservable)
  } as any;
  const { Subject } = require('rxjs');
  component.destroyNotifier$ = new Subject();

  // Act
  component.getaduanaLista();

  // Assert
  expect(component.agriculturaApiService.obtenerSelectorList).toHaveBeenCalledWith('aduana_de_ingreso.json');
  expect(mockObservable.pipe).toHaveBeenCalled();
  expect(component.aduanaList).toBe(mockAduanaList);
});

it('should call guardarDatosFormulario when esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
  component.esFormularioSoloLectura = true;
  component.guardarDatosFormulario = jest.fn();
  component.createFromFields = jest.fn();

  component.inicializarEstadoFormulario();

  expect(component.guardarDatosFormulario).toHaveBeenCalled();
  expect(component.createFromFields).not.toHaveBeenCalled();
});

it('should call createFromFields when esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
  component.esFormularioSoloLectura = false;
  component.guardarDatosFormulario = jest.fn();
  component.createFromFields = jest.fn();

  component.inicializarEstadoFormulario();

  expect(component.createFromFields).toHaveBeenCalled();
  expect(component.guardarDatosFormulario).not.toHaveBeenCalled();
});

it('should subscribe to valueChanges and react to form value changes', async () => {
  // Arrange
  const mockSetValue = jest.fn();
  const mockGet = jest.fn().mockReturnValue({ setValue: mockSetValue });
  const mockSubscribe = jest.fn();
  const mockValueChanges = {
    subscribe: mockSubscribe
  };
  component.forma = {
    valueChanges: mockValueChanges,
    get: mockGet
  } as any;

  // Act
  const callback = jest.fn();
  component.forma.valueChanges.subscribe(callback);

  // Simulate a value change
  const newValue = { exampleField: 'newValue' };
  mockSubscribe.mock.calls[0][0](newValue);

  // Assert
  expect(callback).toHaveBeenCalledWith(newValue);

  // Simulate setting a value
  component.forma.get('exampleField').setValue('newValue');
  expect(mockSetValue).toHaveBeenCalledWith('newValue');
});
});