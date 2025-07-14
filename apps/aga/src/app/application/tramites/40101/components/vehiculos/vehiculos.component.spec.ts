import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculosComponent } from './vehiculos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite40101Store } from '../../estado/tramite40101.store';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
import { AgregarTransporteComponent, AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SelectPaisesComponent, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Modal } from 'bootstrap';

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockService: any;
  let mockValidaciones: any;

  beforeEach(async () => {
    mockStore = {
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
      imports: [
        AgregarTransporteComponent,
        SelectPaisesComponent,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
        AlertComponent,
        ReactiveFormsModule,
        TituloComponent,
        BtnContinuarComponent
      ],
      declarations: [VehiculosComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40101Store, useValue: mockStore },
        { provide: Tramite40101Query, useValue: mockQuery },
        { provide: modificarTerrestreService, useValue: mockService },
        { provide: ValidacionesFormularioService, useValue: mockValidaciones },
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
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

    it('should update vehicle data', () => {
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
    component.vehiculosTablaConfig.datos = [{}as any];
    component.editIndex = 0; 
    component.agregarVahiculodata();
    expect(component.vehiculosTablaConfig.datos.length).toBe(1);
    expect(component.vehiculosTablaConfig.datos[0].numero).toBe('123');
   
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

  it('should edit unidad data', () => {
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
    component.unidadesTablaConfig.datos = [{} as any];
    const initialLength = component.unidadesTablaConfig.datos.length;
    component.editUnidadIndex = 0;
    component.agregarUnidadData();
    expect(component.unidadesTablaConfig.datos.length).toBe(initialLength);
    expect(component.unidadesTablaConfig.datos[0].vinVehiculo).toBe('vin');
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



jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('VehiculosComponent - Selected Functions', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockStore: jest.Mocked<Tramite40101Store>;
  let mockQuery: jest.Mocked<Tramite40101Query>;
  let mockModificarService: jest.Mocked<modificarTerrestreService>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;
  let mockModal: jest.Mocked<Modal>;

  const mockTramiteState = {
    datosVehiculo: {
      numero: '',
      tipoDeVehiculo: '',
      idDeVehiculo: '',
      numeroPlaca: '',
      paisEmisor: '',
      estado: '',
      marca: '',
      modelo: '',
      ano: '',
      transponder: '',
      colorVehiculo: '',
      numuroEconomico: '',
      numero2daPlaca: '',
      estado2daPlaca: '',
      paisEmisor2daPlaca: '',
      descripcion: '',
    },
    datosUnidad: {
      vinVehiculo: '',
      tipoDeUnidadArrastre: '',
      idDeVehiculo: '',
      numeroEconomico: '',
      numeroPlaca: '',
      paisEmisor: '',
      estado: '',
      colorVehiculo: '',
      numero2daPlaca: '',
      estado2daPlaca: '',
      paisEmisor2daPlaca: '',
      descripcion: '',
    },
  };

  beforeEach(async () => {
    mockModal = {
      show: jest.fn(),
      hide: jest.fn(),
    } as unknown as jest.Mocked<Modal>;

    mockStore = {
      update: jest.fn(),
    } as unknown as jest.Mocked<Tramite40101Store>;

    mockQuery = {
      selectSolicitud$: of(mockTramiteState),
    } as unknown as jest.Mocked<Tramite40101Query>;

    mockModificarService = {
      obtenerPedimentoTabla: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerTipoDeVehiculo: jest.fn().mockReturnValue(of({ datos: [] })),
    } as unknown as jest.Mocked<modificarTerrestreService>;

    mockValidacionesService = {
      isValid: jest.fn(),
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [VehiculosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite40101Store, useValue: mockStore },
        { provide: Tramite40101Query, useValue: mockQuery },
        { provide: modificarTerrestreService, useValue: mockModificarService },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;

    component.tramiteState = mockTramiteState;
    component.ngOnInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('eliminarPedimento', () => {
    it('should clear vehiculos table data and reset edit index and form', () => {
      component.vehiculosTablaConfig.datos = [{ numero: '1', tipoDeVehiculo: 'Camión', marca: 'Ford' } as any];
      component.editIndex = 5;
      const resetSpy = jest.spyOn(component.vehiculoFormulario, 'reset');

      component.eliminarPedimento();

      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should handle empty table data without errors', () => {
      component.vehiculosTablaConfig.datos = [];
      component.editIndex = null;
      const resetSpy = jest.spyOn(component.vehiculoFormulario, 'reset');

      expect(() => component.eliminarPedimento()).not.toThrow();

      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should reset form even when form is already pristine', () => {
      const resetSpy = jest.spyOn(component.vehiculoFormulario, 'reset');
      component.vehiculoFormulario.reset();

      component.eliminarPedimento();

      expect(resetSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple consecutive calls', () => {
      component.vehiculosTablaConfig.datos = [{ numero: '1' } as any, { numero: '2' } as any];
      component.editIndex = 1;

      component.eliminarPedimento();
      component.eliminarPedimento();
      component.eliminarPedimento();

      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
    });
  });

  describe('eliminarUnidadPedimento', () => {
    it('should clear unidades table data and reset edit index and form', () => {
      component.unidadesTablaConfig.datos = [{ vinVehiculo: 'VIN123', tipoDeUnidadArrastre: 'Remolque' } as any];
      component.editUnidadIndex = 3;
      const resetSpy = jest.spyOn(component.unidadFormulario, 'reset');

      component.eliminarUnidadPedimento();

      expect(component.unidadesTablaConfig.datos).toEqual([]);
      expect(component.editUnidadIndex).toBeNull();
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should handle empty unidades table data without errors', () => {
      component.unidadesTablaConfig.datos = [];
      component.editUnidadIndex = null;
      const resetSpy = jest.spyOn(component.unidadFormulario, 'reset');

      expect(() => component.eliminarUnidadPedimento()).not.toThrow();

      expect(component.unidadesTablaConfig.datos).toEqual([]);
      expect(component.editUnidadIndex).toBeNull();
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should reset form when form has validation errors', () => {
      component.unidadFormulario.get('vinVehiculo')?.setErrors({ required: true });
      const resetSpy = jest.spyOn(component.unidadFormulario, 'reset');

      component.eliminarUnidadPedimento();

      expect(resetSpy).toHaveBeenCalled();
      expect(component.editUnidadIndex).toBeNull();
    });

    it('should handle large datasets efficiently', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        vinVehiculo: `VIN${i}`,
        tipoDeUnidadArrastre: `Type${i}`,
      }));
      component.unidadesTablaConfig.datos = largeDataset as any[];
      component.editUnidadIndex = 999;

      const startTime = performance.now();
      component.eliminarUnidadPedimento();
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10);
      expect(component.unidadesTablaConfig.datos).toEqual([]);
      expect(component.editUnidadIndex).toBeNull();
    });
  });

  describe('abiertoPedimento', () => {
    it('should show modal when vehiculoModal is available', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      component.vehiculoModal = mockElementRef;

      component.abiertoPedimento();

      expect(Modal).toHaveBeenCalledWith(mockElementRef.nativeElement);
    });

    it('should not throw error when vehiculoModal is undefined', () => {
      component.vehiculoModal = undefined as any;

      expect(() => component.abiertoPedimento()).not.toThrow();
      expect(Modal).not.toHaveBeenCalled();
    });

    it('should not throw error when vehiculoModal is null', () => {
      component.vehiculoModal = null as any;

      expect(() => component.abiertoPedimento()).not.toThrow();
      expect(Modal).not.toHaveBeenCalled();
    });

    it('should create new Modal instance each time', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      component.vehiculoModal = mockElementRef;

      component.abiertoPedimento();
      component.abiertoPedimento();
      component.abiertoPedimento();

      expect(Modal).toHaveBeenCalledTimes(3);
    });

    it('should create new unidadModal instance each time', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      component.unidadModal = mockElementRef;

      component.abiertoPedimentoUnidad();
      component.abiertoPedimentoUnidad();
      component.abiertoPedimentoUnidad();

      expect(Modal).toHaveBeenCalledTimes(3);
    });

    it('should work with different DOM elements', () => {
      const divElement = document.createElement('div');
      const modalElement = document.createElement('modal');

      const mockElementRef1 = { nativeElement: divElement } as ElementRef;
      const mockElementRef2 = { nativeElement: modalElement } as ElementRef;

      component.vehiculoModal = mockElementRef1;
      component.abiertoPedimento();

      component.vehiculoModal = mockElementRef2;
      component.abiertoPedimento();

      expect(Modal).toHaveBeenCalledWith(divElement);
      expect(Modal).toHaveBeenCalledWith(modalElement);
    });

    it('should handle truthy but invalid vehiculoModal values', () => {
      const invalidValues = [
        { nativeElement: null },
        { nativeElement: undefined },
        { someOtherProperty: 'value' },
        { nativeElement: 'string' },
        { nativeElement: 123 },
      ];

      invalidValues.forEach((invalidValue, index) => {
        component.vehiculoModal = invalidValue as any;

        if (invalidValue.nativeElement) {
          expect(() => component.abiertoPedimento()).not.toThrow();
        } else {
          expect(() => component.abiertoPedimento()).not.toThrow();
        }
      });
    });
  });

  describe('Integration Tests', () => {
    it('should work correctly when eliminarPedimento is called before abiertoPedimento', () => {
      component.vehiculosTablaConfig.datos = [{ numero: '1' } as any];
      component.editIndex = 1;
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      component.vehiculoModal = mockElementRef;

      component.eliminarPedimento();
      component.abiertoPedimento();

      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
      expect(Modal).toHaveBeenCalled();
    });

    it('should handle rapid consecutive calls to all three methods', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      component.vehiculoModal = mockElementRef;
      component.vehiculosTablaConfig.datos = [{ numero: '1' } as any];
      component.unidadesTablaConfig.datos = [{ vinVehiculo: 'VIN1' } as any];

      component.eliminarPedimento();
      component.eliminarUnidadPedimento();
      component.abiertoPedimento();
      component.eliminarPedimento();
      component.abiertoPedimento();

      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.unidadesTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
      expect(component.editUnidadIndex).toBeNull();
      expect(Modal).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle component destruction during method execution', () => {
      component.destroyNotifier$ = new Subject<void>();
      const destroySpy = jest.spyOn(component.destroyNotifier$, 'next');

      component.eliminarPedimento();
      component.eliminarUnidadPedimento();

      component.destroyNotifier$.next();
      component.destroyNotifier$.complete();

      expect(() => {
        component.eliminarPedimento();
        component.eliminarUnidadPedimento();
      }).not.toThrow();
    });

    it('should maintain data integrity when forms are undefined', () => {
      component.vehiculoFormulario = undefined as any;
      component.unidadFormulario = undefined as any;

      expect(() => component.eliminarPedimento()).toThrow();
      expect(() => component.eliminarUnidadPedimento()).toThrow();
    });

    it('should handle memory constraints with large datasets', () => {
      const hugeVehiculoDataset = Array.from({ length: 10000 }, (_, i) => ({ numero: `${i}` }));
      const hugeUnidadDataset = Array.from({ length: 10000 }, (_, i) => ({ vinVehiculo: `VIN${i}` }));

      component.vehiculosTablaConfig.datos = hugeVehiculoDataset as any;
      component.unidadesTablaConfig.datos = hugeUnidadDataset as any;

      const vehiculoStartTime = performance.now();
      component.eliminarPedimento();
      const vehiculoEndTime = performance.now();

      const unidadStartTime = performance.now();
      component.eliminarUnidadPedimento();
      const unidadEndTime = performance.now();

      expect(vehiculoEndTime - vehiculoStartTime).toBeLessThan(50);
      expect(unidadEndTime - unidadStartTime).toBeLessThan(50);
      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.unidadesTablaConfig.datos).toEqual([]);
    });
  });
});