import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud32401State {
  tipoBusqueda: string | number;
  rfc: string;
  tipoDeTramite: string;
  tipoDeRequerimiento: string;
  folioDeTramite: string;
  datosDelContenedor: [];
  motivoCancelacion?: string;
}

export function createInitialState(): Solicitud32401State {
  return {
    tipoBusqueda: 0,
    rfc: '',
    tipoDeTramite: '',
    tipoDeRequerimiento: '',
    folioDeTramite: '',
    datosDelContenedor: [],
    motivoCancelacion: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32401', resettable: true })
export class Tramite32401Store extends Store<Solicitud32401State> {

  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el tipo de búsqueda en el estado de la tienda.
   *
   * @param tipoBusqueda - El tipo de búsqueda que se desea establecer.
   */
  public setTipoBusqueda(tipoBusqueda: string | number): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }

  /**
   * Establece el RFC en el estado de la tienda.
   *
   * @param rfc - El RFC (Registro Federal de Contribuyentes) que se desea establecer.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece el tipo de trámite en el estado de la tienda.
   *
   * @param tipoDeTramite - El tipo de trámite que se desea establecer.
   */
  public setTipoDeTramite(tipoDeTramite: string): void {
    this.update((state) => ({
      ...state,
      tipoDeTramite,
    }));
  }

  /**
   * Establece el tipo de requerimiento en el estado de la tienda.
   *
   * @param tipoDeRequerimiento - El tipo de requerimiento que se desea establecer.
   */
  public setTipoDeRequerimiento(tipoDeRequerimiento: string) : void{
    this.update((state) => ({
      ...state,
      tipoDeRequerimiento,
    }));
  }

  /**
   * Establece el folio del trámite en el estado de la tienda.
   *
   * @param folioDeTramite - El folio del trámite que se desea establecer.
   */
  public setFolioDeTramite(folioDeTramite: string) : void{
    this.update((state) => ({
      ...state,
      folioDeTramite,
    }));
  }

  /**
   * Establece los datos del contenedor en el estado de la tienda.
   *
   * @param datosDelContenedor - Un arreglo que contiene los datos del contenedor a establecer.
   * 
   * Este método actualiza el estado de la tienda con los datos proporcionados.
   */
  public setDelContenedor(datosDelContenedor: []): void {
    this.update((state) => ({
      ...state,
      datosDelContenedor,
    }));
  }

  /**
   * Establece el motivo de cancelación en el estado de la tienda.
   *
   * @param motivoCancelacion - El motivo de cancelación que se desea establecer.
   */
  public setMotivoCancelacion(motivoCancelacion: string): void {
    this.update((state) => ({
      ...state,
      motivoCancelacion,
    }));
  }

  public limpiarSolicitud(): void {
    this.reset();
  }
}
