import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesDeLaSolicitudComponent } from './datos-generales-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import {
  Solicitud31301State,
  Solicitud31301Store,
} from '../../estados/solicitud31301.store';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosGeneralesDeLaSolicitudComponent', () => {
  let component: DatosGeneralesDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosGeneralesDeLaSolicitudComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud31301StoreMock: jest.Mocked<Solicitud31301Store>;
  let solicitud31301QueryMock: jest.Mocked<Solicitud31301Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirDatosGeneralesOpcionDeRadio: jest.fn(),
      conseguirDatosGeneralesCatologo: jest.fn(),
      conseguirListaDeSubcontratistas: jest.fn(),
      conseguirRegimenAduanero: jest.fn(),
      conseguirMiembrosDeLaEmpresa: jest.fn(),
      conseguirTipoDeInversionDatos: jest.fn(),
      conseguirDomicilios: jest.fn(),
      conseguirDatosGeneralesDeLaSolicitudDatos: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    const solicitud31301StoreMock = {
      actualizarTipoDeGarantia: jest.fn(),
      actualizarModalidadDeLaGarantia: jest.fn(),
      actualizarTipoSector: jest.fn(),
      actualizarConcepto: jest.fn(),
      actualizar3500: jest.fn(),
      actualizarDatosGeneralesRFC: jest.fn(),
      actualizarTipoDeEndoso: jest.fn(),
    } as Partial<jest.Mocked<Solicitud31301Store>>;

    solicitud31301QueryMock = {
      selectSolicitud$: of({
        tipoDeEndoso: '',
        tipoDeGarantia: 0,
        modalidadDeLaGarantia: 0,
        tipoSector: '',
        concepto: 0,
        '3500': 0,
        '3501': 0,
        '3502': 0,
        datosGeneralesRFC: '',
        '3503': 0,
        '3504': 0,
        '3505': 0,
        '3506': 0,
        '3507': 0,
        '3508': 0,
        '3509': 0,
        '3511': 0,
        '3512': 0,
        '3513': 0,
        textoGenerico1: '',
        textoGenerico2: '',
        '3514': 0,
        '3515': 0,
        '3516': 0,
        textoGenerico3: '',
        '3517': 0,
        '3518': 0,
        '3519': 0,
        '3520': 0,
        tipoInversion: 0,
        cantidadInversion: '',
        descInversion: '',
        '3521': 0,
        '3522': 0,
        claveEnumeracionD0: '',
        claveEnumeracionD1: '',
        claveEnumeracionD2: '',
        claveEnumeracionD3: '',
        claveEnumeracionH: '',
        textoGenerico4: '',
        textoGenerico5: '',
        '3523': 0,
        '3528': 0,
        '3529': 0,
        textoGenerico6: '',
        textoGenerico7: '',
        '3530': 0,
        '3531': 0,
        textoGenerico9: '',
        textoGenerico10: 0,
        textoGenerico11: 0,
        textoGenerico12: 0,
        textoGenerico13: 0,
        textoGenerico14: 0,
        textoGenerico15: 0,
        textoGenerico16: 0,
        textoGenerico17: 0,
        textoGenerico18: 0,
        textoGenerico19: 0,
        textoGenerico20: 0,
        textoGenerico21: 0,
        textoGenerico22: 0,
        textoGenerico23: 0,
        textoGenerico24: 0,
        alerta1: false,
        alerta2: false,
        polizaDeFianzaActual: 1,
        numeroFolio: '',
        rfcInstitucion: '',
        fechaExpedicion: '',
        fechaInicioVigenciaNo: '',
        fechaFinVigenciaNo: '',
        fechaInicioVigencia: '',
        fechaFinVigencia: '',
        importeTotal: '',
        razonSocialAnterior: '',
        razonSocialActual: '',
        rfc: '',
        curp: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
      }),
    } as jest.Mocked<Solicitud31301Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        DatosGeneralesDeLaSolicitudComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31301Store, useValue: solicitud31301StoreMock },
        { provide: Solicitud31301Query, useValue: solicitud31301QueryMock },
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
    expect(component.datosGeneralesForm.controls['tipoDeEndoso']).toBeDefined();
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
              label: 'Garantía revolvente',
              value: 1,
            },
            {
              label: 'Garantía individual',
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
              descripcion: 'Fabricación de maquinaria y equipo',
            },
            {
              id: 2,
              descripcion: 'Fabricación de maquinaria y equipo - 1',
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
      })
    );
    component.conseguirDatosGeneralesCatologo();
    expect(
      solicitudServiceMock.conseguirDatosGeneralesCatologo
    ).toHaveBeenCalled();
  });

  it('should call conseguirListaDeSubcontratistas on initialization', () => {
    solicitudServiceMock.conseguirListaDeSubcontratistas.mockReturnValue(
      of([])
    );
    component.conseguirListaDeSubcontratistas();
    expect(
      solicitudServiceMock.conseguirListaDeSubcontratistas
    ).toHaveBeenCalled();
  });

  it('should call conseguirRegimenAduanero on initialization', () => {
    solicitudServiceMock.conseguirRegimenAduanero.mockReturnValue(of([]));
    component.conseguirRegimenAduanero();
    expect(solicitudServiceMock.conseguirRegimenAduanero).toHaveBeenCalled();
  });

  it('should call conseguirMiembrosDeLaEmpresa on initialization', () => {
    solicitudServiceMock.conseguirMiembrosDeLaEmpresa.mockReturnValue(of([]));
    component.conseguirMiembrosDeLaEmpresa();
    expect(
      solicitudServiceMock.conseguirMiembrosDeLaEmpresa
    ).toHaveBeenCalled();
  });

  it('should call conseguirTipoDeInversionDatos on initialization', () => {
    solicitudServiceMock.conseguirTipoDeInversionDatos.mockReturnValue(of([]));
    component.conseguirTipoDeInversionDatos();
    expect(
      solicitudServiceMock.conseguirTipoDeInversionDatos
    ).toHaveBeenCalled();
  });

  it('should call conseguirDomicilios on initialization', () => {
    solicitudServiceMock.conseguirDomicilios.mockReturnValue(of([]));
    component.conseguirDomicilios();
    expect(solicitudServiceMock.conseguirDomicilios).toHaveBeenCalled();
  });

  it('should call conseguirDatosGeneralesDeLaSolicitudDatos on initialization', () => {
    solicitudServiceMock.conseguirDatosGeneralesDeLaSolicitudDatos.mockReturnValue(
      of({
        tipoDeEndoso: '',
        tipoDeGarantia: 1,
        modalidadDeLaGarantia: 2,
        tipoSector: '1',
        concepto: 1,
        '3500': 1,
        '3501': 2,
        '3502': 1,
        datosGeneralesRFC: '',
        '3503': 2,
        '3504': 1,
        '3505': 2,
        '3506': 1,
        '3507': 1,
        '3508': 1,
        '3509': 2,
        '3511': 2,
        '3512': 2,
        '3513': 2,
        textoGenerico1: 'Nombre del sistema o datos para su identificación',
        textoGenerico2: 'Lugar de radicación',
        '3514': 2,
        '3515': 2,
        '3516': 2,
        textoGenerico3:
          'Opinión positiva vigente del cumplimiento de obligaciones fiscales de la solicitante, los socios, accionistas, representante legal con facultad para actos',
        '3517': 1,
        '3518': 2,
        '3519': 1,
        '3520': 1,
        tipoInversion: 1,
        cantidadInversion: '',
        descInversion: '',
        '3521': 1,
        '3522': 1,
        claveEnumeracionD0:
          'Importación temporal para elaboración, transformación o reparación en programas de maquila o de exportación (IMMEX)',
        claveEnumeracionD1: '',
        claveEnumeracionD2: '',
        claveEnumeracionD3: '',
        claveEnumeracionH: '',
        textoGenerico4: '3213',
        textoGenerico5: '3213123',
        '3523': 1,
        '3528': 1,
        '3529': 1,
        textoGenerico6: '3213123',
        textoGenerico7: '3213123',
        '3530': 1,
        '3531': 1,
        textoGenerico9: '',
        textoGenerico10: 10,
        textoGenerico11: 10,
        textoGenerico12: 10,
        textoGenerico13: 10,
        textoGenerico14: 10,
        textoGenerico15: 10,
        textoGenerico16: 10,
        textoGenerico17: 10,
        textoGenerico18: 10,
        textoGenerico19: 10,
        textoGenerico20: 10,
        textoGenerico21: 10,
        textoGenerico22: 40,
        textoGenerico23: 40,
        textoGenerico24: 40,
        alerta1: false,
        alerta2: false,
      })
    );
    component.conseguirDatosGeneralesDeLaSolicitudDatos();
    expect(
      solicitudServiceMock.conseguirDatosGeneralesDeLaSolicitudDatos
    ).toHaveBeenCalled();
  });

  it('should emit tipoDeEndosoChanges when getTipoDeEndoso is called', () => {
    jest.spyOn(component.tipoDeEndosoChanges, 'emit');
    const testValue = 'test';
    component.getTipoDeEndoso(testValue);
    expect(component.tipoDeEndosoChanges.emit).toHaveBeenCalledWith(testValue);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
