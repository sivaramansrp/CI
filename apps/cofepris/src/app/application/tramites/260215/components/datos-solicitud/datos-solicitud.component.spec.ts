import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDeLaComponent } from './datos-solicitud.component';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { SolicitudModel } from '../../models/permiso-sanitario.model';
import { Solicitud260215State } from '../../estados/tramites/tramite260215.store';
import { Notificacion } from '@libs/shared/data-access-user/src';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;
  let formBuilder: FormBuilder;
  let tramite260215StoreMock: jest.Mocked<Tramite260215Store>;
  let tramite260215QueryMock: jest.Mocked<Tramite260215Query>;
  let consultaioQueryMock: jest.Mocked<ConsultaioQuery>;
  let serviciosPermisoSanitarioServiceMock: jest.Mocked<ServiciosPermisoSanitarioService>;

  const mockSolicitudState: Solicitud260215State = {
    rfcDel: 'RFC123456789',
    denominacion: 'Test Company',
    correo: 'test@example.com',
    claveDeReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llaveDePago: '',
    fechaPago: '',
    importePago: '',
    codigoPostal: '',
    estado: '',
    muncipio: '',
    localidad: '',
    colonia: '',
    calle: '',
    lada: '',
    telefono: '',
    claveScianModal: '',
    claveDescripcionModal: '',
    avisoCheckbox: false,
    licenciaSanitaria: '',
    regimen: '',
    aduanasEntradas: '',
    clasificacion: '',
    especificar: '',
    denominacionEspecifica: '',
    denominacionDistintiva: '',
    denominacionComun: '',
    tipoDeProducto: '',
    estadoFisico: '',
    fraccionArancelaria: '',
    descripcionFraccion: '',
    cantidadUMT: '',
    UMT: '',
    cantidadUMC: '',
    UMC: '',
    presentacion: '',
    numeroRegistro: '',
    fechaCaducidad: '',
    cumplimiento: '',
    rfc: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: ''
  };

  const mockSolicitudData: SolicitudModel[] = [
    {
      fechaCreacion: '2024-01-01',
      mercancía: 'Test Mercancía',
      cantidad: '100',
      proveedor: 'Test Proveedor'
    },
    {
      fechaCreacion: '2024-01-02',
      mercancía: 'Test Mercancía 2',
      cantidad: '200',
      proveedor: 'Test Proveedor 2'
    }
  ];

  beforeEach(async () => {
    const tramite260215StoreStub = {
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn()
    };

    const tramite260215QueryStub = {
      selectSolicitud$: of(mockSolicitudState)
    };

    const consultaioQueryStub = {
      selectConsultaioState$: of({
        readonly: false,
        procedureId: 1,
        parameter: 'param',
        department: 'COFEPRIS'
      })
    };

    const serviciosPermisoSanitarioServiceStub = {
      getSolicitudes: jest.fn().mockReturnValue(of(mockSolicitudData))
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260215Store, useValue: tramite260215StoreStub },
        { provide: Tramite260215Query, useValue: tramite260215QueryStub },
        { provide: ConsultaioQuery, useValue: consultaioQueryStub },
        { provide: ServiciosPermisoSanitarioService, useValue: serviciosPermisoSanitarioServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    tramite260215StoreMock = TestBed.inject(Tramite260215Store) as jest.Mocked<Tramite260215Store>;
    tramite260215QueryMock = TestBed.inject(Tramite260215Query) as jest.Mocked<Tramite260215Query>;
    consultaioQueryMock = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
    serviciosPermisoSanitarioServiceMock = TestBed.inject(ServiciosPermisoSanitarioService) as jest.Mocked<ServiciosPermisoSanitarioService>;
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  describe('Constructor', () => {
    it('debe inicializar destroyNotifier$ como Subject', () => {
      expect(component['destroyNotifier$']).toBeInstanceOf(Subject);
    });
  });

  describe('ngOnInit', () => {
    it('debe llamar a inicializarEstadoFormulario', () => {
      const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('inicializarEstadoFormulario', () => {
    it('debe llamar a guardarDatosFormulario cuando esFormularioSoloLectura es verdadero', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component, 'guardarDatosFormulario');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });

    it('debe llamar a inicializarFormulario y actualizarEstado cuando esFormularioSoloLectura es falso', () => {
      component.esFormularioSoloLectura = false;
      const initSpy = jest.spyOn(component, 'inicializarFormulario');
      const updateSpy = jest.spyOn(component, 'actualizarEstado');
      component.inicializarEstadoFormulario();
      expect(initSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalled();
    });
  });

  describe('actualizarEstado', () => {
    it('debe llamar a serviciosPermisoSanitarioService.getSolicitudes y actualizar solicitudData', () => {
      component.actualizarEstado();
      expect(serviciosPermisoSanitarioServiceMock.getSolicitudes).toHaveBeenCalled();
      expect(component.solicitudData).toEqual(mockSolicitudData);
    });
  });

  describe('inicializarFormulario', () => {
    beforeEach(() => {
      component.solicitudState = mockSolicitudState;
      component.inicializarFormulario();
    });

    it('debe crear el formulario con la estructura y validadores correctos', () => {
      expect(component.forma).toBeInstanceOf(FormGroup);
      expect(component.forma.get('rfcDel')).toBeTruthy();
      expect(component.forma.get('denominacion')).toBeTruthy();
      expect(component.forma.get('correo')).toBeTruthy();
    });

    it('debe establecer los valores del formulario desde solicitudState', () => {
      expect(component.forma.get('rfcDel')?.value).toBe(mockSolicitudState.rfcDel);
      expect(component.forma.get('denominacion')?.value).toBe(mockSolicitudState.denominacion);
      expect(component.forma.get('correo')?.value).toBe(mockSolicitudState.correo);
    });

    it('debe deshabilitar todos los controles del formulario inicialmente', () => {
      expect(component.forma.get('rfcDel')?.disabled).toBe(true);
      expect(component.forma.get('denominacion')?.disabled).toBe(true);
      expect(component.forma.get('correo')?.disabled).toBe(true);
    });
  });

  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      component.solicitudState = mockSolicitudState;
    });

    it('debe llamar a inicializarFormulario', () => {
      const spy = jest.spyOn(component, 'inicializarFormulario');
      component.guardarDatosFormulario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('mostrar_colapsable', () => {
    it('debe alternar la propiedad colapsable', () => {
      const initialValue = component.colapsable;
      component.mostrar_colapsable();
      expect(component.colapsable).toBe(!initialValue);
      component.mostrar_colapsable();
      expect(component.colapsable).toBe(initialValue);
    });
  });

  describe('abrirModal', () => {
    it('debe establecer nuevaNotificacion con las propiedades correctas', () => {
      const expectedNotification: Notificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      component.abrirModal();
      expect(component.nuevaNotificacion).toEqual(expectedNotification);
    });

    it('debe establecer elementoParaEliminar al índice proporcionado', () => {
      const testIndex = 5;
      component.abrirModal(testIndex);
      expect(component.elementoParaEliminar).toBe(testIndex);
    });

    it('debe establecer elementoParaEliminar en 0 si no se proporciona índice', () => {
      component.abrirModal();
      expect(component.elementoParaEliminar).toBe(0);
    });
  });

  describe('eliminarPedimento', () => {
    beforeEach(() => {
      component.pedimentos = [
        { nombre: 'Pedimento 1' } as any,
        { nombre: 'Pedimento 2' } as any,
        { nombre: 'Pedimento 3' } as any
      ];
      component.elementoParaEliminar = 1;
      component.solicitudState = mockSolicitudState;
      component.inicializarFormulario();
    });

    it('debe llamar a alternarControlesDeFormulario', () => {
      const spy = jest.spyOn(component, 'alternarControlesDeFormulario');
      component.eliminarPedimento(false);
      expect(spy).toHaveBeenCalled();
    });

    it('debe eliminar el pedimento cuando borrar es verdadero', () => {
      const initialLength = component.pedimentos.length;
      component.eliminarPedimento(true);
      expect(component.pedimentos).toHaveLength(initialLength - 1);
      expect(component.pedimentos[1]).toEqual({ nombre: 'Pedimento 3' });
    });

    it('no debe eliminar el pedimento cuando borrar es falso', () => {
      const initialLength = component.pedimentos.length;
      const initialPedimentos = [...component.pedimentos];
      component.eliminarPedimento(false);
      expect(component.pedimentos).toHaveLength(initialLength);
      expect(component.pedimentos).toEqual(initialPedimentos);
    });
  });

  describe('alternarControlesDeFormulario', () => {
    beforeEach(() => {
      component.solicitudState = mockSolicitudState;
      component.inicializarFormulario();
    });

    it('debe habilitar los controles deshabilitados', () => {
      expect(component.forma.get('rfcDel')?.disabled).toBe(true);
      expect(component.forma.get('denominacion')?.disabled).toBe(true);
      expect(component.forma.get('correo')?.disabled).toBe(true);
      component.alternarControlesDeFormulario();
      expect(component.forma.get('rfcDel')?.disabled).toBe(false);
      expect(component.forma.get('denominacion')?.disabled).toBe(false);
      expect(component.forma.get('correo')?.disabled).toBe(false);
    });

    it('no debe afectar los controles ya habilitados', () => {
      component.forma.enable();
      component.alternarControlesDeFormulario();
      expect(component.forma.get('rfcDel')?.disabled).toBe(false);
      expect(component.forma.get('denominacion')?.disabled).toBe(false);
      expect(component.forma.get('correo')?.disabled).toBe(false);
    });
  });

  describe('setValoresStore', () => {
    beforeEach(() => {
      component.solicitudState = mockSolicitudState;
      component.inicializarFormulario();
    });

    it('debe llamar al método del store con el valor del campo del formulario', () => {
      const testValue = 'TEST_RFC';
      component.forma.get('rfcDel')?.setValue(testValue);
      component.setValoresStore(component.forma, 'rfcDel', 'setRfcDel');
      expect(tramite260215StoreMock.setRfcDel).toHaveBeenCalledWith(testValue);
    });

    it('debe manejar diferentes tipos de campos', () => {
      component.forma.get('denominacion')?.setValue('Test Denomination');
      component.forma.get('correo')?.setValue('test@email.com');
      component.setValoresStore(component.forma, 'denominacion', 'setDenominacion');
      component.setValoresStore(component.forma, 'correo', 'setCorreo');
      expect(tramite260215StoreMock.setDenominacion).toHaveBeenCalledWith('Test Denomination');
      expect(tramite260215StoreMock.setCorreo).toHaveBeenCalledWith('test@email.com');
    });
  });

  describe('configuracionTablaSolicitud', () => {
    it('debe tener la estructura de configuración de tabla correcta', () => {
      expect(component.configuracionTablaSolicitud).toHaveLength(4);
      const config = component.configuracionTablaSolicitud;
      expect(config[0].encabezado).toBe('Fecha Creación');
      expect(config[1].encabezado).toBe('Mercancía');
      expect(config[2].encabezado).toBe('Cantidad');
      expect(config[3].encabezado).toBe('Proveedor');
    });

    it('debe extraer los valores correctos de SolicitudModel', () => {
      const testData: SolicitudModel = {
        fechaCreacion: '2024-12-01',
        mercancía: 'Test Item',
        cantidad: '50',
        proveedor: 'Test Provider'
      };
      const config = component.configuracionTablaSolicitud;
      expect(config[0].clave(testData)).toBe('2024-12-01');
      expect(config[1].clave(testData)).toBe('Test Item');
      expect(config[2].clave(testData)).toBe('50');
      expect(config[3].clave(testData)).toBe('Test Provider');
    });
  });

  describe('Propiedades del Componente', () => {
    it('debe inicializarse con los valores predeterminados correctos', () => {
      expect(component.colapsable).toBe(true);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.solicitudData).toEqual([]);
      expect(component.pedimentos).toEqual([]);
      expect(component.TEXTOS).toBeDefined();
    });
  });

  describe('ngOnDestroy', () => {
    it('debe completar el subject destroyNotifier$', () => {
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Pruebas de Integración', () => {
    it('debe manejar el flujo completo del formulario', () => {
      component.ngOnInit();
      expect(component.forma).toBeTruthy();
      expect(component.forma.get('rfcDel')?.value).toBe(mockSolicitudState.rfcDel);
      const initialColapsable = component.colapsable;
      component.mostrar_colapsable();
      expect(component.colapsable).toBe(!initialColapsable);
      expect(component.solicitudData).toEqual(mockSolicitudData);
    });
  });
});