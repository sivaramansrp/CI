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
      conseguirRecibirNotificaciones: jest.fn(),
      conseguirModificacionDenominacionRazonSocial: jest.fn(),
      conseguirNombreInstitucionCatalogo: jest.fn(),
      conseguirDatosPorGarantia: jest.fn(),
      conseguirDatosGeneralesOpcionDeRadio: jest.fn(),
      conseguirDatosGeneralesCatologo: jest.fn(),
      conseguirListaDeSubcontratistas: jest.fn(),
      conseguirRegimenAduanero: jest.fn(),
      conseguirMiembrosDeLaEmpresa: jest.fn(),
      conseguirTipoDeInversionDatos: jest.fn(),
      conseguirDomicilios: jest.fn(),
      conseguirEntidadFederativaDatos: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud31101StoreMock = {
      actualizarTipoDeGarantia: jest.fn(),
      actualizarModalidadDeLaGarantia: jest.fn(),
      actualizarTipoSector: jest.fn(),
      actualizarConcepto: jest.fn(),
      actualizarTextoGenerico22: jest.fn(),
      actualizarTextoGenerico23: jest.fn(),
      actualizarTextoGenerico24: jest.fn(),
    } as unknown as jest.Mocked<Solicitud31101Store>;

    solicitud31101QueryMock = {
      selectSolicitud$: of({}),
    } as jest.Mocked<Solicitud31101Query>;

    await TestBed.configureTestingModule({
      declarations: [],
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
        HttpClientTestingModule,
      ],
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
    // fixture.detectChanges();
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
    component.conseguirDatosGeneralesOpcionDeRadio();
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
    component.conseguirDatosGeneralesCatologo();
  });

  it('should call conseguirListaDeSubcontratistas on initialization', () => {
    solicitudServiceMock.conseguirListaDeSubcontratistas.mockReturnValue(
      of([])
    );
    component.conseguirListaDeSubcontratistas();
  });

  it('should call conseguirRegimenAduanero on initialization', () => {
    solicitudServiceMock.conseguirRegimenAduanero.mockReturnValue(of([]));
    component.conseguirRegimenAduanero();
  });

  it('should call conseguirTipoDeInversionDatos on initialization', () => {
    solicitudServiceMock.conseguirTipoDeInversionDatos.mockReturnValue(
      of([
        {
          idRegistro: 'INV12345',
          tipoInversion: 'Bienes Inmuebles',
          descripcion: 'Departamento en Ciudad de México',
          valor: '2500000',
          cveTipoInversion: 'BI01',
        },
      ])
    );
    component.conseguirTipoDeInversionDatos();
  });

  it('should call conseguirDomicilios on initialization', () => {
    solicitudServiceMock.conseguirDomicilios.mockReturnValue(
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
    );
    component.conseguirDomicilios();
  });

  it('should update tipoDeGarantia when actualizarTipoDeGarantia is called', () => {
    const event = 'test';
    component.actualizarTipoDeGarantia(event);
    expect(
      solicitud31101StoreMock.actualizarTipoDeGarantia
    ).toHaveBeenCalledWith(event);
  });

  it('should calculate valor comercial correctly', () => {
    component.ngOnInit();
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
    component.ngOnInit();
    component.datosGeneralesForm.patchValue({
      textoGenerico11: '5',
      textoGenerico14: '15',
      textoGenerico17: '25',
      textoGenerico20: '35',
    });
    component.calcularValorAduana();
    expect(
      solicitud31101StoreMock.actualizarTextoGenerico23
    ).toHaveBeenCalledWith(80);
  });

  it('should calculate valor porcentaje correctly', () => {
    component.ngOnInit();
    component.datosGeneralesForm.patchValue({
      textoGenerico12: '2',
      textoGenerico15: '4',
      textoGenerico18: '6',
      textoGenerico21: '8',
    });
    component.calcularValorPorcentaje();
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
