import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesDeLaSolicitudComponent } from './datos-generales-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputFechaComponent,
  InputRadioComponent,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { ModificarImmexProgramComponent } from '../modificar-immex-program/modificar-immex-program.component';
import { AgregarImmexProgramComponent } from '../agregar-immex-program/agregar-immex-program.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosGeneralesDeLaSolicitudComponent', () => {
  let component: DatosGeneralesDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosGeneralesDeLaSolicitudComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud31101StoreMock: jest.Mocked<Solicitud31101Store>;
  let solicitud31101QueryMock: jest.Mocked<Solicitud31101Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirDatosGeneralesOpcionDeRadio: jest.fn(() =>
        of({
          tipoDeEndoso: {
            radioOptions: [
              {
                label: 'Aumento de monto',
                value: 1,
              },
              {
                label: 'Aumento de monto y renovación/ampliación de vigencia',
                value: 2,
              },
              {
                label: 'Modificación de denominación o razórrsocial',
                value: 3,
              },
              {
                label: 'Renovación/ampliación de vigencia',
                value: 4,
              },
            ],
            isRequired: true,
          },
          tipoDeGarantia: {
            radioOptions: [
              {
                label: 'Fianza',
                value: 1,
              },
              {
                label: 'Carta de crédito',
                value: 2,
              },
            ],
            isRequired: true,
          },
          modalidadDeLaGarantia: {
            radioOptions: [
              {
                label: 'Póliza revolvente',
                value: 1,
              },
              {
                label: 'Póliza individual',
                value: 2,
              },
            ],
            isRequired: true,
          },
          tipoSector: {
            radioOptions: [
              {
                label: 'Sector productivo',
                value: 1,
              },
              {
                label: 'Sector servicio',
                value: 2,
              },
            ],
            isRequired: true,
          },
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
        })
      ),
      conseguirDatosGeneralesCatologo: jest.fn(() =>
        of({
          concepto: {
            labelNombre: 'Concepto',
            required: false,
            primerOpcion: 'Seleccione un valor',
            catalogos: [
              {
                id: 1,
                descripcion: 'Reparación, re-trabajo o mantenimiento de',
              },
              {
                id: 2,
                descripcion: 'Reparación, re-trabajo o mantenimiento de - 1',
              },
            ],
          },
          tipoDeInversion: {
            labelNombre: 'Tipo de inversión',
            required: true,
            primerOpcion: 'Selecciona un tipo',
            catalogos: [
              {
                id: 1,
                descripcion: 'Test',
              },
              {
                id: 2,
                descripcion: 'Test - 1',
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
          modalidadDelProgramaIMMEX: {
            labelNombre:
              'Seleccione el numero y modalidad del programa I M M E X',
            required: false,
            primerOpcion: 'Selecciona un tipo',
            catalogos: [
              {
                id: 1,
                descripcion: 'Domicilios registrados',
              },
              {
                id: 2,
                descripcion: '192022 - Autorización Programa Nuevo Industrial',
              },
            ],
          },
          tipoDeInstalacion: {
            labelNombre: 'Tipo de instalación',
            required: true,
            primerOpcion: 'Selecciona un tipo de instalación',
            catalogos: [
              {
                id: 1,
                descripcion: 'Planta Productiva',
              },
              {
                id: 2,
                descripcion: 'Planta Productiva -1',
              },
            ],
          },
          entidadFederativa: {
            labelNombre: '',
            required: true,
            primerOpcion: 'Selecciona un tipo',
            catalogos: [
              {
                id: 1,
                descripcion: 'AGUASCALIENTES',
              },
              {
                id: 2,
                descripcion: 'AGUASCALIENTES -1',
              },
            ],
          },
        })
      ),
      conseguirListaDeSubcontratistas: jest.fn(() =>
        of([
          {
            rfc: 'MAHA790703QW5',
            razonSocial: 'ARTURO MATA HERNANDEZ',
          },
        ])
      ),
      conseguirRegimenAduanero: jest.fn(() =>
        of([
          'Importación temporal para elaboración, transformación o reparación en programas de maquila o de exportación (IMMEX)',
          'Depósito fiscal para someterse al proceso de ensamble y fabricación de vehículos a empresas de la industria automotriz terminal',
          'Elaboración, transformación o reparación en recinto fiscalizado',
          'Recinto fiscalizado estratégico',
        ])
      ),
      conseguirMiembrosDeLaEmpresa: jest.fn(() =>
        of([
          {
            tipoPersonaMuestra: 'Física',
            nombreCompleto: 'Juan Pérez',
            rfc: 'PEJJ800101XXX',
            caracterDe: 'Representante Legal',
            nacionalidad: 'Mexicana',
            nombreEmpresa: 'Tecnologías Avanzadas SA de CV',
            tributarMexico: 'Sí',
            razonSocial: 'Tecnologías Avanzadas SA de CV',
          },
        ])
      ),
      conseguirTipoDeInversionDatos: jest.fn(() =>
        of([
          {
            idRegistro: 'INV12345',
            tipoInversion: 'Bienes Inmuebles',
            descripcion: 'Departamento en Ciudad de México',
            valor: '2500000',
            cveTipoInversion: 'BI01',
          },
        ])
      ),
      conseguirDomicilios: jest.fn(() =>
        of([
          {
            instalacionPrincipal: 'Planta Norte',
            cveTipoInstalacion: '01',
            tipoInstalacion: 'Fábrica',
            cveEntidadFederativa: '09',
            entidadFederativa: 'Ciudad de México',
            cveDelegacionMunicipio: '010',
            municipioDelegacion: 'Gustavo A. Madero',
            direccion: 'Av. Central 123',
            codigoPostal: '07760',
            registroSESAT: 'SESAT-456789',
            procesoProductivo: 'Fabricación de electrónicos',
            fechaModificacion: '2025-04-18',
            cveEstatus: 'A1',
            estatus: 'Activo',
            noExterior: '123',
            noInterior: '5B',
            cveColonia: '025',
            calle: 'Av. Central',
            descCol: 'Colonia Industrial',
            idRecinto: 'RC-998877',
            numFolioAcuse: 'FA-20250418-01',
            observaciones: 'Instalación con verificación reciente.',
          },
        ])
      ),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud31101StoreMock = {
      actualizarTipoDeGarantia: jest.fn(() => of(1)),
      actualizarModalidadDeLaGarantia: jest.fn(() => of(1)),
      actualizarTipoSector: jest.fn(() => of(1)),
      actualizarConcepto: jest.fn(() => of(1)),
      actualizarTextoGenerico22: jest.fn(() => of(10)),
      actualizarTextoGenerico23: jest.fn(() => of(10)),
      actualizarTextoGenerico24: jest.fn(() => of(10)),
    } as unknown as jest.Mocked<Solicitud31101Store>;

    solicitud31101QueryMock = {
      selectSolicitud$: of({
        tipoDeGarantia: 1,
        modalidadDeLaGarantia: 1,
        tipoSector: '1',
        concepto: 'test',
        '3500': 1,
        '3501': 1,
        '3502': 1,
        datosGeneralesRFC: 'test',
        '3503': 1,
        '3504': 1,
        '3505': 1,
        '3506': 1,
        '3507': 1,
        '3508': 1,
        '3509': 1,
        '3511': 1,
        '3512': 1,
        '3513': 1,
        textoGenerico1: 'test',
        textoGenerico2: 'test',
        '3514': 1,
        '3515': 1,
        '3516': 1,
        textoGenerico3: 'test',
        '3517': 1,
        '3518': 1,
        '3519': 1,
        '3520': 1,
        tipoInversion: 1,
        cantidadInversion: 'test',
        descInversion: 'test',
        '3521': 1,
        '3522': 1,
        claveEnumeracionD0: 'true',
        claveEnumeracionD1: 'true',
        claveEnumeracionD2: 'true',
        claveEnumeracionD3: 'true',
        claveEnumeracionH: '',
        modalidadProgramaImmex: 'Test',
        textoGenerico4: 'test',
        textoGenerico5: 'test',
        '3523': 1,
        '3524': 1,
        fechaFinVigencia1: '02/10/2024',
        numeroAutorizacion1: 'Test',
        '3525': 1,
        '3526': 1,
        fechaFinVigencia2: '02/10/2024',
        numeroAutorizacion2: 'test',
        '3527': 1,
        '3528': 1,
        '3529': 1,
        textoGenerico6: 'test',
        textoGenerico7: 'test',
        '3530': 1,
        '3531': 1,
        textoGenerico9: '10',
        textoGenerico10: '10',
        textoGenerico11: '10',
        textoGenerico12: '10',
        textoGenerico13: '10',
        textoGenerico14: '10',
        textoGenerico15: '10',
        textoGenerico16: '10',
        textoGenerico17: '10',
        textoGenerico18: '10',
        textoGenerico19: '10',
        textoGenerico20: '10',
        textoGenerico21: '10',
        textoGenerico22: '10',
        textoGenerico23: '10',
        textoGenerico24: '10',
        alerta2: false,
        polizaDeFianzaActual: 1,
        numeroFolio: 'test',
        rfcInstitucion: 'test',
        fechaExpedicion: 'test',
        fechaInicioVigenciaNo: 'test',
        fechaFinVigenciaNo: 'test',
        fechaInicioVigencia: 'test',
        fechaFinVigencia: 'test',
        importeTotal: 'test',
        razonSocialAnterior: 'test',
        razonSocialActual: 'test',
        rfc: 'test',
        curp: 'test',
        nombre: 'test',
        apellidoPaterno: 'test',
        apellidoMaterno: 'test',
        miembroCaracterDe: 'test',
        miembroTributarMexico: 1,
        miembroNacionalidad: 'test',
        miembroRfc: 'test',
        miembroRegistroFederal: 'test',
        miembroNombreCompleto: 'test',
        miembroTipoPersonaMuestra: 'test',
        miembroNombre: 'test',
        miembroApellidoPaterno: 'test',
        miembroApellidoMaterno: 'test',
        miembroNombreEmpresa: 'test',
        entidadFederativa: 1,
        instalacionesPrincipales: 1,
        municipio: 'test',
        tipoDeInstalacion: 1,
        federativa: 'test',
        registroSE: 'test',
        desceripe: 'test',
        codigoPostal: 'test',
        procesoProductivo: 1,
      }),
    } as unknown as jest.Mocked<Solicitud31101Query>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DatosGeneralesDeLaSolicitudComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        NotificacionesComponent,
        MiembroDeLaEmpresaComponent,
        ModificarImmexProgramComponent,
        AgregarImmexProgramComponent,
        InputFechaComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31101Store, useValue: solicitud31101StoreMock },
        { provide: Solicitud31101Query, useValue: solicitud31101QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosGeneralesForm).toBeDefined();
  });

  it('should call conseguirDatosGeneralesOpcionDeRadio on initialization', () => {
    solicitudServiceMock.conseguirDatosGeneralesOpcionDeRadio.mockReturnValue(
      of({
        tipoDeEndoso: {
          radioOptions: [
            {
              label: 'Aumento de monto',
              value: 1,
            },
            {
              label: 'Aumento de monto y renovación/ampliación de vigencia',
              value: 2,
            },
            {
              label: 'Modificación de denominación o razórrsocial',
              value: 3,
            },
            {
              label: 'Renovación/ampliación de vigencia',
              value: 4,
            },
          ],
          isRequired: true,
        },
        tipoDeGarantia: {
          radioOptions: [
            {
              label: 'Fianza',
              value: 1,
            },
            {
              label: 'Carta de crédito',
              value: 2,
            },
          ],
          isRequired: true,
        },
        modalidadDeLaGarantia: {
          radioOptions: [
            {
              label: 'Póliza revolvente',
              value: 1,
            },
            {
              label: 'Póliza individual',
              value: 2,
            },
          ],
          isRequired: true,
        },
        tipoSector: {
          radioOptions: [
            {
              label: 'Sector productivo',
              value: 1,
            },
            {
              label: 'Sector servicio',
              value: 2,
            },
          ],
          isRequired: true,
        },
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
      })
    );
    solicitudServiceMock.conseguirDatosGeneralesOpcionDeRadio();
    expect(
      solicitudServiceMock.conseguirDatosGeneralesOpcionDeRadio
    ).toHaveBeenCalled();
  });

  it('should call conseguirDatosGeneralesCatologo on initialization', () => {
    solicitudServiceMock.conseguirDatosGeneralesCatologo.mockReturnValue(
      of({
        concepto: {
          labelNombre: 'Concepto',
          required: false,
          primerOpcion: 'Seleccione un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Reparación, re-trabajo o mantenimiento de',
            },
            {
              id: 2,
              descripcion: 'Reparación, re-trabajo o mantenimiento de - 1',
            },
          ],
        },
        tipoDeInversion: {
          labelNombre: 'Tipo de inversión',
          required: true,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test',
            },
            {
              id: 2,
              descripcion: 'Test - 1',
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
        modalidadDelProgramaIMMEX: {
          labelNombre:
            'Seleccione el numero y modalidad del programa I M M E X',
          required: false,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'Domicilios registrados',
            },
            {
              id: 2,
              descripcion: '192022 - Autorización Programa Nuevo Industrial',
            },
          ],
        },
        tipoDeInstalacion: {
          labelNombre: 'Tipo de instalación',
          required: true,
          primerOpcion: 'Selecciona un tipo de instalación',
          catalogos: [
            {
              id: 1,
              descripcion: 'Planta Productiva',
            },
            {
              id: 2,
              descripcion: 'Planta Productiva -1',
            },
          ],
        },
        entidadFederativa: {
          labelNombre: '',
          required: true,
          primerOpcion: 'Selecciona un tipo',
          catalogos: [
            {
              id: 1,
              descripcion: 'AGUASCALIENTES',
            },
            {
              id: 2,
              descripcion: 'AGUASCALIENTES -1',
            },
          ],
        },
      })
    );
    solicitudServiceMock.conseguirDatosGeneralesCatologo();

    expect(
      solicitudServiceMock.conseguirDatosGeneralesCatologo
    ).toHaveBeenCalled();
  });

  it('should call actualizarTipoDeGarantia when updating tipoDeGarantia', () => {
    const mockEvent = 'test';
    component.actualizarTipoDeGarantia(mockEvent);
    expect(
      solicitud31101StoreMock.actualizarTipoDeGarantia
    ).toHaveBeenCalledWith(mockEvent);
  });

  it('should calculate valor comercial correctly', () => {
    component.datosGeneralesForm.patchValue({
      textoGenerico10: '10',
      textoGenerico13: '20',
      textoGenerico16: '30',
      textoGenerico19: '40',
    });
    component.calcularValorComercial();
    expect(
      solicitud31101StoreMock.actualizarTextoGenerico22
    ).toHaveBeenCalledWith(100);
  });

  it('should calculate valor aduana correctly', () => {
    component.datosGeneralesForm.patchValue({
      textoGenerico11: '15',
      textoGenerico14: '25',
      textoGenerico17: '35',
      textoGenerico20: '45',
    });
    component.calcularValorAduana();
    expect(
      solicitud31101StoreMock.actualizarTextoGenerico23
    ).toHaveBeenCalledWith(120);
  });

  it('should calculate valor porcentaje correctly', () => {
    component.datosGeneralesForm.patchValue({
      textoGenerico12: '5',
      textoGenerico15: '10',
      textoGenerico18: '15',
      textoGenerico21: '20',
    });
    component.calcularValorPorcentaje();
    expect(
      solicitud31101StoreMock.actualizarTextoGenerico24
    ).toHaveBeenCalledWith(50);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
