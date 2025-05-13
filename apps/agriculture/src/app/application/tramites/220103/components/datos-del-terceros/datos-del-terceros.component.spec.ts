import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DatosDelTercerosComponent } from './datos-del-terceros.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { AgregarDestinatarioComponent } from '../agregar-destinatario/agregar-destinatario.component';
import { DatosDelTerceroDestinatario, Instalacion } from '../../modelos/sanidad-acuicola-importacion.model';
import { Modal } from 'bootstrap';

// Mock de la clase Modal de Bootstrap
jest.mock('bootstrap', () => ({
  Modal: {
    getInstance: jest.fn().mockImplementation(() => ({
      hide: jest.fn()
    }))
  }
}));

describe('DatosDelTercerosComponent', () => {
  let component: DatosDelTercerosComponent;
  let fixture: ComponentFixture<DatosDelTercerosComponent>;
  let mockQuery: any;

  // Datos simulados
  const mockState = {
    tablaDestinatario: [{ id: '1', nombre: 'Destinatario Test' }] as DatosDelTerceroDestinatario[],
    tablaInstalacion: [{ id: '1', nombre: 'Instalación Test' }] as Instalacion[]
  };

  beforeEach(async () => {
    mockQuery = {
      selectTramite220103State$: of(mockState)
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosDelTercerosComponent
      ],
      providers: [
        FormBuilder,
        { provide: Tramite220103Query, useValue: mockQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTercerosComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores predeterminados', () => {
      expect(component.mensajeImportante).toBeDefined();
      expect(component.configuracionFormularioDatos).toBeDefined();
      expect(component.configuracionFormularioMercancia).toBeDefined();
      expect(component.configuracionTabla).toBeDefined();
      expect(component.configuracionTablaInstalacion).toBeDefined();
      expect(component.datosTabla).toEqual([]);
      expect(component.datosTablaInstalacion).toEqual([]);
      expect(component.destinatariosSeleccionados).toEqual([]);
      expect(component.instalacionesSeleccionadas).toEqual([]);
    });
  });

  describe('ngOnInit', () => {
    it('debería suscribirse al estado y actualizar las tablas', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.datosTabla).toEqual(mockState.tablaDestinatario);
      expect(component.datosTablaInstalacion).toEqual(mockState.tablaInstalacion);
    }));

    it('debería manejar un estado nulo correctamente', fakeAsync(() => {
      mockQuery.selectTramite220103State$ = of(null);
      component.ngOnInit();
      tick();

      expect(component.datosTabla).toEqual([]);
      expect(component.datosTablaInstalacion).toEqual([]);
    }));
  });

  describe('Métodos de selección', () => {
    it('debería actualizar destinatariosSeleccionados con el evento', () => {
      const datosPrueba = [{ id: 'test', nombre: 'Destinatario Test' }] as DatosDelTerceroDestinatario[];
      component.obtenerDestinatarioSeleccionadas(datosPrueba);
      expect(component.destinatariosSeleccionados).toBe(datosPrueba);
    });

    it('debería actualizar instalacionesSeleccionadas con el evento', () => {
      const datosPrueba = [{ id: 'test', nombre: 'Instalación Test' }] as Instalacion[];
      component.obtenerInstalaciSeleccionadas(datosPrueba);
      expect(component.instalacionesSeleccionadas).toBe(datosPrueba);
    });
  });

  describe('Métodos de cierre de modal', () => {
    it('closeModal debería obtener la instancia del modal y llamar a hide', () => {
      const mockElementRef = { nativeElement: document.createElement('div') };
      component.elementoModal = mockElementRef as ElementRef;

      const mockModalInstance = { hide: jest.fn() };
      const getInstanceSpy = jest.spyOn(Modal, 'getInstance').mockReturnValue(mockModalInstance as any);

      component.closeModal();

      expect(getInstanceSpy).toHaveBeenCalledWith(mockElementRef.nativeElement);
      expect(mockModalInstance.hide).toHaveBeenCalled();
    });

    it('closeModalInstalaci debería manejar una instancia nula del modal', () => {
      const mockElementRef = { nativeElement: document.createElement('div') };
      component.elementoModalInstalaci = mockElementRef as ElementRef;

      jest.spyOn(Modal, 'getInstance').mockReturnValue(null);

      expect(() => component.closeModalInstalaci()).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('debería llamar a next y complete en notificadorDestruccion$', () => {
      const nextSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
      const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});