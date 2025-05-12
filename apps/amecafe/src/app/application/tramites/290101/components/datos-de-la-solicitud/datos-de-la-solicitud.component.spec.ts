// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { ProductoTablaServicios } from '../../servicios/regiones-compra.service';
import { Router } from '@angular/router';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { TramiteStore } from '../../estados/tramite290101.store';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '../../servicios/catalogos.service';

@Injectable()
class MockProductoTablaServicios {}

@Injectable()
class MockRouter {
  navigate() {}
}

@Injectable()
class MockTramiteStoreQuery {}

@Injectable()
class MockTramiteStore {}

@Injectable()
class MockCatalogosService {}

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

describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: DatosDeLaSolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosDeLaSolicitudComponent], // Move component to imports
      declarations: [TranslatePipe, PhoneNumberPipe, SafeHtmlPipe, MyCustomDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: ProductoTablaServicios, useClass: MockProductoTablaServicios },
        { provide: Router, useClass: MockRouter },
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore,
        { provide: CatalogosService, useClass: MockCatalogosService },
      ],
    })
      .overrideComponent(DatosDeLaSolicitudComponent, {})
      .compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (component) {
      jest.spyOn(component, 'ngOnDestroy'); // Properly spy on ngOnDestroy
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnDestroy()', () => {
    component.subscriptions = [observableOf().subscribe()];
    jest.spyOn(component.subscriptions[0], 'unsubscribe');

    component.ngOnDestroy();
    expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
  });
});
