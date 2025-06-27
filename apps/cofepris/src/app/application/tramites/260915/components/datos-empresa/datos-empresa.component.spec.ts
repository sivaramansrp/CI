import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';


describe('DatosEmpresaComponent', () => {
  let fixture: ComponentFixture<DatosEmpresaComponent>;
  let component: { ngOnDestroy: () => void; mostrar_colapsable: () => void; destroyed$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosEmpresaComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ConsultaioQuery
      ]
    }).overrideComponent(DatosEmpresaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #mostrar_colapsable()', async () => {

    component.mostrar_colapsable();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
     expect(component.destroyed$.next).toHaveBeenCalled();
     expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});