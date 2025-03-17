// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DirectorGeneralComponent } from './director-general.component';
import { FormBuilder } from '@angular/forms';

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

describe('DirectorGeneralComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        DirectorGeneralComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder
      ]
    }).overrideComponent(DirectorGeneralComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DirectorGeneralComponent);
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
    component.crearFormularioDirectorGeneral = jest.fn();
    component.setFormValues = jest.fn();
    component.ngOnInit();
  });

  it('should run #crearFormularioDirectorGeneral()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormularioDirectorGeneral();
  });

  it('should run #setFormValues()', async () => {
    component.directorGeneralForm = component.directorGeneralForm || {};
    component.directorGeneralForm.patchValue = jest.fn();
    component.directorGeneralForm.value = 'value';
    component.setFormValues();
  });

});