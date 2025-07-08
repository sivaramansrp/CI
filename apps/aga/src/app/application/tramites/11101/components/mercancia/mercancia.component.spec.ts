// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { MercanciaComponent } from './mercancia.component';
import { FormBuilder } from '@angular/forms';
import { Tramite11101Query } from '../../estados/tramite11101.query';

@Injectable()
class MockTramite11101Query {}


describe('MercanciaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,MercanciaComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Tramite11101Query, useClass: MockTramite11101Query }
      ]
    }).overrideComponent(MercanciaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MercanciaComponent);
    component = fixture.debugElement.componentInstance;
  });



  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.setFormValues = jest.fn();
    component.tramite11101Query = component.tramite11101Query || {};
    component.tramite11101Query.selectSeccionState$ = observableOf({});
    component.ngOnInit();
    // expect(component.setFormValues).toHaveBeenCalled();
  });

  it('should run #setFormValues()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.setFormValues();
    // expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

});