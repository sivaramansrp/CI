import { TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { of } from 'rxjs';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { AlertComponent, ConsultaioQuery, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Destinatario } from '../../models/destinatario.model';
import { Fabricante } from '../../models/fabricante.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModificarDestinatarioComponent } from '../modificar-destinatario/modificar-destinatario.component';
import { FabricanteComponent } from '../fabricante/fabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: any;
  let mockSolicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let mockSolicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let mockSolicitud260101Query: jest.Mocked<Solicitud260101Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    mockSolicitudDatosService = {
      obtenerDatosDeSolicitud:jest.fn(() => of()),
      obtenerSolicitud:jest.fn(() => of()),
      obtenerRegimenDestinaraListo:jest.fn(() => of()),
      obtenerAduanaListo:jest.fn(() => of()),
      obtenerEstadoCatalogo:jest.fn(() => of()),
      obtenerMercanciaListo:jest.fn(() => of()),
      obtenerClavesDeLotesListo:jest.fn(() => of()),
      obtenerDestinatarioListo:jest.fn(() => of()),
      obtenerFabricanteListo:jest.fn(() => of()),
      obtenerDestinatarioCatalogos:jest.fn(() => of()),
      obtenerDestinatarioRadio:jest.fn(() => of()),
      obtenerFabricanteRadio:jest.fn(() => of()),
      obtenerTercerosNacionalidadRadioOptions:jest.fn(() => of()),
      obtenerMercanciaCatalogos:jest.fn(() => of()),
      obtenerCrosslisto:jest.fn(() => of()),
      obtenerPagoDerechos:jest.fn(() => of()),
      obtenerDestinatarioImitar:jest.fn(() => of()),
      obtenerTercerosDestinatarioImitar:jest.fn(() => of()),
    } as unknown as jest.Mocked<SolicitudDatosService>;

    mockSolicitud260101Store = {
      setDestinatarioDatos: jest.fn(() => of()),
      setTipoPersona: jest.fn(() => of()),
      setModificarRFC: jest.fn(() => of()),
      setDenominacionNombre: jest.fn(() => of()),
      setDenominacion: jest.fn(() => of()),
      setDenominacionApellidoMaterno: jest.fn(() => of()),
      setDenominacionApellidoPaterno: jest.fn(() => of()),
      setDomicilioPais: jest.fn(() => of()),
      setDomicilioEstado: jest.fn(() => of()),
      setDomicilioMunicipio: jest.fn(() => of()),
      setDomicilioLocalidad: jest.fn(() => of()),
      setDomicilioCodigo: jest.fn(() => of()),
      setDomicilioColonia: jest.fn(() => of()),
      setDomicilioCalle: jest.fn(() => of()),
      setDomicilioNumeroExterior: jest.fn(() => of()),
      setDomicilioNumeroInterior: jest.fn(() => of()),
      setDomicilioLada: jest.fn(() => of()),
      setDomicilioTelefono: jest.fn(() => of()),
      setDomicilioCorreoElectronico: jest.fn(() => of()),
      setModificarDestinatario: jest.fn(() => of()),
      removeDestinatarioDato: jest.fn(() => of()),
      setModificarFabricante: jest.fn(() => of()),
      setTercerosNacionalidad: jest.fn(() => of()),
      setTercerosTipoPersona: jest.fn(() => of()),
      setTercerosRFC: jest.fn(() => of()),
      setTercerosDenominacionNombre: jest.fn(() => of()),
      setTercerosDenominacion: jest.fn(() => of()),
      setTercerosApellidoMaterno: jest.fn(() => of()),
      setTercerosApellidoPaterno: jest.fn(() => of()),
      setTercerosPais: jest.fn(() => of()),
      setTercerosEstado: jest.fn(() => of()),
      setTercerosMunicipio: jest.fn(() => of()),
      setTercerosLocalidad: jest.fn(() => of()),
      setTercerosCodigo: jest.fn(() => of()),
      setTercerosColonia: jest.fn(() => of()),
      setTercerosCalle: jest.fn(() => of()),
      setTercerosNumeroExterior: jest.fn(() => of()),
      setTercerosNumeroInterior: jest.fn(() => of()),
      setTercerosLada: jest.fn(() => of()),
      setTercerosTelefono: jest.fn(() => of()),
      setTercerosCorreoElectronico: jest.fn(() => of()),
    } as any;

    mockSolicitud260101Query = {
      seleccionarSolicitud$: of({}),
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    } as any;

    mockSolicitudDatosService.obtenerDestinatarioListo.mockReturnValue(of([]));
    mockSolicitudDatosService.obtenerFabricanteListo.mockReturnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosComponent,
        ReactiveFormsModule,
        CommonModule,
        TablaDinamicaComponent,
        AlertComponent,
        TituloComponent,
        ModificarDestinatarioComponent,
        FabricanteComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esFormularioSoloLectura from consultaioQuery', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('should call obtenerDestinatarioListo and set destinatarioDatos', () => {
    const destinatarios: Destinatario[] = [
      { rfc: 'RFC1', nombre: 'Nombre1' } as any,
    ];
    mockSolicitudDatosService.obtenerDestinatarioListo.mockReturnValue(
      of(destinatarios)
    );
    component.obtenerDestinatarioListo();
    expect(component.destinatarioDatos).toEqual(destinatarios);
    expect(mockSolicitud260101Store.setDestinatarioDatos).toHaveBeenCalledWith(
      destinatarios
    );
  });

  it('should call obtenerFabricanteListo and set fabricanteDatos', () => {
    const fabricantes: Fabricante[] = [{ rfc: 'RFC2', nombre: 'Fab1' } as any];
    mockSolicitudDatosService.obtenerFabricanteListo.mockReturnValue(
      of(fabricantes)
    );
    component.obtenerFabricanteListo();
    expect(component.fabricanteDatos).toEqual(fabricantes);
  });

  it('should set selectedDestinatario on seleccionDestinatarioDatos', () => {
    const destinatarios: Destinatario[] = [
      { rfc: 'RFC1', nombre: 'Nombre1' } as any,
    ];
    component.seleccionDestinatarioDatos(destinatarios);
    expect(component.selectedDestinatario).toEqual(destinatarios);
  });

  it('should set selectedFabricante on seleccionFabricanteDatos', () => {
    const fabricantes: Fabricante[] = [{ rfc: 'RFC2', nombre: 'Fab1' } as any];
    component.seleccionFabricanteDatos(fabricantes);
    expect(component.selectedFabricante).toEqual(fabricantes);
  });

  it('should push new destinatario on cerrarMercanciasModal if none selected', () => {
    const evento: Destinatario = { rfc: 'RFC3', nombre: 'Nuevo' } as any;
    component.selectedDestinatario = [];
    component.destinatarioDatos = [];
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    component.cerrarMercanciasModal(evento);
    expect(component.destinatarioDatos[0]).toEqual(evento);
    expect(
      mockSolicitud260101Store.setModificarDestinatario
    ).toHaveBeenCalledWith(false);
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should update destinatario on cerrarMercanciasModal if selected', () => {
    const evento: Destinatario = {
      rfc: 'RFC4',
      nombre: 'Modificado',
      curp: 'CURP',
      telefono: '123',
      correoElectronico: 'a@b.com',
      calle: 'Calle',
      numeroExterior: '1',
      numeroInterior: '2',
      pais: 'MX',
      paisNombre: 'México',
      colonia: 'Col',
      coloniaNombre: 'Colonia',
      municipio: 'Mun',
      municipioNombre: 'Municipio',
      localidad: 'Loc',
      localidadNombre: 'Localidad',
      estado: 'Edo',
      estadoNombre: 'Estado',
      estado2: 'Edo2',
      codigo: 'CP',
      codigoNombre: 'Codigo',
      denominacion: '',
      apellidoMaterno: '',
      apellidoPaterno: '',
      lada: '',
    } as any;
    component.selectedDestinatario = [evento];
    component.destinatarioDatos = [{ ...evento, nombre: 'Viejo' }];
    component.MODAL_INSTANCE = { hide: jest.fn() } as any;
    component.cerrarMercanciasModal({ ...evento, nombre: 'NuevoNombre' });
    expect(component.destinatarioDatos[0].nombre).toBe('NuevoNombre');
    expect(
      mockSolicitud260101Store.setModificarDestinatario
    ).toHaveBeenCalledWith(false);
    expect(component.MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('should push new fabricante on cerrarFabricanteModal if none selected', () => {
    const evento: Fabricante = { rfc: 'RFC5', nombre: 'NuevoFab' } as any;
    component.selectedFabricante = [];
    component.fabricanteDatos = [];
    component.MODAL_INSTANCE_FABRICANTE = { hide: jest.fn() } as any;
    component.cerrarFabricanteModal(evento);
    expect(component.fabricanteDatos[0]).toEqual(evento);
    expect(component.MODAL_INSTANCE_FABRICANTE.hide).toHaveBeenCalled();
  });

  it('should update fabricante on cerrarFabricanteModal if selected', () => {
    const evento: Fabricante = {
      rfc: 'RFC6',
      nombre: 'ModFab',
      tercerosNacionalidad: 'MX',
      tipoPersona: 'F',
      apellidoMaterno: '',
      apellidoPaterno: '',
      curp: '',
      telefono: '',
      correoElectronico: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      pais: '',
      paisNombre: '',
      colonia: '',
      coloniaNombre: '',
      municipio: '',
      municipioNombre: '',
      localidad: '',
      localidadNombre: '',
      estado: '',
      estadoNombre: '',
      estado2: '',
      codigo: '',
      codigoNombre: '',
      denominacion: '',
      lada: '',
    } as any;
    component.selectedFabricante = [evento];
    component.fabricanteDatos = [{ ...evento, nombre: 'ViejoFab' }];
    component.MODAL_INSTANCE_FABRICANTE = { hide: jest.fn() } as any;
    component.cerrarFabricanteModal({ ...evento, nombre: 'NuevoFab' });
    expect(component.fabricanteDatos[0].nombre).toBe('NuevoFab');
    expect(component.MODAL_INSTANCE_FABRICANTE.hide).toHaveBeenCalled();
  });

  it('should call removeDestinatarioDato on eliminarMercancias if selected', () => {
    const destinatario: Destinatario = { rfc: 'RFC7', nombre: 'Del' } as any;
    component.selectedDestinatario = [destinatario];
    component.eliminarMercancias();
    expect(
      mockSolicitud260101Store.removeDestinatarioDato
    ).toHaveBeenCalledWith(destinatario);
  });

  it('should set modificarDestinatario to [] and show modal on agregarMercancias', () => {
    component.MODAL_INSTANCE = { show: jest.fn() } as any;
    component.modalElement = {} as any;
    component.agregarMercancias();
    expect(component.modificarDestinatario).toEqual([]);
    expect(
      mockSolicitud260101Store.setModificarDestinatario
    ).toHaveBeenCalledWith(false);
    expect(component.MODAL_INSTANCE.show).toHaveBeenCalled();
  });

  it('should show modal and setModificarFabricante(false) on agregarModalFabricante', () => {
    component.MODAL_INSTANCE_FABRICANTE = { show: jest.fn() } as any;
    component.agregarModalFabricante();
    expect(
      mockSolicitud260101Store.setModificarFabricante
    ).toHaveBeenCalledWith(false);
    expect(component.MODAL_INSTANCE_FABRICANTE.show).toHaveBeenCalled();
  });

  it('should show modal and setModificarFabricante(true) on modificarModalFabricante if selected', () => {
    const fabricante: Fabricante = {
      rfc: 'RFC8',
      nombre: 'FabMod',
      tercerosNacionalidad: 'MX',
      tipoPersona: 'F',
      denominacion: '',
      apellidoMaterno: '',
      apellidoPaterno: '',
      pais: '',
      estado: '',
      municipio: '',
      localidad: '',
      codigo: '',
      colonia: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      lada: '',
      telefono: '',
      correoElectronico: '',
    } as any;
    component.selectedFabricante = [fabricante];
    component.MODAL_INSTANCE_FABRICANTE = { show: jest.fn() } as any;
    component.modificarModalFabricante();
    expect(
      mockSolicitud260101Store.setModificarFabricante
    ).toHaveBeenCalledWith(true);
    expect(component.MODAL_INSTANCE_FABRICANTE.show).toHaveBeenCalled();
  });

  it('should call store setters and show modal on openModificarMercancias if selectedDestinatario is not empty', () => {
    const destinatario: Destinatario = {
      tipoPersona: 'F',
      rfc: 'RFC9',
      nombre: 'DestMod',
      denominacion: 'Denom',
      apellidoMaterno: 'Mat',
      apellidoPaterno: 'Pat',
      pais: 'MX',
      estado: 'Edo',
      municipio: 'Mun',
      localidad: 'Loc',
      codigo: 'CP',
      colonia: 'Col',
      calle: 'Calle',
      numeroExterior: '10',
      numeroInterior: '20',
      lada: '55',
      telefono: '1234567890',
      correoElectronico: 'correo@ejemplo.com',
    } as any;
    component.selectedDestinatario = [destinatario];
    component.MODAL_INSTANCE = { show: jest.fn() } as any;

    component.openModificarMercancias();

    expect(mockSolicitud260101Store.setTipoPersona).toHaveBeenCalledWith('F');
    expect(mockSolicitud260101Store.setModificarRFC).toHaveBeenCalledWith('RFC9');
    expect(mockSolicitud260101Store.setDenominacionNombre).toHaveBeenCalledWith('DestMod');
    expect(mockSolicitud260101Store.setDenominacion).toHaveBeenCalledWith('Denom');
    expect(mockSolicitud260101Store.setDenominacionApellidoMaterno).toHaveBeenCalledWith('Mat');
    expect(mockSolicitud260101Store.setDenominacionApellidoPaterno).toHaveBeenCalledWith('Pat');
    expect(mockSolicitud260101Store.setDomicilioPais).toHaveBeenCalledWith('MX');
    expect(mockSolicitud260101Store.setDomicilioEstado).toHaveBeenCalledWith('Edo');
    expect(mockSolicitud260101Store.setDomicilioMunicipio).toHaveBeenCalledWith('Mun');
    expect(mockSolicitud260101Store.setDomicilioLocalidad).toHaveBeenCalledWith('Loc');
    expect(mockSolicitud260101Store.setDomicilioCodigo).toHaveBeenCalledWith('CP');
    expect(mockSolicitud260101Store.setDomicilioColonia).toHaveBeenCalledWith('Col');
    expect(mockSolicitud260101Store.setDomicilioCalle).toHaveBeenCalledWith('Calle');
    expect(mockSolicitud260101Store.setDomicilioNumeroExterior).toHaveBeenCalledWith('10');
    expect(mockSolicitud260101Store.setDomicilioNumeroInterior).toHaveBeenCalledWith('20');
    expect(mockSolicitud260101Store.setDomicilioLada).toHaveBeenCalledWith('55');
    expect(mockSolicitud260101Store.setDomicilioTelefono).toHaveBeenCalledWith('1234567890');
    expect(mockSolicitud260101Store.setDomicilioCorreoElectronico).toHaveBeenCalledWith('correo@ejemplo.com');
    expect(mockSolicitud260101Store.setModificarDestinatario).toHaveBeenCalledWith(true);
    expect(component.inputSelectionDestinatario).toBe(-1);
    expect(component.MODAL_INSTANCE.show).toHaveBeenCalled();
  });

  it('should not call store setters or show modal if selectedDestinatario is empty in openModificarMercancias', () => {
    component.selectedDestinatario = [];
    component.MODAL_INSTANCE = { show: jest.fn() } as any;

    component.openModificarMercancias();

    expect(mockSolicitud260101Store.setTipoPersona).not.toHaveBeenCalled();
    expect(component.MODAL_INSTANCE.show).not.toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spy2 = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
