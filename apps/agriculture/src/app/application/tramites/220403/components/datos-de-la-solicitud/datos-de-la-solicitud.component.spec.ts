import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { HttpClientModule } from '@angular/common/http';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';

@Injectable()
class MockExportaccionAcuicolaService {}

@Injectable()
class MockTramite220403Query {}

@Injectable()
class MockTramite220403Store {}

describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: DatosDeLaSolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [DatosDeLaSolicitudComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on #ngOnInit()', () => {
    component.inicializarFormGroup = jest.fn();
    
    (component as any).tramite220403Query = (component as any).tramite220403Query || {};
    (component as any).tramite220403Query.setDatosRealizar$ = observableOf({});
    (component as any).tramite220403Query.setCombinacionRequerida$ = observableOf({});
    
    (component as any).formulario = (component as any).formulario || {};
    (component as any).formulario.get = jest.fn().mockReturnValue({ patchValue: jest.fn() });

    component.ngOnInit();

    expect(component.inicializarFormGroup).toHaveBeenCalled();
    expect((component as any).formulario.get).toHaveBeenCalled();
});


  it('should create form on #crearFormulario()', () => {
    // Use the injected FormBuilder and spy on its "group" method.
    const fb = TestBed.inject(FormBuilder);
    jest.spyOn(fb, 'group').mockReturnValue({} as any);
    // Set the private "fb" property via casting.
    (component as any).fb = fb;
    component.crearFormulario();
    expect(fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerValoresCatalogo()', () => {
    // Override the private "catalogosServicios" property.
    (component as any).catalogosServicios = {
      getCatalogo: jest.fn().mockReturnValue(observableOf([]))
    };

    (component as any).configuracion = [{
      indiceGrupo: {
        menu: {
          indiceMenu: {
            props: {
              catalogos: {}
            }
          }
        }
      }
    }];

    const mockNumero: number = 1; // first parameter must be a number
    const mockParam1: number = 123;// adjust to the correct type
    const mockParam2: string = 'test-param'; // adjust as needed

    component.obtenerValoresCatalogo(mockNumero, mockParam1, mockParam2);
    expect((component as any).catalogosServicios.getCatalogo).toHaveBeenCalled();
  });

  it('should run #fechaCambiado() without errors', () => {
    component.fechaCambiado('2025-03-21'); // Pass a string instead of an empty object
  });

  it('should run #onSubmit()', () => {
    // Accessing private property using `as any`
    (component as any).tramite220403store = {
      setDatosRealizar: jest.fn()
    };

    (component as any).formulario = {
      value: {
        datosRealizar: {}
      }
    };

    component.onSubmit();

    expect((component as any).tramite220403store.setDatosRealizar).toHaveBeenCalled();
});


it('should run #ngOnDestroy()', () => {
  (component as any).destroyNotifier$ = {
    next: jest.fn(),
    complete: jest.fn()
  };

  component.ngOnDestroy();

  expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
  expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
});

});
