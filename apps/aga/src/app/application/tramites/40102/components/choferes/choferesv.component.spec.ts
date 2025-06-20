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

import { Component, ChangeDetectorRef } from '@angular/core';
import { ChoferesComponent } from './choferes.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Chofer40102Store } from '../../estados/chofer40102.store';
import { Chofer40102Service } from '../../estados/chofer40102.service';
import { Chofer40102Query } from '../../estados/chofer40102.query';

@Injectable()
class MockHttpClient {
  post() {}
}

@Injectable()
class MockChofer40102Store {}

@Injectable()
class MockChofer40102Service {}

@Injectable()
class MockChofer40102Query {}

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

describe('ChoferesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        ChoferesComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: Chofer40102Store, useClass: MockChofer40102Store },
        { provide: Chofer40102Service, useClass: MockChofer40102Service },
        { provide: Chofer40102Query, useClass: MockChofer40102Query },
        ChangeDetectorRef,
      ],
    })
      .overrideComponent(ChoferesComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(ChoferesComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #getFormValues', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.controls = 'controls';
    const getFormValues = component.getFormValues;
  });

  it('should run #isModalOpen()', async () => {
    component.isModalOpen({});
  });

  it('should run #setActiveTab()', async () => {
    component.setActiveTab({});
  });

  it('should run #chofernacionalForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.chofernacionalForm();
  });

  it('should run #ngOnInit()', async () => {
    component.getPagoDerechosLista$ = component.getPagoDerechosLista$ || {};
    component.getPagoDerechosLista$.pipe = jest.fn().mockReturnValue(
      observableOf({
        length: {},
      })
    );
    component.chofer40102Query = component.chofer40102Query || {};
    component.chofer40102Query.getChoferes$ = 'getChoferes$';
    component.chofer40102Query.getchoferesextranjero$ =
      'getchoferesextranjero$';
    component.choferesList$ = component.choferesList$ || {};
    component.choferesList$.pipe = jest.fn().mockReturnValue(observableOf({}));
    component.choferesextranjerosList$ =
      component.choferesextranjerosList$ || {};
    component.choferesextranjerosList$.pipe = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.chofernacionalForm = jest.fn();
    component.loadStoredData = jest.fn();
    component.fetchChoferes = jest.fn();
    component.chofer40102Store = component.chofer40102Store || {};
    component.chofer40102Store._select = jest.fn().mockReturnValue([
      {
        estado: {},
      },
    ]);
    component.estadoSeleccion = jest.fn();
    component.setFormValues = jest.fn();
    component.paisEmisorData = jest.fn();
    component.delegacionChnData = jest.fn();
    component.coloniaChnData = jest.fn();
    component.nacionaliDadChe = jest.fn();
    component.ngOnInit();
  });

  it('should run #abrirModal()', async () => {
    component.abrirModal();
  });

  it('should run #cerrarModal()', async () => {
    component.modalRef = component.modalRef || {};
    component.modalRef.nativeElement = {
      classList: {
        remove: function () {},
      },
      style: {
        display: {},
      },
    };
    component.cerrarModal();
  });

  it('should run #extranjeroGuardars()', async () => {
    component.pagoDerechosLista = component.pagoDerechosLista || {};
    component.pagoDerechosLista = ['pagoDerechosLista'];
    component.toastr = component.toastr || {};
    component.toastr.warning = jest.fn();
    component.toastr.success = jest.fn();
    component.chofer40102Store = component.chofer40102Store || {};
    component.chofer40102Store.update = jest.fn().mockReturnValue([
      {
        pagoDerechosLista: {},
      },
    ]);
    component.chofer40102Store.getValue = jest.fn();
    component.extranjeroGuardars();
  });

  it('should run #Guardar()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.invalid = 'invalid';
    component.formChoferes.getRawValue = jest.fn();
    component.formChoferes.reset = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.addChofer = jest.fn();
    component.cerrarModal = jest.fn();
    component.modalRef = component.modalRef || {};
    component.modalRef.nativeElement = {
      classList: {
        remove: function () {},
      },
      style: {
        display: {},
      },
    };
    component.Guardar();
  });

  it('should run #loadStoredData()', async () => {
    component.loadStoredData();
  });

  it('should run #fetchChoferes()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getChoferNacionalData = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.fetchChoferes();
  });

  it('should run #onCurpInput()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.get = jest.fn().mockReturnValue({
      value: {},
    });
    component.buscarChoferNacional = jest.fn();
    component.onCurpInput();
  });

  it('should run #buscarChoferNacional()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.patchValue = jest.fn();
    component.onEstadoChange = jest.fn().mockReturnValue({
      then: function () {},
    });
    component.onMunicipioChange = jest.fn().mockReturnValue({
      then: function () {},
    });
    component.buscarChoferNacional({});
  });

  it('should run #updateDropdowns()', async () => {
    component.loadMunicipios = jest.fn();
    component.loadColonias = jest.fn();
    component.updateDropdowns({
      datosGenerales: {
        estados: {},
        municipio: {},
      },
    });
  });

  it('should run #loadEstados()', async () => {
    component.loadEstados();
  });

  it('should run #loadMunicipios()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getMunicipios = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.loadMunicipios({});
  });

  it('should run #loadColonias()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getColonias = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.loadColonias({});
  });

  it('should run #onPaisChange()', async () => {
    component.onPaisChange({
      target: {
        value: {},
      },
    });
  });

  it('should run #limpiarFormulario()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.reset = jest.fn();
    component.limpiarFormulario();
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
  });

  it('should run #estadoSeleccion()', async () => {
    component.formChoferes = component.formChoferes || {};
    component.formChoferes.get = jest.fn().mockReturnValue({
      value: {},
    });
    component.chofer40102Store = component.chofer40102Store || {};
    component.chofer40102Store.setEstado = jest.fn();
    component.estadoSeleccion();
  });

  it('should run #paisEmisorData()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getPaisOrigenChn = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.paisEmisorData();
  });

  it('should run #delegacionChnData()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getDelegacionChn = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.delegacionChnData();
  });

  it('should run #coloniaChnData()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getColoniaChn = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.coloniaChnData();
  });

  it('should run #nacionaliDadChe()', async () => {
    component.chofer40102Service = component.chofer40102Service || {};
    component.chofer40102Service.getNacionaliDadChe = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.nacionaliDadChe();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
  });
});
