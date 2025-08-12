import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 260501
 * @returns DatosDomicilioLegal
 */
export interface DatosDomicilioLegalState {
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
  /**
   * El valor de colonia.
   */
  colonia: string;
  /**
   * El valor de calle.
   */
  calle: string;
  /**
   * El valor de lada.
   */
  lada: string;
  /**
   * El valor de telefono.
   */
  telefono: string;
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
  aduanasEntradas: string;
  /**
   * El valor de numeroPermiso.
   */
  numeroPermiso: string;
  /**
   * El valor de clasificacion.
   */
  clasificacion: string;
  /**
   * El valor de especificar.
   */
  especificar: string;
  /**
   * El valor de denominacionEspecifica.
   */
  denominacionEspecifica: string;
  /**
   * El valor de denominacionDistintiva.
   */
  denominacionDistintiva: string;
  /**
   * El valor de denominacionComun.
   */
  denominacionComun: string;
  /**
   * El valor de tipoDeProducto.
   */
  tipoDeProducto: string;
  /**
   * El valor de estadoFisico.
   */
  estadoFisico: string;
  /**
   * El valor de fraccionArancelaria.
   */
  fraccionArancelaria: string;
  /**
   * El valor de descripcionFraccion.
   */
  descripcionFraccion: string;
  /**
   * El valor de cantidadUMT.
   */
  cantidadUMT: string;
  /**
   * El valor de UMT.
   */
  UMT: string;
  /**
   * El valor de cantidadUMC.
   */
  cantidadUMC: string;
  /**
   * El valor de UMC.
   */
  UMC: string;
  /**
   * El valor de presentacion.
   */
  presentacion: string;
  /**
   * El valor de numeroRegistro.
   */
  numeroRegistro: string;
  /**
   * El valor de fechaCaducidad.
   */
  fechaCaducidad: string;
  /**
   * El valor de cumplimiento.
   */
  cumplimiento: string;
  /**
   * El valor de rfc.
   */
  rfc: string;
  /**
   * El valor de nombre.
   */
   nombre: string;
  /**
   * El valor de apellidoPaterno.
   */
  apellidoPaterno: string;
  /**
   * El valor de apellidoMaterno.
   */
  apellidoMaterno: string;
  /**
 * Lista de aduanas de entrada asociadas.
 * @type {string[]}
 */
  aduanasDeEntrada: string[]

  /**
   * El valor de garantiasOfrecidas.
   */
  garantiasOfrecidas: string;

   /**
   * El valor de garantiasOfrecidas.
   */
  mensaje: boolean;
}

