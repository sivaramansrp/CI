import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let consultaServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerTablaScian: jest.fn().mockReturnValue(of([])),
      obtenerTablaMercancias: jest.fn().mockReturnValue(of([])),
      obtenerTablaListaClave: jest.fn().mockReturnValue(of([])),
      obtenerDatosEstado: jest.fn().mockReturnValue(of([])),
      obtenerDatosClave: jest.fn().mockReturnValue(of([])),
      getDescripcionScian: jest.fn().mockReturnValue(of({ data: [{ descripcion: 'desc' }] })),
    };

    storeMock = {
      setDescripcionScian: jest.fn(),
      setClaveScian: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setClaveDeLosLotes: jest.fn(),
      addMercanciasDatos: jest.fn(),
      setTipoOperacion: jest.fn(),
      setJustificacion: jest.fn(),
      setEstablecimiento: jest.fn(),
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
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
      setNombreRazon: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({}),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDeLaSolicitudComponent],
      providers: [
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: storeMock },
        { provide: Tramite260704Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    // Mock solicitudState for form creation
    component.solicitudState = {} as any;
    component.soloLectura = false;
    component.donanteDomicilio();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call consulta.obtenerTablaScian and set certificadoDisponsiblesTablaDatos', () => {
    component.obtenerTablaScian();
    expect(consultaServiceMock.obtenerTablaScian).toHaveBeenCalled();
    expect(Array.isArray(component.certificadoDisponsiblesTablaDatos)).toBe(true);
  });

  it('should call consulta.obtenerTablaMercancias and set mercanciasConfiguracionTabla', () => {
    component.obtenerTablaMercancias();
    expect(consultaServiceMock.obtenerTablaMercancias).toHaveBeenCalled();
    expect(Array.isArray(component.mercanciasConfiguracionTabla)).toBe(true);
  });

  it('should call consulta.obtenerTablaListaClave and set listaClaveTabla', () => {
    component.obtenerTablaListaClave();
    expect(consultaServiceMock.obtenerTablaListaClave).toHaveBeenCalled();
    expect(Array.isArray(component.listaClaveTabla)).toBe(true);
  });

  it('should call consulta.obtenerDatosEstado and set estadoCatalogo.catalogos', () => {
    component.obtenerDatosEstado();
    expect(consultaServiceMock.obtenerDatosEstado).toHaveBeenCalled();
    expect(Array.isArray(component.estadoCatalogo.catalogos)).toBe(true);
  });

  it('should call consulta.obtenerDatosClave and set catalogoClave.catalogos', () => {
    component.obtenerDatosClave();
    expect(consultaServiceMock.obtenerDatosClave).toHaveBeenCalled();
    expect(Array.isArray(component.catalogoClave.catalogos)).toBe(true);
  });

  it('should enable form and set habilitarEstado to false on aceptar()', () => {
    component.datosDelEstablecimientoForm.disable();
    component.habilitarEstado = true;
    component.aceptar();
    expect(component.datosDelEstablecimientoForm.enabled).toBe(true);
    expect(component.habilitarEstado).toBe(false);
  });

  it('should call consulta.getDescripcionScian and update scianForm and store on claveScianSeleccion()', () => {
    component.scianForm = component.fb.group({
      cveSCIAN: ['clave'],
      cveSCIANDescripcion: [''],
    });
    component.claveScianSeleccion();
    expect(consultaServiceMock.getDescripcionScian).toHaveBeenCalled();
    expect(storeMock.setDescripcionScian).toHaveBeenCalled();
    expect(storeMock.setClaveScian).toHaveBeenCalledWith('clave');
  });

  it('should open modal and call abrirModal on seleccionarEstablecimiento()', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as any;
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.seleccionarEstablecimiento();
    expect(abrirModalSpy).toHaveBeenCalled();
  });

  it('should open modal on agregarMercanciaGrid()', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as any;
    component.agregarMercanciaGrid();
    // No assertion needed, just ensure no error
  });

  it('should update esCheckboxSeleccionado on verificarSeleccionCheckbox()', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;
    const event = { target: input } as any;
    component.verificarSeleccionCheckbox(event);
    expect(component.esCheckboxSeleccionado).toBe(true);
  });

  it('should return validacionForm FormGroup', () => {
    expect(component.validacionForm).toBeTruthy();
  });

  it('should return validacionMercanciaForm FormGroup', () => {
    expect(component.validacionMercanciaForm).toBeTruthy();
  });

  it('should return validacionScionForm FormGroup', () => {
    expect(component.validacionScionForm).toBeTruthy();
  });

  it('should return validacionAduanaMercanciaForm FormGroup', () => {
    expect(component.validacionAduanaMercanciaForm).toBeTruthy();
  });

  it('should return validacionDatosMercanciaForm FormGroup', () => {
    expect(component.validacionDatosMercanciaForm).toBeTruthy();
  });

  it('should enable/disable controls in alCambiarSeleccion()', () => {
    const form = component.fb.group({
      tipoOperacion: ['modificacion'],
      justificacion: [{ value: '', disabled: false }],
      razonSocial: [{ value: '', disabled: false }],
      correoElectronico: [{ value: '', disabled: false }],
    });
    component.datosDelEstablecimientoForm = component.fb.group({
      validacionForm: form,
    });
    component.alCambiarSeleccion(form, 'tipoOperacion');
    expect(component.esTipoOperacionSeleccionado).toBe(true);

    form.get('tipoOperacion')?.setValue('modificacionYProrroga');
    component.alCambiarSeleccion(form, 'tipoOperacion');
    expect(component.esTipoOperacionSeleccionado).toBe(false);
  });

  it('should call abrirModalmercancia or abrirModalmercanciaChecked on eliminarMercanciaGrid()', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModalmercancia');
    const abrirModalCheckedSpy = jest.spyOn(component, 'abrirModalmercanciaChecked');
    component.esCheckboxSeleccionado = false;
    component.eliminarMercanciaGrid();
    expect(abrirModalSpy).toHaveBeenCalled();
    component.esCheckboxSeleccionado = true;
    component.eliminarMercanciaGrid();
    expect(abrirModalCheckedSpy).toHaveBeenCalled();
  });

  it('should set esAvisoFuncionamientoSeleccionado and call store.setAvisoDeFuncionamiento on establecerAvisoDeFuncionamiento()', () => {
    const event = { target: { checked: true } } as any;
    component.establecerAvisoDeFuncionamiento(event);
    expect(component.esAvisoFuncionamientoSeleccionado).toBe(true);
    expect(storeMock.setAvisoDeFuncionamiento).toHaveBeenCalledWith(true);
  });

  it('should call store.setLicenciaSanitaria on establecerLicenciaSanitaria()', () => {
    const event = { target: { value: 'lic' } } as any;
    component.establecerLicenciaSanitaria(event);
    expect(storeMock.setLicenciaSanitaria).toHaveBeenCalledWith('lic');
  });

  it('should toggle paisOrigen on paisOrigenColapsable()', () => {
    const prev = component.paisOrigen;
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(!prev);
  });

  it('should toggle paisProcedencisColapsable on paisProcedencis_colapsable()', () => {
    const prev = component.paisProcedencisColapsable;
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(!prev);
  });

  it('should call store.setClaveDeLosLotes on establecerClaveDeLosLotes()', () => {
    const event = { target: { value: 'clave' } } as any;
    component.establecerClaveDeLosLotes(event);
    expect(storeMock.setClaveDeLosLotes).toHaveBeenCalledWith('clave');
  });

  it('should toggle usoEspecifico on usoEspecificoColapsable()', () => {
    const prev = component.usoEspecifico;
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(!prev);
  });

  it('should call store.addMercanciasDatos on agregarMercanias()', () => {
    component.datosDelEstablecimientoForm = component.fb.group({
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
    expect(storeMock.addMercanciasDatos).toHaveBeenCalled();
  });

  it('should set esDatosSCIANSeleccionado to true on AcceptarEliminarScian()', () => {
    component.esDatosSCIANSeleccionado = false;
    component.AcceptarEliminarScian();
    expect(component.esDatosSCIANSeleccionado).toBe(true);
  });

  it('should set tieneFilaSeleccionadaFabricante on setTablaSeleccionFabricante()', () => {
    component.setTablaSeleccionFabricante([{} as any]);
    expect(component.tieneFilaSeleccionadaFabricante).toBe(true);
    component.setTablaSeleccionFabricante([]);
    expect(component.tieneFilaSeleccionadaFabricante).toBe(false);
  });

  it('should remove pedimento on eliminarPedimento()', () => {
    component.pedimentos = [1, 2, 3] as any;
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos).toEqual([1, 3]);
  });

  it('should set nuevaNotificacion and elementoParaEliminar on abrirModal()', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should set nuevaNotificacion2 and elementoParaEliminar on abrirModalmercancia()', () => {
    component.abrirModalmercancia(3);
    expect(component.nuevaNotificacion2).toBeDefined();
    expect(component.elementoParaEliminar).toBe(3);
  });

  it('should remove pedimento and pop certificadoDisponsiblesTablaDatos on eliminarPedimentoMercancia()', () => {
    component.pedimentos = [1, 2, 3] as any;
    component.elementoParaEliminar = 1;
    component.tieneFilaSeleccionadaFabricante = true;
    component.esCheckboxSeleccionado = true;
    component.certificadoDisponsiblesTablaDatos = [1, 2, 3] as any;
    component.eliminarPedimentoMercancia(true);
    expect(component.pedimentos).toEqual([1, 3]);
    expect(component.certificadoDisponsiblesTablaDatos.length).toBe(2);
  });

  it('should set nuevaNotificacion2 and elementoParaEliminar on abrirModalmercanciaChecked()', () => {
    component.abrirModalmercanciaChecked(4);
    expect(component.nuevaNotificacion2).toBeDefined();
    expect(component.elementoParaEliminar).toBe(4);
  });

  it('should call validacionesService.isValid on isValid()', () => {
    const form = component.fb.group({
      test: ['', Validators.required],
    });
    expect(component.isValid(form, 'test')).toBe(true);
  });

  it('should call store method and alCambiarSeleccion on setValoresStore()', () => {
    const form = component.fb.group({
      campo: ['valor'],
    });
    const alCambiarSeleccionSpy = jest.spyOn(component, 'alCambiarSeleccion');
    component.setValoresStore(form, 'campo', 'setTipoOperacion');
    expect(storeMock.setTipoOperacion).toHaveBeenCalledWith('valor');
    expect(alCambiarSeleccionSpy).toHaveBeenCalledWith(form, 'campo');
  });

  it('should disable form in guardarDatosFormulario if soloLectura', () => {
    component.soloLectura = true;
    component.donanteDomicilio();
    component.guardarDatosFormulario();
    expect(component.datosDelEstablecimientoForm.disabled).toBe(true);
  });

  it('should enable form in guardarDatosFormulario if not soloLectura', () => {
    component.soloLectura = false;
    component.donanteDomicilio();
    component.guardarDatosFormulario();
    expect(component.datosDelEstablecimientoForm.enabled).toBe(true);
  });

  it('should call donanteDomicilio in inicializarEstadoFormulario if not soloLectura', () => {
    const spy = jest.spyOn(component, 'donanteDomicilio');
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario in inicializarEstadoFormulario if soloLectura', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});