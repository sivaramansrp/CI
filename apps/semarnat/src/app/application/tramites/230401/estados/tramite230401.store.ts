import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { PagoDerechosState } from "../models/tramies230401.models";

/**
 * Representa el estado de una solicitud específica.
 * 
 * @interface Solicitud230401State
 * 
 * @property {string} tipoSolicitud - Tipo de solicitud.
 * @property {boolean} autorizacion - Indica si la solicitud está autorizada.
 * @property {string} noDePermisocoferprise - Número de permiso de coferprise.
 * @property {string} nombreComercial - Nombre comercial del producto.
 * @property {string} cantidadAutorizada - Cantidad autorizada.
 * @property {string} fraccionArancelaria - Fracción arancelaria.
 * @property {string} descripcionDeLaFraccion - Descripción de la fracción arancelaria.
 * @property {string} numeroCas - Número CAS.
 * @property {string} descripcionNoArancelaria - Descripción no arancelaria.
 * @property {string} nombreQuimico - Nombre químico.
 * @property {string} nombreDeLaMercancia - Nombre de la mercancía.
 * @property {number} unNumero - Número UN.
 * @property {string} datosNombreComercial - Datos del nombre comercial.
 * @property {string} datosNumeroComun - Datos del número común.
 * @property {number} datosPorcentaje - Porcentaje de datos.
 * @property {string} datosComponentes - Componentes de los datos.
 * @property {string} clasificacion - Clasificación.
 * @property {string} estadoFisico - Estado físico.
 * @property {string} datosObjecto - Datos del objeto.
 * @property {string} especifique - Especificación adicional.
 * @property {string} especifiqueDos - Segunda especificación adicional.
 * @property {number} cantidad - Cantidad.
 * @property {string} cantidadLetra - Cantidad en letras.
 * @property {string} unidadDeMedida - Unidad de medida.
 */
export interface Solicitud230401State {
  tipoSolicitud: string;
  autorizada: boolean;
  noDePermisocoferprise: string;
  nombreComercial: string;
  cantidadAutorizada: string;
  fraccionArancelaria: string;
  descripcionDeLaFraccion: string;
  numeroCas: string;
  descripcionNoArancelaria: string;
  nombreQuimico: string;
  nombreDeLaMercancia: string;
  unNumero: number;
  datosNombreComercial: string;
  datosNumeroComun: string;
  datosPorcentaje: number;
  datosComponentes: string;
  clasificacion: string;
  estadoFisico: string;
  datosObjecto: string;
  especifique: string;
  especifiqueDos: string;
  cantidad: number;
  cantidadLetra: string;
  unidadDeMedida: string;
  pagoDerechosState: PagoDerechosState
}

/**
 * Inicializa el estado de Solicitud230401.
 * 
 * @returns {Solicitud230401State} El estado inicial de Solicitud230401.
 */
