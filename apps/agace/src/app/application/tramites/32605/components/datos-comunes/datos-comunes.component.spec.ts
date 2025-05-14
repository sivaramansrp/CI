import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { DatosComunesComponent } from './datos-comunes.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  NotificacionesComponent,
  TablaConEntradaComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { SeccionSubcontratadosComponent } from '../seccion-subcontratados/seccion-subcontratados.component';
import { InstalacionesPrincipalesComponent } from '../instalaciones-principales/instalaciones-principales.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Domicilios,
  EnlaceOperativo,
  NumeroDeEmpleados,
  SeccionSociosIC,
} from '../../models/solicitud.model';

describe('DatosComunesComponent', () => {
  let component: DatosComunesComponent;
  let fixture: ComponentFixture<DatosComunesComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud32605StoreMock: jest.Mocked<Solicitud32605Store>;
  let solicitud32605QueryMock: jest.Mocked<Solicitud32605Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirOpcionDeRadio: jest.fn(() =>
        of({
          requisitos: {
            radioOptions: [
              {
                label: 'Sí',
                value: 1,
              },
              {
                label: 'No',
                value: 2,
              },
            ],
            isRequired: true,
          },
          reconocimientoMutuo: {
            radioOptions: [
              {
                label: 'Sí Autorizo',
                value: 1,
              },
              {
                label: 'No Autorizo',
                value: 2,
              },
            ],
            isRequired: true,
          },
          clasificacionInformacion: {
            radioOptions: [
              {
                label: 'Pública',
                value: 1,
              },
              {
                label: 'Privada',
                value: 2,
              },
            ],
            isRequired: true,
          },
        })
      ),
      conseguirSolicitudCatologoSelectLista: jest.fn(() =>
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
        })
      ),
      conseguirInventarios: jest.fn(() =>
        of([
          {
            nombre: 'Nombre prueba1',
            lugarRadicacion: 'Mexíco',
            anexo24: '',
          },
        ])
      ),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud32605StoreMock = {
      actualizarListaSeccionSociosIC: jest.fn(() => of([])),
      actualizarNumeroDeEmpleadosLista: jest.fn(() => of([])),
      actualizarDomiciliosDatos: jest.fn(() => of([])),
      actualizarCatseleccionados: jest.fn(() => of([])),
      actualizarServicio: jest.fn(() => of([])),
      actualizar190: jest.fn(() => of(1)),
      actualizar191: jest.fn(() => of(1)),
      actualizar199: jest.fn(() => of(1)),
      actualizarEmpleados: jest.fn(() => of('Test')),
      actualizarBimestre: jest.fn(() => of(1)),
      actualizar2034: jest.fn(() => of(1)),
      actualizar236: jest.fn(() => of(1)),
      actualizar237: jest.fn(() => of(1)),
      actualizar239: jest.fn(() => of(1)),
      actualizar240: jest.fn(() => of(1)),
      actualizar243: jest.fn(() => of(1)),
      actualizar244: jest.fn(() => of(1)),
      actualizar245: jest.fn(() => of(1)),
      actualizarIndiqueTodos: jest.fn(() => of('test')),
      actualizar246: jest.fn(() => of(1)),
      actualizarFile1: jest.fn(() => of('test')),
      actualizarFile2: jest.fn(() => of('test')),
      actualizar247: jest.fn(() => of(1)),
      actualizar248: jest.fn(() => of(1)),
      actualizarIdentificacion: jest.fn(() => of('test')),
      actualizarLugarDeRadicacion: jest.fn(() => of('test')),
      actualizar249: jest.fn(() => of(1)),
      actualizar250: jest.fn(() => of(1)),
      actualizar251: jest.fn(() => of(1)),
      actualizarCheckbox1: jest.fn(() => of(true)),
      actualizarCheckbox2: jest.fn(() => of(true)),
      actualizarCheckbox3: jest.fn(() => of(true)),
      actualizarActualmente2: jest.fn(() => of('test')),
      actualizarActualmente1: jest.fn(() => of('test')),
    } as unknown as jest.Mocked<Solicitud32605Store>;

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

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent,
        TablaDinamicaComponent,
        MiembroDeLaEmpresaComponent,
        NotificacionesComponent,
        SeccionSubcontratadosComponent,
        InstalacionesPrincipalesComponent,
        TablaConEntradaComponent,
        ToastrModule,
        DatosComunesComponent,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(DatosComunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.datosComunesForm).toBeDefined();
    expect(
      component.datosComunesForm.controls['catseleccionados']
    ).toBeDefined();
    expect(component.datosComunesForm.controls['servicio']).toBeDefined();
  });

  it('should call conseguirOpcionDeRadio on initialization', () => {
    jest.spyOn(solicitudServiceMock, 'conseguirOpcionDeRadio');
    solicitudServiceMock.conseguirOpcionDeRadio();
    expect(solicitudServiceMock.conseguirOpcionDeRadio).toHaveBeenCalled();
  });

  it('should call conseguirSolicitudCatologoSelectLista on initialization', fakeAsync(() => {
    jest.spyOn(solicitudServiceMock, 'conseguirSolicitudCatologoSelectLista');
    solicitudServiceMock.conseguirSolicitudCatologoSelectLista();
    expect(
      solicitudServiceMock.conseguirSolicitudCatologoSelectLista
    ).toHaveBeenCalled();
  }));

  it('should call conseguirInventarios on initialization', () => {
    jest.spyOn(solicitudServiceMock, 'conseguirInventarios');
    solicitudServiceMock.conseguirInventarios();
    expect(solicitudServiceMock.conseguirInventarios).toHaveBeenCalled();
  });

  it('should update listaSeccionSociosIC when eventoActualizarMiembro is called', () => {
    const mockEvent = { nombre: 'Test Socio' } as any;
    component.eventoActualizarMiembro(mockEvent);
    expect(component.listaSeccionSociosIC).toContain(mockEvent);
    expect(
      solicitud32605StoreMock.actualizarListaSeccionSociosIC
    ).toHaveBeenCalledWith(component.listaSeccionSociosIC);
  });

  it('should update domiciliosDatos when instalacionesPrincipales is called', () => {
    const mockDomicilio = { tipoInstalacion: 'Test Instalacion' } as any;
    component.instalacionesPrincipales(mockDomicilio);
    expect(component.domiciliosDatos).toContain(mockDomicilio);
    expect(
      solicitud32605StoreMock.actualizarDomiciliosDatos
    ).toHaveBeenCalledWith(component.domiciliosDatos);
  });

  it('should update numeroDeEmpleadosLista when seccionSubcontratados is called', () => {
    const mockEmpleado = { numeroDeEmpleados: 10 } as any;
    component.seccionSubcontratados(mockEmpleado);
    expect(component.numeroDeEmpleadosLista).toContain(mockEmpleado);
    expect(
      solicitud32605StoreMock.actualizarNumeroDeEmpleadosLista
    ).toHaveBeenCalledWith(component.numeroDeEmpleadosLista);
  });

  it('should call abrirModal with correct message', () => {
    jest.spyOn(component, 'abrirModal');
    component.actualizar239(1);
    expect(component.abrirModal).toHaveBeenCalledWith(
      'Es un requisito obligatorio para acceder a Registro en el Esquema de Certificacion de Empresas, de conformidad con la regla 7.1.1. de las RGCE.'
    );
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
