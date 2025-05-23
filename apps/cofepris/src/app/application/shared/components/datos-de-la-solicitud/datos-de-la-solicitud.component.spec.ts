// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockDatosSolicitudService {
  obtenerRespuestaPorUrl = function() {};
}

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
 beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatosDeLaSolicitudComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
        AlertComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },
      ],
    }).compileComponents();
   fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.datosSolicitudFormState = {
      rfcSanitario: '',
      denominacionRazon: '',
      correoElectronico: '',
      codigoPostal: '',
      estado: '',
      municipioAlcaldia: '',
      localidad: '',
      colonia: '',
      calle: '',
      lada: '',
      telefono: '',
      aviso: '',
      licenciaSanitaria: '',
      regimen: '',
      adunasDeEntradas: '',
      aeropuerto: false,
      publico: '',
      representanteRfc: '',
      representanteNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    };
    fixture.detectChanges();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.crearDatosSolicitudForm = jest.fn();
    component.actualizarDatosFormularioSolicitud = jest.fn();
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.valueChanges = observableOf({});
    component.datosSolicitudForm.getRawValue = jest.fn();
    component.datasolicituActualizar = component.datasolicituActualizar || {};
    component.datasolicituActualizar.emit = jest.fn();
    component.ngOnInit();
    expect(component.crearDatosSolicitudForm).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {

    component.isValid({
      controls: {
        campo: {
          errors: {},
          touched: {}
        }
      },
      errors: {},
      touched: {}
    }, {});

  });

  it('should run #buscarRepresentanteRfc()', async () => {
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.datosSolicitudForm.patchValue = jest.fn();
    component.abrirRfcModal = jest.fn();
    component.buscarRepresentanteRfc();
  
  });

  it('should emit scianSeleccionado when eliminarScian is called', () => {
    jest.spyOn(component.scianSeleccionado, 'emit');
    component.scianConfig = { datos: [{ clave: '123' }] } as any;
    component.scianLista = [{ clave: '123' }] as any;
    component.eliminarScian();
  });

  it('should run #aceptar()', async () => {

    component.aceptar();

  });

  it('should run #eliminarMercancias()', async () => {
    component.tablaMercanciasLista = component.tablaMercanciasLista || {};
    component.tablaMercanciasLista.some = jest.fn().mockReturnValue([
      {
        "clasificacionProducto": {}
      }
    ]);
    component.tablaMercanciasConfig = component.tablaMercanciasConfig || {};
    component.tablaMercanciasConfig.datos = [
      {
        "clasificacionProducto": {}
      }
    ];
    component.mercanciasSeleccionado = component.mercanciasSeleccionado || {};
    component.mercanciasSeleccionado.emit = jest.fn();
    component.eliminarMercancias();

  });

  it('should run #irAAcciones()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.irAAcciones({});
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #agregarScian()', async () => {
    component.scianConfig = component.scianConfig || {};
    component.scianConfig.datos = {
      concat: function() {}
    };
    component.scianSeleccionado = component.scianSeleccionado || {};
    component.scianSeleccionado.emit = jest.fn();
    component.irAAcciones = jest.fn();
    component.agregarScian();
    expect(component.scianSeleccionado.emit).toHaveBeenCalled();
    expect(component.irAAcciones).toHaveBeenCalled();
  });

  it('should run #agregarMercancias()', async () => {
    component.tablaMercanciasConfig = component.tablaMercanciasConfig || {};
    component.tablaMercanciasConfig.datos = {
      concat: function() {}
    };
    component.mercanciasSeleccionado = component.mercanciasSeleccionado || {};
    component.mercanciasSeleccionado.emit = jest.fn();
    component.irAAcciones = jest.fn();
    component.agregarMercancias();
    expect(component.mercanciasSeleccionado.emit).toHaveBeenCalled();
    expect(component.irAAcciones).toHaveBeenCalled();
  });

  it('should run #modificarDatos()', async () => {
    component.tablaMercanciasLista = component.tablaMercanciasLista || {};
    component.datosDeTablaSeleccionados = component.datosDeTablaSeleccionados || {};
    component.datosDeTablaSeleccionados.emit = jest.fn();
    component.irAAcciones = jest.fn();
    component.modificarDatos();
  });

  it('should run #mostrarColapsable()', async () => {
    component.datosDeTablaSeleccionados = component.datosDeTablaSeleccionados || {};
    component.datosDeTablaSeleccionados.emit = jest.fn();
    component.mostrarColapsable({});
  });

  it('should run #cambioDeEstado()', async () => {
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.cambioDeEstado({});
  });

  it('should run #esCampoRequerido()', async () => {
    component.elementosRequeridos = component.elementosRequeridos || {};
    component.elementosRequeridos.includes = jest.fn();
    component.esCampoRequerido({});
  });

  it('should run #mostrarCamposDelProcedimiento()', async () => {
    component.elementosAnadidos = component.elementosAnadidos || {};
    component.elementosAnadidos.includes = jest.fn();
    component.mostrarCamposDelProcedimiento({});
  });

  it('should run #cambioAviso()', async () => {
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.get = jest.fn().mockReturnValue({
      updateValueAndValidity: function() {},
      setValidators: function() {},
      enable: function() {},
      disable: function() {},
      clearValidators: function() {}
    });
    component.cambioAviso({
      target: {
        checked: {}
      }
    });
  });

  it('should run #cambioLicenciaSanitaria()', async () => {
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {}
    });
    component.cambioLicenciaSanitaria({
      target: {
        value: {}
      }
    });
  });

  it('should run #cambireCorreoElectronico()', async () => {
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.get = jest.fn().mockReturnValue({
      setValue: function() {},
      value: {}
    });
    component.cambireCorreoElectronico();
  });

  it('should run #abrirModal()', async () => {
    component.alternarControlesDeFormulario = jest.fn();
    component.abrirModal();
  });

  it('should run #eliminarModal()', async () => {
    component.scianLista = component.scianLista || {};
    component.eliminarModal();

  });

  it('should run #getEliminarScianModal()', async () => {
    component.eliminarScian = jest.fn();
    component.nuevaNotificacion = component.nuevaNotificacion || {};
    component.nuevaNotificacion.cerrar = 'cerrar';
    component.getEliminarScianModal({});
  });

  it('should run #controlYaDeshabilitado()', async () => {

    component.controlYaDeshabilitado({});

  });

  it('should run #alternarControlesDeFormulario()', async () => {
    component.datosSolicitudForm = component.datosSolicitudForm || {};
    component.datosSolicitudForm.controls = 'controls';
    component.datosSolicitudForm.get = jest.fn().mockReturnValue({
      disable: function() {},
      enable: function() {}
    });
    component.controlYaDeshabilitado = jest.fn();
    component.alternarControlesDeFormulario({});
  });

  it('should run #abrirRfcModal()', async () => {

    component.abrirRfcModal();

  });

  it('should run #eliminarPedimento()', async () => {
    component.pedimentos = component.pedimentos || {};
    component.pedimentos.splice = jest.fn();
    component.eliminarPedimento({});
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });

});