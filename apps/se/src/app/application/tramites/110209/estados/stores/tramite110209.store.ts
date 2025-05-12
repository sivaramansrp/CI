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

  /**
   * Establece el medio de transporte en el estado.
   * @param {string} medioDeTransporte - El medio de transporte.
   */
  public setMedioDeTransporte(medioDeTransporte: string): void {
    this.update((state) => ({
      ...state,
      medioDeTransporte,
    }));
  }

  /**
   * Establece la ruta completa en el estado.
   * @param {string} rutaCompleta - La ruta completa.
   */
  public setRutaCompleta(rutaCompleta: string): void {
    this.update((state) => ({
      ...state,
      rutaCompleta,
    }));
  }

  /**
   * Establece el puerto de embarque en el estado.
   * @param {string} puertoDeEmbarque - El puerto de embarque.
   */
  public setPuertoDeEmbarque(puertoDeEmbarque: string): void {
    this.update((state) => ({
      ...state,
      puertoDeEmbarque,
    }));
  }

  /**
   * Establece el puerto de desembarque en el estado.
   * @param {string} puertoDeDesembarque - El puerto de desembarque.
   */
  public setPuertoDeDesembarque(puertoDeDesembarque: string): void {
    this.update((state) => ({
      ...state,
      puertoDeDesembarque,
    }));
  }

  /**
   * Establece las observaciones en el estado.
   * @param {string} observaciones - Las observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /**
   * Establece las mercancías seleccionadas en el estado.
   * @param {Mercancias} mercanciasSeleccionadas - Las mercancías seleccionadas.
   */
  public setMercanciasSeleccionadas(mercanciasSeleccionadas: Mercancias): void {
    this.update((state) => ({
      ...state,
      mercanciasSeleccionadas,
    }));
  }

  /**
   * Establece la descripción en el estado.
   * @param {string} descripcion - La descripción.
   */
  public setDescripcion(descripcion: string): void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  /**
   * Establece la marca en el estado.
   * @param {string} marca - La marca.
   */
  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  /**
   * Establece el valor de la mercancía en el estado.
   * @param {string} valorMercancia - El valor de la mercancía.
   */
  public setValorMercancia(valorMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorMercancia,
    }));
  }

  /**
   * Establece la unidad de medida en el estado.
   * @param {string} unidadMedida - La unidad de medida.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }

  /**
   * Establece el número de factura en el estado.
   * @param {string} numeroFactura - El número de factura.
   */
  public setNumeroFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroFactura,
    }));
  }

  /**
   * Establece el tipo de factura en el estado.
   * @param {string} tipoFactura - El tipo de factura.
   */
  public setTipoFactura(tipoFactura: string): void {
    this.update((state) => ({
      ...state,
      tipoFactura,
    }));
  }

  /**
   * Establece el nombre en el estado.
   * @param {string} nombre - El nombre.
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Establece el primer apellido en el estado.
   * @param {string} primerApellido - El primer apellido.
   */
  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  /**
   * Establece el segundo apellido en el estado.
   * @param {string} segundoApellido - El segundo apellido.
   */
  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  /**
   * Establece el número de registro fiscal en el estado.
   * @param {string} numeroDeRegistroFiscal - El número de registro fiscal.
   */
  public setNumeroDeRegistroFiscal(numeroDeRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      numeroDeRegistroFiscal,
    }));
  }

  /**
   * Establece la razón social en el estado.
   * @param {string} razonSocial - La razón social.
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  /**
   * Establece la calle en el estado.
   * @param {string} calle - La calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Establece el número o letra en el estado.
   * @param {string} numeroLetra - El número o letra.
   */
  public setNumeroLetra(numeroLetra: string): void {
    this.update((state) => ({
      ...state,
      numeroLetra,
    }));
  }

  /**
   * Establece la ciudad en el estado.
   * @param {string} ciudad - La ciudad.
   */
  public setCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }

  /**
   * Establece el correo electrónico en el estado.
   * @param {string} correoElectronico - El correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Establece el fax en el estado.
   * @param {number} fax - El fax.
   */
  public setFax(fax: number): void {
    this.update((state) => ({
      ...state,
      fax,
    }));
  }

  /**
   * Establece el teléfono en el estado.
   * @param {number} telefono - El teléfono.
   */
  public setTelefono(telefono: number): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }
}