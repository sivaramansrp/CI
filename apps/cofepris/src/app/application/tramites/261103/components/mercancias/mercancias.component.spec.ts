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
  let componente: MercanciasComponent;
  let fixture: ComponentFixture<MercanciasComponent>;
  
  describe('MercanciasComponent', () => {
    let componente: MercanciasComponent;
    let fixture: ComponentFixture<MercanciasComponent>; 
    let mockModificacionPermisoImportacionMedicamentosService: { getMercanciasData: jest.Mock };
    let mockDatosProcedureStore: { selectProrroga: jest.Mock };
    let mockDatosProcedureQuery: { selectProrroga: jest.Mock };
  
    beforeEach(async () => {
      mockModificacionPermisoImportacionMedicamentosService = {
        getMercanciasData: jest.fn().mockReturnValue(of([])),
      };
      mockDatosProcedureStore = {
        selectProrroga: jest.fn(),
      };
      mockDatosProcedureQuery = {
        selectProrroga: jest.fn().mockReturnValue(of({ aduanas: 'Aduana de Prueba' })),
      };
  
      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, MercanciasComponent],
        providers: [
          FormBuilder,
          { provide: ModificacionPermisoImportacionMedicamentosService, useValue: mockModificacionPermisoImportacionMedicamentosService },
          { provide: DatosProcedureStore, useValue: mockDatosProcedureStore },
          { provide: DatosProcedureQuery, useValue: mockDatosProcedureQuery },
        ],
      }).compileComponents();
  
      fixture = TestBed.createComponent(MercanciasComponent);
      componente = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    // ...pruebas existentes...
  });  
  let mockModificacionPermisoImportacionMedicamentosService: {getMercanciasData:jest.Mock};
  let mockDatosProcedureStore: {selectProrroga:jest.Mock};
  let mockDatosProcedureQuery: {selectProrroga:jest.Mock};

  beforeEach(async () => {
    mockModificacionPermisoImportacionMedicamentosService = {
      getMercanciasData: jest.fn().mockReturnValue(of([])),
    };
    mockDatosProcedureStore = {
      selectProrroga: jest.fn(),
    };
    mockDatosProcedureQuery = {
      selectProrroga: jest.fn().mockReturnValue(of({ aduanas: 'Aduana de Prueba' })),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MercanciasComponent],
      providers: [
        FormBuilder,
        { provide: ModificacionPermisoImportacionMedicamentosService, useValue: mockModificacionPermisoImportacionMedicamentosService },
        { provide: DatosProcedureStore, useValue: mockDatosProcedureStore },
        { provide: DatosProcedureQuery, useValue: mockDatosProcedureQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    const crearFormularioSpy = jest.spyOn(componente, 'crearFormulario');
    componente.ngOnInit();
    expect(crearFormularioSpy).toHaveBeenCalled();
    expect(componente.Aduana).toBeDefined();
  });

  it('debería llamar a mercanciasData en ngOnInit', () => {
    const mercanciasDataSpy = jest.spyOn(componente, 'mercanciasData');
    componente.ngOnInit();
    expect(mercanciasDataSpy).toHaveBeenCalled();
  });

  it('debería establecer seccionState desde query.selectProrroga$', () => {
    componente.ngOnInit();
  });

  it('debería llamar a getMercanciasData y establecer Mercanciasdata', () => {
    const mockResponse = [{ clasificacionDelProducto: 'Prueba' }];
    mockModificacionPermisoImportacionMedicamentosService.getMercanciasData.mockReturnValue(of(mockResponse));

    componente.mercanciasData();
    expect(mockModificacionPermisoImportacionMedicamentosService.getMercanciasData).toHaveBeenCalled();
    expect(componente.mercanciasDatas).toEqual(mockResponse);
  });

  it('debería inicializar el formulario en crearFormulario', () => {
    componente.crearFormulario();
    expect(componente.Aduana.value).toEqual({ Aduana: { aduanas: 'Aduana de Prueba' } });
  });

  it('debería tener la configuración correcta de la tabla', () => {
    expect(componente.configuracionTabla).toBeDefined();
    expect(componente.configuracionTabla.length).toBe(7);
    expect(componente.configuracionTabla[0].encabezado).toBe('Clasificación del producto ');
  });

  it('debería destruir las suscripciones al destruir el componente', () => {
    const destroySpy = jest.spyOn(componente['destroy$'], 'next');
    const completeSpy = jest.spyOn(componente['destroy$'], 'complete');

    componente.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería tener los valores predeterminados correctos', () => {
    expect(componente.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
    expect(componente.mercanciasDatas).toEqual([]);
  });

  it('debería manejar errores en getMercanciasData correctamente', () => {
    const error = new Error('Error de prueba');
    mockModificacionPermisoImportacionMedicamentosService.getMercanciasData.mockReturnValue(of(() => { throw error; }));

    expect(() => componente.mercanciasData()).not.toThrow();
  });

  it('debería actualizar seccionState correctamente cuando query emite un nuevo valor', () => {
    const newValue = { aduanas: 'Aduana Actualizada' };
    mockDatosProcedureQuery.selectProrroga.mockReturnValue(of(newValue));
    componente.ngOnInit();
  });

  it('debería desuscribirse de los observables en ngOnDestroy', () => {
    const destroySpy = jest.spyOn(componente['destroy$'], 'next');
    const completeSpy = jest.spyOn(componente['destroy$'], 'complete');
    componente.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería inicializar configuracionTabla correctamente', () => {
    expect(componente.configuracionTabla).toBeDefined();
    expect(componente.configuracionTabla.length).toBeGreaterThan(0);
  });

  it('debería validar los controles del formulario correctamente', () => {
    componente.crearFormulario(); 
    const control = componente.Aduana.get('Aduana');
    control?.setValue('Aduana Válida');
    expect(control?.valid).toBeTruthy();
  });

  it('debería manejar respuesta vacía de getMercanciasData', () => {
    mockModificacionPermisoImportacionMedicamentosService.getMercanciasData.mockReturnValue(of([]));
    componente.mercanciasData();
    expect(componente.mercanciasDatas).toEqual([]);
  });
});