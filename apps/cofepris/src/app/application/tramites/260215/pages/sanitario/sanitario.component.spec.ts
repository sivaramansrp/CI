import { SanitarioComponent } from './sanitario.component';

describe('SanitarioComponent', () => {
  let component: SanitarioComponent;
  let query: any;
  let registroSolicitudService: any;
  let serviciosPermisoSanitarioService: any;

  beforeEach(() => {
    query = { selectTramiteState$: { pipe: jest.fn().mockReturnThis() } };
    registroSolicitudService = {
      postGuardarDatos: jest.fn().mockReturnValue({ pipe: jest.fn().mockReturnThis() })
    };
    serviciosPermisoSanitarioService = {};
    component = new SanitarioComponent(query, registroSolicitudService, serviciosPermisoSanitarioService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cargarArchivosEvento on onClickCargaArchivos', () => {
    const spy = jest.spyOn(component.cargarArchivosEvento, 'emit');
    component.onClickCargaArchivos();
    expect(spy).toHaveBeenCalled();
  });

  it('should set activarBotonCargaArchivos on manejaEventoCargaDocumentos', () => {
    component.manejaEventoCargaDocumentos(true);
    expect(component.activarBotonCargaArchivos).toBe(true);
  });

  it('should set seccionCargarDocumentos on cargaRealizada', () => {
    component.cargaRealizada(true);
    expect(component.seccionCargarDocumentos).toBe(false);
    component.cargaRealizada(false);
    expect(component.seccionCargarDocumentos).toBe(true);
  });

  it('should set cargaEnProgreso on onCargaEnProgreso', () => {
    component.onCargaEnProgreso(false);
    expect(component.cargaEnProgreso).toBe(false);
  });

  it('should update seccionCargarDocumentos on actualizarSeccionCargarDocumentos', () => {
    component.indice = 2;
    (component as any).actualizarSeccionCargarDocumentos();
    expect(component.seccionCargarDocumentos).toBe(true);
    component.indice = 1;
    (component as any).actualizarSeccionCargarDocumentos();
    expect(component.seccionCargarDocumentos).toBe(false);
  });

  it('should go to next step on continuarDespuesDeCarga', () => {
    component.wizardComponent = { siguiente: jest.fn() } as any;
    component.continuarDespuesDeCarga();
    expect(component.indice).toBe(3);
    expect(component.datosPasos.indice).toBe(3);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should go to next step on siguiente', () => {
    component.wizardComponent = { siguiente: jest.fn() } as any;
    component.siguiente();
    expect(component.indice).toBe(3);
    expect(component.datosPasos.indice).toBe(3);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should go to previous step on anterior', () => {
    component.wizardComponent = { atras: jest.fn() } as any;
    component.indice = 2;
    component.anterior();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should call registroSolicitudService.postGuardarDatos in guardarDatosAPI', () => {
    const pipeMock = jest.fn().mockReturnValue({ subscribe: jest.fn() });
    query.selectTramiteState$.pipe = jest.fn(() => ({
      subscribe: (fn: any) => fn({})
    }));
    registroSolicitudService.postGuardarDatos = jest.fn();
    component.guardarDatosAPI();
    expect(registroSolicitudService.postGuardarDatos).toHaveBeenCalled();
  });

  it('should call registroSolicitudService.postGuardarDatos in onGuardar', () => {
    query.selectTramiteState$.pipe = jest.fn(() => ({
      subscribe: (fn: any) => fn({})
    }));
    registroSolicitudService.postGuardarDatos = jest.fn().mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn()
      })
    });
    component.onGuardar();
    expect(registroSolicitudService.postGuardarDatos).toHaveBeenCalled();
  });
});