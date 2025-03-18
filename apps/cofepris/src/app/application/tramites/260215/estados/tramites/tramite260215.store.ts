import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 260215
 * @returns Solicitud260215
 */
export interface Solicitud260215State {
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
 
  /**
     * El valor de rfcDel.
     */
  rfcDel: string;
  /**
   * El valor de denominacion.
   */
  denominacion: string;
  /**
   * El valor de correo.
   */
  correo: string;
  /**
   * El valor de codigoPostal.
   */
  codigoPostal: string;
  /**
   * El valor de estado.
   */
  estado: string;

  /**
   * El valor de muncipio.
   */
  muncipio: string;

  /**
   * El valor de localidad.
   */
  localidad: string;

  colonia: string;

  calle: string;

  lada: string;

  telefono: string;

  avisoCheckbox: string;
  
  licenciaSanitaria: string;

  regimen: string;

  aduanasEntradas: string;

  numeroPermiso: string;

  rfc: string;

  cumplimiento: string;


}

export function createInitialState(): Solicitud260215State {
  return {
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
         * El valor de rfcDel.
         */
     rfcDel: '',
     /**
      * El valor de denominacion.
      */
     denominacion: '',
     /**
     * El valor de correo.
     */
     correo: '',
     /**
      * El valor de codigoPostal.
      */
     codigoPostal: '',
     /**
      * El valor de estado.
      */
     estado: '',

     /**
      * El valor de muncipio.
      */
     muncipio: '',
/**
 * 
 */
     localidad: '',

     colonia: '',

     calle: '',

     lada: '',

     telefono: '',

     avisoCheckbox: '',

     licenciaSanitaria: '',

     regimen: '',

     aduanasEntradas: '',

     numeroPermiso: '',

     rfc: '',

     cumplimiento: '',



  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260215', resettable: true })
export class Tramite260215Store extends Store<Solicitud260215State> {
  /**
   * Crea una instancia de Tramite260215Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
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
     * Establece el estado de rfcDel.
     * @param rfcDel - El valor de rfcDel.
     */
    public setRfcDel(rfcDel: string) {
      this.update((state) => ({
          ...state,
          rfcDel,
      }));
  }
  /**
   * Establece el estado de denominacion.
   * @param denominacion - El valor de denominacion.
   */
  public setDenominacion(denominacion: string) {
      this.update((state) => ({
          ...state,
          denominacion,
      }));
  }
  /**
   * Establece el estado de correo.
   * @param correo - El valor de correo.
   */
  public setCorreo(correo: string) {
      this.update((state) => ({
          ...state,
          correo,
      }));
  }
  /**
   * Establece el estado de codigoPostal.
   * @param codigoPostal - El valor de codigoPostal.
   */
  public setCodigoPostal(codigoPostal: string) {
      this.update((state) => ({
          ...state,
          codigoPostal,
      }));
  }
  /**
   * Establece el estado de estado.
   * @param estado - El valor de estado.
   */
  public setEstado(estado: string) {
      this.update((state) => ({
          ...state,
          estado,
      }));
  }
   /**
   * Establece el muncipio de muncipio.
   * @param muncipio - El valor de muncipio.
   */
   public setMuncipio(muncipio: string) {
    this.update((state) => ({
        ...state,
        muncipio,
    }));
  }
  public setLocalidad(localidad: string) {
    this.update((state) => ({
        ...state,
        localidad,
    }));
  }

  public setColonia(colonia: string) {
    this.update((state) => ({
        ...state,
        colonia,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
        ...state,
        calle,
    }));
  }

  public setLada(lada: string) {
    this.update((state) => ({
        ...state,
        lada,
    }));
  }

  public setTelefono(telefono: string) {
    this.update((state) => ({
        ...state,
        telefono,
    }));
  }

  public setAvisoCheckbox(avisoCheckbox: string) {
    this.update((state) => ({
        ...state,
        avisoCheckbox,
    }));
  }

  public setLicenciaSanitaria(licenciaSanitaria: string) {
    this.update((state) => ({
        ...state,
        licenciaSanitaria,
    }));
  }

  public setRegimen(regimen: string) {
    this.update((state) => ({
        ...state,
        regimen,
    }));
  }

  public setAduanasEntradas(aduanasEntradas: string) {
    this.update((state) => ({
        ...state,
        aduanasEntradas,
    }));
  }

  public setNumeroPermiso(numeroPermiso: string) {
    this.update((state) => ({
        ...state,
        numeroPermiso,
    }));
  }

  public setRfc(rfc: string) {
    this.update((state) => ({
        ...state,
        rfc,
    }));
  }
  public setCumplimiento(cumplimiento: string) {
    this.update((state) => ({
      ...state,
      cumplimiento,
    }));
  }

  /**
   * Limpia los datos de la solicitud 
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
