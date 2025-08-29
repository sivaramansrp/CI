import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DomicilioComponent } from './domicilio-establecimiento.component';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ElementRef } from '@angular/core';

/**
 * Suite de pruebas unitarias para el componente DomicilioComponent
 * Incluye pruebas para inicialización, formularios reactivos, validaciones y métodos principales
 */
describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let mockTramite260215Store: jest.Mocked<Tramite260215Store>;
  let mockTramite260215Query: jest.Mocked<Tramite260215Query>;
  let mockService: jest.Mocked<ServiciosPermisoSanitarioService>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    // Mock del store
    mockTramite260215Store = {
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setCantidadUMT: jest.fn(),
      setCantidadUMC: jest.fn(),
      setPresentacion: jest.fn(),
    } as any;

    // Mock del query
    mockTramite260215Query = {
      selectSolicitud$: of({
        codigoPostal: '12345',
        estado: 'CDMX',
        muncipio: 'Miguel Hidalgo',
        localidad: 'Polanco',
        colonia: 'Polanco I Sección',
        calle: 'Presidente Masaryk',
        lada: '55',
        telefono: '12345678',
        fraccionArancelaria: '12345678',
        cantidadUMT: '100.5',
        cantidadUMC: '200.25',
        presentacion: 'Presentación de prueba',
        avisoCheckbox: false,
        licenciaSanitaria: '',
        regimen: '',
        aduanasEntradas: ''
      }),
    } as any;

    // Mock del servicio
    mockService = {
      getObtenerEstadoList: jest.fn().mockReturnValue(of({
        data: [
          { id: '1', descripcion: 'CDMX', activo: true },
          { id: '2', descripcion: 'Jalisco', activo: true }
        ]
      })),
      getEstado: jest.fn().mockReturnValue(of([
        { id: '1', descripcion: 'CDMX', activo: true }
      ])),
      getObtenerTablaDatos: jest.fn().mockReturnValue(of({
        data: [
          { clave_Scian: '123456', descripcion_Scian: 'Descripción de prueba' }
        ]
      })),
      getObtenerMercanciasDatos: jest.fn().mockReturnValue(of({
        data: [
          { id: '1', descripcion: 'Mercancía de prueba', activo: true }
        ]
      }))
    } as any;

    // Mock del query de consulta
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DomicilioComponent
      ],
      providers: [
        FormBuilder,
        { provide: Tramite260215Store, useValue: mockTramite260215Store },
        { provide: Tramite260215Query, useValue: mockTramite260215Query },
        { provide: ServiciosPermisoSanitarioService, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar formularios en ngOnInit', () => {
    component.ngOnInit();
    expect(component.domicilio).toBeDefined();
    expect(component.formAgente).toBeDefined();
    expect(component.formMercancias).toBeDefined();
  });

  it('debería validar fracción arancelaria con 8 dígitos exactos', () => {
    component.ngOnInit();
    const fraccionControl = component.formMercancias.get('fraccionArancelaria');
    
    // Valor válido (8 dígitos)
    fraccionControl?.setValue('12345678');
    expect(fraccionControl?.valid).toBe(true);

    // Valor inválido (menos de 8 dígitos)
    fraccionControl?.setValue('1234567');
    expect(fraccionControl?.invalid).toBe(true);

    // Valor inválido (más de 8 dígitos)
    fraccionControl?.setValue('123456789');
    expect(fraccionControl?.invalid).toBe(true);

    // Valor inválido (contiene letras)
    fraccionControl?.setValue('1234567a');
    expect(fraccionControl?.invalid).toBe(true);
  });

  it('debería validar campos requeridos del formulario domicilio', () => {
    component.ngOnInit();
    const codigoPostalControl = component.domicilio.get('codigoPostal');
    const estadoControl = component.domicilio.get('estado');
    const calleControl = component.domicilio.get('calle');
    const telefonoControl = component.domicilio.get('telefono');

    // Establecer valores vacíos
    codigoPostalControl?.setValue('');
    estadoControl?.setValue('');
    calleControl?.setValue('');
    telefonoControl?.setValue('');

    expect(codigoPostalControl?.invalid).toBe(true);
    expect(estadoControl?.invalid).toBe(true);
    expect(calleControl?.invalid).toBe(true);
    expect(telefonoControl?.invalid).toBe(true);
  });

  it('debería validar patrones numéricos en código postal', () => {
    component.ngOnInit();
    const codigoPostalControl = component.domicilio.get('codigoPostal');
    
    // Valor válido (solo números)
    codigoPostalControl?.setValue('12345');
    expect(codigoPostalControl?.valid).toBe(true);

    // Valor inválido (contiene letras)
    codigoPostalControl?.setValue('123abc');
    expect(codigoPostalControl?.invalid).toBe(true);
  });

  it('debería ejecutar validador cantidadUMTValidator correctamente', () => {
    const validator = DomicilioComponent.cantidadUMTValidator();
    
    // Valor válido
    expect(validator({ value: '123.45' } as any)).toBeNull();
    
    // Valor inválido (formato)
    expect(validator({ value: 'abc.45' } as any)).toEqual({ invalidFormat: true });
    
    // Valor null
    expect(validator({ value: null } as any)).toBeNull();
    
    // Precisión excesiva en parte entera
    expect(validator({ value: '1234567890123.45' } as any)).toEqual({ maxPrecision: true });
    
    // Precisión excesiva en decimales
    expect(validator({ value: '123.123456' } as any)).toEqual({ maxPrecision: true });
  });

  it('debería ejecutar validador cantidadUMCValidator correctamente', () => {
    const validator = DomicilioComponent.cantidadUMCValidator();
    
    // Valor válido
    expect(validator({ value: '123.1234567890' } as any)).toBeNull();
    
    // Valor inválido (formato)
    expect(validator({ value: 'abc.45' } as any)).toEqual({ invalidFormat: true });
    
    // Valor null
    expect(validator({ value: null } as any)).toBeNull();
    
    // Precisión excesiva en decimales (más de 10)
    expect(validator({ value: '123.12345678901' } as any)).toEqual({ maxPrecision: true });
  });

  it('debería autocompletar campos cuando fracción arancelaria tenga 8 dígitos', () => {
    component.ngOnInit();
    const fraccionControl = component.formMercancias.get('fraccionArancelaria');
    const descripcionControl = component.formMercancias.get('descripcionFraccion');
    const umtControl = component.formMercancias.get('UMT');

    fraccionControl?.setValue('12345678');

    expect(descripcionControl?.value).toBe('Descripción automática de la fracción');
    expect(umtControl?.value).toBe('KG');
  });

  it('debería limpiar campos autocompletados cuando fracción arancelaria sea inválida', () => {
    component.ngOnInit();
    const fraccionControl = component.formMercancias.get('fraccionArancelaria');
    const descripcionControl = component.formMercancias.get('descripcionFraccion');
    const umtControl = component.formMercancias.get('UMT');

    // Valor inválido
    fraccionControl?.setValue('123');
    expect(descripcionControl?.value).toBe('');
    expect(umtControl?.value).toBe('');
  });

  it('debería alternar estado colapsable', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });

  it('debería manejar cambio de licencia sanitaria', () => {
    component.ngOnInit();
    const mockEvent = { target: { value: 'LIC123' } } as any;
    
    component.onLicenciaSanitariaChange(mockEvent);
    
    expect(component.domicilio.get('avisoCheckbox')?.value).toBe(false);
    expect(component.domicilio.get('avisoCheckbox')?.disabled).toBe(true);
  });

  it('debería habilitar checkbox cuando licencia sanitaria está vacía', () => {
    component.ngOnInit();
    const mockEvent = { target: { value: '' } } as any;
    
    component.onLicenciaSanitariaChange(mockEvent);
    
    expect(component.domicilio.get('avisoCheckbox')?.disabled).toBe(false);
  });

  it('debería manejar cambio de checkbox de aviso', () => {
    component.ngOnInit();
    const mockEvent = { target: { checked: true } } as any;
    
    component.onAvisoCheckboxChange(mockEvent);
    
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('debería agregar nueva fila cuando el formulario sea válido', () => {
    component.ngOnInit();
    component.nicoTablaDatos = [];
    component.formAgente.patchValue({
      claveScianModal: '345678',
      claveDescripcionModal: 'Nueva descripción'
    });

    component.agregarFila();

    expect(component.nicoTablaDatos.length).toBe(1);
    expect(component.nicoTablaDatos[0]).toEqual({
      clave_Scian: '345678',
      descripcion_Scian: 'Nueva descripción'
    });
  });

  it('no debería agregar fila cuando el formulario sea inválido', () => {
    component.ngOnInit();
    component.nicoTablaDatos = [];
    component.formAgente.patchValue({
      claveScianModal: '', // Campo requerido vacío
      claveDescripcionModal: 'Descripción'
    });

    component.agregarFila();

    expect(component.nicoTablaDatos.length).toBe(0);
  });

  it('debería eliminar elementos seleccionados', () => {
    component.nicoTablaDatos = [
      { clave_Scian: '123456', descripcion_Scian: 'Descripción 1' },
      { clave_Scian: '789012', descripcion_Scian: 'Descripción 2' }
    ];
    component.seleccionados = [
      { clave_Scian: '123456', descripcion_Scian: 'Descripción 1' }
    ];

    component.eliminarPedimento(true);

    expect(component.nicoTablaDatos.length).toBe(1);
    expect(component.nicoTablaDatos[0].clave_Scian).toBe('789012');
    expect(component.seleccionados.length).toBe(0);
  });

  it('debería actualizar seleccionados en onSeleccionChange', () => {
    const nuevosSeleccionados = [
      { clave_Scian: '123456', descripcion_Scian: 'Test' }
    ];

    component.onSeleccionChange(nuevosSeleccionados);

    expect(component.seleccionados).toEqual(nuevosSeleccionados);
  });

  it('debería obtener lista de estados del servicio', () => {
    component.obtenerEstadoList();

    expect(mockService.getObtenerEstadoList).toHaveBeenCalled();
  });

  it('debería marcar campos como tocados cuando el formulario es inválido en onAgregar', () => {
    component.ngOnInit();
    jest.spyOn(component.formMercancias, 'invalid', 'get').mockReturnValue(true);
    const markAllAsTouchedSpy = jest.spyOn(component.formMercancias, 'markAllAsTouched');

    component.onAgregar();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('debería cerrar modal cuando formulario es válido en onAgregar', () => {
    component.ngOnInit();
    jest.spyOn(component.formMercancias, 'invalid', 'get').mockReturnValue(false);
    
    const mockCloseModal = {
      nativeElement: { click: jest.fn() }
    };
    component.closeModal = mockCloseModal as any;

    component.onAgregar();

    expect(mockCloseModal.nativeElement.click).toHaveBeenCalled();
  });

  it('debería actualizar descripción cuando cambia la clave SCIAN', () => {
    component.ngOnInit();
    component.formAgente.patchValue({ claveScianModal: '123456' });

    component.onCambioClaveScian();

    expect(component.formAgente.get('claveDescripcionModal')?.value).toBe('123456');
  });

  it('debería llamar método del store en setValoresStore', () => {
    component.ngOnInit();
    const mockForm = component.domicilio;
    mockForm.patchValue({ codigoPostal: '54321' });

    component.setValoresStore(mockForm, 'codigoPostal', 'setCodigoPostal');

    expect(mockTramite260215Store.setCodigoPostal).toHaveBeenCalledWith('54321');
  });

  it('debería configurar notificación de eliminación correctamente', () => {
    component.seleccionados = [
      { clave_Scian: '123456', descripcion_Scian: 'Test' }
    ];

    component.eliminarFila();

    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.categoria).toBe('danger');
    expect(component.nuevaNotificacion.modo).toBe('action');
  });

  it('debería deshabilitar formulario cuando esFormularioSoloLectura es true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();

    expect(component.domicilio.disabled).toBe(true);
  });

  it('debería completar destroyNotifier$ en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
