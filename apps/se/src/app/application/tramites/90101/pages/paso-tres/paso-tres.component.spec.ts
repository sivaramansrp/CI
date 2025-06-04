// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoTresComponent } from './paso-tres.component';
import { FirmaElectronicaComponent, SharedModule } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';


describe('PasoTresComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, FirmaElectronicaComponent, CommonModule, SharedModule, ToastrModule.forRoot() ],
      declarations: [
        PasoTresComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: 'ToastConfig', useValue: {} }
      ]
    }).overrideComponent(PasoTresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

});