import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of} from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Tramite260303Store, createInitialState } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { ConsultaioQuery, createConsultaInitialState } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PagoDeDerechosComponent', () => {
  let componente: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let certificadosSvc: jest.Mocked<CertificadosLicenciasPermisosService>;
  let tramiteQuery: jest.Mocked<Tramite260303Query>;
  let tramiteStore: jest.Mocked<Tramite260303Store>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    const certificadosMock: Partial<jest.Mocked<CertificadosLicenciasPermisosService>> = {
      getBancoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Banco1' }] })),
    };

    const tramiteQueryMock: Partial<jest.Mocked<Tramite260303Query>> = {
      selectSolicitud$: of(createInitialState()),
    };

    const tramiteStoreMock: Partial<jest.Mocked<Tramite260303Store>> = {
      SetFechaDePago: jest.fn(),
    };

    const consultaioQueryMock: Partial<jest.Mocked<ConsultaioQuery>> = {
      selectConsultaioState$: of(createConsultaInitialState()),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        PagoDeDerechosComponent,
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosMock },
        { provide: Tramite260303Query, useValue: tramiteQueryMock },
        { provide: Tramite260303Store, useValue: tramiteStoreMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    componente = fixture.componentInstance;

    certificadosSvc = TestBed.inject(CertificadosLicenciasPermisosService) as jest.Mocked<CertificadosLicenciasPermisosService>;
    tramiteQuery = TestBed.inject(Tramite260303Query) as jest.Mocked<Tramite260303Query>;
    tramiteStore = TestBed.inject(Tramite260303Store) as jest.Mocked<Tramite260303Store>;
    consultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
  });

  afterEach(() => {
    componente.ngOnDestroy();
  });

  it('debería crear la instancia del componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario con valores del estado', () => {
    componente.solicitudState = createInitialState();
    componente.cerrarPagoDerechosForm();

    const formulario = componente.pagoDerechosForm;

    expect(formulario).toBeDefined();
    expect(formulario.get('claveDeReferencia')?.value).toBe(createInitialState().claveDeReferencia);
    expect(formulario.get('cadenaDaLaDependencia')?.value).toBe(createInitialState().cadenaDaLaDependencia);
    expect(formulario.get('fechaDePago')?.value).toBe(createInitialState().fechaDePago);
  });

  it('debería obtener y asignar bancoCatalogo al llamar getBancoCatalogDatos', done => {
    componente.getBancoCatalogDatos();

    setTimeout(() => {
      expect(certificadosSvc.getBancoDatos).toHaveBeenCalled();
      expect(componente.bancoCatalogo.length).toBeGreaterThan(0);
      done();
    }, 0);
  });

  it('debería actualizar fechaDePago y llamar a SetFechaDePago del store', () => {
    componente.solicitudState = createInitialState();
    componente.cerrarPagoDerechosForm();

    const NUEVA_FECHA = '2025-05-01';
    componente.cambioFechaFinal(NUEVA_FECHA);

    expect(componente.pagoDerechosForm.get('fechaDePago')?.value).toBe(NUEVA_FECHA);
    expect(tramiteStore.SetFechaDePago).toHaveBeenCalledWith(NUEVA_FECHA);
  });

  it('debería deshabilitar el formulario si es de solo lectura', () => {
    componente.solicitudState = createInitialState();
    componente.esFormularioSoloLectura = true;
    componente.cerrarPagoDerechosForm();
    componente.guardarDatosFormulario();

    expect(componente.pagoDerechosForm.disabled).toBe(true);
  });

  it('debería habilitar el formulario si no es de solo lectura', () => {
    componente.solicitudState = createInitialState();
    componente.esFormularioSoloLectura = false;
    componente.cerrarPagoDerechosForm();
    componente.guardarDatosFormulario();

    expect(componente.pagoDerechosForm.enabled).toBe(true);
  });

  it('debería emitir next y complete del subject destroyNotifier$ en ngOnDestroy', () => {
    const spyNext = jest.spyOn(componente['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(componente['destroyNotifier$'], 'complete');

    componente.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
