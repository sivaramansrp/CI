// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TercerosrelacionadosComponent } from './terceros-relacionados.component';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { provideHttpClient } from '@angular/common/http';

class MockSolicitud260915Store {
  setValoresStore = jest.fn();
}

class MockSolicitud260915Query {
  selectSolicitud$ = jest.fn(() => observableOf({}));
}

describe('TercerosrelacionadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TercerosrelacionadosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        provideHttpClient(),
        FormBuilder,
        { provide: PermisoSanitarioDispositivosMedicosService, useValue: {} },
        { provide: Solicitud260915Store, useClass: MockSolicitud260915Store },
        { provide: Solicitud260915Query, useClass: MockSolicitud260915Query },
      ],
    
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
    component.solicitud260915Query = component.solicitud260915Query || {};
    component.solicitud260915Query.selectSolicitud$ = observableOf({});
    component.crearFormTransporte = jest.fn();
    component.getPaisData = jest.fn();
    component.ngOnInit();
    expect(component.crearFormTransporte).toHaveBeenCalled();
    expect(component.getPaisData).toHaveBeenCalled();
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
   
    component.solicitud260915Store = {
      metodoNombre: jest.fn(), 
    };
  
   
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'mockValue' }), 
    };
  
    
    component.setValoresStore(mockForm, 'campo', 'metodoNombre');
  
    
    expect(component.solicitud260915Store.metodoNombre).toHaveBeenCalledWith('mockValue');
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

})