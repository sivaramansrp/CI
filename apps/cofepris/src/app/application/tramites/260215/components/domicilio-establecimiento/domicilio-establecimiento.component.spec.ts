import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioComponent } from './domicilio-establecimiento.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NicoInfo } from '../../models/permiso-sanitario.model';
import { QueryList } from '@angular/core';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let mockTramite260215Store: jest.Mocked<Tramite260215Store>;
  let mockTramite260215Query: jest.Mocked<Tramite260215Query>;
  let mockService: jest.Mocked<ServiciosPermisoSanitarioService>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  const mockSolicitudData = {
    codigoPostal: '12345',
    estado: 'Estado1',
    muncipio: 'Municipio1',
    localidad: 'Localidad1',
    colonia: 'Colonia1',
    calle: 'Calle Principal 123',
    lada: '55',
    telefono: '5555555555',
    avisoCheckbox: false,
    licenciaSanitaria: 'LS123456',
    regimen: 'Regimen1',
    aduanasEntradas: ['Aduana1', 'Aduana2'],
    fraccionArancelaria: '12345678',
    cantidadUMT: '100.5',
    cantidadUMC: '200.25',
    presentacion: 'Presentación test',
  };

  const mockEstadoData = {
    code: 200,
    data: [
      { id: '1', nombre: 'Estado 1' },
      { id: '2', nombre: 'Estado 2' },
    ],
    message: 'Success',
  };

  const mockNicoData = {
    code: 200,
    data: [
      { clave_Scian: '123456', descripcion_Scian: 'Descripción 1' },
      { clave_Scian: '789012', descripcion_Scian: 'Descripción 2' },
    ],
    message: 'Success',
  };

  const mockMercanciasData = {
    code: 200,
    data: [
      {
        id: '1',
        clasificacion: 'Clasificación 1',
        especificar: 'Especificar 1',
        denominacionEspecifica: 'Denominación específica 1',
      },
    ],
    message: 'Success',
  };

  beforeEach(async () => {
    // Crear mocks
    mockTramite260215Store = {
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoCheckbox: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setRegimen: jest.fn(),
      setAduanasEntradas: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<Tramite260215Store>;

    mockTramite260215Query = {
      selectSolicitud$: of(mockSolicitudData),
      select: jest.fn().mockReturnValue(of(mockSolicitudData)),
    } as unknown as jest.Mocked<Tramite260215Query>;

    mockService = {
      getObtenerEstadoList: jest.fn().mockReturnValue(of(mockEstadoData)),
      getObtenerTablaDatos: jest.fn().mockReturnValue(of(mockNicoData)),
      getObtenerMercanciasDatos: jest.fn().mockReturnValue(of(mockMercanciasData)),
    } as unknown as jest.Mocked<ServiciosPermisoSanitarioService>;

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      imports: [DomicilioComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: Tramite260215Store, useValue: mockTramite260215Store },
        { provide: Tramite260215Query, useValue: mockTramite260215Query },
        { provide: ServiciosPermisoSanitarioService, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialización del Componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar propiedades con valores predeterminados', () => {
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.colapsable).toBe(false);
      expect(component.colapsableDuos).toBe(false);
      expect(component.colapsableTres).toBe(false);
      expect(component.nicoTablaDatos).toEqual([]);
      expect(component.mercanciasTablaDatos).toEqual([]);
      expect(component.seleccionados).toEqual([]);
      expect(component.estado).toEqual([]);
    });

    it('debería inicializar formularios en ngOnInit', () => {
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.domicilio).toBeDefined();
      expect(component.formAgente).toBeDefined();
      expect(component.formMercancias).toBeDefined();
    });

    it('debería suscribirse a consultaioQuery y establecer estado de solo lectura', () => {
      const readonlyState = {
        readonly: true,
        procedureId: '',
        parameter: null,
        department: '',
        folioTramite: '',
        usuario: null,
        estatus: '',
        fechaCreacion: '',
        fechaActualizacion: ''
      };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState as any);

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.esFormularioSoloLectura).toBe(true);
    });
  });

  describe('Inicialización de Formularios', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería inicializar el formulario domicilio con datos de solicitud', () => {
      expect(component.domicilio.get('codigoPostal')?.value).toBe('12345');
      expect(component.domicilio.get('estado')?.value).toBe('Estado1');
      expect(component.domicilio.get('muncipio')?.value).toBe('Municipio1');
      expect(component.domicilio.get('calle')?.value).toBe('Calle Principal 123');
      expect(component.domicilio.get('telefono')?.value).toBe('5555555555');
    });

    it('debería inicializar formAgente con valores vacíos y validadores', () => {
      expect(component.formAgente.get('claveScianModal')?.value).toBe('');
      expect(component.formAgente.get('claveDescripcionModal')?.value).toBe('');
      expect(component.formAgente.get('claveScianModal')?.hasError('required')).toBe(true);
    });

    it('debería inicializar formMercancias con validadores', () => {
      expect(component.formMercancias.get('clasificacion')?.hasError('required')).toBe(true);
      expect(component.formMercancias.get('fraccionArancelaria')?.value).toBe('12345678');
      expect(component.formMercancias.get('cantidadUMT')?.value).toBe('100.5');
    });

    it('debería deshabilitar formulario cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();

      expect(component.domicilio.disabled).toBe(true);
    });

    it('debería habilitar formulario cuando esFormularioSoloLectura es false', () => {
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();

      expect(component.domicilio.enabled).toBe(true);
    });
  });

  describe('Integración de Servicios', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería llamar obtenerEstadoList y poblar el array estado', () => {
      expect(mockService.getObtenerEstadoList).toHaveBeenCalled();
      expect(component.estado).toEqual(mockEstadoData.data);
    });

    it('debería llamar obtenerTablaDatos y poblar el array nicoTablaDatos', () => {
      expect(mockService.getObtenerTablaDatos).toHaveBeenCalled();
      expect(component.nicoTablaDatos).toEqual(mockNicoData.data);
    });

    it('debería llamar obtenerMercanciasDatos y poblar el array mercanciasTablaDatos', () => {
      expect(mockService.getObtenerMercanciasDatos).toHaveBeenCalled();
      expect(component.mercanciasTablaDatos).toEqual(mockMercanciasData.data);
    });
  });

  describe('Métodos de Elementos Colapsables', () => {
    it('debería alternar el estado de colapsable', () => {
      expect(component.colapsable).toBe(false);
      component.mostrar_colapsable();
      expect(component.colapsable).toBe(true);
      component.mostrar_colapsable();
      expect(component.colapsable).toBe(false);
    });

    it('debería alternar el estado de colapsableDuos', () => {
      expect(component.colapsableDuos).toBe(false);
      component.mostrar_colapsableDuos();
      expect(component.colapsableDuos).toBe(true);
      component.mostrar_colapsableDuos();
      expect(component.colapsableDuos).toBe(false);
    });

    it('debería alternar el estado de colapsableTres', () => {
      expect(component.colapsableTres).toBe(false);
      component.mostrar_colapsableTres();
      expect(component.colapsableTres).toBe(true);
      component.mostrar_colapsableTres();
      expect(component.colapsableTres).toBe(false);
    });
  });

  describe('Interacciones de Checkbox y Formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería deshabilitar licenciaSanitaria cuando avisoCheckbox está marcado', () => {
      const checkboxEvent = { target: { checked: true } } as unknown as Event;
      component.onAvisoCheckboxChange(checkboxEvent);

      expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
    });

    it('debería habilitar licenciaSanitaria cuando avisoCheckbox está desmarcado', () => {
      const checkboxEvent = { target: { checked: false } } as unknown as Event;
      component.onAvisoCheckboxChange(checkboxEvent);

      expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
    });

    it('debería deshabilitar avisoCheckbox cuando licenciaSanitaria tiene valor', () => {
      const inputEvent = { target: { value: 'LS123456' } } as unknown as Event;
      component.onLicenciaSanitariaChange(inputEvent);

      expect(component.domicilio.get('avisoCheckbox')?.value).toBe(false);
      expect(component.domicilio.get('avisoCheckbox')?.disabled).toBe(true);
    });

    it('debería habilitar avisoCheckbox cuando licenciaSanitaria está vacío', () => {
      const inputEvent = { target: { value: '' } } as unknown as Event;
      component.onLicenciaSanitariaChange(inputEvent);

      expect(component.domicilio.get('avisoCheckbox')?.enabled).toBe(true);
    });
  });

  describe('Gestión de Tabla - NICO', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería manejar el cambio de selección', () => {
      const mockSelection: NicoInfo[] = [
        { clave_Scian: '123456', descripcion_Scian: 'Descripción de Prueba' },
      ];

      component.onSeleccionChange(mockSelection);

      expect(component.seleccionados).toEqual(mockSelection);
    });

    it('debería agregar nueva fila cuando el formulario es válido', () => {
      component.formAgente.patchValue({
        claveScianModal: '123456',
        claveDescripcionModal: 'Descripción de Prueba',
      });

      const initialLength = component.nicoTablaDatos.length;
      component.agregarFila();

      expect(component.nicoTablaDatos.length).toBe(initialLength + 1);
      expect(component.nicoTablaDatos[component.nicoTablaDatos.length - 1]).toEqual({
        clave_Scian: '123456',
        descripcion_Scian: 'Descripción de Prueba',
      });
      expect(component.formAgente.get('claveScianModal')?.value).toBeNull();
    });

    it('no debería agregar fila cuando el formulario es inválido', () => {
      component.formAgente.patchValue({
        claveScianModal: '', // Inválido - campo requerido
        claveDescripcionModal: 'Descripción de Prueba',
      });

      const initialLength = component.nicoTablaDatos.length;
      component.agregarFila();

      expect(component.nicoTablaDatos.length).toBe(initialLength);
    });

    it('debería eliminar filas seleccionadas', () => {
      const testData: NicoInfo[] = [
        { clave_Scian: '123456', descripcion_Scian: 'Prueba 1' },
        { clave_Scian: '789012', descripcion_Scian: 'Prueba 2' },
      ];

      component.nicoTablaDatos = [...testData];
      component.seleccionados = [testData[0]];

      component.eliminarFila();

      expect(component.nicoTablaDatos.length).toBe(1);
      expect(component.nicoTablaDatos[0]).toEqual(testData[1]);
      expect(component.seleccionados).toEqual([]);
    });

    it('debería mostrar notificación cuando no hay filas seleccionadas para eliminar', () => {
      component.seleccionados = [];

      component.eliminarFila();

      expect(component.nuevaNotificacion).toEqual(
        expect.objectContaining({
          categoria: 'danger',
          mensaje: 'Selecciona un registro para eliminar.',
          tipoNotificacion: 'alert',
        })
      );
    });

    it('debería manejar array seleccionados vacío en eliminarFila', () => {
      component.seleccionados = [];
      const initialLength = component.nicoTablaDatos.length;

      component.eliminarFila();

      expect(component.nicoTablaDatos.length).toBe(initialLength);
      expect(component.nuevaNotificacion.categoria).toBe('danger');
    });
  });

  describe('Integración de CrossList', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();

      // Mock de componentes CrossList
      const mockCrossListComponents = [
        { agregar: jest.fn(), quitar: jest.fn() },
        { agregar: jest.fn(), quitar: jest.fn() },
        { agregar: jest.fn(), quitar: jest.fn() },
      ] as unknown as CrosslistComponent[];

      component.crossList = new QueryList<CrosslistComponent>();
      component.crossList.reset(mockCrossListComponents);
    });

    it('debería llamar agregar con "t" en paisDeProcedenciaBotones[0].funcion', () => {
      const crossListSpy = component.crossList.toArray()[0];
      component.paisDeProcedenciaBotones[0].funcion();

      expect(crossListSpy.agregar).toHaveBeenCalledWith('t');
    });

    it('debería llamar agregar con "" en paisDeProcedenciaBotones[1].funcion', () => {
      const crossListSpy = component.crossList.toArray()[0];
      component.paisDeProcedenciaBotones[1].funcion();

      expect(crossListSpy.agregar).toHaveBeenCalledWith('');
    });

    it('debería llamar quitar con "" en paisDeProcedenciaBotones[2].funcion', () => {
      const crossListSpy = component.crossList.toArray()[0];
      component.paisDeProcedenciaBotones[2].funcion();

      expect(crossListSpy.quitar).toHaveBeenCalledWith('');
    });

    it('debería llamar quitar con "t" en paisDeProcedenciaBotones[3].funcion', () => {
      const crossListSpy = component.crossList.toArray()[0];
      component.paisDeProcedenciaBotones[3].funcion();

      expect(crossListSpy.quitar).toHaveBeenCalledWith('t');
    });

    it('debería llamar métodos correctos en paisDeProcedenciaBotonesDuos', () => {
      const crossListSpy = component.crossList.toArray()[1];

      component.paisDeProcedenciaBotonesDuos[0].funcion();
      expect(crossListSpy.agregar).toHaveBeenCalledWith('t');

      component.paisDeProcedenciaBotonesDuos[1].funcion();
      expect(crossListSpy.agregar).toHaveBeenCalledWith('');

      component.paisDeProcedenciaBotonesDuos[2].funcion();
      expect(crossListSpy.quitar).toHaveBeenCalledWith('');

      component.paisDeProcedenciaBotonesDuos[3].funcion();
      expect(crossListSpy.quitar).toHaveBeenCalledWith('t');
    });

    it('debería llamar métodos correctos en paisDeProcedenciaBotonesTres', () => {
      const crossListSpy = component.crossList.toArray()[2];

      component.paisDeProcedenciaBotonesTres[0].funcion();
      expect(crossListSpy.agregar).toHaveBeenCalledWith('t');

      component.paisDeProcedenciaBotonesTres[1].funcion();
      expect(crossListSpy.agregar).toHaveBeenCalledWith('');

      component.paisDeProcedenciaBotonesTres[2].funcion();
      expect(crossListSpy.quitar).toHaveBeenCalledWith('');

      component.paisDeProcedenciaBotonesTres[3].funcion();
      expect(crossListSpy.quitar).toHaveBeenCalledWith('t');
    });
  });

  describe('Integración con Store', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería llamar setValoresStore con parámetros correctos', () => {
      component.setValoresStore(component.domicilio, 'codigoPostal', 'setCodigoPostal');

      expect(mockTramite260215Store.setCodigoPostal).toHaveBeenCalledWith('12345');
    });

    it('debería manejar diferentes tipos de campos en setValoresStore', () => {
      component.domicilio.get('avisoCheckbox')?.setValue(true);
      component.setValoresStore(component.domicilio, 'avisoCheckbox', 'setAvisoCheckbox');

      expect(mockTramite260215Store.setAvisoCheckbox).toHaveBeenCalledWith(true);
    });
  });

  describe('Gestión de Estado de Formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería llamar inicializarFormulario cuando no está en modo solo lectura', () => {
      component.esFormularioSoloLectura = false;
      const spy = jest.spyOn(component, 'inicializarFormulario');

      component.inicializarEstadoFormulario();

      expect(spy).toHaveBeenCalled();
    });

    it('debería llamar guardarDatosFormulario cuando está en modo solo lectura', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component, 'guardarDatosFormulario');

      component.inicializarEstadoFormulario();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Limpieza del Componente', () => {
    it('debería completar destroyNotifier$ en ngOnDestroy', () => {
      const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(destroyNotifierSpy).toHaveBeenCalled();
    });

    it('debería desuscribirse de observables para prevenir pérdidas de memoria', () => {
      const destroyNotifier$ = new Subject<void>();
      component['destroyNotifier$'] = destroyNotifier$;

      const completeSpy = jest.spyOn(destroyNotifier$, 'complete');
      const nextSpy = jest.spyOn(destroyNotifier$, 'next');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Casos Límite y Manejo de Errores', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería manejar valores null/undefined en controles de formulario', () => {
      component.domicilio.get('codigoPostal')?.setValue(null);

      expect(() => {
        component.setValoresStore(component.domicilio, 'codigoPostal', 'setCodigoPostal');
      }).not.toThrow();
    });

    it('debería manejar arrays vacíos en operaciones de selección', () => {
      component.seleccionados = [];
      component.nicoTablaDatos = [];

      expect(() => {
        component.eliminarFila();
      }).not.toThrow();

      expect(component.nuevaNotificacion).toBeDefined();
    });

    it('debería manejar errores de servicio de manera elegante', () => {
      const errorService = {
        getObtenerEstadoList: jest.fn().mockReturnValue(of({ data: null })),
        getObtenerTablaDatos: jest.fn().mockReturnValue(of({ data: null })),
        getObtenerMercanciasDatos: jest.fn().mockReturnValue(of({ data: null })),
      } as unknown as jest.Mocked<ServiciosPermisoSanitarioService>;

      TestBed.overrideProvider(ServiciosPermisoSanitarioService, { useValue: errorService });

      expect(() => {
        component.obtenerEstadoList();
        component.obtenerTablaDatos();
        component.obtenerMercanciasDatos();
      }).not.toThrow();
    });
  });

  describe('Validación de Formularios', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería validar campos requeridos en formulario domicilio', () => {
      const form = component.domicilio;

      form.get('codigoPostal')?.setValue('');
      form.get('estado')?.setValue('');
      form.get('calle')?.setValue('');
      form.get('telefono')?.setValue('');

      expect(form.get('codigoPostal')?.hasError('required')).toBe(true);
      expect(form.get('estado')?.hasError('required')).toBe(true);
      expect(form.get('calle')?.hasError('required')).toBe(true);
      expect(form.get('telefono')?.hasError('required')).toBe(true);
    });

    it('debería validar patrones para campos numéricos', () => {
      const form = component.domicilio;

      form.get('codigoPostal')?.setValue('abc123');
      form.get('lada')?.setValue('abc55');
      form.get('telefono')?.setValue('555abc5555');

      expect(form.get('codigoPostal')?.hasError('pattern')).toBe(true);
      expect(form.get('lada')?.hasError('pattern')).toBe(true);
      expect(form.get('telefono')?.hasError('pattern')).toBe(true);
    });

    it('debería validar restricciones de longitud máxima', () => {
      const form = component.domicilio;
      const longString = 'a'.repeat(150);

      form.get('muncipio')?.setValue(longString);
      form.get('localidad')?.setValue(longString);
      form.get('colonia')?.setValue(longString);
      form.get('calle')?.setValue(longString);

      expect(form.get('muncipio')?.hasError('maxlength')).toBe(true);
      expect(form.get('localidad')?.hasError('maxlength')).toBe(true);
      expect(form.get('colonia')?.hasError('maxlength')).toBe(true);
      expect(form.get('calle')?.hasError('maxlength')).toBe(true);
    });

    it('debería validar fraccionArancelaria en formMercancias', () => {
      const form = component.formMercancias;

      form.get('fraccionArancelaria')?.setValue('123'); // Menos de 8 caracteres
      expect(form.get('fraccionArancelaria')?.hasError('minlength')).toBe(true);

      form.get('fraccionArancelaria')?.setValue('abc12345'); // Contiene no dígitos
      expect(form.get('fraccionArancelaria')?.hasError('pattern')).toBe(true);

      form.get('fraccionArancelaria')?.setValue('12345678'); // Válido
      expect(form.get('fraccionArancelaria')?.valid).toBe(true);
    });
  });
});
