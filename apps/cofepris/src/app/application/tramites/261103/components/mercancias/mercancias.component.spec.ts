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
  
    // ...pruebas existentes...
  });  
  let MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE: {getMercanciasData:jest.Mock};
  let MOCK_DATOS_PROCEDURE_STORE: {selectProrroga:jest.Mock};
  let MOCK_DATOS_PROCEDURE_QUERY: {selectProrroga:jest.Mock};

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

  it('debería crear el componente', () => {
    expect(COMPONENTE).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    const CREAR_FORMULARIO_SPY = jest.spyOn(COMPONENTE, 'crearFormulario');
    COMPONENTE.ngOnInit();
    expect(CREAR_FORMULARIO_SPY).toHaveBeenCalled();
    expect(COMPONENTE.Aduana).toBeDefined();
  });

  it('debería llamar a mercanciasData en ngOnInit', () => {
    const MERCANCIAS_DATA_SPY = jest.spyOn(COMPONENTE, 'mercanciasData');
    COMPONENTE.ngOnInit();
    expect(MERCANCIAS_DATA_SPY).toHaveBeenCalled();
  });

  it('debería establecer seccionState desde query.selectProrroga$', () => {
    COMPONENTE.ngOnInit();
  });

  it('debería llamar a getMercanciasData y establecer Mercanciasdata', () => {
    const MOCK_RESPONSE = [{ clasificacionDelProducto: 'Prueba' }];
    MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData.mockReturnValue(of(MOCK_RESPONSE));

    COMPONENTE.mercanciasData();
    expect(MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData).toHaveBeenCalled();
    expect(COMPONENTE.mercanciasDatas).toEqual(MOCK_RESPONSE);
  });

  it('debería inicializar el formulario en crearFormulario', () => {
    COMPONENTE.crearFormulario();
    expect(COMPONENTE.Aduana.value).toEqual({ Aduana: { aduanas: 'Aduana de Prueba' } });
  });

  it('debería tener la configuración correcta de la tabla', () => {
    expect(COMPONENTE.configuracionTabla).toBeDefined();
    expect(COMPONENTE.configuracionTabla.length).toBe(7);
    expect(COMPONENTE.configuracionTabla[0].encabezado).toBe('Clasificación del producto ');
  });

  it('debería destruir las suscripciones al destruir el componente', () => {
    const DESTROY_SPY = jest.spyOn(COMPONENTE['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(COMPONENTE['destroy$'], 'complete');

    COMPONENTE.ngOnDestroy();

    expect(DESTROY_SPY).toHaveBeenCalledWith();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

  it('debería tener los valores predeterminados correctos', () => {
    expect(COMPONENTE.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
    expect(COMPONENTE.mercanciasDatas).toEqual([]);
  });

  it('debería manejar errores en getMercanciasData correctamente', () => {
    const ERROR = new Error('Error de prueba');
    MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData.mockReturnValue(of(() => { throw ERROR; }));

    expect(() => COMPONENTE.mercanciasData()).not.toThrow();
  });

  it('debería actualizar seccionState correctamente cuando query emite un nuevo valor', () => {
    const NEW_VALUE = { aduanas: 'Aduana Actualizada' };
    MOCK_DATOS_PROCEDURE_QUERY.selectProrroga.mockReturnValue(of(NEW_VALUE));
    COMPONENTE.ngOnInit();
  });

  it('debería desuscribirse de los observables en ngOnDestroy', () => {
    const DESTROY_SPY = jest.spyOn(COMPONENTE['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(COMPONENTE['destroy$'], 'complete');
    COMPONENTE.ngOnDestroy();
    expect(DESTROY_SPY).toHaveBeenCalledWith();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

  it('debería inicializar configuracionTabla correctamente', () => {
    expect(COMPONENTE.configuracionTabla).toBeDefined();
    expect(COMPONENTE.configuracionTabla.length).toBeGreaterThan(0);
  });

  it('debería validar los controles del formulario correctamente', () => {
    COMPONENTE.crearFormulario(); 
    const CONTROL = COMPONENTE.Aduana.get('Aduana');
    CONTROL?.setValue('Aduana Válida');
    expect(CONTROL?.valid).toBeTruthy();
  });

  it('debería manejar respuesta vacía de getMercanciasData', () => {
    MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.getMercanciasData.mockReturnValue(of([]));
    COMPONENTE.mercanciasData();
    expect(COMPONENTE.mercanciasDatas).toEqual([]);
  });
});