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

  describe('#ngOnInit', () => {
    it('should disable forms if formularioDeshabilitado is true', () => {
      component.formularioDeshabilitado = true;
      component.ngOnInit();
      expect(component.anexoUnoFormGroup.disabled).toBe(true);
      expect(component.anexoDosFormGroup.disabled).toBe(true);
    });

    it('should not disable forms if formularioDeshabilitado is false', () => {
      component.formularioDeshabilitado = false;
      component.ngOnInit();
      expect(component.anexoUnoFormGroup.enabled).toBe(true);
      expect(component.anexoDosFormGroup.enabled).toBe(true);
    });
  });

  it('should filter and emit anexoUnoTablaLista in eliminarAnexoUno', () => {
    const emitSpy = jest.spyOn(component.obtenerAnexoUnoDevolverLaLlamada, 'emit');
    component.anexoUnoTablaLista = [{ estatus: false }, { estatus: true }] as any;
    component.eliminarAnexoUno();
    expect(component.anexoUnoTablaLista.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(component.anexoUnoTablaLista);
  });

  it('should filter and emit anexoDosTablaLista in eliminarAnexoDos', () => {
    const emitSpy = jest.spyOn(component.obtenerAnexoDosDevolverLaLlamada, 'emit');
    component.anexoDosTablaLista = [{ estatus: false }, { estatus: true }] as any;
    component.eliminarAnexoDos();
    expect(component.anexoDosTablaLista.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(component.anexoDosTablaLista);
  });

  it('should add entry to anexoUnoTablaLista and emit it', () => {
    const emitSpy = jest.spyOn(component.obtenerAnexoUnoDevolverLaLlamada, 'emit');
    component.anexoUnoFormGroup.setValue({
      fraccionArancelaria: '0101',
      descripcion: 'desc',
    });
    component.anexoUnoTablaLista = [];
    component.agregarAnexoUno();
    expect(component.anexoUnoTablaLista.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(component.anexoUnoTablaLista);
    expect(component.anexoUnoFormGroup.value.fraccionArancelaria).toBeFalsy();
  });

  it('should add entry to anexoDosTablaLista and emit it', () => {
    const emitSpy = jest.spyOn(component.obtenerAnexoDosDevolverLaLlamada, 'emit');
    component.anexoDosFormGroup.setValue({
      fraccionArancelaria: '0102',
      descripcion: 'desc 2',
    });
    component.anexoDosTablaLista = [];
    component.agregarAnexoDos();
    expect(component.anexoDosTablaLista.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(component.anexoDosTablaLista);
    expect(component.anexoDosFormGroup.value.fraccionArancelaria).toBeFalsy();
  });

  it('should set selected import item on setAnexoUnoLista', () => {
    const mockItem = { encabezadoFraccion: '0103' } as any;
    component.setAnexoUnoLista(mockItem);
    expect(component.datosImportacionSeleccionados).toEqual(mockItem);
  });

  it('should set selected export item on setAnexoDosLista', () => {
    const mockItem = { encabezadoFraccion: '0104' } as any;
    component.setAnexoDosLista(mockItem);
    expect(component.datosExportacionSeleccionados).toEqual(mockItem);
  });

  it('should emit rutaLaFraccionDeComplemento with correct payload on setRuta IMPORT', () => {
    const emitSpy = jest.spyOn(component.rutaLaFraccionDeComplemento, 'emit');
    const mockImport = { encabezadoFraccion: '0001' } as any;
    component.datosImportacionSeleccionados = mockImport;
    component.setRuta('some-name', 'IMPORT');
    expect(emitSpy).toHaveBeenCalledWith({
      catagoria: 'some-name',
      id: 'IMPORT',
      datos: mockImport,
    });
  });

  it('should emit rutaLaFraccionDeComplemento with correct payload on setRuta EXPORT', () => {
    const emitSpy = jest.spyOn(component.rutaLaFraccionDeComplemento, 'emit');
    const mockExport = { encabezadoFraccion: '0002' } as any;
    component.datosExportacionSeleccionados = mockExport;
    component.setRuta('other-name', 'EXPORT');
    expect(emitSpy).toHaveBeenCalledWith({
      catagoria: 'other-name',
      id: 'EXPORT',
      datos: mockExport,
    });
  });
});
