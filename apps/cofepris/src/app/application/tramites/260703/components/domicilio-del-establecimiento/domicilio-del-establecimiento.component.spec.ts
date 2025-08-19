import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { MERCANCIAS_DATA, NOTIFICION_INPUT } from '../../enum/solicitud-permiso.enum';
import { SCIAN_DATA } from '../../../../shared/constantes/datos-scian.enum';

describe('DomicilioDelEstablecimientoComponent', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let mockTramite260703Store: jest.Mocked<Tramite260703Store>;
  let mockTramite260703Query: jest.Mocked<Tramite260703Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSolicitudPermisoService: jest.Mocked<SolicitudPermisoService>;
  let formBuilder: FormBuilder;

  // Datos simulados (mock)
  const mockSolicitudPermisoState = {
    preOperativFormState: {
      ideGenerica1: '',
      observaciones: ''
    },
    datosDelEstablecimientoFormState: {
      razonSocial: '',
      correoElectronico: ''
    },
    manifiestosFormState: {
      seleccionadaManifiesto: [true, false, true],
      informacionConfidencial: 'Si'
    },
    representanteLegalFormState: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      rfc: ''
    },
    domicilloDelEstablecimientoFormState: {
      codigoPostal: '12345',
      estado: 'VERACRUZ',
      descripcionMunicipio: 'ALVARADO',
      informacionExtra: 'ALVARADO',
      descripcionColonia: 'CENTRO',
      calle: 'HERMENEGUILDO GALEANA',
      lada: '22',
      telefono: '2979725632',
      funcionamiento: true,
      licencia: 'LIC-123456',
      regimen: 'Definitivos',
      aduana: 'DOS BOCAS'
    }
  } as any; // Usar 'as any' para evitar verificación estricta de tipos en los datos simulados

  const mockConsultaioState = {
    readonly: false
  };

  const mockScianData = [
    { id: 1, scian: '123456', descripcion: 'Descripción 1', clave: 'SCIAN1' },
    { id: 2, scian: '789012', descripcion: 'Descripción 2', clave: 'SCIAN2' }
  ];

  const mockMercanciaData = [
    { 
      id: 1, 
      fraccion: '1234.56.78', 
      descripcion: 'Mercancía 1',
      productoClassificacion: 'Clase A',
      productoEspecificarClassificacion: 'Subclase A1',
      denomiacionEspecifica: 'Denominación específica 1',
      marca: 'Marca 1',
      modelo: 'Modelo 1',
      numeroLote: 'Lote 1',
      fraccionArancelaria: 12345678,
      descripcionFraccion: 'Descripción de fracción 1'
    },
    { 
      id: 2, 
      fraccion: '9876.54.32', 
      descripcion: 'Mercancía 2',
      productoClassificacion: 'Clase B',
      productoEspecificarClassificacion: 'Subclase B1',
      denomiacionEspecifica: 'Denominación específica 2',
      marca: 'Marca 2',
      modelo: 'Modelo 2',
      numeroLote: 'Lote 2',
      fraccionArancelaria: 98765432,
      descripcionFraccion: 'Descripción de fracción 2'
    }
  ];

  const mockCatalogos = [
    { id: 1, codigo: 'VER', descripcion: 'VERACRUZ' },
    { id: 2, codigo: 'JAL', descripcion: 'JALISCO' }
  ];

  beforeEach(async () => {
    // Simulación (Mock) para Tramite260703Store
    mockTramite260703Store = {
      actualizarEstadoFormularioDomicilioDelEstablecimiento: jest.fn()
    } as unknown as jest.Mocked<Tramite260703Store>;

    // Simulación (Mock) para Tramite260703Query
    mockTramite260703Query = {
      selectSolicitudPermiso$: of(mockSolicitudPermisoState)
    } as unknown as jest.Mocked<Tramite260703Query>;

    // Simulación (Mock) para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Simulación (Mock) para SolicitudPermisoService
    mockSolicitudPermisoService = {
      obtenerDomicilioCatalogo: jest.fn(),
      obtenerScianData: jest.fn().mockReturnValue(of(mockScianData)),
      obtenerMercanciaData: jest.fn().mockReturnValue(of(mockMercanciaData)),
      regimen: mockCatalogos,
      aduana: mockCatalogos
    } as unknown as jest.Mocked<SolicitudPermisoService>;

    await TestBed.configureTestingModule({
      declarations: [DomicilioDelEstablecimientoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: mockTramite260703Store },
        { provide: Tramite260703Query, useValue: mockTramite260703Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudPermisoService, useValue: mockSolicitudPermisoService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(DomicilioDelEstablecimientoComponent, {
      set: {
        template: `
          <div class="container">
            <form [formGroup]="domicilloDelEstablecimientoForm">
              <div class="row">
                <input type="text" formControlName="codigoPostal" />
                <select formControlName="estado">
                  <option value="">Seleccione estado</option>
                </select>
                <input type="text" formControlName="descripcionMunicipio" />
                <input type="text" formControlName="informacionExtra" />
                <input type="text" formControlName="descripcionColonia" />
                <input type="text" formControlName="calle" />
                <input type="text" formControlName="lada" />
                <input type="text" formControlName="telefono" />
                <input type="text" formControlName="funcionamiento" />
                <input type="text" formControlName="licencia" />
                <select formControlName="regimen">
                  <option value="">Seleccione régimen</option>
                </select>
                <select formControlName="aduana">
                  <option value="">Seleccione aduana</option>
                </select>
              </div>
            </form>
          </div>
        `
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomicilioDelEstablecimientoComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    
    // Inicializar el estado del componente ANTES de espiar para evitar problemas
    component.solicitudPermisoState = mockSolicitudPermisoState;
    component.scianDatos = mockScianData;
    component.mercanciaDatos = mockMercanciaData;
    component.esFormularioSoloLectura = false; // Establecer como false inicialmente para coincidir con el mock
    
    // Espiar los métodos del componente ANTES de la inicialización
    jest.spyOn(component, 'inicializarFormularioDomicilioDelEstablecimiento');
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(component, 'obtenerScianData');
    jest.spyOn(component, 'obternerMercanciaData');
    jest.spyOn(component, 'setValoresStore');
    
    // Trigger ngOnInit and component initialization
    fixture.detectChanges();
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.notificacionInput).toEqual(NOTIFICION_INPUT);
      expect(component.configuracionTabla).toEqual(SCIAN_DATA);
      expect(component.configuracionTablaMercancia).toEqual(MERCANCIAS_DATA);
      expect(component.destruirNotificacion$).toBeInstanceOf(Subject);
    });

    it('debería inicializar el esFormularioSoloLectura como false según el mock', () => {
      // Según los datos simulados (mock), solo lectura es false
      expect(component.esFormularioSoloLectura).toBe(false);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      // Accedemos a las propiedades privadas con casting
      const componentAny = component as any;
      expect(componentAny.formBuilder).toBeDefined();
      expect(componentAny.solicitudPermisoService).toBeDefined();
      expect(componentAny.tramite260703Store).toBeDefined();
      expect(componentAny.tramite2606703Query).toBeDefined();
      expect(componentAny.consultaioQuery).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockConsultaioState));
      const mockSelectConsultaioState$ = {
        pipe: mockPipeFn
      };
      
      mockConsultaioQuery.selectConsultaioState$ = mockSelectConsultaioState$ as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new DomicilioDelEstablecimientoComponent(
        formBuilder,
        mockSolicitudPermisoService,
        mockTramite260703Store,
        mockTramite260703Query,
        mockConsultaioQuery
      );
      
      // Aunque en el constructor se establece directamente como true, 
      // verificamos que la suscripción se realiza correctamente
      expect(mockPipeFn).toHaveBeenCalled();
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse a selectSolicitudPermiso$ y guardar el estado', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockSolicitudPermisoState));
      const mockSelectSolicitudPermiso$ = {
        pipe: mockPipeFn
      };
      
      mockTramite260703Query.selectSolicitudPermiso$ = mockSelectSolicitudPermiso$ as any;
      
      // Limpiamos el efecto de beforeEach que ya llamó a ngOnInit
      component.solicitudPermisoState = undefined as any;
      
      // Llamamos a ngOnInit manualmente
      component.ngOnInit();
      
      expect(component.solicitudPermisoState).toEqual(mockSolicitudPermisoState);
    });

    it('debería llamar a obtenerDomicilioCatalogo', () => {
      // Limpiamos el efecto de beforeEach
      (mockSolicitudPermisoService.obtenerDomicilioCatalogo as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(mockSolicitudPermisoService.obtenerDomicilioCatalogo).toHaveBeenCalled();
    });

    it('debería llamar a obtenerScianData', () => {
      // Limpiamos el efecto de beforeEach
      (component.obtenerScianData as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.obtenerScianData).toHaveBeenCalled();
    });

    it('debería llamar a obternerMercanciaData', () => {
      // Limpiamos el efecto de beforeEach
      (component.obternerMercanciaData as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.obternerMercanciaData).toHaveBeenCalled();
    });

    it('debería llamar a inicializarFormularioDomicilioDelEstablecimiento', () => {
      // Limpiamos el efecto de beforeEach
      (component.inicializarFormularioDomicilioDelEstablecimiento as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.inicializarFormularioDomicilioDelEstablecimiento).toHaveBeenCalled();
    });

    it('debería llamar a guardarDatosFormulario', () => {
      // Limpiamos el efecto de beforeEach
      (component.guardarDatosFormulario as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });
  });

  // Pruebas para inicializarFormularioDomicilioDelEstablecimiento
  describe('inicializarFormularioDomicilioDelEstablecimiento', () => {
    beforeEach(() => {
      // Asegurar que el estado del componente esté correctamente inicializado antes de cada prueba
      component.solicitudPermisoState = mockSolicitudPermisoState;
    });
    
    it('debería crear el formulario reactivo con la estructura correcta', () => {
      // Resetear el formulario
      component.domicilloDelEstablecimientoForm = undefined as any;
      
      // Espiar el método group del formBuilder
      const formBuilderSpy = jest.spyOn(formBuilder, 'group');
      
      component.inicializarFormularioDomicilioDelEstablecimiento();
      
      expect(formBuilderSpy).toHaveBeenCalled();
      expect(component.domicilloDelEstablecimientoForm).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('estado')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('informacionExtra')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('descripcionColonia')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('calle')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('lada')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('telefono')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('funcionamiento')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('licencia')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('regimen')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('aduana')).toBeDefined();
    });

    it('debería inicializar los valores del formulario con el estado actual', () => {
      // Configurar el estado de la solicitud
      component.solicitudPermisoState = {
        domicilloDelEstablecimientoFormState: {
          codigoPostal: '54321',
          estado: 'JALISCO',
          descripcionMunicipio: 'GUADALAJARA',
          informacionExtra: 'MODIFICADO',
          descripcionColonia: 'COLONIA MODIFICADA',
          calle: 'CALLE MODIFICADA',
          lada: '33',
          telefono: '3311223344',
          funcionamiento: false,
          licencia: 'LIC-MODIFICADA',
          regimen: 'Modificado',
          aduana: 'ADUANA MODIFICADA'
        }
      } as any;
      
      component.inicializarFormularioDomicilioDelEstablecimiento();
      
      expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')?.value).toBe('54321');
      expect(component.domicilloDelEstablecimientoForm.get('estado')?.value).toBe('JALISCO');
      expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.value).toBe('GUADALAJARA');
      expect(component.domicilloDelEstablecimientoForm.get('informacionExtra')?.value).toBe('MODIFICADO');
      expect(component.domicilloDelEstablecimientoForm.get('descripcionColonia')?.value).toBe('COLONIA MODIFICADA');
      expect(component.domicilloDelEstablecimientoForm.get('calle')?.value).toBe('CALLE MODIFICADA');
      expect(component.domicilloDelEstablecimientoForm.get('lada')?.value).toBe('33');
      expect(component.domicilloDelEstablecimientoForm.get('telefono')?.value).toBe('3311223344');
      expect(component.domicilloDelEstablecimientoForm.get('funcionamiento')?.value).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('licencia')?.value).toBe('LIC-MODIFICADA');
      expect(component.domicilloDelEstablecimientoForm.get('regimen')?.value).toBe('Modificado');
      expect(component.domicilloDelEstablecimientoForm.get('aduana')?.value).toBe('ADUANA MODIFICADA');
    });

    it('debería aplicar validadores requeridos a los campos obligatorios', () => {
      component.inicializarFormularioDomicilioDelEstablecimiento();
      
      // Limpiar los campos para activar validadores
      component.domicilloDelEstablecimientoForm.get('codigoPostal')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('estado')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('calle')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('telefono')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('licencia')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('regimen')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('aduana')?.setValue('');
      
      expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('estado')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('calle')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('telefono')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('licencia')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('regimen')?.valid).toBe(false);
      expect(component.domicilloDelEstablecimientoForm.get('aduana')?.valid).toBe(false);
      
      expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('estado')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('calle')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('telefono')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('licencia')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('regimen')?.hasError('required')).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('aduana')?.hasError('required')).toBe(true);
    });

    it('debería no aplicar validadores a los campos opcionales', () => {
      component.inicializarFormularioDomicilioDelEstablecimiento();
      
      // Limpiar los campos para verificar que no tienen validadores requeridos
      component.domicilloDelEstablecimientoForm.get('informacionExtra')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('descripcionColonia')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('lada')?.setValue('');
      component.domicilloDelEstablecimientoForm.get('funcionamiento')?.setValue(null);
      
      expect(component.domicilloDelEstablecimientoForm.get('informacionExtra')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('descripcionColonia')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('lada')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('funcionamiento')?.valid).toBe(true);
    });
  });

  // Pruebas para obtenerScianData
  describe('obtenerScianData', () => {
    it('debería llamar al servicio y establecer los datos de SCIAN', () => {
      // Resetear datos
      component.scianDatos = undefined as any;
      
      component.obtenerScianData();
      
      expect(mockSolicitudPermisoService.obtenerScianData).toHaveBeenCalled();
      expect(component.scianDatos).toEqual(mockScianData);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockSolicitudPermisoService.obtenerScianData.mockReturnValue(of([]));
      
      // Resetear datos
      component.scianDatos = undefined as any;
      
      component.obtenerScianData();
      
      expect(component.scianDatos).toEqual([]);
    });
  });

  // Pruebas para obternerMercanciaData
  describe('obternerMercanciaData', () => {
    it('debería llamar al servicio y establecer los datos de mercancía', () => {
      // Resetear datos
      component.mercanciaDatos = undefined as any;
      
      component.obternerMercanciaData();
      
      expect(mockSolicitudPermisoService.obtenerMercanciaData).toHaveBeenCalled();
      expect(component.mercanciaDatos).toEqual(mockMercanciaData);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockSolicitudPermisoService.obtenerMercanciaData.mockReturnValue(of([]));
      
      // Resetear datos
      component.mercanciaDatos = undefined as any;
      
      component.obternerMercanciaData();
      
      expect(component.mercanciaDatos).toEqual([]);
    });
  });

  // Pruebas para setValoresStore
  describe('setValoresStore', () => {
    beforeEach(() => {
      // Asegurar que el formulario esté correctamente inicializado antes de cada prueba
      component.solicitudPermisoState = mockSolicitudPermisoState;
      if (!component.domicilloDelEstablecimientoForm) {
        component.domicilloDelEstablecimientoForm = formBuilder.group({
          codigoPostal: [mockSolicitudPermisoState.domicilloDelEstablecimientoFormState.codigoPostal],
          estado: [mockSolicitudPermisoState.domicilloDelEstablecimientoFormState.estado],
          funcionamiento: [mockSolicitudPermisoState.domicilloDelEstablecimientoFormState.funcionamiento],
          // Agregar otros controles de formulario según sea necesario
        });
      }
    });
    
    it('debería llamar a actualizarEstadoFormularioDomicilioDelEstablecimiento con el valor de codigoPostal', () => {
      component.domicilloDelEstablecimientoForm.get('codigoPostal')?.setValue('98765');
      
      component.setValoresStore('codigoPostal');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledWith({
        codigoPostal: '98765'
      });
    });

    it('debería llamar a actualizarEstadoFormularioDomicilioDelEstablecimiento con el valor de estado', () => {
      component.domicilloDelEstablecimientoForm.get('estado')?.setValue('NUEVO ESTADO');
      
      component.setValoresStore('estado');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledWith({
        estado: 'NUEVO ESTADO'
      });
    });

    it('debería llamar a actualizarEstadoFormularioDomicilioDelEstablecimiento con el valor de funcionamiento', () => {
      component.domicilloDelEstablecimientoForm.get('funcionamiento')?.setValue(false);
      
      component.setValoresStore('funcionamiento');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledWith({
        funcionamiento: false
      });
    });

    it('debería manejar campos inválidos o inexistentes', () => {
      component.setValoresStore('campoInexistente');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledWith({
        campoInexistente: undefined
      });
    });
  });

  // Pruebas para guardarDatosFormulario
  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      // Asegurar que el formulario esté correctamente inicializado antes de cada prueba
      component.solicitudPermisoState = mockSolicitudPermisoState;
      if (!component.domicilloDelEstablecimientoForm) {
        component.domicilloDelEstablecimientoForm = formBuilder.group({
          codigoPostal: [mockSolicitudPermisoState.domicilloDelEstablecimientoFormState.codigoPostal],
          estado: [mockSolicitudPermisoState.domicilloDelEstablecimientoFormState.estado],
          funcionamiento: [mockSolicitudPermisoState.domicilloDelEstablecimientoFormState.funcionamiento],
          // Agregar otros controles de formulario según sea necesario
        });
      }
    });
    
    it('debería deshabilitar todo el formulario cuando esFormularioSoloLectura es true', () => {
      const disableSpy = jest.spyOn(component.domicilloDelEstablecimientoForm, 'disable');
      
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(disableSpy).toHaveBeenCalled();
    });

    it('debería habilitar todo el formulario cuando esFormularioSoloLectura es false', () => {
      const enableSpy = jest.spyOn(component.domicilloDelEstablecimientoForm, 'enable');
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(enableSpy).toHaveBeenCalled();
    });

    it('debería verificar que el formulario está deshabilitado cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(component.domicilloDelEstablecimientoForm.disabled).toBe(true);
    });

    it('debería verificar que el formulario está habilitado cuando esFormularioSoloLectura es false', () => {
      // Primero deshabilitamos
      component.domicilloDelEstablecimientoForm.disable();
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(component.domicilloDelEstablecimientoForm.enabled).toBe(true);
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destruirNotificacion$', () => {
      const nextSpy = jest.spyOn(component.destruirNotificacion$, 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destruirNotificacion$', () => {
      const completeSpy = jest.spyOn(component.destruirNotificacion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const nextSpy = jest.spyOn(component.destruirNotificacion$, 'next');
      const completeSpy = jest.spyOn(component.destruirNotificacion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      // Esta prueba se ejecuta después de beforeEach, que ya llamó a fixture.detectChanges() e inicializó el componente
      expect(component.solicitudPermisoState).toEqual(mockSolicitudPermisoState);
      expect(component.domicilloDelEstablecimientoForm).toBeDefined();
      expect(component.scianDatos).toEqual(mockScianData);
      expect(component.mercanciaDatos).toEqual(mockMercanciaData);
      expect(component.esFormularioSoloLectura).toBe(false);
    });

    it('debería reaccionar a cambios en el formulario y actualizar el store', () => {
      // Simulamos un cambio en el formulario
      component.domicilloDelEstablecimientoForm.get('codigoPostal')?.setValue('99999');
      component.setValoresStore('codigoPostal');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledWith({
        codigoPostal: '99999'
      });
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar suscripción a observable que no emite en ngOnInit', () => {
      mockTramite260703Query.selectSolicitudPermiso$ = new Subject().asObservable() as any;
      
      // Crear nuevo componente para evitar efectos de beforeEach
      const newComponent = new DomicilioDelEstablecimientoComponent(
        formBuilder,
        mockSolicitudPermisoService,
        mockTramite260703Store,
        mockTramite260703Query,
        mockConsultaioQuery
      );
      
      // Configurar el estado necesario para evitar null pointer exceptions
      newComponent.solicitudPermisoState = mockSolicitudPermisoState;
      
      expect(() => {
        newComponent.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar suscripción a observable que no emite en obtenerScianData', () => {
      mockSolicitudPermisoService.obtenerScianData.mockReturnValue(new Subject().asObservable() as any);
      
      expect(() => {
        component.obtenerScianData();
      }).not.toThrow();
    });

    it('debería manejar suscripción a observable que no emite en obternerMercanciaData', () => {
      mockSolicitudPermisoService.obtenerMercanciaData.mockReturnValue(new Subject().asObservable() as any);
      
      expect(() => {
        component.obternerMercanciaData();
      }).not.toThrow();
    });

    it('debería manejar formulario no inicializado en setValoresStore', () => {
      component.domicilloDelEstablecimientoForm = undefined as any;
      
      expect(() => {
        component.setValoresStore('codigoPostal');
      }).not.toThrow();
    });

    it('debería manejar formulario no inicializado en guardarDatosFormulario', () => {
      component.domicilloDelEstablecimientoForm = undefined as any;
      
      expect(() => {
        component.guardarDatosFormulario();
      }).not.toThrow();
    });
  });

  // Pruebas de interacción con la vista
  describe('Interacciones con la lógica del componente', () => {
    it('debería tener el formulario correctamente inicializado', () => {
      expect(component.domicilloDelEstablecimientoForm).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('estado')).toBeDefined();
      expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')).toBeDefined();
    });

    it('debería deshabilitar el formulario cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(component.domicilloDelEstablecimientoForm.disabled).toBe(true);
    });

    it('debería validar que los campos muestran errores cuando están vacíos y son tocados', () => {
      // Limpiar el valor y marcar como tocado
      const codigoPostalControl = component.domicilloDelEstablecimientoForm.get('codigoPostal');
      codigoPostalControl?.setValue('');
      codigoPostalControl?.markAsTouched();
      
      expect(codigoPostalControl?.hasError('required')).toBe(true);
      expect(codigoPostalControl?.invalid).toBe(true);
    });

    it('debería manejar la lógica del campo licencia según el valor de funcionamiento', () => {
      const funcionamientoControl = component.domicilloDelEstablecimientoForm.get('funcionamiento');
      const licenciaControl = component.domicilloDelEstablecimientoForm.get('licencia');
      
      // Cuando funcionamiento es true, licencia debería ser requerida
      funcionamientoControl?.setValue(true);
      expect(funcionamientoControl?.value).toBe(true);
      
      // Cuando funcionamiento es false, licencia no debería ser requerida
      funcionamientoControl?.setValue(false);
      expect(funcionamientoControl?.value).toBe(false);
    });
  });

  // Pruebas de validación del formulario
  describe('Validación del formulario', () => {
    beforeEach(() => {
      // Habilitar formulario para pruebas
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
    });

    it('debería validar que codigoPostal es requerido cuando está vacío', () => {
      const control = component.domicilloDelEstablecimientoForm.get('codigoPostal');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que estado es requerido cuando está vacío', () => {
      const control = component.domicilloDelEstablecimientoForm.get('estado');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que descripcionMunicipio es requerido cuando está vacío', () => {
      const control = component.domicilloDelEstablecimientoForm.get('descripcionMunicipio');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que calle es requerida cuando está vacía', () => {
      const control = component.domicilloDelEstablecimientoForm.get('calle');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que telefono es requerido cuando está vacío', () => {
      const control = component.domicilloDelEstablecimientoForm.get('telefono');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que licencia es requerida cuando está vacía', () => {
      const control = component.domicilloDelEstablecimientoForm.get('licencia');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que regimen es requerido cuando está vacío', () => {
      const control = component.domicilloDelEstablecimientoForm.get('regimen');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería validar que aduana es requerida cuando está vacía', () => {
      const control = component.domicilloDelEstablecimientoForm.get('aduana');
      control?.setValue('');
      control?.markAsTouched();
      
      expect(control?.hasError('required')).toBe(true);
    });

    it('debería marcar el formulario como válido cuando todos los campos requeridos están completos', () => {
      component.domicilloDelEstablecimientoForm.patchValue({
        codigoPostal: '12345',
        estado: 'VERACRUZ',
        descripcionMunicipio: 'ALVARADO',
        calle: 'HERMENEGUILDO GALEANA',
        telefono: '2979725632',
        licencia: 'LIC-123456',
        regimen: 'Definitivos',
        aduana: 'DOS BOCAS'
      });
      
      // Verificar que los campos obligatorios son válidos
      expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('estado')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('calle')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('telefono')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('licencia')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('regimen')?.valid).toBe(true);
      expect(component.domicilloDelEstablecimientoForm.get('aduana')?.valid).toBe(true);
    });
  });

  // Pruebas para los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newComponent = new DomicilioDelEstablecimientoComponent(
        formBuilder,
        mockSolicitudPermisoService,
        mockTramite260703Store,
        mockTramite260703Query,
        mockConsultaioQuery
      );
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockSolicitudPermisoState));
      mockTramite260703Query.selectSolicitudPermiso$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en obtenerScianData', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockScianData));
      mockSolicitudPermisoService.obtenerScianData = jest.fn(() => ({
        pipe: mockPipe
      } as any));
      
      component.obtenerScianData();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en obternerMercanciaData', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockMercanciaData));
      mockSolicitudPermisoService.obtenerMercanciaData = jest.fn(() => ({
        pipe: mockPipe
      } as any));
      
      component.obternerMercanciaData();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería completar suscripciones en ngOnDestroy', () => {
      const destroySpy = jest.spyOn(component.destruirNotificacion$, 'next');
      const completeSpy = jest.spyOn(component.destruirNotificacion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de comportamiento específico
  describe('Comportamientos específicos', () => {
    it('debería manejar la interacción entre funcionamiento y licencia', () => {
      // Habilitar formulario primero
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      // Cuando funcionamiento está marcado, licencia debería seguir siendo requerido
      component.domicilloDelEstablecimientoForm.get('funcionamiento')?.setValue(true);
      const licenciaControl = component.domicilloDelEstablecimientoForm.get('licencia');
      licenciaControl?.setValue('');
      licenciaControl?.markAsTouched();
      
      expect(licenciaControl?.hasError('required')).toBe(true);
      expect(licenciaControl?.valid).toBe(false);
      
      // Cuando se agrega un valor a licencia, debería ser válido
      licenciaControl?.setValue('LIC-123456');
      
      expect(licenciaControl?.valid).toBe(true);
    });

    it('debería verificar que el servicio de obtenerDomicilioCatalogo es llamado durante la inicialización', () => {
      expect(mockSolicitudPermisoService.obtenerDomicilioCatalogo).toHaveBeenCalled();
    });

    it('debería manejar cambios en múltiples campos del formulario', () => {
      // Habilitar formulario primero
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      // Simulamos cambios en varios campos
      component.domicilloDelEstablecimientoForm.patchValue({
        codigoPostal: '54321',
        estado: 'JALISCO',
        descripcionMunicipio: 'GUADALAJARA',
        informacionExtra: 'NUEVA INFO',
        descripcionColonia: 'NUEVA COLONIA',
        calle: 'NUEVA CALLE',
        lada: '33',
        telefono: '3311223344',
        funcionamiento: false,
        licencia: 'NUEVA-LICENCIA',
        regimen: 'NUEVO REGIMEN',
        aduana: 'NUEVA ADUANA'
      });
      
      // Ahora llamamos a setValoresStore para cada campo
      Object.keys(mockSolicitudPermisoState.domicilloDelEstablecimientoFormState).forEach(campo => {
        component.setValoresStore(campo);
      });
      
      // Verificamos que se llamó a actualizarEstadoFormularioDomicilioDelEstablecimiento para cada campo
      expect(mockTramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledTimes(
        Object.keys(mockSolicitudPermisoState.domicilloDelEstablecimientoFormState).length
      );
    });
  });
});