import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite130115Store } from '../../../../estados/tramites/tramite130115.store';
import { Tramite130115Query } from '../../../../estados/queries/tramite130115.query';
import { of, Subject } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { Component, Input } from '@angular/core';
import { ImportacionVehiculosNuevosService } from '../../services/importacion-vehiculos-nuevos.service';
import { HttpClientModule } from '@angular/common/http';


@Component({ selector: 'app-partidas-de-la-mercancia', template: '' })
class PartidasDeLaMercanciaStubComponent {}

@Component({ selector: 'app-datos-del-tramite', template: '' })
class DatosDelTramiteStubComponent {}

@Component({ selector: 'app-datos-de-la-mercancia', template: '' })
class DatosDeLaMercanciaStubComponent {}

@Component({ selector: 'app-pais-procendencia', template: '' })
class PaisProcendenciaStubComponent {
  @Input() fechas: any[] = [];
  @Input() fechasSeleccionadas: any[] = [];
}

@Component({ selector: 'app-representacion', template: '' })
class RepresentacionStubComponent {}

const mockPartidasdelaTable = {
  cantidad :"10",
  unidadDeMedida :"kg",
  fraccionFrancelaria :"1234",
  descripcion:"Item",
  precioUnitarioUSD :"50",
  totalUSD:"100",
};

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockStore: jest.Mocked<Tramite130115Store>;
  let mockQuery: jest.Mocked<Tramite130115Query>;
  let mockService: jest.Mocked<any>;
  let mockImportacionDeVehiculosService: Partial<ImportacionVehiculosNuevosService>;

  const mockProductoOptions: ProductoOpción[] = [
    { label: 'Nuevo', value: 'Nuevo' },
    { label: 'Usado', value: 'Usado' },
  ];
  const mockCatalogo: Catalogo[] = [
    { id: 1, descripcion: 'Option 1' },
    { id: 2, descripcion: 'Option 2' },
  ];

  beforeEach(async () => {
    mockStore = {
      updateState: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
      updateSolicitud: jest.fn(),
      setDescripcionPartidasDeLaMercancia: jest.fn(),
      setCantidadPartidasDeLaMercancia: jest.fn(),
      setValorPartidaUSDPartidasDeLaMercancia: jest.fn(),
      setregimen: jest.fn(),
      setclasificacion: jest.fn(),
      setProducto: jest.fn(),
      setDescripcion: jest.fn(),
      setCantidad: jest.fn(),
      setValorPartidaUSD: jest.fn(),
      setUnidadMedida: jest.fn(),
      setBloque: jest.fn(),
      setUsoEspecifico: jest.fn(),
      setJustificacionImportacionExportacion: jest.fn(),
      setObservaciones: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
    } as any;

    mockQuery = {
      mostrarTabla$: new Subject<boolean>(),
      solicitud$: of(''),
      regimen$: of(''),
      clasificacion$: of(''),
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
    };
    jest.spyOn(mockService, 'getEntidadFederativa'); // Ensure the spy is set up

    await TestBed.configureTestingModule({
      declarations: [
        SolicitudComponent,
        PartidasDeLaMercanciaStubComponent,
        DatosDelTramiteStubComponent,
        DatosDeLaMercanciaStubComponent,
        PaisProcendenciaStubComponent,
        RepresentacionStubComponent,
      ],
      imports: [ReactiveFormsModule,HttpClientModule],
      providers: [
        FormBuilder,
        { provide: Tramite130115Store, useValue: mockStore },
        { provide: Tramite130115Query, useValue: mockQuery },
        { provide: ImportacionVehiculosNuevosService, useValue: mockImportacionDeVehiculosService },
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    mockImportacionDeVehiculosService = {
      getEntidadFederativa: jest.fn().mockReturnValue(of(mockCatalogo)),
      getRepresentacionFederal: jest.fn().mockReturnValue(of(mockCatalogo)),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of(mockCatalogo)),
      getPaisesPorBloque: jest.fn().mockReturnValue(of(mockCatalogo)),
      getSolicitudeOptions: jest.fn().mockReturnValue(
        of({
          options: mockProductoOptions,
          defaultSelect: 'Inicial',
        })
      ),
      getProductoOptions: jest.fn().mockReturnValue(
        of({
          options: mockProductoOptions,
        })
      ),
      getTablaDatos: jest.fn().mockReturnValue(of([{ cantidad: 10, totalUSD: 1000 }])), // Mock implementation
    };
  
    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      providers: [
        { provide: ImportacionVehiculosNuevosService, useValue: mockImportacionDeVehiculosService },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Debe inicializar formularios y configurar suscripciones', () => {
      jest.spyOn(component, 'inicializarFormularios');
      jest.spyOn(component, 'configuracionFormularioSuscripciones');
      jest.spyOn(component, 'opcionesDeBusqueda');
      jest.spyOn(component, 'formularioTotalCount');
      jest.spyOn(component, 'fetchEntidadFederativa');
      jest.spyOn(component, 'fetchRepresentacionFederal');
      jest.spyOn(component, 'listaDePaisesDisponibles');

      component.ngOnInit();

      expect(component.inicializarFormularios).toHaveBeenCalled();
      expect(component.configuracionFormularioSuscripciones).toHaveBeenCalled();
      expect(component.opcionesDeBusqueda).toHaveBeenCalled();
      expect(component.formularioTotalCount).toHaveBeenCalled();
      expect(component.fetchEntidadFederativa).toHaveBeenCalled();
      expect(component.fetchRepresentacionFederal).toHaveBeenCalled();
      expect(component.listaDePaisesDisponibles).toHaveBeenCalled();
    });

    it('Debería actualizar mostrarTabla según la consulta', () => {
      const mostrarTablaSubject = new Subject<boolean>();
      mockQuery.mostrarTabla$ = mostrarTablaSubject.asObservable();

      component.ngOnInit();
      mostrarTablaSubject.next(true);

      expect(component.mostrarTabla).toBe(true);
    });

  });

  describe('inicializarFormularios', () => {
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
      expect(component.paisForm.get('bloque')).toBeDefined();
      expect(component.frmRepresentacionForm.get('entidad')).toBeDefined();
    });
  });

  describe('opcionesDeBusqueda', () => {
    it('Debería obtener las opciones de solicitud y producto', () => {
      component.opcionesDeBusqueda();

      expect(mockImportacionDeVehiculosService.getSolicitudeOptions).toHaveBeenCalled();
      expect(mockStore.updateState).toHaveBeenCalledWith({
        solicitud: 'Nuevo',
        defaultSelect: 'Inicial',
      });
      expect(mockImportacionDeVehiculosService.getProductoOptions).toHaveBeenCalled();
      expect(mockStore.updateState).toHaveBeenCalledWith({
        producto: 'Nuevo',
        defaultProducto: 'Nuevo',
      });
    });
  });


  describe('validarYEnviarFormulario', () => {
    it('Debería establecer mostrarTabla en verdadero y marcar el formulario como tocado si no es válido', () => {
      component.partidasDelaMercanciaForm = TestBed.inject(FormBuilder).group({
        cantidadPartidasDeLaMercancia: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        descripcionPartidasDeLaMercancia: ['', Validators.required],
        valorPartidaUSDPartidasDeLaMercancia: ['', Validators.required],
      });
      jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');

      component.validarYEnviarFormulario();

      expect(component.partidasDelaMercanciaForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('Debe establecer mostrarTabla como verdadero si el formulario es válido', () => {
      component.partidasDelaMercanciaForm = TestBed.inject(FormBuilder).group({
        cantidadPartidasDeLaMercancia: ['10', [Validators.required, Validators.pattern('^[0-9]+$')]],
        descripcionPartidasDeLaMercancia: ['Test', Validators.required],
        valorPartidaUSDPartidasDeLaMercancia: ['100', Validators.required],
      });

      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
    });
  });

  describe('navegarParaModificarPartida', () => {
    it('Debería actualizar el estado y mostrarTabla si hay fila seleccionada', () => {
      component.filaSeleccionada = [{ cantidad: '10', descripcion: 'Item', precioUnitarioUSD: '50', unidadDeMedida: 'kg', fraccionFrancelaria: '1234', totalUSD: '100' }];

      component.navegarParaModificarPartida();

      expect(mockStore.setMostrarTabla).toHaveBeenCalledWith(true);
      expect(mockStore.storeTableValues).toHaveBeenCalledWith(component.filaSeleccionada);
    });
  });

  describe('fetchEntidadFederativa', () => {
    it('Debería obtener la lista de entidades federativas', () => {
      component.fetchEntidadFederativa(); // Explicitly call the method
    
      expect(mockImportacionDeVehiculosService.getEntidadFederativa).toHaveBeenCalled(); // Correct the mock service reference
      expect(component.entidadFederativa).toEqual(mockCatalogo);
    });
  });

  describe('fetchRepresentacionFederal', () => {
    it('Debería obtener la lista de representaciones federales', () => {
      component.fetchRepresentacionFederal();

      expect(mockImportacionDeVehiculosService.getRepresentacionFederal).toHaveBeenCalled();
      expect(component.representacionFederal).toEqual(mockCatalogo);
    });
  });

  describe('listaDePaisesDisponibles', () => {
    it('Debería obtener la lista de países disponibles', () => {
      component.listaDePaisesDisponibles();

      expect(mockImportacionDeVehiculosService.getListaDePaisesDisponibles).toHaveBeenCalled();
      expect(component.elementosDeBloque).toEqual(mockCatalogo);
    });
  });

  describe('fetchPaisesPorBloque', () => {
    it('Debería obtener países por bloque y actualizar selectRangoDias', () => {
      component.fetchPaisesPorBloque(1);

      expect(mockImportacionDeVehiculosService.getPaisesPorBloque).toHaveBeenCalledWith(1);
      expect(component.paisesPorBloque).toEqual(mockCatalogo);
      expect(component.selectRangoDias).toEqual(['Option 1', 'Option 2']);
    });
  });

  describe('enCambioDeBloque', () => {
    it('Debería llamar a fetchPaisesPorBloque con el bloqueId', () => {
      jest.spyOn(component, 'fetchPaisesPorBloque');

      component.enCambioDeBloque(2);

      expect(component.fetchPaisesPorBloque).toHaveBeenCalledWith(2);
    });
  });

  describe('setValoresStore', () => {
    it('Debería actualizar el store según el método especificado', () => {
      component.mercanciaForm = TestBed.inject(FormBuilder).group({
        producto: ['Nuevo'], 
      });
  
      component.setValoresStore({
        form: component.mercanciaForm,
        campo: 'producto',
        metodoNombre: 'setProducto',
      });
  
      expect(mockStore.setProducto).toHaveBeenCalledWith('Nuevo');
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