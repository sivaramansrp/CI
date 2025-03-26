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
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AnexoUnoComponent } from './anexo-uno.component';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Injectable()
class MockRouter {
  navigate() {}
}

describe('AnexoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: 'url', params: {}, queryParams: {}, data: {} },
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({}),
          },
        },
      ],
    })
      .overrideComponent(AnexoUnoComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(AnexoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #crearFormularioAnexoUno()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormularioAnexoUno();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #crearFormularioAnexoDos()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormularioAnexoDos();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #eliminarAnexoUno()', async () => {
    component.anexoUnoTablaLista = component.anexoUnoTablaLista || {};
    component.anexoUnoTablaLista = ['anexoUnoTablaLista'];
    component.obtenerAnexoUnoDevolverLaLlamada =
      component.obtenerAnexoUnoDevolverLaLlamada || {};
    component.obtenerAnexoUnoDevolverLaLlamada.emit = jest.fn();
    component.eliminarAnexoUno();
    expect(component.obtenerAnexoUnoDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #eliminarAnexoDos()', async () => {
    component.anexoDosTablaLista = component.anexoDosTablaLista || {};
    component.anexoDosTablaLista = ['anexoDosTablaLista'];
    component.obtenerAnexoDosDevolverLaLlamada =
      component.obtenerAnexoDosDevolverLaLlamada || {};
    component.obtenerAnexoDosDevolverLaLlamada.emit = jest.fn();
    component.eliminarAnexoDos();
    expect(component.obtenerAnexoDosDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #agregarAnexoUno()', async () => {
    component.anexoUnoFormGroup = component.anexoUnoFormGroup || {};
    component.anexoUnoFormGroup.get = jest.fn().mockReturnValue({
      value: {},
    });
    component.anexoUnoFormGroup.reset = jest.fn();
    component.anexoUnoTablaLista = component.anexoUnoTablaLista || {};
    component.anexoUnoTablaLista.push = jest.fn();
    component.obtenerAnexoUnoDevolverLaLlamada =
      component.obtenerAnexoUnoDevolverLaLlamada || {};
    component.obtenerAnexoUnoDevolverLaLlamada.emit = jest.fn();
    component.agregarAnexoUno();
    expect(component.anexoUnoFormGroup.get).toHaveBeenCalled();
    // expect(component.anexoUnoFormGroup.reset).toHaveBeenCalled();
    // expect(component.anexoUnoTablaLista.push).toHaveBeenCalled();
    // expect(component.obtenerAnexoUnoDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #agregarAnexoDos()', async () => {
    component.anexoDosFormGroup = component.anexoDosFormGroup || {};
    component.anexoDosFormGroup.get = jest.fn().mockReturnValue({
      value: {},
    });
    component.anexoDosTablaLista = component.anexoDosTablaLista || {};
    component.anexoDosTablaLista.push = jest.fn();
    component.obtenerAnexoDosDevolverLaLlamada =
      component.obtenerAnexoDosDevolverLaLlamada || {};
    component.obtenerAnexoDosDevolverLaLlamada.emit = jest.fn();
    component.anexoUnoFormGroup = component.anexoUnoFormGroup || {};
    component.anexoUnoFormGroup.reset = jest.fn();
    component.agregarAnexoDos();
    expect(component.anexoDosFormGroup.get).toHaveBeenCalled();
  });

  it('should run #setRuta()', async () => {
    component.rutaLaFraccionDeComplemento =
      component.rutaLaFraccionDeComplemento || {};
    component.rutaLaFraccionDeComplemento.emit = jest.fn();
    component.setRuta({});
    expect(component.rutaLaFraccionDeComplemento.emit).toHaveBeenCalled();
  });
});
