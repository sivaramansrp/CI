import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculosComponent } from './vehiculos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite40102Store } from '../../estados/Tramite40102Store';
import { Tramite40102Query } from '../../estados/tramite40102.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockService: any;
  let mockValidaciones: any;

  beforeEach(async () => {
    mockStore = {
      // Add mock methods if needed
    };
    mockQuery = {
      selectSolicitud$: of({
        datosVehiculo: {},
        datosUnidad: {},
      }),
    };
    mockService = {
      obtenerPedimentoTabla: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerTipoDeVehiculo: jest.fn().mockReturnValue(of({ datos: [] })),
    };
    mockValidaciones = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [VehiculosComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40102Store, useValue: mockStore },
        { provide: Tramite40102Query, useValue: mockQuery },
        { provide: modificarTerrestreService, useValue: mockService },
        { provide: ValidacionesFormularioService, useValue: mockValidaciones },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    // Provide minimal state for forms
    component.tramiteState = {
      datosVehiculo: {},
      datosUnidad: {},
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select tab', () => {
    const result = component.selectTab('unidadarrastre');
    expect(component.selectedTab).toBe('Unidad de arrastre');
    expect(result).toBe('unidadarrastre');
  });

  it('should initialize forms', () => {
    component.tramiteState = {
      datosVehiculo: {},
      datosUnidad: {},
    } as any;
    component.inicializarFormulario();
    expect(component.vehiculoFormulario).toBeDefined();
    expect(component.unidadFormulario).toBeDefined();
  });

  it('should validate form field', () => {
    const form = component.vehiculoFormulario;
    const result = component.isValid(form, 'numero');
    expect(mockValidaciones.isValid).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should add vehicle data', () => {
    component.vehiculoFormulario = component.fb.group({
      numero: ['123'],
      tipoDeVehiculo: ['tipo'],
      idDeVehiculo: ['id'],
      numeroPlaca: ['placa'],
      paisEmisor: ['pais'],
      estado: ['estado'],
      marca: ['marca'],
      modelo: ['modelo'],
      ano: ['2020'],
      transponder: ['trans'],
      colorVehiculo: ['rojo'],
      numuroEconomico: ['eco'],
      numero2daPlaca: ['placa2'],
      estado2daPlaca: ['estado2'],
      paisEmisor2daPlaca: ['pais2'],
      descripcion: ['desc'],
    });
    component.closeModal = { nativeElement: { click: jest.fn() } } as any;
    component.vehiculosTablaConfig.datos = [];
    component.agregarVahiculodata();
    expect(component.vehiculosTablaConfig.datos.length).toBe(1);
  });

  it('should add unidad data', () => {
    component.unidadFormulario = component.fb.group({
      vinVehiculo: ['vin'],
      tipoDeUnidadArrastre: ['tipo'],
      idDeVehiculo: ['id'],
      numeroEconomico: ['eco'],
      numeroPlaca: ['placa'],
      paisEmisor: ['pais'],
      estado: ['estado'],
      colorVehiculo: ['rojo'],
      numero2daPlaca: ['placa2'],
      estado2daPlaca: ['estado2'],
      paisEmisor2daPlaca: ['pais2'],
      descripcion: ['desc'],
    });
    component.closeUnidadModal = { nativeElement: { click: jest.fn() } } as any;
    component.unidadesTablaConfig.datos = [];
    component.agregarUnidadData();
    expect(component.unidadesTablaConfig.datos.length).toBe(1);
  });

  it('should clear vehiculo form', () => {
    component.vehiculoFormulario = component.fb.group({ test: ['value'] });
    component.limpiarVahiculodata();
    expect(component.vehiculoFormulario.value).toEqual({ test: null });
  });

  it('should clear unidad form', () => {
    component.unidadFormulario = component.fb.group({ test: ['value'] });
    component.limpiarUnidaddata();
    expect(component.unidadFormulario.value).toEqual({ test: null });
  });

  it('should open notification modal', () => {
    component.abrirModal();
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.mensaje).toContain('agregado');
  });

  it('should call cargarTipoDeVehiculo', () => {
    component.cargarTipoDeVehiculo();
    expect(mockService.obtenerTipoDeVehiculo).toHaveBeenCalled();
  });

  it('should call cargarPedimentoTabla', () => {
    component.cargarPedimentoTabla();
    expect(mockService.obtenerPedimentoTabla).toHaveBeenCalled();
  });
});