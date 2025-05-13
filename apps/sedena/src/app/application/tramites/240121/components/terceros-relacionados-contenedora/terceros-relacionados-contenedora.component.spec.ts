// @ts-nocheck
import { isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Injectable, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TercerosRelacionadosContenedoraComponent } from './terceros-relacionados-contenedora.component';
import { Tramite240121Query } from '../../estados/tramite240121Query.query';
import { Tramite240121Store } from '../../estados/tramite240121Store.store';
import { ActivatedRoute } from '@angular/router';

@Injectable()
class MockTramite240121Store {}

@Injectable()
class MockTramite240121Query {}

@Injectable()
class MockActivatedRoute {
  snapshot = {
    data: {},
    paramMap: {
      get: () => null,
    },
  };
}

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

describe('TercerosRelacionadosContenedoraComponent', () => {
  let fixture: ComponentFixture<TercerosRelacionadosContenedoraComponent>;
  let component: TercerosRelacionadosContenedoraComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TercerosRelacionadosContenedoraComponent],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite240121Store, useClass: MockTramite240121Store },
        { provide: Tramite240121Query, useClass: MockTramite240121Query },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    })
      .overrideComponent(TercerosRelacionadosContenedoraComponent, {})
      .compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosContenedoraComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = () => {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getDestinatarioFinalTablaDatos$ = observableOf({});
    component.tramiteQuery.getProveedorTablaDatos$ = observableOf({});
    component.ngOnInit();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});
