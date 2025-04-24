// @ts-nocheck
import { isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Directive, Injectable, Input, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Tramite240107Store } from '../../estados/tramite240107Store.store';
import { AgregarProveedorContenedoraComponent } from './agregar-proveedor-contenedora.component';

@Injectable()
class MockTramite240107Store {
  updateProveedorTablaDatos = jest.fn();
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('AgregarProveedorContenedoraComponent', () => {
  let fixture: ComponentFixture<AgregarProveedorContenedoraComponent>;
  let component: AgregarProveedorContenedoraComponent;
  let mockStore: MockTramite240107Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        AgregarProveedorContenedoraComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite240107Store, useClass: MockTramite240107Store },  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorContenedoraComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Tramite240107Store); 
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = () => {}; 
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run #updateProveedorTablaDatos()', () => {
    const mockData = {};
    component.updateProveedorTablaDatos(mockData);
    expect(mockStore.updateProveedorTablaDatos).toHaveBeenCalledWith(mockData);
  });
});
