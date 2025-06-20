// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite260304Query {}

@Injectable()
class MockTramite260304Store {}


describe('PasoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PasoUnoComponent, HttpClientTestingModule ],
      declarations: [
        
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite260304Query, useClass: MockTramite260304Query },
        { provide: Tramite260304Store, useClass: MockTramite260304Store }
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramite260304Query = component.tramite260304Query || {};
    component.tramite260304Query.getTabSeleccionado$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #seleccionaTab()', async () => {
    component.tramite260304Store = component.tramite260304Store || {};
    component.tramite260304Store.updateTabSeleccionado = jest.fn();
    component.seleccionaTab({});
    expect(component.tramite260304Store.updateTabSeleccionado).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
  });

});