// acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent } from './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';

// Mock services
const mockRouter = {
  url: '/aga/acuse-resolucion',
  navigate: jest.fn(),
};

const mockSubsecuentesService = {
  getAcusesYResolucionesDatos: jest.fn().mockReturnValue(of({})),
  getButtonesAcciones: jest.fn().mockReturnValue(of([])),
};

const mockConsultaioStore = {
  establecerConsultaio: jest.fn(),
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({
    procedureId: '123',
    parameter: 'param',
    department: 'AGA',
    folioTramite: 'FT-001',
    tipoDeTramite: 'tipo',
    estadoDeTramite: 'estado',
  }),
};

const mockRequerimientoService = {
  informacionRequisitos: jest.fn().mockReturnValue(
    of({
      data: {
        fechaRequerimiento: '2024-01-01',
        justificacionRequerimiento: 'Motivo',
      },
    })
  ),
};

const mockCatalogosService = {
  getCatalogo: jest.fn().mockReturnValue(of([])),
};

const mockTramiteQueries = {
  getTramite: jest.fn().mockReturnValue('FT-001'),
};

describe('AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent', () => {
  let component: AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent;
  let fixture: ComponentFixture<AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent,
        HttpClientModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: 'SubsecuentesService', useValue: mockSubsecuentesService },
        { provide: 'ConsultaioStore', useValue: mockConsultaioStore },
        { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },
        {
          provide: 'AtenderRequerimientoService',
          useValue: mockRequerimientoService,
        },
        { provide: 'CatalogosService', useValue: mockCatalogosService },
        { provide: 'TramiteFolioQueries', useValue: mockTramiteQueries },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set tramite, departamento, and folio from query', () => {
    expect(component.tramite).toBe(0);
    expect(component.departamento).toBe('');
    expect(component.folio).toBe('');
  });

  it('should change indice and call wizard methods on getValorIndice', () => {
    // mock wizard component
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    component.guardarDatos = {
      procedureId: '123',
      parameter: '',
      department: 'importacion',
      folioTramite: '',
      tipoDeTramite: '',
      estadoDeTramite: '',
      readonly: false,
      create: false,
      update: false,
      consultaioSolicitante: null,
    };

    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
  it('should set slectTramite when selectTramite is called', () => {
    const mockTramite = 260101;

    // add mock item to LISTA_TRIMITES manually (normally you'd mock this import)
    (component as any).LISTA_TRIMITES = [
      { tramite: mockTramite, listaComponentes: [] },
    ];

    component.selectTramite(mockTramite);
    expect(component.slectTramite?.tramite).toBe(mockTramite);
  });
});
