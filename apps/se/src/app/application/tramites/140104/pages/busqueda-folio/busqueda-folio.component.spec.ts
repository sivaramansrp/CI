
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { BusquedaFolioComponent } from './busqueda-folio.component';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { FormBuilder } from '@angular/forms';

@Injectable()
class MockServicioDeMensajesService {
  establecerDatosDePermiso(): void {
    // Mock implementation of establecerDatosDePermiso
  }
}

describe('BusquedaFolioComponent', () => {
  let fixture: ComponentFixture<BusquedaFolioComponent>;
  let component: BusquedaFolioComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        BusquedaFolioComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ServicioDeMensajesService, useClass: MockServicioDeMensajesService },
        FormBuilder
      ]
    }).overrideComponent(BusquedaFolioComponent, {

    }).compileComponents();
    
    fixture = TestBed.createComponent(BusquedaFolioComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should initialize montoACancelarForm with correct validators', () => {
    component.establecerMontoACancelarForm();
    expect(component.montoACancelarForm).toBeDefined();
    component.montoACancelarForm.get('monto')?.setValue('abc');
    expect(component.montoACancelarForm.get('monto')?.valid).toBe(false);
    component.montoACancelarForm.get('monto')?.setValue('123');
    expect(component.montoACancelarForm.get('monto')?.valid).toBe(true);
  });

  it('estableDevloverForm should initialize all devolver forms', () => {
    component.estableDevloverForm();
    expect(component.devloverForm).toBeDefined();
    expect(component.cantidadADevolver).toBeDefined();
    expect(component.devolver).toBeDefined();
    expect(component.devloverForm.get('folioDelOficioDeCertificado')).toBeDefined();
    expect(component.cantidadADevolver.get('cantidad')).toBeDefined();
    expect(component.devolver.get('totalDevolver')).toBeDefined();
  });

  it('should initialize devloverForm, cantidadADevolver, and devolver in estableDevloverForm', () => {
  component.estableDevloverForm();
  expect(component.devloverForm).toBeDefined();
  expect(component.cantidadADevolver).toBeDefined();
  expect(component.devolver).toBeDefined();
  expect(component.devloverForm.get('folioDelOficioDeCertificado')).toBeDefined();
  expect(component.cantidadADevolver.get('cantidad')).toBeDefined();
  expect(component.devolver.get('totalDevolver')).toBeDefined();
  expect(component.devolver.get('totalDevolverMetrosCuadrados')).toBeDefined();
});

});