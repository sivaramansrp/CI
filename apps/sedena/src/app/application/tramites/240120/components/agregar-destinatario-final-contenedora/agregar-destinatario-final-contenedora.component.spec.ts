// @ts-nocheck
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { of, Subject } from 'rxjs';

// import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
// import { Tramite240120Store } from '../../estados/tramite240120Store.store';
// import { Tramite240120Query } from '../../estados/tramite240120Query.query';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// class MockTramite240120Store {
//   updateDestinatarioFinalTablaDatos = jest.fn();
// }

// class MockTramite240120Query {
//   // This is the correct property the component expects
//   getmodificarDestinarioDatos$ = of(null);
// }

// describe('AgregarDestinatarioFinalContenedoraComponent', () => {
//   let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
//   let component: AgregarDestinatarioFinalContenedoraComponent;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
//       providers: [
//         { provide: Tramite240120Store, useClass: MockTramite240120Store },
//         { provide: Tramite240120Query, useClass: MockTramite240120Query }
//       ]
//     }).compileComponents();
//     fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call updateDestinatarioFinalTablaDatos on the store', () => {
//     const mockData = [{ nombre: 'Test' }];
//     component.updateDestinatarioFinalTablaDatos(mockData as any);
//     expect(component.tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(mockData);
//   });
// });


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { Tramite240120Store } from '../../estados/tramite240120Store.store';
import { Tramite240120Query } from '../../estados/tramite240120Query.query';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite240120Store {}

@Injectable()
class MockTramite240120Query {
  obtenerTercerosDatos$ = observableOf({});
}

describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite240120Store, useClass: MockTramite240120Store },
        { provide: Tramite240120Query, useClass: MockTramite240120Query },
        DatosSolicitudService
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

});