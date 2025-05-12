import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder } from '@angular/forms';
import { Tramite40401Store } from '../../../../core/estados/tramites/tramite40401.store';
import { Tramite40401Query } from '../../../../core/queries/tramite40401.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { RegistroCaatAereoService } from '../../services/RegistroCaatAereoController.service';

@Injectable()
class MockRegistroCaatAereoService {}

@Injectable()
class MockTramite40401Store {}

@Injectable()
class MockTramite40401Query {}

describe('DatosDelTramiteComponent', () => {
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let component: { ngOnDestroy: () => void; tramiteQuery: { selectSolicitud$?: any; }; initializeForm: jest.Mock<any, any, any> | (() => void); cargarCAATAereo: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; formBuilder: { group?: any; }; solicitudState: { pais?: any; codigo?: any; transportacion?: any; }; registroCaatAereoService: { obtenerCAATAereo?: any; }; validacionesService: { isValid?: any; }; isValid: (arg0: {}, arg1: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, DatosDelTramiteComponent ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: RegistroCaatAereoService, useClass: MockRegistroCaatAereoService },
        { provide: Tramite40401Store, useClass: MockTramite40401Store },
        { provide: Tramite40401Query, useClass: MockTramite40401Query },
        ValidacionesFormularioService
      ]
    }).overrideComponent(DatosDelTramiteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDelTramiteComponent);
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
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.selectSolicitud$ = observableOf({});
    component.initializeForm = jest.fn();
    component.cargarCAATAereo = jest.fn();
    component.ngOnInit();
    expect(component.initializeForm).toHaveBeenCalled();
    expect(component.cargarCAATAereo).toHaveBeenCalled();
  });

  it('should run #initializeForm()', async () => {
    component.formBuilder = component.formBuilder || {};
    component.formBuilder.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.pais = 'pais';
    component.solicitudState.codigo = 'codigo';
    component.solicitudState.transportacion = 'transportacion';
    component.initializeForm();
    expect(component.formBuilder.group).toHaveBeenCalled();
  });

  it('should run #cargarCAATAereo()', async () => {
    component.registroCaatAereoService = component.registroCaatAereoService || {};
    component.registroCaatAereoService.obtenerCAATAereo = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarCAATAereo();
    expect(component.registroCaatAereoService.obtenerCAATAereo).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});