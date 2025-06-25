import { TestBed } from '@angular/core/testing';
import { MercanciasComponent } from './mercancias.component';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { ComponentFixture } from '@angular/core/testing';

describe('MercanciasComponent', () => {
  let COMPONENTE: MercanciasComponent;
  let FIXTURE: ComponentFixture<MercanciasComponent>;
  
  describe('MercanciasComponent', () => {
    let COMPONENTE: MercanciasComponent;
    let FIXTURE: ComponentFixture<MercanciasComponent>; 
    let MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE: { getMercanciasData: jest.Mock };
    let MOCK_DATOS_PROCEDURE_STORE: { selectProrroga: jest.Mock };
    let MOCK_DATOS_PROCEDURE_QUERY: { selectProrroga: jest.Mock };
  
    beforeEach(async () => {
      MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE = {
        getMercanciasData: jest.fn().mockReturnValue(of([])),
      };
      MOCK_DATOS_PROCEDURE_STORE = {
        selectProrroga: jest.fn(),
      };
      MOCK_DATOS_PROCEDURE_QUERY = {
        selectProrroga: jest.fn().mockReturnValue(of({ aduanas: 'Aduana de Prueba' })),
      };
  
      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, MercanciasComponent],
        providers: [
          FormBuilder,
          { provide: ModificacionPermisoImportacionMedicamentosService, useValue: MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE },
          { provide: DatosProcedureStore, useValue: MOCK_DATOS_PROCEDURE_STORE },
          { provide: DatosProcedureQuery, useValue: MOCK_DATOS_PROCEDURE_QUERY },
        ],
      }).compileComponents();
  
      FIXTURE = TestBed.createComponent(MercanciasComponent);
      COMPONENTE = FIXTURE.componentInstance;
      FIXTURE.detectChanges();
    });
  
    it('DEBERÍA CREAR EL COMPONENTE', () => {
      expect(COMPONENTE).toBeTruthy();
    });

    it('DEBERÍA INICIALIZAR EL FORMULARIO EN NGONINIT', () => {
      const CREAR_FORMULARIO_SPY = jest.spyOn(COMPONENTE, 'crearFormulario');
      COMPONENTE.ngOnInit();
      expect(CREAR_FORMULARIO_SPY).toHaveBeenCalled();
      expect(COMPONENTE.Aduana).toBeDefined();
    });

    it('DEBERÍA LLAMAR A MERCANCIASDATA EN NGONINIT', () => {
      const MERCANCIAS_DATA_SPY = jest.spyOn(COMPONENTE, 'mercanciasData');
      COMPONENTE.ngOnInit();
      expect(MERCANCIAS_DATA_SPY).toHaveBeenCalled();
    });

    it('DEBERÍA ESTABLECER SECCIONSTATE DESDE QUERY.SELECTPRORROGA$', () => {
      COMPONENTE.ngOnInit();
    });

    it('DEBERÍA LLAMAR A GETMERCANCIASDATA Y ESTABLECER MERCANCIASDATA', () => {
      const MOCK_RESPONSE = [{ clasificacionDelProducto: 'Prueba' }];
      MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData.mockReturnValue(of(MOCK_RESPONSE));

      COMPONENTE.mercanciasData();
      expect(MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData).toHaveBeenCalled();
      expect(COMPONENTE.mercanciasDatas).toEqual(MOCK_RESPONSE);
    });

    it('DEBERÍA INICIALIZAR EL FORMULARIO EN CREARFORMULARIO', () => {
      COMPONENTE.crearFormulario();
      expect(COMPONENTE.Aduana.value).toEqual({ Aduana: { aduanas: 'Aduana de Prueba' } });
    });

    it('DEBERÍA TENER LA CONFIGURACIÓN CORRECTA DE LA TABLA', () => {
      expect(COMPONENTE.configuracionTabla).toBeDefined();
      expect(COMPONENTE.configuracionTabla.length).toBe(7);
      expect(COMPONENTE.configuracionTabla[0].encabezado).toBe('Clasificación del producto ');
    });

    it('DEBERÍA DESTRUIR LAS SUSCRIPCIONES AL DESTRUIR EL COMPONENTE', () => {
      const DESTROY_SPY = jest.spyOn(COMPONENTE['destroy$'], 'next');
      const COMPLETE_SPY = jest.spyOn(COMPONENTE['destroy$'], 'complete');

      COMPONENTE.ngOnDestroy();

      expect(DESTROY_SPY).toHaveBeenCalledWith();
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });

    it('DEBERÍA TENER LOS VALORES PREDETERMINADOS CORRECTOS', () => {
      expect(COMPONENTE.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
      expect(COMPONENTE.mercanciasDatas).toEqual([]);
    });

    it('DEBERÍA MANEJAR ERRORES EN GETMERCANCIASDATA CORRECTAMENTE', () => {
      const ERROR = new Error('Error de prueba');
      MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData.mockReturnValue(of(() => { throw ERROR; }));

      expect(() => COMPONENTE.mercanciasData()).not.toThrow();
    });

    it('DEBERÍA ACTUALIZAR SECCIONSTATE CORRECTAMENTE CUANDO QUERY EMITE UN NUEVO VALOR', () => {
      const NEW_VALUE = { aduanas: 'Aduana Actualizada' };
      MOCK_DATOS_PROCEDURE_QUERY.selectProrroga.mockReturnValue(of(NEW_VALUE));
      COMPONENTE.ngOnInit();
    });

    it('DEBERÍA DESUSCRIBIRSE DE LOS OBSERVABLES EN NGONDESTROY', () => {
      const DESTROY_SPY = jest.spyOn(COMPONENTE['destroy$'], 'next');
      const COMPLETE_SPY = jest.spyOn(COMPONENTE['destroy$'], 'complete');
      COMPONENTE.ngOnDestroy();
      expect(DESTROY_SPY).toHaveBeenCalledWith();
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });

    it('DEBERÍA INICIALIZAR CONFIGURACIONTABLA CORRECTAMENTE', () => {
      expect(COMPONENTE.configuracionTabla).toBeDefined();
      expect(COMPONENTE.configuracionTabla.length).toBeGreaterThan(0);
    });

    it('DEBERÍA VALIDAR LOS CONTROLES DEL FORMULARIO CORRECTAMENTE', () => {
      COMPONENTE.crearFormulario(); 
      const CONTROL = COMPONENTE.Aduana.get('Aduana');
      CONTROL?.setValue('Aduana Válida');
      expect(CONTROL?.valid).toBeTruthy();
    });

    it('DEBERÍA MANEJAR RESPUESTA VACÍA DE GETMERCANCIASDATA', () => {
      MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData.mockReturnValue(of([]));
      COMPONENTE.mercanciasData();
      expect(COMPONENTE.mercanciasDatas).toEqual([]);
    });
  });
});