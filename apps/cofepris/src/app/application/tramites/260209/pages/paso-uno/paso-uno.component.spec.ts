// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { Tramite260208Query } from '../../estados/tramite260208Query.query';
import { Tramite260208Store } from '../../estados/tramite260208Store.store';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockTramite260208Query {}

@Injectable()
class MockTramite260208Store {}


describe('PasoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ],
      declarations: [
        PasoUnoComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite260208Query, useClass: MockTramite260208Query },
        { provide: Tramite260208Store, useClass: MockTramite260208Store }
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
    component.tramite260208Query = component.tramite260208Query || {};
    component.tramite260208Query.getTabSeleccionado$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #seleccionaTab()', async () => {
    component.tramite260208Store = component.tramite260208Store || {};
    component.tramite260208Store.updateTabSeleccionado = jest.fn();
    component.seleccionaTab({});
    expect(component.tramite260208Store.updateTabSeleccionado).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});