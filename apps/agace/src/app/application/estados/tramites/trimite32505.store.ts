import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface Solicitud32502State
 * @description Define el estado inicial para el trámite 32502.
 */
export interface Solicitud32502State {
  
  numeroSerie: string;
  folioTipo: string;
  tipoBusquedaAviso: string;
  tipoBusqueda: string;
 
  /**
   * Estado de la solicitud.
   */
  adace: string;
  pais: string;
  anio: string;

  /**
   * Folio del tipo de aviso.
   */
  numeroNIV: string; 
  anoModelo: string;
  marca: string; 
  modelo: string;
  tipoVariante: string;
  cilindros: string;
  puertas: string;
  combustible: string;
  propiedad: string;
  nombreTitulo: string;
  paisEmitio: string;
  provinciaEmision: string;
  procedencia: string;
  vehiculoImportado: string;
  exportacion: string;
  

//Datos de la importación /**
  aduanaImportacion: string;
  patenteImportacion: string;
  pedimentoImportacion: string;
  valorAduana: string;
  kilometraje:string;
  montoIGI:string;
  formaPagoIGI:string;
  montoDTA:string;
  montoIVA:string;
  valorDolares:string;
  folioCFDI:string;
  folioVenta:string;
  valorVenta:string;
  
}
/**
 * @function createInitialState
 * @description Crea el estado inicial para el trámite 32502.
 * @returns {Solicitud32502State} El estado inicial.
 */
export function createInitialState(): Solicitud32502State {
  return {
    adace: 'default',
    pais: '',
    anio: '',
    tipoBusqueda: '',
    tipoBusquedaAviso:'',
    folioTipo:'',
    numeroSerie: '',
    numeroNIV: '',
    anoModelo: '',
    marca: '',
    modelo: '',
    tipoVariante: '',
    cilindros: '',
    puertas: '',
    combustible: '',
    propiedad: '',
    nombreTitulo: '',
    paisEmitio: '',
    provinciaEmision: '',
    procedencia: '',
    vehiculoImportado: '',
    exportacion: '',
    aduanaImportacion: '',
    patenteImportacion: '',
    pedimentoImportacion :'',
    valorAduana:'',
    kilometraje:'',
    montoIGI:'',
    formaPagoIGI:'',
    montoDTA:'',
    montoIVA:'',
    valorDolares:'',
    folioCFDI:'',
    folioVenta:'',
    valorVenta:'',

  };
}


/**
 * @class tramite32505Store
 * @description Store para gestionar el estado del trámite 32505.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32505', resettable: true })
export class tramite32505Store extends Store<Solicitud32502State> {
  constructor() {
    super(createInitialState());
  }

 /**
   * @method setAdace
   * @description Actualiza el estado del campo `adace`.
   * @param {string} adace - Valor a actualizar.
   */
  public setAdace(adace: string) {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }

   /**
   * @method setPais
   * @description Actualiza el estado del campo `pais`.
   * @param {string} pais - Valor a actualizar.
   */
  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

   /**
   * @method setAnio
   * @description Actualiza el estado del campo `anio`.
   * @param {string} anio - Valor a actualizar.
   */
  public setAnio(anio: string) {
    this.update((state) => ({
      ...state,
      anio,
    }));
  }

    /**
   * @method setTipoBusqueda
   * @description Actualiza el estado del campo `tipoBusqueda`.
   * @param {string} tipoBusqueda - Valor a actualizar.
   */
  public setTipoBusqueda(tipoBusqueda: string) {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }

   /**
   * @method setTipoBusquedaAviso
   * @description Actualiza el estado del campo `tipoBusquedaAviso`.
   * @param {string} tipoBusquedaAviso - Valor a actualizar.
   */
  public setTipoBusquedaAviso(tipoBusquedaAviso: string) {
    this.update((state) => ({
      ...state,
      tipoBusquedaAviso,
    }));
  }
  /**
   * @method setFolioTipo
   * @description Actualiza el estado del campo `folioTipo`.
   * @param {string} folioTipo - Valor a actualizar.
   */
  public setFolioTipo(folioTipo: string) {
    this.update((state) => ({
      ...state,
      folioTipo,
    }));
  }

   /**
   * @method setNumeroSerie
   * @description Actualiza el estado del campo `numeroSerie`.
   * @param {string} numeroSerie - Valor a actualizar.
   */
  public setNumeroSerie(numeroSerie: string) {
    this.update((state) => ({
      ...state,
      numeroSerie,
    }));
  }

  /**
   * @method setNumeroNIV
   * @description Actualiza el estado del campo `numeroNIV`.
   * @param {string} numeroNIV - Valor a actualizar.
   */
  public setNumeroNIV(numeroNIV: string) {
    this.update((state) => ({
      ...state,
      numeroNIV,
    }));
  }

