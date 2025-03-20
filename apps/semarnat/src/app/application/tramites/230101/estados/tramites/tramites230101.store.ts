import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que define el estado del trámite 230101.
 */
export interface Solicitud230101State {
  /**
   * Lista de fechas disponibles para los datos.
   */
  fechasDatos: string[];

  /**
   * Lista de fechas seleccionadas.
   */
  fechasSeleccionadas: string[];

  /**
   * Valor clave del trámite.
   */
  clave: string;

  /**
   * Tipo de producto relacionado con el trámite.
   */
  tipoDeProducto: string;

  /**
   * País de procedencia del producto.
   */
  paisDeProcedencia: string;

  /**
   * Opciones seleccionadas en el trámite.
   */
  selectedOptions: boolean[];

  /**
   * Clasificación de las mercancías.
   */
  clasificacionMercancias: string;

  /**
   * Fracción arancelaria del producto.
   */
  fraccionArancelaria: string;

  /**
   * Descripción de la fracción arancelaria.
   */
  descFraccionArancelaria: string;

  /**
   * Cantidad del producto.
   */
  cantidad: string;

  /**
   * Cantidad del producto en letras.
   */
  cantidadLetra: string;

  /**
   * Género del producto.
   */
  genero: string;

  /**
   * Especie del producto.
   */
  especie: string;

  /**
   * Nombre común del producto.
   */
  nombreComun: string;

  /**
   * Descripción del producto.
   */
  descDelProducto: string;

  /**
   * Unidad de medida del producto.
   */
  unidadDeMedida: string;

  /**
   * Indica si hay manifiestos y descripción.
   */
  manifiestosYdesc: boolean;

  /**
   * Indica si el trámite está exento de pago.
   */
  exentoDePago: string;

  /**
   * Justificación del trámite.
   */
  justificacion: string;

  /**
   * Clave de referencia del trámite.
   */
  claveDeReferencia: string;

  /**
   * Cadena de dependencia asociada al trámite.
   */
  cadenaDependencia: string;

  /**
   * Banco relacionado con el trámite.
   */
  banco: string;

  /**
   * Llave de pago del trámite.
   */
  llaveDePago: string;

  /**
   * Fecha de pago del trámite.
   */
  fechaPago: string;

  /**
   * Importe del pago realizado.
   */
  importePago: string;
}

/**
 * Crea el estado inicial para la interfaz de trámite 230101.
 * @returns {Solicitud230101State} Estado inicial del trámite.
 */
export function createInitialSolicitudState(): Solicitud230101State {
  return {
    fechasDatos: ['test 1', 'test 2'],
    fechasSeleccionadas: ['test 3'],
    clave: 'definitivos',
    tipoDeProducto: '',
    paisDeProcedencia: '',
    selectedOptions: [false, false, false],
    clasificacionMercancias: '',
    fraccionArancelaria: '',
    descFraccionArancelaria: '',
    cantidad: '',
    cantidadLetra: '',
    genero: '',
    especie: '',
    nombreComun: '',
    descDelProducto: '',
    unidadDeMedida: '',
    manifiestosYdesc: false,
    exentoDePago: 'No',
    justificacion: '',
    claveDeReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llaveDePago: '',
    fechaPago: '',
    importePago: ''
  };
}

