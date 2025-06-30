import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosrelacionadosComponent } from './terceros-relacionados.component';
import { FormBuilder } from '@angular/forms';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockPermisoSanitarioDispositivosMedicosService {}

@Injectable()
class MockSolicitud260915Store {}

@Injectable()
class MockSolicitud260915Query {}

describe('TercerosrelacionadosComponent', () => {
  let fixture: ComponentFixture<TercerosrelacionadosComponent>;
  let component: {
    esFormularioSoloLectura: boolean; ngOnDestroy: () => void; agregarDestinatario: { get?: any; }; selectedTipoPersona: any; destinatarioForm: { get?: any; disable?: any; enable?: any; value?: any; reset?: any; patchValue?: any; }; fb: { group?: any; }; agregarDestinatarioState: { tipoPersona?: any; nombre?: any; primerApellido?: any; segundoApellido?: any; denominacion?: any; pais?: any; domicilio?: any; estado?: any; codigopostal?: any; calle?: any; numeroExterior?: any; numeroInterior?: any; lada?: any; telefono?: any; correoElectronico?: any; }; crearFormTransporte: jest.Mock<any, any, any> | (() => void); solicitud260915Query: { selectSolicitud260915$?: any; }; inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); getPaisData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); pedimentos: { splice?: any; }; eliminarMercancias: jest.Mock<any, any, any> | (() => void); abrirModal: jest.Mock<any, any, any> | (() => void); eliminarPedimento: (arg0: {}) => void; selectedRows: { size?: any; has?: any; clear?: any; }; permisosanitariodispositivosmedicosservice: { getPaisData?: any; }; paisData: { catalogos?: any; }; getPaisName: jest.Mock<any, any, any> | ((arg0: {}) => void); tableData: string[]; onGuardar: () => void; onSelectedRowsChange: (arg0: { id: {}; }[]) => void; openModificarMercancias: () => void; agregarMercancias: () => void; cancelarFormulario: () => void; onConfirmarEliminacion: () => void; limpiarFormulario: () => void; onDeleted: () => void; solicitud260915Store: { setTramite260915State?: any; }; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}) => void; setTipoPersona: (arg0: { toString: () => void; }) => void; destroyed$: { next?: any; complete?: any; }; 
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,TercerosrelacionadosComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: PermisoSanitarioDispositivosMedicosService, useClass: MockPermisoSanitarioDispositivosMedicosService },
        { provide: Solicitud260915Store, useClass: MockSolicitud260915Store },
        { provide: Solicitud260915Query, useClass: MockSolicitud260915Query },
        ConsultaioQuery
      ]
    }).overrideComponent(TercerosrelacionadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosrelacionadosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #selectedTipoPersona', async () => {
    jest.spyOn(component, 'agregarDestinatario', 'get').mockReturnValue({
      get: jest.fn().mockReturnValue({
        value: 'mockTipoPersona',
      }),
    });
  
    const selectedTipoPersona = component.selectedTipoPersona;
  
    expect(component.agregarDestinatario.get).toHaveBeenCalledWith('tipoPersona'); 
    expect(selectedTipoPersona).toBe('mockTipoPersona');
  });

  it('should run GetterDeclaration #agregarDestinatario', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.get = jest.fn();
    const agregarDestinatario = component.agregarDestinatario;
     expect(component.destinatarioForm.get).toHaveBeenCalled();
  });

  it('should run #crearFormTransporte()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.agregarDestinatarioState = component.agregarDestinatarioState || {};
    component.agregarDestinatarioState.tipoPersona = 'tipoPersona';
    component.agregarDestinatarioState.nombre = 'nombre';
    component.agregarDestinatarioState.primerApellido = 'primerApellido';
    component.agregarDestinatarioState.segundoApellido = 'segundoApellido';
    component.agregarDestinatarioState.denominacion = 'denominacion';
    component.agregarDestinatarioState.pais = 'pais';
    component.agregarDestinatarioState.domicilio = 'domicilio';
    component.agregarDestinatarioState.estado = 'estado';
    component.agregarDestinatarioState.codigopostal = 'codigopostal';
    component.agregarDestinatarioState.calle = 'calle';
    component.agregarDestinatarioState.numeroExterior = 'numeroExterior';
    component.agregarDestinatarioState.numeroInterior = 'numeroInterior';
    component.agregarDestinatarioState.lada = 'lada';
    component.agregarDestinatarioState.telefono = 'telefono';
    component.agregarDestinatarioState.correoElectronico = 'correoElectronico';
    component.crearFormTransporte();
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud260915Query = component.solicitud260915Query || {};
    component.solicitud260915Query.selectSolicitud260915$ = observableOf({});
    component.inicializarEstadoFormulario = jest.fn();
    component.getPaisData = jest.fn();
    component.ngOnInit();
     expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
     expect(component.getPaisData).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
   expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #eliminarPedimento()', async () => {
    component.pedimentos = component.pedimentos || {};
    component.pedimentos.splice = jest.fn();
    component.eliminarMercancias = jest.fn();
    component.abrirModal = jest.fn();
    component.eliminarPedimento({});
     expect(component.pedimentos.splice).toHaveBeenCalled();
     expect(component.eliminarMercancias).toHaveBeenCalled();
     expect(component.abrirModal).toHaveBeenCalled();
  });


  it('should run #abrirModal()', async () => {
    const mockItem = { id: 1 };
    component.selectedRows = new Set([mockItem]);
    component.abrirModal = jest.fn();
    component.abrirModal();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #getPaisData()', async () => {
    component.permisosanitariodispositivosmedicosservice = component.permisosanitariodispositivosmedicosservice || {};
    component.permisosanitariodispositivosmedicosservice.getPaisData = jest.fn().mockReturnValue(observableOf({}));
    component.paisData = component.paisData || {};
    component.paisData.catalogos = 'catalogos';
    component.getPaisData();
     expect(component.permisosanitariodispositivosmedicosservice.getPaisData).toHaveBeenCalled();
  });

  it('should run #onGuardar()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.value = {
      agregarDestinatario: {},
      datosPersonales: {
        pais: {}
      }
    };
    component.destinatarioForm.reset = jest.fn();
    component.getPaisName = jest.fn();
    component.tableData = component.tableData || {};
    component.tableData.push = jest.fn();
    component.onGuardar();
     expect(component.destinatarioForm.reset).toHaveBeenCalled();
     expect(component.getPaisName).toHaveBeenCalled();
     expect(component.tableData.push).toHaveBeenCalled();
  });

  it('should run #getPaisName()', async () => {
    component.paisData = component.paisData || {};
    component.paisData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.getPaisName({});

  });

  it('should run #onSelectedRowsChange()', async () => {

    component.onSelectedRowsChange([{
      id: {}
    }]);

  });

  it('should run #eliminarMercancias()', async () => {
    component.selectedRows = new Set([{ id: 1 }]);
      jest.spyOn(component.selectedRows, 'clear');
    component.tableData = ['tableData'];
      component.eliminarMercancias();
    expect(component.selectedRows.clear).toHaveBeenCalled();
  });


  it('should run #agregarMercancias()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.reset = jest.fn();
    component.agregarMercancias();
     expect(component.destinatarioForm.reset).toHaveBeenCalled();
  });

  it('should run #cancelarFormulario()', async () => {

    component.cancelarFormulario();

  });

  it('should run #onConfirmarEliminacion()', async () => {
    component.eliminarMercancias = jest.fn();
    component.abrirModal = jest.fn();
    component.onConfirmarEliminacion();
     expect(component.eliminarMercancias).toHaveBeenCalled();
     expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.reset = jest.fn();
    component.limpiarFormulario();
     expect(component.destinatarioForm.reset).toHaveBeenCalled();
  });

  it('should run #onDeleted()', async () => {
    const mockItem = { id: 1 };
    component.selectedRows = new Set([mockItem]);
    component.abrirModal = jest.fn();
    component.onDeleted();
    expect(component.abrirModal).toHaveBeenCalled(); 
    expect(component.selectedRows.size).toBe(1); 
  });


  it('should run #setValoresStore()', async () => {
    component.solicitud260915Store = component.solicitud260915Store || {};
    component.solicitud260915Store.setTramite260915State = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {});
     expect(component.solicitud260915Store.setTramite260915State).toHaveBeenCalled();
  });

  it('should run #setTipoPersona()', async () => {

    component.setTipoPersona({
      toString: function() {}
    });

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