import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { MiembroDeLaEmpresaComponent } from './miembro-de-la-empresa.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import {
  Domicilios,
  EnlaceOperativo,
  NumeroDeEmpleados,
  SeccionSociosIC,
  SolicitudCatologoSelectLista,
  SolicitudRadioLista,
} from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MiembroDeLaEmpresaComponent', () => {
  let component: MiembroDeLaEmpresaComponent;
  let fixture: ComponentFixture<MiembroDeLaEmpresaComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud32605StoreMock: jest.Mocked<Solicitud32605Store>;
  let solicitud32605QueryMock: jest.Mocked<Solicitud32605Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirSolicitudCatologoSelectLista: jest.fn(),
      conseguirOpcionDeRadio: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud32605StoreMock = {
      actualizarMiembroCaracterDe: jest.fn(),
      actualizarMiembroTributarMexico: jest.fn(),
      actualizarMiembroNacionalidad: jest.fn(),
      actualizarMiembroRFC: jest.fn(),
      actualizarMiembroTipoPersonaMuestra: jest.fn(),
      actualizarMiembroNombre: jest.fn(),
      actualizarMiembroApellidoPaterno: jest.fn(),
      actualizarMiembroApellidoMaterno: jest.fn(),
      actualizarMiembroNombreEmpresa: jest.fn(),
      actualizarMiembroRegistroFederal: jest.fn(),
      actualizarMiembroNombreCompleto: jest.fn(),
    } as unknown as jest.Mocked<Solicitud32605Store>;

    solicitud32605QueryMock = {
      selectSolicitud$: jest.fn(),
    } as unknown as jest.Mocked<Solicitud32605Query>;

    await TestBed.configureTestingModule({
      imports: [
        MiembroDeLaEmpresaComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32605Store, useValue: solicitud32605StoreMock },
        { provide: Solicitud32605Query, useValue: solicitud32605QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembroDeLaEmpresaComponent);
    component = fixture.componentInstance;

    solicitud32605QueryMock = {
      selectSolicitud$: of({
        idPersonaSolicitud: '',
        rfcTercero: '',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        correoElectronico: '',

        agregarEnlaceRfcTercero: '',
        agregarEnlaceRfc: '',
        agregarEnlaceNombre: '',
        agregarEnlaceApellidoPaterno: '',
        agregarEnlaceApellidoMaterno: '',
        agregarEnlaceCiudadEstado: '',
        agregarEnlaceCargo: '',
        agregarEnlaceTelefono: '',
        agregarEnlaceCorreoElectronico: '',
        agregarEnlaceSuplente: false,

        '2089': 0,
        '2090': 0,
        '2091': 0,

        '2042': 0,
        '2043': 0,
        '2044': 0,
        fechaInicioComercio: '',
        fechaPago: '',
        monto: '',
        operacionesBancarias: '',
        llavePago: '',

        transportistaRFC: '',
        transportistaRFCModifTrans: '',
        transportistaRazonSocial: '',
        transportistaDomicilio: '',
        transportistaCaat: '',
        transportistaIdDomicilio: '',
        transportistaIdRFC: '',
        transportistaIdRazonSocial: '',
        transportistaIdCaat: '',

        miembroCaracterDe: '',
        miembroTributarMexico: 0,
        miembroNacionalidad: '',
        miembroRfc: '',
        miembroRegistroFederal: '',
        miembroNombreCompleto: '',
        miembroTipoPersonaMuestra: '',
        miembroNombre: '',
        miembroApellidoPaterno: '',
        miembroApellidoMaterno: '',
        miembroNombreEmpresa: '',

        subcontrataRFCBusqueda: '',
        subcontrataRFC: '',
        subcontrataRazonSocial: '',
        subcontrataEmpleados: '',
        subcontrataBimestre: 0,

        principales: 0,
        municipio: '',
        tipoDeInstalacion: 0,
        entidadFederativa: '',
        registroSESAT: '',
        descripcion: '',
        codigoPostal: '',
        procesoProductivo: 0,
        goceDelInmueble: 0,
        empresa: 0,
        comercioExterior: 0,
        mutuo: 0,

        catseleccionados: 0,
        servicio: 0,
        '190': 0,
        '191': 0,
        '199': 0,
        empleados: '',
        bimestre: 0,
        '2034': 0,
        '236': 0,
        '237': 0,
        '238': 0,
        '239': 0,
        '240': 0,
        '243': 0,
        '244': 0,
        '245': 0,
        indiqueTodos: 0,
        '246': 0,
        file1: '',
        file2: '',
        '247': 0,
        '248': 0,
        identificacion: '',
        lugarDeRadicacion: '',
        '249': 0,
        '250': 0,
        '251': 0,
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        actualmente2: '',
        actualmente1: '',
        numeroDeEmpleadosLista: [] as NumeroDeEmpleados[],
        domiciliosDatos: [] as Domicilios[],
        listaSeccionSociosIC: [] as SeccionSociosIC[],
        enlaceOperativosLista: [] as EnlaceOperativo[],
      }),
    } as jest.Mocked<Solicitud32605Query>;

    solicitudServiceMock.conseguirSolicitudCatologoSelectLista.mockReturnValue(
      of({
        sectorProductivo: {
          labelNombre: 'Sector Productivo',
          required: false,
          primerOpcion: 'Seleccione un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Bordado o impresión de prendas',
            },
            {
              id: 2,
              descripcion: 'Bordado o impresión de prendas -n1',
            },
          ],
        },
        servicio: {
          labelNombre: 'Servicio',
          required: false,
          primerOpcion: 'Seleccione un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Bordado o impresión de prendas',
            },
            {
              id: 2,
              descripcion: 'Bordado o impresión de prendas -n1',
            },
          ],
        },
        bimestre: {
          labelNombre: 'Bimestre',
          required: false,
          primerOpcion: 'Seleccione un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Marzo-Abril',
            },
            {
              id: 2,
              descripcion: 'Marzo-Abril-1',
            },
          ],
        },
        indiqueTodos: {
          labelNombre: '',
          required: false,
          primerOpcion: 'Seleccione un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Domicilios registrados',
            },
            {
              id: 2,
              descripcion: '42025 - Autorización Programa Nuevo Industrial',
            },
          ],
        },
        enSuCaracterDe: {
          labelNombre: 'En su caracter de',
          required: true,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'Accionista',
            },
            {
              id: 2,
              descripcion: 'Accionista - 1',
            },
          ],
        },
        nacionalidad: {
          labelNombre: 'Nacionalidad',
          required: true,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI)',
            },
            {
              id: 2,
              descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI) - 1',
            },
          ],
        },
        tipoDePersona: {
          labelNombre: 'Tipo de Persona',
          required: true,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'Física',
            },
            {
              id: 2,
              descripcion: 'Moral',
            },
          ],
        },
        tipoDeInstalacion: {
          labelNombre: 'Tipo de instalación',
          required: true,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 2,
              descripcion: 'Test 2',
            },
          ],
        },
      } as SolicitudCatologoSelectLista)
    );

    solicitudServiceMock.conseguirOpcionDeRadio.mockReturnValue(
      of({
        requisitos: { radioOptions: [{ value: 'Sí', label: 'Sí' }] },
      } as SolicitudRadioLista)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.miembroEmpresaForm).toBeDefined();
    expect(component.miembroEmpresaForm.get('miembroCaracterDe')?.value).toBe(
      '1'
    );
  });

  it('should call conseguirSolicitudCatologoSelectLista on initialization', () => {
    expect(
      solicitudServiceMock.conseguirSolicitudCatologoSelectLista
    ).toHaveBeenCalled();
    expect(component.enSuCaracterDeLista.catalogos[0].descripcion).toBe(
      'Carácter 1'
    );
  });

  it('should call conseguirOpcionDeRadio on initialization', () => {
    expect(solicitudServiceMock.conseguirOpcionDeRadio).toHaveBeenCalled();
    expect(component.sinoOpcion.radioOptions[0].label).toBe('Sí');
  });

  it('should emit eventoCerrarModal when cerrarModal is called', () => {
    jest.spyOn(component.eventoCerrarModal, 'emit');
    component.cerrarModal();
    expect(component.eventoCerrarModal.emit).toHaveBeenCalled();
  });

  it('should update miembroCaracterDe when actualizarMiembroCaracterDe is called', () => {
    component.actualizarMiembroCaracterDe({
      id: 2,
      descripcion: 'Carácter 2',
    });
    expect(
      solicitud32605StoreMock.actualizarMiembroCaracterDe
    ).toHaveBeenCalledWith('2');
  });

  it('should update miembroTributarMexico when actualizarMiembroTributarMexico is called', () => {
    component.actualizarMiembroTributarMexico('No');
    expect(
      solicitud32605StoreMock.actualizarMiembroTributarMexico
    ).toHaveBeenCalledWith('No');
  });

  it('should update miembroNacionalidad when actualizarMiembroNacionalidad is called', () => {
    component.actualizarMiembroNacionalidad({
      id: 1,
      descripcion: 'Estados Unidos',
    });
    expect(
      solicitud32605StoreMock.actualizarMiembroNacionalidad
    ).toHaveBeenCalledWith('US');
  });

  it('should update miembroRFC when actualizarMiembroRFC is called', () => {
    const event = { target: { value: 'RFC456' } } as any;
    component.actualizarMiembroRFC(event);
    expect(solicitud32605StoreMock.actualizarMiembroRFC).toHaveBeenCalledWith(
      'RFC456'
    );
  });

  it('should emit eventoActualizarMiembro when aceptarModal is called', () => {
    jest.spyOn(component.eventoActualizarMiembro, 'emit');
    component.aceptarModal();
    expect(component.eventoActualizarMiembro.emit).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
