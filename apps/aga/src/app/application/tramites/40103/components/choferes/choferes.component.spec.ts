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
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Chofer40101Store } from '../../estados/chofer40101.store';
import { Chofer40101Service } from '../../estados/chofer40101.service';
import { Chofer40101Query } from '../../estados/chofer40101.query';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockChofer40101Store {}

@Injectable()
class MockChofer40101Service {}

@Injectable()
class MockChofer40101Query {}

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
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ChoferesComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: Chofer40101Store, useClass: MockChofer40101Store },
        { provide: Chofer40101Service, useClass: MockChofer40101Service },
        { provide: Chofer40101Query, useClass: MockChofer40101Query },
        ChangeDetectorRef
      ]
    }).overrideComponent(ChoferesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ChoferesComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #f', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.controls = 'controls';
    const f = component.f;

  });

  it('should run #setActiveTab()', async () => {

    component.setActiveTab({});

  });

  it('should run #chofernacionalForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.chofernacionalForm();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.chofer40101Query = component.chofer40101Query || {};
    component.chofer40101Query.getChoferes$ = 'getChoferes$';
    component.chofer40101Query.getchoferesextranjero$ = 'getchoferesextranjero$';
    component.choferesList$ = component.choferesList$ || {};
    component.choferesList$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.choferesextranjerosList$ = component.choferesextranjerosList$ || {};
    component.choferesextranjerosList$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.chofernacionalForm = jest.fn();
    component.loadStoredData = jest.fn();
    component.fetchChoferes = jest.fn();
    component.chofer40101Store = component.chofer40101Store || {};
    component.chofer40101Store._select = jest.fn().mockReturnValue([
      {
        "estado": {}
      }
    ]);
    component.estadoSeleccion = jest.fn();
    component.setFormValues = jest.fn();
    component.ngOnInit();
    // expect(component.choferesList$.subscribe).toHaveBeenCalled();
    // expect(component.choferesextranjerosList$.subscribe).toHaveBeenCalled();
    // expect(component.chofernacionalForm).toHaveBeenCalled();
    // expect(component.loadStoredData).toHaveBeenCalled();
    // expect(component.fetchChoferes).toHaveBeenCalled();
    // expect(component.chofer40101Store._select).toHaveBeenCalled();
    // expect(component.estadoSeleccion).toHaveBeenCalled();
    // expect(component.setFormValues).toHaveBeenCalled();
  });

  it('should run #abrirModal()', async () => {

    component.abrirModal();

  });

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

  it('should run #extranjeroGuardar()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.invalid = 'invalid';
    component.formChoferes.getRawValue = jest.fn();
    component.formChoferes.reset = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.chofer40101Service = component.chofer40101Service || {};
    component.chofer40101Service.addChofer = jest.fn();
    component.cerrarModal = jest.fn();
    component.chofer40101Query = component.chofer40101Query || {};
    component.chofer40101Query.getchoferesextranjero$ = 'getchoferesextranjero$';
    component.extranjeroGuardar();
    // expect(component.formChoferes.getRawValue).toHaveBeenCalled();
    // expect(component.formChoferes.reset).toHaveBeenCalled();
    // expect(component.toastr.error).toHaveBeenCalled();
    // expect(component.toastr.success).toHaveBeenCalled();
    // expect(component.chofer40101Service.addChofer).toHaveBeenCalled();
    // expect(component.cerrarModal).toHaveBeenCalled();
  });

  it('should run #Guardar()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.invalid = 'invalid';
    component.formChoferes.getRawValue = jest.fn();
    component.formChoferes.reset = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.chofer40101Service = component.chofer40101Service || {};
    component.chofer40101Service.addChofer = jest.fn();
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
    // expect(component.formChoferes.getRawValue).toHaveBeenCalled();
    // expect(component.formChoferes.reset).toHaveBeenCalled();
    // expect(component.toastr.error).toHaveBeenCalled();
    // expect(component.toastr.success).toHaveBeenCalled();
    // expect(component.chofer40101Service.addChofer).toHaveBeenCalled();
    // expect(component.cerrarModal).toHaveBeenCalled();
  });

  it('should run #loadStoredData()', async () => {

    component.loadStoredData();

  });

  it('should run #fetchChoferes()', async () => {
    component.chofer40101Service = component.chofer40101Service || {};
    component.chofer40101Service.getChoferNacionalData = jest.fn().mockReturnValue(observableOf({}));
    component.fetchChoferes();
    // expect(component.chofer40101Service.getChoferNacionalData).toHaveBeenCalled();
  });

  it('should run #onCurpInput()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.buscarChoferNacional = jest.fn();
    component.onCurpInput();
    // expect(component.formChoferes.get).toHaveBeenCalled();
    // expect(component.buscarChoferNacional).toHaveBeenCalled();
  });

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
    // expect(component.formChoferes.patchValue).toHaveBeenCalled();
    // expect(component.onEstadoChange).toHaveBeenCalled();
    // expect(component.onMunicipioChange).toHaveBeenCalled();
  });

  it('should run #updateDropdowns()', async () => {
    component.loadMunicipios = jest.fn();
    component.loadColonias = jest.fn();
    component.updateDropdowns({
      datosGenerales: {
        estados: {},
        municipio: {}
      }
    });
    // expect(component.loadMunicipios).toHaveBeenCalled();
    // expect(component.loadColonias).toHaveBeenCalled();
  });

  it('should run #loadEstados()', async () => {

    component.loadEstados();

  });

  it('should run #loadMunicipios()', async () => {
    component.chofer40101Service = component.chofer40101Service || {};
    component.chofer40101Service.getMunicipios = jest.fn().mockReturnValue(observableOf({}));
    component.loadMunicipios({});
    // expect(component.chofer40101Service.getMunicipios).toHaveBeenCalled();
  });

  it('should run #loadColonias()', async () => {
    component.chofer40101Service = component.chofer40101Service || {};
    component.chofer40101Service.getColonias = jest.fn().mockReturnValue(observableOf({}));
    component.loadColonias({});
    // expect(component.chofer40101Service.getColonias).toHaveBeenCalled();
  });

  it('should run #onPaisChange()', async () => {

    component.onPaisChange({
      target: {
        value: {}
      }
    });

  });

  it('should run #limpiarFormulario()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.reset = jest.fn();
    component.limpiarFormulario();
    // expect(component.formChoferes.reset).toHaveBeenCalled();
  });

  it('should run #setFormValues()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.setFormValues();
    // expect(component.formChoferes.patchValue).toHaveBeenCalled();
  });

  it('should run #toggleRowSelection()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.toggleRowSelection({});
    // expect(component.formChoferes.patchValue).toHaveBeenCalled();
  });

  it('should run #editarFilaSeleccionada()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.modalRef = component.modalRef || {};
    component.modalRef.nativeElement = 'nativeElement';
    component.editarFilaSeleccionada();
    // expect(component.formChoferes.patchValue).toHaveBeenCalled();
  });

  it('should run #undefined()', async () => {
    // Error: ERROR this JS code is invalid, "choferes.map((chofer)"
    //     at Util.getFuncReturn (/var/task/lib/util.js:325:13)
    //     at /var/task/lib/util.js:413:30
    //     at Array.forEach (<anonymous>)
    //     at Util.getFuncParamObj (/var/task/lib/util.js:396:26)
    //     at Util.getFuncArguments (/var/task/lib/util.js:347:30)
    //     at Util.getFuncReturn (/var/task/lib/util.js:332:34)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:159:31)
    //     at /var/task/lib/func-test-gen.js:164:47
    //     at Array.forEach (<anonymous>)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:164:22)
  });

  it('should run #undefined()', async () => {
    // Error: ERROR this JS code is invalid, "choferesextranjero.map((choferesextranjero)"
    //     at Util.getFuncReturn (/var/task/lib/util.js:325:13)
    //     at /var/task/lib/util.js:413:30
    //     at Array.forEach (<anonymous>)
    //     at Util.getFuncParamObj (/var/task/lib/util.js:396:26)
    //     at Util.getFuncArguments (/var/task/lib/util.js:347:30)
    //     at Util.getFuncReturn (/var/task/lib/util.js:332:34)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:159:31)
    //     at /var/task/lib/func-test-gen.js:164:47
    //     at Array.forEach (<anonymous>)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:164:22)
  });

  it('should run #estadoSeleccion()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.chofer40101Store = component.chofer40101Store || {};
    component.chofer40101Store.setEstado = jest.fn();
    component.estadoSeleccion();
    // expect(component.formChoferes.get).toHaveBeenCalled();
    // expect(component.chofer40101Store.setEstado).toHaveBeenCalled();
  });

});