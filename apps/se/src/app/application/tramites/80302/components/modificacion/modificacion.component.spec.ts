// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ModificacionComponent } from './modificacion.component';
import { FormBuilder } from '@angular/forms';
import { SolicitudService } from '../../service/solicitud.service';
import { Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';
import { Tramite80302Query } from '../../../../estados/queries/tramite80302.query';

@Injectable()
class MockSolicitudService {}

@Injectable()
class MockTramite80302Store {
  setDatosModificacion = jest.fn(); // Mock the method
  setAnotherMethod = jest.fn(); // Add other methods if needed
}

@Injectable()
class MockTramite80302Query {
  selectBuscarDomicilios$ = {};
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

describe('ModificacionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ModificacionComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useClass: MockSolicitudService },
        { provide: Tramite80302Store, useClass: MockTramite80302Store },
        { provide: Tramite80302Query, useClass: MockTramite80302Query }
      ]
    }).overrideComponent(ModificacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ModificacionComponent);
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
    component.tramite80302Query = component.tramite80302Query || {};
    component.tramite80302Query.selectSolicitud$ = observableOf({});
    component.inicializarFormulario = jest.fn();
    component.loadDatosModificacion = jest.fn();
    component.loadDatosTablaData = jest.fn();
    component.ngOnInit();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
  });

  it('should run #inicializarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.derechoState = component.derechoState || {};
    component.derechoState.datosModificacion = 'datosModificacion';
    component.inicializarFormulario();
  });

  it('should run #loadDatosModificacion()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosModificacion = jest.fn().mockReturnValue(observableOf({}));
    component.tramite80302Store = component.tramite80302Store || {};
    component.tramite80302Store.setDatosModificacion = jest.fn();
    component.setFormValues = jest.fn();
    component.loadDatosModificacion();
  });

  it('should run #loadDatosTablaData()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosTableData = jest.fn().mockReturnValue(observableOf({}));
    component.loadDatosTablaData();
  });

  it('should run #setValoresStore()', async () => {
    // Arrange
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'mockValue' }),
    } as unknown as FormGroup;

    const mockCampo = 'mockCampo';
    const mockMetodoNombre = 'setDatosModificacion'; // Use a valid method name

    component.tramite80302Store =
      new MockTramite80302Store() as unknown as Tramite80302Store;

    // Act
    component.setValoresStore(
      mockForm,
      mockCampo,
      mockMetodoNombre as keyof Tramite80302Store
    );

    // Assert
    expect(
      component.tramite80302Store.setDatosModificacion
    ).toHaveBeenCalledWith('mockValue');
  });

  it('should run #setFormValues()', async () => {
    component.modificacionForm = new FormBuilder().group({
      rfc: [''],
      federal: [''],
      tipo: [''],
      programa: [''],
    });

    component.derechoState = {
      datosModificacion: {
        rfc: 'ABC1234567',
        federal: 'FEDERAL',
        tipo: 'Tipo A',
        programa: 'Programa B',
      },
    } as any;

    component.setFormValues();

    expect(component.modificacionForm.get('rfc')?.value).toBe('ABC1234567');
    expect(component.modificacionForm.get('federal')?.value).toBe('FEDERAL');
    expect(component.modificacionForm.get('tipo')?.value).toBe('Tipo A');
    expect(component.modificacionForm.get('programa')?.value).toBe('Programa B');
  });

  it('should toggle desEstatus from "Baja" to "Activada" in #valorDeAlternancia()', () => {
    const mockRow = { id: 1, desEstatus: 'Baja' };
    component.datosTabla = [{ id: 1, desEstatus: 'Baja' }];
    
    component.valorDeAlternancia({ row: mockRow });
    
    expect(component.datosTabla[0].desEstatus).toBe('Activada');
  });

  it('should toggle desEstatus from "Activada" to "Baja" in #valorDeAlternancia()', () => {
    const mockRow = { id: 1, desEstatus: 'Activada' };
    component.datosTabla = [{ id: 1, desEstatus: 'Activada' }];
    
    component.valorDeAlternancia({ row: mockRow });
    
    expect(component.datosTabla[0].desEstatus).toBe('Baja');
  });

});