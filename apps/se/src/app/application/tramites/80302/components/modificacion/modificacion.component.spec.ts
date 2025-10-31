// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ModificacionComponent } from './modificacion.component';
import { SolicitudService } from '../../service/solicitud.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockSolicitudService {
  getDatosModificacion = jest.fn().mockReturnValue(observableOf({}));
  getDatosTableData = jest.fn().mockReturnValue(observableOf([]));
}

@Injectable()
class MockConsultaioQuery {
  selectConsultaioState$ = observableOf({ readonly: false });
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

describe('ModificacionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModificacionComponent, FormsModule, ReactiveFormsModule],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: SolicitudService, useClass: MockSolicitudService },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
      ],
    })
      .overrideComponent(ModificacionComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(ModificacionComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {    
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosModificacion = jest.fn().mockReturnValue(observableOf({}));
    component.solicitudService.getDatosTableData = jest.fn().mockReturnValue(observableOf([]));
        
    component.consultaioQuery = component.consultaioQuery || {};
    component.consultaioQuery.selectConsultaioState$ = observableOf({ readonly: false });
        
    const loadDatosModificacionSpy = jest.spyOn(component, 'loadDatosModificacion');
    const loadDatosTablaDataSpy = jest.spyOn(component, 'loadDatosTablaData');
    
    component.ngOnInit();
    
    expect(loadDatosModificacionSpy).toHaveBeenCalled();
    expect(loadDatosTablaDataSpy).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
  });

  it('should run #loadDatosModificacion()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosModificacion = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.loadDatosModificacion();
    expect(component.solicitudService.getDatosModificacion).toHaveBeenCalled();
  });

  it('should run #loadDatosTablaData()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.getDatosTableData = jest
      .fn()
      .mockReturnValue(observableOf([]));
    component.loadDatosTablaData();
    expect(component.solicitudService.getDatosTableData).toHaveBeenCalled();
  });

  it('should run #valorDeAlternancia() and toggle status from "Baja" to "Activada"', () => {
    const mockRow = { id: 1, desEstatus: 'Baja' };
    component.datosTabla = [{ id: 1, desEstatus: 'Baja' }];

    component.valorDeAlternancia({ row: mockRow, column: 'desEstatus' });

    expect(component.datosTabla[0].desEstatus).toBe('Activada');
  });

  it('should run #valorDeAlternancia() and toggle status from "Activada" to "Baja"', () => {
    const mockRow = { id: 1, desEstatus: 'Activada' };
    component.datosTabla = [{ id: 1, desEstatus: 'Activada' }];

    component.valorDeAlternancia({ row: mockRow, column: 'desEstatus' });

    expect(component.datosTabla[0].desEstatus).toBe('Baja');
  });
});