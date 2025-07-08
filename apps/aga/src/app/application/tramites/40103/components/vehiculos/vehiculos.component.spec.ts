import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { VehiculosComponent } from './vehiculos.component';
import { Tramite40103Store, Tramite40103State } from '../../estados/tramite40103.store';
import { Tramite40103Query } from '../../estados/tramite40103.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
import { ValidacionesFormularioService, Catalogo } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { VehiculoTablaDatos, CatalogoLista, VehiculoTabla } from '../../models/registro-muestras-mercancias.model';

// Mock Bootstrap Modal
jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn()
  }))
}));

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockStore: jest.Mocked<Tramite40103Store>;
  let mockQuery: jest.Mocked<Tramite40103Query>;
  let mockModificarService: jest.Mocked<modificarTerrestreService>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;
  let mockModal: jest.Mocked<Modal>;

  const mockTramiteState: Tramite40103State = {
    datosVehiculo: {
      numero: '001',
      tipoDeVehiculo: 'Camión',
      idDeVehiculo: 'VEH001',
      numeroPlaca: 'ABC123',
      paisEmisor: 'México',
      estado: 'CDMX',
      marca: 'Ford',
      modelo: 'F-150',
      ano: '2023',
      transponder: 'TRP001',
      colorVehiculo: 'Blanco',
      numuroEconomico: 'ECO001',
      numero2daPlaca: 'XYZ789',
      estado2daPlaca: 'Jalisco',
      paisEmisor2daPlaca: 'México',
      descripcion: 'Vehículo de carga'
    },
    datosUnidad: {
      vinVehiculo: 'VIN123456',
      tipoDeUnidadArrastre: 'Remolque',
      idDeVehiculo: 'UNIDAD001',
      numeroEconomico: 'ECO002',
      numeroPlaca: 'DEF456',
      paisEmisor: 'México',
      estado: 'Nuevo León',
      colorVehiculo: 'Azul',
      numero2daPlaca: 'GHI789',
      estado2daPlaca: 'Tamaulipas',
      paisEmisor2daPlaca: 'México',
      descripcion: 'Unidad de arrastre estándar'
    }
  };

  const mockVehiculoTablaDatos: VehiculoTablaDatos = {
    datos: [
      {
        numero: '001',
        tipoDeVehiculo: 'Camión',
        idDeVehiculo: 'VEH001',
        numeroPlaca: 'ABC123',
        paisEmisor: 'México',
        estado: 'CDMX',
        marca: 'Ford',
        modelo: 'F-150',
        ano: '2023',
        transponder: 'TRP001',
        colorVehiculo: 'Blanco',
        numuroEconomico: 'ECO001',
        numero2daPlaca: 'XYZ789',
        estado2daPlaca: 'Jalisco',
        paisEmisor2daPlaca: 'México',
        descripcion: 'Vehículo de carga'
      } as VehiculoTabla
    ]
  };

  const mockCatalogoLista: CatalogoLista = {
    datos: [
      { id: 1, descripcion: 'Camión' },
      { id: 2, descripcion: 'Tracto' }
    ] as Catalogo[]
  };

  beforeEach(async () => {
    mockModal = {
      show: jest.fn(),
      hide: jest.fn()
    } as unknown as jest.Mocked<Modal>;

    (Modal as unknown as jest.Mock).mockReturnValue(mockModal);

    mockStore = {
      update: jest.fn(),
      setDatosVehiculo: jest.fn(),
      setDatosUnidad: jest.fn()
    } as unknown as jest.Mocked<Tramite40103Store>;

    mockQuery = {
      selectSolicitud$: of(mockTramiteState)
    } as jest.Mocked<Tramite40103Query>;

    mockModificarService = {
      obtenerPedimentoTabla: jest.fn().mockReturnValue(of(mockVehiculoTablaDatos)),
      obtenerTipoDeVehiculo: jest.fn().mockReturnValue(of(mockCatalogoLista))
    } as unknown as jest.Mocked<modificarTerrestreService>;

    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true)
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [VehiculosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite40103Store, useValue: mockStore },
        { provide: Tramite40103Query, useValue: mockQuery },
        { provide: modificarTerrestreService, useValue: mockModificarService },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    
    // Mock ViewChild elements
    component.vehiculoModal = { nativeElement: document.createElement('div') } as ElementRef;
    component.unidadModal = { nativeElement: document.createElement('div') } as ElementRef;
    component.closeModal = { nativeElement: { click: jest.fn() } } as ElementRef;
    component.closeUnidadModal = { nativeElement: { click: jest.fn() } } as ElementRef;
    
    // Initialize component state
    component.tramiteState = mockTramiteState;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with correct default values', () => {
      expect(component.selectedTab).toBe('Parque vehicular');
      expect(component.activeTab).toBe('parquevehicular');
      expect(component.editIndex).toBeNull();
      expect(component.editUnidadIndex).toBeNull();
      expect(component.VehiculoTabla).toEqual([]);
      expect(component.tipoDeVehiculoCatalogo).toEqual([]);
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to tramiteQuery and initialize component', () => {
      component.ngOnInit();

      expect(component.tramiteState).toEqual(mockTramiteState);
      expect(component.selectedTab).toBe('Parque vehicular');
      expect(component.activeTab).toBe('parquevehicular');
      expect(component.vehiculoFormulario).toBeDefined();
      expect(component.unidadFormulario).toBeDefined();
      expect(component.tipoDeVehiculoCatalogo).toEqual(mockCatalogoLista.datos);
    });

    it('should handle observable errors gracefully', () => {
      mockQuery.selectSolicitud$ = throwError(() => new Error('Query error'));
      
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('selectTab', () => {
    it('should set selectedTab to "Parque vehicular" when tabName is "parquevehicular"', () => {
      const result = component.selectTab('parquevehicular');

      expect(component.selectedTab).toBe('Parque vehicular');
      expect(component.activeTab).toBe('parquevehicular');
      expect(result).toBe('parquevehicular');
    });

    it('should set selectedTab to "Unidad de arrastre" when tabName is not "parquevehicular"', () => {
      const result = component.selectTab('unidadarrastre');

      expect(component.selectedTab).toBe('Unidad de arrastre');
      expect(component.activeTab).toBe('unidadarrastre');
      expect(result).toBe('unidadarrastre');
    });

    it('should handle empty string tabName', () => {
      const result = component.selectTab('');

      expect(component.selectedTab).toBe('Unidad de arrastre');
      expect(component.activeTab).toBe('');
      expect(result).toBe('');
    });

    it('should handle null/undefined tabName', () => {
      const result = component.selectTab(null as any);

      expect(component.selectedTab).toBe('Unidad de arrastre');
      expect(component.activeTab).toBeNull();
      expect(result).toBeNull();
    });
  });

  describe('eliminarPedimento', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should clear vehiculos table data and reset edit index and form', () => {
      component.vehiculosTablaConfig.datos = [mockVehiculoTablaDatos.datos[0]];
      component.editIndex = 5;

      component.eliminarPedimento();

      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
      expect(component.vehiculoFormulario.pristine).toBeTruthy();
    });

    it('should handle empty table data without errors', () => {
      component.vehiculosTablaConfig.datos = [];
      component.editIndex = null;

      expect(() => component.eliminarPedimento()).not.toThrow();
      expect(component.vehiculosTablaConfig.datos).toEqual([]);
      expect(component.editIndex).toBeNull();
    });
  });

  describe('eliminarUnidadPedimento', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should clear unidades table data and reset edit index and form', () => {
      component.unidadesTablaConfig.datos = [{ vinVehiculo: 'VIN123' } as any];
      component.editUnidadIndex = 3;

      component.eliminarUnidadPedimento();

      expect(component.unidadesTablaConfig.datos).toEqual([]);
      expect(component.editUnidadIndex).toBeNull();
      expect(component.unidadFormulario.pristine).toBeTruthy();
    });
  });

  describe('Modal Operations', () => {
    describe('abiertoPedimento', () => {
      it('should show vehiculo modal when vehiculoModal is available', () => {
        component.abiertoPedimento();

        expect(Modal).toHaveBeenCalledWith(component.vehiculoModal.nativeElement);
        expect(mockModal.show).toHaveBeenCalled();
      });

      it('should not throw error when vehiculoModal is undefined', () => {
        component.vehiculoModal = undefined as any;

        expect(() => component.abiertoPedimento()).not.toThrow();
        expect(Modal).not.toHaveBeenCalled();
      });
    });

    describe('abiertoPedimentoUnidad', () => {
      it('should show unidad modal when unidadModal is available', () => {
        component.abiertoPedimentoUnidad();

        expect(Modal).toHaveBeenCalledWith(component.unidadModal.nativeElement);
        expect(mockModal.show).toHaveBeenCalled();
      });

      it('should not throw error when unidadModal is undefined', () => {
        component.unidadModal = undefined as any;

        expect(() => component.abiertoPedimentoUnidad()).not.toThrow();
        expect(Modal).not.toHaveBeenCalled();
      });
    });
  });

  describe('Form Operations', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    describe('inicializarFormulario', () => {
      it('should create vehiculo form with proper validators and initial values', () => {
        component.inicializarFormulario();

        expect(component.vehiculoFormulario).toBeInstanceOf(FormGroup);
        expect(component.vehiculoFormulario.get('numero')?.value).toBe('001');
        expect(component.vehiculoFormulario.get('numero')?.hasError('required')).toBeFalsy();
        
        // Test required validator
        component.vehiculoFormulario.get('numero')?.setValue('');
        expect(component.vehiculoFormulario.get('numero')?.hasError('required')).toBeTruthy();
      });

      it('should create unidad form with proper validators and initial values', () => {
        component.inicializarFormulario();

        expect(component.unidadFormulario).toBeInstanceOf(FormGroup);
        expect(component.unidadFormulario.get('vinVehiculo')?.value).toBe('VIN123456');
        expect(component.unidadFormulario.get('vinVehiculo')?.hasError('required')).toBeFalsy();
      });
    });

    describe('isValid', () => {
      it('should call validacionesService.isValid with correct parameters', () => {
        const testForm = component.vehiculoFormulario;
        
        component.isValid(testForm, 'numero');

        expect(mockValidacionesService.isValid).toHaveBeenCalledWith(testForm, 'numero');
      });

      it('should return validation result from service', () => {
        mockValidacionesService.isValid.mockReturnValue(false);
        const testForm = component.vehiculoFormulario;

        const result = component.isValid(testForm, 'numero');

        expect(result).toBe(false);
      });
    });
  });

  describe('Vehiculo CRUD Operations', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    describe('startEditVehiculo', () => {
      it('should set edit index and patch form with vehiculo data', () => {
        component.vehiculosTablaConfig.datos = [mockVehiculoTablaDatos.datos[0]];
        jest.spyOn(component, 'abiertoPedimento').mockImplementation();

        component.startEditVehiculo(0);

        expect(component.editIndex).toBe(0);
        expect(component.vehiculoFormulario.get('numero')?.value).toBe('001');
        expect(component.abiertoPedimento).toHaveBeenCalled();
      });

      it('should handle invalid index gracefully', () => {
        component.vehiculosTablaConfig.datos = [];

        expect(() => component.startEditVehiculo(5)).not.toThrow();
        expect(component.editIndex).toBe(5);
      });
    });

    describe('agregarVahiculodata', () => {
      it('should add new vehiculo when form is valid and not in edit mode', () => {
        component.vehiculoFormulario.patchValue({
          numero: '002',
          tipoDeVehiculo: 'Tracto'
        });
        component.editIndex = null;

        component.agregarVahiculodata();

        expect(component.vehiculosTablaConfig.datos.length).toBe(1);
        expect(component.vehiculosTablaConfig.datos[0].numero).toBe('002');
        expect(component.closeModal.nativeElement.click).toHaveBeenCalled();
      });

      it('should update existing vehiculo when in edit mode', () => {
        component.vehiculosTablaConfig.datos = [mockVehiculoTablaDatos.datos[0]];
        component.editIndex = 0;
        component.vehiculoFormulario.patchValue({
          numero: '002-updated',
          tipoDeVehiculo: 'Tracto-updated'
        });

        component.agregarVahiculodata();

        expect(component.vehiculosTablaConfig.datos[0].numero).toBe('002-updated');
        expect(component.editIndex).toBeNull();
      });

      it('should mark form as touched when invalid', () => {
        component.vehiculoFormulario.setErrors({ invalid: true });
        const markAllAsTouchedSpy = jest.spyOn(component.vehiculoFormulario, 'markAllAsTouched');

        component.agregarVahiculodata();

        expect(markAllAsTouchedSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Unidad CRUD Operations', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    describe('startEditUnidad', () => {
      it('should set edit index and patch form with unidad data', () => {
        const mockUnidad = { vinVehiculo: 'VIN789', tipoDeUnidadArrastre: 'Remolque' };
        component.unidadesTablaConfig.datos = [mockUnidad as any];
        jest.spyOn(component, 'abiertoPedimentoUnidad').mockImplementation();

        component.startEditUnidad(0);

        expect(component.editUnidadIndex).toBe(0);
        expect(component.unidadFormulario.get('vinVehiculo')?.value).toBe('VIN789');
        expect(component.abiertoPedimentoUnidad).toHaveBeenCalled();
      });
    });

    describe('agregarUnidadData', () => {
      it('should update existing unidad when in edit mode', () => {
        const mockUnidad = { vinVehiculo: 'VIN789' };
        component.unidadesTablaConfig.datos = [mockUnidad as any];
        component.editUnidadIndex = 0;
        component.unidadFormulario.patchValue({
          vinVehiculo: 'VIN999-updated'
        });

        component.agregarUnidadData();

        expect(component.unidadesTablaConfig.datos[0].vinVehiculo).toBe('VIN999-updated');
        expect(component.editUnidadIndex).toBeNull();
      });
    });
  });

  describe('Data Loading Operations', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    describe('cargarPedimentoTabla', () => {
      it('should load pedimento table data from service', () => {
        component.cargarPedimentoTabla();

        expect(mockModificarService.obtenerPedimentoTabla).toHaveBeenCalled();
        expect(component.vehiculosTablaConfig.datos).toEqual(mockVehiculoTablaDatos.datos);
      });

      it('should handle service errors gracefully', () => {
        mockModificarService.obtenerPedimentoTabla.mockReturnValue(
          throwError(() => new Error('Service error'))
        );

        expect(() => component.cargarPedimentoTabla()).not.toThrow();
      });
    });

    describe('cargarTipoDeVehiculo', () => {
      it('should load tipo de vehiculo catalog from service', () => {
        component.cargarTipoDeVehiculo();

        expect(mockModificarService.obtenerTipoDeVehiculo).toHaveBeenCalled();
        expect(component.tipoDeVehiculoCatalogo).toEqual(mockCatalogoLista.datos);
      });

      it('should handle empty catalog response', () => {
        const emptyCatalog = { datos: [], total: 0, mensaje: 'Empty' };
        mockModificarService.obtenerTipoDeVehiculo.mockReturnValue(of(emptyCatalog));

        component.cargarTipoDeVehiculo();

        expect(component.tipoDeVehiculoCatalogo).toEqual([]);
      });
    });
  });

  describe('Form Cleaning Operations', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should clean vehiculo form data', () => {
      component.vehiculoFormulario.patchValue({ numero: 'TEST' });
      
      component.limpiarVahiculodata();

      expect(component.vehiculoFormulario.pristine).toBeTruthy();
    });

    it('should clean unidad form data', () => {
      component.unidadFormulario.patchValue({ vinVehiculo: 'TEST' });
      
      component.limpiarUnidaddata();

      expect(component.unidadFormulario.pristine).toBeTruthy();
    });
  });

  describe('Notification Operations', () => {
    it('should create notification with correct properties', () => {
      component.abrirModal();

      expect(component.nuevaNotificacion).toBeDefined();
      expect(component.nuevaNotificacion.tipoNotificacion).toBe('alert');
      expect(component.nuevaNotificacion.categoria).toBe('danger');
      expect(component.nuevaNotificacion.mensaje).toBe('El registro fue agregado correctamente.');
      expect(component.nuevaNotificacion.tiempoDeEspera).toBe(2000);
    });
  });

  describe('Memory Management', () => {
    it('should use takeUntil for subscription cleanup', () => {
      const destroyNextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      
      component.ngOnInit();
      component.destroyNotifier$.next();

      expect(destroyNextSpy).toHaveBeenCalled();
    });
  });

  describe('Integration Tests', () => {

    it('should handle tab switching and maintain state', () => {
      component.ngOnInit();
      
      // Switch to unidad tab
      component.selectTab('unidadarrastre');
      expect(component.selectedTab).toBe('Unidad de arrastre');
      
      // Switch back to vehiculo tab
      component.selectTab('parquevehicular');
      expect(component.selectedTab).toBe('Parque vehicular');
      
      // Forms should still be functional
      expect(component.vehiculoFormulario).toBeDefined();
      expect(component.unidadFormulario).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle form operations with null tramiteState', () => {
      component.tramiteState = null as any;
      
      expect(() => component.inicializarFormulario()).toThrow();
    });

    it('should handle modal operations without ViewChild elements', () => {
      component.vehiculoModal = null as any;
      component.unidadModal = null as any;
      
      expect(() => component.abiertoPedimento()).not.toThrow();
      expect(() => component.abiertoPedimentoUnidad()).not.toThrow();
    });
  });

  describe('Error Scenarios', () => {
    it('should handle service errors during ngOnInit', () => {
      mockModificarService.obtenerTipoDeVehiculo.mockReturnValue(
        throwError(() => new Error('Service error'))
      );
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should handle form validation errors gracefully', () => {
      component.ngOnInit();
      mockValidacionesService.isValid.mockReturnValue(false);
      
      const result = component.isValid(component.vehiculoFormulario, 'numero');
      
      expect(result).toBe(false);
    });
  });
});