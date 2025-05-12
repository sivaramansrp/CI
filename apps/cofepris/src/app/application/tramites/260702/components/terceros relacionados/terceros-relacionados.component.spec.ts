// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TercerosrelacionadosComponent } from './terceros-relacionados.component';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { Solicitud260702Store } from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';


class MockRegistrarSolicitudMcpService {
  getPaisData() {
    return observableOf([]); // Mocked response for getPaisData
  }
}

class MockSolicitud260702Store {
  metodoNombre = jest.fn();
}

class MockSolicitud260702Query {
  selectSolicitud$ = observableOf({});
}
describe('TercerosrelacionadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,TercerosrelacionadosComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: RegistrarSolicitudMcpService, useClass: MockRegistrarSolicitudMcpService },
        { provide: Solicitud260702Store, useClass: MockSolicitud260702Store },
        { provide: Solicitud260702Query, useClass: MockSolicitud260702Query }
      ]
    }).overrideComponent(TercerosrelacionadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosrelacionadosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
   
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #selectedTipoPersona', async () => {
    component.agregarDestinatario = component.agregarDestinatario || {};
    component.agregarDestinatario.get = jest.fn().mockReturnValue({
      value: {}
    });
    const selectedTipoPersona = component.selectedTipoPersona;
    expect(component.agregarDestinatario.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #selectedTipoPersona', async () => {
    jest.spyOn(component, 'agregarDestinatario', 'get').mockReturnValue({
      get: jest.fn().mockReturnValue({ value: {} }),
    });
  
    const selectedTipoPersona = component.selectedTipoPersona;
    expect(component.agregarDestinatario.get).toHaveBeenCalled();
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
    component.solicitud260702Query = component.solicitud260702Query || {};
    component.solicitud260702Query.selectSolicitud$ = observableOf({});
    component.crearFormTransporte = jest.fn();
    component.getPaisData = jest.fn();
    component.ngOnInit();
    expect(component.crearFormTransporte).toHaveBeenCalled();
    expect(component.getPaisData).toHaveBeenCalled();
  });

  it('should run #getPaisData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getPaisData = jest.fn().mockReturnValue(observableOf({}));
    component.paisData = component.paisData || {};
    component.paisData.catalogos = 'catalogos';
    component.getPaisData();
    expect(component.registrarsolicitudmcp.getPaisData).toHaveBeenCalled();
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
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.size = 'size';
    component.selectedRows.has = jest.fn();
    component.selectedRows.clear = jest.fn();
    component.tableData = component.tableData || {};
    component.tableData = ['tableData'];
    component.eliminarMercancias();
    expect(component.selectedRows.has).toHaveBeenCalled();
    expect(component.selectedRows.clear).toHaveBeenCalled();
  });

  it('should run #openModificarMercancias()', async () => {
    component.selectedRows = new Set([{ id: 1 }]);
      component.tableData = [
      { id: 1, name: 'Test Data' }
    ];
    jest.spyOn(component.tableData, 'find').mockReturnValue({
      id: 1,
      name: 'Test Data'
    });
  
    component.destinatarioForm = {
      patchValue: jest.fn()
    } as any;
  
    component.openModificarMercancias();
  
    expect(component.tableData.find).toHaveBeenCalled();
  
    expect(component.destinatarioForm.patchValue).toHaveBeenCalledWith({
      id: 1,
      name: 'Test Data'
    });
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
    component.onConfirmarEliminacion();
    expect(component.eliminarMercancias).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.destinatarioForm.reset).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    // Mock solicitud260702Store and metodoNombre
    component.solicitud260702Store = {
      metodoNombre: jest.fn(), // Mock metodoNombre as a function
    };
  
    // Mock form behavior
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'mockValue' }), // Mock form.get(campo)?.value
    };
  
    // Call setValoresStore
    component.setValoresStore(mockForm, 'campo', 'metodoNombre');
  
    // Verify that metodoNombre was called with the correct value
    expect(component.solicitud260702Store.metodoNombre).toHaveBeenCalledWith('mockValue');
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = {
      next: jest.fn(),
      complete: jest.fn(),
    };
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});