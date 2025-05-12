import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
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
  tableHeader: ['Cantidad', 'Descripción', 'Valor', 'Unidad', 'Fracción', 'Total USD'],
  tableBody: [
    { tbodyData: ['10', 'Item 1', '50', 'kg', '1234', '100'] },
    { tbodyData: ['20', 'Item 2', '75', 'kg', '5678', '200'] },
  ],
};
 
describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockStore: jest.Mocked<Tramite130203Store>;
  let mockQuery: jest.Mocked<Tramite130203Query>;
  let mockService: jest.Mocked<ExportacionDeDiamantesEnBrutoService>;
 
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
      getEntidadFederativa: jest.fn().mockReturnValue(of(mockCatalogo)),
      getRepresentacionFederal: jest.fn().mockReturnValue(of(mockCatalogo)),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of(mockCatalogo)),
      getPaisesPorBloque: jest.fn().mockReturnValue(of(mockCatalogo)),
    } as any;
 
    await TestBed.configureTestingModule({
      declarations: [
        SolicitudComponent,
        PartidasDeLaMercanciaStubComponent,
        DatosDelTramiteStubComponent,
        DatosDeLaMercanciaStubComponent,
        PaisProcendenciaStubComponent,
        RepresentacionStubComponent,
      ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        { provide: Tramite130203Store, useValue: mockStore },
        { provide: Tramite130203Query, useValue: mockQuery },
        { provide: ExportacionDeDiamantesEnBrutoService, useValue: mockService },
      ],
    }).compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    component.getEstablecimientoTableData = mockPartidasdelaTable;
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
      jest.spyOn(component, 'getEstablecimiento');
      jest.spyOn(component, 'calcularTotales');
      jest.spyOn(component, 'fetchEntidadFederativa');
      jest.spyOn(component, 'fetchRepresentacionFederal');
      jest.spyOn(component, 'listaDePaisesDisponibles');
 
      component.ngOnInit();
 
      expect(component.inicializarFormularios).toHaveBeenCalled();
      expect(component.configuracionFormularioSuscripciones).toHaveBeenCalled();
      expect(component.opcionesDeBusqueda).toHaveBeenCalled();
      expect(component.formularioTotalCount).toHaveBeenCalled();
      expect(component.getEstablecimiento).toHaveBeenCalled();
      expect(component.calcularTotales).toHaveBeenCalled();
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
 
  describe('calcularTotales', () => {
    it('Debe calcular los totales a partir de tableBodyData', () => {
      component.tableBodyData = mockPartidasdelaTable.tableBody;
      component.formularioTotalCount();
 
      component.calcularTotales();
 
      expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(30);
      expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(300);
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
 
      expect(component.mostrarTabla).toBe(true);
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
      component.filaSeleccionada = { tbodyData: ['10', 'Item', '50', 'kg', '1234', '100'] };
 
      component.navegarParaModificarPartida();
 
      expect(mockStore.setMostrarTabla).toHaveBeenCalledWith(true);
      expect(mockStore.storeTableValues).toHaveBeenCalledWith(component.filaSeleccionada);
    });
  });
 
  describe('fetchEntidadFederativa', () => {
    it('Debería obtener la lista de entidades federativas', () => {
      component.fetchEntidadFederativa();
 
      expect(mockService.getEntidadFederativa).toHaveBeenCalled();
      expect(component.entidadFederativa).toEqual(mockCatalogo);
    });
  });
 
  describe('fetchRepresentacionFederal', () => {
    it('Debería obtener la lista de representaciones federales', () => {
      component.fetchRepresentacionFederal();
 
      expect(mockService.getRepresentacionFederal).toHaveBeenCalled();
      expect(component.representacionFederal).toEqual(mockCatalogo);
    });
  });
 
  describe('listaDePaisesDisponibles', () => {
    it('Debería obtener la lista de países disponibles', () => {
      component.listaDePaisesDisponibles();
 
      expect(mockService.getListaDePaisesDisponibles).toHaveBeenCalled();
      expect(component.elementosDeBloque).toEqual(mockCatalogo);
    });
  });
 
  describe('fetchPaisesPorBloque', () => {
    it('Debería obtener países por bloque y actualizar selectRangoDias', () => {
      component.fetchPaisesPorBloque(1);
 
      expect(mockService.getPaisesPorBloque).toHaveBeenCalledWith(1);
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