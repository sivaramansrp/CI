import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 32502
 * @returns Solicitud32502
 */
export interface Solicitud32502State {
  adace: string;
  razonSocial: string;
  rfc: string;
  rfcExtranjero: string;
  cveFraccionArancelaria: string;
  reglaFraccion: string;
  nico: string;
  valorUSD: string;
  marca: string;
  peso: string;
  fechaInicio: string;
  numeroSerie: string;
  descripcionMercancia: string;
  informacionExtra: string;
  entidadFederativa: string;
  delegacionMunicipio: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  patenteAutorizacion: string;
  rfcAgenteAduanal: string;
  numeroPedimento: string;
  claveAduana: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  dropdown: string;
  commonCheckbox: boolean;
  individualCheckbox: boolean [];
}

/**
 * Crea el estado inicial para la solicitud 32502.
 *
 * @returns {Solicitud32502State} Objeto con todos los campos inicializados.
 */
export function createInitialState(): Solicitud32502State {
  return {
    adace: '',
    razonSocial: '',
    rfc: '',
    rfcExtranjero: '',
    cveFraccionArancelaria: '',
    reglaFraccion: '',
    nico: '',
    valorUSD: '',
    marca: '',
    peso: '',
    fechaInicio: '',
    numeroSerie: '',
    descripcionMercancia: '',
    informacionExtra: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    patenteAutorizacion: '',
    rfcAgenteAduanal: '',
    numeroPedimento: '',
    claveAduana: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipoDocumento: '',
    dropdown: '',
    commonCheckbox: false,
    individualCheckbox: [false, false, false, false, false, false],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32502', resettable: true })
/**
 * Clase encargada de manejar y actualizar el estado de la solicitud 32502.
 */
export class Tramite32502Store extends Store<Solicitud32502State> {
  /**
 * Método estático para establecer la regla de fracción arancelaria en el estado de la solicitud.
 * 
 * @param {string} arg0 - Valor de la regla de fracción arancelaria que se desea establecer.
 * 
 * @throws {Error} Este método no está implementado actualmente y lanzará un error si se intenta utilizar.
 * 
 * @example
 * Tramite32502Store.setFraccionRegla('Regla123');
 * 
 * Nota: Este método debe ser implementado para actualizar correctamente el estado de la solicitud.
 */
  static setFraccionRegla(arg0: string): void {
    throw new Error('Method not implemented.');
  }
  /**
   * Constructor: inicializa el estado con valores por defecto.
   */
  constructor() {
    super(createInitialState());
  }

  public setCveFraccionArancelaria(cveFraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      cveFraccionArancelaria,
    }));
  }
/**
 * Método para actualizar la fecha de inicio en el estado de la solicitud.
 * 
 * @param {string} fechaInicio - Valor de la fecha de inicio que se desea establecer en el estado.
 * 
 * @description Este método actualiza la propiedad `fechaInicio` del estado de la solicitud con el valor proporcionado.
 * 
 * @example
 * const store = new Tramite32502Store();
 * store.setFechaInicio('2025-06-26');
 */
  public setFechaInicio(fechaInicio: string) {
    this.update((state) => ({
      ...state,
      fechaInicio,
    }));
  }
    /** Métodos para actualizar diferentes propiedades del estado de la solicitud. */
    public establecerDatos(datos: Partial<Solicitud32502State>): void {
      this.update((state) => ({
        ...state,
        ...datos,
      }));
    }
}