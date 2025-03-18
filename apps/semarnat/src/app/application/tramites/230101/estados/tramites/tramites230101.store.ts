import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 230101
 * @returns Solicitud230101
 */
export interface Solicitud230101State {
  ambiental: string;
  tipoDeProducto: string;
  paisDeProcedencia: string;
  selectedOptions: Boolean[];
  clasificacionMercancias: string;
  fraccionArancelaria: string;
  descFraccionArancelaria: string;
  cantidad: string;
  cantidadLetra: string;
  genero: string;
  especie: string;
  nombreComun: string;
  exentoDePago: string;
  justificacion: string;
  claveDeReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llaveDePago: string;
  fechaPago: string;
  importePago: string;
}

export function createInitialSolicitudState(): Solicitud230101State {
  return {
    ambiental: 'definitivos',
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
    exentoDePago: 'No',
    justificacion: '',
    claveDeReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llaveDePago: '',
    fechaPago: '',
    importePago: ''
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud230101', resettable: true })
export class Solicitud230101Store extends Store<Solicitud230101State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  public setAmbiental(ambiental: string) {
    this.update((state) => ({
      ...state,
      ambiental
    }));
  }

  public setTipoDeProducto(tipoDeproducto: string) {
    this.update((state) => ({
      ...state,
      tipoDeproducto
    }));
  }

  public setPaisDeProcedencia(paisDeProcedencia: string) {
    this.update((state) => ({
      ...state,
      paisDeProcedencia
    }));
  }

  public setSelectedOptions(selectedOptions: boolean[]) {
    this.update((state) => ({
      ...state,
      selectedOptions
    }));
  }

  public setClasificacionMercancias(clasificacionMercancias: string) {
    this.update((state) => ({
      ...state,
      clasificacionMercancias
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria
    }));
  }

  public setDescFraccionArancelaria(descFraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      descFraccionArancelaria
    }));
  }

  public setCantidad(cantidad: string) {
    this.update((state) => ({
      ...state,
      cantidad
    }));
  }

  public setCantidadLetra(cantidadLetra: string) {
    this.update((state) => ({
      ...state,
      cantidadLetra
    }));
  }

  public setGenero(genero: string) {
    this.update((state) => ({
      ...state,
      genero
    }));
  }

  public setEspecie(especie: string) {
    this.update((state) => ({
      ...state,
      especie
    }));
  }

  public setNombreComun(nombreComun: string) {
    this.update((state) => ({
      ...state,
      nombreComun
    }));
  }

  public setExentoDePago(exentoDePago: string) {
    this.update((state) => ({
      ...state,
      exentoDePago
    }));
  }

  public setJustificacion(justificacion: string) {
    this.update((state) => ({
      ...state,
      justificacion
    }));
  }

  public setClaveDeReferencia(claveDeReferencia: string) {
    this.update((state) => ({
      ...state,
      claveDeReferencia
    }));
  }

  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaDependencia
    }));
  }

  public setBanco(banco: string) {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  public setllaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago
    }));
  }

  public setFechaPago(fechaPago: string) {
    this.update((state) => ({
      ...state,
      fechaPago
    }));
  }

  public setImportePago(importePago: string) {
    this.update((state) => ({
      ...state,
      importePago
    }));
  }

}