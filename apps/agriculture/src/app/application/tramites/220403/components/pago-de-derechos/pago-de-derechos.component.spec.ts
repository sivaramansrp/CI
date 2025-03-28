import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
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

describe('PagoDeDerechosComponent', () => {
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let component: PagoDeDerechosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [PagoDeDerechosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store }
      ]
    })
    .overrideComponent(PagoDeDerechosComponent, {})
    .compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Override ngOnDestroy to avoid side effects
    (component as any).ngOnDestroy = () => {};
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run #crearFormulario()', () => {
    // Use the injected FormBuilder and spy on its "group" method.
    const fb = TestBed.inject(FormBuilder);
    jest.spyOn(fb, 'group').mockReturnValue({} as any);
    // Set the private "fb" property via casting.
    (component as any).fb = fb;
    component.crearFormulario();
    expect(fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', () => {
    // Assume configuracion is an array (adjust based on the component’s actual type).
    (component as any).configuracion = [{ key: 'configuracion' }];
    // Spy on the method that initializes the form group.
    component.inicializarFormGroup = jest.fn();
    // Override the private "tramite220403Query" with a mock that provides the observable.
    (component as any).tramite220403Query = {
      setPagoDerechos$: observableOf({})
    };
    // Provide a mock formulario with a get() method.
    (component as any).formulario = {
      get: jest.fn().mockReturnValue({ patchValue: jest.fn() })
    };
    component.ngOnInit();
    expect(component.inicializarFormGroup).toHaveBeenCalled();
    expect((component as any).formulario.get).toHaveBeenCalled();
  });

  it('should run #obtenerValoresCatalogo()', () => {
    // Override the private "catalogosServicios" property.
    (component as any).catalogosServicios = {
      getCatalogo: jest.fn().mockReturnValue(observableOf([]))
    };
    // Assume configuracion is an array of objects with an "indiceGrupo" property.
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
    // Provide proper types for the parameters.
    const mockNumero: number = 1; // first parameter must be a number
    const mockParam1: number = 123;// adjust to the correct type
    const mockParam2: string = 'test-param'; // adjust as needed

    component.obtenerValoresCatalogo(mockNumero, mockParam1, mockParam2);
    expect((component as any).catalogosServicios.getCatalogo).toHaveBeenCalled();
  });

  it('should run #fechaCambiado()', () => {
    // Call the method with a simple object (adjust if the method expects a specific type).
    component.fechaCambiado('2025-03-21'); // Example date string
  });

  it('should run #ngOnDestroy()', () => {
    // Override the private "destroyNotifier$" property.
    (component as any).destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn()
    };
    component.ngOnDestroy();
    expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
    expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
  });
});
