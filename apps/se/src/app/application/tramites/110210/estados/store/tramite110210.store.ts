import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @descripcion
 * Interfaz que define el estado del store `Tramite110210State`.
 */
export interface Tramite110210State {
  /**
   * Clave del registro del productor.
   * @type {string}
   */
  cveRegistroProductor: string;

  /**
   * Clave del país o bloque.
   * @type {string}
   */
  paisBloqueClave: string;

  /**
   * Clave del tratado o acuerdo.
   * @type {string}
   */
  tratadoAcuerdoClave: string;

  /**
   * Ficha de expedición.
   * @type {string}
   */
  fichaExpedicion: string;

  /**
   * Fecha de vencimiento.
   * @type {string}
   */
  fechaVecimiento: string;

  /**
   * Nombres del solicitante.
   * @type {string}
   */
  nombres: string;

  /**
   * Primer apellido del solicitante.
   * @type {string}
   */
  primerApellido: string;

  /**
   * Segundo apellido del solicitante.
   * @type {string}
   */
  segundoApellido: string;

  /**
   * Número de registro fiscal.
   * @type {string}
   */
  numeroRegistroFiscal: string;

  /**
   * Razón social.
   * @type {string}
   */
  razonSocial: string;

  /**
   * Ciudad del domicilio.
   * @type {string}
   */
  ciudad: string;

  /**
   * Calle del domicilio.
   * @type {string}
   */
  calle: string;

  /**
   * Número o letra del domicilio.
   * @type {string}
   */
  numeroLetra: string;

  /**
   * Teléfono de contacto.
   * @type {string}
   */
  telefono: string;

  /**
   * Fax de contacto.
   * @type {string}
   */
  fax: string;

  /**
   * Correo electrónico de contacto.
   * @type {string}
   */
  correoElectronico: string;

  /**
   * Observaciones adicionales.
   * @type {string}
   */
  observaciones: string;
}

/**
 * @descripcion
 * Función que crea el estado inicial del store `Tramite110210State`.
 * @returns {Tramite110210State} Estado inicial del store.
 */
export function createInitialState(): Tramite110210State {
  return {
    cveRegistroProductor: '',
    paisBloqueClave: '',
    tratadoAcuerdoClave: '',
    fichaExpedicion: '',
    fechaVecimiento: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    numeroRegistroFiscal: '',
    razonSocial: '',
    ciudad: '',
    calle: '',
    numeroLetra: '',
    telefono: '',
    fax: '',
    correoElectronico: '',
    observaciones: '',
  };
}

/**
 * @descripcion
 * Servicio que implementa el store `Tramite110210Store` para gestionar el estado
 * relacionado con el trámite 110210.
 *
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110210', resettable: true })
export class Tramite110210Store extends Store<Tramite110210State> {
  /**
   * @descripcion
   * Constructor del store `Tramite110210Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @descripcion
   * Actualiza la clave del país o bloque en el estado.
   * @param {string} paisBloqueClave - Nueva clave del país o bloque.
   */
  public setPaisBloqueClave(paisBloqueClave: string): void {
    this.update((state) => ({
      ...state,
      paisBloqueClave,
    }));
  }

  /**
   * @descripcion
   * Actualiza la clave del tratado o acuerdo en el estado.
   * @param {string} tratadoAcuerdoClave - Nueva clave del tratado o acuerdo.
   */
  public setTratadoAcuerdoClave(tratadoAcuerdoClave: string): void {
    this.update((state) => ({
      ...state,
      tratadoAcuerdoClave,
    }));
  }

  /**
   * @descripcion
   * Actualiza la clave del registro del productor en el estado.
   * @param {string} cveRegistroProductor - Nueva clave del registro del productor.
   */
  public setCveRegistroProductor(cveRegistroProductor: string): void {
    this.update((state) => ({
      ...state,
      cveRegistroProductor,
    }));
  }

  /**
   * @descripcion
   * Actualiza la ficha de expedición en el estado.
   * @param {string} fichaExpedicion - Nueva ficha de expedición.
   */
  public setFichaExpedicion(fichaExpedicion: string): void {
    this.update((state) => ({
      ...state,
      fichaExpedicion,
    }));
  }

  /**
   * @descripcion
   * Actualiza la fecha de vencimiento en el estado.
   * @param {string} fechaVecimiento - Nueva fecha de vencimiento.
   */
  public setFechaVecimiento(fechaVecimiento: string): void {
    this.update((state) => ({
      ...state,
      fechaVecimiento,
    }));
  }

  /**
   * @descripcion
   * Actualiza los nombres en el estado.
   * @param {string} nombres - Nuevos nombres.
   */
  public setNombres(nombres: string): void {
    this.update((state) => ({
      ...state,
      nombres,
    }));
  }

  /**
   * @descripcion
   * Actualiza el primer apellido en el estado.
   * @param {string} primerApellido - Nuevo primer apellido.
   */
  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  /**
   * @descripcion
   * Actualiza el segundo apellido en el estado.
   * @param {string} segundoApellido - Nuevo segundo apellido.
   */
  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  /**
   * @descripcion
   * Actualiza el número de registro fiscal en el estado.
   * @param {string} numeroRegistroFiscal - Nuevo número de registro fiscal.
   */
  public setNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      numeroRegistroFiscal,
    }));
  }

  /**
   * @descripcion
   * Actualiza la razón social en el estado.
   * @param {string} razonSocial - Nueva razón social.
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  /**
   * @descripcion
   * Actualiza la ciudad en el estado.
   * @param {string} ciudad - Nueva ciudad.
   */
  public setCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }

  /**
   * @descripcion
   * Actualiza la calle en el estado.
   * @param {string} calle - Nueva calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * @descripcion
   * Actualiza el número o letra en el estado.
   * @param {string} numeroLetra - Nuevo número o letra.
   */
  public setNumeroLetra(numeroLetra: string): void {
    this.update((state) => ({
      ...state,
      numeroLetra,
    }));
  }

  /**
   * @descripcion
   * Actualiza el teléfono en el estado.
   * @param {string} telefono - Nuevo teléfono.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * @descripcion
   * Actualiza el fax en el estado.
   * @param {string} fax - Nuevo fax.
   */
  public setFax(fax: string): void {
    this.update((state) => ({
      ...state,
      fax,
    }));
  }

  /**
   * @descripcion
   * Actualiza el correo electrónico en el estado.
   * @param {string} correoElectronico - Nuevo correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * @descripcion
   * Actualiza las observaciones en el estado.
   * @param {string} observaciones - Nuevas observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

    /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores parciales para actualizar el estado.
   */
  public actualizarEstado(valores: Partial<Tramite110210State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}
