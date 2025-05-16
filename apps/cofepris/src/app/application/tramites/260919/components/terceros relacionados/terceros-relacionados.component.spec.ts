
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosrelacionadosComponent } from './terceros-relacionados.component';
import { ImportarDeRemediosHerbalsService } from '../../services/importar-de-remedios-herbals.service';

@Injectable()
class MockImportarDeRemediosHerbalsService {}

describe('TercerosrelacionadosComponent', () => {
  let fixture: ComponentFixture<unknown>;
  let component: { ngOnDestroy: () => void; getFabricanteData: jest.Mock<any, any, any> | (() => void); getDestinatarioData: jest.Mock<any, any, any> | (() => void); getFacturadorData: jest.Mock<any, any, any> | (() => void); getProveedorData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; importarDeRemediosHerbals: { getFabricanteData?: any; getDestinatarioData?: any; getProveedorData?: any; getFacturadorData?: any; }; destroyed$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,TercerosrelacionadosComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ImportarDeRemediosHerbalsService, useClass: MockImportarDeRemediosHerbalsService }
      ]
    }).overrideComponent(TercerosrelacionadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosrelacionadosComponent);
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
    component.getFabricanteData = jest.fn();
    component.getDestinatarioData = jest.fn();
    component.getFacturadorData = jest.fn();
    component.getProveedorData = jest.fn();
    component.ngOnInit();
    expect(component.getFabricanteData).toHaveBeenCalled();
    expect(component.getDestinatarioData).toHaveBeenCalled();
    expect(component.getFacturadorData).toHaveBeenCalled();
    expect(component.getProveedorData).toHaveBeenCalled();
  });

  it('should run #getFabricanteData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getFabricanteData = jest.fn().mockReturnValue(observableOf({}));
    component.getFabricanteData();
    expect(component.importarDeRemediosHerbals.getFabricanteData).toHaveBeenCalled();
  });

  it('should run #getDestinatarioData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getDestinatarioData = jest.fn().mockReturnValue(observableOf({}));
    component.getDestinatarioData();
    expect(component.importarDeRemediosHerbals.getDestinatarioData).toHaveBeenCalled();
  });

  it('should run #getProveedorData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getProveedorData = jest.fn().mockReturnValue(observableOf({}));
    component.getProveedorData();
    expect(component.importarDeRemediosHerbals.getProveedorData).toHaveBeenCalled();
  });

  it('should run #getFacturadorData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getFacturadorData = jest.fn().mockReturnValue(observableOf({}));
    component.getFacturadorData();
    expect(component.importarDeRemediosHerbals.getFacturadorData).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});