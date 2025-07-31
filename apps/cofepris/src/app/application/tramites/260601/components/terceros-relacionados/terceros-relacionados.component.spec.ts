import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class AvisoSanitarioService {}
class MockAvisoSanitarioService {}

describe('TercerosRelacionadosComponent', () => {
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let component: { ngOnDestroy: () => void; obtenerProveedor: jest.Mock<any, any, any> | (() => void); obtenerFabricante: jest.Mock<any, any, any> | (() => void); consultaioQuery: { selectConsultaioState$?: any; }; ngOnInit: () => void; getProveedorTableData: { tableHeader?: any; tableBody?: any; }; getFabricanteTableData: { tableHeader?: any; tableBody?: any; }; limpiarProveedor: () => void; limpiarFabricante: () => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, TercerosRelacionadosComponent, HttpClientTestingModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ConsultaioQuery
      ]
    }).overrideComponent(TercerosRelacionadosComponent, {

      set: { providers: [{ provide: AvisoSanitarioService, useClass: MockAvisoSanitarioService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
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
    component.obtenerProveedor = jest.fn();
    component.obtenerFabricante = jest.fn();
    component.consultaioQuery = component.consultaioQuery || {};
    component.consultaioQuery.selectConsultaioState$ = observableOf({});
    component.ngOnInit();
  });

  it('should run #obtenerProveedor()', async () => {
    component.getProveedorTableData = component.getProveedorTableData || {};
    component.getProveedorTableData.tableHeader = 'tableHeader';
    component.getProveedorTableData.tableBody = 'tableBody';
    component.obtenerProveedor();

  });

  it('should run #obtenerFabricante()', async () => {
    component.getFabricanteTableData = component.getFabricanteTableData || {};
    component.getFabricanteTableData.tableHeader = 'tableHeader';
    component.getFabricanteTableData.tableBody = 'tableBody';
    component.obtenerFabricante();

  });

  it('should run #limpiarProveedor()', async () => {

    component.limpiarProveedor();

  });

  it('should run #limpiarFabricante()', async () => {

    component.limpiarFabricante();

  });

});