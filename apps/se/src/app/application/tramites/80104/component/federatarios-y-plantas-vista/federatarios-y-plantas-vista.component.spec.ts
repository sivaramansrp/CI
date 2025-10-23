import { FederatariosYPlantasVistaComponent } from '../../../../../80103/component/federatarios-y-plantas-vista/federatarios-y-plantas-vista.component';
import { Tramite80101Store } from '../../../../../80103/estados/tramite80101.store';
import { Tramite80101Query } from '../../../../../80103/estados/tramite80101.query';
import { ComplimentosService } from '../../../../../80103/shared/services/complimentos.service';
import { of, Subject } from 'rxjs';
import { FEDERATARIOS, PLANTAS_DIPONIBLES, PLANTAS_IMMEX, FederatariosEncabezado, PlantasDisponibles, PlantasImmex } from '../../../../../80103/shared/models/federatarios-y-plantas.model';
import { ComplementarPlantaState, ComplementoDePlanta, MontoDeInversion } from '../../../../../80103/shared/constantes/complementar-planta.enum';
import { Directos } from '../../../../../80103/shared/constantes/empleados.enum';
import { CapacidadInstalada } from '../../../../../80103/shared/constantes/capacidad-instalada.enum';

describe('FederatariosYPlantasVistaComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let store: Tramite80101Store;
  let query: Tramite80101Query;
  let complimentoSvc: ComplimentosService;

  beforeEach(() => {
    store = {
      setFederatarios: jest.fn(),
      setPlantasDisponiblesTablaLista: jest.fn(),
      setPlantasImmexTablaLista: jest.fn(),
      setComplementarPlantaDatos: jest.fn(),
      setFirmantesDatos: jest.fn(),
      setMontosInversionDatos: jest.fn(),
      setEmpleadosDatos: jest.fn(),
      setFederatariosCatalogo: jest.fn(),
      setCapacidadInstaladaTableLista: jest.fn(),
    } as any;

    query = {
      selectDatosFederatarios$: of([]),
      selectDatosPlantasDisponibles$: of([]),
      selectDatosPlantasImmex$: of([]),
      selectDatosFederatariosFormulario$: of({ estadoDos: 'CDMX' }),
    } as any;

    complimentoSvc = {
      getPlantasDisponibles: jest.fn().mockReturnValue(of({ datos: [{ id: 1 }] })),
      mapApiResponseToPlantasDisponibles: jest.fn().mockReturnValue([{ id: 1 }]),
    } as any;

    component = new FederatariosYPlantasVistaComponent(store, query, complimentoSvc);
  });

  it('should initialize federatariosTablaConfiguracion correctly', () => {
    expect(component.federatariosTablaConfiguracion.TablaSeleccion).toBeDefined();
    expect(component.federatariosTablaConfiguracion.TablaEncabezado).toBe(FEDERATARIOS);
  });

  it('should initialize plantasDisponiblesTablaConfiguracion correctly', () => {
    expect(component.plantasDisponiblesTablaConfiguracion.TablaSeleccion).toBeDefined();
    expect(component.plantasDisponiblesTablaConfiguracion.TablaEncabezado).toBe(PLANTAS_DIPONIBLES);
  });

  it('should initialize plantasImmexTablaConfiguracion correctly', () => {
    expect(component.plantasImmexTablaConfiguracion.TablaSeleccion).toBeDefined();
    expect(component.plantasImmexTablaConfiguracion.TablaEncabezado).toBe(PLANTAS_IMMEX);
  });

  it('should call store.setFederatarios on setFormaDatos', () => {
    const datos = { estadoDos: 'CDMX' } as FederatariosEncabezado;
    component.setFormaDatos(datos);
    expect(store.setFederatarios).toHaveBeenCalledWith(datos);
  });

  it('should call store.setPlantasDisponiblesTablaLista on setPlantasDisponiblesDatos with valid response', () => {
    component.estadoValor = 'CDMX';
    component.setPlantasDisponiblesDatos();
    expect(complimentoSvc.getPlantasDisponibles).toHaveBeenCalled();
    expect(store.setPlantasDisponiblesTablaLista).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('should handle error in setPlantasDisponiblesDatos', () => {
    complimentoSvc.getPlantasDisponibles = jest.fn().mockReturnValue(of({}));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.estadoValor = 'CDMX';
    component.setPlantasDisponiblesDatos();
    spy.mockRestore();
  });

  it('should call store.setPlantasImmexTablaLista on setPlantasImmexDatos', () => {
    const datos = [{ id: 1 }] as PlantasImmex[];
    component.setPlantasImmexDatos(datos);
    expect(store.setPlantasImmexTablaLista).toHaveBeenCalledWith(datos);
  });

  it('should call store.setComplementarPlantaDatos on setComplementarPlantaList', () => {
    const datos = [{ id: 1 }] as ComplementoDePlanta[];
    component.setComplementarPlantaList(datos);
    expect(store.setComplementarPlantaDatos).toHaveBeenCalledWith(datos);
  });

  it('should call store.setFirmantesDatos on setFirmantesList', () => {
    const datos = [{ id: 1 }] as ComplementarPlantaState[];
    component.setFirmantesList(datos);
    expect(store.setFirmantesDatos).toHaveBeenCalledWith(datos);
  });

  it('should call store.setMontosInversionDatos on setMontosInversionList', () => {
    const datos = [{ id: 1 }] as MontoDeInversion[];
    component.setMontosInversionList(datos);
    expect(store.setMontosInversionDatos).toHaveBeenCalledWith(datos);
  });

  it('should call store.setEmpleadosDatos on setEmpleadosList', () => {
    const datos = [{ id: 1 }] as Directos[];
    component.setEmpleadosList(datos);
    expect(store.setEmpleadosDatos).toHaveBeenCalledWith(datos);
  });

  it('should set estadoValor and call store.setFederatariosCatalogo on setDatosFederatarios', () => {
    const datos = { estadoDos: 'JALISCO' } as FederatariosEncabezado;
    component.setDatosFederatarios(datos);
    expect(component.estadoValor).toBe('JALISCO');
    expect(store.setFederatariosCatalogo).toHaveBeenCalledWith(datos);
  });

  it('should call store.setCapacidadInstaladaTableLista on obtenerCapacidadInstaladaTablaList', () => {
    const datos = [{ id: 1 }] as CapacidadInstalada[];
    component.obtenerCapacidadInstaladaTablaList(datos);
    expect(store.setCapacidadInstaladaTableLista).toHaveBeenCalledWith(datos);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should initialize observables and datosFederatarios on ngOnInit', () => {
    component.ngOnInit();
    expect(component.federatariosTablaLista$).toBeDefined();
    expect(component.plantasDisponiblesTablaLista$).toBeDefined();
    expect(component.plantasImmexTablaLista$).toBeDefined();
    expect(component.datosFederatarios.estadoDos).toBe('CDMX');
  });
});