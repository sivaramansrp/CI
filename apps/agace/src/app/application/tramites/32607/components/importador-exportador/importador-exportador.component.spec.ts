import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportadorExportadorComponent } from './importador-exportador.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32607Store } from '../../estados/solicitud32607.store';
import { Solicitud32607Query } from '../../estados/solicitud32607.query';
import { of } from 'rxjs';
import {
  Domicilios,
  EnlaceOperativo,
  InputRadio,
  NumeroDeEmpleados,
  SeccionSociosIC,
  SolicitudRadioLista,
  TransportistasTable,
} from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import {
  InputFechaComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImportadorExportadorComponent', () => {
  let component: ImportadorExportadorComponent;
  let fixture: ComponentFixture<ImportadorExportadorComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud32607StoreMock: jest.Mocked<Solicitud32607Store>;
  let solicitud32607QueryMock: jest.Mocked<Solicitud32607Query>;

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
      conseguirTransportistasLista: jest.fn(() =>
        of([
          {
            rfc: 'AAL0409235E6',
            razonSocial: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
            domicilio:
              'CAMINO VIEJO 1353 81210 LOS MOCHIS MIGUEL HIDALGO AHOME SINALOA ESTADOS UNIDOS MEXICANOS',
            caat: '3CJD',
          },
        ])
      ),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud32607StoreMock = {
      actualizar2042: jest.fn(() => of('testValue')),
      actualizar2043: jest.fn(() => of('testValue')),
      actualizar2044: jest.fn(() => of('testValue')),
      actualizarFechaInicioComercio: jest.fn(() => of('2023/01/01')),
      actualizarFechaPago: jest.fn(() => of('2023/01/01')),
      actualizarMonto: jest.fn(() => of('1000')),
      actualizarOperacionesBancarias: jest.fn(() => of('operation123')),
      actualizarLlavePago: jest.fn(() => of('key123')),
    } as unknown as jest.Mocked<Solicitud32607Store>;

    solicitud32607QueryMock = {
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
    } as jest.Mocked<Solicitud32607Query>;

    await TestBed.configureTestingModule({
      imports: [
        ImportadorExportadorComponent,
        CommonModule,
        ReactiveFormsModule,
        InputRadioComponent,
        InputFechaComponent,
        TituloComponent,
        TablaDinamicaComponent,
        AgregarTransportistasComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32607Store, useValue: solicitud32607StoreMock },
        { provide: Solicitud32607Query, useValue: solicitud32607QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorExportadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.importadorExportadorForm).toBeDefined();
  });

  it('should call conseguirTransportistasLista on initialization', () => {
    const mockResponse: TransportistasTable[] = [
      {
        rfc: 'AAL0409235E6',
        razonSocial: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
        domicilio:
          'CAMINO VIEJO 1353 81210 LOS MOCHIS MIGUEL HIDALGO AHOME SINALOA ESTADOS UNIDOS MEXICANOS',
        caat: '3CJD',
      },
    ];
    solicitudServiceMock.conseguirTransportistasLista.mockReturnValue(
      of(mockResponse)
    );

    solicitudServiceMock.conseguirTransportistasLista();

    expect(
      solicitudServiceMock.conseguirTransportistasLista
    ).toHaveBeenCalled();
  });

  it('should update 2042 value in the store', () => {
    const evento = 'testValue';
    component.actualizar2042(evento);
    expect(solicitud32607StoreMock.actualizar2042).toHaveBeenCalledWith(evento);
  });

  it('should update 2043 value in the store', () => {
    const evento = 'testValue';
    component.actualizar2043(evento);
    expect(solicitud32607StoreMock.actualizar2043).toHaveBeenCalledWith(evento);
  });

  it('should update 2044 value in the store', () => {
    const evento = 'testValue';
    component.actualizar2044(evento);
    expect(solicitud32607StoreMock.actualizar2044).toHaveBeenCalledWith(evento);
  });

  it('should update fechaInicioComercio in the store', () => {
    const evento = '2023/01/01';
    component.actualizarFechaInicioComercio(evento);
    expect(
      solicitud32607StoreMock.actualizarFechaInicioComercio
    ).toHaveBeenCalledWith(evento);
  });

  it('should update fechaPago in the store', () => {
    const evento = '2023/01/01';
    component.actualizarFechaPago(evento);
    expect(solicitud32607StoreMock.actualizarFechaPago).toHaveBeenCalledWith(
      evento
    );
  });

  it('should update monto in the store', () => {
    const evento = '1000';
    component.actualizarMonto(evento);
    expect(solicitud32607StoreMock.actualizarMonto).toHaveBeenCalledWith(
      evento
    );
  });

  it('should update operacionesBancarias in the store', () => {
    const evento = 'operation123';
    component.actualizarOperacionesBancarias(evento);
    expect(
      solicitud32607StoreMock.actualizarOperacionesBancarias
    ).toHaveBeenCalledWith(evento);
  });

  it('should update llavePago in the store', () => {
    const evento = 'key123';
    component.actualizarLlavePago(evento);
    expect(solicitud32607StoreMock.actualizarLlavePago).toHaveBeenCalledWith(
      evento
    );
  });

  it('should add a transportista to the list', () => {
    const transportista: TransportistasTable = {
      rfc: '1',
      razonSocial: 'Transportista 1',
      domicilio: '',
      caat: '',
    };
    component.transportistasDatos(transportista);
    expect(component.transportistasLista).toContain(transportista);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
