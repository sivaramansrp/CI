import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface Solicitud230401State {
    tipoSolicitud: string;
    autorizacion: boolean;
    noDePermisocoferprise: string;
    nombreComercial: string;
    cantidadAtorizada: string;
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
}

export function initializeSolicitud230401State(): Solicitud230401State {
    return {
        tipoSolicitud: '',
        autorizacion: false,
        noDePermisocoferprise: '',
        nombreComercial: '',
        cantidadAtorizada: '',
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
        cantidadLetra: 'One',
        unidadDeMedida: '',
    }
};

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
  public setTipoSolicitud(tipoSolicitud: string) {
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
  public setAutorizacion(autorizacion: boolean) {
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
  public setNoDePermisocoferprise(noDePermisocoferprise: string) {
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
  public setNombreComercial(nombreComercial: string) {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param cantidadAtorizada - El tipo de solicitud que se va a guardar.
 */
  public setCantidadAtorizada(cantidadAtorizada: string) {
    this.update((state) => ({
      ...state,
      cantidadAtorizada,
    }));
  }

   /**
 * Guarda el tipo de solicitud en el estado.
 *
 * @param descripcionDeLaFraccion - El tipo de solicitud que se va a guardar.
 */
  public setDescripcionDeLaFraccion(descripcionDeLaFraccion: string) {
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
  public setFraccionArancelaria(fraccionArancelaria: string) {
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
  public setNumeroCas(numeroCas: string) {
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
  public setDescripcionNoArancelaria(descripcionNoArancelaria: string) {
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
  public setNombreQuimico(nombreQuimico: string) {
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
  public setNombreDeLaMercancia(nombreDeLaMercancia: string) {
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
  public setUnNumero(unNumero: number) {
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
  public setDatosNombreComercial(datosNombreComercial: string) {
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
  public setDatosNumeroComun(datosNumeroComun: string) {
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
  public setDatosPorcentaje(datosPorcentaje: number) {
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
  public setDatosComponentes(datosComponentes: string) {
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
  public setClasificacion(clasificacion: string) {
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
  public setEstadoFisico(estadoFisico: string) {
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
  public setDatosObjecto(datosObjecto: string) {
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
  public setEspecifique(especifique: string) {
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
  public setCantidad(cantidad: number) {
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
  public setCantidadLetra(cantidadLetra: string) {
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
  public setUnidadDeMedida(unidadDeMedida: string) {
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
  public setEspecifiqueDos(especifiqueDos: string) {
    this.update((state) => ({
      ...state,
      especifiqueDos,
    }));
  }
 
}