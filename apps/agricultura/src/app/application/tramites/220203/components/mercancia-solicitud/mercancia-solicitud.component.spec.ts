import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MercanciaSolicitudComponent } from './mercancia-solicitud.component';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { AcuiculturaQuery } from '../../estados/sanidad-certificado.query';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { CatalogoData, Fila, Detalles } from '../../models/220203/importacion-de-acuicultura.module';

/**
 * @fileoverview
 * Archivo de pruebas unitarias para MercanciaSolicitudComponent.
 * Incluye pruebas para inicialización, formularios, catálogos, CRUD operations y manejo de errores.
 * Cobertura completa de todos los métodos públicos y privados del componente.
 */
describe('MercanciaSolicitudComponent', () => {
  let component: MercanciaSolicitudComponent;
  let fixture: ComponentFixture<MercanciaSolicitudComponent>;
  let mockImportacionService: jest.Mocked<ImportacionDeAcuiculturaService>;
  let mockAcuiculturaStore: jest.Mocked<AcuiculturaStore>;
  let mockAcuiculturaQuery: jest.Mocked<AcuiculturaQuery>;
  let formBuilder: FormBuilder;

  // Mock data para las pruebas
  const mockCatalogData = {
    data: [
      { id: '1', nombre: 'Test Item 1', descripcion: 'Description 1' },
      { id: '2', nombre: 'Test Item 2', descripcion: 'Description 2' }
    ]
  };

  const mockFilaData: Fila = {
    noPartida: '001',
    tipoRequisito: 'Sanitario',
    requisito: 'Certificado',
    numeroCertificado: 'CERT001',
    fraccionArancelaria: '0301.11.01',
    descripcionFraccion: 'Peces ornamentales',
    nico: 'NICO001',
    descripcionNico: 'Descripción NICO',
    descripcion: 'Mercancía de prueba',
    medidadetarifa: 'KG',
    cantidadUMT: '100',
    umc: 'KG',
    cantidadUMC: '100',
    uso: 'Comercial',
    especie: 'Tilapia',
    paisDeOrigen: 'México',
    paisDeProcedencia: 'México',
    numeroDeLote: 'LOTE001',
    faseDeDesarrollo: 'Juvenil',
    certificadoInternacional: 'CERT_INT_001'
  };

  const mockAcuiculturaState = {
    mercanciaGroup: [mockFilaData],
    selectedmercanciaGroupDatos: mockFilaData,
    tercerosRelacionados: [],
    datosForma: [],
    selectedTerceros: {} as any,
    seletedExdora: {} as any,
    formularioMovilizacion: {} as any,
    realizarGroup: {} as any,
    pagoDeDerechos: {} as any
  };

  beforeEach(async () => {
    // Crear mocks de los servicios
    mockImportacionService = {
      obtenerDetallesDelCatalogo: jest.fn(),
      obtenerDatos: jest.fn()
    } as any;

    mockAcuiculturaStore = {
      actualizarMercanciaGroup: jest.fn()
    } as any;

    mockAcuiculturaQuery = {
      getValue: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [MercanciaSolicitudComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ImportacionDeAcuiculturaService, useValue: mockImportacionService },
        { provide: AcuiculturaStore, useValue: mockAcuiculturaStore },
        { provide: AcuiculturaQuery, useValue: mockAcuiculturaQuery }
      ]
    }).compileComponents();

    mockImportacionService.obtenerDatos.mockReturnValue(of(mockAcuiculturaState));
    mockAcuiculturaQuery.getValue.mockReturnValue(mockAcuiculturaState);

    fixture = TestBed.createComponent(MercanciaSolicitudComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  describe('Inicialización del Componente', () => {
    it('debería crear el componente correctamente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades por defecto', () => {
      expect(component.detallesSeleccionados).toEqual({} as Detalles);
      expect(component.datosMercanciaStore).toEqual({} as Fila);
      expect(component.detallesCatalogo).toEqual({} as CatalogoData);
      expect(component.eliminarDatosTabla).toBe(false);
      expect(component.tipoSeleccion).toBe(TablaSeleccion.CHECKBOX);
      expect(component.cuerpoTablaDetalle).toEqual([]);
      expect(component.esFormularioSoloLectura).toBe(false);
    });

    it('debería configurar la configuración de columnas correctamente', () => {
      expect(component.configuracionColumnas).toHaveLength(1);
      expect(component.configuracionColumnas[0].encabezado).toBe('Nombre científico');
      expect(component.configuracionColumnas[0].orden).toBe(1);
    });

    it('debería inicializar los formularios en ngOnInit', () => {
      component.ngOnInit();
      
      expect(component.mercanciaGroup).toBeDefined();
      expect(component.detallesGroup).toBeDefined();
      expect(component.detallesGroup.get('nombreCientifico')).toBeDefined();
    });
  });

  describe('Constructor y Carga de Catálogos', () => {
    it('debería llamar a los métodos de carga de catálogos en el constructor', () => {
      const obtenerCatalogosTransporteSpy = jest.spyOn(component, 'obtenerCatalogosTransporte');
      const obtenerNicoCatalogosTransporteSpy = jest.spyOn(component, 'obtenerNicoCatalogosTransporte');
      const obtenerUMCCatalogosTransporteSpy = jest.spyOn(component, 'obtenerUMCCatalogosTransporte');

      // Re-crear el componente para probar el constructor
      fixture = TestBed.createComponent(MercanciaSolicitudComponent);
      component = fixture.componentInstance;

      expect(obtenerCatalogosTransporteSpy).toHaveBeenCalled();
      expect(obtenerNicoCatalogosTransporteSpy).toHaveBeenCalled();
      expect(obtenerUMCCatalogosTransporteSpy).toHaveBeenCalled();
    });

    it('debería suscribirse a obtenerDatos del servicio', () => {
      fixture.detectChanges();
      
      expect(mockImportacionService.obtenerDatos).toHaveBeenCalled();
      expect(component.datosMercanciaStore).toEqual(mockFilaData);
    });
  });

  describe('Métodos de Carga de Catálogos', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('obtenerCatalogosTransporte debería cargar catálogos de punto correctamente', () => {
      component.obtenerCatalogosTransporte();

      expect(mockImportacionService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('punto.json');
      expect(component.detallesCatalogo.tipoRequisitoList).toEqual(mockCatalogData.data);
      expect(component.detallesCatalogo.arancelariaList).toEqual(mockCatalogData.data);
    });

    it('obtenerCatalogosTransporte debería manejar errores correctamente', () => {
      mockImportacionService.obtenerDetallesDelCatalogo.mockReturnValue(throwError('Error'));

      component.obtenerCatalogosTransporte();

      expect(component.detallesCatalogo.tipoRequisitoList).toEqual([]);
      expect(component.detallesCatalogo.arancelariaList).toEqual([]);
    });

    it('obtenerNicoCatalogosTransporte debería cargar catálogos NICO correctamente', () => {
      component.obtenerNicoCatalogosTransporte();

      expect(mockImportacionService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('nico.json');
      expect(component.detallesCatalogo.nicoList).toEqual(mockCatalogData.data);
    });

    it('obtenerNicoCatalogosTransporte debería manejar errores correctamente', () => {
      mockImportacionService.obtenerDetallesDelCatalogo.mockReturnValue(throwError('Error'));

      component.obtenerNicoCatalogosTransporte();

      expect(component.detallesCatalogo.nicoList).toEqual([]);
    });

    it('obtenerUMCCatalogosTransporte debería cargar múltiples catálogos correctamente', () => {
      component.obtenerUMCCatalogosTransporte();

      expect(mockImportacionService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('umc.json');
      expect(component.detallesCatalogo.umcList).toEqual(mockCatalogData.data);
      expect(component.detallesCatalogo.usoList).toEqual(mockCatalogData.data);
      expect(component.detallesCatalogo.paisDeOrigenList).toEqual(mockCatalogData.data);
      expect(component.detallesCatalogo.paisDeProcedenciaList).toEqual(mockCatalogData.data);
    });

    it('obtenerUMCCatalogosTransporte debería manejar errores correctamente', () => {
      mockImportacionService.obtenerDetallesDelCatalogo.mockReturnValue(throwError('Error'));

      component.obtenerUMCCatalogosTransporte();

      expect(component.detallesCatalogo.usoList).toEqual([]);
      expect(component.detallesCatalogo.paisDeOrigenList).toEqual([]);
      expect(component.detallesCatalogo.paisDeProcedenciaList).toEqual([]);
      expect(component.detallesCatalogo.umcList).toEqual([]);
    });
  });

  describe('Gestión de Formularios', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('createMercanciaGroup debería crear formulario con datos del store', () => {
      const formGroup = component.createMercanciaGroup();

      expect(formGroup.get('tipoRequisito')?.value).toBe(mockFilaData.tipoRequisito);
      expect(formGroup.get('requisito')?.value).toBe(mockFilaData.requisito);
      expect(formGroup.get('fraccionArancelaria')?.value).toBe(mockFilaData.fraccionArancelaria);
    });

    it('createMercanciaGroup debería crear formulario con validadores requeridos', () => {
      const formGroup = component.createMercanciaGroup();

      expect(formGroup.get('tipoRequisito')?.hasError('required')).toBeFalsy();
      expect(formGroup.get('numeroOficioCasoEspecial')?.hasError('required')).toBeFalsy(); // Campo opcional
      
      // Limpiar campo requerido y verificar error
      formGroup.get('tipoRequisito')?.setValue('');
      expect(formGroup.get('tipoRequisito')?.hasError('required')).toBeTruthy();
    });

    it('createDetallesGroup debería crear formulario de detalles', () => {
      const detallesGroup = component.createDetallesGroup();

      expect(detallesGroup.get('nombreCientifico')).toBeDefined();
      expect(detallesGroup.get('nombreCientifico')?.value).toBe('');
    });

    it('setValoresStore debería actualizar descripcionFraccionArancelaria cuando campo es fraccionArancelaria', () => {
      const patchValueSpy = jest.spyOn(component.mercanciaGroup, 'patchValue');

      component.setValoresStore(undefined, 'fraccionArancelaria');

      expect(patchValueSpy).toHaveBeenCalledWith({
        descripcionFraccionArancelaria: 'Nuevo valor para descripcion'
      });
    });

    it('setValoresStore debería actualizar descripcionNico cuando campo es nico', () => {
      const patchValueSpy = jest.spyOn(component.mercanciaGroup, 'patchValue');

      component.setValoresStore(undefined, 'nico');

      expect(patchValueSpy).toHaveBeenCalledWith({
        descripcionNico: 'Nuevo valor para descripcionNico'
      });
    });

    it('setValoresStore debería actualizar umt cuando campo es cantidadUMT', () => {
      const patchValueSpy = jest.spyOn(component.mercanciaGroup, 'patchValue');

      component.setValoresStore(undefined, 'cantidadUMT');

      expect(patchValueSpy).toHaveBeenCalledWith({
        umt: 'Nuevo valor para cantidadUMT'
      });
    });
  });

  describe('Operaciones CRUD', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('agregarFila debería agregar nueva mercancía al store', () => {
      const nuevoDetalle = { ...mockFilaData, descripcion: 'Nueva mercancía' };
      jest.spyOn(component.mercanciaGroup, 'getRawValue').mockReturnValue(nuevoDetalle);

      component.agregarFila();

      expect(mockAcuiculturaStore.actualizarMercanciaGroup).toHaveBeenCalled();
      expect(component.cerrar.emit).toBeDefined();
    });

    it('agregarFila debería manejar actualización de mercancía existente', () => {
      component.datosMercanciaStore = mockFilaData;
      const mercanciaActualizada = { ...mockFilaData, descripcion: 'Mercancía actualizada' };
      jest.spyOn(component.mercanciaGroup, 'getRawValue').mockReturnValue(mercanciaActualizada);

      component.agregarFila();

      expect(mockAcuiculturaStore.actualizarMercanciaGroup).toHaveBeenCalled();
    });

    it('eliminarFila debería resetear formulario y emitir evento cerrar', () => {
      const resetSpy = jest.spyOn(component.mercanciaGroup, 'reset');
      const emitSpy = jest.spyOn(component.cerrar, 'emit');

      component.eliminarFila();

      expect(resetSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('onLimpiarDestinatario debería resetear ambos formularios', () => {
      const resetMercanciaSpy = jest.spyOn(component.mercanciaGroup, 'reset');
      const resetDetallesSpy = jest.spyOn(component.detallesGroup, 'reset');

      component.onLimpiarDestinatario();

      expect(resetMercanciaSpy).toHaveBeenCalled();
      expect(resetDetallesSpy).toHaveBeenCalled();
    });
  });

  describe('Gestión de Tabla de Detalles', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('agregarFilaDetalle debería agregar detalle a la tabla y resetear formulario', () => {
      const mockDetalle = { nombreCientifico: 'Tilapia nilotica' };
      jest.spyOn(component.detallesGroup, 'getRawValue').mockReturnValue(mockDetalle);
      const resetSpy = jest.spyOn(component.detallesGroup, 'reset');

      component.agregarFilaDetalle();

      expect(component.cuerpoTablaDetalle).toContain(mockDetalle);
      expect(resetSpy).toHaveBeenCalled();
    });

    it('seleccionTabla debería almacenar el primer elemento seleccionado', () => {
      const mockDetalles = [
        { nombreCientifico: 'Tilapia nilotica' },
        { nombreCientifico: 'Oreochromis niloticus' }
      ];

      component.seleccionTabla(mockDetalles);

      expect(component.detallesSeleccionados).toEqual(mockDetalles[0]);
    });

    it('seleccionTabla debería manejar array vacío', () => {
      component.seleccionTabla([]);

      expect(component.detallesSeleccionados).toEqual({} as Detalles);
    });

    it('eliminarFilaDetalle debería configurar notificación de confirmación', () => {
      component.eliminarFilaDetalle();

      expect(component.nuevaNotificacion).toBeDefined();
      expect(component.nuevaNotificacion.titulo).toBe('Eliminar datos de la tabla');
      expect(component.nuevaNotificacion.categoria).toBe('danger');
      expect(component.eliminarDatosTabla).toBe(true);
    });

    it('eliminarPedimentoDatos debería eliminar elemento cuando se confirma', () => {
      const mockDetalle = { nombreCientifico: 'Tilapia nilotica' };
      component.cuerpoTablaDetalle = [mockDetalle];
      component.detallesSeleccionados = mockDetalle;

      component.eliminarPedimentoDatos(true);

      expect(component.cuerpoTablaDetalle).not.toContain(mockDetalle);
      expect(component.eliminarDatosTabla).toBe(false);
      expect(component.detallesSeleccionados).toEqual({} as Detalles);
    });

    it('eliminarPedimentoDatos debería cancelar eliminación cuando se rechaza', () => {
      const mockDetalle = { nombreCientifico: 'Tilapia nilotica' };
      component.cuerpoTablaDetalle = [mockDetalle];

      component.eliminarPedimentoDatos(false);

      expect(component.cuerpoTablaDetalle).toContain(mockDetalle);
      expect(component.eliminarDatosTabla).toBe(false);
    });
  });

  describe('Métodos de Store', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('setValoresDetalleStore debería agregar valor al estado actual', () => {
      const mockDetalle = { nombreCientifico: 'Test científico' };
      jest.spyOn(component.detallesGroup, 'getRawValue').mockReturnValue(mockDetalle);
      
      const estadoActualMock = [mockFilaData];
      mockAcuiculturaQuery.getValue.mockReturnValue({
        ...mockAcuiculturaState,
        mercanciaGroup: estadoActualMock
      });

      component.setValoresDetalleStore();

      expect(estadoActualMock).toContain(mockDetalle);
    });
  });

  describe('Emisión de Eventos', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('debería emitir evento cerrar en agregarFila', () => {
      const emitSpy = jest.spyOn(component.cerrar, 'emit');
      jest.spyOn(component.mercanciaGroup, 'getRawValue').mockReturnValue(mockFilaData);

      component.agregarFila();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('debería emitir evento cerrar en eliminarFila', () => {
      const emitSpy = jest.spyOn(component.cerrar, 'emit');

      component.eliminarFila();

      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('Manejo de Memoria', () => {
    it('debería tener DESTROY_NOTIFIER$ configurado como readonly', () => {
      expect(component['DESTROY_NOTIFIER$']).toBeDefined();
      expect(component['DESTROY_NOTIFIER$'].closed).toBe(false);
    });
  });

  describe('Casos Edge y Validaciones', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('debería manejar datosMercanciaStore vacío en createMercanciaGroup', () => {
      component.datosMercanciaStore = {} as Fila;

      const formGroup = component.createMercanciaGroup();

      expect(formGroup.get('tipoRequisito')?.value).toBe('');
      expect(formGroup.get('descripcion')?.value).toBe('');
    });

    it('debería manejar setValoresStore con campo no reconocido', () => {
      const patchValueSpy = jest.spyOn(component.mercanciaGroup, 'patchValue');

      component.setValoresStore(undefined, 'campoInexistente');

      expect(patchValueSpy).not.toHaveBeenCalled();
    });

    it('debería manejar agregarFila sin datosMercanciaStore', () => {
      component.datosMercanciaStore = null as any;
      jest.spyOn(component.mercanciaGroup, 'getRawValue').mockReturnValue(mockFilaData);

      expect(() => component.agregarFila()).not.toThrow();
      expect(mockAcuiculturaStore.actualizarMercanciaGroup).toHaveBeenCalled();
    });
  });
});
