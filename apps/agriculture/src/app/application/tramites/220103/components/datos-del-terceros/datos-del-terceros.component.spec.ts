import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosDelTercerosComponent } from './datos-del-terceros.component';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { DatosDelTercero } from '../../modelos/sanidad-acuicola-importacion.model';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('DatosDelTercerosComponent', () => {
  let component: DatosDelTercerosComponent;
  let fixture: ComponentFixture<DatosDelTercerosComponent>;
  let tramite220103QueryMock: jest.Mocked<Tramite220103Query>;

  const mockDatosDelTercero: DatosDelTercero = {
    nombre: 'Test Name',
    telefono: '1234567890',
    correoElectronico: 'test@test.com',
    calle: 'Test Street',
    numeroExterior: '123',
    numeroInterior: 'A',
    pais: 'Test Country',
    estado: 'Test State',
    municipio: 'Test Municipality',
    localidad: 'Test Locality',
    codigoPostal: '12345'
  };

  beforeEach(async () => {
    tramite220103QueryMock = {
      selectTramite220103State$: of({}),
    } as any;

    await TestBed.configureTestingModule({
      imports: [DatosDelTercerosComponent],
      providers: [
        FormBuilder,
        { provide: Tramite220103Query, useValue: tramite220103QueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty arrays', () => {
    expect(component.datosTabla).toEqual([]);
    expect(component.destinatariosSeleccionados).toEqual([]);
    expect(component.instalacionesSeleccionadas).toEqual([]);
  });

  it('should have checkbox selection type', () => {
    expect(component.seleccionTabla).toBe(TablaSeleccion.CHECKBOX);
  });

  describe('obtenerDestinatarioSeleccionadas', () => {
    it('should update destinatariosSeleccionados when called', () => {
      const mockEvent = [mockDatosDelTercero];
      component.obtenerDestinatarioSeleccionadas(mockEvent);
      expect(component.destinatariosSeleccionados).toEqual(mockEvent);
    });
  });

  describe('obtenerInstalaciSeleccionadas', () => {
    it('should update instalacionesSeleccionadas when called', () => {
      const mockEvent = [mockDatosDelTercero];
      component.obtenerInstalaciSeleccionadas(mockEvent);
      expect(component.instalacionesSeleccionadas).toEqual(mockEvent);
    });
  });

  describe('modificarDestinatario', () => {
    it('should be defined', () => {
      expect(component.modificarDestinatario).toBeDefined();
    });
    // TODO: Add more specific tests once the modification logic is implemented
  });

  describe('eliminarDestinatario', () => {
    it('should be defined', () => {
      expect(component.eliminarDestinatario).toBeDefined();
    });
    // TODO: Add more specific tests once the deletion logic is implemented
  });

  describe('modificarInstalaci', () => {
    it('should be defined', () => {
      expect(component.modificarInstalaci).toBeDefined();
    });
    // TODO: Add more specific tests once the modification logic is implemented
  });

  describe('eliminarInstalaci', () => {
    it('should be defined', () => {
      expect(component.eliminarInstalaci).toBeDefined();
    });
    // TODO: Add more specific tests once the deletion logic is implemented
  });

  describe('ngOnDestroy', () => {
    it('should complete notificadorDestruccion$ on destroy', () => {
      const spy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });
});