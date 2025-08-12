import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

jest.mock('bootstrap', () => {
  return {
    Modal: Object.assign(
      jest.fn().mockImplementation(() => ({
        show: jest.fn(),
        hide: jest.fn(),
      })),
      {
        getInstance: jest.fn(),
      }
    ),
  };
});


// Mock dependencies
const mockSolicitudService = {
  getSolicitudes: jest.fn().mockReturnValue(of([])),
  getClave: jest.fn().mockReturnValue(of([])),
  getOpcionesPublicacion: jest.fn().mockReturnValue(of([])),
  getClasificacionProducto: jest.fn().mockReturnValue(of([])),
  getTestadoFisico: jest.fn().mockReturnValue(of([])),
  getScianDatos: jest.fn().mockReturnValue(of([])),
  updateSeleccionarEstablecimientoState: jest.fn(),
  getSeleccionarEstablecimientoState: jest.fn(),
};
const mockTramite260212Store = {
  setSelectedEstado: jest.fn(),
  setRfcDelResponsableSanitario: jest.fn(),
  setDenominacionRazonSocial: jest.fn(),
  setCorreoElectronico: jest.fn(),
  setMunicipio: jest.fn(),
  setLocalidad: jest.fn(),
  setColonia: jest.fn(),
  setCalle: jest.fn(),
  setLada: jest.fn(),
  setTelefono: jest.fn(),
  setCodigoPostal: jest.fn(),
};
const mockTramite260212Query = {
  selectedEstado$: of('EstadoTest'),
  selectedRfcDelResponsableSanitario$: of('RFC123'),
  selectedDenominacionRazonSocial$: of('EmpresaTest'),
  selectedCorreoElectronico$: of('test@email.com'),
  selectedMunicipio$: of('MunicipioTest'),
  selectedLocalidad$: of('LocalidadTest'),
  selectedColonia$: of('ColoniaTest'),
  selectedCalle$: of('CalleTest'),
  selectedLada$: of('55'),
  SelectedTelefono$: of('1234567890'),
  SelectedCodigoPostal$: of('12345'),
};
const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false }),
};

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatosDeLaSolicitudComponent,
        HttpClientTestingModule // <-- Add this import to provide _HttpClient
      ],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: SolicitudService, useValue: mockSolicitudService },
        { provide: 'Tramite260212Store', useValue: mockTramite260212Store },
        { provide: 'Tramite260212Query', useValue: mockTramite260212Query },
        { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario', () => {
    component.fomInitialize();
    expect(component.datosEstablecimientoForm).toBeDefined();
    expect(component.datosEstablecimientoForm.get('denominacionRazonSocial')).toBeDefined();
  });

  it('debe alternar el estado plegable', () => {
    const prev = component.plegable;
    component.mostrarPlegable();
    expect(component.plegable).toBe(!prev);
    component.mostrarPlegable();
    expect(component.plegable).toBe(prev);
  });

  it('should initialize table configs', () => {
    expect(component.configuracionTablaScian.length).toBeGreaterThan(0);
    expect(component.mercanciasTabla.length).toBeGreaterThan(0);
    expect(component.configuracionTablaSolicitud.length).toBeGreaterThan(0);
    // Check that the table config functions work
    const claveItem = { clave: 'A', descripcion: 'B' };
    expect(component.configuracionTablaScian[0].clave(claveItem)).toBe('A');
    expect(component.configuracionTablaScian[1].clave(claveItem)).toBe('B');
  });

  it('no debe lanzar error si guardarDatosFormulario se llama antes de inicializar el formulario', () => {
    component.datosEstablecimientoForm = undefined as any;
    expect(() => component.guardarDatosFormulario()).not.toThrow();
  });

  it('no debe lanzar error si inicializarEstadoFormulario se llama antes de inicializar el formulario', () => {
    component.datosEstablecimientoForm = undefined as any;
    component.esFormularioSoloLectura = true;
    expect(() => component.inicializarEstadoFormulario()).not.toThrow();
  });

  it('debe manejar actualizarEstado con valores nulos/vacíos', () => {
    component.fomInitialize();
    // Configura espías para los controles del formulario
    const setValueSpy = jest.spyOn(component.datosEstablecimientoForm.get('estado')!, 'setValue');
    // Simula observables que emiten null/undefined
    (component as any).selectedEstado$ = of(null);
    (component as any).rfcDelResponsableSanitario$ = of(null);
    (component as any).denominacionRazonSocial$ = of(undefined);
    (component as any).correoElectronico$ = of('');
    (component as any).municipio$ = of(undefined);
    (component as any).localidad$ = of('');
    (component as any).colonia$ = of(undefined);
    (component as any).calle$ = of('');
    (component as any).lada$ = of(undefined);
    (component as any).telefono$ = of('');
    (component as any).codigoPostal$ = of(undefined);
    expect(() => component.actualizarEstado()).not.toThrow();
    expect(setValueSpy).not.toHaveBeenCalledWith(undefined);
  });

  it('debe llamar a todos los métodos de actualización sin error', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('rfcDelResponsableSanitario')?.setValue('RFC');
    component.datosEstablecimientoForm.get('denominacionRazonSocial')?.setValue('Denom');
    component.datosEstablecimientoForm.get('correoElectronico')?.setValue('mail@mail.com');
    component.datosEstablecimientoForm.get('municipio')?.setValue('Mun');
    component.datosEstablecimientoForm.get('localidad')?.setValue('Loc');
    component.datosEstablecimientoForm.get('colonia')?.setValue('Col');
    component.datosEstablecimientoForm.get('calle')?.setValue('Calle');
    component.datosEstablecimientoForm.get('lada')?.setValue('123');
    component.datosEstablecimientoForm.get('telefono')?.setValue('555');
    component.datosEstablecimientoForm.get('codigoPostal')?.setValue('99999');
    expect(() => component.updateRfcDelResponsableSanitario()).not.toThrow();
    expect(() => component.updateDenominacionRazonSocial()).not.toThrow();
    expect(() => component.updateCorreoElectronico()).not.toThrow();
    expect(() => component.updateMunicipio()).not.toThrow();
    expect(() => component.updateLocalidad()).not.toThrow();
    expect(() => component.updateColonia()).not.toThrow();
    expect(() => component.updateCalle()).not.toThrow();
    expect(() => component.updateLada()).not.toThrow();
    expect(() => component.updateTelefono()).not.toThrow();
    expect(() => component.updateCodigoPostal()).not.toThrow();
  });

  it('debe llamar a getEstado y getMunicipios sin error', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('estado')?.setValue('Estado');
    component.datosEstablecimientoForm.get('municipio')?.setValue('Mun');
    expect(() => component.getEstado()).not.toThrow();
    expect(() => component.getMunicipios()).not.toThrow();
  });

  it('should disable/enable form in guardarDatosFormulario', () => {
    component.fomInitialize();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.datosEstablecimientoForm.disabled).toBe(true);

    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.datosEstablecimientoForm.enabled).toBe(true);
  });

  it('debe llamar a actualizarEstado en inicializarEstadoFormulario cuando no es solo lectura', () => {
    component.fomInitialize();
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'actualizarEstado');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar a guardarDatosFormulario en inicializarEstadoFormulario cuando es solo lectura', () => {
    component.fomInitialize();
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe limpiar al destruir el componente (ngOnDestroy)', () => {
    const spy = jest.spyOn((component as any).destroy$, 'next');
    const spy2 = jest.spyOn((component as any).destroy$, 'complete');
    
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('debe agregar una clave Scian al arreglo', () => {
    const form = { clave: '001', descripcion: 'Prueba' };
    component.agregarScian(form);
    expect(component.claveScianDatas).toContainEqual(form);
  });

  it('debe ocultar el modal Scian cuando se llama cerrarScianFormulario', () => {
    const hideSpy = jest.fn();
    component['modalInstance'] = { hide: hideSpy } as any;
    component.cerrarScianFormulario();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('debe ocultar el modal de mercancías al llamar closeMercanciasForm', () => {
    const hideSpy = jest.fn();
    component['modalMercanciasInstance'] = { hide: hideSpy } as any;
    component.closeMercanciasForm();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('debe obtener opciones de solicitud y asignarlas a losDatos', () => {
    const mockOpciones = [{ id: 1, nombre: 'Opción 1' }];
    mockSolicitudService.getOpcionesPublicacion.mockReturnValueOnce(of(mockOpciones));

    component.obtenerOpcionesSolicitud();
    expect(component.losDatos).toEqual(mockOpciones);
  });

  it('should not delete anything if seleccionadaScianDatos is empty', () => {
  component.seleccionadaScianDatos = [];
  component.claveScianDatas = [
    { clave: '001', descripcion: 'Item 1' },
    { clave: '002', descripcion: 'Item 2' }
  ];
  const mockHide = jest.fn();
  (component as any).modalInstance = { hide: mockHide } as any;
  component.confirmarEliminarScian();
  expect(component.claveScianDatas.length).toBe(2);
  expect(mockHide).toHaveBeenCalled();
});


  it('should delete selected scian entries and hide modal', () => {
  const mockHide = jest.fn();
  component.seleccionadaScianDatos = [
    { clave: '001', descripcion: 'Item 1' },
    { clave: '002', descripcion: 'Item 2' }
  ];
  component.claveScianDatas = [
    { clave: '001', descripcion: 'Item 1' },
    { clave: '002', descripcion: 'Item 2' },
    { clave: '003', descripcion: 'Item 3' }
  ];
  (component as any).modalInstance = { hide: mockHide } as any;
  component.confirmarEliminarScian();
  expect(component.claveScianDatas).toEqual([{ clave: '003', descripcion: 'Item 3' }]);
  expect(mockHide).toHaveBeenCalled();
});


  it('should not throw if modalInstance is undefined when closing Scian form', () => {
    component['modalInstance'] = undefined as any;
    expect(() => component.cerrarScianFormulario()).not.toThrow();
  });

  it('should not throw if modalMercanciasInstance is undefined when closing Mercancias form', () => {
    component['modalMercanciasInstance'] = undefined as any;
    expect(() => component.closeMercanciasForm()).not.toThrow();
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('denominacionRazonSocial')?.setValue('');
    component.datosEstablecimientoForm.get('correoElectronico')?.setValue('');
    expect(component.datosEstablecimientoForm.valid).toBe(false);
  });

  it('should call getOpcionesPublicacion on init', () => {
    const spy = jest.spyOn(mockSolicitudService, 'getOpcionesPublicacion');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should patch form with values from selected observables in actualizarEstado', () => {
    component.fomInitialize();
    component.actualizarEstado();
    expect(component.datosEstablecimientoForm.get('estado')?.value).toBe('');
    expect(component.datosEstablecimientoForm.get('rfcDelResponsableSanitario')?.value).toBe('');
    expect(component.datosEstablecimientoForm.get('denominacionRazonSocial')?.value).toBe('');
  });

  it('should reset form when fomInitialize is called multiple times', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('correoElectronico')?.setValue('test@test.com');
    component.fomInitialize();
    expect(component.datosEstablecimientoForm.get('correoElectronico')?.value).toBe('');
  });

  it('should hide modal and enable form controls, then call service method', () => {
    const mockHide = jest.fn();
    const mockElement = { nativeElement: {} };
    component.modalElement = mockElement as ElementRef;
    (Modal.getInstance as jest.Mock).mockReturnValue({ hide: mockHide });
    component.datosEstablecimientoForm = new FormGroup({
      nombre: new FormControl({ value: '', disabled: true }),
      direccion: new FormControl({ value: '', disabled: true }),
    });
    const mockService = {
      updateSeleccionarEstablecimientoState: jest.fn(),
    };
    (component as any).solicitudService = mockService;
    component.aceptar();
    expect(mockHide).toHaveBeenCalled();
    expect(component.datosEstablecimientoForm.get('nombre')?.enabled).toBe(true);
    expect(component.datosEstablecimientoForm.get('direccion')?.enabled).toBe(true);
    expect(mockService.updateSeleccionarEstablecimientoState).toHaveBeenCalled();
  });

  it('should return seleccionarEstablecimientoState from service', () => {
    jest.spyOn((component as any).solicitudService, 'getSeleccionarEstablecimientoState').mockReturnValue(true);
    expect(component.seleccionarEstablecimientoState).toBe(true);
  });

  it('should add a MercanciaModel to mercanicaData', () => {
    component.mercanicaData = [];
    const testForm = { nombre: 'Merc 1' } as any;
    component.agregarMercanciasTabla({ form: testForm });
    expect(component.mercanicaData.length).toBe(1);
    expect(component.mercanicaData[0]).toEqual(testForm);
  });

  it('should show Establecimiento modal if modalElement is defined', () => {
    const mockElement = { nativeElement: document.createElement('div') };
    component.modalElement = mockElement as ElementRef;
    component.seleccionarEstablecimiento();
    expect(Modal).toHaveBeenCalledWith(mockElement.nativeElement);
  });

  it('should initialize and show Mercancias modal if modalMercanciasRef is defined', () => {
    const mockShow = jest.fn();
    const mockNativeElement = {};
    component.modalMercanciasRef = {
      nativeElement: mockNativeElement,
    } as ElementRef;

    const modalInstance = { show: mockShow };
    const mockModalConstructor = jest
      .spyOn(bootstrap, 'Modal')
      .mockImplementation(() => modalInstance as unknown as bootstrap.Modal);
      
    component.openMercanciasForm();
    expect(mockShow).toHaveBeenCalled();
    mockModalConstructor.mockRestore();
  });

  it('should initialize and show SCIAN modal if modalScianRef is defined', () => {
    const mockShow = jest.fn();
    (Modal as unknown as jest.Mock).mockImplementation(() => ({
      show: mockShow,
    }));
    component.modalScianRef = {
      nativeElement: {},
    } as ElementRef;
    component.toggleScianFormulario();
    expect(mockShow).toHaveBeenCalled();
  });

  it('should update seleccionadaMercanciaDatos', () => {
    const testData = [{ nombre: 'Mercancia A' }] as any;
    component.listaDeFilaSeleccionadaMercancias(testData);
    expect(component.seleccionadaMercanciaDatos).toEqual(testData);
  });

  it('should update seleccionadaScianDatos', () => {
    const testData = [{ clave: '001' }] as any;
    component.listaDeFilaSeleccionadaScian(testData);
    expect(component.seleccionadaScianDatos).toEqual(testData);
  });

  it('should call openMercanciasForm if seleccionadaMercanciaDatos has items', () => {
    const openSpy = jest.spyOn(component, 'openMercanciasForm');
    component.seleccionadaMercanciaDatos = [{ nombre: 'Mercancia 1' } as any];
    component.eliminarMercancias('delete');
    expect(openSpy).toHaveBeenCalled();
  });

  it('should set tipoButton and open modal if seleccionadaMercanciaDatos is empty', () => {
    component.seleccionadaMercanciaDatos = [];
    component.mercanciasConfirmacionModalElement = {
      nativeElement: document.createElement('div'),
    } as ElementRef;
    component.eliminarMercancias('delete');
    expect(component.tipoButton).toBe('delete');
    expect((component as any)['modalInstance']?.show).toHaveBeenCalled();
  });


});
