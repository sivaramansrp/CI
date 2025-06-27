import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';

describe('DatosDeLaSolicitudComponent - Cobertura Completa', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let certificadosLicenciasSvcMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let modalServiceMock: any;

  const solicitudStateMock: any = {
    codigoPostal: '12345',
    estado: 'CDMX',
    municipio: 'BJ',
    localidad: 'Del Valle',
    colonia: 'Centro',
    calleYNumero: 'Calle 1',
    correoElecronico: 'test@mail.com',
    rfc: 'RFC123',
    lada: '55',
    telefono: '1234567890',
    avisoDeFuncionamiento: 'SI',
    licenciaSanitaria: 'LIC123',
    regimenDestinara: 'Regimen',
    aduana: 'Aduana',
    losDatosNo: false,
    losDatosYes: true,
    nombreORazon: 'Empresa',
    apellidoPaterno: 'Paterno',
    apellidoMaterno: 'Materno',
    clave: 'CLAVE',
    descripcion: 'Descripcion',
    especificarClasificacionProducto: 'Clasificacion',
    dci: 'DCI',
    marcaComercialODenominacionDistintiva: 'Marca',
    tipoDeProducto: 'Tipo',
    fraccionArancelaria: 'FA',
    descripcionDeLaFraccion: 'Desc FA',
    cantidadUMT: 1,
    UMT: 'UMT',
    UMC: 'UMC',
    numeroCas: 'CAS',
    cantidadDeLotes: 2,
    kgOrPorLote: 3,
    pais: 'MX',
    paisDeProcedencia: 'MX',
    detallarUso: 'Uso',
    cantidadUMC: 4,
    numeroDePiezas: 5,
    descripcionDelNumeroDePiezas: 'Desc piezas',
    numeroDeRegistro: 'REG123',
    presentacion: 'Caja',
    denominacionRazon: 'Denominacion',
  };

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getEstadoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1 }] })),
      getScianDatos: jest.fn().mockReturnValue(of([{ clave: 'A', descripcion: 'B' }])),
      getClaveDatos: jest.fn().mockReturnValue(of({ data: [{ id: 2 }] })),
      getRegimenDatos: jest.fn().mockReturnValue(of({ data: [{ id: 3 }] })),
      getMercanciasDatos: jest.fn().mockReturnValue(of([{ id: 4 }])),
      getTipoDeProductoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 5 }] })),
      getPaisDeProcedenciaDatos: jest.fn().mockReturnValue(of({ data: [{ id: 6 }] })),
    };
    tramiteStoreMock = {
      setCampo: jest.fn(),
    };
    tramiteQueryMock = {
      selectSolicitud$: of(solicitudStateMock),
    };
    modalServiceMock = {
      show: jest.fn().mockReturnValue({ hide: jest.fn() }),
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, ReactiveFormsModule],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: BsModalService, useValue: modalServiceMock },
        { provide: 'CertificadosLicenciasPermisosService', useValue: certificadosLicenciasSvcMock },
        { provide: 'Tramite260303Store', useValue: tramiteStoreMock },
        { provide: 'Tramite260303Query', useValue: tramiteQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.solicitudState = solicitudStateMock;
    component.consultaState = { readonly: false };
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar todos los formularios y catálogos en ngOnInit', () => {
    const spyInitForm = jest.spyOn(component, 'inicializarFormulario');
    const spyInitTabla = jest.spyOn(component, 'inicializarTablaYCatalogoDatos');
    const spyCrearEstablecimiento = jest.spyOn(component, 'crearElstablecimientoForm');
    const spyCrearRepLegal = jest.spyOn(component, 'crearRepresentanteLegalForm');
    const spyCerrarSCIAN = jest.spyOn(component, 'cerrarSCIANForm');
    const spyCerrarMercancias = jest.spyOn(component, 'cerrarMercanciasForm');
    const spyDeshabilitar = jest.spyOn(component, 'deshabilitarFormularios');
    component.ngOnInit();
    expect(spyInitForm).toHaveBeenCalled();
    expect(spyInitTabla).toHaveBeenCalled();
    expect(spyCrearEstablecimiento).toHaveBeenCalled();
    expect(spyCrearRepLegal).toHaveBeenCalled();
    expect(spyCerrarSCIAN).toHaveBeenCalled();
    expect(spyCerrarMercancias).toHaveBeenCalled();
    expect(spyDeshabilitar).toHaveBeenCalled();
  });

  it('debería inicializar el formulario de establecimiento', () => {
    component.crearElstablecimientoForm();
    expect(component.domicilioDeElstablecimientoForm).toBeDefined();
    expect(component.domicilioDeElstablecimientoForm.get('codigoPostal')?.value).toBe('12345');
  });

  it('debería inicializar el formulario de representante legal', () => {
    component.crearRepresentanteLegalForm();
    expect(component.representanteLegalForm).toBeDefined();
    expect(component.representanteLegalForm.get('nombreORazon')?.value).toBe('Empresa');
  });

  it('debería inicializar el formulario de SCIAN', () => {
    component.cerrarSCIANForm();
    expect(component.scianForm).toBeDefined();
    expect(component.scianForm.get('clave')?.value).toBe('CLAVE');
  });

  it('debería inicializar el formulario de mercancías', () => {
    component.cerrarMercanciasForm();
    expect(component.mercanciasForm).toBeDefined();
    expect(component.mercanciasForm.get('clave')?.value).toBe('CLAVE');
  });

  it('debería inicializar el formulario de denominación', () => {
    component.getDenominacionForm();
    expect(component.denominacionForm).toBeDefined();
    expect(component.denominacionForm.get('denominacionRazon')?.value).toBe('Denominacion');
  });

  it('debería obtener datos de estado y asignar a estadoCatalogo', () => {
    component.getEstadoCatalogDatos();
    expect(component.estadoCatalogo).toEqual([{ id: 1 }]);
  });

  it('debería obtener datos de SCIAN y asignar a scianTablaDatos', () => {
    component.getscianTabla();
    expect(component.scianTablaDatos).toEqual([{ clave: 'A', descripcion: 'B' }]);
  });

  it('debería obtener datos de clave y asignar a claveCatalogo', () => {
    component.getClaveCatalogDatos();
    expect(component.claveCatalogo).toEqual([{ id: 2 }]);
  });

  it('debería obtener datos de régimen y asignar a regimenCatalogo', () => {
    component.getRegimenCatalogDatos();
    expect(component.regimenCatalogo).toEqual([{ id: 3 }]);
  });

  it('debería obtener datos de mercancías y asignar a mercanciasTablaDatos', () => {
    component.getMercanciasTabla();
    expect(component.mercanciasTablaDatos).toEqual([{ id: 4 }]);
  });

  it('debería obtener datos de tipo de producto y asignar a tipoDeProductoCatalogo', () => {
    component.getTipoDeProductoCatalogDatos();
    expect(component.tipoDeProductoCatalogo).toEqual([{ id: 5 }]);
  });

  it('debería obtener datos de país de procedencia y asignar a paisDeProcedenciaCatalogo', () => {
    component.getPaisDeProcedenciaCatalogoDatos();
    expect(component.paisDeProcedenciaCatalogo).toEqual([{ id: 6 }]);
  });

  it('debería abrir el modal pequeño y marcar esModalCerrado como true', () => {
    const template = {} as any;
    component.seleccionar(template);
    expect(modalServiceMock.show).toHaveBeenCalledWith(template, { class: 'modal-sm' });
    expect(component.esModalCerrado).toBe(true);
  });

  it('debería abrir el modal grande', () => {
    const template = {} as any;
    component.seleccionarAgregar(template);
    expect(modalServiceMock.show).toHaveBeenCalledWith(template, { class: 'modal-lg' });
  });

  it('debería cerrar el modal y habilitar denominacionRazon', () => {
    component.getDenominacionForm();
    const hideSpy = jest.fn();
    component.modalRef = { hide: hideSpy } as any;
    component.cerrar();
    expect(hideSpy).toHaveBeenCalled();
    expect(component.denominacionForm.get('denominacionRazon')?.enabled).toBe(true);
  });

  it('debería alternar colapsables correctamente', () => {
    component.mostrarColapsable('forma');
    expect(component.colapsableObj.formaFarmaceuticaColapsable).toBe(true);
    component.mostrarColapsable('PaisDeOrigen');
    expect(component.colapsableObj.paisDeOrigenColapsable).toBe(true);
    component.mostrarColapsable('usoEspecifico');
    expect(component.colapsableObj.usoEspecificoColapsable).toBe(true);
    component.mostrarColapsable('otro');
    expect(component.colapsableObj.formaFarmaceuticaColapsable).toBe(false);
    expect(component.colapsableObj.paisDeOrigenColapsable).toBe(false);
    expect(component.colapsableObj.usoEspecificoColapsable).toBe(false);
  });

  it('debería ejecutar deepCopy correctamente', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = DatosDeLaSolicitudComponent.deepCopy(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(DatosDeLaSolicitudComponent.deepCopy(null)).toBeNull();
    expect(DatosDeLaSolicitudComponent.deepCopy(undefined)).toBeUndefined();
    expect(DatosDeLaSolicitudComponent.deepCopy([])).toEqual([]);
    expect(DatosDeLaSolicitudComponent.deepCopy({})).toEqual({});
  });

  it('debería ejecutar getCrossListBtn y devolver botones', () => {
    component.crossList = { toArray: () => [{ agregar: jest.fn(), quitar: jest.fn() }] } as any;
    const btns = component.getCrossListBtn();
    expect(btns.length).toBe(4);
    btns.forEach(btn => expect(typeof btn.funcion).toBe('function'));
    btns[0].funcion();
    btns[1].funcion();
    btns[2].funcion();
    btns[3].funcion();
  });

  it('debería ejecutar getCrossListBtn aunque crossList no tenga elementos', () => {
    component.crossList = { toArray: () => [] } as any;
    const btns = component.getCrossListBtn();
    expect(btns.length).toBe(4);
    btns.forEach(btn => expect(() => btn.funcion()).not.toThrow());
  });

  it('debería deshabilitar formularios si consultaState.readonly es true', () => {
    component.consultaState = { readonly: true };
    component.getDenominacionForm();
    component.crearElstablecimientoForm();
    component.crearRepresentanteLegalForm();
    component.cerrarSCIANForm();
    component.cerrarMercanciasForm();
    component.deshabilitarFormularios();
    expect(component.denominacionForm.disabled).toBe(true);
    expect(component.domicilioDeElstablecimientoForm.disabled).toBe(true);
    expect(component.representanteLegalForm.disabled).toBe(true);
    expect(component.scianForm.disabled).toBe(true);
    expect(component.mercanciasForm.disabled).toBe(true);
  });

  it('debería habilitar formularios si consultaState.readonly es false', () => {
    component.consultaState = { readonly: false };
    component.getDenominacionForm();
    component.crearElstablecimientoForm();
    component.crearRepresentanteLegalForm();
    component.cerrarSCIANForm();
    component.cerrarMercanciasForm();
    component.deshabilitarFormularios();
    expect(component.denominacionForm.enabled).toBe(true);
    expect(component.domicilioDeElstablecimientoForm.enabled).toBe(true);
    expect(component.representanteLegalForm.enabled).toBe(true);
    expect(component.scianForm.enabled).toBe(true);
    expect(component.mercanciasForm.enabled).toBe(true);
  });

  it('debería no fallar si consultaState es undefined o null en deshabilitarFormularios', () => {
    component.consultaState = undefined as any;
    component.getDenominacionForm();
    component.crearElstablecimientoForm();
    component.crearRepresentanteLegalForm();
    component.cerrarSCIANForm();
    component.cerrarMercanciasForm();
    expect(() => component.deshabilitarFormularios()).not.toThrow();
    component.consultaState = null as any;
    expect(() => component.deshabilitarFormularios()).not.toThrow();
  });

  it('debería no fallar si los formularios no están inicializados en deshabilitarFormularios', () => {
    component.denominacionForm = undefined as any;
    component.domicilioDeElstablecimientoForm = undefined as any;
    component.representanteLegalForm = undefined as any;
    component.scianForm = undefined as any;
    component.mercanciasForm = undefined as any;
    component.consultaState = { readonly: true };
    expect(() => component.deshabilitarFormularios()).not.toThrow();
  });

  it('debería cambiar el estado de licenciaSanitaria al marcar el checkbox', () => {
    component.crearElstablecimientoForm();
    const event = { target: { checked: true } } as any;
    const disableSpy = jest.spyOn(component.domicilioDeElstablecimientoForm.get('licenciaSanitaria')!, 'disable');
    component.onFuncionamientoCheckboxCambiar(event);
    expect(disableSpy).toHaveBeenCalled();
    const event2 = { target: { checked: false } } as any;
    const enableSpy = jest.spyOn(component.domicilioDeElstablecimientoForm.get('licenciaSanitaria')!, 'enable');
    component.onFuncionamientoCheckboxCambiar(event2);
    expect(enableSpy).toHaveBeenCalled();
  });

  it('debería no fallar si no existe el control licenciaSanitaria en onFuncionamientoCheckboxCambiar', () => {
    component.domicilioDeElstablecimientoForm = new FormBuilder().group({});
    const event = { target: { checked: true } } as any;
    expect(() => component.onFuncionamientoCheckboxCambiar(event)).not.toThrow();
  });

  it('debería llamar setValoresStore y ejecutar el método del store', () => {
    const form = new FormGroup({ campo: new FormBuilder().control('valor') });
    component.setValoresStore(form, 'campo', 'setCampo' as any);
    expect(tramiteStoreMock.setCampo).toHaveBeenCalledWith('valor');
  });

  it('debería ejecutar setValoresStore aunque el campo no exista en el form', () => {
    const form = new FormGroup({});
    expect(() => component.setValoresStore(form, 'noexiste', 'setCampo' as any)).not.toThrow();
    expect(tramiteStoreMock.setCampo).toHaveBeenCalledWith(undefined);
  });

  it('debería no lanzar error si modalRef es undefined al cerrar', () => {
    component.modalRef = undefined;
    component.denominacionForm = new FormBuilder().group({ denominacionRazon: [{ value: '', disabled: true }] });
    expect(() => component.cerrar()).not.toThrow();
  });

  it('debería no fallar si no existe el control denominacionRazon en cerrar', () => {
    component.denominacionForm = new FormBuilder().group({});
    component.modalRef = { hide: jest.fn() } as any;
    expect(() => component.cerrar()).not.toThrow();
  });

  it('debería limpiar destroyNotifier$ en ngOnDestroy aunque se llame dos veces', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledTimes(2);
    expect(completeSpy).toHaveBeenCalledTimes(2);
  });

  // TESTS ADICIONALES

  it('debería inicializar correctamente los catálogos y tablas en inicializarTablaYCatalogoDatos', () => {
    const spyDen = jest.spyOn(component, 'getDenominacionForm');
    const spyEst = jest.spyOn(component, 'getEstadoCatalogDatos');
    const spyScian = jest.spyOn(component, 'getscianTabla');
    const spyClave = jest.spyOn(component, 'getClaveCatalogDatos');
    const spyReg = jest.spyOn(component, 'getRegimenCatalogDatos');
    const spyMerc = jest.spyOn(component, 'getMercanciasTabla');
    const spyTipo = jest.spyOn(component, 'getTipoDeProductoCatalogDatos');
    const spyPais = jest.spyOn(component, 'getPaisDeProcedenciaCatalogoDatos');
    component.inicializarTablaYCatalogoDatos();
    expect(spyDen).toHaveBeenCalled();
    expect(spyEst).toHaveBeenCalled();
    expect(spyScian).toHaveBeenCalled();
    expect(spyClave).toHaveBeenCalled();
    expect(spyReg).toHaveBeenCalled();
    expect(spyMerc).toHaveBeenCalled();
    expect(spyTipo).toHaveBeenCalled();
    expect(spyPais).toHaveBeenCalled();
  });

  it('debería permitir deepCopy de valores null y undefined', () => {
    expect(DatosDeLaSolicitudComponent.deepCopy(null)).toBeNull();
    expect(DatosDeLaSolicitudComponent.deepCopy(undefined)).toBeUndefined();
  });

  it('debería permitir deepCopy de arrays vacíos', () => {
    expect(DatosDeLaSolicitudComponent.deepCopy([])).toEqual([]);
  });

  it('debería permitir deepCopy de objetos vacíos', () => {
    expect(DatosDeLaSolicitudComponent.deepCopy({})).toEqual({});
  });
});