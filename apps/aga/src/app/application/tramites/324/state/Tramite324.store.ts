import { Store, StoreConfig } from '@datorama/akita';
import { AccesosTabla } from '../models/tecnologicos.model';
import { Injectable } from '@angular/core';

/**
 * Estado inicial para la interfaz del trámite 324.
 */
export interface Solicitud324State {
  /**
   * Lista de accesos configurados en la solicitud.
   */
  AccesosDatos: AccesosTabla[];

  /**
   * Registro Federal de Contribuyentes (RFC) del solicitante.
   */
  rfc: string;

  /**
   * Aduana seleccionada en la solicitud.
   */
  aduana: string;

  /**
   * Sistema seleccionado en la solicitud.
   */
  sistema: string;

  /**
   * Rol o perfil seleccionado en la solicitud.
   */
  rol: string;

  /**
   * Tipo de movimiento seleccionado en la solicitud.
   */
  tipoMovimiento: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 324.
 * @returns Estado inicial de tipo `Solicitud324State`.
 */
export function createInitialState(): Solicitud324State {
  return {
    /**
     * Lista inicial de accesos configurados, vacía por defecto.
     */
    AccesosDatos: [],

    /**
     * Valor inicial del RFC, vacío por defecto.
     */
    rfc: '',

    /**
     * Valor inicial de la aduana, vacío por defecto.
     */
    aduana: '',

    /**
     * Valor inicial del sistema, vacío por defecto.
     */
    sistema: '',

    /**
     * Valor inicial del rol, vacío por defecto.
     */
    rol: '',

    /**
     * Valor inicial del tipo de movimiento, vacío por defecto.
     */
    tipoMovimiento: '',
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 324.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite324', resettable: true })
export class Tramite324Store extends Store<Solicitud324State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Agrega un nuevo acceso a la lista de accesos configurados.
   * @param newAccesos Objeto que representa el nuevo acceso a agregar.
   */
  public addAccesosDatos(newAccesos: AccesosTabla): void {
    this.update((state) => ({
      ...state,
      AccesosDatos: [...state.AccesosDatos, newAccesos],
    }));
  }

  /**
   * Actualiza el RFC en el estado.
   * @param rfc Nuevo valor del RFC.
   */
  public setRFC(rfc: string): void {
    this.update((state) => ({ ...state, rfc }));
  }

  /**
   * Actualiza la aduana en el estado.
   * @param aduana Nuevo valor de la aduana.
   */
  public setAduana(aduana: string): void {
    this.update((state) => ({ ...state, aduana }));
  }

  /**
   * Actualiza el sistema en el estado.
   * @param sistema Nuevo valor del sistema.
   */
  public setSistema(sistema: string): void {
    this.update((state) => ({ ...state, sistema }));
  }

  /**
   * Actualiza el rol en el estado.
   * @param rol Nuevo valor del rol.
   */
  public setRol(rol: string): void {
    this.update((state) => ({ ...state, rol }));
  }

  /**
   * Actualiza el tipo de movimiento en el estado.
   * @param tipoMovimiento Nuevo valor del tipo de movimiento.
   */
  public setTipoMovimiento(tipoMovimiento: string): void {
    this.update((state) => ({ ...state, tipoMovimiento }));
  }

  /**
   * Restaura el estado al valor inicial.
   * Este método reinicia todos los valores del estado a sus valores predeterminados.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}