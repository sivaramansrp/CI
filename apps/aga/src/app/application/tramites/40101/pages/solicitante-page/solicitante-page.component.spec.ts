// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitantePageComponent } from './solicitante-page.component';
import { SeccionQuery } from '../../../../core/queries/seccion.query';
import { SeccionStore } from '../../../../estados/seccion.store';

@Injectable()
class MockSeccionQuery {}

@Injectable()
class MockSeccionStore {
  establecerSeccion() {}
  establecerFormaValida() {}
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('SolicitantePageComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        SolicitantePageComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: SeccionQuery, useClass: MockSeccionQuery },
        { provide: SeccionStore, useClass: MockSeccionStore }
      ]
    }).overrideComponent(SolicitantePageComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitantePageComponent);
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
    spyOn(component, 'asignarSecciones');
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ngOnInit();
    expect(component.asignarSecciones).toHaveBeenCalled();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab({});
  });

  it('should run #getValorIndice()', async () => {
    component.pasos = component.pasos || {};
    component.wizardComponent = component.wizardComponent || {
      siguiente: () => {},
      atras: () => {}
    };
    spyOn(component.wizardComponent, 'siguiente');
    spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({
      valor: 'next', 
      accion: 'siguiente' 
    });
    // expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    // expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should run #asignarSecciones()', async () => {
    component.seccionStore = component.seccionStore || {};
    spyOn(component.seccionStore, 'establecerSeccion');
    spyOn(component.seccionStore, 'establecerFormaValida');
    component.asignarSecciones();
    expect(component.seccionStore.establecerSeccion).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
  });

});