// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AgregardestinatarioComponent } from './agregardestinatario.component';
import { FormBuilder } from '@angular/forms';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';

@Injectable()
class MockTercerosrelacionadosService {}

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockAgriculturaApiService {}

@Injectable()
class MockFitosanitarioQuery {}

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

describe('AgregardestinatarioComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AgregardestinatarioComponent ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: TercerosrelacionadosService, useClass: MockTercerosrelacionadosService },
        { provide: Router, useClass: MockRouter },
        { provide: AgriculturaApiService, useClass: MockAgriculturaApiService },
        { provide: FitosanitarioQuery, useClass: MockFitosanitarioQuery },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).overrideComponent(AgregardestinatarioComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AgregardestinatarioComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({
      patchValue: function() {}
    });
    component.route = component.route || {};
    component.route.snapshot = {
      paramMap: {
        get: function() {}
      }
    };
    component.fitosanitarioQuery = component.fitosanitarioQuery || {};
    component.fitosanitarioQuery.seleccionarTercerosRelacionados$ = observableOf({});
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.pairsCatalogChange = jest.fn();
    component.estadoCatalogChange = jest.fn();
    component.municipioCatalogChange = jest.fn();
    component.coloniaCatalogChange = jest.fn();
    component.ngAfterViewInit();
    expect(component.pairsCatalogChange).toHaveBeenCalled();
    expect(component.estadoCatalogChange).toHaveBeenCalled();
    expect(component.municipioCatalogChange).toHaveBeenCalled();
    expect(component.coloniaCatalogChange).toHaveBeenCalled();
  });

  it('should run #pairsCatalogChange()', async () => {
    component.tercerosrelacionadosService = component.tercerosrelacionadosService || {};
    component.tercerosrelacionadosService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.pairsCatalogChange();
    expect(component.tercerosrelacionadosService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #estadoCatalogChange()', async () => {
    component.tercerosrelacionadosService = component.tercerosrelacionadosService || {};
    component.tercerosrelacionadosService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.estadoCatalogChange();
    expect(component.tercerosrelacionadosService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #municipioCatalogChange()', async () => {
    component.tercerosrelacionadosService = component.tercerosrelacionadosService || {};
    component.tercerosrelacionadosService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.municipioCatalogChange();
    expect(component.tercerosrelacionadosService.obtenerSelectorList).toHaveBeenCalled();
  });

  it('should run #coloniaCatalogChange()', async () => {
    component.tercerosrelacionadosService = component.tercerosrelacionadosService || {};
    component.tercerosrelacionadosService.obtenerSelectorList = jest.fn().mockReturnValue(observableOf({}));
    component.coloniaCatalogChange();
    expect(component.tercerosrelacionadosService.obtenerSelectorList).toHaveBeenCalled();
  });


  it('should run #onLimpiarDestinatario()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.reset = jest.fn();
    component.destinatarioForm.markAsPristine = jest.fn();
    component.destinatarioForm.markAsUntouched = jest.fn();
    component.destinatarioForm.patchValue = jest.fn();
    component.onLimpiarDestinatario();
    expect(component.destinatarioForm.reset).toHaveBeenCalled();
    expect(component.destinatarioForm.markAsPristine).toHaveBeenCalled();
    expect(component.destinatarioForm.markAsUntouched).toHaveBeenCalled();
    expect(component.destinatarioForm.patchValue).toHaveBeenCalled();
  });

  it('should run #onCancelarDestinatario()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.onCancelarDestinatario();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #enCambioValorRadio()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.get = jest.fn().mockReturnValue({
      updateValueAndValidity: function() {},
      setValidators: function() {},
      clearValidators: function() {}
    });
    component.destinatarioForm.value = {
      tipoMercancia: {}
    };
    component.enCambioValorRadio();
    expect(component.destinatarioForm.get).toHaveBeenCalled();
  });

});