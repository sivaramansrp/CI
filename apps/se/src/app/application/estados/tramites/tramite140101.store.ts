import { Store, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProgramaACancelar} from '../../shared/models/programa-cancelar.model';
/**
 * Creación del estado inicial para la interfaz de trámite 140101
 * @returns Programa140101State
 */
/**
 * Interfaz que define el estado del programa 140101
 */
export interface Programa140101State {

  /**
   * Observaciones de la solicitud
   */
  solicitudObservaciones: string;

  /**
   * Estado de confirmación
   */
  confirmar: boolean;

  /**
   * Información del programa a cancelar
   */
  programaACancelar: ProgramaACancelar;

  /**
   * Selección de radio
   */
  radio: number; 

  /**
   * Datos adicionales
   */
  datos: any[];
  
}

/**
 * Función para crear el estado inicial del store
 * @returns Estado inicial de Programa140101State
 */
export function createInitialState(): Programa140101State {
  return {
    solicitudObservaciones: '', // Valor inicial vacío para las observaciones
    confirmar: false, // Valor inicial para confirmar en falso
    radio: -1, // Valor inicial para la selección de radio
    datos: [], // Array vacío para datos adicionales
    programaACancelar: {
      folioPrograma: '', // Folio del programa
      idProgramaSeleccionado: '', // ID del programa seleccionado
      modalidad: '', // Modalidad del programa
      representacionFederal: '', // Representación federal
      tipoPrograma: '', // Tipo de programa
      estatus: '', // Estatus del programa
    }
  };
}

/**
 * Servicio que representa el store para el trámite 140101.
 * Proporciona métodos para actualizar y gestionar el estado del programa.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite140101', resettable: true })
export class Tramite140101Store extends Store<Programa140101State> {

  /**
   * Constructor de la clase Tramite140101Store.
   * Inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado de las observaciones de la solicitud.
   * @param estado Nuevo valor para solicitudObservaciones.
   */
  public setSolicitudObservaciones(estado: string) {
    this.update((state) => ({
      ...state, 
      solicitudObservaciones: estado,
    }));
  }

  /**
   * Actualiza el estado de confirmación.
   * @param estado Nuevo valor para confirmar.
   */
  public setConfirmar(estado: boolean) {
    this.update((state) => ({
      ...state,
      confirmar: estado,
    }));
  }

  /**
   * Actualiza el estado del programa a cancelar.
   * @param estado Nuevo valor para programaACancelar.
   */
  public setPrograma(estado: ProgramaACancelar) {
    this.update((state) => ({
      ...state,
      programaACancelar: estado,
    }));
  }

  /**
   * Actualiza la selección de radio.
   * @param estado Nuevo valor para radio.
   */
  public setRadioSelection(estado: number) {
    this.update((state) => ({
      ...state,
      radio: estado,
    }));
  }

  /**
   * Actualiza los datos adicionales.
   * @param estado Nuevo array de datos.
   */
  public setDatosData(estado: Array<any>) {
    this.update((state) => ({
      ...state,
      datos: estado,
    }));
  }
}
