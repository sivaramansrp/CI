import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Tramite130202Store } from '../../estados/tramites/tramites130202.store';
import { Tramite130202Query } from '../../estados/queries/tramite130202.query';
import { ExportacionMineralesDeHierroService } from '../../services/exportacion-minerales-de-hierro.service';
import { of, Subject } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { PartidasDeLaMercanciaComponent  } from '../../../../shared/components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosDeLaMercanciaComponent } from '../../../../shared/components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { PaisProcendenciaComponent } from '../../../../shared/components/pais-procendencia/pais-procendencia.component';
import { RepresentacionComponent } from '../../../../shared/components/representacion/representacion.component';

const mockPartidasdelaTable = {
  tableHeader: ['Cantidad', 'Descripción', 'Valor', 'Unidad', 'Fracción', 'Total USD'],
  tableBody: [
    { tbodyData: ['10', 'Item 1', '50', 'kg', '1234', '100'] },
    { tbodyData: ['20', 'Item 2', '75', 'kg', '5678', '200'] },
  ],
};

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockStore: jest.Mocked<Tramite130202Store>;
  let mockQuery: jest.Mocked<Tramite130202Query>;
  let mockService: jest.Mocked<ExportacionMineralesDeHierroService>;

  const mockProductoOptions: ProductoOpción[] = [
    { label: 'Nuevo', value: 'Nuevo' },
    { label: 'Usado', value: 'Usado' },
  ];
  const mockCatalogo: Catalogo[] = [
    { id: 1, descripcion: 'Option 1' },
    { id: 2, descripcion: 'Option 2 Ascendingly' },
  ];

  beforeEach(async () => {
    mockStore = {
      updateState: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
      updateSolicitud: jest.fn(),
      setProducto: jest.fn(),
      setDescripcion: jest.fn(),
      setCantidad: jest.fn(),
      setValorPartidaUSD: jest.fn(),
      setUnidadMedida: jest.fn(),
    } as any;

    mockQuery = {
      mostrarTabla$: of(false),
      solicitud$: of(''),
      regimen$: of(''),
      classification$: of(''),
      mercanciaState$: of({
        producto: 'Nuevo',
        descripcion: '',
        fraccion: '',
        cantidad: '',
        valorPartidaUSD: 0,
        unidadMedida: '',
      }),
      selectSolicitud$: of({
        cantidadPartidasDeLaMercancia: '',
        valorPartidaUSDPartidasDeLaMercancia: '',
        descripcionPartidasDeLaMercancia: '',
        bloque: '',
        usoEspecifico: '',
        justificacionImportacionExportacion: '',
        observaciones: '',
        entidad: '',
        representacion: '',
      }),
    } as any;

    mockService = {
      getEntidadFederativa: jest.fn().mockReturnValue(of(mockCatalogo)),
      getRepresentacionFederal: jest.fn().mockReturnValue(of(mockCatalogo)),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of(mockCatalogo)),
      getPaisesPorBloque: jest.fn().mockReturnValue(of(mockCatalogo)),
      // Added mocks for methods used in fetchOptions
      getSolicitudeOptions: jest.fn().mockReturnValue(of({ options: mockProductoOptions, defaultSelect: 'Inicial' })),
      getProductoOptions: jest.fn().mockReturnValue(of({ options: mockProductoOptions })),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [
        ReactiveFormsModule,
        DatosDelTramiteComponent,
        PartidasDeLaMercanciaComponent ,
        DatosDeLaMercanciaComponent,
        PaisProcendenciaComponent,
        RepresentacionComponent,
      ],
      providers: [
        FormBuilder,
        { provide: HttpClient, useValue: {} }, // Simplified since service handles HTTP now
        { provide: HttpHandler, useValue: {} },
        { provide: Tramite130202Store, useValue: mockStore },
        { provide: Tramite130202Query, useValue: mockQuery },
        { provide: ExportacionMineralesDeHierroService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    component.getEstablecimientoTableData = mockPartidasdelaTable;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Debe inicializar formularios y configurar suscripciones', () => {
      jest.spyOn(component, 'inicializarFormularios');
      jest.spyOn(component, 'configuraciónFormularioSuscripciones');
      jest.spyOn(component, 'opcionesDeBusqueda');
      jest.spyOn(component, 'formularioTotalCount');
      jest.spyOn(component, 'getEstablecimiento');
      jest.spyOn(component, 'calcularTotales');

      component.ngOnInit();

      expect(component.inicializarFormularios).toHaveBeenCalled();
      expect(component.configuraciónFormularioSuscripciones).toHaveBeenCalled();
      expect(component.opcionesDeBusqueda).toHaveBeenCalled();
      expect(component.formularioTotalCount).toHaveBeenCalled();
      expect(component.getEstablecimiento).toHaveBeenCalled();
      expect(component.calcularTotales).toHaveBeenCalled();
    });

    it('Debería actualizar mostrarTabla según la consulta', () => {
      const mostrarTablaSubject = new Subject<boolean>();
      mockQuery.mostrarTabla$ = mostrarTablaSubject.asObservable();

      component.ngOnInit();
      mostrarTablaSubject.next(true);

      expect(component.mostrarTabla).toBe(true);
    });
  });

  describe('initializeForms', () => {
    it('debe inicializar todas las formas reactivas', () => {
      component.inicializarFormularios();

      expect(component.formDelTramite).toBeDefined();
      expect(component.mercanciaForm).toBeDefined();
      expect(component.partidasDelaMercanciaForm).toBeDefined();
      expect(component.paisForm).toBeDefined();
      expect(component.frmRepresentacionForm).toBeDefined();

      expect(component.formDelTramite.get('solicitud')).toBeDefined();
      expect(component.mercanciaForm.get('producto')?.value).toBe('Nuevo');
      expect(component.partidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')).toBeDefined();
    });
  });

  describe('fetchOptions', () => {
    it('Debería obtener las opciones de solicitud y producto', () => {
      component.opcionesDeBusqueda();

      expect(mockService.getSolicitudeOptions).toHaveBeenCalled();
      expect(mockStore.updateState).toHaveBeenCalledWith({
        solicitud: 'Nuevo',
        defaultSelect: 'Inicial',
      });
      expect(mockService.getProductoOptions).toHaveBeenCalled();
      expect(mockStore.updateState).toHaveBeenCalledWith({
        producto: 'Nuevo',
        defaultProducto: 'Nuevo',
      });
    });
  });

  describe('calculateTotals', () => {
    it('Debe calcular los totales a partir de tableBodyData', () => {
      component.tableBodyData = mockPartidasdelaTable.tableBody;
      component.formForTotalCount = TestBed.inject(FormBuilder).group({
        cantidadTotal: [{ value: '', disabled: true }],
        valorTotalUSD: [{ value: '', disabled: true }],
      });

      component.calcularTotales();

      expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(30);
      expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(300);
    });
  });

  describe('validarYEnviarFormulario', () => {
    it('Debería establecer mostrarTabla en verdadero y marcar el formulario como tocado si no es válido', () => {
      component.partidasDelaMercanciaForm = TestBed.inject(FormBuilder).group({
        cantidadPartidasDeLaMercancia: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      });
      jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');

      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
      expect(component.partidasDelaMercanciaForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('Debe establecer mostrarTabla como verdadero si el formulario es válido', () => {
      component.partidasDelaMercanciaForm = TestBed.inject(FormBuilder).group({
        cantidadPartidasDeLaMercancia: ['10', [Validators.required, Validators.pattern('^[0-9]+$')]],
      });

      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
    });
  });

  describe('ngOnDestroy', () => {
    it('Debería completar el tema destruido$', () => {
      const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(destroyedSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});