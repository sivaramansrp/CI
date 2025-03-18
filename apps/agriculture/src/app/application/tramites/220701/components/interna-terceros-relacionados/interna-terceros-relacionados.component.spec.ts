// @ts-nocheck
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Directive } from '@angular/core';
import { Injectable } from '@angular/core';
import { Input } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Output } from '@angular/core';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { throwError } from 'rxjs';

import { InternaTercerosRelacionadosComponent } from './interna-terceros-relacionados.component';
import { ExportadorDatosService } from '../../servicios/exportador-datos.service';

@Injectable()
class MockExportadorDatosService {}

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

describe('InternaTercerosRelacionadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        InternaTercerosRelacionadosComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
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

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.fetchData = jest.fn();
    component.ngOnInit();
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should run #fetchData()', async () => {
    component.exportadorDatosService = component.exportadorDatosService || {};
    component.exportadorDatosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.cdr = component.cdr || {};
    component.cdr.detectChanges = jest.fn();
    component.fetchData();
    expect(component.exportadorDatosService.getDatos).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

});