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

describe('ComponenteVehiculos', () => {
  let componente: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockServicio: any;
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
    mockServicio = {
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
        { provide: modificarTerrestreService, useValue: mockServicio },
        { provide: ValidacionesFormularioService, useValue: mockValidaciones },
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    componente = fixture.componentInstance;
    componente.tramiteState = {
      datosVehiculo: {},
      datosUnidad: {},
    } as any;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería seleccionar pestaña', () => {
    const resultado = componente.seleccionarPestana('unidadarrastre');
    expect(componente.pestanaSeleccionada).toBe('Unidad de arrastre');
    expect(resultado).toBe('unidadarrastre');
  });

  it('debería inicializar formularios', () => {
    componente.tramiteState = {
      datosVehiculo: {},
      datosUnidad: {},
    } as any;
    componente.inicializarFormulario();
    expect(componente.vehiculoFormulario).toBeDefined();
    expect(componente.unidadFormulario).toBeDefined();
  });

  it('debería validar campo del formulario', () => {
    const formulario = componente.vehiculoFormulario;
    const resultado = componente.isValid(formulario, 'numero');
    expect(mockValidaciones.isValid).toHaveBeenCalled();
    expect(resultado).toBe(true);
  });

  it('debería agregar datos del vehículo', () => {
    componente.vehiculoFormulario = componente.fb.group({
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
    componente.cerrarModal = { nativeElement: { click: jest.fn() } } as any;
    componente.vehiculosTablaConfig.datos = [];
    componente.agregarVahiculodata();
    expect(componente.vehiculosTablaConfig.datos.length).toBe(1);
  });

    it('debería actualizar datos del vehículo', () => {
    componente.vehiculoFormulario = componente.fb.group({
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
    componente.cerrarModal = { nativeElement: { click: jest.fn() } } as any;
    componente.vehiculosTablaConfig.datos = [{}as any];
    componente.indiceEdicion = 0; 
    componente.agregarVahiculodata();
    expect(componente.vehiculosTablaConfig.datos.length).toBe(1);
    expect(componente.vehiculosTablaConfig.datos[0].numero).toBe('123');
   
  });

  it('debería agregar datos de unidad', () => {
    componente.unidadFormulario = componente.fb.group({
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
    componente.cerrarUnidadModal = { nativeElement: { click: jest.fn() } } as any;
    componente.unidadesTablaConfig.datos = [];
    componente.agregarUnidadData();
    expect(componente.unidadesTablaConfig.datos.length).toBe(1);
  });

  it('debería editar datos de unidad', () => {
    componente.unidadFormulario = componente.fb.group({
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
    componente.cerrarUnidadModal = { nativeElement: { click: jest.fn() } } as any;
    componente.unidadesTablaConfig.datos = [{} as any];
    const longitudInicial = componente.unidadesTablaConfig.datos.length;
    componente.editarIndiceUnitario = 0;
    componente.agregarUnidadData();
    expect(componente.unidadesTablaConfig.datos.length).toBe(longitudInicial);
    expect(componente.unidadesTablaConfig.datos[0].vinVehiculo).toBe('vin');
  });


  it('debería limpiar formulario de vehículo', () => {
    componente.vehiculoFormulario = componente.fb.group({ test: ['valor'] });
    componente.limpiarVahiculodata();
    expect(componente.vehiculoFormulario.value).toEqual({ test: null });
  });

  it('debería limpiar formulario de unidad', () => {
    componente.unidadFormulario = componente.fb.group({ test: ['valor'] });
    componente.limpiarUnidaddata();
    expect(componente.unidadFormulario.value).toEqual({ test: null });
  });

  it('debería abrir modal de notificación', () => {
    componente.abrirModal();
    expect(componente.nuevaNotificacion).toBeDefined();
    expect(componente.nuevaNotificacion.mensaje).toContain('agregado');
  });

  it('debería llamar cargarTipoDeVehiculo', () => {
    componente.cargarTipoDeVehiculo();
    expect(mockServicio.obtenerTipoDeVehiculo).toHaveBeenCalled();
  });

  it('debería llamar cargarPedimentoTabla', () => {
    componente.cargarPedimentoTabla();
    expect(mockServicio.obtenerPedimentoTabla).toHaveBeenCalled();
  });
});



jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('ComponenteVehiculos - Funciones Seleccionadas', () => {
  let componente: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockStore: jest.Mocked<Tramite40101Store>;
  let mockQuery: jest.Mocked<Tramite40101Query>;
  let mockServicioModificar: jest.Mocked<modificarTerrestreService>;
  let mockServicioValidaciones: jest.Mocked<ValidacionesFormularioService>;
  let mockModal: jest.Mocked<Modal>;

  const mockEstadoTramite = {
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
      idDeVehiculoUnidad: '',
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
      selectSolicitud$: of(mockEstadoTramite),
    } as unknown as jest.Mocked<Tramite40101Query>;

    mockServicioModificar = {
      obtenerPedimentoTabla: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerTipoDeVehiculo: jest.fn().mockReturnValue(of({ datos: [] })),
    } as unknown as jest.Mocked<modificarTerrestreService>;

    mockServicioValidaciones = {
      isValid: jest.fn(),
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [VehiculosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite40101Store, useValue: mockStore },
        { provide: Tramite40101Query, useValue: mockQuery },
        { provide: modificarTerrestreService, useValue: mockServicioModificar },
        { provide: ValidacionesFormularioService, useValue: mockServicioValidaciones },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    componente = fixture.componentInstance;

    componente.tramiteState = mockEstadoTramite;
    componente.ngOnInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('eliminarFilaVehiculo', () => {
    it('debería limpiar datos de tabla de vehículos y restablecer índice de edición y formulario', () => {
      componente.vehiculosTablaConfig.datos = [{ numero: '1', tipoDeVehiculo: 'Camión', marca: 'Ford' } as any];
      componente.indiceEdicion = 5;
      const espiadeReinicio = jest.spyOn(componente.vehiculoFormulario, 'reset');

      componente.eliminarFilaVehiculo();

      expect(componente.vehiculosTablaConfig.datos).toEqual([]);
      expect(componente.indiceEdicion).toBeNull();
      expect(espiadeReinicio).toHaveBeenCalled();
    });

    it('debería manejar datos de tabla vacía sin errores', () => {
      componente.vehiculosTablaConfig.datos = [];
      componente.indiceEdicion = null;
      const espiadeReinicio = jest.spyOn(componente.vehiculoFormulario, 'reset');

      expect(() => componente.eliminarFilaVehiculo()).not.toThrow();

      expect(componente.vehiculosTablaConfig.datos).toEqual([]);
      expect(componente.indiceEdicion).toBeNull();
      expect(espiadeReinicio).toHaveBeenCalled();
    });

    it('debería restablecer formulario incluso cuando el formulario ya está limpio', () => {
      const espiadeReinicio = jest.spyOn(componente.vehiculoFormulario, 'reset');
      componente.vehiculoFormulario.reset();

      componente.eliminarFilaVehiculo();

      expect(espiadeReinicio).toHaveBeenCalledTimes(2);
    });

    it('debería manejar múltiples llamadas consecutivas', () => {
      componente.vehiculosTablaConfig.datos = [{ numero: '1' } as any, { numero: '2' } as any];
      componente.indiceEdicion = 1;

      componente.eliminarFilaVehiculo();
      componente.eliminarFilaVehiculo();
      componente.eliminarFilaVehiculo();

      expect(componente.vehiculosTablaConfig.datos).toEqual([]);
      expect(componente.indiceEdicion).toBeNull();
    });
  });

  describe('eliminarFilaUnidad', () => {
    it('debería limpiar datos de tabla de unidades y restablecer índice de edición y formulario', () => {
      componente.unidadesTablaConfig.datos = [{ vinVehiculo: 'VIN123', tipoDeUnidadArrastre: 'Remolque' } as any];
      componente.editarIndiceUnitario = 3;
      const espiadeReinicio = jest.spyOn(componente.unidadFormulario, 'reset');

      componente.eliminarFilaUnidad();

      expect(componente.unidadesTablaConfig.datos).toEqual([]);
      expect(componente.editarIndiceUnitario).toBeNull();
      expect(espiadeReinicio).toHaveBeenCalled();
    });

    it('debería manejar datos de tabla de unidades vacía sin errores', () => {
      componente.unidadesTablaConfig.datos = [];
      componente.editarIndiceUnitario = null;
      const espiadeReinicio = jest.spyOn(componente.unidadFormulario, 'reset');

      expect(() => componente.eliminarFilaUnidad()).not.toThrow();

      expect(componente.unidadesTablaConfig.datos).toEqual([]);
      expect(componente.editarIndiceUnitario).toBeNull();
      expect(espiadeReinicio).toHaveBeenCalled();
    });

    it('debería restablecer formulario cuando el formulario tiene errores de validación', () => {
      componente.unidadFormulario.get('vinVehiculo')?.setErrors({ required: true });
      const espiadeReinicio = jest.spyOn(componente.unidadFormulario, 'reset');

      componente.eliminarFilaUnidad();

      expect(espiadeReinicio).toHaveBeenCalled();
      expect(componente.editarIndiceUnitario).toBeNull();
    });

    it('debería manejar grandes conjuntos de datos de manera eficiente', () => {
      const conjuntoDatosGrande = Array.from({ length: 1000 }, (_, i) => ({
        vinVehiculo: `VIN${i}`,
        tipoDeUnidadArrastre: `Tipo${i}`,
      }));
      componente.unidadesTablaConfig.datos = conjuntoDatosGrande as any[];
      componente.editarIndiceUnitario = 999;

      const tiempoInicio = performance.now();
      componente.eliminarFilaUnidad();
      const tiempoFin = performance.now();

      expect(tiempoFin - tiempoInicio).toBeLessThan(10);
      expect(componente.unidadesTablaConfig.datos).toEqual([]);
      expect(componente.editarIndiceUnitario).toBeNull();
    });
  });

  describe('abrirPedimento', () => {
    it('debería mostrar modal cuando vehiculoModal está disponible', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      componente.vehiculoModal = mockElementRef;

      componente.abrirPedimento();

      expect(Modal).toHaveBeenCalledWith(mockElementRef.nativeElement);
    });

    it('no debería lanzar error cuando vehiculoModal es undefined', () => {
      componente.vehiculoModal = undefined as any;

      expect(() => componente.abrirPedimento()).not.toThrow();
      expect(Modal).not.toHaveBeenCalled();
    });

    it('no debería lanzar error cuando vehiculoModal es null', () => {
      componente.vehiculoModal = null as any;

      expect(() => componente.abrirPedimento()).not.toThrow();
      expect(Modal).not.toHaveBeenCalled();
    });

    it('debería crear nueva instancia de Modal cada vez', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      componente.vehiculoModal = mockElementRef;

      componente.abrirPedimento();
      componente.abrirPedimento();
      componente.abrirPedimento();

      expect(Modal).toHaveBeenCalledTimes(3);
    });

    it('debería crear nueva instancia de unidadModal cada vez', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      componente.unidadModal = mockElementRef;

      componente.abrirPedimentoUnidad();
      componente.abrirPedimentoUnidad();
      componente.abrirPedimentoUnidad();

      expect(Modal).toHaveBeenCalledTimes(3);
    });

    it('debería funcionar con diferentes elementos DOM', () => {
      const elementoDiv = document.createElement('div');
      const elementoModal = document.createElement('modal');

      const mockElementRef1 = { nativeElement: elementoDiv } as ElementRef;
      const mockElementRef2 = { nativeElement: elementoModal } as ElementRef;

      componente.vehiculoModal = mockElementRef1;
      componente.abrirPedimento();

      componente.vehiculoModal = mockElementRef2;
      componente.abrirPedimento();

      expect(Modal).toHaveBeenCalledWith(elementoDiv);
      expect(Modal).toHaveBeenCalledWith(elementoModal);
    });

    it('debería manejar valores truthy pero inválidos de vehiculoModal', () => {
      const valoresInvalidos = [
        { nativeElement: null },
        { nativeElement: undefined },
        { otraPropiedad: 'valor' },
        { nativeElement: 'cadena' },
        { nativeElement: 123 },
      ];

      valoresInvalidos.forEach((valorInvalido, indice) => {
        componente.vehiculoModal = valorInvalido as any;

        if (valorInvalido.nativeElement) {
          expect(() => componente.abrirPedimento()).not.toThrow();
        } else {
          expect(() => componente.abrirPedimento()).not.toThrow();
        }
      });
    });
  });

  describe('Pruebas de Integración', () => {
    it('debería funcionar correctamente cuando se llama eliminarFilaVehiculo antes de abrirPedimento', () => {
      componente.vehiculosTablaConfig.datos = [{ numero: '1' } as any];
      componente.indiceEdicion = 1;
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      componente.vehiculoModal = mockElementRef;

      componente.eliminarFilaVehiculo();
      componente.abrirPedimento();

      expect(componente.vehiculosTablaConfig.datos).toEqual([]);
      expect(componente.indiceEdicion).toBeNull();
      expect(Modal).toHaveBeenCalled();
    });

    it('debería manejar llamadas consecutivas rápidas a los tres métodos', () => {
      const mockElementRef = {
        nativeElement: document.createElement('div'),
      } as ElementRef;
      componente.vehiculoModal = mockElementRef;
      componente.vehiculosTablaConfig.datos = [{ numero: '1' } as any];
      componente.unidadesTablaConfig.datos = [{ vinVehiculo: 'VIN1' } as any];

      componente.eliminarFilaVehiculo();
      componente.eliminarFilaUnidad();
      componente.abrirPedimento();
      componente.eliminarFilaVehiculo();
      componente.abrirPedimento();

      expect(componente.vehiculosTablaConfig.datos).toEqual([]);
      expect(componente.unidadesTablaConfig.datos).toEqual([]);
      expect(componente.indiceEdicion).toBeNull();
      expect(componente.editarIndiceUnitario).toBeNull();
      expect(Modal).toHaveBeenCalledTimes(2);
    });
  });

  describe('Casos Límite y Manejo de Errores', () => {
    it('debería manejar la destrucción del componente durante la ejecución del método', () => {
      componente.destroyNotifier$ = new Subject<void>();
      const destroySpy = jest.spyOn(componente.destroyNotifier$, 'next');

      componente.eliminarFilaVehiculo();
      componente.eliminarFilaUnidad();

      componente.destroyNotifier$.next();
      componente.destroyNotifier$.complete();

      expect(() => {
        componente.eliminarFilaVehiculo();
        componente.eliminarFilaUnidad();
      }).not.toThrow();
    });

    it('debería mantener la integridad de datos cuando los formularios son undefined', () => {
      componente.vehiculoFormulario = undefined as any;
      componente.unidadFormulario = undefined as any;

      expect(() => componente.eliminarFilaVehiculo()).toThrow();
      expect(() => componente.eliminarFilaUnidad()).toThrow();
    });

    it('debería manejar restricciones de memoria con grandes conjuntos de datos', () => {
      const conjuntoHugeVehiculo = Array.from({ length: 10000 }, (_, i) => ({ numero: `${i}` }));
      const conjuntoHugeUnidad = Array.from({ length: 10000 }, (_, i) => ({ vinVehiculo: `VIN${i}` }));

      componente.vehiculosTablaConfig.datos = conjuntoHugeVehiculo as any;
      componente.unidadesTablaConfig.datos = conjuntoHugeUnidad as any;

      const tiempoInicioVehiculo = performance.now();
      componente.eliminarFilaVehiculo();
      const tiempoFinVehiculo = performance.now();

      const tiempoInicioUnidad = performance.now();
      componente.eliminarFilaUnidad();
      const tiempoFinUnidad = performance.now();

      expect(tiempoFinVehiculo - tiempoInicioVehiculo).toBeLessThan(50);
      expect(tiempoFinUnidad - tiempoInicioUnidad).toBeLessThan(50);
      expect(componente.vehiculosTablaConfig.datos).toEqual([]);
      expect(componente.unidadesTablaConfig.datos).toEqual([]);
    });
  });
});