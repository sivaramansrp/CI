// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosComplimentariaComponent } from './datos-complimentaria.component';
import { SolicitudService } from '../../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
class MockSolicitudService {
  obtenerComplimentaria = jest.fn().mockReturnValue(observableOf([]));
  obtenerFederetarios = jest.fn().mockReturnValue(observableOf([]));
  obtenerOperacion = jest.fn().mockReturnValue(observableOf([]));
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
  error = jest.fn();
  success = jest.fn();
  info = jest.fn();
  warning = jest.fn();
}

describe('DatosComplimentariaComponent', () => {
  let fixture;
  let component;
  let toastrService: jest.Mocked<ToastrService>;

  beforeEach(() => {
    toastrService = {
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    TestBed.configureTestingModule({
      imports: [DatosComplimentariaComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: SolicitudService, useClass: MockSolicitudService },
        ToastrService
      ]
    }).overrideComponent(DatosComplimentariaComponent, {

      set: { providers: [{ provide: SolicitudService, useClass: MockSolicitudService },
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
    component.solicitudService.obtenerComplimentaria = jest.fn().mockReturnValue(observableOf([]));
    component.obtenerComplimentaria();
    expect(component.solicitudService.obtenerComplimentaria).toHaveBeenCalled();
    // REMOVE this:
    // expect(component.toastr.error).toHaveBeenCalled();
  });


  it('should run #obtenerFederetarios() successfully', async () => {
  component.solicitudService.obtenerFederetarios = jest.fn().mockReturnValue(observableOf([]));
  component.toastr.error = jest.fn();

  component.obtenerFederetarios();

  expect(component.solicitudService.obtenerFederetarios).toHaveBeenCalled();
  // REMOVE this line:
  // expect(component.toastr.error).toHaveBeenCalled();
});

it('should run #obtenerOperacions() successfully', async () => {
  component.solicitudService.obtenerOperacion = jest.fn().mockReturnValue(observableOf([]));
  component.toastr.error = jest.fn();

  component.obtenerOperacions();

  expect(component.solicitudService.obtenerOperacion).toHaveBeenCalled();
  // REMOVE this line:
  // expect(component.toastr.error).toHaveBeenCalled();
});

});