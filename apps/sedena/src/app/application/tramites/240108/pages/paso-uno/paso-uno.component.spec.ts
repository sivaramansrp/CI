// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { Tramite240108Query } from '../../estados/tramite240108Query.query';
import { Tramite240108Store } from '../../estados/tramite240108Store.store';

@Injectable()
class MockTramite240108Query {}

@Injectable()
class MockTramite240108Store {}

describe('PasoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PasoUnoComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite240108Query, useClass: MockTramite240108Query },
        { provide: Tramite240108Store, useClass: MockTramite240108Store }
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
    component.tramite240108Query = component.tramite240108Query || {};
    component.tramite240108Query.getTabSeleccionado$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #seleccionaTab()', async () => {
    component.tramite240108Store = component.tramite240108Store || {};
    component.tramite240108Store.updateTabSeleccionado = jest.fn();
    component.seleccionaTab({});
    expect(component.tramite240108Store.updateTabSeleccionado).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
  });

});