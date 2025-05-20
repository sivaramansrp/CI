
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ProgramasReporteAnualComponent } from './programas-reporte-anual.component';
import { FormBuilder } from '@angular/forms';
import { Solicitud150103Store } from '../../estados/solicitud150103.store';
import { Solicitud150103Query } from '../../estados/solicitud150103.query';
import { InformeAnualProgramaService } from '../../services/informe-anual-programa.service';

@Injectable()
class MockSolicitud150103Store {}

@Injectable()
class MockSolicitud150103Query {}

@Injectable()
class MockInformeAnualProgramaService {
  obtenerReporteFechas() {
    return observableOf({}); 
  }
  
  obtenerProgramasReporte() {
    return observableOf([]); // Mock implementation returning an observable of an empty array
  }
}

describe('ProgramasReporteAnualComponent', () => {
  let fixture: ComponentFixture<ProgramasReporteAnualComponent>;
  let component: { ngOnDestroy: () => void; fb: { group?: any; }; solicitud150103State: { inicio?: any; fin?: any; folioPrograma?: any; modalidad?: any; tipoPrograma?: any; estatus?: any; }; solicitud150103Query: { seleccionarSolicitud$?: any; }; ngOnInit: () => void; informaAnualPrograma: { obtenerReporteFechas?: any; obtenerProgramasReporte?: any; }; solicitud150103Store: { actualizarInicio?: any; actualizarFin?: any; actualizarFolioPrograma?: any; actualizarModalidad?: any; actualizarTipoPrograma?: any; actualizarEstatus?: any; }; obtenerReporteFechas: () => void; obtenerProgramasReporte: () => void; filaDeInformeSeleccionada: { emit?: any; }; actualizarProgramasReporte: (arg0: { folioPrograma: {}; modalidad: {}; tipoPrograma: {}; estatus: {}; }) => void; destroyed$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ProgramasReporteAnualComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Solicitud150103Store, useClass: MockSolicitud150103Store },
        { provide: Solicitud150103Query, useClass: MockSolicitud150103Query },
        { provide: InformeAnualProgramaService, useClass: MockInformeAnualProgramaService }
      ]
    }).overrideComponent(ProgramasReporteAnualComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ProgramasReporteAnualComponent);
    component = fixture.debugElement.componentInstance;
  });
  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {}; // Mock ngOnDestroy to avoid errors
    }
    if (fixture) {
      fixture.destroy(); // Destroy the fixture to clean up
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({
      patchValue: function() {}
    });
    component.solicitud150103State = component.solicitud150103State || {};
    component.solicitud150103State.inicio = 'inicio';
    component.solicitud150103State.fin = 'fin';
    component.solicitud150103State.folioPrograma = 'folioPrograma';
    component.solicitud150103State.modalidad = 'modalidad';
    component.solicitud150103State.tipoPrograma = 'tipoPrograma';
    component.solicitud150103State.estatus = 'estatus';
    component.solicitud150103Query = component.solicitud150103Query || {};
    component.solicitud150103Query.seleccionarSolicitud$ = observableOf({});
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerReporteFechas()', async () => {
    component.informaAnualPrograma = component.informaAnualPrograma || {};
    component.informaAnualPrograma.obtenerReporteFechas = jest.fn().mockReturnValue(observableOf({}));
    component.solicitud150103Store = component.solicitud150103Store || {};
    component.solicitud150103Store.actualizarInicio = jest.fn();
    component.solicitud150103Store.actualizarFin = jest.fn();
    component.obtenerReporteFechas();
    expect(component.informaAnualPrograma.obtenerReporteFechas).toHaveBeenCalled();
    expect(component.solicitud150103Store.actualizarInicio).toHaveBeenCalled();
    expect(component.solicitud150103Store.actualizarFin).toHaveBeenCalled();
  });

  it('should run #obtenerProgramasReporte()', async () => {
    component.informaAnualPrograma = component.informaAnualPrograma || {};
    component.informaAnualPrograma.obtenerProgramasReporte = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerProgramasReporte();
    expect(component.informaAnualPrograma.obtenerProgramasReporte).toHaveBeenCalled();
  });

  it('should run #actualizarProgramasReporte()', async () => {
    component.solicitud150103Store = component.solicitud150103Store || {};
    component.solicitud150103Store.actualizarFolioPrograma = jest.fn();
    component.solicitud150103Store.actualizarModalidad = jest.fn();
    component.solicitud150103Store.actualizarTipoPrograma = jest.fn();
    component.solicitud150103Store.actualizarEstatus = jest.fn();
    component.filaDeInformeSeleccionada = component.filaDeInformeSeleccionada || {};
    component.filaDeInformeSeleccionada.emit = jest.fn();
    component.actualizarProgramasReporte({
      folioPrograma: {},
      modalidad: {},
      tipoPrograma: {},
      estatus: {}
    });
    expect(component.solicitud150103Store.actualizarFolioPrograma).toHaveBeenCalled();
    expect(component.solicitud150103Store.actualizarModalidad).toHaveBeenCalled();
    expect(component.solicitud150103Store.actualizarTipoPrograma).toHaveBeenCalled();
    expect(component.solicitud150103Store.actualizarEstatus).toHaveBeenCalled();
    expect(component.filaDeInformeSeleccionada.emit).toHaveBeenCalled();
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