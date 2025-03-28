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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { DestinatarioDeComponent } from './destinatario-de.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110202Store } from '../../estados/tramite110202.store';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import {
  SeccionLibQuery,
  SeccionLibStore,
} from '@libs/shared/data-access-user/src';
import { ToastrService, provideToastr } from 'ngx-toastr';

@Injectable()
class MockTramite110202Store {
  setDestinatarioForm() {}
  setFormDestinatario() {}
  setFormDatosDelDestinatario() {}
  setMedioDeTransporte() {}
  setPaisDestinatario() {}
  setPaisDestinSeleccion() {}
  setMedioDeTransporteSeleccion() {}
}

@Injectable()
class MockTramite110202Query {
  selectDestinatarioForm$ = observableOf({});
  selectFormDestinatario$ = observableOf({});
  selectFormDatosDelDestinatario$ = observableOf({});
  selectPaisDestino$ = observableOf({});
  selectMedioDeTransporte$ = observableOf({});
}

describe('DestinatarioDeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        FormBuilder,
        CertificadoValidacionService,
        { provide: Tramite110202Store, useClass: MockTramite110202Store },
        { provide: Tramite110202Query, useClass: MockTramite110202Query },
        SeccionLibQuery,
        SeccionLibStore,
      ],
    })
      .overrideComponent(DestinatarioDeComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(DestinatarioDeComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #formularioControl', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.get = jest.fn();
    const formularioControl = component.formularioControl;
    expect(component.destinatarioForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarPaisDestin = jest.fn();
    component.cargarMedioDeTransporte = jest.fn();
    component.ngOnInit();
    expect(component.cargarPaisDestin).toHaveBeenCalled();
    expect(component.cargarMedioDeTransporte).toHaveBeenCalled();
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializarSuscripciones()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.selectDestinatarioForm$ = observableOf({});
    component.tramiteQuery.selectFormDestinatario$ = observableOf({});
    component.tramiteQuery.selectFormDatosDelDestinatario$ = observableOf({});
    component.tramiteQuery.selectPaisDestino$ = 'selectPaisDestino$';
    component.tramiteQuery.selectMedioDeTransporte$ =
      'selectMedioDeTransporte$';
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.patchValue = jest.fn();
    component.destinatarioForm.valueChanges = observableOf({});
    component.store = component.store || {};
    component.store.setDestinatarioForm = jest.fn();
    component.validarFormulario = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.inicializarSuscripciones();
    expect(component.destinatarioForm.patchValue).toHaveBeenCalled();
    expect(component.store.setDestinatarioForm).toHaveBeenCalled();
  });

  it('should run #detosDelDestinatarioFunc()', async () => {
    component.store = component.store || {};
    component.store.setFormDatosDelDestinatario = jest.fn();
    component.detosDelDestinatarioFunc({});
    expect(component.store.setFormDatosDelDestinatario).toHaveBeenCalled();
  });

  it('should run #medioDeTransporteSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setMedioDeTransporteSeleccion = jest.fn();
    component.medioDeTransporteSeleccion({ id: 1, descripcion: 'some value' });
    expect(component.store.setMedioDeTransporteSeleccion).toHaveBeenCalled();
  });

  it('should run #paisDestinSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setPaisDestinSeleccion = jest.fn();
    component.paisDestinSeleccion({ id: 1, descripcion: 'some value' });
    expect(component.store.setPaisDestinSeleccion).toHaveBeenCalled();
  });

  it('should run #cargarPaisDestin()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerPaisDestino = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setPaisDestinatario = jest.fn();
    component.cargarPaisDestin();
    expect(component.certificadoService.obtenerPaisDestino).toHaveBeenCalled();
    expect(component.store.setPaisDestinatario).toHaveBeenCalled();
  });

  it('should run #cargarMedioDeTransporte()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerMedioDeTransporte = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setMedioDeTransporte = jest.fn();
    component.cargarMedioDeTransporte();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });
});
