// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Output,
  NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitanteComponent } from './solicitante.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Módulo de prueba para la configuración del componente Solicitante.
 */
@NgModule({
  declarations: [
    SolicitanteComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, TituloComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class TestModule {}

/**
 * Conjunto de pruebas para el componente Solicitante.
 */
describe('SolicitanteComponent', () => {
  let fixture: ComponentFixture<SolicitanteComponent>;
  let component: SolicitanteComponent;

  /**
   * Configuración inicial antes de cada prueba.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TituloComponent,
        SolicitanteComponent, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;

    /**
     * Inicializa el formulario solicitudForm con controles vacíos.
     */
    component.solicitudForm = new FormGroup({
      rfc: new FormControl(''),
      denominacion: new FormControl(''),
      actividadEconomica: new FormControl(''),
      correoElectronico: new FormControl(''),
    });
  });

  /**
   * Limpieza después de cada prueba.
   */
  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  /**
   * Prueba para verificar si el componente se crea correctamente.
   */
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba para verificar el método ngOnInit().
   */
  it('should run #ngOnInit()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.setFormValues = jest.fn();
    component.ngOnInit();
  });
});
