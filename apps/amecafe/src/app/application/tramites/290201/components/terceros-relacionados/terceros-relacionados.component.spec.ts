// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError, Subject } from 'rxjs'; // Import Subject here

import { Component, ChangeDetectorRef } from '@angular/core';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';
@Injectable()
class MockRegistrarSolicitudService {
  getPaisData() {
    return observableOf([{ id: 1, descripcion: 'Mock Country' }]); // Mock data
  }
}

@Injectable()
class MockSolicitud290201Store {
  metodoNombre = jest.fn(); // Mock implementation of metodoNombre

}

@Injectable()
class MockSolicitud290201Query {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('TercerosRelacionadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,TercerosRelacionadosComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistrarSolicitudService, useClass: MockRegistrarSolicitudService },
        FormBuilder,
        ChangeDetectorRef,
        { provide: Solicitud290201Store, useClass: MockSolicitud290201Store },
        { provide: Solicitud290201Query, useClass: MockSolicitud290201Query }
      ]
    }).overrideComponent(TercerosRelacionadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.debugElement.componentInstance;
    component.destinatarioForm = new FormBuilder().group({
      tipoPersona: [''],
      denominacion: [''],
      domicilio: [''],
      pais: [''],
      codigopostal: [''],
      telefono: [''],
      correoelectronica: [''],
    });
  
    component.destroyed$ = new Subject<void>();

  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #selectedTipoPersona', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    const selectedTipoPersona = component.selectedTipoPersona;
    expect(component.destinatarioForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
    expect(component.destinatarioForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    const mockData = [{ id: 1, descripcion: 'Mock Country' }];
    jest.spyOn(component.registrarsolicitud, 'getPaisData').mockReturnValue(observableOf(mockData));
  
    component.ngOnInit();
  
    expect(component.registrarsolicitud.getPaisData).toHaveBeenCalled();
    expect(component.paisData.catalogos).toEqual(mockData);
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.destinatarioState = component.destinatarioState || {};
    component.destinatarioState.tipoPersona = 'tipoPersona';
    component.destinatarioState.denominacion = 'denominacion';
    component.destinatarioState.domicilio = 'domicilio';
    component.destinatarioState.pais = 'pais';
    component.destinatarioState.codigopostal = 'codigopostal';
    component.destinatarioState.telefono = 'telefono';
    component.destinatarioState.correoelectronica = 'correoelectronica';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #getPaisData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getPaisData = jest.fn().mockReturnValue(observableOf({}));
    component.paisData = component.paisData || {};
    component.paisData.catalogos = 'catalogos';
    component.getPaisData();
    expect(component.registrarsolicitud.getPaisData).toHaveBeenCalled();
  });

  it('should run #onSubmit()', async () => {
    // Mock the form value
    component.destinatarioForm.value = {
      datosDelTramiteRealizar: {
        pais: { id: 1 }, // Mock the selected country ID
      },
    };
  
    // Mock the reset method
    component.destinatarioForm.reset = jest.fn();
  
    // Mock the catalog data
    component.paisData = {
      catalogos: [
        { id: 1, descripcion: 'Mock Country' }, // Matching country
        { id: 2, descripcion: 'Another Country' },
      ],
    };
  
    // Mock the newDestinatarioData array
    component.newDestinatarioData = [];
    component.newDestinatarioData.push = jest.fn();
  
    // Mock the ChangeDetectorRef
    component.changeDetectorRef = { markForCheck: jest.fn() };
  
    // Call the method
    component.onSubmit();
  
    // Verify the form was reset
    expect(component.destinatarioForm.reset).toHaveBeenCalled();
  
    // Verify the newDestinatarioData.push was called with the correct structure
    expect(component.newDestinatarioData.push).toHaveBeenCalledWith({
      pais: { id: 1, descripcion: 'Mock Country' }, // Ensure the correct country is mapped
    });
  
    // Verify the ChangeDetectorRef was marked for check
    expect(component.changeDetectorRef.markForCheck).toHaveBeenCalled();
  });
  it('should run #onLimpiar()', async () => {
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.reset = jest.fn();
    component.onLimpiar();
    expect(component.destinatarioForm.reset).toHaveBeenCalled();
  });

  it('should run #onSelectRow()', async () => {

    component.onSelectRow({}, {
      target: {
        checked: {}
      }
    }, {});

  });

  it('should run #onModify()', async () => {
    component.selectedRow = component.selectedRow || {};
    component.selectedRow.pais = 'pais';
    component.paisData = component.paisData || {};
    component.paisData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.destinatarioForm = component.destinatarioForm || {};
    component.destinatarioForm.patchValue = jest.fn();
    component.onModify();
    expect(component.destinatarioForm.patchValue).toHaveBeenCalled();
  });

  it('should run #onDelete()', async () => {
    component.newDestinatarioData = component.newDestinatarioData || {};
    component.newDestinatarioData.indexOf = jest.fn();
    component.newDestinatarioData.splice = jest.fn();
    component.onDelete();
    expect(component.newDestinatarioData.indexOf).toHaveBeenCalled();
    expect(component.newDestinatarioData.splice).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud290201Store = TestBed.inject(Solicitud290201Store); // Use the mock store
  
    // Mock the dynamic method
    const mockMethod = jest.fn();
    component.solicitud290201Store['metodoNombre'] = mockMethod;
  
    // Call the method
    component.setValoresStore(
      {
        get: function () {
          return {
            value: 'mockValue',
          };
        },
      } as any, // Mocked FormGroup
      'campo',
      'metodoNombre' as keyof Solicitud290201Store
    );
  
    // Verify the dynamic method was called with the correct value
    expect(mockMethod).toHaveBeenCalledWith('mockValue');
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = new Subject<void>(); // Mock the destroyed$ property
    jest.spyOn(component.destroyed$, 'next');
    jest.spyOn(component.destroyed$, 'complete');
  
    component.ngOnDestroy();
  
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});