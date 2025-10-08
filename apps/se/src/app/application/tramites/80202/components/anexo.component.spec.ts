import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AnexoComponent } from './anexo.component';
import { PermisoImmexDatosService } from '../services/permiso-immex-datos.service';
import { ImmexAmpliacionSensiblesStore } from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesQuery } from '../estados/immex-ampliacion-sensibles.query';
import { CatalogoServices, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('AnexoComponent', () => {
  let component: AnexoComponent;
  let fixture: ComponentFixture<AnexoComponent>;
  let mockPermisoService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaQuery: any;
  let mockCatalogoService: any;

  beforeEach(async () => {
    // Create mock services
    mockPermisoService = {
      guardarFraccion: jest.fn(),
      guardarFraccionExportacion: jest.fn()
    };

    mockStore = {
      updateImportacion: jest.fn(),
      updateExportacion: jest.fn()
    };

    mockQuery = {
      selectImportacion$: of([]),
      selectExportacion$: of([])
    };

    mockConsultaQuery = {
      selectConsultaioState$: of({
        create: false,
        procedureId: '80203',
        readonly: false
      })
    };

    mockCatalogoService = {
      nicosCatalogo: jest.fn().mockReturnValue(of({ datos: [] }))
    };

    await TestBed.configureTestingModule({
      imports: [AnexoComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PermisoImmexDatosService, useValue: mockPermisoService },
        { provide: ImmexAmpliacionSensiblesStore, useValue: mockStore },
        { provide: ImmexAmpliacionSensiblesQuery, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: CatalogoServices, useValue: mockCatalogoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on construction', () => {
    expect(component.exportacionForm).toBeDefined();
    expect(component.importacionForm).toBeDefined();
  });

  it('should have tramiteId set to 80202', () => {
    expect(component.tramiteId).toBe('80202');
  });

  it('should validate cantidad por periodo correctly', () => {
    component.importacionForm.patchValue({
      cantidadAnual: '300',
      cantidadPorPeriodo: '50'
    });
    expect(component.checkCantidadPorPeriodo()).toBe(true);
  });

  it('should return false when cantidad por periodo exceeds one third of anual', () => {
    component.importacionForm.patchValue({
      cantidadAnual: '300',
      cantidadPorPeriodo: '150'
    });
    expect(component.checkCantidadPorPeriodo()).toBe(false);
  });

  it('should generate random description for NICO', () => {
    component.descripcionNico();
    const value = component.importacionForm.get('productoDescExportacions')?.value;
    expect(value).toContain('PRODUCTO-');
  });

  it('should select fraccion arancelaria', () => {
    const testData = {
      id: 1,
      fraccionArancelaria: '12345678',
      umt: 'KG'
    };
    component.onFilaSeleccionada(testData as any);
    expect(component.selectFraccionArancelaria).toEqual(testData);
  });

  it('should select exportacion row', () => {
    const testData = {
      id: 1,
      fraccionExportacion: '12345678',
      descripcionComercialExport: 'Test'
    };
    component.onFilaSeleccionadaExportacion(testData as any);
    expect(component.selectExportacion).toEqual(testData);
  });

  it('should handle nico selection', () => {
    const nicos = [
      { id: 1, NICO_Columna_1: '001', NICO_Columna_2: 'Test', estatus: false }
    ];
    component.seleccionTablas(nicos as any);
    expect(component.selectedNicos.length).toBe(1);
    expect(component.selectedNicos[0].estatus).toBe(true);
  });

  it('should handle export nico selection', () => {
    const nicos = [
      { id: 1, NICO_Columna_1: '001', NICO_Columna_2: 'Test', estatus: false }
    ];
    component.onNicoSeleccionado(nicos as any);
    expect(component.selectedExportNicos.length).toBe(1);
  });

  it('should update nico description on change', () => {
    component.exportacionForm.patchValue({ nicos: '001' });
    component.onNicoChange();
    const value = component.exportacionForm.get('descripcionNico')?.value;
    expect(value).toContain('PRODUCTO-');
  });

  it('should filter numeric input correctly', () => {
    const event = {
      target: { value: 'abc123def456' }
    } as any;
    
    component.onNumberInput(event, 'importacionForm', 'cantidadAnual');
    expect(component.importacionForm.get('cantidadAnual')?.value).toBe('123456');
  });

  it('should reset form on cerrarModal', () => {
    component.importacionForm.patchValue({
      fraccionArancelaria: '12345678'
    });
    component.cerrarModal();
    expect(component.importacionForm.get('fraccionArancelaria')?.value).toBeNull();
  });

  it('should have initial table data as empty arrays', () => {
    expect(component.immexTableDatos).toEqual([]);
    expect(component.fraccionTablaDatos).toEqual([]);
    expect(component.nicoTablaDatos).toEqual([]);
  });
});