/**
 * @method setAnoModelo
 * @description Actualiza el estado del campo `anoModelo`.
 * @param {string} anoModelo - Valor a actualizar.
 * */
  public setAnoModelo(anoModelo: string) {
    this.update((state) => ({
      ...state,
      anoModelo,
    }));
  }

  /**
   * @method setMarca
   * @description Actualiza el estado del campo `marca`.
   * @param {string} marca - Valor a actualizar.
   */
  public setMarca(marca: string) {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }
 
  /**
   * @method setModelo
   * @description Actualiza el estado del campo `modelo`.
   * @param {string} modelo - Valor a actualizar.
   */
  public setModelo(modelo: string) {
    this.update((state) => ({
      ...state,
      modelo,
    }));
  }

  /**
   * @method setTipoVariante
   * @description Actualiza el estado del campo `tipoVariante`.
   * @param {string} tipoVariante - Valor a actualizar.
   */
  public setTipoVariante(tipoVariante: string) {
    this.update((state) => ({
      ...state,
      tipoVariante,
    }));
  }

  /**
   * @method setCilindros
   * @description Actualiza el estado del campo `cilindros`.
   * @param {string} cilindros - Valor a actualizar.
   */
  public setCilindros(cilindros: string) {
    this.update((state) => ({
      ...state,
      cilindros,
    }));
  }

  /**
   * @method setPuertas
   * @description Actualiza el estado del campo `puertas`.
   * @param {string} puertas - Valor a actualizar.
   */
  public setPuertas(puertas: string) {
    this.update((state) => ({
      ...state,
      puertas,
    }));
  }

  /**
   * @method setCombustible
   * @description Actualiza el estado del campo `combustible`.
   * @param {string} combustible - Valor a actualizar.
   */
  public setCombustible(combustible: string) {
    this.update((state) => ({
      ...state,
      combustible,
    }));
  }
  /**
   * @method setPropiedad
   * @description Actualiza el estado del campo `propiedad`.
   * @param {string} propiedad - Valor a actualizar.
   */
  public setPropiedad(propiedad: string) {
    this.update((state) => ({
      ...state,
      propiedad,
    }));
  }

  /**
   * @method setNombreTitulo
   * @description Actualiza el estado del campo `nombreTitulo`.
   * @param {string} nombreTitulo - Valor a actualizar.
   */
  public setNombreTitulo(nombreTitulo: string) {
    this.update((state) => ({
      ...state,
      nombreTitulo,
    }));
  }
  /**
   * @method setPaisEmitio
   * @description Actualiza el estado del campo `paisEmitio`.
   * @param {string} paisEmitio - Valor a actualizar.
   */
  public setPaisEmitio(paisEmitio: string) {
    this.update((state) => ({
      ...state,
      paisEmitio,
    }));
  }
  /**
   * @method setProvinciaEmision
   * @description Actualiza el estado del campo `provinciaEmision`.
   * @param {string} provinciaEmision - Valor a actualizar.
   */
  public setProvinciaEmision(provinciaEmision: string) {
    this.update((state) => ({
      ...state,
      provinciaEmision,
    }));
  }
  /**
   * @method setProcedencia
   * @description Actualiza el estado del campo `procedencia`.
   * @param {string} procedencia - Valor a actualizar.
   */
  public setProcedencia(procedencia: string) {
    this.update((state) => ({
      ...state,
      procedencia,
    }));
  }

  /**
   * @method setVehiculoImportado
   * @description Actualiza el estado del campo `vehiculoImportado`.
   * @param {string} vehiculoImportado - Valor a actualizar.
   */
  public setVehiculoImportado(vehiculoImportado: string) {
    this.update((state) => ({
      ...state,
      vehiculoImportado,
    }));
  }
  /**
   * @method setExportacion
   * @description Actualiza el estado del campo `exportacion`.
   * @param {string} exportacion - Valor a actualizar.
   */
  public setExportacion(exportacion: string) {
    this.update((state) => ({
      ...state,
      exportacion,
    }));
  }

  /**
   * @method setAduanaImportacion
   * @description Actualiza el estado del campo `aduanaImportacion`.
   * @param {string} aduanaImportacion - Valor a actualizar.
   */
  public setAduanaImportacion(aduanaImportacion: string) {
    this.update((state) => ({
      ...state,
      aduanaImportacion,
    }));
  }     

  /**
   * @method setPatenteImportacion
   * @description Actualiza el estado del campo `patenteImportacion`.
   * @param {string} patenteImportacion - Valor a actualizar.
   */
  public setPatenteImportacion(patenteImportacion:string){
    this.update((state) => ({
      ...state,
      patenteImportacion,
    }));

  }

  /**
   * @method setPedimentoImportacion
   * @description Actualiza el estado del campo `pedimentoImportacion`.
   * @param {string} pedimentoImportacion - Valor a actualizar.
   */
 public setPedimentoImportacion(pedimentoImportacion:string){
    this.update((state) => ({
      ...state,
      pedimentoImportacion,
    }));

  }

  /**
   * @method setKilometraje
   * @description Actualiza el estado del campo `kilometraje`.
   * @param {string} kilometraje - Valor a actualizar.
   */
  public setKilometraje(kilometraje:string){
    this.update((state) => ({
      ...state,
      kilometraje,
    }));
  }
  /**
   * @method setValorAduana
   * @description Actualiza el estado del campo `valorAduana`.
   * @param {string} valorAduana - Valor a actualizar.
   */
  public setValorAduana(valorAduana:string){
    this.update((state) => ({
      ...state,
      valorAduana,
    }));
  }
  /**
   * @method setMontoIGI
   * @description Actualiza el estado del campo `montoIGI`.
   * @param {string} montoIGI - Valor a actualizar.
   */
  public setMontoIGI(montoIGI:string){
    this.update((state) => ({
      ...state,
      montoIGI,
    }));
  }

  /**
   * @method setFormaPagoIGI
   * @description Actualiza el estado del campo `formaPagoIGI`.
   * @param {string} formaPagoIGI - Valor a actualizar.
   */
  public setFormaPagoIGI(formaPagoIGI:string){
    this.update((state) => ({
      ...state,
      formaPagoIGI,
    }));
  }

  /**
   * @method setMontoDTA
   * @description Actualiza el estado del campo `montoDTA`.
   * @param {string} montoDTA - Valor a actualizar.
   */
  public setMontoDTA(montoDTA:string){
    this.update((state) => ({
      ...state,
      montoDTA,
    }));
  }
  /**
   * @method setMontoIVA
   * @description Actualiza el estado del campo `montoIVA`.
   * @param {string} montoIVA - Valor a actualizar.
   */
  public setMontoIVA(montoIVA:string){
    this.update((state) => ({
      ...state,
      montoIVA,
    }));
  }
  /**
   * @method setValorDolares
   * @description Actualiza el estado del campo `valorDolares`.
   * @param {string} valorDolares - Valor a actualizar.
   */
  public setValorDolares(valorDolares:string){
    this.update((state) => ({
      ...state,
      valorDolares,
    }));
  }
  /**
   * @method setFolioCFDI
   * @description Actualiza el estado del campo `folioCFDI`.
   * @param {string} folioCFDI - Valor a actualizar.
   */
  public setFolioCFDI(folioCFDI:string){
    this.update((state) => ({
      ...state,
      folioCFDI,
    }));
  }
  /**
   * @method setFolioVenta
   * @description Actualiza el estado del campo `folioVenta`.
   * @param {string} folioVenta - Valor a actualizar.
   */
  public setFolioVenta(folioVenta:string){
    this.update((state) => ({
      ...state,
      folioVenta,
    }));
  }
  /**
   * @method setValorVenta
   * @description Actualiza el estado del campo `valorVenta`.
   * @param {string} valorVenta - Valor a actualizar.
   */
  public setValorVenta(valorVenta:string){
    this.update((state) => ({
      ...state,
      valorVenta,
    }));
  }
}