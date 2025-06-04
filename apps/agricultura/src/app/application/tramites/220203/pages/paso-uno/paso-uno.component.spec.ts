import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

@Injectable()
class MockImportacionDeAcuiculturaService {}



describe('PasoUnoComponent', () => {
  let fixture: ComponentFixture<PasoUnoComponent>;
  let component: { ngOnDestroy: () => void; seleccionaTab: (arg0: {}) => void; consultaQuery: { selectConsultaioState$?: any; }; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; importacionDeAcuiculturaService: { getAcuiculturaData?: any; actualizarEstadoFormulario?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PasoUnoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ImportacionDeAcuiculturaService, useClass: MockImportacionDeAcuiculturaService },
        ConsultaioQuery
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

  it('should run #ngOnInit()', async () => {
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({
      update: {}
    });
    component.guardarDatosFormulario = jest.fn();
    component.ngOnInit();
    // expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.importacionDeAcuiculturaService = component.importacionDeAcuiculturaService || {};
    component.importacionDeAcuiculturaService.getAcuiculturaData = jest.fn().mockReturnValue(observableOf({}));
    component.importacionDeAcuiculturaService.actualizarEstadoFormulario = jest.fn();
    component.guardarDatosFormulario();
    // expect(component.importacionDeAcuiculturaService.getAcuiculturaData).toHaveBeenCalled();
    // expect(component.importacionDeAcuiculturaService.actualizarEstadoFormulario).toHaveBeenCalled();
  });

});