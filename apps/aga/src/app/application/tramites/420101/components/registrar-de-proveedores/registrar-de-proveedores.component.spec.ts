// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RegistrarDeProveedoresComponent } from './registrar-de-proveedores.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Tramite420101Query } from '../../estados/tramite420101Query.query';
import { Tramite420101Store } from '../../estados/tramite420101Store.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockTramite420101Query {}

@Injectable()
class MockTramite420101Store {}


describe('RegistrarDeProveedoresComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,RegistrarDeProveedoresComponent, HttpClientTestingModule ],
      declarations: [
  
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        },
        { provide: Tramite420101Query, useClass: MockTramite420101Query },
        { provide: Tramite420101Store, useClass: MockTramite420101Store }
      ]
    }).overrideComponent(RegistrarDeProveedoresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RegistrarDeProveedoresComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramite420101Query = component.tramite420101Query || {};
    component.tramite420101Query.getDatosProveedoresManual$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #analizarGramaticalmenteCSV()', async () => {

    component.analizarGramaticalmenteCSV('csv');

  });



  it('should run #navigateRegistroProveedoresManual()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.navigateRegistroProveedoresManual();
    expect(component.router.navigate).toHaveBeenCalled();
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