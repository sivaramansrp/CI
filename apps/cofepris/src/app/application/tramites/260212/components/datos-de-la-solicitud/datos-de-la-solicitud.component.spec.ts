import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock dependencies
const mockSolicitudService = {
  getSolicitudes: jest.fn().mockReturnValue(of([])),
  getClave: jest.fn().mockReturnValue(of([])),
  getOpcionesPublicacion: jest.fn().mockReturnValue(of([])), // <-- Add this mock
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.fomInitialize();
    expect(component.datosEstablecimientoForm).toBeDefined();
    expect(component.datosEstablecimientoForm.get('denominacionRazonSocial')).toBeDefined();
  });

  it('should toggle plegable state', () => {
    const prev = component.plegable;
    component.mostrarPlegable();
    expect(component.plegable).toBe(!prev);
    component.mostrarPlegable();
    expect(component.plegable).toBe(prev);
  });

  it('should show and hide formularioScian', () => {
    component.toggleScianFormulario();
    expect(component.mostrarFormularioScian).toBe(true);
    component.cerrarScianFormulario();
    expect(component.mostrarFormularioScian).toBe(false);
  });

  it('should show and hide formularioMercancias', () => {
    component.openMercanciasForm();
    expect(component.mostrarFormularioMercancias).toBe(true);
    component.closeMercanciasForm();
    expect(component.mostrarFormularioMercancias).toBe(false);
  });

  it('should initialize table configs', () => {
    expect(component.configuracionTablaScian.length).toBeGreaterThan(0);
    expect(component.mercanciasTabla.length).toBeGreaterThan(0);
    expect(component.configuracionTablaSolicitud.length).toBeGreaterThan(0);
    // Check that the table config functions work
    const claveItem = { clave: 'A', descripcíon: 'B' };
    expect(component.configuracionTablaScian[0].clave(claveItem)).toBe('A');
    expect(component.configuracionTablaScian[1].clave(claveItem)).toBe('B');
  });

  it('should not throw if guardarDatosFormulario called before form initialized', () => {
    component.datosEstablecimientoForm = undefined as any;
    expect(() => component.guardarDatosFormulario()).not.toThrow();
  });

  it('should not throw if inicializarEstadoFormulario called before form initialized', () => {
    component.datosEstablecimientoForm = undefined as any;
    component.esFormularioSoloLectura = true;
    expect(() => component.inicializarEstadoFormulario()).not.toThrow();
  });

  it('should handle actualizarEstado with null/empty values', () => {
    component.fomInitialize();
    // Set up spies for form controls
    const setValueSpy = jest.spyOn(component.datosEstablecimientoForm.get('estado')!, 'setValue');
    // Simulate observables emitting null/undefined
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

  it('should call all update methods without error', () => {
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

  it('should call getEstado and getMunicipios without error', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('estado')?.setValue('Estado');
    component.datosEstablecimientoForm.get('municipio')?.setValue('Mun');
    expect(() => component.getEstado()).not.toThrow();
    expect(() => component.getMunicipios()).not.toThrow();
  });

  it('should call setSelectedEstado on getEstado', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('estado')?.setValue('EstadoNuevo');
    component.getEstado();
    expect(mockTramite260212Store.setSelectedEstado).toHaveBeenCalledWith('EstadoNuevo');
  });

  it('should call setSelectedEstado on getMunicipios', () => {
    component.fomInitialize();
    component.datosEstablecimientoForm.get('municipio')?.setValue('MunNuevo');
    component.getMunicipios();
    expect(mockTramite260212Store.setSelectedEstado).toHaveBeenCalledWith('MunNuevo');
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

  it('should call actualizarEstado in inicializarEstadoFormulario when not readonly', () => {
    component.fomInitialize();
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'actualizarEstado');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario in inicializarEstadoFormulario when readonly', () => {
    component.fomInitialize();
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroy$, 'next');
    const spy2 = jest.spyOn((component as any).destroy$, 'complete');
    const spy3 = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
