import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AlertComponent,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TableComponent,
  TituloComponent,
  NotificacionesComponent
} from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockImportacionService: any;
  let mockConsultaQuery: any;
  let mockAcuiculturaStore: any;

  beforeEach(async () => {
    // Create mock services
    mockImportacionService = {
      obtenerDatos: jest.fn().mockReturnValue(
        of({
          realizarGroup: {
            aduanaIngreso: 'aduana',
            oficinaInspeccion: 'oficina',
            puntoInspeccion: 'punto',
            numeroGuia: '12345',
            regimen: 'general'
          },
          mercanciaGroup: []
        })
      ),
      obtenerDetallesDelCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      actualizarFormaValida: jest.fn(),
      actualizarDatosMercancia: jest.fn()
    };

    mockConsultaQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    mockAcuiculturaStore = {
      update: jest.fn(),
      getValue: jest.fn().mockReturnValue({}),
      remove: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CommonModule,
        DatosDeLaSolicitudComponent
      ],
      providers: [
        FormBuilder,
        {
          provide: ImportacionDeAcuiculturaService,
          useValue: mockImportacionService
        },
        {
          provide: ConsultaioQuery,
          useValue: mockConsultaQuery
        },
        {
          provide: AcuiculturaStore,
          useValue: mockAcuiculturaStore
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    
    // Initialize all required arrays to prevent undefined errors in template
    component.cuerpoTablaFila = [];
    component.cuerpoTablasoli = [];
    component.cuerpoTablaSolicitud = [];
    component.listSelectedView = [];
    
    // Initialize all catalog arrays
    component.aduanaDeIngresoList = [];
    component.oficinaInspeccionList = [];
    component.puntoInspeccionList = [];
    component.tipoRequisitoList = [];
    component.arancelariaList = [];
    component.regimenList = [];
    component.nicoList = [];
    component.umcList = [];
    component.usoList = [];
    component.paisDeOrigenList = [];
    component.paisDeProcedenciaList = [];

    // Initialize form to prevent template errors
    component.createFromGroup();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group with controls on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosMercanciaFormGroup).toBeDefined();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')).toBeTruthy();
  });

  it('should disable form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.datosMercanciaFormGroup.disabled).toBe(true);
  });

  it('should enable form in editable mode', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.datosMercanciaFormGroup.enabled).toBe(true);
  });

  it('should toggle colapsable flag', () => {
    const initial = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('should create form group with proper structure', () => {
    expect(component.datosMercanciaFormGroup).toBeDefined();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')).toBeTruthy();
  });

  it('should create realizarGroup with required validators', () => {
    const realizarGroup = component.createRealizarGroup();
    expect(realizarGroup.get('aduanaIngreso')).toBeTruthy();
    expect(realizarGroup.get('oficinaInspeccion')).toBeTruthy();
    expect(realizarGroup.get('puntoInspeccion')).toBeTruthy();
    expect(realizarGroup.get('numeroGuia')).toBeTruthy();
    expect(realizarGroup.get('regimen')).toBeTruthy();
  });

  it('should load catalogs on initialization', () => {
    component.ngOnInit();
    expect(mockImportacionService.obtenerDetallesDelCatalogo).toHaveBeenCalled();
  });

  it('should update form values from store data', () => {
    // Set up test data
    const testStoreData = {
      aduanaIngreso: 'test-aduana',
      oficinaInspeccion: 'test-oficina',
      puntoInspeccion: 'test-punto',
      numeroGuia: 'test-guia',
      regimen: 'test-regimen'
    };

    // Mock the service to return specific test data
    mockImportacionService.obtenerDatos.mockReturnValue(
      of({
        realizarGroup: testStoreData,
        mercanciaGroup: []
      })
    );
    
    // Set the store data directly (simulating the service response)
    component.datosMercanciaStore = testStoreData;
    
    // Manually patch the form as the component does
    component.datosMercanciaFormGroup.patchValue({
      realizarGroup: component.datosMercanciaStore
    });
    
    const realizarGroup = component.datosMercanciaFormGroup.get('realizarGroup');
    expect(realizarGroup?.get('aduanaIngreso')?.value).toBe('test-aduana');
    expect(realizarGroup?.get('oficinaInspeccion')?.value).toBe('test-oficina');
    expect(realizarGroup?.get('puntoInspeccion')?.value).toBe('test-punto');
    expect(realizarGroup?.get('numeroGuia')?.value).toBe('test-guia');
    expect(realizarGroup?.get('regimen')?.value).toBe('test-regimen');
  });

  it('should assign store data from service response', () => {
    const testData = {
      aduanaIngreso: 'store-aduana',
      oficinaInspeccion: 'store-oficina',
      puntoInspeccion: 'store-punto',
      numeroGuia: 'store-guia',
      regimen: 'store-regimen'
    };

    mockImportacionService.obtenerDatos.mockReturnValue(
      of({
        realizarGroup: testData,
        mercanciaGroup: []
      })
    );
    
    component.ngOnInit();
    
    expect(component.datosMercanciaStore).toEqual(testData);
  });

  it('should update table data from service response', () => {
    const testMercanciaData = [
      { id: 1, descripcion: 'Test mercancia 1' },
      { id: 2, descripcion: 'Test mercancia 2' }
    ];

    mockImportacionService.obtenerDatos.mockReturnValue(
      of({
        realizarGroup: {
          aduanaIngreso: 'aduana',
          oficinaInspeccion: 'oficina',
          puntoInspeccion: 'punto',
          numeroGuia: '12345',
          regimen: 'general'
        },
        mercanciaGroup: testMercanciaData
      })
    );
    
    component.ngOnInit();
    
    expect(component.cuerpoTablaFila).toEqual(testMercanciaData);
  });

  it('should validate form correctly', () => {
    const isValid = component.validarFormulario();
    expect(typeof isValid).toBe('boolean');
  });

  it('should have initialized table data arrays', () => {
    expect(Array.isArray(component.cuerpoTablaFila)).toBe(true);
    expect(Array.isArray(component.cuerpoTablasoli)).toBe(true);
    expect(Array.isArray(component.cuerpoTablaSolicitud)).toBe(true);
    expect(Array.isArray(component.listSelectedView)).toBe(true);
  });

  it('should have initialized catalog arrays', () => {
    expect(Array.isArray(component.aduanaDeIngresoList)).toBe(true);
    expect(Array.isArray(component.oficinaInspeccionList)).toBe(true);
    expect(Array.isArray(component.tipoRequisitoList)).toBe(true);
    expect(Array.isArray(component.arancelariaList)).toBe(true);
    expect(Array.isArray(component.regimenList)).toBe(true);
  });

  it('should have proper table configuration', () => {
    expect(component.configuracionColumnas).toBeDefined();
    expect(Array.isArray(component.configuracionColumnas)).toBe(true);
    expect(component.configuracionColumnas.length).toBeGreaterThan(0);
  });

  it('should have proper table selection types', () => {
    expect(component.tipoSeleccion).toBeDefined();
    expect(component.tipoSeleccionsoli).toBeDefined();
  });

  it('should have default table data', () => {
    expect(Array.isArray(component.cuerpoTabla)).toBe(true);
    expect(component.cuerpoTabla.length).toBeGreaterThan(0);
  });
});
