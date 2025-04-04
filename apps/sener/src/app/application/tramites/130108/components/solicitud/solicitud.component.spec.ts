import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ExportacionMineralesDeHierroService } from '../../services/exportacion-minerales-de-hierro.service';
import { Tramite130108Store } from '../../estados/tramites/tramites130108.store';
import { Tramite130108Query } from '../../estados/queries/tramite130108.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let exportacionMineralesDeHierroService: jest.Mocked<ExportacionMineralesDeHierroService>;
  let tramite130108Store: jest.Mocked<Tramite130108Store>;
  let tramite130108Query: jest.Mocked<Tramite130108Query>;

  beforeEach(async () => {
    const mockExportacionMineralesDeHierroService = {
      getEstado: jest.fn().mockReturnValue(of(null)),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([])),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of([])),
      getPaisesPorBloque: jest.fn().mockReturnValue(of([])),
      getSolicitudeOptions: jest.fn().mockReturnValue(of({ options: [], defaultSelect: '' })),
      getProductoOptions: jest.fn().mockReturnValue(of({ options: [], defaultSelect: '' })),
    };

    const mockGetEstablecimientoTableData = {
      tableHeader: ['Header1', 'Header2', 'Header3'],
      tableBody: [
        {
          tbodyData: ['1', 'Kilogramo', '98020018', 'Descripción', '1.000', '1'],
        },
      ],
    };

    const mockTramite130108Store = {
      updateState: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
      updateSolicitud: jest.fn(),
      setDescripcionPartidasDeLaMercancia: jest.fn(),
      setCantidadPartidasDeLaMercancia: jest.fn(),
      setValorPartidaUSDPartidasDeLaMercancia: jest.fn(),
      setregimen: jest.fn(),
      setRegimen: jest.fn(),
      setClasificacion: jest.fn(),
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
    };

    const mockTramite130108Query = {
      mostrarTabla$: of(false),
      solicitud$: of(''),
      regimen$: of(''),
      clasificacion$: of(''),
      mercanciaState$: of({}),
      selectSolicitud$: of({}),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: ExportacionMineralesDeHierroService, useValue: mockExportacionMineralesDeHierroService },
        { provide: Tramite130108Store, useValue: mockTramite130108Store },
        { provide: Tramite130108Query, useValue: mockTramite130108Query },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    exportacionMineralesDeHierroService = TestBed.inject(ExportacionMineralesDeHierroService) as jest.Mocked<ExportacionMineralesDeHierroService>;
    ExportacionMineralesDeHierroService
    component.getEstablecimientoTableData = mockGetEstablecimientoTableData;
    fixture.detectChanges();
    tramite130108Store = TestBed.inject(Tramite130108Store) as jest.Mocked<Tramite130108Store>;
    tramite130108Query = TestBed.inject(Tramite130108Query) as jest.Mocked<Tramite130108Query>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize forms and fetch data', () => {
      jest.spyOn(component, 'inicializarFormularios');
      jest.spyOn(component, 'configuracionFormularioSuscripciones');
      jest.spyOn(component, 'opcionesDeBusqueda');
      jest.spyOn(component, 'fetchEntidadFederativa');
      jest.spyOn(component, 'fetchRepresentacionFederal');
      jest.spyOn(component, 'listaDePaisesDisponibles');

      component.ngOnInit();

      expect(component.inicializarFormularios).toHaveBeenCalled();
      expect(component.configuracionFormularioSuscripciones).toHaveBeenCalled();
      expect(component.opcionesDeBusqueda).toHaveBeenCalled();
      expect(component.fetchEntidadFederativa).toHaveBeenCalled();
      expect(component.fetchRepresentacionFederal).toHaveBeenCalled();
      expect(component.listaDePaisesDisponibles).toHaveBeenCalled();
    });
  });

  describe('inicializarFormularios', () => {
    it('should initialize all forms', () => {
      component.inicializarFormularios();

      expect(component.formDelTramite).toBeDefined();
      expect(component.mercanciaForm).toBeDefined();
      expect(component.partidasDelaMercanciaForm).toBeDefined();
      expect(component.paisForm).toBeDefined();
      expect(component.frmRepresentacionForm).toBeDefined();
    });
  });

  describe('validarYEnviarFormulario', () => {
    it('should mark form as touched if the form is invalid', () => {
      component.partidasDelaMercanciaForm = new FormBuilder().group({
        cantidadPartidasDeLaMercancia: [''], // Invalid form (empty value)
      });
  
      jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');
  
      component.validarYEnviarFormulario();
  
      expect(component.partidasDelaMercanciaForm.markAllAsTouched).toHaveBeenCalledTimes(0);
      expect(component.mostrarTabla).toBe(true); // mostrarTabla should still be true
    });
  
    it('should set mostrarTabla to true if the form is valid', () => {
      component.partidasDelaMercanciaForm = new FormBuilder().group({
        cantidadPartidasDeLaMercancia: ['valid value'], // Valid form
      });
  
      jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');
  
      component.validarYEnviarFormulario();
  
      expect(component.partidasDelaMercanciaForm.markAllAsTouched).not.toHaveBeenCalled();
      expect(component.mostrarTabla).toBe(true)
    });
  });

  describe('manejarlaFilaSeleccionada', () => {
    it('should set filaSeleccionada to null if no rows are selected', () => {
      const filasSeleccionadas: any[] = []; // Empty array
  
      component.manejarlaFilaSeleccionada(filasSeleccionadas);
  
      expect(component.filaSeleccionada).toBeNull();
      expect(tramite130108Store.storeTableValues).not.toHaveBeenCalled();
    });
  
    it('should update filaSeleccionada and call storeTableValues if rows are selected', () => {
      const mockFila = { id: 1, descripcion: 'Fila 1' };
      const filasSeleccionadas = [mockFila];
  
      component.manejarlaFilaSeleccionada(filasSeleccionadas);
  
      expect(component.filaSeleccionada).toEqual(mockFila);
      expect(tramite130108Store.storeTableValues).toHaveBeenCalledWith(mockFila);
    });
  });

  describe('navegarParaModificarPartida', () => {
    it('should update store and set mostrarTabla to true if filaSeleccionada exists', () => {
      const mockFila = { id: 1, descripcion: 'Fila 1' };
      component.filaSeleccionada = mockFila;

      component.navegarParaModificarPartida();

      expect(tramite130108Store.setMostrarTabla).toHaveBeenCalledWith(true);
      expect(tramite130108Store.storeTableValues).toHaveBeenCalledWith(mockFila);
    });

    it('should do nothing if filaSeleccionada is null', () => {
      component.filaSeleccionada = null;

      component.navegarParaModificarPartida();

      expect(tramite130108Store.setMostrarTabla).not.toHaveBeenCalled();
      expect(tramite130108Store.storeTableValues).not.toHaveBeenCalled();
    });
  });

  describe('calcularTotales', () => {
    it('should calculate totals and update form controls', () => {
      component.tableBodyData = [
        { tbodyData: ['10', '', '', '', '', '100'] },
        { tbodyData: ['20', '', '', '', '', '200'] },
      ];

      component.formForTotalCount = new FormBuilder().group({
        cantidadTotal: [{ value: '', disabled: true }],
        valorTotalUSD: [{ value: '', disabled: true }],
      });

      component.calcularTotales();

      expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(30);
      expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(300);
    });
  });

  describe('fetchPaisesPorBloque', () => {
    it('should call getPaisesPorBloque with the correct _bloqueId', () => {
      const bloqueId = 1;
      const getPaisesPorBloqueSpy = jest.spyOn(exportacionMineralesDeHierroService, 'getPaisesPorBloque').mockReturnValue(of([]));
  
      component.fetchPaisesPorBloque(bloqueId);
  
      expect(getPaisesPorBloqueSpy).toHaveBeenCalledWith(bloqueId);
    });
  
    it('should update paisesPorBloque and selectRangoDias with the returned data', () => {
      const bloqueId = 1;
      const mockData = [
        { id: 1, descripcion: 'Country 1' },
        { id: 2, descripcion: 'Country 2' },
      ];
      jest.spyOn(exportacionMineralesDeHierroService, 'getPaisesPorBloque').mockReturnValue(of(mockData));
  
      component.fetchPaisesPorBloque(bloqueId);
  
      expect(component.paisesPorBloque).toEqual(mockData);
      expect(component.selectRangoDias).toEqual(['Country 1', 'Country 2']);
    });
  
    it('should handle empty data gracefully', () => {
      const bloqueId = 1;
      jest.spyOn(exportacionMineralesDeHierroService, 'getPaisesPorBloque').mockReturnValue(of([]));
  
      component.fetchPaisesPorBloque(bloqueId);
  
      expect(component.paisesPorBloque).toEqual([]);
      expect(component.selectRangoDias).toEqual([]);
    });
  });

  describe('enCambioDeBloque', () => {
    it('should call fetchPaisesPorBloque with the correct bloqueId', () => {
      const bloqueId = 1;
      const fetchPaisesPorBloqueSpy = jest.spyOn(component, 'fetchPaisesPorBloque');
  
      component.enCambioDeBloque(bloqueId);
  
      expect(fetchPaisesPorBloqueSpy).toHaveBeenCalledWith(bloqueId);
    });
  });
  describe('setValoresStore', () => {
    const mockForm = new FormBuilder().group({
      campo: ['test value'],
    });
  
    it('should call updateSolicitud when metodoNombre is "updateSolicitud"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'updateSolicitud' };
      component.setValoresStore(event);
      expect(tramite130108Store.updateSolicitud).toHaveBeenCalledWith('test value');
    });
  
    it('should call setDescripcionPartidasDeLaMercancia when metodoNombre is "setDescripcionPartidasDeLaMercancia"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setDescripcionPartidasDeLaMercancia' };
      component.setValoresStore(event);
      expect(tramite130108Store.setDescripcionPartidasDeLaMercancia).toHaveBeenCalledWith('test value');
    });
  
    it('should call setCantidadPartidasDeLaMercancia when metodoNombre is "setCantidadPartidasDeLaMercancia"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setCantidadPartidasDeLaMercancia' };
      component.setValoresStore(event);
      expect(tramite130108Store.setCantidadPartidasDeLaMercancia).toHaveBeenCalledWith('test value');
    });
  
    it('should call setValorPartidaUSDPartidasDeLaMercancia when metodoNombre is "setValorPartidaUSDPartidasDeLaMercancia"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setValorPartidaUSDPartidasDeLaMercancia' };
      component.setValoresStore(event);
      expect(tramite130108Store.setValorPartidaUSDPartidasDeLaMercancia).toHaveBeenCalledWith('test value');
    });
  
    it('should call setregimen when metodoNombre is "setregimen"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setRegimen' };
      component.setValoresStore(event);
      expect(tramite130108Store.setRegimen).toHaveBeenCalledWith('test value');
    });
  
    it('should call setClasificacion when metodoNombre is "setClasificacion"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setClasificacion' };
      component.setValoresStore(event);
      expect(tramite130108Store.setClasificacion).toHaveBeenCalledWith('test value');
    });
  
    it('should call setProducto when metodoNombre is "setProducto"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setProducto' };
      component.setValoresStore(event);
      expect(tramite130108Store.setProducto).toHaveBeenCalledWith('test value');
    });
  
    it('should call setDescripcion when metodoNombre is "setDescripcion"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setDescripcion' };
      component.setValoresStore(event);
      expect(tramite130108Store.setDescripcion).toHaveBeenCalledWith('test value');
    });
  
    it('should call setCantidad when metodoNombre is "setCantidad"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setCantidad' };
      component.setValoresStore(event);
      expect(tramite130108Store.setCantidad).toHaveBeenCalledWith('test value');
    });
  
    it('should call setValorPartidaUSD with parsed value when metodoNombre is "setValorPartidaUSD"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setValorPartidaUSD' };
      component.setValoresStore(event);
      expect(tramite130108Store.setValorPartidaUSD).toHaveBeenCalledWith(parseFloat('test value') || 0);
    });
  
    it('should call setUnidadMedida when metodoNombre is "setUnidadMedida"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setUnidadMedida' };
      component.setValoresStore(event);
      expect(tramite130108Store.setUnidadMedida).toHaveBeenCalledWith('test value');
    });
  
    it('should call setBloque when metodoNombre is "setBloque"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setBloque' };
      component.setValoresStore(event);
      expect(tramite130108Store.setBloque).toHaveBeenCalledWith('test value');
    });
  
    it('should call setUsoEspecifico when metodoNombre is "setUsoEspecifico"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setUsoEspecifico' };
      component.setValoresStore(event);
      expect(tramite130108Store.setUsoEspecifico).toHaveBeenCalledWith('test value');
    });
  
    it('should call setJustificacionImportacionExportacion when metodoNombre is "setJustificacionImportacionExportacion"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setJustificacionImportacionExportacion' };
      component.setValoresStore(event);
      expect(tramite130108Store.setJustificacionImportacionExportacion).toHaveBeenCalledWith('test value');
    });
  
    it('should call setObservaciones when metodoNombre is "setObservaciones"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setObservaciones' };
      component.setValoresStore(event);
      expect(tramite130108Store.setObservaciones).toHaveBeenCalledWith('test value');
    });
  
    it('should call setEntidad when metodoNombre is "setEntidad"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setEntidad' };
      component.setValoresStore(event);
      expect(tramite130108Store.setEntidad).toHaveBeenCalledWith('test value');
    });
  
    it('should call setRepresentacion when metodoNombre is "setRepresentacion"', () => {
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'setRepresentacion' };
      component.setValoresStore(event);
      expect(tramite130108Store.setRepresentacion).toHaveBeenCalledWith('test value');
    });
  
    it('should log an error when metodoNombre does not match any case', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const event = { form: mockForm, campo: 'campo', metodoNombre: 'nonExistentMethod' };
      component.setValoresStore(event);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Método nonExistentMethod no existe en tramite130108Store');
    });
  });
  
});