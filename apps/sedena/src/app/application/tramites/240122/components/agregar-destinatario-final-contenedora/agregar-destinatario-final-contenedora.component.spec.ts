// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { Tramite240122Store } from '../../estados/tramite240122Store.store';
import { Tramite240122Query } from '../../estados/tramite240122Query.query';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';

@Injectable()
class MockTramite240122Store {}

@Injectable()
class MockTramite240122Query {
  obtenerTercerosDatos$ = {};
}
@Injectable()
class MockDatosSolicitudService {
  obtenerDatosSolicitud() {
    return observableOf({});
  }
}



describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AgregarDestinatarioFinalContenedoraComponent, FormsModule, ReactiveFormsModule ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite240122Store, useClass: MockTramite240122Store },
        { provide: Tramite240122Query, useClass: MockTramite240122Query },
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
      ]
    }).overrideComponent(AgregarDestinatarioFinalContenedoraComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #updateDestinatarioFinalTablaDatos()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateDestinatarioFinalTablaDatos = jest.fn();
    component.updateDestinatarioFinalTablaDatos({});
    expect(component.tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalled();
  });

  it('should have a default value for idProcedimiento', async () => {
    expect(component.idProcedimiento).toBe(240122);
  });

  it('should initialize terechosDatos$ observable from tramiteQuery', async () => {
    const mockObservable = {};
    component.tramiteQuery.obtenerTercerosDatos$ = mockObservable as any;
    component = new AgregarDestinatarioFinalContenedoraComponent(
      component.tramiteStore,
      component.tramiteQuery
    );
    expect(component.terechosDatos$).toBe(mockObservable);
  });

});