export function createInitialState(): DatosDomicilioLegalState {
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
     * El valor de localidad.
     */
    localidad: '',
    /**
     * El valor de colonia.
     */
    colonia: '',
    /**
     * El valor de calle.
     */
    calle: '',
    /**
     * El valor de lada.
     */
    lada: '',
    /**
     * El valor de telefono.
     */
    telefono: '',
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
     * El valor de numeroPermiso.
     */
    numeroPermiso: '',
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
    /**
     * Lista de aduanas de entrada asociadas.
     * @type {string[]}
     */
    aduanasDeEntrada: [],

    /**
     * El valor de garantiasOfrecidas.
     */
    garantiasOfrecidas: '',
 /**
     * El valor de mensaje.
     */
    mensaje: false
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'DatosDomicilioLegal', resettable: true })
export class DatosDomicilioLegalStore extends Store<DatosDomicilioLegalState> {
  /**
   * Crea una instancia de DatosDomicilioLegalStore.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda la clave de referencia en el estado.
   * @param claveDeReferencia
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Guarda la cadena de dependencia en el estado.
   * @param cadenaDependencia
   */
  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * Guarda el banco en el estado.
   * @param banco
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Guarda la llave de pago en el estado.
   * @param llaveDePago
   */
  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * Guarda la fecha de pago en el estado.
   * @param fechaPago
   */
  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }

  /**
   * Guarda el importe de pago en el estado.
   * @param importePago
   */
  public setImportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }

  /**
   * Establece el estado de rfcDel.
   * @param rfcDel - El valor de rfcDel.
   */
  public setRfcDel(rfcDel: string): void {
    this.update((state) => ({
      ...state,
      rfcDel,
    }));
  }

  /**
   * Establece el estado de denominacion.
   * @param denominacion - El valor de denominacion.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Establece el estado de correo.
   * @param correo - El valor de correo.
   */
  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

  /**
   * Establece el estado de codigoPostal.
   * @param codigoPostal - El valor de codigoPostal.
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * Establece el estado de estado.
   * @param estado - El valor de estado.
   */
  public setEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece el muncipio de muncipio.
   * @param muncipio - El valor de muncipio.
   */
  public setMuncipio(muncipio: string): void {
    this.update((state) => ({
      ...state,
      muncipio,
    }));
  }

  /**
   * Establece el localidad de localidad.
   * @param localidad - El valor de localidad.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * Establece el estado de colonia.
   * @param colonia - El valor de colonia.
   */
  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  /**
   * Establece el estado de calle.
   * @param calle - El valor de calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Establece el estado de lada.
   * @param lada - El valor de lada.
   */
  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * Establece el estado de telefono.
   * @param telefono - El valor de telefono.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * Establece el estado de claveScianModal.
   * @param claveScianModal - El valor de claveScianModal.
   */
  public setClaveScianModal(claveScianModal: string): void {
    this.update((state) => ({
      ...state,
      claveScianModal,
    }));
  }

  /**
   * Establece el estado de claveDescripcionModal.
   * @param claveDescripcionModal - El valor de claveDescripcionModal.
   */
  public setClaveDescripcionModal(claveDescripcionModal: string): void {
    this.update((state) => ({
      ...state,
      claveDescripcionModal,
    }));
  }

  /**
   * Establece el estado de avisoCheckbox.
   * @param avisoCheckbox - El valor de avisoCheckbox.
   */
  public setAvisoCheckbox(avisoCheckbox: boolean): void {
    this.update((state) => ({
      ...state,
      avisoCheckbox,
    }));
  }

  /**
   * Establece el estado de licenciaSanitaria.
   * @param licenciaSanitaria - El valor de licenciaSanitaria.
   */
  public setLicenciaSanitaria(licenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      licenciaSanitaria,
    }));
  }

  /**
   * Establece el estado de regimen.
   * @param regimen - El valor de regimen.
   */
  public setRegimen(regimen: string): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Establece el estado de aduanasEntradas.
   * @param aduanasEntradas - El valor de aduanasEntradas.
   */
  public setAduanasEntradas(aduanasEntradas: string): void {
    this.update((state) => ({
      ...state,
      aduanasEntradas,
    }));
  }

  /**
   * Establece el estado de numeroPermiso.
   * @param numeroPermiso - El valor de numeroPermiso.
   */
  public setNumeroPermiso(numeroPermiso: string): void {
    this.update((state) => ({
      ...state,
      numeroPermiso,
    }));
  }

  /**
   * Establece el estado de clasificacion.
   * @param clasificacion - El valor de clasificacion.
   */
  public setClasificacion(clasificacion: string): void {
    this.update((state) => ({
      ...state,
      clasificacion,
    }));
  }

  /**
   * Establece el estado de especificar.
   * @param especificar - El valor de especificar.
   */
  public setEspecificar(especificar: string): void {
    this.update((state) => ({
      ...state,
      especificar,
    }));
  }

  /**
   * Establece el estado de denominacionEspecifica.
   * @param denominacionEspecifica - El valor de denominacionEspecifica.
   */
  public setDenominacionEspecifica(denominacionEspecifica: string): void {
    this.update((state) => ({
      ...state,
      denominacionEspecifica,
    }));
  }

  /**
   * Establece el estado de denominacionDistintiva.
   * @param denominacionDistintiva - El valor de denominacionDistintiva.
   */
  public setDenominacionDistintiva(denominacionDistintiva: string): void {
    this.update((state) => ({
      ...state,
      denominacionDistintiva,
    }));
  }

  /**
   * Establece el estado de denominacionComun.
   * @param denominacionComun - El valor de denominacionComun.
   */
  public setDenominacionComun(denominacionComun: string): void {
    this.update((state) => ({
      ...state,
      denominacionComun,
    }));
  }

  /**
   * Establece el estado de tipoDeProducto.
   * @param tipoDeProducto - El valor de tipoDeProducto.
   */
  public setTipoDeProducto(tipoDeProducto: string): void {
    this.update((state) => ({
      ...state,
      tipoDeProducto,
    }));
  }

  /**
   * Establece el estado de estadoFisico.
   * @param estadoFisico - El valor de estadoFisico.
   */
  public setEstadoFisico(estadoFisico: string): void {
    this.update((state) => ({
      ...state,
      estadoFisico,
    }));
  }

  /**
   * Establece el estado de fraccionArancelaria.
   * @param fraccionArancelaria - El valor de fraccionArancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Establece el estado de descripcionFraccion.
   * @param descripcionFraccion - El valor de descripcionFraccion.
   */
  public setDescripcionFraccion(descripcionFraccion: string): void {
    this.update((state) => ({
      ...state,
      descripcionFraccion,
    }));
  }

  /**
   * Establece el estado de cantidadUMT.
   * @param cantidadUMT - El valor de cantidadUMT.
   */
  public setCantidadUMT(cantidadUMT: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMT,
    }));
  }

  /**
   * Establece el estado de UMT.
   * @param UMT - El valor de UMT.
   */
  public setUMT(UMT: string): void {
    this.update((state) => ({
      ...state,
      UMT,
    }));
  }

  /**
   * Establece el estado de cantidadUMC.
   * @param cantidadUMC - El valor de cantidadUMC.
   */
  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC,
    }));
  }

  /**
   * Establece el estado de UMC.
   * @param UMC - El valor de UMC.
   */
  public setUMC(UMC: string): void {
    this.update((state) => ({
      ...state,
      UMC,
    }));
  }

  /**
   * Establece el estado de presentacion.
   * @param presentacion - El valor de presentacion.
   */
  public setPresentacion(presentacion: string): void {
    this.update((state) => ({
      ...state,
      presentacion,
    }));
  }

  /**
   * Establece el estado de numeroRegistro.
   * @param numeroRegistro - El valor de numeroRegistro.
   */
  public setNumeroRegistro(numeroRegistro: string): void {
    this.update((state) => ({
      ...state,
      numeroRegistro,
    }));
  }

  /**
   * Establece el estado de fechaCaducidad.
   * @param fechaCaducidad - El valor de fechaCaducidad.
   */
  public setFechaCaducidad(fechaCaducidad: string): void {
    this.update((state) => ({
      ...state,
      fechaCaducidad,
    }));
  }

  /**
   * Establece el estado de cumplimiento.
   * @param cumplimiento - El valor de cumplimiento.
   */
  public setCumplimiento(cumplimiento: string): void {
    this.update((state) => ({
      ...state,
      cumplimiento,
    }));
  }

  /**
   * Establece el estado de rfc.
   * @param rfc - El valor de rfc.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece el estado de nombre.
   * @param nombre - El valor de nombre.
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Establece el estado de apellidoPaterno.
   * @param apellidoPaterno - El valor de apellidoPaterno.
   */
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  /**
   * Establece el estado de apellidoMaterno.
   * @param apellidoMaterno - El valor de apellidoMaterno.
   */
  public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  /**
   * Actualiza el estado con el arreglo proporcionado de datos de país de origen.
   *
   * @param aduanasDeEntrada - Un arreglo de cadenas que representa los datos de país de origen.
   */
  public setPaisDeOriginDatos(aduanasDeEntrada: string[]): void {
    this.update((state) => ({
      ...state,
      aduanasDeEntrada,
    }));
  }
  /**
  * Establece el estado de garantiasOfrecidas.
  * @param garantiasOfrecidas - El valor de garantiasOfrecidas.
  */
  public setGarantiasOfrecidas(garantiasOfrecidas: string): void {
    this.update((state) => ({
      ...state,
      garantiasOfrecidas,
    }));
  }
   /**
       * Establece el estado de rfc.
       * @param nombre - El valor de rfc.
       */
    public setNumero(nombre: string):void {
        this.update((state) => ({
            ...state,
            nombre,
        }));
    }

     /**
       * Establece el estado de rfc.
       * @param mensaje - El valor de rfc.
       */
    public setMensaje(mensaje: boolean):void {
        this.update((state) => ({
            ...state,
            mensaje,
        }));
    }
    
}