export function initializeSolicitud230401State(): Solicitud230401State {
  return {
    tipoSolicitud: '',
    autorizada: false,
    noDePermisocoferprise: '',
    nombreComercial: '',
    cantidadAutorizada: '',
    fraccionArancelaria: '',
    descripcionDeLaFraccion: '',
    numeroCas: '',
    descripcionNoArancelaria: '',
    nombreQuimico: '',
    nombreDeLaMercancia: '',
    unNumero: 1,
    datosNombreComercial: '',
    datosNumeroComun: '',
    datosPorcentaje: 1,
    datosComponentes: '',
    clasificacion: '',
    estadoFisico: '',
    datosObjecto: '',
    especifique: '',
    especifiqueDos: '',
    cantidad: 1,
    cantidadLetra: 'Uno',
    unidadDeMedida: '',
    pagoDerechosState: {
      clave: '084001963',
      dependencia: '0100160910791',
      banco: '',
      llavePago: '12345LLPCI',
      fecha: '',
      importePago: '1842'
    }
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230401', resettable: true })
/**
 * Guarda el nombre de la mercancía en el estado.
 *
 * @param nombreDeLaMercancia - El nombre de la mercancía que se va a guardar.
 */
export class Tramite230401Store extends Store<Solicitud230401State> {
  constructor() {
    super(initializeSolicitud230401State());
  }
  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param tipoSolicitud - El tipo de solicitud que se va a guardar.
 */
  public setTipoSolicitud(tipoSolicitud: string):void {
    this.update((state) => ({
      ...state,
      tipoSolicitud,
    }));
  }

  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param autorizacion - El tipo de solicitud que se va a guardar.
 */
  public setAutorizacion(autorizacion: boolean):void {
    this.update((state) => ({
      ...state,
      autorizacion,
    }));
  }

  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param noDePermisocoferprise - El tipo de solicitud que se va a guardar.
 */
  public setNoDePermisocoferprise(noDePermisocoferprise: string):void {
    this.update((state) => ({
      ...state,
      noDePermisocoferprise,
    }));
  }

  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param nombreComercial - El tipo de solicitud que se va a guardar.
 */
  public setNombreComercial(nombreComercial: string):void {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param cantidadAutorizada - El tipo de solicitud que se va a guardar.
 */
  public setCantidadAutorizada(cantidadAutorizada: string): void {
    this.update((state) => ({
      ...state,
      cantidadAutorizada,
    }));
  }

  /**
* Guarda el tipo de solicitud en el estado.
*
* @param descripcionDeLaFraccion - El tipo de solicitud que se va a guardar.
*/
  public setDescripcionDeLaFraccion(descripcionDeLaFraccion: string): void {
    this.update((state) => ({
      ...state,
      descripcionDeLaFraccion,
    }));
  }

  /**
* Guarda el tipo de solicitud en el estado.
*
* @param fraccionArancelaria - El tipo de solicitud que se va a guardar.
*/
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }
  /**
* Guarda el tipo de solicitud en el estado.
*
* @param numeroCas - El tipo de solicitud que se va a guardar.
*/
  public setNumeroCas(numeroCas: string): void {
    this.update((state) => ({
      ...state,
      numeroCas,
    }));
  }

  /**
* Guarda el tipo de solicitud en el estado.
*
* @param descripcionNoArancelaria - El tipo de solicitud que se va a guardar.
*/
  public setDescripcionNoArancelaria(descripcionNoArancelaria: string): void {
    this.update((state) => ({
      ...state,
      descripcionNoArancelaria,
    }));
  }

  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param nombreQuimico - El tipo de solicitud que se va a guardar.
 */
  public setNombreQuimico(nombreQuimico: string): void {
    this.update((state) => ({
      ...state,
      nombreQuimico,
    }));
  }

  /**
   * Actualiza el estado con el nombre de la mercancía proporcionado.
   *
   * @param nombreDeLaMercancia - El nombre de la mercancía que se establecerá en el estado.
   */
  public setNombreDeLaMercancia(nombreDeLaMercancia: string): void {
    this.update((state) => ({
      ...state,
      nombreDeLaMercancia,
    }));
  }

  /**
   * Guarda el número UN en el estado.
   *
   * @param unNumero - El número UN que se va a guardar.
   */
  public setUnNumero(unNumero: number): void {
    this.update((state) => ({
      ...state,
      unNumero,
    }));
  }

  /**
   * Guarda el nombre comercial de los datos en el estado.
   *
   * @param datosNombreComercial - El nombre comercial de los datos que se va a guardar.
   */
  public setDatosNombreComercial(datosNombreComercial: string): void {
    this.update((state) => ({
      ...state,
      datosNombreComercial,
    }));
  }

  /**
   * Guarda el número común de los datos en el estado.
   *
   * @param datosNumeroComun - El número común de los datos que se va a guardar.
   */
  public setDatosNumeroComun(datosNumeroComun: string): void {
    this.update((state) => ({
      ...state,
      datosNumeroComun,
    }));
  }

  /**
   * Guarda el porcentaje de los datos en el estado.
   *
   * @param datosPorcentaje - El porcentaje de los datos que se va a guardar.
   */
  public setDatosPorcentaje(datosPorcentaje: number): void {
    this.update((state) => ({
      ...state,
      datosPorcentaje,
    }));
  }

  /**
   * Guarda los componentes de los datos en el estado.
   *
   * @param datosComponentes - Los componentes de los datos que se van a guardar.
   */
  public setDatosComponentes(datosComponentes: string): void {
    this.update((state) => ({
      ...state,
      datosComponentes,
    }));
  }

  /**
   * Guarda la clasificación en el estado.
   *
   * @param clasificacion - La clasificación que se va a guardar.
   */
  public setClasificacion(clasificacion: string): void {
    this.update((state) => ({
      ...state,
      clasificacion,
    }));
  }

  /**
   * Guarda el estado físico en el estado.
   *
   * @param estadoFisico - El estado físico que se va a guardar.
   */
  public setEstadoFisico(estadoFisico: string): void {
    this.update((state) => ({
      ...state,
      estadoFisico,
    }));
  }

  /**
   * Guarda el objeto de los datos en el estado.
   *
   * @param datosObjecto - El objeto de los datos que se va a guardar.
   */
  public setDatosObjecto(datosObjecto: string): void {
    this.update((state) => ({
      ...state,
      datosObjecto,
    }));
  }

  /**
   * Guarda la especificación en el estado.
   *
   * @param especifique - La especificación que se va a guardar.
   */
  public setEspecifique(especifique: string): void {
    this.update((state) => ({
      ...state,
      especifique,
    }));
  }

  /**
   * Guarda la cantidad en el estado.
   *
   * @param cantidad - La cantidad que se va a guardar.
   */
  public setCantidad(cantidad: number): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  /**
   * Guarda la cantidad en letras en el estado.
   *
   * @param cantidadLetra - La cantidad en letras que se va a guardar.
   */
  public setCantidadLetra(cantidadLetra: string): void {
    this.update((state) => ({
      ...state,
      cantidadLetra,
    }));
  }

  /**
   * Guarda la unidad de medida en el estado.
   *
   * @param unidadDeMedida - La unidad de medida que se va a guardar.
   */
  public setUnidadDeMedida(unidadDeMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadDeMedida,
    }));
  }

  /**
   * Guarda la segunda especificación en el estado.
   *
   * @param especifiqueDos - La segunda especificación que se va a guardar.
   */
  public setEspecifiqueDos(especifiqueDos: string): void {
    this.update((state) => ({
      ...state,
      especifiqueDos,
    }));
  }

  /**
   * Establece el estado de pago de derechos.
   *
   * @param {PagoDerechosState} pagoDerechosState - El nuevo estado de pago de derechos.
   * @returns {void}
   */
  public setPagoDerechosState(pagoDerechosState: PagoDerechosState): void {
    this.update((state) => ({
      ...state,
      pagoDerechosState,
    }));
  }

  /**
   * Establece una propiedad del estado de pago de derechos.
   *
   * @param property - El nombre de la propiedad del estado de pago de derechos que se va a actualizar.
   * @param value - El nuevo valor para la propiedad especificada.
   * @returns void
   */
  public setPagoDerechosStateProperty(property: string, value: string): void {
    this.update((state) => ({
      ...state,
      pagoDerechosState: {
        ...state.pagoDerechosState,
        [property]: value,
      },
    }));
  }
}