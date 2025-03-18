// @ts-nocheck
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Directive } from '@angular/core';
import { Injectable } from '@angular/core';
import { Input } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Output } from '@angular/core';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { throwError } from 'rxjs';

import { InternaDatosGeneralesComponent } from './interna-datos-generales.component';
import { MercanciaDatosService } from '../../servicios/mercancia-datos.service';
import { RevisionService } from '@libs/shared/data-access-user/src';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { TramiteStore } from '../../estados/tramite220701.store';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

@Injectable()
class MockMercanciaDatosService {}

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramiteStoreQuery {}

@Injectable()
class MockTramiteStore {}

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

describe('InternaDatosGeneralesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        InternaDatosGeneralesComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        RevisionService,
        ValidacionesFormularioService,
        { provide: MercanciaDatosService, useClass: MockMercanciaDatosService },
        { provide: HttpClient, useClass: MockHttpClient },
        ChangeDetectorRef,
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(InternaDatosGeneralesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(InternaDatosGeneralesComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.forma = component.forma || {};
    component.forma.setControl = jest.fn();
    component.initActionFormBuild();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.forma.setControl).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteStoreQuery = component.tramiteStoreQuery || {};
    component.tramiteStoreQuery.selectSolicitudTramite$ = observableOf({});
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.disableFormControls = jest.fn();
    component.forma = component.forma || {};
    component.forma.setControl = jest.fn();
    component.forma.patchValue = jest.fn();
    component.forma.statusChanges = observableOf({});
    component.forma.value = 'value';
    component.forma.get = jest.fn().mockReturnValue({
      status: {}
    });
    component.forma.valid = 'valid';
    component.getOficianaInspeccion = jest.fn();
    component.getEstablecimiento = jest.fn();
    component.getRegimenDestinaran = jest.fn();
    component.getMovilizacionNacional = jest.fn();
    component.getPuntoVerificacion = jest.fn();
    component.getEmpresaTransportista = jest.fn();
    component.obtenerListasDesplegables = jest.fn();
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setInternaDatosGeneralesTramite = jest.fn();
    component.fetchData = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.seccionQuery.getValue = jest.fn().mockReturnValue({
      formaValida: {}
    });
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.disableFormControls).toHaveBeenCalled();
    expect(component.forma.setControl).toHaveBeenCalled();
    expect(component.forma.patchValue).toHaveBeenCalled();
    expect(component.forma.get).toHaveBeenCalled();
    expect(component.getOficianaInspeccion).toHaveBeenCalled();
    expect(component.getEstablecimiento).toHaveBeenCalled();
    expect(component.getRegimenDestinaran).toHaveBeenCalled();
    expect(component.getMovilizacionNacional).toHaveBeenCalled();
    expect(component.getPuntoVerificacion).toHaveBeenCalled();
    expect(component.getEmpresaTransportista).toHaveBeenCalled();
    expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    expect(component.tramiteStore.setInternaDatosGeneralesTramite).toHaveBeenCalled();
    expect(component.fetchData).toHaveBeenCalled();
    expect(component.seccionQuery.getValue).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
  });

  it('should run #fetchData()', async () => {
    component.mercanciaDatosService = component.mercanciaDatosService || {};
    component.mercanciaDatosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.cdr = component.cdr || {};
    component.cdr.detectChanges = jest.fn();
    component.fetchData();
    expect(component.mercanciaDatosService.getDatos).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  it('should run #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerSanidadAgropecuariaList = jest.fn();
    component.obtenerPuntoInspeccionList = jest.fn();
    component.obtenerEstablecimientoList = jest.fn();
    component.obtenerVeterinarioList = jest.fn();
    component.obtenerRegimenList = jest.fn();
    component.obtenerListasDesplegables();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
    expect(component.obtenerSanidadAgropecuariaList).toHaveBeenCalled();
    expect(component.obtenerPuntoInspeccionList).toHaveBeenCalled();
    expect(component.obtenerEstablecimientoList).toHaveBeenCalled();
    expect(component.obtenerVeterinarioList).toHaveBeenCalled();
    expect(component.obtenerRegimenList).toHaveBeenCalled();
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.httpServicios = component.httpServicios || {};
    component.httpServicios.get = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerIngresoSelectList();
    expect(component.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #obtenerSanidadAgropecuariaList()', async () => {
    component.httpServicios = component.httpServicios || {};
    component.httpServicios.get = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerSanidadAgropecuariaList();
    expect(component.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #obtenerPuntoInspeccionList()', async () => {
    component.httpServicios = component.httpServicios || {};
    component.httpServicios.get = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerPuntoInspeccionList();
    expect(component.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #obtenerEstablecimientoList()', async () => {
    component.httpServicios = component.httpServicios || {};
    component.httpServicios.get = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerEstablecimientoList();
    expect(component.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #obtenerVeterinarioList()', async () => {
    component.httpServicios = component.httpServicios || {};
    component.httpServicios.get = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerVeterinarioList();
    expect(component.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #obtenerRegimenList()', async () => {
    component.httpServicios = component.httpServicios || {};
    component.httpServicios.get = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerRegimenList();
    expect(component.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #getAduanaIngreso()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getAduanaIngreso = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getAduanaIngreso();
    expect(component.revisionService.getAduanaIngreso).toHaveBeenCalled();
  });

  it('should run #getOficianaInspeccion()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getOficianaInspeccion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getOficianaInspeccion();
    expect(component.revisionService.getOficianaInspeccion).toHaveBeenCalled();
  });

  it('should run #getEstablecimiento()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getEstablecimiento = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getEstablecimiento();
    expect(component.revisionService.getEstablecimiento).toHaveBeenCalled();
  });

  it('should run #getRegimenDestinaran()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getRegimenDestinaran = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getRegimenDestinaran();
    expect(component.revisionService.getRegimenDestinaran).toHaveBeenCalled();
  });

  it('should run #getMovilizacionNacional()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getMovilizacionNacional = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getMovilizacionNacional();
    expect(component.revisionService.getMovilizacionNacional).toHaveBeenCalled();
  });

  it('should run #getPuntoVerificacion()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getPuntoVerificacion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getPuntoVerificacion();
    expect(component.revisionService.getPuntoVerificacion).toHaveBeenCalled();
  });

  it('should run #getEmpresaTransportista()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getEmpresaTransportista = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getEmpresaTransportista();
    expect(component.revisionService.getEmpresaTransportista).toHaveBeenCalled();
  });

  it('should run #disableFormControls()', async () => {
    component.forma = component.forma || {};
    component.forma.get = jest.fn().mockReturnValue({
      disable: function() {}
    });
    component.disableFormControls();
    expect(component.forma.get).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});