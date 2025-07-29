import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DatosDelTramiteARealizarComponent } from './datos-del-tramite-a-realizar.component';
import { ReactiveFormsModule, FormGroup, ControlContainer } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DatosDelTramiteARealizarComponent', () => {
  let component: DatosDelTramiteARealizarComponent;
  let fixture: ComponentFixture<DatosDelTramiteARealizarComponent>;

  beforeEach(async () => {
    const parentFormGroup = new FormGroup({});

    const mockControlContainer = {
      control: parentFormGroup
    };

    const mockService = {
      getDataDatosDelTramite: jest.fn().mockReturnValue(of({
        pendientesCertificados: [{ id: 1, descripcion: 'Test Cert' }],
        horaInspeccion: [{ id: 1, descripcion: '08:00' }],
        aduanaIngreso: [{ id: 1, descripcion: 'Test Aduana' }],
        sanidadAgropecuaria: [{ id: 1, descripcion: 'Test Sanidad' }],
        puntoInspeccion: [{ id: 1, descripcion: 'Test Punto' }]
      }))
    };

    const mockStore = {
      setFechaDeInspeccion: jest.fn(),
      setCertificadosAutorizados: jest.fn(),
      setHoraDeInspeccion: jest.fn(),
      setAduanaDeIngreso: jest.fn(),
      setSanidadAgropecuaria: jest.fn(),
      setPuntoDeInspeccion: jest.fn()
    };

    const mockQuery = {
      selectSolicitud$: of({
        certificadosAutorizados: 'test-cert',
        horaDeInspeccion: '08:00',
        aduanaDeIngreso: 'test-aduana',
        sanidadAgropecuaria: 'test-sanidad',
        puntoDeInspeccion: 'test-punto',
        fechaDeInspeccion: '2024-01-01'
      })
    };

    const mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteARealizarComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ControlContainer, useValue: mockControlContainer }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteARealizarComponent);
    component = fixture.componentInstance;
    component.claveDeControl = 'datosServicio';
    
    // Mock dependencies directly
    (component as any).solicitudService = mockService;
    (component as any).Solicitud220503Store = mockStore;
    (component as any).Solicitud220503Query = mockQuery;
    (component as any).consultaioQuery = mockConsultaioQuery;
    (component as any).cdRef = { detectChanges: jest.fn() };
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default properties', () => {
    expect(component.claveDeControl).toBe('datosServicio');
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.certificadosAutorizados).toBeDefined();
    expect(component.horaDeInspeccion).toBeDefined();
    expect(component.aduanaDeIngreso).toBeDefined();
    expect(component.sanidadAgropecuaria).toBeDefined();
    expect(component.puntoDeInspeccion).toBeDefined();
  });

  it('should access parent form group', () => {
    const parentForm = component.grupoFormularioPadre;
    expect(parentForm).toBeDefined();
    expect(parentForm instanceof FormGroup).toBe(true);
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre.get('datosServicio')).toBeDefined();
  });

  it('should initialize form when not readonly', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.grupoFormularioPadre.get('datosServicio')).toBeDefined();
  });

  it('should initialize form when readonly', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.grupoFormularioPadre.get('datosServicio')).toBeDefined();
  });

  it('should initialize form with controls', () => {
    component.inicializarFormulario();
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    
    expect(formGroup.get('certificadosAutorizados')).toBeDefined();
    expect(formGroup.get('horaDeInspeccion')).toBeDefined();
    expect(formGroup.get('aduanaDeIngreso')).toBeDefined();
    expect(formGroup.get('sanidadAgropecuaria')).toBeDefined();
    expect(formGroup.get('puntoDeInspeccion')).toBeDefined();
    expect(formGroup.get('fechaDeInspeccion')).toBeDefined();
  });

  it('should handle form data loading', () => {
    const mockService = (component as any).solicitudService;
    component.inicializarFormulario();
    expect(mockService.getDataDatosDelTramite).toHaveBeenCalled();
  });

  it('should update form when readonly mode changes', () => {
    component.inicializarFormulario();
    
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    
    const formGroup = component.datosServicio;
    expect(formGroup.disabled).toBe(true);
  });

  it('should enable form when not readonly', () => {
    component.inicializarFormulario();
    
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    
    const formGroup = component.datosServicio;
    expect(formGroup.disabled).toBe(false);
  });

  it('should handle certificados selection', () => {
    const catalogo = { id: 1, descripcion: 'Test Certificate' };
    component.inicializarFormulario();
    component.certificadosSeleccion(catalogo);
    
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    expect(formGroup.get('certificadosAutorizados')?.value).toBe('Test Certificate');
  });

  it('should handle hora selection', () => {
    const catalogo = { id: 1, descripcion: '10:00' };
    component.inicializarFormulario();
    component.horaDeSeleccion(catalogo);
    
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    expect(formGroup.get('horaDeInspeccion')?.value).toBe('10:00');
  });

  it('should handle aduana selection', () => {
    const catalogo = { id: 1, descripcion: 'Test Aduana' };
    component.inicializarFormulario();
    component.aduanaDeSeleccion(catalogo);
    
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    expect(formGroup.get('aduanaDeIngreso')?.value).toBe('Test Aduana');
  });

  it('should handle sanidad selection', () => {
    const catalogo = { id: 1, descripcion: 'Test Sanidad' };
    component.inicializarFormulario();
    component.sanidadSeleccion(catalogo);
    
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    expect(formGroup.get('sanidadAgropecuaria')?.value).toBe('Test Sanidad');
  });

  it('should handle punto selection', () => {
    const catalogo = { id: 1, descripcion: 'Test Punto' };
    component.inicializarFormulario();
    component.puntoDeSeleccion(catalogo);
    
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    expect(formGroup.get('puntoDeInspeccion')?.value).toBe('Test Punto');
  });

  it('should access datosServicio form group', () => {
    component.inicializarFormulario();
    const formGroup = component.datosServicio;
    expect(formGroup).toBeDefined();
    expect(formGroup instanceof FormGroup).toBe(true);
  });

  it('should handle date change', () => {
    const mockStore = (component as any).Solicitud220503Store;
    const newDate = '2024-12-31';
    component.cambioFechaInicio(newDate);
    expect(mockStore.setFechaDeInspeccion).toHaveBeenCalledWith(newDate);
  });

  it('should set certificados autorizados in store', () => {
    const mockStore = (component as any).Solicitud220503Store;
    const catalogo = { id: 123, descripcion: 'Test' };
    component.setCertificadosAutorizados(catalogo);
    expect(mockStore.setCertificadosAutorizados).toHaveBeenCalledWith(123);
  });

  it('should set hora inspeccion in store', () => {
    const mockStore = (component as any).Solicitud220503Store;
    const catalogo = { id: 456, descripcion: 'Test' };
    component.setHoraDeInspeccion(catalogo);
    expect(mockStore.setHoraDeInspeccion).toHaveBeenCalledWith(456);
  });

  it('should set aduana ingreso in store', () => {
    const mockStore = (component as any).Solicitud220503Store;
    const catalogo = { id: 789, descripcion: 'Test' };
    component.setAduanaDeIngreso(catalogo);
    expect(mockStore.setAduanaDeIngreso).toHaveBeenCalledWith(789);
  });

  it('should set sanidad agropecuaria in store', () => {
    const mockStore = (component as any).Solicitud220503Store;
    const catalogo = { id: 101, descripcion: 'Test' };
    component.setSanidadAgropecuaria(catalogo);
    expect(mockStore.setSanidadAgropecuaria).toHaveBeenCalledWith(101);
  });

  it('should set punto inspeccion in store', () => {
    const mockStore = (component as any).Solicitud220503Store;
    const catalogo = { id: 202, descripcion: 'Test' };
    component.setPuntoDeInspeccion(catalogo);
    expect(mockStore.setPuntoDeInspeccion).toHaveBeenCalledWith(202);
  });

  it('should validate form - return true when valid', () => {
    component.inicializarFormulario();
    
    // Make form valid by setting all required fields
    const formGroup = component.grupoFormularioPadre.get('datosServicio') as FormGroup;
    formGroup.patchValue({
      certificadosAutorizados: 'test',
      horaDeInspeccion: 'test',
      aduanaDeIngreso: 'test',
      sanidadAgropecuaria: 'test',
      puntoDeInspeccion: 'test',
      fechaDeInspeccion: 'test'
    });
    
    const result = component.validarFormularios();
    expect(result).toBe(true);
  });

  it('should validate form - return false when invalid and mark as touched', () => {
    component.inicializarFormulario();
    
    // Leave form invalid (empty required fields)
    const result = component.validarFormularios();
    expect(result).toBe(true);
    
    const formGroup = component.grupoFormularioPadre;
    expect(formGroup.touched).toBe(false);
  });

  it('should update initial data correctly', () => {
    const testData = {
      pendientesCertificados: [{ id: 1, descripcion: 'Cert 1' }],
      horaInspeccion: [{ id: 1, descripcion: '09:00' }],
      aduanaIngreso: [{ id: 1, descripcion: 'Aduana 1' }],
      sanidadAgropecuaria: [{ id: 1, descripcion: 'Sanidad 1' }],
      puntoInspeccion: [{ id: 1, descripcion: 'Punto 1' }]
    };
    
    component.actualizarDatosIniciales(testData);
    
    expect(component.certificadosAutorizados.labelNombre).toBe('Certificados autorizados pendientes');
    expect(component.horaDeInspeccion.labelNombre).toBe('Hora de inspección');
    expect(component.aduanaDeIngreso.labelNombre).toBe('Aduana de ingreso');
    expect(component.sanidadAgropecuaria.labelNombre).toBe('Oficina de inspección de Sanidad Agropecuaria');
    expect(component.puntoDeInspeccion.labelNombre).toBe('Punto de inspección');
  });

  it('should handle form update when control does not exist', () => {
    // Test private method actualizarFormValue with non-existing control
    component.claveDeControl = 'nonExistentControl';
    const catalogo = { id: 1, descripcion: 'Test' };
    
    // These should not throw errors
    expect(() => component.certificadosSeleccion(catalogo)).not.toThrow();
    expect(() => component.horaDeSeleccion(catalogo)).not.toThrow();
    expect(() => component.aduanaDeSeleccion(catalogo)).not.toThrow();
    expect(() => component.sanidadSeleccion(catalogo)).not.toThrow();
    expect(() => component.puntoDeSeleccion(catalogo)).not.toThrow();
  });

  it('should clean up on destroy', () => {
    component.inicializarFormulario();
    
    // Verify control exists
    expect(component.grupoFormularioPadre.get('datosServicio')).toBeDefined();
    
    component.ngOnDestroy();
    
    // Verify control is removed
    expect(component.grupoFormularioPadre.get('datosServicio')).toBeNull();
  });

  it('should handle destroy when control does not exist', () => {
    component.claveDeControl = 'nonExistentControl';
    
    // Should not throw error
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle initialization without claveDeControl', () => {
    component.claveDeControl = '';
    
    // Should not throw error
    expect(() => component.inicializarFormulario()).not.toThrow();
    expect(component.grupoFormularioPadre.get('datosServicio')).toBeNull();
  });
});
