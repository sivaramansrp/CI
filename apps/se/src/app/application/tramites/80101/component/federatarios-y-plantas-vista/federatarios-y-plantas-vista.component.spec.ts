// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { ActivatedRoute } from '@angular/router';

@Injectable()
class MockTramite80101Store {}

@Injectable()
class MockTramite80101Query {
  selectDatosFederatarios$ = {};
}

describe('FederatariosYPlantasVistaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FederatariosYPlantasVistaComponent, FormsModule, ReactiveFormsModule ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {}
            }
          }
        },
        { provide: Tramite80101Store, useClass: MockTramite80101Store },
        { provide: Tramite80101Query, useClass: MockTramite80101Query }
      ]
    }).overrideComponent(FederatariosYPlantasVistaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #setFormaDatos()', async () => {
    component.store = component.store || {};
    component.store.setFederatarios = jest.fn();
    component.setFormaDatos({});
    expect(component.store.setFederatarios).toHaveBeenCalled();
  });

});