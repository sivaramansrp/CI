import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 32502
 * @returns Solicitud32502
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

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32505', resettable: true })
export class tramite32505Store extends Store<Solicitud32502State> {
  constructor() {
    super(createInitialState());
  }

  public setAdace(adace: string) {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }
  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }
  public setAnio(anio: string) {
    this.update((state) => ({
      ...state,
      anio,
    }));
  }
  public setTipoBusqueda(tipoBusqueda: string) {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }
  public setTipoBusquedaAviso(tipoBusquedaAviso: string) {
    this.update((state) => ({
      ...state,
      tipoBusquedaAviso,
    }));
  }

  public setFolioTipo(folioTipo: string) {
    this.update((state) => ({
      ...state,
      folioTipo,
    }));
  }
  public setNumeroSerie(numeroSerie: string) {
    this.update((state) => ({
      ...state,
      numeroSerie,
    }));
  }
  public setNumeroNIV(numeroNIV: string) {
    this.update((state) => ({
      ...state,
      numeroNIV,
    }));
  }
  public setAnoModelo(anoModelo: string) {
    this.update((state) => ({
      ...state,
      anoModelo,
    }));
  }
  public setMarca(marca: string) {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }
 
  public setModelo(modelo: string) {
    this.update((state) => ({
      ...state,
      modelo,
    }));
  }
  public setTipoVariante(tipoVariante: string) {
    this.update((state) => ({
      ...state,
      tipoVariante,
    }));
  }
  public setCilindros(cilindros: string) {
    this.update((state) => ({
      ...state,
      cilindros,
    }));
  }
  public setPuertas(puertas: string) {
    this.update((state) => ({
      ...state,
      puertas,
    }));
  }
  public setCombustible(combustible: string) {
    this.update((state) => ({
      ...state,
      combustible,
    }));
  }
  public setPropiedad(propiedad: string) {
    this.update((state) => ({
      ...state,
      propiedad,
    }));
  }
  public setNombreTitulo(nombreTitulo: string) {
    this.update((state) => ({
      ...state,
      nombreTitulo,
    }));
  }

  public setPaisEmitio(paisEmitio: string) {
    this.update((state) => ({
      ...state,
      paisEmitio,
    }));
  }

  public setProvinciaEmision(provinciaEmision: string) {
    this.update((state) => ({
      ...state,
      provinciaEmision,
    }));
  }
  public setProcedencia(procedencia: string) {
    this.update((state) => ({
      ...state,
      procedencia,
    }));
  }

  public setVehiculoImportado(vehiculoImportado: string) {
    this.update((state) => ({
      ...state,
      vehiculoImportado,
    }));
  }
  public setExportacion(exportacion: string) {
    this.update((state) => ({
      ...state,
      exportacion,
    }));
  }

  public setAduanaImportacion(aduanaImportacion: string) {
    this.update((state) => ({
      ...state,
      aduanaImportacion,
    }));
  }     

  public setPatenteImportacion(patenteImportacion:string){
    this.update((state) => ({
      ...state,
      patenteImportacion,
    }));

  }

 public setPedimentoImportacion(pedimentoImportacion:string){
    this.update((state) => ({
      ...state,
      pedimentoImportacion,
    }));

  }

  public setKilometraje(kilometraje:string){
    this.update((state) => ({
      ...state,
      kilometraje,
    }));
  }
  
  public setValorAduana(valorAduana:string){
    this.update((state) => ({
      ...state,
      valorAduana,
    }));
  }
  
  public setMontoIGI(montoIGI:string){
    this.update((state) => ({
      ...state,
      montoIGI,
    }));
  }
  public setFormaPagoIGI(formaPagoIGI:string){
    this.update((state) => ({
      ...state,
      formaPagoIGI,
    }));
  }
  public setMontoDTA(montoDTA:string){
    this.update((state) => ({
      ...state,
      montoDTA,
    }));
  }

  public setMontoIVA(montoIVA:string){
    this.update((state) => ({
      ...state,
      montoIVA,
    }));
  }

  public setValorDolares(valorDolares:string){
    this.update((state) => ({
      ...state,
      valorDolares,
    }));
  }

  public setFolioCFDI(folioCFDI:string){
    this.update((state) => ({
      ...state,
      folioCFDI,
    }));
  }

  public setFolioVenta(folioVenta:string){
    this.update((state) => ({
      ...state,
      folioVenta,
    }));
  }

  public setValorVenta(valorVenta:string){
    this.update((state) => ({
      ...state,
      valorVenta,
    }));
  }
}