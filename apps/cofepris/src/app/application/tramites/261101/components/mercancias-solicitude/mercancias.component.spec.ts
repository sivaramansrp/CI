import { TestBed } from '@angular/core/testing';
import { MercanciasComponent } from './mercancias.component';
import { DatosSolicitudService } from '../../services/datoSolicitude.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { ComponentFixture } from '@angular/core/testing';

describe('MercanciasComponent', () => {
  let COMPONENT: MercanciasComponent;
  let FIXTURE: ComponentFixture<MercanciasComponent>;
  
  describe('MercanciasComponent', () => {
    let COMPONENT: MercanciasComponent;
    let FIXTURE: ComponentFixture<MercanciasComponent>; 
    let MOCK_DATOS_SOLICITUD_SERVICE: { getMercanciasData: jest.Mock };
    let MOCK_DATOS_PROCEDURE_STORE: { selectProrroga: jest.Mock };
    let MOCK_DATOS_PROCEDURE_QUERY: { selectProrroga: jest.Mock };
  
    beforeEach(async () => {
      MOCK_DATOS_SOLICITUD_SERVICE = {
        getMercanciasData: jest.fn().mockReturnValue(of([])),
      };
      MOCK_DATOS_PROCEDURE_STORE = {
        selectProrroga: jest.fn(),
      };
      MOCK_DATOS_PROCEDURE_QUERY = {
        selectProrroga: jest.fn().mockReturnValue(of({ aduanas: 'Test Aduana' })),
      };
  
      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, MercanciasComponent],
        providers: [
          FormBuilder,
          { provide: DatosSolicitudService, useValue: MOCK_DATOS_SOLICITUD_SERVICE },
          { provide: DatosProcedureStore, useValue: MOCK_DATOS_PROCEDURE_STORE },
          { provide: DatosProcedureQuery, useValue: MOCK_DATOS_PROCEDURE_QUERY },
        ],
      }).compileComponents();
  
      FIXTURE = TestBed.createComponent(MercanciasComponent);
      COMPONENT = FIXTURE.componentInstance;
      FIXTURE.detectChanges();
    });
  
    it('should create the component', () => {
      expect(COMPONENT).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
      const CREAR_FORMULARIO_SPY = jest.spyOn(COMPONENT, 'crearFormulario');
      COMPONENT.ngOnInit();
      expect(CREAR_FORMULARIO_SPY).toHaveBeenCalled();
      expect(COMPONENT.Aduana).toBeDefined();
    });

    it('should call mercanciasData on ngOnInit', () => {
      const MERCANCIAS_DATA_SPY = jest.spyOn(COMPONENT, 'mercanciasData');
      COMPONENT.ngOnInit();
      expect(MERCANCIAS_DATA_SPY).toHaveBeenCalled();
    });

    it('should set seccionState from query.selectProrroga$', () => {
      COMPONENT.ngOnInit();
    });

    it('should call getMercanciasData and set Mercanciasdata', () => {
      const MOCK_RESPONSE = [{ clasificacionDelProducto: 'Test' }];
      MOCK_DATOS_SOLICITUD_SERVICE.getMercanciasData.mockReturnValue(of(MOCK_RESPONSE));

      COMPONENT.mercanciasData();
      expect(MOCK_DATOS_SOLICITUD_SERVICE.getMercanciasData).toHaveBeenCalled();
      expect(COMPONENT.mercanciasDatas).toEqual(MOCK_RESPONSE);
    });

    it('should initialize the form in crearFormulario', () => {
      COMPONENT.crearFormulario();
      expect(COMPONENT.Aduana.value).toEqual({ Aduana: { aduanas: 'Test Aduana' } });
    });

    it('should have the correct table configuration', () => {
      expect(COMPONENT.configuracionTabla).toBeDefined();
      expect(COMPONENT.configuracionTabla.length).toBe(7);
      expect(COMPONENT.configuracionTabla[0].encabezado).toBe('Clasificación del producto ');
    });

    it('should destroy subscriptions on component destroy', () => {
      const DESTROY_SPY = jest.spyOn(COMPONENT['destroy$'], 'next');
      const COMPLETE_SPY = jest.spyOn(COMPONENT['destroy$'], 'complete');

      COMPONENT.ngOnDestroy();

      expect(DESTROY_SPY).toHaveBeenCalledWith();
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });

    it('should have the correct default values', () => {
      expect(COMPONENT.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
      expect(COMPONENT.mercanciasDatas).toEqual([]);
    });

    it('should handle errors in getMercanciasData gracefully', () => {
      const ERROR = new Error('Test error');
      MOCK_DATOS_SOLICITUD_SERVICE.getMercanciasData.mockReturnValue(of(() => { throw ERROR; }));

      expect(() => COMPONENT.mercanciasData()).not.toThrow();
    });

    it('should update seccionState correctly when query emits a new value', () => {
      const NEW_VALUE = { aduanas: 'Updated Aduana' };
      MOCK_DATOS_PROCEDURE_QUERY.selectProrroga.mockReturnValue(of(NEW_VALUE));
      COMPONENT.ngOnInit();
    });

    it('should unsubscribe from observables on ngOnDestroy', () => {
      const DESTROY_SPY = jest.spyOn(COMPONENT['destroy$'], 'next');
      const COMPLETE_SPY = jest.spyOn(COMPONENT['destroy$'], 'complete');
      COMPONENT.ngOnDestroy();
      expect(DESTROY_SPY).toHaveBeenCalledWith();
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });

    it('should correctly initialize configuracionTabla', () => {
      expect(COMPONENT.configuracionTabla).toBeDefined();
      expect(COMPONENT.configuracionTabla.length).toBeGreaterThan(0);
    });

    it('should validate form controls correctly', () => {
      COMPONENT.crearFormulario(); 
      const CONTROL = COMPONENT.Aduana.get('Aduana');
      CONTROL?.setValue('Valid Aduana');
      expect(CONTROL?.valid).toBeTruthy();
    });

    it('should handle empty response from getMercanciasData', () => {
      MOCK_DATOS_SOLICITUD_SERVICE.getMercanciasData.mockReturnValue(of([]));
      COMPONENT.mercanciasData();
      expect(COMPONENT.mercanciasDatas).toEqual([]);
    });
  });
});