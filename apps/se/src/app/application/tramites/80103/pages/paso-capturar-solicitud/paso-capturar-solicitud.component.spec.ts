import { PasoCapturarSolicitudComponent } from "../../../80103/pages/paso-capturar-solicitud/paso-capturar-solicitud.component";



describe('PasoCapturarSolicitudComponent', () => {
  let component: PasoCapturarSolicitudComponent;
  let tramiteQuery: any;
  let seccion: any;
  let nuevoProgramaIndustrialService: any;
  let tramite80103Store: any;
  let toastrService: any;
  let consultaQuery: any;
  let servicioDeFormularioService: any;
  let wizardService: any;
  let wizardComponent: any;

  beforeEach(() => {
    tramiteQuery = {
      FormaValida$: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) },
      selectSeccionState$: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) }
    };
    seccion = { establecerSeccion: jest.fn(), establecerFormaValida: jest.fn() };
    nuevoProgramaIndustrialService = {
      getAllState: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn(), toPromise: jest.fn() })) })),
      buildComplimentos: jest.fn(() => ({})),
      buildDeclaracionSolicitudEntries: jest.fn(() => ({})),
      buildPlantas: jest.fn(() => ([])),
      buildAnexo: jest.fn(() => ({ anexo: {} })),
      buildPlantasSubmanufactureras: jest.fn(() => ([])),
      buildDatosFederatarios: jest.fn(() => ([])),
      buildSociosAccionistas: jest.fn(() => ([])),
      guardarDatosPost: jest.fn(() => ({ subscribe: jest.fn((cb) => cb({ codigo: '00', mensaje: 'ok', datos: { id_solicitud: 1 } })) }))
    };
    tramite80103Store = { setIdSolicitud: jest.fn() };
    toastrService = { success: jest.fn(), error: jest.fn() };
    consultaQuery = {
      selectConsultaioState$: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) }
    };
    servicioDeFormularioService = {
      isFormValid: jest.fn(() => true),
      isArrayFilled: jest.fn(() => true),
      markFormAsTouched: jest.fn()
    };
    wizardService = { cambio_indice: jest.fn() };
    wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
      indiceActual: 0
    };

    component = new PasoCapturarSolicitudComponent(
      tramiteQuery,
      seccion,
      nuevoProgramaIndustrialService,
      tramite80103Store,
      toastrService,
      consultaQuery,
      servicioDeFormularioService
    );
    component.wizardService = wizardService;
    component.wizardComponent = wizardComponent;
    // component.consultaState = { readonly: false, update: false };
    // component.solicitudState = { idSolicitud: 1 };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify form validity', () => {
    expect(component.verificarLaValidezDelFormulario()).toBe(true);
  });

  it('should verify all arrays filled in 80103', () => {
    expect(component.isAllArraysFilledIn80103(['a', 'b'])).toBe(true);
  });

  it('should handle getValorIndice for cont action', async () => {
    //component.consultaState = { readonly: false, update: false };
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(true);
    // Use RxJS 'of' to return an Observable<boolean>
    component['shouldNavigate$'] = () => require('rxjs').of(true);
    const e = { valor: 1, accion: 'cont' };
    component.getValorIndice(e);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(wizardService.cambio_indice).toHaveBeenCalledWith(2);
    expect(wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should handle getValorIndice for ant action', () => {
    const e = { valor: 2, accion: 'ant' };
    component.getValorIndice(e);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(wizardComponent.atras).toHaveBeenCalled();
  });

  it('should handle getValorIndice when form is invalid', () => {
    //component.consultaState = { readonly: false, update: false };
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(false);
    const e = { valor: 1, accion: 'cont' };
    component.getValorIndice(e);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(servicioDeFormularioService.markFormAsTouched).toHaveBeenCalledWith('datosGeneralisForm');
  });

  it('should handle getValorIndice when readonly', () => {
   // component.consultaState = { readonly: true, update: false };
   component['shouldNavigate$'] = () => require('rxjs').of(true);
    const e = { valor: 1, accion: 'cont' };
    component.getValorIndice(e);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
  });

  it('should handle getValorIndice with invalid valor', () => {
    const e = { valor: 0, accion: 'cont' };
    component.getValorIndice(e);
    expect(component.indice).not.toBe(1);
  });

  it('should call shouldNavigate$', async () => {
    nuevoProgramaIndustrialService.getAllState = jest.fn(() => ({
      pipe: jest.fn(() => ({
        subscribe: jest.fn()
      }))
    }));
    nuevoProgramaIndustrialService.guardarDatosPost = jest.fn(() => ({
      subscribe: jest.fn((cb: any) => cb({ codigo: '00', mensaje: 'ok', datos: { id_solicitud: 1 } }))
    }));
    const obs = component['shouldNavigate$']();
    expect(obs).toBeTruthy();
  });

  it('should call obtenerDatosDelStore', () => {
    const spy = jest.spyOn(component, 'guardar').mockResolvedValue({} as any);
    component.obtenerDatosDelStore();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardar and setIdSolicitud', async () => {
    const data = { plantasImmexTablaLista: [], empressaSubFabricantePlantas: {}, tablaDatosFederatarios: [], tablaDatosComplimentos: [], tablaDatosComplimentosExtranjera: [] };
    const response = await component.guardar(data as any);
    expect(response).toBeTruthy();
    expect(tramite80103Store.setIdSolicitud).toHaveBeenCalledWith(1);
  });

  it('should call guardar and setIdSolicitud to 0 if invalid', async () => {
    nuevoProgramaIndustrialService.guardarDatosPost = jest.fn(() => ({
      subscribe: jest.fn((cb: any) => cb({ codigo: '00', mensaje: 'ok', datos: { id_solicitud: null } }))
    }));
    const data = { plantasImmexTablaLista: [], empressaSubFabricantePlantas: {}, tablaDatosFederatarios: [], tablaDatosComplimentos: [], tablaDatosComplimentosExtranjera: [] };
    await component.guardar(data as any);
    expect(tramite80103Store.setIdSolicitud).toHaveBeenCalledWith(0);
  });

  it('should emit cargarArchivosEvento', () => {
    const spy = jest.spyOn(component.cargarArchivosEvento, 'emit');
    component.onClickCargaArchivos();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle manejaEventoCargaDocumentos', () => {
    component.manejaEventoCargaDocumentos(true);
    expect(component.activarBotonCargaArchivos).toBe(true);
  });

  it('should handle cargaRealizada', () => {
    component.cargaRealizada(true);
    expect(component.seccionCargarDocumentos).toBe(false);
    component.cargaRealizada(false);
    expect(component.seccionCargarDocumentos).toBe(true);
  });

  it('should call siguiente', () => {
    component.siguiente();
    expect(wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should call anterior', () => {
    component.anterior();
    expect(wizardComponent.atras).toHaveBeenCalled();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should call ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'next');
    const spy2 = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});