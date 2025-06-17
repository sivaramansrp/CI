import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let consultaServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerTablaScian: jest.fn().mockReturnValue(of([])),
      obtenerTablaMercancias: jest.fn().mockReturnValue(of([])),
      obtenerDatosEstado: jest.fn().mockReturnValue(of([])),
      obtenerDatosClave: jest.fn().mockReturnValue(of([])),
      obtenerTablaListaClave: jest.fn().mockReturnValue(of([])),
      getDescripcionScian: jest.fn().mockReturnValue(of({ data: [{ descripcion: 'desc' }] })),
    };
    tramiteStoreMock = {
      setDescripcionScian: jest.fn(),
      setClaveScian: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setClaveDeLosLotes: jest.fn(),
      addMercanciasDatos: jest.fn(),
      setNombreRazon: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setJustificacion: jest.fn(),
      setEstablecimiento: jest.fn(),
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setTipoOperacion: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setScian: jest.fn(),
      setScianDatos: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setImmex: jest.fn(),
      setAno: jest.fn(),
      setMercancia: jest.fn(),
      setClasificacionProducto: jest.fn(),
      setEspecificarClasificacionProducto: jest.fn(),
      setDenominacionProducto: jest.fn(),
      setMarca: jest.fn(),
      setTipoProducto: jest.fn(),
      setEspecifique: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setDescripcionFraccionArancelaria: jest.fn(),
      setCantidadUMT: jest.fn(),
      setUMT: jest.fn(),
      setCantidadUMC: jest.fn(),
      setUMC: jest.fn(),
      setClaveLote: jest.fn(),
      setListaClave: jest.fn(),
      setManfestosYDeclaraciones: jest.fn(),
      setHacerlosPublicos: jest.fn(),
      setRFC: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setCadenaDependecia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setImporteDePago: jest.fn(),
      setDestinatario: jest.fn(),
      setFabricante: jest.fn(),
      setTipoPersona: jest.fn(),
      setNombre: jest.fn(),
      setPrimerApellido: jest.fn(),
      setSegundoApellido: jest.fn(),
      setDenominacion: jest.fn(),
      setPais: jest.fn(),
      setEstados: jest.fn(),
      setCodigoDeZip: jest.fn(),
      setCamino: jest.fn(),
      setNumeroExterior: jest.fn(),
      setNumeroInterior: jest.fn(),
      setLadaDeTerceros: jest.fn(),
      setFon: jest.fn(),
      setEmail: jest.fn(),
      setFechaPago: jest.fn(),
    };
    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: tramiteStoreMock },
        { provide: Tramite260704Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: 'ConsultaioQuery', useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.solicitudState = {
      mercanciasDatos: [],
      destinatarioDatos: [],
      tipoOperacion: '',
      justificacion: '',
      establecimiento: '',
      razonSocial: '',
      correoElectronico: '',
      codigoPostal: '',
      estado: '',
      municipio: '',
      localidad: '',
      colonia: '',
      calle: '',
      lada: '',
      telefono: '',
      scian: false,
      scianDatos: false,
      claveScian: '',
      descripcionScian: '',
      avisoDeFuncionamiento: false,
      licenciaSanitaria: '',
      regimen: '',
      aduana: '',
      immex: '',
      ano: '',
      mercancia: '',
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      denominacionProducto: '',
      marca: '',
      tipoProducto: '',
      especifique: '',
      fraccionArancelaria: '',
      descripcionFraccionArancelaria: '',
      cantidadUMT: '',
      umt: '',
      cantidadUMC: '',
      umc: '',
      claveLote: '',
      listaClave: '',
      manfestosYDeclaraciones: false,
      hacerlosPublicos: '',
      rfc: '',
      claveDeReferencia: '',
      cadenaDependecia: '',
      banco: '',
      liaveDePago: '',
      importeDePago: '',
      destinatario: '',
      fabricante: '',
      tipoPersona: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      denominacion: '',
      pais: '',
      estados: '',
      codigoDeZip: '',
      camino: '',
      numeroExterior: '',
      numeroInterior: '',
      ladaDeTerceros: '',
      fon: '',
      email: '',
      fechaPago: '',
      nombreRazon: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call donanteDomicilio and enable/disable form in guardarDatosFormulario', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({});
    component.soloLectura = true;
    jest.spyOn(component.datosDelEstablecimientoForm, 'disable');
    jest.spyOn(component, 'donanteDomicilio');
    component.guardarDatosFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.datosDelEstablecimientoForm.disable).toHaveBeenCalled();

    component.soloLectura = false;
    jest.spyOn(component.datosDelEstablecimientoForm, 'enable');
    component.guardarDatosFormulario();
    expect(component.datosDelEstablecimientoForm.enable).toHaveBeenCalled();
  });

  it('should call consultaService.obtenerTablaScian and set certificadoDisponsiblesTablaDatos in obtenerTablaScian', () => {
    component.obtenerTablaScian();
    expect(consultaServiceMock.obtenerTablaScian).toHaveBeenCalled();
    expect(component.certificadoDisponsiblesTablaDatos).toBeDefined();
  });

  it('should call consultaService.obtenerTablaMercancias and set mercanciasConfiguracionTabla in obtenerTablaMercancias', () => {
    component.obtenerTablaMercancias();
    expect(consultaServiceMock.obtenerTablaMercancias).toHaveBeenCalled();
    expect(component.mercanciasConfiguracionTabla).toBeDefined();
  });

  it('should call consultaService.obtenerDatosEstado and set estadoCatalogo.catalogos in obtenerDatosEstado', () => {
    component.estadoCatalogo = { labelNombre: '',
  required: false,
  primerOpcion: '',
  catalogos: [] };
    component.obtenerDatosEstado();
    expect(consultaServiceMock.obtenerDatosEstado).toHaveBeenCalled();
    expect(component.estadoCatalogo.catalogos).toBeDefined();
  });

  it('should call consultaService.obtenerDatosClave and set catalogoClave.catalogos in obtenerDatosClave', () => {
    component.catalogoClave = { labelNombre: '',
  required: false,
  primerOpcion: '',
  catalogos: [] };
    component.obtenerDatosClave();
    expect(consultaServiceMock.obtenerDatosClave).toHaveBeenCalled();
    expect(component.catalogoClave.catalogos).toBeDefined();
  });

  it('should call consultaService.obtenerTablaListaClave and set listaClaveTabla in obtenerTablaListaClave', () => {
    component.obtenerTablaListaClave();
    expect(consultaServiceMock.obtenerTablaListaClave).toHaveBeenCalled();
    expect(component.listaClaveTabla).toBeDefined();
  });

  it('should call consultaService.getDescripcionScian and update store in claveScianSeleccion', () => {
    component.scianForm = new FormBuilder().group({
      cveSCIAN: ['123'],
      cveSCIANDescripcion: ['']
    });
    component.claveScianSeleccion();
    expect(consultaServiceMock.getDescripcionScian).toHaveBeenCalled();
    expect(tramiteStoreMock.setDescripcionScian).toHaveBeenCalledWith('desc');
    expect(tramiteStoreMock.setClaveScian).toHaveBeenCalledWith('123');
  });

  it('should call store.setAvisoDeFuncionamiento in establecerAvisoDeFuncionamiento', () => {
    const event = { target: { checked: true } } as any;
    component.establecerAvisoDeFuncionamiento(event);
    expect(tramiteStoreMock.setAvisoDeFuncionamiento).toHaveBeenCalledWith(true);
  });

  it('should call store.setLicenciaSanitaria in establecerLicenciaSanitaria', () => {
    const event = { target: { value: 'lic' } } as any;
    component.establecerLicenciaSanitaria(event);
    expect(tramiteStoreMock.setLicenciaSanitaria).toHaveBeenCalledWith('lic');
  });

  it('should call store.setClaveDeLosLotes in establecerClaveDeLosLotes', () => {
    const event = { target: { value: 'clave' } } as any;
    component.establecerClaveDeLosLotes(event);
    expect(tramiteStoreMock.setClaveDeLosLotes).toHaveBeenCalledWith('clave');
  });

  it('should toggle paisOrigen in paisOrigenColapsable', () => {
    component.paisOrigen = false;
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(true);
  });

  it('should toggle paisProcedencisColapsable in paisProcedencis_colapsable', () => {
    component.paisProcedencisColapsable = false;
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(true);
  });

  it('should toggle usoEspecifico in usoEspecificoColapsable', () => {
    component.usoEspecifico = false;
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(true);
  });

  it('should call store.addMercanciasDatos in agregarMercanias', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      clasificaionProductos: ['a'],
      especificarProducto: ['b'],
      nombreProductoEspecifico: ['c'],
      marca: ['d'],
      tipoProducto: ['e'],
      fraccionArancelaria: ['f'],
      descripcionFraccionArancelaria: ['g'],
      cantidadUMT: ['h'],
      umt: ['i'],
      cantidadUMC: ['j'],
      umc: ['k'],
    });
    component.agregarMercanias();
    expect(tramiteStoreMock.addMercanciasDatos).toHaveBeenCalled();
  });

  it('should set esDatosSCIANSeleccionado to true in AcceptarEliminarScian', () => {
    component.esDatosSCIANSeleccionado = false;
    component.AcceptarEliminarScian();
    expect(component.esDatosSCIANSeleccionado).toBe(true);
  });

  it('should set tieneFilaSeleccionadaFabricante in setTablaSeleccionFabricante', () => {
    component.setTablaSeleccionFabricante([{claveScian: '123', descripcionScian: 'desc' }]);
    expect(component.tieneFilaSeleccionadaFabricante).toBe(true);
    component.setTablaSeleccionFabricante([]);
    expect(component.tieneFilaSeleccionadaFabricante).toBe(false);
  });

  it('should remove pedimento in eliminarPedimento', () => {
    component.pedimentos = [1, 2, 3] as any;
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos).toEqual([1, 3]);
  });

  it('should open modal and set nuevaNotificacion in abrirModal', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should open modal and set nuevaNotificacion2 in abrirModalmercancia', () => {
    component.abrirModalmercancia(3);
    expect(component.nuevaNotificacion2).toBeDefined();
    expect(component.elementoParaEliminar).toBe(3);
  });

  it('should remove pedimento in eliminarMercanciaChecked', () => {
    component.pedimentos = [1, 2, 3] as any;
    component.elementoParaEliminar = 0;
    component.eliminarMercanciaChecked(true);
    expect(component.pedimentos).toEqual([2, 3]);
  });

  it('should open modal and set nuevaNotificacion2 in abrirModalmercanciaChecked', () => {
    component.abrirModalmercanciaChecked(4);
    expect(component.nuevaNotificacion2).toBeDefined();
    expect(component.elementoParaEliminar).toBe(4);
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method and alCambiarSeleccion in setValoresStore', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    jest.spyOn(component, 'alCambiarSeleccion');
    component.setValoresStore(form, 'campo', 'setJustificacion');
    expect(tramiteStoreMock.setJustificacion).toHaveBeenCalledWith('valor');
    expect(component.alCambiarSeleccion).toHaveBeenCalledWith(form, 'campo');
  });

  it('should call donanteDomicilio in inicializarEstadoFormulario if !soloLectura', () => {
  component.soloLectura = false;
  component.setFecha = '01/01/2024'; 
  jest.spyOn(component, 'donanteDomicilio');
  component.inicializarEstadoFormulario();
  expect(component.donanteDomicilio).toHaveBeenCalled();
});

  it('should call guardarDatosFormulario in inicializarEstadoFormulario if soloLectura', () => {
    component.soloLectura = true;
    jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call abrirModalmercancia if esCheckboxSeleccionado is false in eliminarMercanciaGrid', () => {
    component.esCheckboxSeleccionado = false;
    jest.spyOn(component, 'abrirModalmercancia');
    component.eliminarMercanciaGrid();
    expect(component.abrirModalmercancia).toHaveBeenCalled();
  });

  it('should call abrirModalmercanciaChecked if esCheckboxSeleccionado is true in eliminarMercanciaGrid', () => {
    component.esCheckboxSeleccionado = true;
    jest.spyOn(component, 'abrirModalmercanciaChecked');
    component.eliminarMercanciaGrid();
    expect(component.abrirModalmercanciaChecked).toHaveBeenCalled();
  });

  it('should set esCheckboxSeleccionado in verificarSeleccionCheckbox', () => {
    const event = { target: document.createElement('input') } as any;
    event.target.type = 'checkbox';
    event.target.checked = true;
    jest.spyOn(event.target, 'closest').mockReturnValue(event.target);
    component.verificarSeleccionCheckbox(event);
    expect(component.esCheckboxSeleccionado).toBe(true);
  });

  it('should return validacionForm', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeTruthy();
  });

  it('should return validacionMercanciaForm', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({})
    });
    expect(component.validacionMercanciaForm).toBeTruthy();
  });

  it('should return validacionScionForm', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      validacionScionForm: new FormBuilder().group({})
    });
    expect(component.validacionScionForm).toBeTruthy();
  });

  it('should return validacionAduanaMercanciaForm', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      validacionAduanaMercanciaForm: new FormBuilder().group({})
    });
    expect(component.validacionAduanaMercanciaForm).toBeTruthy();
  });

  it('should return validacionDatosMercanciaForm', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      validacionDatosMercanciaForm: new FormBuilder().group({})
    });
    expect(component.validacionDatosMercanciaForm).toBeTruthy();
  });

  it('should set esTipoOperacionSeleccionado and enable/disable controls in alCambiarSeleccion', () => {
    component.datosDelEstablecimientoForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        justificacion: [''],
        razonSocial: [''],
        correoElectronico: ['']
      })
    });
    const form = new FormBuilder().group({ tipoOperacion: ['modificacion'] });
    component.alCambiarSeleccion(form, 'tipoOperacion');
    expect(component.esTipoOperacionSeleccionado).toBe(true);

    form.get('tipoOperacion')?.setValue('modificacionYProrroga');
    component.alCambiarSeleccion(form, 'tipoOperacion');
    expect(component.esTipoOperacionSeleccionado).toBe(false);
  });

  it('should remove pedimento and pop certificadoDisponsiblesTablaDatos in eliminarPedimentoMercancia', () => {
    component.pedimentos = [1, 2, 3] as any;
    component.elementoParaEliminar = 1;
    component.tieneFilaSeleccionadaFabricante = true;
    component.esCheckboxSeleccionado = true;
    component.certificadoDisponsiblesTablaDatos = [1, 2, 3] as any;
    component.eliminarPedimentoMercancia(true);
    expect(component.pedimentos).toEqual([1, 3]);
    expect(component.certificadoDisponsiblesTablaDatos.length).toBe(2);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});