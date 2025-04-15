import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ConfiguracionItem } from '../enum/mercancia-tabla.enum';
import { DestinatarioConfiguracionItem } from '../enum/destinatario-tabla.enum';

/**
 * Creacion del estado inicial para la interfaz de tramite 300105
 * @returns Tramite300105
 */
export interface Tramite300105State {
  motivoRenunciaDeDerechos: string;
  mercacniaSolicitudControlar:boolean;
  observaciones: string;
  tercerosPopupState: boolean;

  /**
   * Datos de la tabla de mercancías asociadas al trámite.
   */
  
  mercanciaTablaDatos: ConfiguracionItem[];
    /**
   * Datos de la tabla de mercancías asociadas al trámite.
   */
    destinatarioTablaDatos: DestinatarioConfiguracionItem[];

  /**
   * claveDeReferencia
   * @type {string}
   */
  claveDeReferencia: string;

  /**
   * cadenaDependencia
   * @type {string}
   */
  cadenaDependencia: string;

  /**
   * banco
   * @type {string}
   */
  banco: string;

  /**
   * llaveDePago
   * @type {string}
   */
  llaveDePago: string;

  /**
   * fechaPago
   * @type {string}
   */
  fechaPago: string;

  /**
   * importePago
   * @type {string}
   */
  importePago: string;

  numeroExpediente?: string;
  /**
   * tipoOperacion
   * @type {string}
   */
  tipoOperacion?: string;

  /**
   * finalidad
   * @type {string}
   */
  finalidad?: string;

  isExento?: boolean;
  isAutorizacion?: boolean;
  numAutorizacion1?: string;
  numAutorizacion2?: string;
  numAutorizacion3?: string;
}

export function createInitialState(): Tramite300105State {
  return {
    motivoRenunciaDeDerechos: '',
    mercacniaSolicitudControlar:true,

    mercanciaTablaDatos: [],
    destinatarioTablaDatos: [],
    observaciones: '',
    tercerosPopupState: false,

    /**
     * claveDeReferencia
     * @type {string}
     */
    claveDeReferencia: '',

    /**
     * cadenaDependencia
     * @type {string}
     * */
    cadenaDependencia: '',

    /**
     * banco
     * @type {string}
     */
    banco: '',

    /**
     * llaveDePago
     * @type {string}
     */
    llaveDePago: '',

    /**
     * fechaPago
     * @type {string}
     */
    fechaPago: '',

    /**
     * importePago
     * @type {string}
     */
    importePago: '',

    /**
     * numeroExpediente
     * @type {string}
     */
    numeroExpediente: '',

    /**
     * tipoOperacion
     * @type {string}
     */
    tipoOperacion: '',

    /**
     * finalidad
     * @type {string}
     * */
    finalidad: '',

    isExento: false,
    isAutorizacion: false,
    numAutorizacion1: '',
    numAutorizacion2: '',
    numAutorizacion3: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite300105', resettable: true })
export class Tramite300105Store extends Store<Tramite300105State> {
  constructor() {
    super(createInitialState());
  }

  setMotivoRenunciaDeDerechos(motivoRenunciaDeDerechos: string): void {
    this.update((state) => ({
      ...state,
      motivoRenunciaDeDerechos,
    }));
  }

   /**
   * 
   * Actualiza el estado con los datos de la tabla de mercancía proporcionados.
   *
   * {ConfiguracionItem[]} mercanciaTablaDatos - Los datos de la tabla de mercancía.
   */
   public setMercanciaTablaDatos(mercanciaTablaDatos: ConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }

  public setDestinatarioTablaDatos(destinatarioTablaDatos: DestinatarioConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      destinatarioTablaDatos,
    }));
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

    /**
   * 
   * Actualiza el estado con el estado del popup de terceros.
   *
   * {boolean} tercerosPopupState - El estado del popup de terceros.
   */

    public setTercerosPopupState(tercerosPopupState: boolean): void {
      this.update((state) => ({
        ...state,
        tercerosPopupState,
      }));
    }

  /**
   * Guarda la clave de referencia en el estado.
   * @param claveDeReferencia
   */
  public setClaveDeReferencia(claveDeReferencia: string) {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Guarda la cadena de dependencia en el estado.
   * @param cadenaDependencia
   */
  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * Guarda el banco en el estado.
   * @param banco
   */
  public setBanco(banco: string) {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Guarda la llave de pago en el estado.
   * @param llaveDePago
   */
  public setllaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * Guarda la fecha de pago en el estado.
   * @param fechaPago
   */
  public setFechaPago(fechaPago: string) {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }

  /**
   * Guarda el importe de pago en el estado.
   * @param importePago
   * */
  public setImportePago(importePago: string) {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }

  /**
   * Guarda el numero de expediente en el estado.
   * @param numeroExpediente
   */
  public setNumeroExpediente(numeroExpediente: string) {
    this.update((state) => ({
      ...state,
      numeroExpediente,
    }));
  }

  /**
   * Guarda el tipo de operacion en el estado.
   * @param tipoOperacion
   */
  public setTipoOperacion(tipoOperacion: string) {
    this.update((state) => ({
      ...state,
      tipoOperacion,
    }));
  }

  /**
   * Guarda la finalidad en el estado.
   * @param finalidad
   */
  public setFinalidad(finalidad: string) {  
    this.update((state) => ({
      ...state,
      finalidad,
    }));
  }

  /**
   * Guarda el valor de isExento en el estado.
   * @param isExento
   */
  public setIsExento(isExento: boolean) {
    this.update((state) => ({
      ...state,
      isExento,
    }));
  }

  /**
   * Guarda el valor de isAutorizacion en el estado.
   * @param isAutorizacion
   */
  public setIsAutorizacion(isAutorizacion: boolean) {
    this.update((state) => ({
      ...state,
      isAutorizacion,
    }));
  }

  /**
   * Guarda el valor de numAutorizacion1 en el estado.
   * @param numAutorizacion1
   */
  public setNumAutorizacion1(numAutorizacion1: string) {
    this.update((state) => ({
      ...state,
      numAutorizacion1,
    }));
  }
  
  /**
   * Guarda el valor de numAutorizacion2 en el estado.
   * @param numAutorizacion2
   */
  public setNumAutorizacion2(numAutorizacion2: string) {
    this.update((state) => ({
      ...state,
      numAutorizacion2,
    }));
  }

  /**
   * Guarda el valor de numAutorizacion3 en el estado.
   * @param numAutorizacion3
   */
  public setNumAutorizacion3(numAutorizacion3: string) {
    this.update((state) => ({
      ...state,
      numAutorizacion3,
    }));
  }
}
