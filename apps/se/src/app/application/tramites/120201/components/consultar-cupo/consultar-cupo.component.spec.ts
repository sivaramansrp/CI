import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarCupoComponent } from './consultar-cupo.component';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CuposService } from '../../services/cupos/cupos.service';
import { Tramite120201Store } from '../../../../estados/tramites/tramite120201.store';
import { Tramite120201Query } from '../../../../estados/queries/tramite120201.query';
import { HttpClientModule } from '@angular/common/http';

describe('ConsultarCupoComponent', () => {
  let component: ConsultarCupoComponent;
  let fixture: ComponentFixture<ConsultarCupoComponent>;
  let cuposServiceMock: any;
  let tramite120201StoreMock: any;
  let tramite120201QueryMock: any;

  beforeEach(async () => {
    cuposServiceMock = {
      getTratadoCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getRegimenClasificacionCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getPaisDestinoCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getEstadoCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getRepresentacionFederalCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [] })),
    };

    tramite120201StoreMock = {
      setTratado: jest.fn(),
      setRegimenClasificacion: jest.fn(),
      setCvePaisDestino: jest.fn(),
      setEstado: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setCuerpoTablaDatos: jest.fn(),
      setMostrarDetallesCupo: jest.fn(),
    };

    tramite120201QueryMock = {
      selectSeccionState$: of({
        cuerpoTablaDatos: [],
        mostrarDetallesCupo: false,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ConsultarCupoComponent, 
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        FormBuilder,
        { provide: CuposService, useValue: cuposServiceMock },
        { provide: Tramite120201Store, useValue: tramite120201StoreMock },
        { provide: Tramite120201Query, useValue: tramite120201QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize catalogs and subscribe to state changes', () => {
      const inicializaCatalogosSpy = jest.spyOn(component, 'inicializaCatalogos');
      const crearCupoConsultarFormSpy = jest.spyOn(component, 'crearCupoConsultarForm');

      component.ngOnInit();

      expect(inicializaCatalogosSpy).toHaveBeenCalled();
      expect(crearCupoConsultarFormSpy).toHaveBeenCalled();
      expect(component.cuposState).toEqual({
        cuerpoTablaDatos: [],
        mostrarDetallesCupo: false,
      });
    });
  });

  describe('inicializaCatalogos', () => {
    it('should fetch and set catalogs', () => {
      component.inicializaCatalogos();

      expect(cuposServiceMock.getTratadoCatalogo).toHaveBeenCalled();
      expect(cuposServiceMock.getRegimenClasificacionCatalogo).toHaveBeenCalled();
      expect(cuposServiceMock.getPaisDestinoCatalogo).toHaveBeenCalled();
      expect(cuposServiceMock.getEstadoCatalogo).toHaveBeenCalled();
      expect(cuposServiceMock.getRepresentacionFederalCatalogo).toHaveBeenCalled();
    });
  });

  describe('crearCupoConsultarForm', () => {
    it('should create the form with default values', () => {
      component.crearCupoConsultarForm();

      expect(component.cupoConsultarForm).toBeDefined();
      expect(component.cupoConsultarForm.get('cuotaInstrumentoForm')).toBeTruthy();
      expect(component.cupoConsultarForm.get('cupoDescripcionForm')).toBeTruthy();
      expect(component.cupoConsultarForm.get('representacionFederalForm')).toBeTruthy();
      expect(component.cupoConsultarForm.get('bienFinalForm')).toBeTruthy();
    });
  });

  describe('buscar', () => {
    it('should fetch table data and update cuerpoTabla', () => {
      const mockData = [
        { cveTratado: 'T1', cveRegimenClasificacion: 'R1', cvePaisDestino: 'P1' },
      ];
      cuposServiceMock.obtenerTablaDatos.mockReturnValue(of({ data: mockData }));

      component.buscar();

      expect(cuposServiceMock.obtenerTablaDatos).toHaveBeenCalled();
      expect(component.cuerpoTabla).toEqual(mockData);
      expect(tramite120201StoreMock.setCuerpoTablaDatos).toHaveBeenCalledWith(mockData);
    });
  });

  describe('onFilaClicHandler', () => {
    it('should update cupoDescripcionForm and mostrarDetallesCupo', () => {
      const mockRow = {
        fraccionArancelaria: 'FA1',
        productoDescripcion: 'PD1',
        cveTratado: 'T1',
        subProductoClasificacion: 'SP1',
        asignacionMecanismo: 'AM1',
        categoriaTextil: 'CT1',
        cveRegimenClasificacion: 'RC1',
        categoriaTextilDescripcion: 'CTD1',
        cvePaisDestino: 'P1',
        unidad: 'U1',
        conversionFactor: 43,
        fechaInicioVigencia: '2025-01-01',
        fechaFinVigencia: '2025-12-31',
        montoDisponible: '1000'
      };

      component.onFilaClicHandler(mockRow);

      expect(component.cupoDescripcionForm.value).toEqual({
        fraccionArancelaria: 'FA1',
        productoDescripcion: 'PD1',
        cveTratado: 'T1',
        subproductoClasificacion: 'SP1',
        asignacionMecanismo: 'AM1',
        categoriaTextil: 'CT1',
        cveRegimenClasificacion: 'RC1',
        categoriaTextilDescripcion: 'CTD1',
        paisDestino: 'P1',
        unidad: 'U1',
        conversionFactor: 43,
        fechaInicio: '2025-01-01',
        fechaFinal: '2025-12-31',
        montoDisponible: '1000'
      });
      expect(component.mostrarDetallesCupo).toBe(true);
      expect(tramite120201StoreMock.setMostrarDetallesCupo).toHaveBeenCalledWith(true);
    });
  });

  describe('setValoresStore', () => {
    it('should call the appropriate store method with the form value', () => {
      const mockForm = {
        get: jest.fn().mockReturnValue({ value: 'mockValue' }),
      } as any;

      component.setValoresStore(mockForm, 'campo', 'setTratado');

      expect(mockForm.get).toHaveBeenCalledWith('campo');
      expect(tramite120201StoreMock.setTratado).toHaveBeenCalledWith('mockValue');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destruirNotificador$', () => {
      const destruirNotificadorSpy = jest.spyOn(
        component['destruirNotificador$'],
        'next'
      );
      const destruirNotificadorCompleteSpy = jest.spyOn(
        component['destruirNotificador$'],
        'complete'
      );

      component.ngOnDestroy();

      expect(destruirNotificadorSpy).toHaveBeenCalled();
      expect(destruirNotificadorCompleteSpy).toHaveBeenCalled();
    });
  });
});
