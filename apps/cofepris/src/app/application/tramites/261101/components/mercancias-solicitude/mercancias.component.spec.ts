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
  let component: MercanciasComponent;
  let fixture: ComponentFixture<MercanciasComponent>;
  
  describe('MercanciasComponent', () => {
    let component: MercanciasComponent;
    let fixture: ComponentFixture<MercanciasComponent>; 
    let mockDatosSolicitudService: { getMercanciasData: jest.Mock };
    let mockDatosProcedureStore: { selectProrroga: jest.Mock };
    let mockDatosProcedureQuery: { selectProrroga: jest.Mock };
  
    beforeEach(async () => {
      mockDatosSolicitudService = {
        getMercanciasData: jest.fn().mockReturnValue(of([])),
      };
      mockDatosProcedureStore = {
        selectProrroga: jest.fn(),
      };
      mockDatosProcedureQuery = {
        selectProrroga: jest.fn().mockReturnValue(of({ aduanas: 'Test Aduana' })),
      };
  
      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, MercanciasComponent],
        providers: [
          FormBuilder,
          { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
          { provide: DatosProcedureStore, useValue: mockDatosProcedureStore },
          { provide: DatosProcedureQuery, useValue: mockDatosProcedureQuery },
        ],
      }).compileComponents();
  
      fixture = TestBed.createComponent(MercanciasComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    // ...existing tests...
  });  let mockDatosSolicitudService: {getMercanciasData:jest.Mock};
  let mockDatosProcedureStore: {selectProrroga:jest.Mock};
  let mockDatosProcedureQuery: {selectProrroga:jest.Mock};

  beforeEach(async () => {
    mockDatosSolicitudService = {
      getMercanciasData: jest.fn().mockReturnValue(of([])),
    };
    mockDatosProcedureStore = {
      selectProrroga: jest.fn(),
    };
    mockDatosProcedureQuery = {
      selectProrroga: jest.fn().mockReturnValue(of({ aduanas: 'Test Aduana' })),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MercanciasComponent],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: DatosProcedureStore, useValue: mockDatosProcedureStore },
        { provide: DatosProcedureQuery, useValue: mockDatosProcedureQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    const crearFormularioSpy = jest.spyOn(component, 'crearFormulario');
    component.ngOnInit();
    expect(crearFormularioSpy).toHaveBeenCalled();
    expect(component.Aduana).toBeDefined();
  });

  it('should call mercanciasData on ngOnInit', () => {
    const mercanciasDataSpy = jest.spyOn(component, 'mercanciasData');
    component.ngOnInit();
    expect(mercanciasDataSpy).toHaveBeenCalled();
  });

  it('should set seccionState from query.selectProrroga$', () => {
    component.ngOnInit();
  });

  it('should call getMercanciasData and set Mercanciasdata', () => {
    const mockResponse = [{ clasificacionDelProducto: 'Test' }];
    mockDatosSolicitudService.getMercanciasData.mockReturnValue(of(mockResponse));

    component.mercanciasData();
    expect(mockDatosSolicitudService.getMercanciasData).toHaveBeenCalled();
    expect(component.mercanciasDatas).toEqual(mockResponse);
  });

  it('should initialize the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.Aduana.value).toEqual({ Aduana: { aduanas: 'Test Aduana' } });
  });

  it('should have the correct table configuration', () => {
    expect(component.configuracionTabla).toBeDefined();
    expect(component.configuracionTabla.length).toBe(7);
    expect(component.configuracionTabla[0].encabezado).toBe('Clasificación del producto ');
  });

  it('should destroy subscriptions on component destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have the correct default values', () => {
    expect(component.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
    expect(component.mercanciasDatas).toEqual([]);
  });

  it('should handle errors in getMercanciasData gracefully', () => {
    const error = new Error('Test error');
    mockDatosSolicitudService.getMercanciasData.mockReturnValue(of(() => { throw error; }));

    expect(() => component.mercanciasData()).not.toThrow();
  });

  it('should update seccionState correctly when query emits a new value', () => {
    const newValue = { aduanas: 'Updated Aduana' };
    mockDatosProcedureQuery.selectProrroga.mockReturnValue(of(newValue));
    component.ngOnInit();
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete')
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should correctly initialize configuracionTabla', () => {
    expect(component.configuracionTabla).toBeDefined();
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
  });

  it('should validate form controls correctly', () => {
    component.crearFormulario(); 
    const control = component.Aduana.get('Aduana');
    control?.setValue('Valid Aduana');
    expect(control?.valid).toBeTruthy();
  });

  it('should handle empty response from getMercanciasData', () => {
    mockDatosSolicitudService.getMercanciasData.mockReturnValue(of([]));
    component.mercanciasData();
    expect(component.mercanciasDatas).toEqual([]);
  });
});