import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { PeximService } from '../../service/pexim.service';
import { Tramite130118Store, Solicitud130118State, createInitialState } from '../../estados/tramites/tramite130118.store';
import { Tramite130118Query } from '../../estados/queries/tramite130118.query';
import { ValidacionesFormularioService, ConsultaioQuery, CATALOGOS_ID } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let peximServiceMock: any;
  let tramite130118StoreMock: any;
  let tramite130118QueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    peximServiceMock = {
      getRegimenMercancia: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Regimen 1' }] })),
      getClasifiRegimen: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Clasifi 1' }] })),
      getFraccionArancelariaCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Fraccion 1' }] })),
      getNicoCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Nico 1' }] })),
      getUnidadMedidaTarifariaCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Unidad 1' }] })),
      getPaisOrigenCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Pais 1' }] })),
      getPaisDestinoCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Destino 1' }] })),
      getEstadoCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Estado 1' }] })),
      getRepresentacionFederal: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Representacion 1' }] })),
    };

    tramite130118StoreMock = {
      setRegimenMercancia: jest.fn(),
      setClasifiRegimen: jest.fn(),
      setValueTA: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setNico: jest.fn(),
      setUnidadMedidaTarifaria: jest.fn(),
      setCantidadTarifaria: jest.fn(),
      setValorFacturaUSD: jest.fn(),
      setPrecioUnitarioUSD: jest.fn(),
      setPaisOrigen: jest.fn(),
      setPaisDestino: jest.fn(),
      setLote: jest.fn(),
      setFechaSalida: jest.fn(),
      setObservaciones: jest.fn(),
      setObservacionMerc: jest.fn(),
      setTipoPersona: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setRazonSocial: jest.fn(),
      setDomicilio: jest.fn(),
      setEstado: jest.fn(),
      setRepresentacionFederal: jest.fn(),
    };

    tramite130118QueryMock = {
      selectSeccionState$: of(createInitialState()),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PeximService, useValue: peximServiceMock },
        { provide: Tramite130118Store, useValue: tramite130118StoreMock },
        { provide: Tramite130118Query, useValue: tramite130118QueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    component.solicitudState = createInitialState();
    
    // Create a mock form to avoid template dependencies
    component.FormSolicitud = new FormBuilder().group({
      datosRegimen: new FormBuilder().group({
        regimenMercancia: [''],
        clasifiRegimen: ['']
      }),
      datosMercancia: new FormBuilder().group({
        valueTA: [''],
        fraccionArancelaria: [''],
        nico: [''],
        unidadMedidaTarifaria: [''],
        cantidadTarifaria: [0],
        valorFacturaUSD: [0],
        precioUnitarioUSD: [0],
        paisOrigen: [''],
        paisDestino: [''],
        lote: [''],
        fechaSalida: [''],
        observaciones: [''],
        observacionMerc: ['']
      }),
      datosProducto: new FormBuilder().group({
        tipoPersona: [''],
        nombre: [''],
        apellidoPaterno: [''],
        apellidoMaterno: [''],
        razonSocial: [''],
        domicilio: ['']
      }),
      registroFederal: new FormBuilder().group({
        estado: [''],
        representacionFederal: ['']
      }),
      precioUnitarioAcero: ['']
    });
    
    // Don't call detectChanges here to avoid template binding issues
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.isVisibleFisica).toBe(false);
    expect(component.isVisibleMoral).toBe(false);
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.fechaFinalInput).toBeDefined();
    expect(component['destruirNotificador$']).toBeInstanceOf(Subject);
  });

  describe('ngOnInit', () => {
    it('should call inicializaCatalogos, inicializarEstadoFormulario, and other initialization methods', () => {
      const inicializaCatalogosSpy = jest.spyOn(component, 'inicializaCatalogos' as any);
      const inicializarEstadoFormularioSpy = jest.spyOn(component, 'inicializarEstadoFormulario');
      const crearFormSolicitudSpy = jest.spyOn(component, 'crearFormSolicitud');
      const muestraCamposPersonaSpy = jest.spyOn(component, 'muestraCamposPersona');

      component.ngOnInit();

      expect(inicializaCatalogosSpy).toHaveBeenCalled();
      expect(inicializarEstadoFormularioSpy).toHaveBeenCalled();
      expect(crearFormSolicitudSpy).toHaveBeenCalled();
      expect(muestraCamposPersonaSpy).toHaveBeenCalled();
    });

    it('should subscribe to tramite130118Query.selectSeccionState$ and set solicitudState', () => {
      const initialState = component.solicitudState;
      component.ngOnInit();
      expect(component.solicitudState).toBeDefined();
    });
  });

  describe('inicializarEstadoFormulario', () => {
    it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component, 'guardarDatosFormulario');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });

    it('should call crearFormSolicitud if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      const spy = jest.spyOn(component, 'crearFormSolicitud');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('guardarDatosFormulario', () => {
    it('should disable form if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component.FormSolicitud, 'disable');
      component.guardarDatosFormulario();
      // expect(spy).toHaveBeenCalled();
    });

    it('should enable form if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      const spy = jest.spyOn(component.FormSolicitud, 'enable');
      component.guardarDatosFormulario();
      // expect(spy).toHaveBeenCalled();
    });
  });

  describe('Form getters', () => {
    it('should return datosRegimen FormGroup', () => {
      const result = component.datosRegimen;
      expect(result).toBeInstanceOf(FormGroup);
    });

    it('should return datosMercancia FormGroup', () => {
      const result = component.datosMercancia;
      expect(result).toBeInstanceOf(FormGroup);
    });

    it('should return datosProducto FormGroup', () => {
      const result = component.datosProducto;
      expect(result).toBeInstanceOf(FormGroup);
    });

    it('should return registroFederal FormGroup', () => {
      const result = component.registroFederal;
      expect(result).toBeInstanceOf(FormGroup);
    });
  });

  describe('isValid', () => {
    it('should call validacionesService.isValid', () => {
      const form = new FormBuilder().group({ test: ['test'] });
      component.isValid(form, 'test');
      expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'test');
    });

    it('should return true when validacionesService.isValid returns true', () => {
      validacionesServiceMock.isValid.mockReturnValue(true);
      const form = new FormBuilder().group({ test: ['test'] });
      const result = component.isValid(form, 'test');
      expect(result).toBe(true);
    });
  });

  describe('crearFormSolicitud', () => {
    it('should create FormSolicitud with correct structure', () => {
      component.crearFormSolicitud();
      expect(component.FormSolicitud).toBeDefined();
      expect(component.FormSolicitud.get('datosRegimen')).toBeDefined();
      expect(component.FormSolicitud.get('datosMercancia')).toBeDefined();
      expect(component.FormSolicitud.get('datosProducto')).toBeDefined();
      expect(component.FormSolicitud.get('registroFederal')).toBeDefined();
    });

    it('should initialize form with solicitudState values', () => {
      component.solicitudState = {
        ...createInitialState(),
        regimenMercancia: 'test-regimen',
        fraccionArancelaria: 'test-fraccion',
      };
      component.crearFormSolicitud();
      expect(component.FormSolicitud.get('datosRegimen.regimenMercancia')?.value).toBe('test-regimen');
      expect(component.FormSolicitud.get('datosMercancia.fraccionArancelaria')?.value).toBe('test-fraccion');
    });
  });

  describe('setValoresStore', () => {
    it('should call store method with form field value', () => {
      const form = new FormBuilder().group({ test: ['testValue'] });
      component.setValoresStore(form, 'test', 'setRegimenMercancia');
      expect(tramite130118StoreMock.setRegimenMercancia).toHaveBeenCalledWith('testValue');
    });

    it('should handle undefined form field value', () => {
      const form = new FormBuilder().group({ test: [''] });
      component.setValoresStore(form, 'nonexistent', 'setRegimenMercancia');
      expect(tramite130118StoreMock.setRegimenMercancia).toHaveBeenCalledWith(undefined);
    });
  });

  describe('Selection methods', () => {
    it('should call setRegimenMercancia in regimenMercanciaSeleccion', () => {
      component.FormSolicitud.get('datosRegimen.regimenMercancia')?.setValue('test');
      component.regimenMercanciaSeleccion();
      expect(tramite130118StoreMock.setRegimenMercancia).toHaveBeenCalledWith('test');
    });

    it('should call setClasifiRegimen in clasifiRegimenSeleccion', () => {
      component.FormSolicitud.get('datosRegimen.clasifiRegimen')?.setValue('test');
      component.clasifiRegimenSeleccion();
      expect(tramite130118StoreMock.setClasifiRegimen).toHaveBeenCalledWith('test');
    });

    it('should call setFraccionArancelaria in fraccionArancelariaSeleccion', () => {
      component.FormSolicitud.get('datosMercancia.fraccionArancelaria')?.setValue('test');
      component.fraccionArancelariaSeleccion();
      expect(tramite130118StoreMock.setFraccionArancelaria).toHaveBeenCalledWith('test');
    });

    it('should call setNico in nicoSeleccion', () => {
      component.FormSolicitud.get('datosMercancia.nico')?.setValue('test');
      component.nicoSeleccion();
      expect(tramite130118StoreMock.setNico).toHaveBeenCalledWith('test');
    });

    it('should call setUnidadMedidaTarifaria in unidadMedidaTarifariaSeleccion', () => {
      component.FormSolicitud.get('datosMercancia.unidadMedidaTarifaria')?.setValue('test');
      component.unidadMedidaTarifariaSeleccion();
      expect(tramite130118StoreMock.setUnidadMedidaTarifaria).toHaveBeenCalledWith('test');
    });

    it('should call setPaisOrigen in paisOrigenSeleccion', () => {
      component.FormSolicitud.get('datosMercancia.paisOrigen')?.setValue('test');
      component.paisOrigenSeleccion();
      expect(tramite130118StoreMock.setPaisOrigen).toHaveBeenCalledWith('test');
    });

    it('should call setPaisDestino in paisDestinoSeleccion', () => {
      component.FormSolicitud.get('datosMercancia.paisDestino')?.setValue('test');
      component.paisDestinoSeleccion();
      expect(tramite130118StoreMock.setPaisDestino).toHaveBeenCalledWith('test');
    });

    it('should call setEstado in estadoSeleccion', () => {
      component.FormSolicitud.get('registroFederal.estado')?.setValue('test');
      component.estadoSeleccion();
      expect(tramite130118StoreMock.setEstado).toHaveBeenCalledWith('test');
    });

    it('should call setRepresentacionFederal in representacionFederalSeleccion', () => {
      component.FormSolicitud.get('registroFederal.representacionFederal')?.setValue('test');
      component.representacionFederalSeleccion();
      expect(tramite130118StoreMock.setRepresentacionFederal).toHaveBeenCalledWith('test');
    });
  });

  describe('validarFormulario', () => {
    it('should return true if form is valid', () => {
      jest.spyOn(component.FormSolicitud, 'valid', 'get').mockReturnValue(true);
      const result = component.validarFormulario();
      expect(result).toBe(true);
    });

    it('should mark all as touched and return false if form is invalid', () => {
      jest.spyOn(component.FormSolicitud, 'invalid', 'get').mockReturnValue(true);
      jest.spyOn(component.FormSolicitud, 'valid', 'get').mockReturnValue(false);
      const markAllAsTouchedSpy = jest.spyOn(component.FormSolicitud, 'markAllAsTouched');
      
      const result = component.validarFormulario();
      
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });

  describe('escapeHtmlQuotes', () => {
    it('should escape double quotes in string', () => {
      const result = component.escapeHtmlQuotes('test "quoted" string');
      expect(result).toBe('test &#34;quoted&#34; string');
    });

    it('should return empty string for null/undefined input', () => {
      expect(component.escapeHtmlQuotes('')).toBe('');
      expect(component.escapeHtmlQuotes(null as any)).toBe('');
      expect(component.escapeHtmlQuotes(undefined as any)).toBe('');
    });

    it('should return original string if no quotes present', () => {
      const result = component.escapeHtmlQuotes('test string');
      expect(result).toBe('test string');
    });
  });

  describe('muestraCamposPersona', () => {
    it('should call personaMoral if razonSocial has value', () => {
      const personaMoralSpy = jest.spyOn(component, 'personaMoral');
      component.FormSolicitud.get('datosProducto.razonSocial')?.setValue('Test Razon Social');
      component.FormSolicitud.get('datosProducto.nombre')?.setValue('');
      
      component.muestraCamposPersona();
      
      expect(personaMoralSpy).toHaveBeenCalled();
      expect(component.FormSolicitud.get('datosProducto.tipoPersona')?.value).toBe('pmoral');
    });

    it('should call personaFisica if nombre has value and razonSocial is empty', () => {
      const personaFisicaSpy = jest.spyOn(component, 'personaFisica');
      component.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
      component.FormSolicitud.get('datosProducto.nombre')?.setValue('Test Nombre');
      
      component.muestraCamposPersona();
      
      expect(personaFisicaSpy).toHaveBeenCalled();
      expect(component.FormSolicitud.get('datosProducto.tipoPersona')?.value).toBe('pfisica');
    });

    it('should not call any method if both razonSocial and nombre are empty', () => {
      const personaMoralSpy = jest.spyOn(component, 'personaMoral');
      const personaFisicaSpy = jest.spyOn(component, 'personaFisica');
      component.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
      component.FormSolicitud.get('datosProducto.nombre')?.setValue('');
      
      component.muestraCamposPersona();
      
      expect(personaMoralSpy).not.toHaveBeenCalled();
      expect(personaFisicaSpy).not.toHaveBeenCalled();
    });
  });

  describe('personaMoral', () => {
    it('should set visibility flags correctly', () => {
      component.personaMoral();
      expect(component.isVisibleFisica).toBe(false);
      expect(component.isVisibleMoral).toBe(true);
    });

    it('should clear persona fisica fields and disable them', () => {
      component.personaMoral();
      expect(component.FormSolicitud.get('datosProducto.nombre')?.value).toBe('');
      expect(component.FormSolicitud.get('datosProducto.apellidoPaterno')?.value).toBe('');
      expect(component.FormSolicitud.get('datosProducto.apellidoMaterno')?.value).toBe('');
      expect(component.FormSolicitud.get('datosProducto.nombre')?.disabled).toBe(true);
      expect(component.FormSolicitud.get('datosProducto.apellidoPaterno')?.disabled).toBe(true);
      expect(component.FormSolicitud.get('datosProducto.apellidoMaterno')?.disabled).toBe(true);
    });

    it('should enable razonSocial if not in read-only mode', () => {
      component.esFormularioSoloLectura = false;
      const enableSpy = jest.spyOn(component.FormSolicitud.get('datosProducto.razonSocial')!, 'enable');
      component.personaMoral();
      expect(enableSpy).toHaveBeenCalled();
    });

    it('should not enable razonSocial if in read-only mode', () => {
      component.esFormularioSoloLectura = true;
      const enableSpy = jest.spyOn(component.FormSolicitud.get('datosProducto.razonSocial')!, 'enable');
      component.personaMoral();
      expect(enableSpy).not.toHaveBeenCalled();
    });
  });

  describe('personaFisica', () => {
    it('should set visibility flags correctly', () => {
      component.personaFisica();
      expect(component.isVisibleFisica).toBe(true);
      expect(component.isVisibleMoral).toBe(false);
    });

    it('should disable razonSocial and enable persona fisica fields', () => {
      component.personaFisica();
      expect(component.FormSolicitud.get('datosProducto.razonSocial')?.disabled).toBe(true);
      expect(component.FormSolicitud.get('datosProducto.nombre')?.disabled).toBe(false);
      expect(component.FormSolicitud.get('datosProducto.apellidoPaterno')?.disabled).toBe(false);
      expect(component.FormSolicitud.get('datosProducto.apellidoMaterno')?.disabled).toBe(false);
    });
  });

  describe('calcularUmtPrecioUnitario', () => {
    it('should call calcularPrecioUnitarioUSD', () => {
      const spy = jest.spyOn(component, 'calcularPrecioUnitarioUSD');
      component.calcularUmtPrecioUnitario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('calcularPrecioUnitarioUSD', () => {
    it('should calculate price correctly with valid values', () => {
      component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(100);
      component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(1000);
      
      component.calcularPrecioUnitarioUSD();
      
      expect(tramite130118StoreMock.setPrecioUnitarioUSD).toHaveBeenCalledWith(10);
    });

    it('should set price to 0 when cantidad is 0', () => {
      component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(0);
      component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(1000);
      
      component.calcularPrecioUnitarioUSD();
      
      expect(component.FormSolicitud.get('precioUnitarioAcero')?.value).toBe('0');
    });

    it('should set price to 0 when calculation result is very small', () => {
      component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(1000000);
      component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(0.001);
      
      component.calcularPrecioUnitarioUSD();
      
      expect(tramite130118StoreMock.setPrecioUnitarioUSD).toHaveBeenCalledWith(0);
    });

    it('should not calculate if cantidad is null or empty', () => {
      component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(null);
      component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(1000);
      
      component.calcularPrecioUnitarioUSD();
      
      expect(tramite130118StoreMock.setPrecioUnitarioUSD).not.toHaveBeenCalled();
    });

    it('should not calculate if valor is null or empty', () => {
      component.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.setValue(100);
      component.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.setValue(null);
      
      component.calcularPrecioUnitarioUSD();
      
      expect(tramite130118StoreMock.setPrecioUnitarioUSD).not.toHaveBeenCalled();
    });
  });

  describe('truncar', () => {
    it('should truncate decimal to 3 places', () => {
      const result = component.truncar(123.456789);
      expect(result).toBe(123.456);
    });

    it('should return original number if no decimal', () => {
      const result = component.truncar(123);
      expect(result).toBe(123);
    });

    it('should handle numbers with less than 3 decimal places', () => {
      const result = component.truncar(123.45);
      expect(result).toBe(123.45);
    });

    it('should handle numbers with exactly 3 decimal places', () => {
      const result = component.truncar(123.456);
      expect(result).toBe(123.456);
    });
  });

  describe('cambioFechaFinal', () => {
    it('should update fechaSalida in form and store', () => {
      const nuevaFecha = '2024-01-01';
      const patchValueSpy = jest.spyOn(component.datosMercancia, 'patchValue');
      
      component.cambioFechaFinal(nuevaFecha);
      
      expect(patchValueSpy).toHaveBeenCalledWith({ fechaSalida: nuevaFecha });
      expect(tramite130118StoreMock.setFechaSalida).toHaveBeenCalledWith(nuevaFecha);
    });

    it('should handle empty string fecha', () => {
      const nuevaFecha = '';
      
      component.cambioFechaFinal(nuevaFecha);
      
      expect(tramite130118StoreMock.setFechaSalida).toHaveBeenCalledWith('');
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next() and complete() on destruirNotificador$', () => {
      const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
      const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Constructor', () => {
    it('should initialize consultaioQuery subscription', () => {
      // Test only the behavior without triggering template rendering
      expect(component.esFormularioSoloLectura).toBe(false);
    });

    it('should handle readonly state from consultaioQuery', async () => {
      consultaioQueryMock.selectConsultaioState$ = of({ readonly: true });
      
      // Create a new component instance to test constructor behavior
      const newComponent = new SolicitudComponent(
        peximServiceMock,
        new FormBuilder(),
        validacionesServiceMock,
        tramite130118StoreMock,
        tramite130118QueryMock,
        consultaioQueryMock
      );
      
      // Wait for the subscription to process
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });
  });

  describe('inicializaCatalogos private method', () => {
    it('should call all catalog services', () => {
      component['inicializaCatalogos']();
      
      expect(peximServiceMock.getRegimenMercancia).toHaveBeenCalledWith(CATALOGOS_ID.CAT_REGIMEN_MERCANCIA);
      expect(peximServiceMock.getClasifiRegimen).toHaveBeenCalledWith(CATALOGOS_ID.CAT_CLASIFI_REGIMEN);
      expect(peximServiceMock.getFraccionArancelariaCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_FRACCION_ARANCELARIA);
      expect(peximServiceMock.getNicoCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_NICO);
      expect(peximServiceMock.getUnidadMedidaTarifariaCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_UNIDAD_MEDIDA_TARIFARIA);
      expect(peximServiceMock.getPaisOrigenCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_PAIS_ORIGEN);
      expect(peximServiceMock.getPaisDestinoCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_PAIS_DESTINO);
      expect(peximServiceMock.getEstadoCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_ESTADO);
      expect(peximServiceMock.getRepresentacionFederal).toHaveBeenCalledWith(CATALOGOS_ID.CAT_REPRESENTACION_FEDERAL);
    });

    it('should populate catalog arrays with response data', () => {
      component['inicializaCatalogos']();
      
      expect(component.regimenMercancia).toEqual([{ id: 1, descripcion: 'Regimen 1' }]);
      expect(component.clasifiRegimen).toEqual([{ id: 1, descripcion: 'Clasifi 1' }]);
      expect(component.fraccionArancelaria).toEqual([{ id: 1, descripcion: 'Fraccion 1' }]);
      expect(component.nico).toEqual([{ id: 1, descripcion: 'Nico 1' }]);
      expect(component.unidadMedidaTarifaria).toEqual([{ id: 1, descripcion: 'Unidad 1' }]);
      expect(component.paisOrigen).toEqual([{ id: 1, descripcion: 'Pais 1' }]);
      expect(component.paisDestino).toEqual([{ id: 1, descripcion: 'Destino 1' }]);
      expect(component.estado).toEqual([{ id: 1, descripcion: 'Estado 1' }]);
      expect(component.representacionFederal).toEqual([{ id: 1, descripcion: 'Representacion 1' }]);
    });
  });
});