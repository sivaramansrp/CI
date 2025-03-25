import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de la solicitud 11204.
 * Utilizamos esta interfaz para definir la estructura del estado de la solicitud.
 */
export interface Solicitud11204State {
  /**
   * Menú desplegable.
   */
  menúDesplegable: string;

  /**
   * RFC.
   */
  rfc: string;

  /**
   * Denominación.
   */
  denominacion: string;

  /**
   * Datos del contenedor.
   */
  datosDelContenedor: [];

  /**
   * Tipo de búsqueda.
   */
  tipoBusqueda: string;

  /**
   * Aduana.
   */
  aduana: string;

  /**
   * Fecha de ingreso.
   */
  fechaIngreso: string;

  /**
   * Vigencia.
   */
  Vigencia: string;

  /**
   * Iniciales del contenedor.
   */
  inicialesContenedor: string;

  /**
   * Número del contenedor.
   */
  numeroContenedor: string;

  /**
   * Dígito de control.
   */
  digitoDeControl: string;

  /**
   * Contenedores.
   */
  contenedores: string;

  /**
   * Menú desplegable de aduana.
   */
  aduanaMenúDesplegable: string;

  /**
   * Fecha de ingreso.
   */
  fechaDeIngreso: string;

  /**
   * Archivo seleccionado.
   */
  archivoSeleccionado: string;
}

/**
 * Función que crea el estado inicial de la solicitud 11204.
 * @returns El estado inicial de la solicitud 11204.
 */
export function createInitialState(): Solicitud11204State {
  return {
    menúDesplegable: '',
    rfc: 'AAL0409235E6',
    denominacion: 'AGRICOLA ALPE S DE RL DE CV',
    datosDelContenedor: [],
    tipoBusqueda: '',
    aduana: '',
    inicialesContenedor: '',
    numeroContenedor: '',
    digitoDeControl: '',
    contenedores: '',
    fechaIngreso: '',
    Vigencia: '',
    aduanaMenúDesplegable: '',
    fechaDeIngreso: '',
    archivoSeleccionado: ''
  };
}

/**
 * Servicio Injectable que gestiona el estado de la solicitud 11204.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite11204', resettable: true })
export class Tramite11204Store extends Store<Solicitud11204State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el valor del menú desplegable de aduana.
   * @param aduanaMenúDesplegable Valor del menú desplegable de aduana.
   */
  public setAduanaMenúDesplegable(aduanaMenúDesplegable: string): void {
    this.update((state) => ({
      ...state,
      aduanaMenúDesplegable,
    }));
  }

  /**
   * Establece la fecha de ingreso.
   * @param fechaDeIngreso Fecha de ingreso.
   */
  public setFechaDeIngreso(fechaDeIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaDeIngreso,
    }));
  }

  /**
   * Establece la vigencia.
   * @param Vigencia Vigencia.
   */
  public setVigencia(Vigencia: string): void {
    this.update((state) => ({
      ...state,
      Vigencia,
    }));
  }

  /**
   * Establece el RFC.
   * @param rfc RFC.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece la denominación.
   * @param denominacion Denominación.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Establece los datos del contenedor.
   * @param datosDelContenedor Datos del contenedor.
   */
  public setDelContenedor(datosDelContenedor: []): void {
    this.update((state) => ({
      ...state,
      datosDelContenedor,
    }));
  }

  /**
   * Establece el tipo de búsqueda.
   * @param tipoBusqueda Tipo de búsqueda.
   */
  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }

  /**
   * Establece la aduana.
   * @param aduana Aduana.
   */
  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
   * Establece la fecha de ingreso.
   * @param fechaIngreso Fecha de ingreso.
   */
  public setFechaIngreso(fechaIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaIngreso,
    }));
  }

  /**
   * Establece las iniciales del contenedor.
   * @param inicialesContenedor Iniciales del contenedor.
   */
  public setInicialesContenedor(inicialesContenedor: string): void {
    this.update((state) => ({
      ...state,
      inicialesContenedor,
    }));
  }

  /**
   * Establece el número del contenedor.
   * @param numeroContenedor Número del contenedor.
   */
  public setNumeroContenedor(numeroContenedor: string): void {
    this.update((state) => ({
      ...state,
      numeroContenedor,
    }));
  }

  /**
   * Establece el dígito de control.
   * @param digitoDeControl Dígito de control.
   */
  public setDigitoDeControl(digitoDeControl: string): void {
    this.update((state) => ({
      ...state,
      digitoDeControl,
    }));
  }

  /**
   * Establece los contenedores.
   * @param contenedores Contenedores.
   */
  public setContenedores(contenedores: string): void {
    this.update((state) => ({
      ...state,
      contenedores,
    }));
  }

  /**
   * Establece el archivo seleccionado.
   * @param archivoSeleccionado Archivo seleccionado.
   */
  public setArchivoSeleccionado(archivoSeleccionado: string): void {
    this.update((state) => ({
      ...state,
      archivoSeleccionado,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}