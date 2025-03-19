// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ContenedorAnnexoDosTresComponent } from './contenedor-annexo-dos-tres.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

@Injectable()
class MockTramite80102Query {}

@Injectable()
class MockTramite80102Store {}

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

describe('ContenedorAnnexoDosTresComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,ContenedorAnnexoDosTresComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite80102Query, useClass: MockTramite80102Query },
        { provide: Tramite80102Store, useClass: MockTramite80102Store }
      ]
    }).overrideComponent(ContenedorAnnexoDosTresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContenedorAnnexoDosTresComponent);
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
    component.query = component.query || {};
    component.query.anexoDosTableLista$ = observableOf({
      length: {}
    });
    component.query.anexoTresTablaLista$ = observableOf({
      length: {}
    });
    component.ngOnInit();

  });

  it('should run #obtenerAnexoDosDevolverLaLlamada()', async () => {
    component.store = component.store || {};
    component.store.setAnnexoDosTableLista = jest.fn();
    component.obtenerAnexoDosDevolverLaLlamada({});
     expect(component.store.setAnnexoDosTableLista).toHaveBeenCalled();
  });

  it('should run #obtenerAnexoTresDevolverLaLlamada()', async () => {
    component.store = component.store || {};
    component.store.setAnnexoTresTableLista = jest.fn();
    component.obtenerAnexoTresDevolverLaLlamada({});
     expect(component.store.setAnnexoTresTableLista).toHaveBeenCalled();
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