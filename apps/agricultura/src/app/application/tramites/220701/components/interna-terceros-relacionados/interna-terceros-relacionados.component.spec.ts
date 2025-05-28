// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import { InternaTercerosRelacionadosComponent } from './interna-terceros-relacionados.component';
import { ExportadorDatosService } from '../../servicios/exportador-datos.service';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockExportadorDatosService {}


describe('InternaTercerosRelacionadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, InternaTercerosRelacionadosComponent, HttpClientModule],
      declarations: [
           
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ExportadorDatosService, useClass: MockExportadorDatosService },
        ChangeDetectorRef
      ]
    }).overrideComponent(InternaTercerosRelacionadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(InternaTercerosRelacionadosComponent);
    component = fixture.debugElement.componentInstance;
  });

  
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.obtenerDatos = jest.fn();
    component.ngOnInit();
    // expect(component.obtenerDatos).toHaveBeenCalled();
  });


});