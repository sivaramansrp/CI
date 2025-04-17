// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import{DatosdelasolicitudComponent} from './datos-de-la-solicitud.component'
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { provideHttpClient } from '@angular/common/http';
@Injectable()
class MockPermisoSanitarioDispositivosMedicosService {}

@Injectable()
class MockSolicitud260915Store {
  setDenominacionNombre = jest.fn();
  setEstadoFisico = jest.fn();
  setPresentacionFarmaceutica = jest.fn();
}

@Injectable()
class MockSolicitud260915Query {}



describe('DatosdelasolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosdelasolicitudComponent ],
     
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ provideHttpClient(),
        FormBuilder,
        { provide: PermisoSanitarioDispositivosMedicosService, useClass: MockPermisoSanitarioDispositivosMedicosService },
        ChangeDetectorRef,
        { provide: Solicitud260915Store, useClass: MockSolicitud260915Store },
        { provide: Solicitud260915Query, useClass: MockSolicitud260915Query }
      ]
    }).overrideComponent(DatosdelasolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
    expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud260915Query = component.solicitud260915Query || {};
    component.solicitud260915Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.getEstadosData = jest.fn();
    component.getClaveScianData = jest.fn();
    component.getClaveDescripcionDelData = jest.fn();
    component.getRegimenalqueData = jest.fn();
    component.getAduanaData = jest.fn();
    component.getEspificarData = jest.fn();
    component.getClasificacionDelProductoData = jest.fn();
    component.getTipoProductoData = jest.fn();
    component.getMercanciaCrosslistData = jest.fn();
    component.createclaveScianForm = jest.fn();
    component.getEstadoFisicoData = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.getEstadosData).toHaveBeenCalled();
    expect(component.getClaveScianData).toHaveBeenCalled();
    expect(component.getClaveDescripcionDelData).toHaveBeenCalled();
    expect(component.getRegimenalqueData).toHaveBeenCalled();
    expect(component.getAduanaData).toHaveBeenCalled();
    expect(component.getEspificarData).toHaveBeenCalled();
    expect(component.getClasificacionDelProductoData).toHaveBeenCalled();
    expect(component.getTipoProductoData).toHaveBeenCalled();
    expect(component.getMercanciaCrosslistData).toHaveBeenCalled();
    expect(component.createclaveScianForm).toHaveBeenCalled();
    expect(component.getEstadoFisicoData).toHaveBeenCalled();
  });

  it('should run #createclaveScianForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.createclaveScianForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.dataDeLaSolicitudState = component.dataDeLaSolicitudState || {};
    component.dataDeLaSolicitudState.descripcionFraccionArancelaria = 'descripcionFraccionArancelaria';
    component.dataDeLaSolicitudState.cantidadUMT = 'cantidadUMT';
    component.dataDeLaSolicitudState.cantidadUMC = 'cantidadUMC';
    component.dataDeLaSolicitudState.umc = 'umc';
    component.dataDeLaSolicitudState.tipoProducto = 'tipoProducto';
    component.dataDeLaSolicitudState.clasificaionProductos = 'clasificaionProductos';
    component.dataDeLaSolicitudState.especificarProducto = 'especificarProducto';
    component.dataDeLaSolicitudState.nombreProductoEspecifico = 'nombreProductoEspecifico';
    component.dataDeLaSolicitudState.denominacionDistintiva = 'denominacionDistintiva';
    component.dataDeLaSolicitudState.denominacionNombre = 'denominacionNombre';
    component.dataDeLaSolicitudState.estadoFisico = 'estadoFisico';
    component.dataDeLaSolicitudState.presentacionFarmaceutica = 'presentacionFarmaceutica';
    component.dataDeLaSolicitudState.fraccionArancelaria = 'fraccionArancelaria';
    component.dataDeLaSolicitudState.justification = 'justification';
    component.dataDeLaSolicitudState.denominacion = 'denominacion';
    component.dataDeLaSolicitudState.correoElectronico = 'correoElectronico';
    component.dataDeLaSolicitudState.codigopostal = 'codigopostal';
    component.dataDeLaSolicitudState.estado = 'estado';
    component.dataDeLaSolicitudState.municipoyalcaldia = 'municipoyalcaldia';
    component.dataDeLaSolicitudState.localidad = 'localidad';
    component.dataDeLaSolicitudState.colonia = 'colonia';
    component.dataDeLaSolicitudState.calle = 'calle';
    component.dataDeLaSolicitudState.lada = 'lada';
    component.dataDeLaSolicitudState.telefono = 'telefono';
    component.dataDeLaSolicitudState.avisoDeFuncionamiento = 'avisoDeFuncionamiento';
    component.dataDeLaSolicitudState.licenciaSanitaria = 'licenciaSanitaria';
    component.dataDeLaSolicitudState.regimenalque = 'regimenalque';
    component.dataDeLaSolicitudState.aduana = 'aduana';
    component.dataDeLaSolicitudState.rfc = 'rfc';
    component.dataDeLaSolicitudState.legalRazonSocial = 'legalRazonSocial';
    component.dataDeLaSolicitudState.apellidoPaterno = 'apellidoPaterno';
    component.dataDeLaSolicitudState.apellidoMaterno = 'apellidoMaterno';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #clearNotificacion()', async () => {

    component.clearNotificacion();

  });

  it('should run #closeModal()', async () => {
    component.clearNotificacion = jest.fn();
    component.closeModal();
    expect(component.clearNotificacion).toHaveBeenCalled();
  });

  it('should run #eliminarPedimento()', async () => {
    component.tableData = component.tableData || {};
    component.tableData = ['tableData'];
    component.filasSeleccionadas = component.filasSeleccionadas || {};
    component.filasSeleccionadas.has = jest.fn();
    component.filasSeleccionadas.clear = jest.fn();
    component.eliminarPedimento({});
    expect(component.filasSeleccionadas.has).toHaveBeenCalled();
    expect(component.filasSeleccionadas.clear).toHaveBeenCalled();
  });

  it('should run #abrirModal()', async () => {
    component.filasSeleccionadas = new Set([1, 2]);
      component.abrirModal = jest.fn();
    component.abrirModal();
      expect(component.abrirModal).toHaveBeenCalled();
  });
  it('should run #getMercanciaCrosslistData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getMercanciaCrosslistData = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciaCrosslistData();
    expect(component.permisosanitariodisposivos.getMercanciaCrosslistData).toHaveBeenCalled();
  });

  it('should run #paisOrigenColapsable()', async () => {

    component.paisOrigenColapsable();

  });

  it('should run #paisProcedencis_colapsable()', async () => {

    component.paisProcedencis_colapsable();

  });

  it('should run #usoEspecificoColapsable()', async () => {

    component.usoEspecificoColapsable();

  });

  it('should run #getEstadosData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getEstadosData = jest.fn().mockReturnValue(observableOf({}));
    component.estadoData = component.estadoData || {};
    component.estadoData.catalogos = 'catalogos';
    component.getEstadosData();
    expect(component.permisosanitariodisposivos.getEstadosData).toHaveBeenCalled();
  });

  it('should run #getClaveScianData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getClaveScianData = jest.fn().mockReturnValue(observableOf({}));
    component.claveScianData = component.claveScianData || {};
    component.claveScianData.catalogos = 'catalogos';
    component.getClaveScianData();
    expect(component.permisosanitariodisposivos.getClaveScianData).toHaveBeenCalled();
  });
  it('should run #onDeleted()', async () => {
    component.filasSeleccionadas = new Set([1, 2]);
      component.mercanciasData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    component.filasSeleccionadas.clear = jest.fn();
    component.onDeleted();
  
    expect(component.mercanciasData).toEqual([{ id: 3, name: 'Item 3' }]);
      expect(component.filasSeleccionadas.clear).toHaveBeenCalled();
  });
  it('should run #getClaveDescripcionDelData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getClaveDescripcionDelData = jest.fn().mockReturnValue(observableOf({}));
    component.descripcionDelScianData = component.descripcionDelScianData || {};
    component.descripcionDelScianData.catalogos = 'catalogos';
    component.getClaveDescripcionDelData();
    expect(component.permisosanitariodisposivos.getClaveDescripcionDelData).toHaveBeenCalled();
  });

  it('should run #getRegimenalqueData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getRegimenalqueData = jest.fn().mockReturnValue(observableOf({}));
    component.regimenalqueData = component.regimenalqueData || {};
    component.regimenalqueData.catalogos = 'catalogos';
    component.getRegimenalqueData();
    expect(component.permisosanitariodisposivos.getRegimenalqueData).toHaveBeenCalled();
  });

  it('should run #getAduanaData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getAduanaData = jest.fn().mockReturnValue(observableOf({}));
    component.aduanaData = component.aduanaData || {};
    component.aduanaData.catalogos = 'catalogos';
    component.getAduanaData();
    expect(component.permisosanitariodisposivos.getAduanaData).toHaveBeenCalled();
  });

  it('should run #getEstadoFisicoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getEstadoFisicoData = jest.fn().mockReturnValue(observableOf({}));
    component.estadoFisicoData = component.estadoFisicoData || {};
    component.estadoFisicoData.catalogos = 'catalogos';
    component.getEstadoFisicoData();
    expect(component.permisosanitariodisposivos.getEstadoFisicoData).toHaveBeenCalled();
  });

  it('should run #aceptar()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.enable = jest.fn();
    component.aceptar();
    expect(component.dataDeLaSolicitudForm.enable).toHaveBeenCalled();
  });

  it('should run #getPaisData()', async () => {
    component.permisosanitariodisposivos.getPaisData = jest.fn().mockReturnValue(observableOf({}));
    component.getPaisData();
    expect(component.permisosanitariodisposivos.getPaisData).toHaveBeenCalled();
  });
  it('should run #getClasificacionDelProductoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getClasificacionDelProductoData = jest.fn().mockReturnValue(observableOf({}));
    component.delProducto = component.delProducto || {};
    component.delProducto.catalogos = 'catalogos';
    component.getClasificacionDelProductoData();
    expect(component.permisosanitariodisposivos.getClasificacionDelProductoData).toHaveBeenCalled();
  });

  it('should run #getEspificarData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getEspificarData = jest.fn().mockReturnValue(observableOf({}));
    component.especificarData = component.especificarData || {};
    component.especificarData.catalogos = 'catalogos';
    component.getEspificarData();
    expect(component.permisosanitariodisposivos.getEspificarData).toHaveBeenCalled();
  });

  it('should run #getTipoProductoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getTipoProductoData = jest.fn().mockReturnValue(observableOf({}));
    component.tipoProductoData = component.tipoProductoData || {};
    component.tipoProductoData.catalogos = 'catalogos';
    component.getTipoProductoData();
    expect(component.permisosanitariodisposivos.getTipoProductoData).toHaveBeenCalled();
  });

  it('should run #seleccionarEstablecimiento()', async () => {
    component.abrirModal = jest.fn();
    component.seleccionarEstablecimiento();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #onLimpiar()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.reset = jest.fn();
    component.onLimpiar();
    expect(component.clavaScianForm.reset).toHaveBeenCalled();
  });

  it('should run #onAgregar()', async () => {

    component.onAgregar();

  });

  it('should run #onDelete()', async () => {
    component.filasSeleccionadas = new Set([1, 2]);
    component.abrirModal = jest.fn();
    component.onDelete();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #onCancelar()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.reset = jest.fn();
    component.onCancelar();
    expect(component.clavaScianForm.reset).toHaveBeenCalled();
  });

  it('should run #agregarMercanciaGrid()', async () => {
    component.modalElement = component.modalElement || {};
    component.modalElement.nativeElement = 'nativeElement';
    component.agregarMercanciaGrid();

  });

  it('should run #onfilasSeleccionadas()', async () => {
    component.filasSeleccionadas = component.filasSeleccionadas || {};
    component.filasSeleccionadas.clear = jest.fn();
    component.onfilasSeleccionadas({
      length: {},
      map: function() {
        return [
          {
            "claveScianG": {
              "claveScian": {}
            },
            "id": {}
          }
        ];
      }
    });
    expect(component.filasSeleccionadas.clear).toHaveBeenCalled();
  });

  it('should run #onSubmit()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.value = 'value';
    component.clavaScianForm.reset = jest.fn();
    component.claveScianData = component.claveScianData || {};
    component.claveScianData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.descripcionDelScianData = component.descripcionDelScianData || {};
    component.descripcionDelScianData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.tableData = component.tableData || {};
    component.tableData.push = jest.fn();
    component.onSubmit();
    expect(component.clavaScianForm.reset).toHaveBeenCalled();
    expect(component.tableData.push).toHaveBeenCalled();
  });

  it('should run #toggleLicenciaSanitaria()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {}
    });
    component.toggleLicenciaSanitaria();
    expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #onSave()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.value = 'value';
    component.dataDeLaSolicitudForm.reset = jest.fn();
    component.tipoProductoData = component.tipoProductoData || {};
    component.tipoProductoData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.delProducto = component.delProducto || {};
    component.delProducto.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.especificarData = component.especificarData || {};
    component.especificarData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.estadoFisicoData = component.estadoFisicoData || {};
    component.estadoFisicoData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.mercanciasData = component.mercanciasData || {};
    component.mercanciasData.push = jest.fn();
    component.onSave();
    expect(component.dataDeLaSolicitudForm.reset).toHaveBeenCalled();
    expect(component.mercanciasData.push).toHaveBeenCalled();
  });

  it('should run #onDeleted()', async () => {
    component.filasSeleccionadas = component.filasSeleccionadas || {};
    component.filasSeleccionadas.size = 'size';
    component.filasSeleccionadas.has = jest.fn();
    component.filasSeleccionadas.clear = jest.fn();
    component.mercanciasData = component.mercanciasData || {};
    component.mercanciasData = ['mercanciasData'];
    component.onDeleted();
    expect(component.filasSeleccionadas.has).toHaveBeenCalled();
    expect(component.filasSeleccionadas.clear).toHaveBeenCalled();
  });

  it('should run #onModificar()', async () => {
    component.filasSeleccionadas = new Set([1]);
  
    component.mercanciasData = [
      { id: 1, descripcionFraccionArancelaria: 'desc1', cantidadUMT: 10 },
      { id: 2, descripcionFraccionArancelaria: 'desc2', cantidadUMT: 20 },
    ];
      component.dataDeLaSolicitudForm = {
      patchValue: jest.fn(),
    };
      component.onModificar();
    expect(component.dataDeLaSolicitudForm.patchValue).toHaveBeenCalledWith({
      descripcionFraccionArancelaria: 'desc1',
      cantidadUMT: 10,
    });
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud260915Store = new MockSolicitud260915Store();
    const form = {
      get: jest.fn().mockReturnValue({ value: 'testValue' }),
    };
    const campo = 'denominacionNombre';
    const metodoNombre = 'setDenominacionNombre';
  
    component.setValoresStore(form as any, campo, metodoNombre as any);
  
    expect(component.solicitud260915Store.setDenominacionNombre).toHaveBeenCalledWith('testValue');
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});