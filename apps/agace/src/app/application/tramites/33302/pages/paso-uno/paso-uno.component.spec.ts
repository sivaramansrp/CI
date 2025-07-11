// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solicitud32301Service } from '../../services/solicitud.service';
import { Tramite33302Query } from '../../estados/tramite33302.query';

@Injectable()
class MockSolicitud32301Service {}

@Injectable()
class MockTramite33302Query {}

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

describe('PasoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PasoUnoComponent, ],
      declarations: [
    
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ConsultaioQuery,
        { provide: Solicitud32301Service, useClass: MockSolicitud32301Service },
        { provide: Tramite33302Query, useClass: MockTramite33302Query }
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
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
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.guardarDatosFormulario = jest.fn();
    component.Tramite33302Query = component.Tramite33302Query || {};
    component.Tramite33302Query.select = jest.fn().mockReturnValue(observableOf({}));
    component.ngOnInit();
   });

  it('should run #guardarDatosFormulario()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getRegistroTomaMuestrasMercanciasData = jest.fn().mockReturnValue(observableOf({}));
    component.solicitudService.actualizarEstadoFormulario = jest.fn();
    component.guardarDatosFormulario();
     });

  it('should run #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

  it('should run #getValoreEnable()', async () => {

    component.getValoreEnable({});

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
   });

});