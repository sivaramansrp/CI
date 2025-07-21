//@ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosComplimentariaComponent } from './datos-complimentaria.component';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
class MockImmerModificacionService {
  obtenerComplimentaria = jest.fn().mockReturnValue(observableOf({}));
  obtenerFederetarios = jest.fn().mockReturnValue(observableOf({}));
  obtenerOperacion = jest.fn().mockReturnValue(observableOf({}));
  obtenerPlanta = jest.fn().mockReturnValue(observableOf({}));
  obtenerServicios = jest.fn().mockReturnValue(observableOf({}));
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

@Injectable()
class MockToastrService {
  success = jest.fn();
  error = jest.fn();
  info = jest.fn();
  warning = jest.fn();
}

describe('DatosComplimentariaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatosComplimentariaComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ImmerModificacionService, useClass: MockImmerModificacionService },
        ToastrService
      ]
    }).overrideComponent(DatosComplimentariaComponent, {

      set: { providers: [{ provide: ImmerModificacionService, useClass: MockImmerModificacionService },
{ provide: ToastrService, useClass: MockToastrService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosComplimentariaComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #obtenerComplimentaria()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerComplimentaria = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerComplimentaria();
    //expect(component.solicitudService.obtenerComplimentaria).toHaveBeenCalled();
    //expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #obtenerFederetarios()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerFederetarios = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerFederetarios();
    //expect(component.solicitudService.obtenerFederetarios).toHaveBeenCalled();
    //expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #obtenerOperacions()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerOperacion = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerOperacions();
    //expect(component.solicitudService.obtenerOperacion).toHaveBeenCalled();
    //expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should show toastr error on obtenerPlanta() failure', async () => {
  const errorResponse = throwError(() => new Error('Error en obtenerPlanta'));

  component.solicitudService.obtenerPlanta = jest.fn().mockReturnValue(errorResponse);
  component.toastr.error = jest.fn();

  component.obtenerPlanta();

  expect(component.solicitudService.obtenerPlanta).toHaveBeenCalled();
  expect(component.toastr.error).toHaveBeenCalled();
});

it('should show toastr error on obtenerServicios() failure', async () => {
  const errorResponse = throwError(() => new Error('Error en obtenerServicios'));

  component.solicitudService.obtenerServicios = jest.fn().mockReturnValue(errorResponse);
  component.toastr.error = jest.fn();

  component.obtenerServicios();

  expect(component.solicitudService.obtenerServicios).toHaveBeenCalled();
  expect(component.toastr.error).toHaveBeenCalled();
});

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});