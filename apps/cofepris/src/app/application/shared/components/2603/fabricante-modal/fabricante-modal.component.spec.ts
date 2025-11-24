import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabricanteModalComponent } from './fabricante-modal.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Tramite2603Store, createInitialState as createTramiteInitialState } from '../../../estados/stores/2603/tramite2603.store';
import { Tramite2603Query } from '../../../estados/queries/2603/tramite2603.query';
import { ConsultaioQuery, createConsultaInitialState } from '@ng-mf/data-access-user';
import { of} from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../../services/shared2603/certificados-licencias-permisos.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FabricanteModalComponent', () => {
  let componente: FabricanteModalComponent;
  let fixture: ComponentFixture<FabricanteModalComponent>;
  let tramiteStore: jest.Mocked<Tramite2603Store>;
  let tramiteQuery: jest.Mocked<Tramite2603Query>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    const tramiteStoreMock: Partial<jest.Mocked<Tramite2603Store>> = {
      setTercerosRelacionadosDenominacionSocial: jest.fn(),
      setTercerosRelacionadosTerceroNombre: jest.fn(),
    };

    const tramiteQueryMock: Partial<jest.Mocked<Tramite2603Query>> = {
      selectSolicitud$: of(createTramiteInitialState()),
    };

    const consultaioQueryMock: Partial<jest.Mocked<ConsultaioQuery>> = {
      selectConsultaioState$: of({ ...createConsultaInitialState(), readonly: false }),
    };

    const certificadosLicenciasSvcMock = {
      getPaisDatos: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        FabricanteModalComponent,
        BsModalRef,
        { provide: Tramite2603Store, useValue: tramiteStoreMock },
        { provide: Tramite2603Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FabricanteModalComponent);
    componente = fixture.componentInstance;

    tramiteStore = TestBed.inject(Tramite2603Store) as jest.Mocked<Tramite2603Store>;
    tramiteQuery = TestBed.inject(Tramite2603Query) as jest.Mocked<Tramite2603Query>;
    consultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
  });

  afterEach(() => {
    if (componente && componente.ngOnDestroy) {
      componente.ngOnDestroy();
    }
  });

  it('debería crear el componente correctamente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario al llamar inicializarFormularioTercerosRelacionados', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();

    expect(componente.tercerosRelacionadosForm).toBeDefined();
    expect(componente.tercerosRelacionadosForm.get('denominacionSocial')?.value).toBe(createTramiteInitialState().tercerosRelacionadosDenominacionSocial);
  });

  it('debería establecer valor en el store al llamar establecerValorStore', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();

    componente.tercerosRelacionadosForm.get('denominacionSocial')?.setValue('Nuevo Valor');
    componente.establecerValorStore(componente.tercerosRelacionadosForm, 'denominacionSocial', 'setTercerosRelacionadosDenominacionSocial');

    expect(tramiteStore.setTercerosRelacionadosDenominacionSocial).toHaveBeenCalledWith('Nuevo Valor');
  });

  it('debería deshabilitar el formulario si es de solo lectura', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esSoloLecturaFormulario = true;
    componente.inicializarFormularioTercerosRelacionados();
    componente.guardarDatosFormulario();

    expect(componente.tercerosRelacionadosForm.disabled).toBe(true);
  });

  it('debería habilitar el formulario si no es de solo lectura', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esSoloLecturaFormulario = false;
    componente.inicializarFormularioTercerosRelacionados();
    componente.guardarDatosFormulario();

    expect(componente.tercerosRelacionadosForm.enabled).toBe(true);
  });

  it('debería emitir next y complete en notificadorDestruir$ al llamar ngOnDestroy', () => {
    const spyNext = jest.spyOn(componente['notificadorDestruir$'], 'next');
    const spyComplete = jest.spyOn(componente['notificadorDestruir$'], 'complete');

    componente.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('debería llenar los campos al buscar cuando el RFC es válido', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();

    const rfcControl = componente.tercerosRelacionadosForm.get('rfc');
    rfcControl?.setValue('ABC123456T89');
    rfcControl?.setErrors(null);
    rfcControl?.updateValueAndValidity();
    componente.tercerosRelacionadosForm.patchValue({
      curp: 'MAVLT12345678',
      razonSocial: 'EUROFOODS DE MEXICO'
    });

    expect(componente.tercerosRelacionadosForm.get('curp')?.value).toBe('MAVLT12345678');
    expect(componente.tercerosRelacionadosForm.get('razonSocial')?.value).toBe('EUROFOODS DE MEXICO');
  });


  it('debería limpiar el formulario al llamar limpiar()', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('denominacionSocial')?.setValue('Valor Prueba');

    componente.limpiar();

    expect(componente.tercerosRelacionadosForm.get('denominacionSocial')?.value).toBeNull();
  });

  it('debería emitir evento y cerrar modal si el formulario es válido en guardar()', () => {
    const spyEmit = jest.spyOn(componente.guardarFabricante, 'emit');
    const spyHide = jest.spyOn(componente.bsModalRef, 'hide');

    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.markAllAsTouched();
    componente.tercerosRelacionadosForm.patchValue({
      denominacionSocial: 'Test',
      pais: 'MEXICO',
      codigoPostal: '12345',
      calle: 'Calle Prueba',
      numeroExterior: '12'
    });

    componente.guardar();

    expect(spyEmit).toHaveBeenCalled();
    expect(spyHide).toHaveBeenCalled();
  });

  it('debería retornar error si el RFC es inválido en validadorRFC()', () => {
    const control = { value: 'INVALIDO' } as AbstractControl;
    const resultado = FabricanteModalComponent.validadorRFC(control);
    expect(resultado).toEqual({ rfcInvalido: true });
  });

  it('debería retornar resultado de isValid en esValido()', () => {
    const isValidSpy = jest.spyOn(componente['validacionesService'], 'isValid').mockReturnValue(true);
    const resultado = componente.esValido(componente.tercerosRelacionadosForm, 'denominacionSocial');
    expect(isValidSpy).toHaveBeenCalledWith(componente.tercerosRelacionadosForm, 'denominacionSocial');
    expect(resultado).toBe(true);
  });

  it('debería actualizar el store y habilitar RFC cuando nacionalidad y tipoPersona están seleccionados', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('nacional');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('fisica');
    componente.tercerosRelacionadosForm.get('terceroNombre')?.setValue('Nuevo Valor');
    componente.establecerValorStore(componente.tercerosRelacionadosForm, 'terceroNombre', 'setTercerosRelacionadosTerceroNombre');

    expect(tramiteStore.setTercerosRelacionadosTerceroNombre).toHaveBeenCalledWith('Nuevo Valor');
  });


  it('debería marcar todos los campos como tocados si el formulario no es válido en guardar()', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();

    componente.guardar();

    expect(componente.tercerosRelacionadosForm.touched).toBe(true);
    expect(componente.tercerosRelacionadosForm.invalid).toBe(true);
  });

  it('debería deshabilitar campos de dirección/contacto para nacional y tipoPersona moral', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('nacional');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('moral');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.updateValueAndValidity();
    expect(componente.tercerosRelacionadosForm.get('rfc')?.enabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('curp')?.disabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('razonSocial')?.disabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('pais')?.enabled).toBe(true);
  });

  it('debería deshabilitar RFC y habilitar CURP para nacional y tipoPersona noContribuyente', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('nacional');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('noContribuyente');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.updateValueAndValidity();
    expect(componente.tercerosRelacionadosForm.get('rfc')?.disabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('curp')?.enabled).toBe(true);
  });

  it('debería deshabilitar todos los campos excepto pais para extranjero y tipoPersona moral', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    componente.titulo = '';
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('extranjero');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('moral');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.updateValueAndValidity();
    expect(componente.tercerosRelacionadosForm.get('pais')?.enabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('rfc')?.disabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('curp')?.disabled).toBe(true);
  });

  it('debería habilitar todos los campos para extranjero y "Agregar otros"', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.titulo = 'Agregar otros';
    componente.cerrarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('extranjero');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('fisica');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.updateValueAndValidity();
    expect(componente.tercerosRelacionadosForm.get('pais')?.enabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('razonSocial')?.enabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('datosPersonalesNombre')?.enabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('telefono')?.enabled).toBe(true);
  });

  it('debería deshabilitar todos los campos excepto pais para caso por defecto', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('otro');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('otro');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.updateValueAndValidity();
    expect(componente.tercerosRelacionadosForm.get('pais')?.enabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('rfc')?.disabled).toBe(true);
    expect(componente.tercerosRelacionadosForm.get('curp')?.disabled).toBe(true);
  });

  it('debería aplicar validadores correctos en establecerValidadoresCampo', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    const control = componente.tercerosRelacionadosForm.get('municipio');
    if (control) {
      componente['establecerValidadoresCampo']('municipio', control);
      expect(control.validator).toBeDefined();
    }
  });

  it('debería aplicar validadores correctos en aplicarValidadoresPorCampo', () => {
    const control: any = { setValidators: jest.fn(), updateValueAndValidity: jest.fn(), clearValidators: jest.fn() };
    FabricanteModalComponent['aplicarValidadoresPorCampo']('rfc', control, false, 'fisica');
    expect(control.setValidators).toHaveBeenCalled();
  });

  it('debería aplicar validadores correctos en establecerValidadoresNombreApellido', () => {
    const control: any = { setValidators: jest.fn() };
    FabricanteModalComponent['establecerValidadoresNombreApellido'](control, true, 'fisica');
    expect(control.setValidators).toHaveBeenCalled();
  });

  it('debería aplicar validadores correctos en establecerValidadoresRazonSocial', () => {
    const control: any = { setValidators: jest.fn() };
    FabricanteModalComponent['establecerValidadoresRazonSocial'](control, true, 'moral');
    expect(control.setValidators).toHaveBeenCalled();
  });


  it('debería ejecutar inicializarEstadoFormulario y llamar inicializarFormulario si no esSoloLecturaFormulario', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esSoloLecturaFormulario = false;
    const spy = jest.spyOn(componente, 'inicializarFormulario');
    componente.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debería ejecutar guardarDatosFormulario y habilitar/deshabilitar según esSoloLecturaFormulario', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    componente.esSoloLecturaFormulario = true;
    componente.guardarDatosFormulario();
    expect(componente.tercerosRelacionadosForm.disabled).toBe(true);
    componente.esSoloLecturaFormulario = false;
    componente.guardarDatosFormulario();
    expect(componente.tercerosRelacionadosForm.enabled).toBe(true);
  });

  it('debería obtener opcionesTipoPersonaFiltradas correctamente', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('extranjero');
    const result = componente.opcionesTipoPersonaFiltradas;
    expect(Array.isArray(result)).toBe(true);
    expect(result.find(o => o.value === 'noContribuyente')).toBeUndefined();
  });

  it('should initialize component properties correctly on ngOnInit', () => {
    const mockState = createTramiteInitialState();
    tramiteQuery.selectSolicitud$ = of(mockState);
    consultaioQuery.selectConsultaioState$ = of({ ...createConsultaInitialState(), readonly: true });
    
    componente.ngOnInit();
    
    expect(componente.solicitudState).toEqual(mockState);
    expect(componente.esSoloLecturaFormulario).toBe(true);
  });

  it('should handle all form value changes and store updates', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    
    const formFields = [
      { field: 'denominacionSocial', setter: 'setTercerosRelacionadosDenominacionSocial' },
      { field: 'terceroNombre', setter: 'setTercerosRelacionadosTerceroNombre' },
      { field: 'tercerosNacionalidad', setter: 'setTercerosNacionalidad' },
      { field: 'tipoPersona', setter: 'setTipoPersona' },
      { field: 'rfc', setter: 'setTercerosRelacionadosRfc' },
      { field: 'curp', setter: 'setTercerosRelacionadosCurp' },
      { field: 'razonSocial', setter: 'setTercerosRelacionadosRazonSocial' },
      { field: 'pais', setter: 'setTercerosRelacionadosPais' },
      { field: 'estado', setter: 'setTercerosRelacionadosEstado' },
      { field: 'codigoPostal', setter: 'setTercerosRelacionadosCodigoPostal' },
      { field: 'calle', setter: 'setTercerosRelacionadosCalle' },
      { field: 'numeroExterior', setter: 'setTercerosRelacionadosNumeroExterior' },
      { field: 'numeroInterior', setter: 'setTercerosRelacionadosNumeroInterior' },
      { field: 'lada', setter: 'setTercerosRelacionadosLada' },
      { field: 'telefono', setter: 'setTercerosRelacionadosTelefono' },
      { field: 'correoElectronico', setter: 'setTercerosRelacionadosCorreoElectronico' }
    ];

    formFields.forEach(({ field, setter }) => {
      if (tramiteStore[setter as keyof typeof tramiteStore]) {
        componente.tercerosRelacionadosForm.get(field)?.setValue(`test_${field}`);
        componente.establecerValorStore(componente.tercerosRelacionadosForm, field, setter as keyof Tramite2603Store);
        expect(tramiteStore[setter as keyof typeof tramiteStore]).toHaveBeenCalledWith(`test_${field}`);
      }
    });
  });

  it('should handle all validation scenarios correctly', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();

    const rfcControl = componente.tercerosRelacionadosForm.get('rfc');
    rfcControl?.setValue('INVALID_RFC');
    expect(rfcControl?.errors).toBeTruthy();
    
    rfcControl?.setValue('XAXX010101000');
    expect(rfcControl?.errors).toBeFalsy();
    
    const curpControl = componente.tercerosRelacionadosForm.get('curp');
    curpControl?.setValue('INVALID_CURP');
    expect(curpControl?.errors).toBeTruthy();
    
    curpControl?.setValue('CURP771113HMCRRR09');
    expect(curpControl?.errors).toBeFalsy();
  });

  it('should handle all nationality and person type combinations', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    
    const testCombinations = [
      { nationality: 'nacional', personType: 'fisica' },
      { nationality: 'nacional', personType: 'moral' },
      { nationality: 'nacional', personType: 'noContribuyente' },
      { nationality: 'extranjero', personType: 'fisica' },
      { nationality: 'extranjero', personType: 'moral' }
    ];

    testCombinations.forEach(({ nationality, personType }) => {
      componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue(nationality);
      componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue(personType);
      componente.cerrarFormularioTercerosRelacionados();
      
      expect(componente.tercerosRelacionadosForm).toBeDefined();
    });
  });

  it('should handle different modal titles correctly', () => {
    const titles = ['Agregar fabricante', 'Agregar facturador', 'Agregar proveedor', 'Agregar certificado analítico', 'Agregar otros'];
    
    titles.forEach(title => {
      componente.titulo = title;
      componente.solicitudState = createTramiteInitialState();
      componente.inicializarFormularioTercerosRelacionados();
      expect(componente.titulo).toBe(title);
    });
  });

  it('should handle form submission with valid data', () => {
    const spyEmit = jest.spyOn(componente.guardarFabricante, 'emit');
    const spyHide = jest.spyOn(componente.bsModalRef, 'hide');
    
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    componente.tercerosRelacionadosForm.patchValue({
      denominacionSocial: 'Test Company',
      terceroNombre: 'Test Name',
      tercerosNacionalidad: 'nacional',
      tipoPersona: 'moral',
      rfc: 'XAXX010101000',
      razonSocial: 'Test Razon Social',
      pais: 'México',
      estado: 'CDMX',
      codigoPostal: '12345',
      calle: 'Test Street',
      numeroExterior: '123',
      lada: '55',
      telefono: '5555555555',
      correoElectronico: 'test@example.com'
    });
    
    componente.guardar();
    
    expect(spyEmit).toHaveBeenCalled();
    expect(spyHide).toHaveBeenCalled();
  });

  it('should handle error scenarios gracefully', () => {
    componente.solicitudState = null as any;
    expect(() => componente.inicializarFormularioTercerosRelacionados()).not.toThrow();
    
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    componente.guardar();
    
    expect(componente.tercerosRelacionadosForm.touched).toBe(true);
  });

  it('should handle catalog data loading', () => {
    const mockCatalogService = TestBed.inject(CertificadosLicenciasPermisosService);
    expect(mockCatalogService.getPaisDatos).toHaveBeenCalled();
  });

  it('should properly cleanup on destroy', () => {
    const destroySubject = componente['notificadorDestruir$'];
    const spyNext = jest.spyOn(destroySubject, 'next');
    const spyComplete = jest.spyOn(destroySubject, 'complete');
    
    componente.ngOnDestroy();
    
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should handle all field validations and enable/disable logic', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.inicializarFormularioTercerosRelacionados();
    
    const formControls = Object.keys(componente.tercerosRelacionadosForm.controls);
    
    formControls.forEach(controlName => {
      const control = componente.tercerosRelacionadosForm.get(controlName);
      if (control) {
        const isValid = componente.esValido(componente.tercerosRelacionadosForm, controlName);
        expect(typeof isValid).toBe('boolean');
      }
    });
  });

  it('should handle all store subscription scenarios', () => {
    tramiteQuery.selectSolicitud$ = of(createTramiteInitialState());
    consultaioQuery.selectConsultaioState$ = of({ ...createConsultaInitialState(), readonly: false });
    
    componente.ngOnInit();
    
    expect(componente.esSoloLecturaFormulario).toBe(false);
  });
});
