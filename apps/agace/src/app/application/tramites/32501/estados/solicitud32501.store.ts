import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que define la estructura del estado de la solicitud 32501.
 */
export interface Solicitud32501State {
  /**
   * Código único de identificación.
   */
  adace: string;

  /**
   * Fecha de inicio de exposición en formato string.
   */
  fechaIniExposicion: string;

  /**
   * Identificador genérico.
   */
  ideGenerica1: string;

  /**
   * Identificación de la transacción en VU.
   */
  idTransaccionVU: string;

  /**
   * Clave de fracción arancelaria, puede ser un número o una cadena.
   */
  cveFraccionArancelaria: string | number;

  /**
   * Número de Identificación Comercial.
   */
  nico: string;

  /**
   * Peso de la mercancía.
   */
  peso: string;

  /**
   * Valor en dólares estadounidenses.
   */
  valorUSD: string;

  /**
   * Descripción detallada de la mercancía.
   */
  descripcionMercancia: string;

  /**
   * Nombre comercial de la mercancía.
   */
  nombreComercial: string;

  /**
   * Identificación de la entidad federativa, puede ser un número o una cadena.
   */
  entidadFederativa: string | number;

  /**
   * Identificación de la delegación o municipio, puede ser un número o una cadena.
   */
  delegacionMunicipio: string | number;

  /**
   * Identificación de la colonia, puede ser un número o una cadena.
   */
  colonia: string | number;

  /**
   * Nombre de la calle.
   */
  calle: string;

  /**
   * Número exterior del domicilio.
   */
  numeroExterior: string;

  /**
   * Número interior del domicilio.
   */
  numeroInterior: string;

  /**
   * Código postal del domicilio.
   */
  codigoPostal: string;

  /**
   * Número de patente asociado.
   */
  patente: string;

  /**
   * Registro Federal de Contribuyentes (RFC).
   */
  rfc: string;

  /**
   * Número de pedimento aduanal.
   */
  pedimento: string;

  /**
   * Código de la aduana, puede ser un número o una cadena.
   */
  aduana: string | number;
}

/**
 * Función para crear el estado inicial de la solicitud 32501.
 * Devuelve un objeto con valores vacíos o por defecto.
 */
export function createInitialSolicitudState(): Solicitud32501State {
  return {
    adace: '',
    fechaIniExposicion: '',
    ideGenerica1: '',
    idTransaccionVU: '',
    cveFraccionArancelaria: '',
    nico: '',
    peso: '',
    valorUSD: '',
    descripcionMercancia: '',
    nombreComercial: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    patente: '',
    rfc: '',
    pedimento: '',
    aduana: '',
  };
}

/**
 * Servicio de almacenamiento para la solicitud 32501.
 * Se encarga de gestionar y actualizar el estado de la solicitud.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud32501', resettable: true })
export class Solicitud32501Store extends Store<Solicitud32501State> {
  /**
   * Constructor que inicializa el estado de la solicitud con valores predeterminados.
   */
  constructor() {
    super(createInitialSolicitudState());
  }

  /** Métodos para actualizar diferentes propiedades del estado de la solicitud. */

  /**
   * Actualiza el valor de "Adace".
   */
  actualizarAdace(adace: string): void {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }

  /**
   * Actualiza la fecha de inicio de exposición.
   */
  actualizarFechaIniExposicion(fechaIniExposicion: string): void {
    this.update((state) => ({
      ...state,
      fechaIniExposicion,
    }));
  }

  /**
   * Actualiza la clave de identificación genérica.
   */
  actualizarIdeGenerica1(ideGenerica1: string): void {
    this.update((state) => ({
      ...state,
      ideGenerica1,
    }));
  }

  /**
   * Actualiza el identificador de transacción en VU.
   */
  actualizarIdTransaccionVU(idTransaccionVU: string): void {
    this.update((state) => ({
      ...state,
      idTransaccionVU,
    }));
  }

  /**
   * Actualiza la clave de fracción arancelaria.
   */
  actualizarCveFraccionArancelaria(
    cveFraccionArancelaria: string | number
  ): void {
    this.update((state) => ({
      ...state,
      cveFraccionArancelaria,
    }));
  }

  /**
   * Actualiza el NICO (Número de Identificación Comercial).
   */
  actualizarNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  /**
   * Actualiza el peso de la mercancía.
   */
  actualizarPeso(peso: string): void {
    this.update((state) => ({
      ...state,
      peso,
    }));
  }

  /**
   * Actualiza el valor en USD de la mercancía.
   */
  actualizarValorUSD(valorUSD: string): void {
    this.update((state) => ({
      ...state,
      valorUSD,
    }));
  }

  /**
   * Actualiza la descripción de la mercancía.
   */
  actualizarDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      descripcionMercancia,
    }));
  }

  /**
   * Actualiza el nombre comercial.
   */
  actualizarNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  /**
   * Actualiza la entidad federativa seleccionada.
   */
  actualizarEntidadFederativa(entidadFederativa: string | number): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * Actualiza la delegación o municipio seleccionado.
   */
  actualizarDelegacionMunicipio(delegacionMunicipio: string | number): void {
    this.update((state) => ({
      ...state,
      delegacionMunicipio,
    }));
  }

  /**
   * Actualiza la colonia seleccionada.
   */
  actualizarColonia(colonia: string | number): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  /**
   * Actualiza la calle registrada.
   */
  actualizarCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Actualiza el número exterior de la dirección.
   */
  actualizarNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  /**
   * Actualiza el número interior de la dirección.
   */
  actualizarNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  /**
   * Actualiza el código postal registrado.
   */
  actualizarCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * Actualiza la patente del agente aduanal.
   */
  actualizarPatente(patente: string): void {
    this.update((state) => ({
      ...state,
      patente,
    }));
  }

  /**
   * Actualiza el RFC del agente aduanal.
   */
  actualizaRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Actualiza el número de pedimento.
   */
  actualizarPedimento(pedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimento,
    }));
  }

  /**
   * Actualiza la aduana de importación.
   */
  actualizarAduana(aduana: string | number): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
   * Restaura el estado del almacén a su valor inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
