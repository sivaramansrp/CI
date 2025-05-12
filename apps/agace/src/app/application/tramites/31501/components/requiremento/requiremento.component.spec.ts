// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RequirementoComponent } from './requiremento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Injectable()
class MockRouter {
  navigate() {};
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

describe('RequirementoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, RequirementoComponent ],
      declarations: [
        
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
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
        },
        FormBuilder,
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(RequirementoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RequirementoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  // it('should run #ngOnInit()', async () => {

  //   component.ngOnInit();

  // });

  it('should run #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

  it('should run #continuar()', async () => {
    component.continuarEvento = component.continuarEvento || {};
    component.continuarEvento.emit = jest.fn();
    component.continuar();
    // expect(component.continuarEvento.emit).toHaveBeenCalled();
  });

  it('should run #cancelar()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.cancelar();
    // expect(component.router.navigate).toHaveBeenCalled();
  });

});