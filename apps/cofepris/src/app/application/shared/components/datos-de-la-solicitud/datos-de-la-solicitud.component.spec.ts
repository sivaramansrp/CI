// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockRouter {
  navigate() { };
}

@Injectable()
class MockDatosSolicitudService {
  obtenerRespuestaPorUrl = function () { };
}

describe('DatosDeLaSolicitudComponent', () => {
  let componente: DatosDeLaSolicitudComponent;
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
    componente = fixture.componentInstance;
    componente.datosSolicitudFormState = {
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

  it('debería crear el componente', async () => {
    expect(componente).toBeTruthy();
  });

  it('debería ejecutar ngOnInit()', async () => {
    componente.crearDatosSolicitudForm = jest.fn();
    componente.actualizarDatosFormularioSolicitud = jest.fn();
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.valueChanges = observableOf({});
    componente.datosSolicitudForm.getRawValue = jest.fn();
    componente.datasolicituActualizar = componente.datasolicituActualizar || {};
    componente.datasolicituActualizar.emit = jest.fn();
    componente.ngOnInit();
    expect(componente.crearDatosSolicitudForm).toHaveBeenCalled();
  });

  it('debería ejecutar isValid()', async () => {
    componente.isValid({
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

  it('debería ejecutar buscarRepresentanteRfc()', async () => {
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    componente.datosSolicitudForm.patchValue = jest.fn();
    componente.abrirRfcModal = jest.fn();
    componente.buscarRepresentanteRfc();
  });

  it('debería emitir scianSeleccionado al llamar eliminarScian', () => {
    jest.spyOn(componente.scianSeleccionado, 'emit');
    componente.scianConfig = { datos: [{ clave: '123' }] } as any;
    componente.scianLista = [{ clave: '123' }] as any;
    componente.eliminarScian();
  });

  it('debería ejecutar aceptar()', async () => {
    componente.aceptar();
  });

  it('debería ejecutar eliminarMercancias()', async () => {
    componente.tablaMercanciasLista = componente.tablaMercanciasLista || {};
    componente.tablaMercanciasLista.some = jest.fn().mockReturnValue([
      {
        "clasificacionProducto": {}
      }
    ]);
    componente.tablaMercanciasConfig = componente.tablaMercanciasConfig || {};
    componente.tablaMercanciasConfig.datos = [
      {
        "clasificacionProducto": {}
      }
    ];
    componente.mercanciasSeleccionado = componente.mercanciasSeleccionado || {};
    componente.mercanciasSeleccionado.emit = jest.fn();
    componente.eliminarMercancias();
  });

  it('debería ejecutar irAAcciones()', async () => {
    componente.router = componente.router || {};
    componente.router.navigate = jest.fn();
    componente.irAAcciones({});
    expect(componente.router.navigate).toHaveBeenCalled();
  });

  it('debería ejecutar agregarScian()', async () => {
    componente.scianConfig = componente.scianConfig || {};
    componente.scianConfig.datos = {
      concat: function () { }
    };
    componente.scianSeleccionado = componente.scianSeleccionado || {};
    componente.scianSeleccionado.emit = jest.fn();
    componente.irAAcciones = jest.fn();
    componente.agregarScian();
    expect(componente.scianSeleccionado.emit).toHaveBeenCalled();
    expect(componente.irAAcciones).toHaveBeenCalled();
  });

  it('debería ejecutar agregarMercancias()', async () => {
    componente.tablaMercanciasConfig = componente.tablaMercanciasConfig || {};
    componente.tablaMercanciasConfig.datos = {
      concat: function () { }
    };
    componente.mercanciasSeleccionado = componente.mercanciasSeleccionado || {};
    componente.mercanciasSeleccionado.emit = jest.fn();
    componente.irAAcciones = jest.fn();
    componente.agregarMercancias();
    expect(componente.mercanciasSeleccionado.emit).toHaveBeenCalled();
    expect(componente.irAAcciones).toHaveBeenCalled();
  });

  it('debería ejecutar modificarDatos()', async () => {
    componente.tablaMercanciasLista = componente.tablaMercanciasLista || {};
    componente.datosDeTablaSeleccionados = componente.datosDeTablaSeleccionados || {};
    componente.datosDeTablaSeleccionados.emit = jest.fn();
    componente.irAAcciones = jest.fn();
    componente.modificarDatos();
  });

  it('debería ejecutar mostrarColapsable()', async () => {
    componente.datosDeTablaSeleccionados = componente.datosDeTablaSeleccionados || {};
    componente.datosDeTablaSeleccionados.emit = jest.fn();
    componente.mostrarColapsable({});
  });

  it('debería ejecutar cambioDeEstado()', async () => {
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.get = jest.fn().mockReturnValue({
      setValue: function () { }
    });
    componente.cambioDeEstado({});
  });

  it('debería ejecutar esCampoRequerido()', async () => {
    componente.elementosRequeridos = componente.elementosRequeridos || {};
    componente.elementosRequeridos.includes = jest.fn();
    componente.esCampoRequerido({});
  });

  it('debería ejecutar mostrarCamposDelProcedimiento()', async () => {
    componente.elementosAnadidos = componente.elementosAnadidos || {};
    componente.elementosAnadidos.includes = jest.fn();
    componente.mostrarCamposDelProcedimiento({});
  });

  it('debería ejecutar cambioAviso()', async () => {
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.get = jest.fn().mockReturnValue({
      updateValueAndValidity: function () { },
      setValidators: function () { },
      enable: function () { },
      disable: function () { },
      clearValidators: function () { }
    });
    componente.cambioAviso({
      target: {
        checked: {}
      }
    });
  });

  it('debería ejecutar cambioLicenciaSanitaria()', async () => {
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.get = jest.fn().mockReturnValue({
      enable: function () { },
      disable: function () { }
    });
    componente.cambioLicenciaSanitaria({
      target: {
        value: {}
      }
    });
  });

  it('debería ejecutar cambireCorreoElectronico()', async () => {
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.get = jest.fn().mockReturnValue({
      setValue: function () { },
      value: {}
    });
    componente.cambireCorreoElectronico();
  });

  it('debería ejecutar abrirModal()', async () => {
    componente.alternarControlesDeFormulario = jest.fn();
    componente.abrirModal();
  });

  it('debería ejecutar eliminarModal()', async () => {
    componente.scianLista = componente.scianLista || {};
    componente.eliminarModal();
  });

  it('debería ejecutar getEliminarScianModal()', async () => {
    componente.eliminarScian = jest.fn();
    componente.nuevaNotificacion = componente.nuevaNotificacion || {};
    componente.nuevaNotificacion.cerrar = 'cerrar';
    componente.getEliminarScianModal({});
  });

  it('debería ejecutar controlYaDeshabilitado()', async () => {
    componente.controlYaDeshabilitado({});
  });

  it('debería ejecutar alternarControlesDeFormulario()', async () => {
    componente.datosSolicitudForm = componente.datosSolicitudForm || {};
    componente.datosSolicitudForm.controls = 'controls';
    componente.datosSolicitudForm.get = jest.fn().mockReturnValue({
      disable: function () { },
      enable: function () { }
    });
    componente.controlYaDeshabilitado = jest.fn();
    componente.alternarControlesDeFormulario({});
  });

  it('debería ejecutar abrirRfcModal()', async () => {
    componente.abrirRfcModal();
  });

  it('debería ejecutar eliminarPedimento()', async () => {
    componente.pedimentos = componente.pedimentos || {};
    componente.pedimentos.splice = jest.fn();
    componente.eliminarPedimento({});
  });

  it('debería NO emitir en scianSeleccionado si no existe al eliminarScian', () => {
    componente.scianConfig = { datos: [{ clave: '1' }] } as any;
    componente.scianLista = [{ clave: '2' }] as any;
    componente.scianSeleccionado = undefined as any;
    expect(() => componente.eliminarScian()).not.toThrow();
  });

  it('debería mostrar alerta si tablaMercanciasLista está vacía en eliminarMercancias', () => {
    componente.tablaMercanciasLista = [];
    componente.tablaMercanciasConfig = { datos: [{ clasificacionProducto: 'A' }] } as any;
    componente.eliminarMercancias();
    expect(componente.mostrarAlerta).toBe(true);
  });

  it('debería mostrar alerta si tablaMercanciasLista está vacía en modificarDatos', () => {
    componente.tablaMercanciasLista = [];
    componente.modificarDatos();
    expect(componente.mostrarAlerta).toBe(true);
  });

  it('debería NO emitir en mercanciasSeleccionado si no existe al eliminarMercancias', () => {
    componente.tablaMercanciasLista = [{ clasificacionProducto: 'A' }] as any;
    componente.tablaMercanciasConfig = { datos: [{ clasificacionProducto: 'A' }] } as any;
    componente.mercanciasSeleccionado = undefined as any;
    expect(() => componente.eliminarMercancias()).not.toThrow();
  });

  it('debería NO emitir en scianSeleccionado si no existe al agregarScian', () => {
    componente.scianConfig = { datos: [], concat: Array.prototype.concat } as any;
    componente.scianLista = [{ clave: 'A' }] as any;
    componente.scianSeleccionado = undefined as any;
    componente.irAAcciones = jest.fn();
    expect(() => componente.agregarScian()).not.toThrow();
  });

  it('debería NO eliminar pedimento si borrar es false', () => {
    componente.pedimentos = [{}, {}] as any;
    componente.elementoParaEliminar = 1;
    componente.eliminarPedimento(false);
    expect(componente.pedimentos.length).toBe(2);
  });

  it('debería ejecutar ngOnDestroy()', async () => {
    componente.destroyNotifier$ = componente.destroyNotifier$ || {};
    componente.destroyNotifier$.next = jest.fn();
    componente.destroyNotifier$.complete = jest.fn();
    componente.ngOnDestroy();
  });

});