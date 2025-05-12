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

import { RevisionDocumentalComponent } from './revision-documental.component';

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

describe('RevisionDocumentalComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        RevisionDocumentalComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ChangeDetectorRef
      ]
    }).overrideComponent(RevisionDocumentalComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RevisionDocumentalComponent);
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

    component.ngOnInit();

  });

  it('should run #seleccionaTab()', async () => {
    component.tabChanged = component.tabChanged || {};
    component.tabChanged.emit = jest.fn();
    component.seleccionaTab({});
    expect(component.tabChanged.emit).toHaveBeenCalled();
  });

});