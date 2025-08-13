import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /**
   * Identificador único del catálogo.
   */
  id: number;

  /**
   * Descripción del catálogo.
   */
  descripcion: string;
}

/**
 * Estado inicial para la interfaz del trámite 120403.
 */
export interface Solicitud120403State {
  /**
   * Valor seleccionado en las opciones de asignación.
   */
  asignacionRadio: string;

  /**
   * Solicitud de asignación.
   */
  asignacionsolitud: string;

  /**
   * Número de trámite.
   */
  numTramite: string;

  /**
   * Fecha de finalización.
   */
  fechaFin: string;

  /**
   * Monto a ampliar.
   */
  ampliar: string;

  /**
   * Valor seleccionado en el estado.
   */
  valorSeleccionado: string | null;

  fechaInicio: string;
  
fechadeFin: string;
  montoAutorizado: string;
  montoExpedido: string;
  montoDisponible: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 120403.
 * @returns Estado inicial de tipo `Solicitud120403State`.
 */
export function createInitialState(): Solicitud120403State {
  return {
    asignacionRadio: '',
    asignacionsolitud: '',
    numTramite: '',
    fechaFin: '',
    ampliar: '',
    valorSeleccionado: null,
    fechaInicio: '',
    fechadeFin: '',
    montoAutorizado: '',
    montoExpedido: '',
    montoDisponible: '',
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 120403.
 * Gestiona las operaciones relacionadas con el estado de la solicitud.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120403', resettable: true })
export class Tramite120403Store extends Store<Solicitud120403State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el valor seleccionado en el estado.
   * @param valorSeleccionado Nuevo valor seleccionado.
   */
  public setValorSeleccionado(valorSeleccionado: string): void {
    this.update((state) => ({
      ...state,
      valorSeleccionado,
    }));
  }

  /**
   * Actualiza el valor de la opción seleccionada en el radio de asignación.
   * @param asignacionRadio Nuevo valor de la opción seleccionada.
   */
  public setAsignacionRadio(asignacionRadio: string): void {
    this.update((state) => ({
      ...state,
      asignacionRadio,
    }));
  }

  /**
   * Actualiza el valor de la solicitud de asignación.
   * @param asignacionsolitud Nuevo valor de la solicitud de asignación.
   */
  public setAsignacionsolitud(asignacionsolitud: string): void {
    this.update((state) => ({
      ...state,
      asignacionsolitud,
    }));
  }

  /**
   * Actualiza el número de trámite en el estado.
   * @param numTramite Nuevo número de trámite.
   */
  public setNumTramite(numTramite: string): void {
    this.update((state) => ({
      ...state,
      numTramite,
    }));
  }

  /**
   * Actualiza la fecha de finalización en el estado.
   * @param fechaFin Nueva fecha de finalización.
   */
  public setFechaFin(fechaFin: string): void {
    this.update((state) => ({
      ...state,
      fechaFin,
    }));
  }

  /**
   * Actualiza el monto a ampliar en el estado.
   * @param ampliar Nuevo monto a ampliar.
   */
  public setAmpliar(ampliar: string): void {
    this.update((state) => ({
      ...state,
      ampliar,
    }));
  }
  /**
   * Actualiza la fecha de inicio en el estado.
   * @param fechaInicio Nueva fecha de inicio.
   */
  public setFechaInicio(fechaInicio: string): void {
    this.update((state) => ({
      ...state,
      fechaInicio,
    }));
  }
  /**
   * Actualiza la fecha de fin en el estado.
   * @param fechadeFin Nueva fecha de fin.
   */
  public setFechadeFin(fechadeFin: string): void {
    this.update((state) => ({
      ...state,
      fechadeFin,
    }));
  }
  /**
   * Actualiza el monto autorizado en el estado.
   * @param montoAutorizado Nuevo monto autorizado.
   */
  public setMontoAutorizado(montoAutorizado: string): void {
    this.update((state) => ({
      ...state,
      montoAutorizado,
    }));
  }

  /**
   * Actualiza el monto expedido en el estado.
   * @param montoExpedido Nuevo monto expedido.
   */
  public setMontoExpedido(montoExpedido: string): void {
    this.update((state) => ({
      ...state,
      montoExpedido,
    }));
  }
  /**
   * Actualiza el monto disponible en el estado.
   * @param montoDisponible Nuevo monto disponible.
   */
  public setMontoDisponible(montoDisponible: string): void {
    this.update((state) => ({
      ...state,
      montoDisponible,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   * Restaura el estado a sus valores iniciales.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}