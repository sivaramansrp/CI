import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { AnexoComponent } from './anexo.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ImmexAmpliacionSensiblesStore } from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesQuery } from '../estados/immex-ampliacion-sensibles.query';
import { CatalogoServices } from '@ng-mf/data-access-user';
import { PermisoImmexDatosService } from '../services/permiso-immex-datos.service';

describe('AnexoComponent', () => {
  let component: AnexoComponent;
  let fixture: ComponentFixture<AnexoComponent>;

  // Mock services
  const mockPermisoImmexDatosService = {
    guardarFraccion: jest.fn().mockReturnValue(of({ 
      codigo: '00', 
      mensaje: 'Success', 
      datos: { 
        idFraccion: 123, 
        cveFraccion: '12345678', 
        umt: 'PZA', 
        descripcion: 'Test description' 
      } 
    }))
  };

  const mockConsultaQuery = {
    selectConsultaioState$: of({
      create: false,
      procedureId: '80203',
      readonly: false
    })
  };

  const mockImmexRegistroStore = {
    updateImportacion: jest.fn(),
    updateExportacion: jest.fn()
  };

  const mockImmexRegistroQuery = {
    selectImportacion$: of([]),
    selectExportacion$: of([])
  };

  const mockCatalogoService = {
    nicosCatalogo: jest.fn().mockReturnValue(of({
      datos: [
        { clave: 'NICO001', descripcion: 'Test NICO' }
      ]
    }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoComponent, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: PermisoImmexDatosService, useValue: mockPermisoImmexDatosService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: ImmexAmpliacionSensiblesStore, useValue: mockImmexRegistroStore },
        { provide: ImmexAmpliacionSensiblesQuery, useValue: mockImmexRegistroQuery },
        { provide: CatalogoServices, useValue: mockCatalogoService }
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AnexoComponent);
    component = fixture.componentInstance;
    
    // Prevent ExpressionChangedAfterItHasBeenCheckedError by allowing component to stabilize
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges(); // Second detection to handle any state changes
    await fixture.whenStable();
  });

  it('should create', async () => {
    // Extra stabilization for the create test
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', async () => {
    await fixture.whenStable();
    expect(component.pagenuevaNotificacion).toBe(false);
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.firstloadCompleted).toBe(false);
    expect(component.tramiteId).toBe('80202');
  });

  it('should have valid forms', async () => {
    await fixture.whenStable();
    expect(component.exportacionForm).toBeTruthy();
    expect(component.importacionForm).toBeTruthy();
    expect(component.exportacionForm.valid).toBeFalsy(); // Initially invalid due to required fields
    expect(component.importacionForm.valid).toBeFalsy(); // Initially invalid due to required fields
  });

  it('should initialize empty arrays', async () => {
    await fixture.whenStable();
    expect(component.nico).toEqual([]);
    expect(component.immexTableDatos).toEqual([]);
    expect(component.fraccionTablaDatos).toEqual([]);
    expect(component.nicoTablaDatos).toEqual([]);
    expect(component.selectedNicos).toEqual([]);
  });

  it('should handle onNumberInput correctly', async () => {
    const mockEvent = {
      target: { value: 'abc123def' }
    } as any;
    
    component.onNumberInput(mockEvent, 'importacionForm', 'cantidadAnual');
    fixture.detectChanges();
    await fixture.whenStable();
    
    // The input should be processed by the regex to remove non-numeric characters
    expect(mockEvent.target.value).toBe('123');
  });

  it('should validate cantidad por periodo correctly', async () => {
    // Set valid values
    component.importacionForm.patchValue({
      cantidadAnual: '300',
      cantidadPorPeriodo: '90'
    });
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.checkCantidadPorPeriodo()).toBe(true);
    
    // Set invalid values (periodo > anual/3)
    component.importacionForm.patchValue({
      cantidadAnual: '300',
      cantidadPorPeriodo: '150'
    });
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.checkCantidadPorPeriodo()).toBe(false);
  });

  it('should handle descripcionNico correctly', async () => {
    component.descripcionNico();
    fixture.detectChanges();
    await fixture.whenStable();
    
    const descripcionValue = component.importacionForm.get('productoDescExportacions')?.value;
    expect(descripcionValue).toContain('PRODUCTO-');
    expect(typeof descripcionValue).toBe('string');
  });

  it('should handle onFilaSeleccionada', async () => {
    const mockFraccion = {
      id: 1,
      fraccionArancelaria: '12345678',
      umt: 'PZA',
      descripcionTigie: 'Test'
    } as any;
    
    component.onFilaSeleccionada(mockFraccion);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.selectFraccionArancelaria).toEqual(mockFraccion);
  });

  it('should handle onFilaSeleccionadaExportacion', async () => {
    const mockExportacion = {
      id: 1,
      fraccionExportacion: '87654321'
    } as any;
    
    component.onFilaSeleccionadaExportacion(mockExportacion);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.selectExportacion).toEqual(mockExportacion);
  });

  it('should handle seleccionTablas correctly', async () => {
    const mockNicos = [
      { id: 1, NICO_Columna_1: 'NICO001', NICO_Columna_2: 'Description 1', estatus: false },
      { id: 2, NICO_Columna_1: 'NICO002', NICO_Columna_2: 'Description 2', estatus: false }
    ] as any;
    
    component.seleccionTablas(mockNicos);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.selectedNicos).toHaveLength(2);
    expect(component.selectedNicos[0].estatus).toBe(true);
    expect(component.selectedNicos[1].estatus).toBe(true);
  });

  it('should handle onNicoSeleccionado correctly', async () => {
    const mockNicos = [
      { id: 1, NICO_Columna_1: 'NICO001', NICO_Columna_2: 'Description 1', estatus: false }
    ] as any;
    
    component.onNicoSeleccionado(mockNicos);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.selectedExportNicos).toHaveLength(1);
    expect(component.selectedExportNicos[0].estatus).toBe(true);
  });

  it('should handle onNicoChange correctly', async () => {
    component.exportacionForm.patchValue({ nicos: 'NICO001' });
    
    component.onNicoChange();
    fixture.detectChanges();
    await fixture.whenStable();
    
    const descripcionValue = component.exportacionForm.get('descripcionNico')?.value;
    expect(descripcionValue).toContain('PRODUCTO-');
    expect(typeof descripcionValue).toBe('string');
  });

  it('should have correct form structure', async () => {
    await fixture.whenStable();
    
    // Check importacion form controls
    expect(component.importacionForm.get('id')).toBeTruthy();
    expect(component.importacionForm.get('fraccionArancelaria')).toBeTruthy();
    expect(component.importacionForm.get('cantidadAnual')).toBeTruthy();
    expect(component.importacionForm.get('capacidadInstalada')).toBeTruthy();
    expect(component.importacionForm.get('cantidadPorPeriodo')).toBeTruthy();
    
    // Check exportacion form controls
    expect(component.exportacionForm.get('id')).toBeTruthy();
    expect(component.exportacionForm.get('fraccionImportacion')).toBeTruthy();
    expect(component.exportacionForm.get('descripcionComercialExport')).toBeTruthy();
  });
});
