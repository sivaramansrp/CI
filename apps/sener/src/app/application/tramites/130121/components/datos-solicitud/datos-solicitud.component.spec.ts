import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fb: FormBuilder;
  let http: HttpClient;
  let store: any;
  let query: any;
  let permisoService: any;

  beforeEach(() => {
    // Suppress console.log for every test.
    jest.spyOn(console, 'log').mockImplementation(() => {});

    fb = new FormBuilder();
    http = {} as HttpClient;

    store = {
      updateState: jest.fn(),
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
      setUmt: jest.fn(),
      setNico: jest.fn(),
      setFraccion: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
    };

    query = {
      mostrarTabla$: of(false),
      selectSolicitud$: of({
        cantidadPartidasDeLaMercancia: '10',
        valorPartidaUSDPartidasDeLaMercancia: '100',
        descripcionPartidasDeLaMercancia: 'Test description',
        bloque: '1',
        usoEspecifico: 'Test',
        justificacionImportacionExportacion: 'Test justification',
        observaciones: 'Test obs',
        entidad: 'Test entity',
        representacion: 'Test representation',
      }),
      fraccion$: of('Test fraccion'),
      unidadMedida$: of('Test unidad'),
      solicitud$: of('Test solicitud'),
      regimen$: of('Test regimen'),
      clasificacion$: of('Test clasificacion'),
      mercanciaState$: of({
        plazo: 'Test plazo',
        descripcion: 'Test desc',
        fraccion: 'Test fraccion',
        cantidad: '5',
        valorPartidaUSD: 200,
        unidadMedida: 'Test unidad',
      }),
    };

    permisoService = {
      getSolicitudeOptions: jest.fn().mockReturnValue(
        of({ options: [{ value: 'option1' }], defaultSelect: 'defaultSelect' })
      ),
      getProductoOptions: jest.fn().mockReturnValue(
        of({ options: [{ value: 'plazo1' }] })
      ),
      getEstado: jest.fn().mockReturnValue(
        of([{ id: 1, descripcion: 'Estado1' }])
      ),
      getRepresentacionFederal: jest.fn().mockReturnValue(
        of([{ id: 1, descripcion: 'Rep1' }])
      ),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(
        of([{ id: 1, descripcion: 'Pais1' }])
      ),
      getPaisesPorBloque: jest.fn().mockReturnValue(
        of([{ id: 1, descripcion: 'PaisBloque1' }])
      ),
    };

    component = new DatosSolicitudComponent(fb, http, store, query, permisoService);
    // Provide dummy table data to prevent errors in getEstablecimiento.
    component.getEstablecimientoTableData = {
      tableHeader: ['Header1', 'Header2'],
      tableBody: [{ tbodyData: ['data1', 'data2'] }],
    };
  });

  it('should create all reactive forms on initialization', () => {
    component.inicializarFormularios();
    expect(component.formDelTramite).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
    expect(component.partidasDelaMercanciaForm).toBeDefined();
    expect(component.paisForm).toBeDefined();
    expect(component.frmRepresentacionForm).toBeDefined();
  });

  it('should configure subscriptions in configuracionFormularioSuscripciones', () => {
    component.inicializarFormularios();

    const formDelTramitePatchSpy = jest.spyOn(component.formDelTramite, 'patchValue');
    const mercanciaFormPatchSpy = jest.spyOn(component.mercanciaForm, 'patchValue');
    const paisFormPatchSpy = jest.spyOn(component.paisForm, 'patchValue');
    const frmRepresentacionFormPatchSpy = jest.spyOn(component.frmRepresentacionForm, 'patchValue');

    component.configuracionFormularioSuscripciones();

    // Since the observables emit immediately, patchValue should have been called.
    expect(formDelTramitePatchSpy).toHaveBeenCalled();
    expect(mercanciaFormPatchSpy).toHaveBeenCalled();
    expect(paisFormPatchSpy).toHaveBeenCalled();
    expect(frmRepresentacionFormPatchSpy).toHaveBeenCalled();
  });

  it('should initialize the total count form in formularioTotalCount', () => {
    component.formularioTotalCount();
    expect(component.formForTotalCount).toBeDefined();
    expect(component.formForTotalCount.controls['cantidadTotal']).toBeDefined();
    expect(component.formForTotalCount.controls['valorTotalUSD']).toBeDefined();
  });

  it('should set table data in getEstablecimiento', () => {
    const dummyTableData = {
      tableHeader: ['Header1', 'Header2'],
      tableBody: [{ tbodyData: ['1', '2'] }],
    };
    component.getEstablecimientoTableData = dummyTableData;
    component.getEstablecimiento();

    expect(component.tableHeaderData.length).toBe(dummyTableData.tableHeader.length);
    expect(component.tableBodyData).toEqual(dummyTableData.tableBody);
  });

  it('should calculate totals in calcularTotales', () => {
    // Create dummy table data:
    // First column: quantity (index 0)
    // Sixth column: value (index 5)
    component.tableBodyData = [
      { tbodyData: ['2', '', '', '', '', '10.50'] },
      { tbodyData: ['3', '', '', '', '', '20.25'] },
    ];
    component.formularioTotalCount();
    component.calcularTotales();

    expect(component.formForTotalCount.controls['cantidadTotal'].value).toBe(5);
    expect(component.formForTotalCount.controls['valorTotalUSD'].value).toBeCloseTo(30.75, 2);
  });

  it('should fetch opciones de búsqueda and update state', () => {
    component.opcionesDeBusqueda();
    expect(permisoService.getSolicitudeOptions).toHaveBeenCalled();
    expect(permisoService.getProductoOptions).toHaveBeenCalled();
    expect(component.opcionesSolicitud).toEqual([{ value: 'option1' }]);
    expect(store.updateState).toHaveBeenCalledWith({
      solicitud: 'option1',
      defaultSelect: 'defaultSelect',
    });
    expect(store.updateState).toHaveBeenCalledWith({
      plazo: 'plazo1',
      defaultPlazo: 'plazo1',
    });
  });

  it('should handle row selection in manejarlaFilaSeleccionada', () => {
    const row = { someData: 'test' };
    component.manejarlaFilaSeleccionada([row]);
    expect(component.filaSeleccionada).toEqual(row);
    expect(store.storeTableValues).toHaveBeenCalledWith(row);
  });

  it('should clear row selection in manejarlaFilaSeleccionada when an empty array is provided', () => {
    component.filaSeleccionada = { someData: 'test' };
    component.manejarlaFilaSeleccionada([]);
    expect(component.filaSeleccionada).toBeNull();
  });

  describe('validarYEnviarFormulario', () => {
    beforeEach(() => {
      // Use the original initialization so that validators are present.
      component.inicializarFormularios();
    });
    
    it('should mark form as touched when form is invalid', () => {
      // Set up an invalid form using required validators.
      component.partidasDelaMercanciaForm = fb.group({
        cantidadPartidasDeLaMercancia: ['', [Validators.required]],
        unidadMedida: ['', [Validators.required]],
        fraccion: ['', [Validators.required]],
        descripcionPartidasDeLaMercancia: ['', [Validators.required]],
        valorPartidaUSDPartidasDeLaMercancia: ['', [Validators.required]],
      });
      // Ensure the form is invalid.
      component.partidasDelaMercanciaForm.updateValueAndValidity();
      const markAllSpy = jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');
    
      component.validarYEnviarFormulario();
    
      // Update the expectation to match your intended behavior.
      expect(component.mostrarTabla).toBe(false);
      expect(markAllSpy).toHaveBeenCalled();
    });
    

    it('should not mark form as touched when form is valid', () => {
      // Set up a valid form.
      component.partidasDelaMercanciaForm = fb.group({
        cantidadPartidasDeLaMercancia: ['10', [Validators.required]],
        unidadMedida: ['unit', [Validators.required]],
        fraccion: ['frac', [Validators.required]],
        descripcionPartidasDeLaMercancia: ['Valid description', [Validators.required]],
        valorPartidaUSDPartidasDeLaMercancia: ['100.00', [Validators.required]],
      });
      component.partidasDelaMercanciaForm.updateValueAndValidity();
      const markAllSpy = jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');

      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
      expect(markAllSpy).not.toHaveBeenCalled();
    });
  });

  it('should navigate to modify partida in navegarParaModificarPartida', () => {
    component.filaSeleccionada = { some: 'data' };
    component.navegarParaModificarPartida();
    expect(store.setMostrarTabla).toHaveBeenCalledWith(true);
    expect(store.storeTableValues).toHaveBeenCalledWith(component.filaSeleccionada);
  });

  it('should fetch entidad federativa', () => {
    component.fetchEntidadFederativa();
    expect(permisoService.getEstado).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, descripcion: 'Estado1' }]);
  });

  it('should fetch representacion federal', () => {
    component.fetchRepresentacionFederal();
    expect(permisoService.getRepresentacionFederal).toHaveBeenCalled();
    expect(component.representacionFederal).toEqual([{ id: 1, descripcion: 'Rep1' }]);
  });

  it('should fetch lista de países disponibles', () => {
    component.listaDePaisesDisponibles();
    expect(permisoService.getListaDePaisesDisponibles).toHaveBeenCalled();
    expect(component.elementosDeBloque).toEqual([{ id: 1, descripcion: 'Pais1' }]);
  });

  it('should fetch países por bloque and update selectRangoDias', () => {
    component.fetchPaisesPorBloque(1);
    expect(permisoService.getPaisesPorBloque).toHaveBeenCalledWith(1);
    expect(component.paisesPorBloque).toEqual([{ id: 1, descripcion: 'PaisBloque1' }]);
    expect(component.selectRangoDias).toEqual(['PaisBloque1']);
  });

  it('should call fetchPaisesPorBloque when enCambioDeBloque is invoked', () => {
    const spy = jest.spyOn(component, 'fetchPaisesPorBloque');
    component.enCambioDeBloque(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  describe('setValoresStore', () => {
    // Helper function to create an event object.
    const createEvent = (campo: string, metodoNombre: string, value: any) => ({
      form: fb.group({ [campo]: [value] }),
      campo,
      metodoNombre,
    });

    it('should call updateSolicitud when metodoNombre is updateSolicitud', () => {
      const event = createEvent('solicitud', 'updateSolicitud', 'testValue');
      component.setValoresStore(event);
      expect(store.updateSolicitud).toHaveBeenCalledWith('testValue');
    });

    it('should call setDescripcionPartidasDeLaMercancia when metodoNombre is setDescripcionPartidasDeLaMercancia', () => {
      const event = createEvent('descripcionPartidasDeLaMercancia', 'setDescripcionPartidasDeLaMercancia', 'desc');
      component.setValoresStore(event);
      expect(store.setDescripcionPartidasDeLaMercancia).toHaveBeenCalledWith('desc');
    });

    it('should call setCantidadPartidasDeLaMercancia when metodoNombre is setCantidadPartidasDeLaMercancia', () => {
      const event = createEvent('cantidadPartidasDeLaMercancia', 'setCantidadPartidasDeLaMercancia', '5');
      component.setValoresStore(event);
      expect(store.setCantidadPartidasDeLaMercancia).toHaveBeenCalledWith('5');
    });

    it('should call setValorPartidaUSDPartidasDeLaMercancia when metodoNombre is setValorPartidaUSDPartidasDeLaMercancia', () => {
      const event = createEvent('valorPartidaUSDPartidasDeLaMercancia', 'setValorPartidaUSDPartidasDeLaMercancia', '150');
      component.setValoresStore(event);
      expect(store.setValorPartidaUSDPartidasDeLaMercancia).toHaveBeenCalledWith('150');
    });

    it('should call setregimen when metodoNombre is setregimen', () => {
      const event = createEvent('regimen', 'setregimen', 'regimenValue');
      component.setValoresStore(event);
      expect(store.setregimen).toHaveBeenCalledWith('regimenValue');
    });

    it('should call setclasificacion when metodoNombre is setclasificacion', () => {
      const event = createEvent('clasificacion', 'setclasificacion', 'clasValue');
      component.setValoresStore(event);
      expect(store.setclasificacion).toHaveBeenCalledWith('clasValue');
    });

    it('should call setProducto when metodoNombre is setProducto', () => {
      const event = createEvent('producto', 'setProducto', 'prodValue');
      component.setValoresStore(event);
      expect(store.setProducto).toHaveBeenCalledWith('prodValue');
    });

    it('should call setDescripcion when metodoNombre is setDescripcion', () => {
      const event = createEvent('descripcion', 'setDescripcion', 'descValue');
      component.setValoresStore(event);
      expect(store.setDescripcion).toHaveBeenCalledWith('descValue');
    });

    it('should call setCantidad when metodoNombre is setCantidad', () => {
      const event = createEvent('cantidad', 'setCantidad', '10');
      component.setValoresStore(event);
      expect(store.setCantidad).toHaveBeenCalledWith('10');
    });

    it('should call setValorPartidaUSD when metodoNombre is setValorPartidaUSD', () => {
      const event = createEvent('valorFacturaUSD', 'setValorPartidaUSD', '100.00');
      component.setValoresStore(event);
      expect(store.setValorPartidaUSD).toHaveBeenCalledWith(100.00);
    });

    it('should call setUnidadMedida when metodoNombre is setUnidadMedida', () => {
      const event = createEvent('unidadMedida', 'setUnidadMedida', 'unit');
      component.setValoresStore(event);
      expect(store.setUnidadMedida).toHaveBeenCalledWith('unit');
    });

    it('should call setBloque when metodoNombre is setBloque', () => {
      const event = createEvent('bloque', 'setBloque', '1');
      component.setValoresStore(event);
      expect(store.setBloque).toHaveBeenCalledWith('1');
    });

    it('should call setUsoEspecifico when metodoNombre is setUsoEspecifico', () => {
      const event = createEvent('usoEspecifico', 'setUsoEspecifico', 'uso');
      component.setValoresStore(event);
      expect(store.setUsoEspecifico).toHaveBeenCalledWith('uso');
    });

    it('should call setJustificacionImportacionExportacion when metodoNombre is setJustificacionImportacionExportacion', () => {
      const event = createEvent('justificacionImportacionExportacion', 'setJustificacionImportacionExportacion', 'just');
      component.setValoresStore(event);
      expect(store.setJustificacionImportacionExportacion).toHaveBeenCalledWith('just');
    });

    it('should call setObservaciones when metodoNombre is setObservaciones', () => {
      const event = createEvent('observaciones', 'setObservaciones', 'obs');
      component.setValoresStore(event);
      expect(store.setObservaciones).toHaveBeenCalledWith('obs');
    });

    it('should call setEntidad when metodoNombre is setEntidad', () => {
      const event = createEvent('entidad', 'setEntidad', 'ent');
      component.setValoresStore(event);
      expect(store.setEntidad).toHaveBeenCalledWith('ent');
    });

    it('should call setRepresentacion when metodoNombre is setRepresentacion', () => {
      const event = createEvent('representacion', 'setRepresentacion', 'rep');
      component.setValoresStore(event);
      expect(store.setRepresentacion).toHaveBeenCalledWith('rep');
    });

    it('should call setUmt when metodoNombre is setUmt', () => {
      const event = createEvent('umt', 'setUmt', 'umtValue');
      component.setValoresStore(event);
      expect(store.setUmt).toHaveBeenCalledWith('umtValue');
    });

    it('should call setNico when metodoNombre is setNico', () => {
      const event = createEvent('nico', 'setNico', 'nicoValue');
      component.setValoresStore(event);
      expect(store.setNico).toHaveBeenCalledWith('nicoValue');
    });

    it('should call setFraccion when metodoNombre is setFraccion', () => {
      const event = createEvent('fraccion', 'setFraccion', 'frac');
      component.setValoresStore(event);
      expect(store.setFraccion).toHaveBeenCalledWith('frac');
    });

    it('should log an error for an unknown metodoNombre', () => {
      console.error = jest.fn();
      const event = createEvent('unknown', 'unknownMethod', 'value');
      component.setValoresStore(event);
      expect(console.error).toHaveBeenCalledWith('Método unknownMethod no existe en Tramite130121Store');
    });
  });

  it('should unsubscribe on ngOnDestroy', () => {
    component.ngOnDestroy();
    // Check that the Subject is stopped.
    expect(component['destroyed$'].isStopped).toBe(true);
  });

  it('ngOnInit should call all initialization methods and set form values from observables', () => {
    const spyInitForms = jest.spyOn(component, 'inicializarFormularios');
    const spyConfigSubs = jest.spyOn(component, 'configuracionFormularioSuscripciones');
    const spyOpciones = jest.spyOn(component, 'opcionesDeBusqueda');
    const spyFormularioTotalCount = jest.spyOn(component, 'formularioTotalCount');
    const spyGetEstablecimiento = jest.spyOn(component, 'getEstablecimiento');
    const spyCalcularTotales = jest.spyOn(component, 'calcularTotales');
    const spyFetchEntidadFederativa = jest.spyOn(component, 'fetchEntidadFederativa');
    const spyFetchRepresentacionFederal = jest.spyOn(component, 'fetchRepresentacionFederal');
    const spyListaDePaises = jest.spyOn(component, 'listaDePaisesDisponibles');

    component.ngOnInit();

    expect(spyInitForms).toHaveBeenCalled();
    expect(spyConfigSubs).toHaveBeenCalled();
    expect(spyOpciones).toHaveBeenCalled();
    expect(spyFormularioTotalCount).toHaveBeenCalled();
    expect(spyGetEstablecimiento).toHaveBeenCalled();
    expect(spyCalcularTotales).toHaveBeenCalled();
    expect(spyFetchEntidadFederativa).toHaveBeenCalled();
    expect(spyFetchRepresentacionFederal).toHaveBeenCalled();
    expect(spyListaDePaises).toHaveBeenCalled();

    // Verify observable subscription updating form values:
    expect(component.formDelTramite.value).toMatchObject({
      solicitud: 'Test solicitud',
      regimen: 'Test regimen',
      clasificacion: 'Test clasificacion',
    });
    expect(component.mercanciaForm.value).toMatchObject({
      plazo: 'Test plazo',
      descripcion: 'Test desc',
      fraccion: 'Test fraccion',
      cantidad: '5',
      unidadMedida: 'Test unidad',
    });
    // mostrarTabla is updated via subscription (initially false)
    expect(component.mostrarTabla).toBe(false);
  });
});
