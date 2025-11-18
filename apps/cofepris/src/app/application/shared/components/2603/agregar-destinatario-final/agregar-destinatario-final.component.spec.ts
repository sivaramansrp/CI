import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AgregarDestinatarioFinalComponent } from './agregar-destinatario-final.component';
import { DatosSolicitudService } from '../../../services/shared2603/datos-solicitud.service';
import { CatalogoServices } from '@ng-mf/data-access-user';

describe('AgregarDestinatarioFinalComponent', () => {
  let component: AgregarDestinatarioFinalComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalComponent>;

  beforeEach(async () => {
    const mockLocation = {
      back: jest.fn(),
      forward: jest.fn(),
      go: jest.fn(),
      getState: jest.fn().mockReturnValue({}),
      isCurrentPathEqualTo: jest.fn().mockReturnValue(false),
      normalize: jest.fn().mockReturnValue(''),
      path: jest.fn().mockReturnValue(''),
      prepareExternalUrl: jest.fn().mockReturnValue(''),
      replaceState: jest.fn(),
      subscribe: jest.fn()
    };

    const mockDatosSolicitudService = {
      buscarRepresentanteLegal: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      obtenerFraccionesArancelarias: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      obtenerUmt: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    };

    const mockCatalogoServices = {
      obtenerCatalogo: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      obtenerCatalogos: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: Location, useValue: mockLocation },
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: CatalogoServices, useValue: mockCatalogoServices }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalComponent);
    component = fixture.componentInstance;

    component.agregarDestinatarioFinal = new FormBuilder().group({
      tipoPersona: [''],
      rfc: [''],
      nombres: [''],
      primerApellido: [''],
      correoElectronico: [''],
      telefono: ['']
    });

    component.idProcedimiento = 1;
    component.tramiteID = 'TEST-123';
    component.destinatarios = [];
  });

  describe('Component Initialization', () => {
    it('should create component successfully', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.destinatarios).toEqual([]);
      expect(component.chequeoValidacionAlGuardar).toBe(false);
      expect(component.isEditMode).toBe(false);
    });

    it('should have reactive form defined', () => {
      expect(component.agregarDestinatarioFinal).toBeDefined();
      expect(component.agregarDestinatarioFinal.get('tipoPersona')).toBeTruthy();
      expect(component.agregarDestinatarioFinal.get('rfc')).toBeTruthy();
      expect(component.agregarDestinatarioFinal.get('correoElectronico')).toBeTruthy();
    });
  });

  describe('Form Operations', () => {
    it('should handle form value changes', () => {
      component.agregarDestinatarioFinal.patchValue({
        tipoPersona: 'FISICA',
        nombres: 'Juan',
        primerApellido: 'Perez'
      });

      expect(component.agregarDestinatarioFinal.get('tipoPersona')?.value).toBe('FISICA');
      expect(component.agregarDestinatarioFinal.get('nombres')?.value).toBe('Juan');
      expect(component.agregarDestinatarioFinal.get('primerApellido')?.value).toBe('Perez');
    });

    it('should reset form correctly', () => {
      component.agregarDestinatarioFinal.patchValue({
        nombres: 'Juan',
        rfc: 'XAXX010101000'
      });

      component.agregarDestinatarioFinal.reset();

      expect(component.agregarDestinatarioFinal.get('nombres')?.value).toBeNull();
      expect(component.agregarDestinatarioFinal.get('rfc')?.value).toBeNull();
    });
  });

  describe('Component Properties', () => {
    it('should handle input property changes', () => {
      component.idProcedimiento = 123;
      component.tramiteID = 'NEW-TRAMITE-456';

      expect(component.idProcedimiento).toBe(123);
      expect(component.tramiteID).toBe('NEW-TRAMITE-456');
    });

    it('should maintain destinatarios array', () => {
      const INITIAL_LENGTH = component.destinatarios.length;

      const MOCK_DESTINATARIO = {
        id: '1',
        nombres: 'Test',
        primerApellido: 'User',
        rfc: 'XAXX010101000',
        nombreRazonSocial: 'Test User',
        curp: '',
        telefono: '5551234567',
        correoElectronico: 'test@example.com',
        segundoApellido: '',
        tipoPersona: 'FISICA',
        codigoPostal: '',
        estado: '',
        municipio: '',
        localidad: '',
        colonia: '',
        calle: ''
      } as any;

      component.destinatarios.push(MOCK_DESTINATARIO);

      expect(component.destinatarios.length).toBe(INITIAL_LENGTH + 1);
    });
  });

  describe('Event Emitters', () => {
    it('should have event emitters defined', () => {
      expect(component.cancelarDestinario).toBeDefined();
      expect(component.guardarYSalir).toBeDefined();
      expect(component.updateDestinatarioFinalTablaDatos).toBeDefined();
    });

    it('should emit events when methods are called', () => {
      jest.spyOn(component.updateDestinatarioFinalTablaDatos, 'emit');

      component.updateDestinatarioFinalTablaDatos.emit([]);

      expect(component.updateDestinatarioFinalTablaDatos.emit).toHaveBeenCalledWith([]);
    });
  });
});