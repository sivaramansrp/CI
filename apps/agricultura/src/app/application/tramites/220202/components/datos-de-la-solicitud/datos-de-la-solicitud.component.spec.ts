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
import { Router, ActivatedRoute } from '@angular/router';
import { FitosanitarioStore } from '../../estados/fitosanitario.store';

@Injectable()
class MockAgriculturaApiService {
  getAllDatosForma = function() {
    return observableOf({
      datos: {},
      tablaDatos: {}
    });
  };
}

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockFitosanitarioStore {}

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
      imports: [ FormsModule, ReactiveFormsModule, DatosDeLaSolicitudComponent, ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AgriculturaApiService, useClass: MockAgriculturaApiService },
        ConsultaioQuery,
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        },
        { provide: FitosanitarioStore, useClass: MockFitosanitarioStore }
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.forma = component.forma || {};
    component.forma.valueChanges = observableOf({});
    // Mock the 'valid' property using Object.defineProperty
    Object.defineProperty(component.forma, 'valid', { get: () => 'valid', configurable: true });
    component.agriculturaApiService = component.agriculturaApiService || {};
    component.agriculturaApiService.actualizarFormaValida = jest.fn();
    component.obtenerTodosLosDatosDeLaLista = jest.fn();
    component.createFromFields = jest.fn();
    component.ngOnInit();
    expect(component.agriculturaApiService.actualizarFormaValida).toHaveBeenCalled();
    expect(component.obtenerTodosLosDatosDeLaLista).toHaveBeenCalled();
    expect(component.createFromFields).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario() when form is read-only', async () => {
    // Spy on the instance methods instead of prototype
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const createFromFieldsSpy = jest.spyOn(component, 'createFromFields');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(guardarSpy).toHaveBeenCalled();
    expect(createFromFieldsSpy).not.toHaveBeenCalled();
    guardarSpy.mockRestore();
    createFromFieldsSpy.mockRestore();
  });

  it('should run #inicializarEstadoFormulario() when form is not read-only', async () => {
    // Spy on the instance methods instead of prototype
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const createFromFieldsSpy = jest.spyOn(component, 'createFromFields');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(guardarSpy).not.toHaveBeenCalled();
    expect(createFromFieldsSpy).toHaveBeenCalled();
    guardarSpy.mockRestore();
    createFromFieldsSpy.mockRestore();
  });

  it('should run #guardarDatosFormulario() when form is not read-only', async () => {
    // Use a real FormGroup and spy on its methods
    const fb = TestBed.inject(FormBuilder);
    component.forma = fb.group({ test: [''] });
    component.esFormularioSoloLectura = false;
    const disableSpy = jest.spyOn(component.forma, 'disable');
    const enableSpy = jest.spyOn(component.forma, 'enable');
    component.guardarDatosFormulario();
    expect(disableSpy).not.toHaveBeenCalled();
    expect(enableSpy).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario() when form is read-only', async () => {
    // Use a real FormGroup and spy on its methods
    const fb = TestBed.inject(FormBuilder);
    component.forma = fb.group({ test: [''] });
    component.esFormularioSoloLectura = true;
    const disableSpy = jest.spyOn(component.forma, 'disable');
    const enableSpy = jest.spyOn(component.forma, 'enable');
    component.guardarDatosFormulario();
    expect(disableSpy).toHaveBeenCalled();
    expect(enableSpy).not.toHaveBeenCalled();
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
    component.inicializarCamposFormulario();
    expect(component.crearCamposRequeridos).toHaveBeenCalled();
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

  it('should run #agregarMercancia()', async () => {
    component.seleccionTabla = jest.fn();
    // Use a real FormGroup with the expected structure
    const fb = TestBed.inject(FormBuilder);
    component.forma = fb.group({ tipoMercancia: ['yes'] });
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.activatedROute = { snapshot: {} }; // Mock activatedRoute
    component.agregarMercancia();
    expect(component.seleccionTabla).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should not navigate in agregarMercancia if tipoMercancia is not yes/no', async () => {
    const fb = TestBed.inject(FormBuilder);
    component.forma = fb.group({ tipoMercancia: ['other'] });
    component.router = { navigate: jest.fn() } as any;
    component.activatedROute = {} as any;
    const navigateSpy = jest.spyOn(component.router, 'navigate');
    component.seleccionTabla = jest.fn();
    component.agregarMercancia();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should run #seleccionTabla()', async () => {
    component.fitosanitarioStore = component.fitosanitarioStore || {};
    component.fitosanitarioStore.update = jest.fn().mockReturnValue([
      null
    ]);
    component.seleccionTabla({});
    expect(component.fitosanitarioStore.update).toHaveBeenCalled();
  });

  it('should run #modificarMercancia()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.modificarMercancia();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #radioBotonSeleccionado()', async () => {
    component.forma = component.forma || {};
    component.forma.value = {
      tipoMercancia: {}
    };
    component.setValoresStore = jest.fn();
    component.radioBotonSeleccionado();
    expect(component.setValoresStore).toHaveBeenCalled();
  });

  it('should set notificationCheck false in radioBotonSeleccionado for empty tipoMercancia', async () => {
    component.forma = { value: { tipoMercancia: '' } };
    component.setValoresStore = jest.fn();
    component.radioBotonSeleccionado();
    expect(component.notificationCheck).toBe(false);
    expect(component.setValoresStore).toHaveBeenCalled();
  });

  it('should set notificationCheck false in radioBotonSeleccionado for null tipoMercancia', async () => {
    component.forma = { value: { tipoMercancia: null } };
    component.setValoresStore = jest.fn();
    component.radioBotonSeleccionado();
    expect(component.notificationCheck).toBe(false);
    expect(component.setValoresStore).toHaveBeenCalled();
  });

  it('should set notificationCheck false in radioBotonSeleccionado for undefined tipoMercancia', async () => {
    component.forma = { value: { tipoMercancia: undefined } };
    component.setValoresStore = jest.fn();
    component.radioBotonSeleccionado();
    expect(component.notificationCheck).toBe(false);
    expect(component.setValoresStore).toHaveBeenCalled();
  });


  it('should return early in eliminarMercancia if tablaDatos is empty', async () => {
    component.fitosanitarioStore = {
      getValue: () => ({ tablaDatos: [], selectedDatos: [] }),
      update: jest.fn()
    } as any;
    component.eliminarMercancia();
    expect(component.fitosanitarioStore.update).not.toHaveBeenCalled();
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