/**
 * Store para gestionar el estado del trámite 230101.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud230101', resettable: true })
export class Solicitud230101Store extends Store<Solicitud230101State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  /**
   * Actualiza el valor de la propiedad clave.
   * @param {string} clave - Nuevo valor para clave.
   */
  public setClave(clave: string): void {
    this.update((state) => ({
      ...state,
      clave
    }));
  }

  /**
   * Actualiza el valor del tipo de producto.
   * @param {string} tipoDeProducto - Nuevo valor para tipo de producto.
   */
  public setTipoDeProducto(tipoDeProducto: string): void {
    this.update((state) => ({
      ...state,
      tipoDeProducto
    }));
  }

  /**
   * Actualiza el país de procedencia.
   * @param {string} paisDeProcedencia - Nuevo valor para país de procedencia.
   */
  public setPaisDeProcedencia(paisDeProcedencia: string): void {
    this.update((state) => ({
      ...state,
      paisDeProcedencia
    }));
  }

  /**
   * Actualiza las opciones seleccionadas.
   * @param {boolean[]} selectedOptions - Nuevas opciones seleccionadas.
   */
  public setSelectedOptions(selectedOptions: boolean[]): void {
    this.update((state) => ({
      ...state,
      selectedOptions
    }));
  }

  /**
   * Actualiza la clasificación de mercancías.
   * @param {string} clasificacionMercancias - Nueva clasificación de mercancías.
   */
  public setClasificacionMercancias(clasificacionMercancias: string): void {
    this.update((state) => ({
      ...state,
      clasificacionMercancias
    }));
  }

  /**
   * Actualiza la fracción arancelaria.
   * @param {string} fraccionArancelaria - Nueva fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria
    }));
  }

  /**
   * Actualiza la descripción de la fracción arancelaria.
   * @param {string} descFraccionArancelaria - Nueva descripción de la fracción arancelaria.
   */
  public setDescFraccionArancelaria(descFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      descFraccionArancelaria
    }));
  }

  /**
   * Actualiza la cantidad.
   * @param {string} cantidad - Nueva cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad
    }));
  }

  /**
   * Actualiza la cantidad en letra.
   * @param {string} cantidadLetra - Nueva cantidad en letra.
   */
  public setCantidadLetra(cantidadLetra: string): void {
    this.update((state) => ({
      ...state,
      cantidadLetra
    }));
  }

  /**
   * Actualiza el género.
   * @param {string} genero - Nuevo género.
   */
  public setGenero(genero: string): void {
    this.update((state) => ({
      ...state,
      genero
    }));
  }

  /**
   * Actualiza la especie.
   * @param {string} especie - Nueva especie.
   */
  public setEspecie(especie: string): void {
    this.update((state) => ({
      ...state,
      especie
    }));
  }

  /**
   * Actualiza el nombre común.
   * @param {string} nombreComun - Nuevo nombre común.
   */
  public setNombreComun(nombreComun: string): void {
    this.update((state) => ({
      ...state,
      nombreComun
    }));
  }

  /**
   * Actualiza la descripción del producto.
   * @param {string} descDelProducto - Nueva descripción del producto.
   */
  public setDescDelProducto(descDelProducto: string): void {
    this.update((state) => ({
      ...state,
      descDelProducto
    }));
  }

  /**
   * Actualiza la unidad de medida.
   * @param {string} unidadDeMedida - Nueva unidad de medida.
   */
  public setUnidadDeMedida(unidadDeMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadDeMedida
    }));
  }

  /**
   * Actualiza el estado de manifiestos y descripción.
   * @param {boolean} manifiestosYdesc - Nuevo estado de manifiestos y descripción.
   */
  public setManifiestosYdesc(manifiestosYdesc: boolean): void {
    this.update((state) => ({
      ...state,
      manifiestosYdesc
    }));
  }

  /**
   * Actualiza si está exento de pago.
   * @param {string} exentoDePago - Nuevo valor para exento de pago.
   */
  public setExentoDePago(exentoDePago: string): void {
    this.update((state) => ({
      ...state,
      exentoDePago
    }));
  }

  /**
   * Actualiza la justificación.
   * @param {string} justificacion - Nueva justificación.
   */
  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion
    }));
  }

  /**
   * Actualiza la clave de referencia.
   * @param {string} claveDeReferencia - Nueva clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia
    }));
  }

  /**
   * Actualiza la cadena de dependencia.
   * @param {string} cadenaDependencia - Nueva cadena de dependencia.
   */
  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia
    }));
  }

  /**
   * Actualiza el banco.
   * @param {string} banco - Nuevo banco.
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  /**
   * Actualiza la llave de pago.
   * @param {string} llaveDePago - Nueva llave de pago.
   */
  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago
    }));
  }

  /**
   * Actualiza la fecha de pago.
   * @param {string} fechaPago - Nueva fecha de pago.
   */
  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago
    }));
  }

  /**
   * Actualiza el importe de pago.
   * @param {string} importePago - Nuevo importe de pago.
   */
  public setImportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago
    }));
  }
}