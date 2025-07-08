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
   correo:string;
   /**
    * El valor de codigoPostal.
    */
   codigoPostal:string;
   /**
    * El valor de estado.
    */
   estado:string;
   /**
    * El valor de muncipio.
    */
   muncipio:string;
   /**
    * El valor de localidad.
   */
   localidad:string;
   /**
    * El valor de colonia.
   */
   colonia:string;
   /**
    * El valor de calle.
   */
   calle:string;
   /**
    * El valor de lada.
   */
   lada:string;
   /**
    * El valor de telefono.
   */
   telefono:string;
   /**
    * El valor de claveScianModal.
   */
   claveScianModal: string;
   /**
    * El valor de claveDescripcionModal.
   */
   claveDescripcionModal: string;
   /**
    * El valor de avisoCheckbox.
   */
   avisoCheckbox: boolean;
   /**
    * El valor de licenciaSanitaria.
   */
   licenciaSanitaria: string;
   /**
    * El valor de regimen.
   */
   regimen: string;
   /**
    * El valor de aduanasEntradas.
   */
   aduanasEntradas:string;
   /**
    * El valor de clasificacion.
   */
   clasificacion:string;
   /**
    * El valor de especificar.
   */
   especificar:string;
   /**
    * El valor de denominacionEspecifica.
   */
   denominacionEspecifica:string;
   /**
    * El valor de denominacionDistintiva.
   */
   denominacionDistintiva:string;
   /**
    * El valor de denominacionComun.
   */
   denominacionComun:string;
   /**
    * El valor de tipoDeProducto.
   */
   tipoDeProducto:string;
   /**
    * El valor de estadoFisico.
   */
   estadoFisico:string;
   /**
    * El valor de fraccionArancelaria.
   */
   fraccionArancelaria:string;
   /**
    * El valor de descripcionFraccion.
   */
   descripcionFraccion:string;
   /**
    * El valor de cantidadUMT.
   */
   cantidadUMT:string;
   /**
    * El valor de UMT.
   */
   UMT:string;
   /**
    * El valor de cantidadUMC.
   */
   cantidadUMC:string;
   /**
    * El valor de UMC.
   */
   UMC:string;
   /**
    * El valor de presentacion.
   */
   presentacion:string;
   /**
    * El valor de numeroRegistro.
   */
   numeroRegistro:string;
   /**
    * El valor de fechaCaducidad.
   */
   fechaCaducidad:string;
   /**
    * El valor de cumplimiento.
   */
   cumplimiento:string;
   /**
    * El valor de rfc.
   */
   rfc:string;
   /**
    * El valor de nombre.
   */
   nombre:string;
   /**
    * El valor de apellidoPaterno.
   */
   apellidoPaterno:string;
   /**
    * El valor de apellidoMaterno.
   */
   apellidoMaterno:string;

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
      correo:'',
      /**
       * El valor de codigoPostal.
       */
      codigoPostal:'',
      /**
       * El valor de estado.
       */
      estado:'',
      /**
       * El valor de muncipio.
       */
      muncipio:'',
      /**
       * El valor de localidad.
       */
      localidad:'',
      /**
       * El valor de colonia.
      */
      colonia:'',
      /**
       * El valor de calle.
      */
      calle:'',   
      /**
       * El valor de lada.
      */
      lada:'',
      /**
       * El valor de telefono.
      */
      telefono:'', 
      /**
       * El valor de claveScianModal.
      */
      claveScianModal: '', 
      /**
       * El valor de claveDescripcionModal.
      */
      claveDescripcionModal: '',
      /**
       * El valor de avisoCheckbox.
      */
      avisoCheckbox: false,
      /**
       * El valor de licenciaSanitaria.
      */
      licenciaSanitaria: '',
      /**
       * El valor de regimen.
      */
      regimen: '',
      /**
       * El valor de aduanasEntradas.
      */
      aduanasEntradas: '',
      /**
       * El valor de clasificacion.
      */
      clasificacion: '',
      /**
       * El valor de especificar.
      */
      especificar: '',
      /**
       * El valor de denominacionEspecifica.
      */
      denominacionEspecifica: '',
      /**
       * El valor de denominacionDistintiva.
      */
      denominacionDistintiva: '',
      /**
       * El valor de denominacionComun.
      */
      denominacionComun: '',
      /**
       * El valor de tipoDeProducto.
      */
      tipoDeProducto: '',
      /**
       * El valor de estadoFisico.
      */
      estadoFisico: '',
      /**
       * El valor de fraccionArancelaria.
      */
      fraccionArancelaria: '',
      /**
       * El valor de descripcionFraccion.
      */
      descripcionFraccion: '',
      /**
       * El valor de cantidadUMT.
      */
      cantidadUMT: '',
      /**
       * El valor de UMT.
      */
      UMT: '',
      /**
       * El valor de cantidadUMC.
      */
      cantidadUMC: '',
      /**
       * El valor de UMC.
      */
      UMC: '',
      /**
       * El valor de presentacion.
      */
      presentacion: '',
      /**
       * El valor de numeroRegistro.
      */
      numeroRegistro: '',
      /**
       * El valor de fechaCaducidad.
      */
      fechaCaducidad: '',
      /**
       * El valor de cumplimiento.
      */
      cumplimiento: '',
      /**
       * El valor de representante.
      */
      rfc: '',
      /**
       * El valor de nombre.
      */
      nombre: '',
      /**
       * El valor de apellidoPaterno.
      */
      apellidoPaterno: '',
      /**
       * El valor de apellidoMaterno.
      */
      apellidoMaterno: '',


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
  /**
   * Establece el localidad de localidad.
   * @param localidad - El valor de localidad.
   */
  public setLocalidad(localidad: string) {
      this.update((state) => ({
          ...state,
          localidad,
      }));
  }
  /**
   * Establece el estado de colonia.
   * @param colonia - El valor de colonia.
   */
  public setColonia(colonia: string) {
      this.update((state) => ({
          ...state,
          colonia,
      }));
  }
  /**
   * Establece el estado de calle.
   * @param calle - El valor de calle.
   */
  public setCalle(calle: string) {
      this.update((state) => ({
          ...state,
          calle,
      }));
  }
  /**
   * Establece el estado de lada.
   * @param lada - El valor de lada.
   */
  public setLada(lada: string) {  
      this.update((state) => ({
          ...state,
          lada,
      }));
  }
  /**
   * Establece el estado de telefono.
   * @param telefono - El valor de telefono.
   */
  public setTelefono(telefono: string) {
      this.update((state) => ({
          ...state,
          telefono,
      }));
  }
  /**
   * Establece el estado de claveScianModal.
   * @param claveScianModal - El valor de claveScianModal.
   */
  public setClaveScianModal(claveScianModal: string) {
      this.update((state) => ({
          ...state,
          claveScianModal,
      }));
  }
  /**
   * Establece el estado de claveDescripcionModal.
   * @param claveDescripcionModal - El valor de claveDescripcionModal.
   */
  public setClaveDescripcionModal(claveDescripcionModal: string) {
      this.update((state) => ({
          ...state,
          claveDescripcionModal,
      }));
  }
  /**
   * Establece el estado de avisoCheckbox.
   * @param avisoCheckbox - El valor de avisoCheckbox.
   */
  public setAvisoCheckbox(avisoCheckbox: boolean) {
      this.update((state) => ({
          ...state,
          avisoCheckbox,
      }));
  }
  /**
   * Establece el estado de licenciaSanitaria.
   * @param licenciaSanitaria - El valor de licenciaSanitaria.
   */
  public setLicenciaSanitaria(licenciaSanitaria: string) {
      this.update((state) => ({
          ...state,
          licenciaSanitaria,
      }));
  }
  /**
   * Establece el estado de regimen.
   * @param regimen - El valor de regimen.
   */
  public setRegimen(regimen: string) {
      this.update((state) => ({
          ...state,
          regimen,
      }));
  }
  /**
   * Establece el estado de aduanasEntradas.
   * @param aduanasEntradas - El valor de aduanasEntradas.
   */
  public setAduanasEntradas(aduanasEntradas: string) {
      this.update((state) => ({
          ...state,
          aduanasEntradas,
      }));
  }
  /**
   * Establece el estado de clasificacion.
   * @param clasificacion - El valor de clasificacion.
   */
  public setClasificacion(clasificacion: string) {
      this.update((state) => ({
          ...state,
          clasificacion,
      }));
  }
  /**
   * Establece el estado de especificar.
   * @param especificar - El valor de especificar.
   */
  public setEspecificar(especificar: string) {
      this.update((state) => ({
          ...state,
          especificar,
      }));
  }
  /**
   * Establece el estado de denominacionEspecifica.
   * @param denominacionEspecifica - El valor de denominacionEspecifica.
   */
  public setDenominacionEspecifica(denominacionEspecifica: string) {
      this.update((state) => ({
          ...state,
          denominacionEspecifica,
      }));
  }
  /**
   * Establece el estado de denominacionDistintiva.
   * @param denominacionDistintiva - El valor de denominacionDistintiva.
   */
  public setDenominacionDistintiva(denominacionDistintiva: string) {
      this.update((state) => ({
          ...state,
          denominacionDistintiva,
      }));
  }
  /**
   * Establece el estado de denominacionComun.
   * @param denominacionComun - El valor de denominacionComun.
   */
  public setDenominacionComun(denominacionComun: string) {
      this.update((state) => ({
          ...state,
          denominacionComun,
      }));
  }
  /**
   * Establece el estado de tipoDeProducto.
   * @param tipoDeProducto - El valor de tipoDeProducto.
   */
  public setTipoDeProducto(tipoDeProducto: string) {
      this.update((state) => ({
          ...state,
          tipoDeProducto,
      }));
  }
  /**
   * Establece el estado de estadoFisico.
   * @param estadoFisico - El valor de estadoFisico.
   */
  public setEstadoFisico(estadoFisico: string) {
      this.update((state) => ({
          ...state,
          estadoFisico,
      }));
  }
  /**
   * Establece el estado de fraccionArancelaria.
   * @param fraccionArancelaria - El valor de fraccionArancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string) {
      this.update((state) => ({
          ...state,
          fraccionArancelaria,
      }));
  }
  /**
   * Establece el estado de fraccionArancelaria.
   * @param fraccionArancelaria - El valor de fraccionArancelaria.
   */
  public setDescripcionFraccion(descripcionFraccion: string) {
      this.update((state) => ({
          ...state,
          descripcionFraccion,
      }));
  }
  /**
   * Establece el estado de cantidadUMT.
   * @param cantidadUMT - El valor de cantidadUMT.
   */
  public setCantidadUMT(cantidadUMT: string) {
      this.update((state) => ({
          ...state,
          cantidadUMT,
      }));
  }
  /**
   * Establece el estado de UMT.
   * @param UMT - El valor de UMT.
   */
  public setUMT(UMT: string) {
      this.update((state) => ({
          ...state,
          UMT,
      }));
  }
  /**
   * Establece el estado de cantidadUMC.
   * @param cantidadUMC - El valor de cantidadUMC.
   */
  public setCantidadUMC(cantidadUMC: string) {
      this.update((state) => ({
          ...state,
          cantidadUMC,
      }));
  }
  /**
   * Establece el estado de UMC.
   * @param UMC - El valor de UMC.
   */
  public setUMC(UMC: string) {
      this.update((state) => ({
          ...state,
          UMC,
      }));
  }
  /**
   * Establece el estado de presentacion.
   * @param presentacion - El valor de presentacion.
   */
  public setPresentacion(presentacion: string) {
      this.update((state) => ({
          ...state,
          presentacion,
      }));
  }
  /**
   * Establece el estado de numeroRegistro.
   * @param numeroRegistro - El valor de numeroRegistro.
   */
  public setNumeroRegistro(numeroRegistro: string) {
      this.update((state) => ({
          ...state,
          numeroRegistro,
      }));
  }
  /**
   * Establece el estado de fechaCaducidad.
   * @param fechaCaducidad - El valor de fechaCaducidad.
   */
  public setFechaCaducidad(fechaCaducidad: string) {
      this.update((state) => ({
          ...state,
          fechaCaducidad,
      }));
  }
  /**
   * Establece el estado de cumplimiento.
   * @param cumplimiento - El valor de cumplimiento.
   */
  public setCumplimiento(cumplimiento: string) {
      this.update((state) => ({
          ...state,
          cumplimiento,
      }));
  }
  /**
   * Establece el estado de rfc.
   * @param rfc - El valor de rfc.
   */
  public setRfc(rfc: string) {
      this.update((state) => ({
          ...state,
          rfc,
      }));
  }
  /**
   * Establece el estado de nombre.
   * @param nombre - El valor de nombre.
   */
  public setNombre(nombre: string) {
      this.update((state) => ({
          ...state,
          nombre,
      }));
  }
  /**
   * Establece el estado de apellidoPaterno.
   * @param apellidoPaterno - El valor de apellidoPaterno.
   */
  public setApellidoPaterno(apellidoPaterno: string) {
      this.update((state) => ({
          ...state,
          apellidoPaterno,
      }));
  }
  /**
   * Establece el estado de apellidoMaterno.
   * @param apellidoMaterno - El valor de apellidoMaterno.
   */
  public setApellidoMaterno(apellidoMaterno: string) {
      this.update((state) => ({
          ...state,
          apellidoMaterno,
      }));
  }
}