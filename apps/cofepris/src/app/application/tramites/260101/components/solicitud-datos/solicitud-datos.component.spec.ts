import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import {
  AlertComponent,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  TablaDinamicaComponent,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModificarMercanciasComponent } from '../modificar-mercancias/modificar-mercancias.component';
import { CommonModule } from '@angular/common';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;
  let mockSolicitudDatosService: jest.Mocked<Partial<SolicitudDatosService>>;
  let mockSolicitud260101Store: jest.Mocked<Partial<Solicitud260101Store>>;
  let mockSolicitud260101Query: jest.Mocked<Partial<Solicitud260101Query>>;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockSolicitudDatosService = {
      obtenerSolicitud: jest.fn(() => of()),
      obtenerEstadoCatalogo: jest.fn(() => of()),
      obtenerDatosDeSolicitud: jest.fn(() => of()),
      obtenerMercanciaListo: jest.fn(() => of()),
      obtenerRegimenDestinaraListo: jest.fn(() => of()),
      obtenerAduanaListo: jest.fn(() => of()),
      obtenerCrosslisto: jest.fn(() => of()),
      obtenerPagoDerechos: jest.fn(() => of()),
      obtenerDestinatarioImitar: jest.fn(() => of()),
      obtenerDestinatarioListo: jest.fn(() => of()),
      obtenerDestinatarioCatalogos: jest.fn(() => of()),
      obtenerDestinatarioRadio: jest.fn(() => of()),
      obtenerFabricanteRadio: jest.fn(() => of()),
      obtenerFabricanteListo: jest.fn(() => of()),
      obtenerTercerosDestinatarioImitar: jest.fn(() => of()),
      obtenerTercerosNacionalidadRadioOptions: jest.fn(() => of()),
      obtenerClavesDeLotesListo: jest.fn(() => of()),
      obtenerMercanciaCatalogos: jest.fn(() => of()),
    };

    mockSolicitud260101Store = {
      setRazonSocial: jest.fn(() => of()),
      setCorreoElectronico: jest.fn(() => of()),
      setCodigoPostal: jest.fn(() => of()),
      setMunicipio: jest.fn(() => of()),
      setLocalidad: jest.fn(() => of()),
      setColonia: jest.fn(() => of()),
      setCalle: jest.fn(() => of()),
      setLada: jest.fn(() => of()),
      setTelefono: jest.fn(() => of()),
      setLegalRazonSocial: jest.fn(() => of()),
      setApellidoPaterno: jest.fn(() => of()),
      setApellidoMeterno: jest.fn(() => of()),
      setMercanciasDatos: jest.fn(() => of()),
      setEstado: jest.fn(() => of()),
      setLicenciaSanitaria: jest.fn(() => of()),
      setRegimen: jest.fn(() => of()),
      setAduana: jest.fn(() => of()),
      setHacerlos: jest.fn(() => of()),
      setRfc: jest.fn(() => of()),
      removeMercanciaDatos: jest.fn(() => of()),
      setLiveFreshFrozen: jest.fn(() => of()),
      setAvisoDeFuncionamiento: jest.fn(() => of()),
      setManifesto: jest.fn(() => of()),
    };

    mockSolicitud260101Query = {
      seleccionarSolicitud$: of({
        razonSocial: '',
        correoElectronico: '',
        codigoPostal: '',
        estado: 0,
        municipio: '',
        localidad: '',
        colonia: '',
        calle: '',
        lada: 0,
        telefono: 0,
        avisoDeFuncionamiento: false,
        licenciaSanitaria: '',
        liveFreshFrozen: false,
        regimen: 0,
        aduana: 0,
        hacerlos: '',
        rfc: '',
        legalRazonSocial: '',
        apellidoPaterno: '',
        apellidoMeterno: '',
        mercanciasDatos: [],
        manifesto: false,
        clasificaionProductos: '',
        especificarProducto: 0,
        nombreProductoEspecifico: '',
        marca: '',
        tipoProducto: 0,
        fraccionArancelaria: '',
        descripcionFraccionArancelaria: '',
        cantidadUMT: '',
        umt: '',
        cantidadUMC: '',
        umc: 0,
        claveDeLosLotes: '',
        fechaFabricacion: '',
        fechaCaducidad: '',
        clavesDeLotes: [],
        tipoPersona: '',
        modificarRFC: '',
        denominacion: '',
        denominacionNombre: '',
        denominacionApellidoPaterno: '',
        denominacionApellidoMaterno: '',
        domicilioPais: '',
        domicilioEstado: '',
        domicilioMunicipio: '',
        domicilioLocalidad: '',
        domicilioCodigo: '',
        domicilioColonia: '',
        domiciliCalle: '',
        domiciliNumeroExterior: '',
        domiciliNumeroInterior: '',
        domiciliLada: '',
        domiciliTelefono: '',
        domiciliCorreoElectronioco: '',
        tercerosNacionalidad: 0,
        tercerosTipoPersona: 0,
        tercerosRFC: '',
        tercerosCurp: '',
        tercerosDenominacion: '',
        tercerosDenominacionNombre: '',
        tercerosApellidoPaterno: '',
        tercerosApellidoMaterno: '',
        tercerosPais: '',
        tercerosEstado: '',
        tercerosMunicipio: '',
        tercerosLocalidad: '',
        tercerosCodigo: '',
        tercerosColonia: '',
        tercerosCalle: '',
        tercerosNumeroExterior: '',
        tercerosNumeroInterior: '',
        tercerosLada: '',
        tercerosTelefono: '',
        tercerosCorreoElectronico: '',
        destinatarioDatos: [],
        claveDeReferencia: '',
        cadenaDeDependencia: '',
        banco: 0,
        liaveDePago: '',
        fechaDePago: '',
        importeDePago: '',
        modificarDestinatario: false,
        modificarFabricante: false,
        scianSeleccionados: [],
        mercanciasSeleccionados: [],
      }),
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({
        readonly: false,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        SolicitudDatosComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        InputRadioComponent,
        TablaDinamicaComponent,
        CatalogoSelectComponent,
        TableComponent,
        AlertComponent,
        TituloComponent,
        ModificarMercanciasComponent,
      ],
      providers: [
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.solicitudForm).toBeDefined();
  });

  it('should call inicializarFormulario on ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle colapsable when mostrarColapsable is called', () => {
    const initial = component.colapsable;
    component.mostrarColapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('should call setRegimen on store', () => {
    component.setRegimen({ id: '1' } as any);
    expect(mockSolicitud260101Store.setRegimen).toHaveBeenCalledWith('1');
  });

  it('should call setAduana on store', () => {
    component.setAduana({ id: '2' } as any);
    expect(mockSolicitud260101Store.setAduana).toHaveBeenCalledWith('2');
  });

  it('should call setEstado on store', () => {
    component.setEstado({ id: '3' } as any);
    expect(mockSolicitud260101Store.setEstado).toHaveBeenCalledWith('3');
  });

  it('should call setHacerlos on store', () => {
    component.setHacerlos(1);
    expect(mockSolicitud260101Store.setHacerlos).toHaveBeenCalledWith(1);
  });

  it('should call setRFC on store', () => {
    const mockEvent = { target: { value: 'RFC123' } } as any;
    component.setRFC(mockEvent);
    expect(mockSolicitud260101Store.setRfc).toHaveBeenCalledWith('RFC123');
  });

  it('should call eliminarMercancias and remove first item', () => {
    component.selectedMercanciasDatos = [
      { fraccionArancelaria: 'test' } as any,
    ];
    component.eliminarMercancias();
    expect(mockSolicitud260101Store.removeMercanciaDatos).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.solicitudForm = component.fb.group({
      test: [{ value: '', disabled: false }]
    });
    const disableSpy = jest.spyOn(component.solicitudForm, 'disable');
    component.guardarDatosFormulario();
    expect(component.solicitudForm.get('test')?.disabled).toBe(undefined);
  });

  it('should enable form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.solicitudForm = component.fb.group({
      test: [{ value: '', disabled: true }]
    });
    const enableSpy = jest.spyOn(component.solicitudForm, 'enable');
    component.guardarDatosFormulario();
    expect(component.solicitudForm.get('test')?.enabled).toBe(undefined);
  });

  it('should call setLiveFreshFrozen on store with checked value', () => {
    const mockEvent = { target: { checked: true } } as any;
    component.setLiveFreshFrozen(mockEvent);
    expect(mockSolicitud260101Store.setLiveFreshFrozen).toHaveBeenCalledWith(true);
  });

  it('should call setAvisoDeFuncionamiento on store with checked value', () => {
    const mockEvent = { target: { checked: false } } as any;
    component.setAvisoDeFuncionamiento(mockEvent);
    expect(mockSolicitud260101Store.setAvisoDeFuncionamiento).toHaveBeenCalledWith(false);
  });

  it('should call setManifesto on store with checked value', () => {
    const mockEvent = { target: { checked: true } } as any;
    component.setManifesto(mockEvent);
    expect(mockSolicitud260101Store.setManifesto).toHaveBeenCalledWith(true);
  });
  it('should set selectedMercanciasDatos when getMercanciasDatos is called', () => {
    const mercancias = [{ fraccionArancelaria: 'test1' }, { fraccionArancelaria: 'test2' }] as any;
    component.getMercanciasDatos(mercancias);
    expect(component.selectedMercanciasDatos).toBe(mercancias);
  });

  it('should set selectedscianDatos when getscianDatos is called', () => {
    const scian = [{ clave: 'A', descripcion: 'desc' }, { clave: 'B', descripcion: 'desc2' }] as any;
    component.getscianDatos(scian);
    expect(component.selectedscianDatos).toBe(scian);
  });

  it('should call setLicenciaSanitaria on store with input value', () => {
    const mockEvent = { target: { value: 'LIC123' } } as any;
    component.setLicenciaSanitaria(mockEvent);
    expect(mockSolicitud260101Store.setLicenciaSanitaria).toHaveBeenCalledWith('LIC123');
  });

  it('should call store setters with values from obtenerSolicitud observable', () => {
    const mockRespuesta = {
      razonSocial: 'RS',
      correoElectronico: 'mail@test.com',
      codigoPostal: '12345',
      municipio: 'Mun',
      localidad: 'Loc',
      colonia: 'Col',
      calle: 'Street',
      lada: 55,
      telefono: 1234567890,
      legalRazonSocial: 'Legal RS',
      apellidoPaterno: 'Paterno',
      apellidoMeterno: 'Meterno',
    } as any;

    (mockSolicitudDatosService.obtenerSolicitud as jest.Mock).mockReturnValueOnce(of(mockRespuesta));

    component.obtenerSolicitud();

    expect(mockSolicitud260101Store.setRazonSocial).toHaveBeenCalledWith('RS');
    expect(mockSolicitud260101Store.setCorreoElectronico).toHaveBeenCalledWith('mail@test.com');
    expect(mockSolicitud260101Store.setCodigoPostal).toHaveBeenCalledWith('12345');
    expect(mockSolicitud260101Store.setMunicipio).toHaveBeenCalledWith('Mun');
    expect(mockSolicitud260101Store.setLocalidad).toHaveBeenCalledWith('Loc');
    expect(mockSolicitud260101Store.setColonia).toHaveBeenCalledWith('Col');
    expect(mockSolicitud260101Store.setCalle).toHaveBeenCalledWith('Street');
    expect(mockSolicitud260101Store.setLada).toHaveBeenCalledWith(55);
    expect(mockSolicitud260101Store.setTelefono).toHaveBeenCalledWith(1234567890);
    expect(mockSolicitud260101Store.setLegalRazonSocial).toHaveBeenCalledWith('Legal RS');
    expect(mockSolicitud260101Store.setApellidoPaterno).toHaveBeenCalledWith('Paterno');
    expect(mockSolicitud260101Store.setApellidoMeterno).toHaveBeenCalledWith('Meterno');
  });

  it('should set estadoCatalogo when obtenerEstadoCatalogo is called', () => {
    const mockCatalogo = { estados: ['A', 'B'] } as any;
    (mockSolicitudDatosService.obtenerEstadoCatalogo as jest.Mock).mockReturnValueOnce(of(mockCatalogo));
    component.obtenerEstadoCatalogo();
    expect(component.estadoCatalogo).toBe(mockCatalogo);
  });

  it('should set solicitudDatos, hacerlosRadioOptions, and scianDatos when obtenerDatosDeAplicacion is called', () => {
    const mockSCIAN = [{ clave: '001', descripcion: 'desc1' }];
    const mockDatos = {
      tablaFilaDatos: [{ SCIANLista: mockSCIAN }],
      hacerlosRadioOptions: [{ label: 'op1', value: 1 }]
    } as any;
    (mockSolicitudDatosService.obtenerDatosDeSolicitud as jest.Mock).mockReturnValueOnce(of(mockDatos));
    component.obtenerDatosDeAplicacion();
    expect(component.solicitudDatos).toBe(mockDatos.tablaFilaDatos);
    expect(component.hacerlosRadioOptions).toBe(mockDatos.hacerlosRadioOptions);
    expect(component.scianDatos).toBe(mockSCIAN);
  });

  it('should set nuevaNotificacion and elementoParaEliminar when abrirModal is called', () => {
    const mensaje = 'Test mensaje';
    const index = 5;
    component.abrirModal(mensaje, index);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    });
    expect(component.elementoParaEliminar).toBe(index);
  });

  it('should set nuevaNotificacion, push PEDIMENTO and call abrirModal when openSeleccionarEstablecimiento is called', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    const initialLength = component.pedimentos.length;
    component.openSeleccionarEstablecimiento();
    expect(abrirModalSpy).toHaveBeenCalledWith(
      'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.'
    );
    expect(component.pedimentos.length).toBe(initialLength + 1);
    expect(component.pedimentos[component.pedimentos.length - 1]).toEqual({
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    });
  });

  it('should call setMercanciasDatos on store when obtenerMercanciaListo is called', () => {
    const mockMercancias = [{ fraccionArancelaria: 'test' }] as any;
    (mockSolicitudDatosService.obtenerMercanciaListo as jest.Mock).mockReturnValueOnce(of(mockMercancias));
    component.obtenerMercanciaListo();
    expect(mockSolicitud260101Store.setMercanciasDatos).toHaveBeenCalledWith(mockMercancias);
  });

  it('should set regimenCatalogo when obtenerRegimenDestinaraListo is called', () => {
    const mockRegimen = { regimenes: ['R1', 'R2'] } as any;
    (mockSolicitudDatosService.obtenerRegimenDestinaraListo as jest.Mock).mockReturnValueOnce(of(mockRegimen));
    component.obtenerRegimenDestinaraListo();
    expect(component.regimenCatalogo).toBe(mockRegimen);
  });

  it('should set aduanaCatalogo when obtenerAduanaListo is called', () => {
    const mockAduana = { aduanas: ['A1', 'A2'] } as any;
    (mockSolicitudDatosService.obtenerAduanaListo as jest.Mock).mockReturnValueOnce(of(mockAduana));
    component.obtenerAduanaListo();
    expect(component.aduanaCatalogo).toBe(mockAduana);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
