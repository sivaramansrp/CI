import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificacionComponent } from './modificacion.component';
import { FormBuilder } from '@angular/forms';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';
import { Tramite80306Store } from '../../../../estados/tramites/tramite80306.store';
import { Tramite80306Query } from '../../../../estados/queries/tramite80306.query';
import { of as observableOf } from 'rxjs';

@Injectable()
class MockImmerModificacionService {}

@Injectable()
class MockTramite80306Store {}

@Injectable()
class MockTramite80306Query {}

describe('ModificacionComponent', () => {
  let fixture: ComponentFixture<ModificacionComponent>;
  let component: { ngOnDestroy: () => void; tramite80306Query: { selectSolicitud$?: any; }; inicializarFormulario: jest.Mock<any, any, any> | (() => void); loadDatosModificacion: jest.Mock<any, any, any> | (() => void); loadDatosTablaData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; destroyNotifier$: { next?: any; unsubscribe?: any; }; fb: { group?: any; }; derechoState: { datosModificacion?: any; }; solicitudService: { getDatosModificacion?: any; getDatosTableData?: any; }; tramite80306Store: { setDatosModificacion?: any; }; setFormValues: jest.Mock<any, any, any> | (() => void); modificacionForm: { get?: any; }; datosTabla: { findIndex?: any; INDEX?: any; }; valorDeAlternancia: (arg0: { id: {}; }) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, ModificacionComponent ],
      declarations: [
        
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ImmerModificacionService, useClass: MockImmerModificacionService },
        { provide: Tramite80306Store, useClass: MockTramite80306Store },
        { provide: Tramite80306Query, useClass: MockTramite80306Query }
      ]
    }).overrideComponent(ModificacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ModificacionComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramite80306Query = component.tramite80306Query || {};
    component.tramite80306Query.selectSolicitud$ = observableOf({});
    component.inicializarFormulario = jest.fn();
    component.loadDatosModificacion = jest.fn();
    component.loadDatosTablaData = jest.fn();
    component.ngOnInit();
    expect(component.inicializarFormulario).toHaveBeenCalled();
    expect(component.loadDatosModificacion).toHaveBeenCalled();
    expect(component.loadDatosTablaData).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

  it('should run #inicializarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.derechoState = component.derechoState || {};
    component.derechoState.datosModificacion = 'datosModificacion';
    component.inicializarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #loadDatosModificacion()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosModificacion = jest.fn().mockReturnValue(observableOf({}));
    component.tramite80306Store = component.tramite80306Store || {};
    component.tramite80306Store.setDatosModificacion = jest.fn();
    component.setFormValues = jest.fn();
    component.loadDatosModificacion();
    expect(component.solicitudService.getDatosModificacion).toHaveBeenCalled();
    expect(component.tramite80306Store.setDatosModificacion).toHaveBeenCalled();
    expect(component.setFormValues).toHaveBeenCalled();
  });

  it('should run #loadDatosTablaData()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosTableData = jest.fn().mockReturnValue(observableOf({}));
    component.loadDatosTablaData();
    expect(component.solicitudService.getDatosTableData).toHaveBeenCalled();
  });

  it('should run #setFormValues()', async () => {
    component.modificacionForm = component.modificacionForm || {};
    component.modificacionForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.derechoState = component.derechoState || {};
    component.derechoState.datosModificacion = 'datosModificacion';
    component.setFormValues();
    expect(component.modificacionForm.get).toHaveBeenCalled();
  });

  it('should run #valorDeAlternancia()', async () => {
    component.datosTabla = component.datosTabla || {};
    component.datosTabla.findIndex = jest.fn().mockReturnValue([
      {
        "id": {}
      }
    ]);
    component.datosTabla.INDEX = {
      desEstatus: {}
    };
    component.valorDeAlternancia({
      id: {}
    });
    expect(component.datosTabla.findIndex).toHaveBeenCalled();
  });

});