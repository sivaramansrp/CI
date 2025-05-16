import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Mercancias } from '../../constantes/certificado-sgp.enum';

/**
 * Interfaz que define el estado del trámite 110209.
 */
export interface Tramite110209State {
  medioDeTransporte: string;
  rutaCompleta: string;
  puertoDeEmbarque: string;
  puertoDeDesembarque: string;
  observaciones: string;
  mercanciasSeleccionadas: Mercancias;
  descripcion: string;
  marca: string;
  valorMercancia: string;
  unidadMedida: string;
  numeroFactura: string;
  tipoFactura: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  numeroDeRegistroFiscal: string;
  razonSocial: string;
  calle: string;
  numeroLetra: string;
  ciudad: string;
  correoElectronico: string;
  fax: number;
  telefono: number;
}

/**
 * Función que crea el estado inicial del trámite 110209.
 * @returns {Tramite110209State} - El estado inicial del trámite 110209.
 */
export function createInitialState(): Tramite110209State {
  return {
    medioDeTransporte: '',
    rutaCompleta: '',
    puertoDeEmbarque: '',
    puertoDeDesembarque: '',
    observaciones: '',
    mercanciasSeleccionadas: {
      numeroDeOrden: '',
      fraccionArancelaria: '',
      nombreTecnico: '',
      nombreComercial: '',
      nombreIngles: '',
      numeroDeRegistro: ''
    },
    descripcion: '',
    marca: '',
    valorMercancia: '',
    unidadMedida: '',
    numeroFactura: '',
    tipoFactura: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDeRegistroFiscal: '',
    razonSocial: '',
    calle: '',
    numeroLetra: '',
    ciudad: '',
    correoElectronico: '',
    fax: 0,
    telefono: 0,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110209', resettable: true })
/**
 * Clase que representa el store del trámite 110209.
 */
export class Tramite110209Store extends Store<Tramite110209State> {
  /**
   * Constructor del store.
   */
  constructor() {
    super(createInitialState());
  }

  setTramite110209(estado: Partial<Tramite110209State>): void {
    this.update((state) => ({
      ...state,
      ...estado,
    }));
  }

}