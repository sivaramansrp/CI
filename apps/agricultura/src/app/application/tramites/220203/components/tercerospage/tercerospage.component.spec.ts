import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TercerospageComponent } from './tercerospage.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { TercerosrelacionadosdestinoTable, DatosDeLaSolicitud } from '../../../../shared/models/tercerosrelacionados.model';
import { DestinatarioForm, Acuicultura } from '../../models/220203/importacion-de-acuicultura.module';
import { AgregardestinatarioComponent } from '../agregardestinatario/agregardestinatario.component';
import { AgregardestinatariofinalComponent } from '../agregardestinatariofinal/agregardestinatariofinal.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TercerosrelacionadosComponent } from '../../../../shared/components/tercerosrelacionados/tercerosrelacionados.component';

/**
 * @fileoverview
 * Archivo de pruebas unitarias para TercerospageComponent.
 * Incluye pruebas para inicialización, gestión de catálogos, operaciones CRUD de terceros,
 * manejo de modales, validaciones y control de estado de solo lectura.
 * Cobertura completa de todos los métodos públicos y casos edge del componente.
 */
describe('TercerospageComponent', () => {
  let component: TercerospageComponent;
  let fixture: ComponentFixture<TercerospageComponent>;
  let mockConsultaQuery: jest.Mocked<ConsultaioQuery>;
  let mockImportacionService: jest.Mocked<ImportacionDeAcuiculturaService>;
  let mockTercerosService: jest.Mocked<TercerosrelacionadosService>;
  let mockAcuiculturaStore: jest.Mocked<AcuiculturaStore>;
  let mockModalComponent: jest.Mocked<ModalComponent>;
  let mockTercerosRelacionadosComponent: jest.Mocked<TercerosrelacionadosComponent>;

  // Mock data para las pruebas
  const mockTercerosData: TercerosrelacionadosdestinoTable[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      primerApellido: 'García',
      segundoApellido: 'López',
      razonSocial: 'Empresa Test S.A.',
      tipoPersona: 'moral',
      tipoMercancia: 'yes',
      rfc: 'ABCD123456789',
      correo: 'juan@test.com',
      telefono: '5512345678',
      pais: 'México',
      estado: 'CDMX',
      municipio: 'Benito Juárez',
      colonia: 'Roma Norte',
      calle: 'Calle Test',
      numeroExterior: '123',
      domicilio: 'Calle Test 123',
      codigoPostal: '06700'
    } as TercerosrelacionadosdestinoTable,
    {
      id: 2,
      nombre: 'María',
      primerApellido: 'González',
      segundoApellido: 'Hernández',
      razonSocial: 'Empresa María S.A.',
      tipoPersona: 'fisica',
      tipoMercancia: 'no',
      rfc: 'EFGH987654321',
      correo: 'maria@test.com',
      telefono: '5587654321',
      pais: 'México',
      estado: 'Jalisco',
      municipio: 'Guadalajara',
      colonia: 'Centro',
      calle: 'Avenida Test',
      numeroExterior: '456',
      domicilio: 'Avenida Test 456',
      codigoPostal: '44100'
    } as TercerosrelacionadosdestinoTable
  ];

  const mockDestinatarios: DestinatarioForm[] = [
    {
      tipoMercancia: 'yes',
      nombre: 'Carlos',
      primerApellido: 'Martínez',
      segundoApellido: 'Rodríguez',
      razonSocial: 'Exportadora Test S.A.',
      pais: 'Estados Unidos',
      domicilio: 'Street Test 789',
      lada: '1',
      telefono: '5551234567',
      correo: 'carlos@exportadora.com'
    },
    {
      tipoMercancia: 'no',
      nombre: 'Ana',
      primerApellido: 'López',
      segundoApellido: 'Sánchez',
      razonSocial: '',
      pais: 'Canadá',
      domicilio: 'Avenue Test 321',
      lada: '1',
      telefono: '4161234567',
      correo: 'ana@test.ca'
    }
  ];

  const mockCatalogoPaises = [
    { id: 1, nombre: 'México', descripcion: 'Estados Unidos Mexicanos' },
    { id: 2, nombre: 'Estados Unidos', descripcion: 'Estados Unidos de América' },
    { id: 3, nombre: 'Canadá', descripcion: 'Canadá' }
  ];

  const mockCatalogoEstados = [
    { id: 1, nombre: 'Ciudad de México', descripcion: 'CDMX' },
    { id: 2, nombre: 'Jalisco', descripcion: 'Estado de Jalisco' },
    { id: 3, nombre: 'Nuevo León', descripcion: 'Estado de Nuevo León' }
  ];

  const mockAcuiculturaState: Partial<Acuicultura> = {
    tercerosRelacionados: mockTercerosData,
    datosForma: mockDestinatarios,
    seletedExdora: mockDestinatarios[0],
    selectedTerceros: mockTercerosData[0],
    mercanciaGroup: [],
    formularioMovilizacion: {} as any,
    realizarGroup: {} as any,
    pagoDeDerechos: {} as any,
    selectedmercanciaGroupDatos: {} as any
  };

  const mockConsultaState = {
    readonly: false,
    loading: false,
    error: null,
    procedureId: '220203',
    parameter: 'test',
    department: 'agricultura',
    folioTramite: 'FOL123',
    status: 'active'
  } as any;

  beforeEach(async () => {
    // Crear mocks de los servicios
    mockConsultaQuery = {
      selectConsultaioState$: of(mockConsultaState)
    } as any;

    mockImportacionService = {
      getAllDatosForma: jest.fn(),
      updateTercerosRelacionado: jest.fn()
    } as any;

    mockTercerosService = {
      obtenerSelectorList: jest.fn()
    } as any;

    mockAcuiculturaStore = {
      updatedatosForma: jest.fn(),
      actualizarSelectedTerceros: jest.fn(),
      actualizarSelectedExdora: jest.fn()
    } as any;

    mockModalComponent = {
      abrir: jest.fn(),
      cerrar: jest.fn()
    } as any;

    mockTercerosRelacionadosComponent = {
      validarFormulario: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [TercerospageComponent, CommonModule],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: ImportacionDeAcuiculturaService, useValue: mockImportacionService },
        { provide: TercerosrelacionadosService, useValue: mockTercerosService },
        { provide: AcuiculturaStore, useValue: mockAcuiculturaStore }
      ]
    }).compileComponents();

    // Configurar mocks por defecto
    mockImportacionService.getAllDatosForma.mockReturnValue(of(mockAcuiculturaState as Acuicultura));
    mockTercerosService.obtenerSelectorList.mockImplementation((archivo: string) => {
      if (archivo === 'paisprocedencia.json') {
        return of(mockCatalogoPaises);
      } else if (archivo === 'estados.json') {
        return of(mockCatalogoEstados);
      }
      return of([]);
    });

    fixture = TestBed.createComponent(TercerospageComponent);
    component = fixture.componentInstance;

    // Configurar ViewChild mocks
    Object.defineProperty(component, 'modalRef', {
      value: mockModalComponent,
      writable: true
    });

    Object.defineProperty(component, 'tercerosRelacionados', {
      value: mockTercerosRelacionadosComponent,
      writable: true
    });
  });

  describe('Inicialización del Componente', () => {
    it('debería crear el componente correctamente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades por defecto', () => {
      expect(component.personas).toEqual([]);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.catalogosDatos).toEqual({} as DatosDeLaSolicitud);
      expect(component.datosForma).toEqual([]);
    });

    it('debería tener DESTROY_NOTIFIER$ configurado', () => {
      expect(component['DESTROY_NOTIFIER$']).toBeDefined();
      expect(component['DESTROY_NOTIFIER$'].closed).toBe(false);
    });

    it('debería tener las referencias ViewChild definidas', () => {
      expect(component.modalRef).toBeDefined();
      expect(component.tercerosRelacionados).toBeDefined();
    });
  });

  describe('ngOnInit - Inicialización de Datos', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería suscribirse al estado de consulta y actualizar esFormularioSoloLectura', () => {
      expect(component.esFormularioSoloLectura).toBe(mockConsultaState.readonly);
    });

    it('debería cambiar esFormularioSoloLectura cuando el estado cambie', () => {
      const newState = { ...mockConsultaState, readonly: true };
      mockConsultaQuery.selectConsultaioState$ = of(newState);

      component.ngOnInit();

      expect(component.esFormularioSoloLectura).toBe(true);
    });

    it('debería suscribirse a getAllDatosForma y actualizar datos', () => {
      expect(mockImportacionService.getAllDatosForma).toHaveBeenCalled();
      expect(component.personas).toEqual(mockTercerosData);
      expect(component.datosForma).toEqual(mockDestinatarios);
    });

    it('debería manejar datos nulos sin errores', () => {
      mockImportacionService.getAllDatosForma.mockReturnValue(of(null as any));

      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar datos parciales correctamente', () => {
      const datosIncompletos = {
        tercerosRelacionados: mockTercerosData,
        datosForma: undefined
      };

      mockImportacionService.getAllDatosForma.mockReturnValue(of(datosIncompletos as any));

      component.ngOnInit();

      expect(component.personas).toEqual(mockTercerosData);
      expect(component.datosForma).toBeUndefined();
    });
  });

  describe('ngAfterViewInit - Inicialización de Vista', () => {
    it('debería llamar a pairsCatalogChange y estadoCatalogChange', () => {
      const pairsSpy = jest.spyOn(component, 'pairsCatalogChange');
      const estadoSpy = jest.spyOn(component, 'estadoCatalogChange');

      component.ngAfterViewInit();

      expect(pairsSpy).toHaveBeenCalled();
      expect(estadoSpy).toHaveBeenCalled();
    });
  });

  describe('pairsCatalogChange - Carga de Catálogo de Países', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería cargar el catálogo de países correctamente', () => {
      component.pairsCatalogChange();

      expect(mockTercerosService.obtenerSelectorList).toHaveBeenCalledWith('paisprocedencia.json');
      expect(component.catalogosDatos.paises).toEqual(mockCatalogoPaises);
    });

    it('debería manejar errores en la carga del catálogo de países', () => {
      mockTercerosService.obtenerSelectorList.mockReturnValue(throwError('Error de red'));

      expect(() => component.pairsCatalogChange()).not.toThrow();
    });

    it('debería actualizar catalogosDatos.paises con los datos recibidos', () => {
      const nuevosPaises = [
        { id: 4, nombre: 'Brasil', descripcion: 'República Federativa del Brasil' }
      ];

      mockTercerosService.obtenerSelectorList.mockReturnValue(of(nuevosPaises));

      component.pairsCatalogChange();

      expect(component.catalogosDatos.paises).toEqual(nuevosPaises);
    });
  });

  describe('estadoCatalogChange - Carga de Catálogo de Estados', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería cargar el catálogo de estados correctamente', () => {
      component.estadoCatalogChange();

      expect(mockTercerosService.obtenerSelectorList).toHaveBeenCalledWith('estados.json');
      expect(component.catalogosDatos.estados).toEqual(mockCatalogoEstados);
    });

    it('debería manejar errores en la carga del catálogo de estados', () => {
      mockTercerosService.obtenerSelectorList.mockReturnValue(throwError('Error de red'));

      expect(() => component.estadoCatalogChange()).not.toThrow();
    });

    it('debería actualizar catalogosDatos.estados con los datos recibidos', () => {
      const nuevosEstados = [
        { id: 4, nombre: 'Yucatán', descripcion: 'Estado de Yucatán' }
      ];

      mockTercerosService.obtenerSelectorList.mockReturnValue(of(nuevosEstados));

      component.estadoCatalogChange();

      expect(component.catalogosDatos.estados).toEqual(nuevosEstados);
    });
  });

  describe('handleEliminar - Eliminar Terceros Relacionados', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.personas = [...mockTercerosData];
    });

    it('debería limpiar la lista de personas', () => {
      component.handleEliminar();

      expect(component.personas).toEqual([]);
    });

    it('debería llamar al servicio para actualizar terceros relacionados', () => {
      component.handleEliminar();

      expect(mockImportacionService.updateTercerosRelacionado).toHaveBeenCalledWith([]);
    });

    it('debería funcionar correctamente cuando la lista ya está vacía', () => {
      component.personas = [];

      expect(() => component.handleEliminar()).not.toThrow();
      expect(mockImportacionService.updateTercerosRelacionado).toHaveBeenCalledWith([]);
    });
  });

  describe('handleEliminarExportador - Eliminar Exportadores', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.personas = [...mockTercerosData];
    });

    it('debería limpiar la lista de personas', () => {
      component.handleEliminarExportador();

      expect(component.personas).toEqual([]);
    });

    it('debería llamar al store para actualizar datos del formulario', () => {
      component.handleEliminarExportador();

      expect(mockAcuiculturaStore.updatedatosForma).toHaveBeenCalledWith([]);
    });

    it('debería funcionar correctamente cuando la lista ya está vacía', () => {
      component.personas = [];

      expect(() => component.handleEliminarExportador()).not.toThrow();
      expect(mockAcuiculturaStore.updatedatosForma).toHaveBeenCalledWith([]);
    });
  });

  describe('abrirModalDestinatario - Abrir Modal de Destinatario', () => {
    it('debería abrir el modal con AgregardestinatarioComponent sin datos', () => {
      component.abrirModalDestinatario();

      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatarioComponent);
      expect(mockAcuiculturaStore.actualizarSelectedTerceros).not.toHaveBeenCalled();
    });

    it('debería actualizar el store y abrir el modal con datos proporcionados', () => {
      const terceroData = mockTercerosData[0];

      component.abrirModalDestinatario(terceroData);

      expect(mockAcuiculturaStore.actualizarSelectedTerceros).toHaveBeenCalledWith(terceroData);
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatarioComponent);
    });

    it('debería manejar datos undefined correctamente', () => {
      component.abrirModalDestinatario(undefined);

      expect(mockAcuiculturaStore.actualizarSelectedTerceros).not.toHaveBeenCalled();
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatarioComponent);
    });

    it('debería manejar datos null correctamente', () => {
      component.abrirModalDestinatario(null as any);

      expect(mockAcuiculturaStore.actualizarSelectedTerceros).not.toHaveBeenCalled();
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatarioComponent);
    });
  });

  describe('abrirModalExportador - Abrir Modal de Exportador', () => {
    it('debería actualizar el store y abrir el modal con datos válidos', () => {
      const exportadorData = mockDestinatarios[0];

      component.abrirModalExportador(exportadorData);

      expect(mockAcuiculturaStore.actualizarSelectedExdora).toHaveBeenCalledWith(exportadorData);
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatariofinalComponent);
    });

    it('debería manejar datos null sin actualizar el store', () => {
      component.abrirModalExportador(null as any);

      expect(mockAcuiculturaStore.actualizarSelectedExdora).not.toHaveBeenCalled();
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatariofinalComponent);
    });

    it('debería manejar datos undefined sin actualizar el store', () => {
      component.abrirModalExportador(undefined as any);

      expect(mockAcuiculturaStore.actualizarSelectedExdora).not.toHaveBeenCalled();
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatariofinalComponent);
    });

    it('debería abrir el modal incluso con datos parciales', () => {
      const datosIncompletos = {
        nombre: 'Test',
        pais: 'México'
      } as DestinatarioForm;

      component.abrirModalExportador(datosIncompletos);

      expect(mockAcuiculturaStore.actualizarSelectedExdora).toHaveBeenCalledWith(datosIncompletos);
      expect(mockModalComponent.abrir).toHaveBeenCalledWith(AgregardestinatariofinalComponent);
    });
  });

  describe('validarFormulario - Validación de Formulario', () => {
    it('debería delegar la validación al componente hijo', () => {
      mockTercerosRelacionadosComponent.validarFormulario.mockReturnValue(true);

      const result = component.validarFormulario();

      expect(mockTercerosRelacionadosComponent.validarFormulario).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('debería retornar false cuando el formulario no es válido', () => {
      mockTercerosRelacionadosComponent.validarFormulario.mockReturnValue(false);

      const result = component.validarFormulario();

      expect(mockTercerosRelacionadosComponent.validarFormulario).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('debería manejar errores en la validación', () => {
      mockTercerosRelacionadosComponent.validarFormulario.mockImplementation(() => {
        throw new Error('Error de validación');
      });

      expect(() => component.validarFormulario()).toThrow('Error de validación');
    });
  });

  describe('ngOnDestroy - Limpieza de Recursos', () => {
    it('debería completar el DESTROY_NOTIFIER$ al destruir el componente', () => {
      const nextSpy = jest.spyOn(component['DESTROY_NOTIFIER$'], 'next');
      const completeSpy = jest.spyOn(component['DESTROY_NOTIFIER$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería marcar DESTROY_NOTIFIER$ como cerrado después de la destrucción', () => {
      component.ngOnDestroy();

      expect(component['DESTROY_NOTIFIER$'].closed).toBe(true);
    });
  });

  describe('Integración de Servicios', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería interactuar correctamente con todos los servicios', () => {
      // Verificar ConsultaioQuery
      expect(mockConsultaQuery.selectConsultaioState$).toBeDefined();

      // Verificar ImportacionDeAcuiculturaService
      expect(mockImportacionService.getAllDatosForma).toHaveBeenCalled();

      // Verificar TercerosrelacionadosService
      component.pairsCatalogChange();
      component.estadoCatalogChange();
      expect(mockTercerosService.obtenerSelectorList).toHaveBeenCalledWith('paisprocedencia.json');
      expect(mockTercerosService.obtenerSelectorList).toHaveBeenCalledWith('estados.json');

      // Verificar AcuiculturaStore
      component.handleEliminarExportador();
      expect(mockAcuiculturaStore.updatedatosForma).toHaveBeenCalled();

      component.abrirModalDestinatario(mockTercerosData[0]);
      expect(mockAcuiculturaStore.actualizarSelectedTerceros).toHaveBeenCalled();

      component.abrirModalExportador(mockDestinatarios[0]);
      expect(mockAcuiculturaStore.actualizarSelectedExdora).toHaveBeenCalled();
    });
  });

  describe('Manejo de Errores y Casos Edge', () => {
    it('debería manejar errores en getAllDatosForma', () => {
      mockImportacionService.getAllDatosForma.mockReturnValue(throwError('Error del servicio'));

      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar errores en selectConsultaioState$', () => {
      mockConsultaQuery.selectConsultaioState$ = throwError('Error de consulta');

      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar datos con estructura incorrecta', () => {
      const datosInvalidos = {
        tercerosRelacionados: 'no es un array',
        datosForma: null
      };

      mockImportacionService.getAllDatosForma.mockReturnValue(of(datosInvalidos as any));

      component.ngOnInit();

      expect(component.personas).toBe('no es un array' as any);
      expect(component.datosForma).toBeNull();
    });

    it('debería funcionar con ViewChild no inicializados', () => {
      // Simular ViewChild no inicializados
      Object.defineProperty(component, 'modalRef', {
        value: undefined,
        writable: true
      });

      Object.defineProperty(component, 'tercerosRelacionados', {
        value: undefined,
        writable: true
      });

      expect(() => component.abrirModalDestinatario()).toThrow();
      expect(() => component.validarFormulario()).toThrow();
    });
  });

  describe('Estados del Componente', () => {
    it('debería mantener el estado correcto durante todo el ciclo de vida', () => {
      // Estado inicial
      expect(component.personas).toEqual([]);
      expect(component.datosForma).toEqual([]);

      // Después de ngOnInit
      component.ngOnInit();
      expect(component.personas).toEqual(mockTercerosData);
      expect(component.datosForma).toEqual(mockDestinatarios);

      // Después de eliminar
      component.handleEliminar();
      expect(component.personas).toEqual([]);

      // Después de cargar catálogos
      component.ngAfterViewInit();
      expect(component.catalogosDatos.paises).toEqual(mockCatalogoPaises);
      expect(component.catalogosDatos.estados).toEqual(mockCatalogoEstados);
    });

    it('debería mantener la coherencia entre esFormularioSoloLectura y el estado', () => {
      // Modo edición
      mockConsultaState.readonly = false;
      mockConsultaQuery.selectConsultaioState$ = of(mockConsultaState);
      component.ngOnInit();
      expect(component.esFormularioSoloLectura).toBe(false);

      // Modo solo lectura
      mockConsultaState.readonly = true;
      mockConsultaQuery.selectConsultaioState$ = of(mockConsultaState);
      component.ngOnInit();
      expect(component.esFormularioSoloLectura).toBe(true);
    });

    it('debería manejar múltiples cambios de estado correctamente', () => {
      const stateSubject = new Subject<any>();
      mockConsultaQuery.selectConsultaioState$ = stateSubject.asObservable();

      component.ngOnInit();

      // Cambio 1: solo lectura
      stateSubject.next({ readonly: true });
      expect(component.esFormularioSoloLectura).toBe(true);

      // Cambio 2: edición
      stateSubject.next({ readonly: false });
      expect(component.esFormularioSoloLectura).toBe(false);

      // Cambio 3: undefined (manejo edge case)
      stateSubject.next({ readonly: undefined });
      expect(component.esFormularioSoloLectura).toBeUndefined();
    });
  });
});
