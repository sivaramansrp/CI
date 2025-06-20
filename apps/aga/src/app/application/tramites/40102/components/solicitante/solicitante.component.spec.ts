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

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@NgModule({
  declarations: [
    SolicitanteComponent,
    TranslatePipe,
    PhoneNumberPipe,
    SafeHtmlPipe,
    MyCustomDirective,
  ],
  imports: [FormsModule, ReactiveFormsModule, TituloComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class TestModule {}

describe('SolicitanteComponent', () => {
  let fixture: ComponentFixture<SolicitanteComponent>;
  let component: SolicitanteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule], // Importa el módulo de prueba
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    component.solicitudForm = new FormGroup({
      rfc: new FormControl(''),
      denominacion: new FormControl(''),
      actividadEconomica: new FormControl(''),
      correoElectronico: new FormControl(''),
    });
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el método `ngOnInit` funcione correctamente.
   */
  it('should run #ngOnInit()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.setFormValues = jest.fn();
    component.ngOnInit();
  });
});