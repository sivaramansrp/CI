import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { createInitialState, Tramite260303Store} from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { ConsultaioQuery, createConsultaInitialState } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';

describe('DatosDeLaSolicitudComponent', () => {
  let componente: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let certificadosLicenciasSvc: jest.Mocked<CertificadosLicenciasPermisosService>;
  let tramite260303Store: jest.Mocked<Tramite260303Store>;
  let tramite260303Query: jest.Mocked<Tramite260303Query>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;
  let modalService: jest.Mocked<BsModalService>;

  beforeEach(async () => {
    const certificadosLicenciasSvcMock: Partial<jest.Mocked<CertificadosLicenciasPermisosService>> = {
      getEstadoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Estado1' }] })),
      getScianDatos: jest.fn().mockReturnValue(of([{ clave: '001', descripcion: 'desc' }])),
      getClaveDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Clave1' }] })),
      getRegimenDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Regimen1' }] })),
      getMercanciasDatos: jest.fn().mockReturnValue(of([{ clasificacion: 'clas', especificar: 'esp' }])),
      getTipoDeProductoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'TipoProducto1' }] })),
      getPaisDeProcedenciaDatos: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Pais1' }])),
    };

    const tramite260303StoreMock: Partial<jest.Mocked<Tramite260303Store>> = {
      update: jest.fn(),
    };

    const tramite260303QueryMock: Partial<jest.Mocked<Tramite260303Query>> = {
      selectSolicitud$: of(createInitialState()),
    };

    const consultaioQueryMock: Partial<jest.Mocked<ConsultaioQuery>> = {
      selectConsultaioState$: of(createConsultaInitialState()),
    };

    const modalServiceMock: Partial<jest.Mocked<BsModalService>> = {
      show: jest.fn().mockReturnValue({} as BsModalRef),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        DatosDeLaSolicitudComponent,
        FormBuilder,
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: Tramite260303Store, useValue: tramite260303StoreMock },
        { provide: Tramite260303Query, useValue: tramite260303QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    componente = fixture.componentInstance;

    certificadosLicenciasSvc = TestBed.inject(CertificadosLicenciasPermisosService) as jest.Mocked<CertificadosLicenciasPermisosService>;
    tramite260303Store = TestBed.inject(Tramite260303Store) as jest.Mocked<Tramite260303Store>;
    tramite260303Query = TestBed.inject(Tramite260303Query) as jest.Mocked<Tramite260303Query>;
    consultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
    modalService = TestBed.inject(BsModalService) as jest.Mocked<BsModalService>;

    componente.solicitudState = createInitialState();
  });

  afterEach(() => {
    componente.ngOnDestroy();
  });

  it('debería crear la instancia del componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar los formularios y cargar datos al ejecutar ngOnInit', () => {
    jest.spyOn(componente, 'inicializarTablaYCatalogoDatos');
    jest.spyOn(componente, 'crearElstablecimientoForm');
    jest.spyOn(componente, 'crearRepresentanteLegalForm');
    jest.spyOn(componente, 'cerrarSCIANForm');
    jest.spyOn(componente, 'cerrarMercanciasForm');

    componente.ngOnInit();

    expect(componente.inicializarTablaYCatalogoDatos).toHaveBeenCalled();
    expect(componente.crearElstablecimientoForm).toHaveBeenCalled();
    expect(componente.crearRepresentanteLegalForm).toHaveBeenCalled();
    expect(componente.cerrarSCIANForm).toHaveBeenCalled();
    expect(componente.cerrarMercanciasForm).toHaveBeenCalled();
  });

  it('debería crear domicilioDeElstablecimientoForm con los valores iniciales correctos', () => {
    componente.crearElstablecimientoForm();

    const formulario = componente.domicilioDeElstablecimientoForm;

    expect(formulario).toBeDefined();
    expect(formulario.get('codigoPostal')?.value).toBe(createInitialState().codigoPostal);
    expect(formulario.get('codigoPostal')?.valid).toBe(false);
    expect(formulario.get('estado')?.value).toBe(createInitialState().estado);
    expect(formulario.get('correoElecronico')?.value).toBe(createInitialState().correoElecronico);
  });

  it('debería crear representanteLegalForm con los valores iniciales correctos', () => {
    componente.crearRepresentanteLegalForm();

    const formulario = componente.representanteLegalForm;

    expect(formulario).toBeDefined();
    expect(formulario.get('rfc')?.value).toBe(createInitialState().rfc);
    expect(formulario.get('nombreORazon')?.value).toBe(createInitialState().nombreORazon);
  });

  it('debería crear scianForm con los valores iniciales correctos', () => {
    componente.cerrarSCIANForm();

    const formulario = componente.scianForm;

    expect(formulario).toBeDefined();
    expect(formulario.get('clave')?.value).toBe(createInitialState().clave);
  });

  it('debería crear mercanciasForm con los valores iniciales correctos', () => {
    componente.cerrarMercanciasForm();

    const formulario = componente.mercanciasForm;

    expect(formulario).toBeDefined();
    expect(formulario.get('clave')?.value).toBe(createInitialState().clave);
    expect(formulario.get('cantidadUmt')?.value).toBe('');
  });

  it('debería obtener y asignar estadoCatalogo al llamar getEstadoCatalogDatos', done => {
    componente.getEstadoCatalogDatos();

    setTimeout(() => {
      expect(certificadosLicenciasSvc.getEstadoDatos).toHaveBeenCalled();
      expect(componente.estadoCatalogo.length).toBeGreaterThan(0);
      done();
    }, 0);
  });

  it('debería emitir next y complete del subject destroyNotifier$ en ngOnDestroy', () => {
    const spyNext = jest.spyOn(componente['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(componente['destroyNotifier$'], 'complete');

    componente.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
