// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ChoferesComponent } from './choferes.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Chofer40103Query } from '../../estados/chofer40103.query';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockChofer40103Store {
  setEstado = jest.fn();
}

@Injectable()
class MockChofer40103Service {}

@Injectable()
class MockChofer40103Query {
  getChoferes$ = observableOf([]);
  getchoferesextranjero$ = observableOf([]);
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

describe('ChoferesComponent', () => {
  let fixture: ComponentFixture<ChoferesComponent>;
  let component: ChoferesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ToastrModule.forRoot(), ChoferesComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: Chofer40103Store, useClass: MockChofer40103Store },
        { provide: Chofer40103Service, useClass: MockChofer40103Service },
        { provide: Chofer40103Query, useClass: MockChofer40103Query },
        ChangeDetectorRef
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ChoferesComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function() {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el getter `f` funcione correctamente.
   */
  it('should run GetterDeclaration #f', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.controls = 'controls';
    const f = component.f;
  });

  /**
   * Verifica que el método `setActiveTab` funcione correctamente.
   */
  it('should run #setActiveTab()', async () => {
    component.setActiveTab({});
  });

  /**
   * Verifica que el método `chofernacionalForm` funcione correctamente.
   */
  it('should run #chofernacionalForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.chofernacionalForm();
  });

  /**
   * Verifica que el método `ngOnInit` funcione correctamente.
   */
  it('should run #ngOnInit()', async () => {
    component.chofer40103Query = component.chofer40103Query || new MockChofer40103Query();
    component.choferesList$ = component.chofer40103Query.getChoferes$;
    component.choferesextranjerosList$ = component.chofer40103Query.getchoferesextranjero$;
    component.chofernacionalForm = jest.fn();
    component.loadStoredData = jest.fn();
    component.fetchChoferes = jest.fn();
    component.chofer40103Store = component.chofer40103Store || {};
    component.chofer40103Store._select = jest.fn().mockReturnValue([
      {
        "estado": {}
      }
    ]);
 
  });

  /**
   * Verifica que el método `abrirModal` funcione correctamente.
   */
  it('should run #abrirModal()', async () => {
    component.abrirModal();
  });

  /**
   * Verifica que el método `cerrarModal` funcione correctamente.
   */
  it('should run #cerrarModal()', async () => {
    component.modalRef = component.modalRef || {};
    component.modalRef.nativeElement = {
      classList: {
        remove: function() {}
      },
      style: {
        display: {}
      }
    };
    component.cerrarModal();
  });

  /**
   * Verifica que el método `extranjeroGuardar` funcione correctamente.
   */
  it('should run #extranjeroGuardar()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.invalid = 'invalid';
    component.formChoferes.getRawValue = jest.fn();
    component.formChoferes.reset = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.chofer40103Service = component.chofer40103Service || {};
    component.chofer40103Service.addChofer = jest.fn();
    component.cerrarModal = jest.fn();
    component.chofer40103Query = component.chofer40103Query || {};
    component.chofer40103Query.getchoferesextranjero$ = 'getchoferesextranjero$';
    component.extranjeroGuardar();

  });

  /**
   * Verifica que el método `Guardar` funcione correctamente.
   */
  it('should run #Guardar()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.invalid = 'invalid';
    component.formChoferes.getRawValue = jest.fn();
    component.formChoferes.reset = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.chofer40103Service = component.chofer40103Service || {};
    component.chofer40103Service.addChofer = jest.fn();
    component.cerrarModal = jest.fn();
    component.modalRef = component.modalRef || {};
    component.modalRef.nativeElement = {
      classList: {
        remove: function() {}
      },
      style: {
        display: {}
      }
    };
    component.Guardar();
   
  });

  /**
   * Verifica que el método `loadStoredData` funcione correctamente.
   */
  it('should run #loadStoredData()', async () => {
    component.loadStoredData();
  });

  /**
   * Verifica que el método `fetchChoferes` funcione correctamente.
   */
  it('should run #fetchChoferes()', async () => {
    component.chofer40103Service = component.chofer40103Service || {};
    component.chofer40103Service.getChoferNacionalData = jest.fn().mockReturnValue(observableOf({}));
    component.fetchChoferes();
  });

  /**
   * Verifica que el método `onCurpInput` funcione correctamente.
   */
  it('should run #onCurpInput()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.buscarChoferNacional = jest.fn();
    component.onCurpInput();
  });

  /**
   * Verifica que el método `buscarChoferNacional` funcione correctamente.
   */
  it('should run #buscarChoferNacional()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.onEstadoChange = jest.fn().mockReturnValue({
      then: function() {}
    });
    component.onMunicipioChange = jest.fn().mockReturnValue({
      then: function() {}
    });
    component.buscarChoferNacional({});
  });

  /**
   * Verifica que el método `updateDropdowns` funcione correctamente.
   */
  it('should run #updateDropdowns()', async () => {
    component.loadMunicipios = jest.fn();
    component.loadColonias = jest.fn();
    component.updateDropdowns({
      datosGenerales: {
        estados: {},
        municipio: {}
      }
    });
  });

  /**
   * Verifica que el método `loadMunicipios` funcione correctamente.
   */
  it('should run #loadMunicipios()', async () => {
    component.chofer40103Service = component.chofer40103Service || {};
    component.chofer40103Service.getMunicipios = jest.fn().mockReturnValue(observableOf({}));
    component.loadMunicipios({});
  });

  /**
   * Verifica que el método `loadColonias` funcione correctamente.
   */
  it('should run #loadColonias()', async () => {
    component.chofer40103Service = component.chofer40103Service || {};
    component.chofer40103Service.getColonias = jest.fn().mockReturnValue(observableOf({}));
    component.loadColonias({});
  });


  /**
   * Verifica que el método `limpiarFormulario` funcione correctamente.
   */
  it('should run #limpiarFormulario()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.reset = jest.fn();
    component.limpiarFormulario();
  });

  /**
   * Verifica que el método `setFormValues` funcione correctamente.
   */
  it('should run #setFormValues()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.setFormValues();
  });

  /**
   * Verifica que el método `toggleRowSelection` funcione correctamente.
   */
  it('should run #toggleRowSelection()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.toggleRowSelection({});
  });

  /**
   * Verifica que el método `editarFilaSeleccionada` funcione correctamente.
   */
  it('should run #editarFilaSeleccionada()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.modalRef = component.modalRef || {};
    component.modalRef.nativeElement = 'nativeElement';
    component.editarFilaSeleccionada();
  });

  /**
   * Verifica que el método `estadoSeleccion` funcione correctamente.
   */
  it('should run #estadoSeleccion()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.chofer40103Store = component.chofer40103Store || {};
    component.chofer40103Store.setEstado = jest.fn();
    component.estadoSeleccion();
  });
});