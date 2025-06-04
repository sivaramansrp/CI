// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { AcuicolaService } from '../../servicios/acuicola.service';
import { MedioDeTransporteService } from '../../servicios/medio-de-transporte';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { TramiteStore } from '../../estados/tramite220701.store';
import { SeccionLibQuery, SeccionLibStore, ConsultaioQuery } from '@libs/shared/data-access-user/src';


describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: DatosDeLaSolicitudComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, FormsModule, ReactiveFormsModule],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: AcuicolaService, useValue: {} },
        { provide: MedioDeTransporteService, useValue: { getDatos: jest.fn() } },
        { provide: TramiteStoreQuery, useValue: {} },
        { provide: TramiteStore, useValue: {} },
        { provide: SeccionLibQuery, useValue: {} },
        { provide: SeccionLibStore, useValue: {} },
        { provide: ConsultaioQuery, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy?.();
    }
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should run #obtenerDatos() and handle unexpected response format', () => {
  const mockResponse = {
    medioTransporte: '01',
    aduanaIngreso: 'XYZ'
  };

  const mockGetDatos = jest.fn().mockReturnValue(observableOf(mockResponse));
  const mockDetectChanges = jest.fn();
  const mockPatchValue = jest.fn();
  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  component.medioDeTransporteService = {
    getDatos: mockGetDatos
  } as any;

  component.cdr = {
    detectChanges: mockDetectChanges
  } as any;

  component.datosDeLaSolicitudForm = {
    patchValue: mockPatchValue
  } as any;

  component.obtenerDatos();

  expect(mockGetDatos).toHaveBeenCalled();
  expect(mockPatchValue).not.toHaveBeenCalled();
  expect(mockConsoleError).toHaveBeenCalledWith(
    "La respuesta de la API no tiene el formato esperado: ", 
    mockResponse
  );

  mockConsoleError.mockRestore();
});

});
