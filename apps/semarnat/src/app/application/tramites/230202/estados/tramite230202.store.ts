import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa un catálogo genérico.
 * Un catálogo contiene un identificador único y una descripción asociada.
 */
export interface Catalogo {
  /**
   * Identificador único del catálogo.
   * @type {number}
   */
  id: number;

  /**
   * Descripción del catálogo.
   * @type {string}
   */
  descripcion: string;
}

/**
 * Interfaz que representa el estado inicial de la solicitud 230202.
 */
export interface Solicitud230202State {
  numeroDeCertificado: Catalogo[] | null;
  aduana: Catalogo[] | null;
  fechasSeleccionadas: Catalogo[] | null;
  pais: Catalogo[] | null;
  entidades: Catalogo[] | null;
  descripcionProducto: Catalogo[] | null;
  datosSolicitud: Catalogo[] | null;
  datosDetalle: Catalogo[] | null;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidad: string;
  cantidadLetra: string;
  genero: Catalogo[] | null;
  especie: Catalogo[] | null;
  nombreComun: Catalogo[] | null;
  unidadDeMedida: Catalogo[] | null;
  lungarDeEntrada: string;
  medioDeTransporte: Catalogo[] | null;
  numeroYDescripcion: string;
  codigoPostal: string;
  estado: Catalogo[] | null;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
}

/**
 * Función que crea el estado inicial de la solicitud 230202.
 * @returns Estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud230202State {
  return {
    numeroDeCertificado: null,
    aduana: null,
    fechasSeleccionadas: null,
    pais: null,
    entidades: null,
    descripcionProducto: null,
    datosSolicitud: [],
    datosDetalle: [],
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidad: '',
    cantidadLetra: '',
    genero: null,
    especie: null,
    nombreComun: null,
    unidadDeMedida: null,
    lungarDeEntrada: '',
    medioDeTransporte: null,
    numeroYDescripcion: '',
    codigoPostal: '',
    estado: null,
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: ''
  };
}

/**
 * Clase que representa el store para manejar el estado de la solicitud 230202.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230202', resettable: true })
export class Tramite230202Store extends Store<Solicitud230202State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece la lista de numeroDeCertificado en el estado.
   * @param numeroDeCertificado Lista de numeroDeCertificado.
   */
  public setNumeroDeCertificado(numeroDeCertificado: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      numeroDeCertificado,
    }));
  }

  /**
   * Establece la lista de aduanas en el estado.
   * @param aduana Lista de aduanas.
   */
  public setAduana(aduana: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setFechasSeleccionadas(fechasSeleccionadas: Catalogo[]) {
    this.update((state) => ({
      ...state,
      fechasSeleccionadas,
    }));
  }

  public setPais(pais: Catalogo[]) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setEntidades(entidades: Catalogo[]) {
    this.update((state) => ({
      ...state,
      entidades,
    }));
  }

  public setDescripcionProducto(descripcionProducto: Catalogo[]) {
    this.update((state) => ({
      ...state,
      descripcionProducto,
    }));
  }

  public setDatosSolicitud(datosSolicitud: Catalogo[]) {
    this.update((state) => ({
      ...this.getValue(),
      datosSolicitud,
    }));
  }
  
  public setDatosDetalle(datosDetalle: Catalogo[]) {
    this.update((state) => ({
      ...this.getValue(),
      datosDetalle,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setDescripcionFraccionArancelaria(
    descripcionFraccionArancelaria: string
  ) {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  public setCantidad(cantidad: string) {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  public setCantidadLetra(cantidadLetra: string) {
    this.update((state) => ({
      ...state,
      cantidadLetra,
    }));
  }

  public setGenero(genero: Catalogo[]) {
    this.update((state) => ({
      ...state,
      genero,
    }));
  }

  public setEspecie(especie: Catalogo[]) {
    this.update((state) => ({
      ...state,
      especie,
    }));
  }

  public setNombreComun(nombreComun: Catalogo[]) {
    this.update((state) => ({
      ...state,
      nombreComun,
    }));
  }

  public setUnidadDeMedida(unidadDeMedida: Catalogo[]) {
    this.update((state) => ({
      ...this.getValue(),
      unidadDeMedida,
    }));
  }

  public setLungarDeEntrada(lungarDeEntrada: string) {
    this.update((state) => ({
      ...state,
      lungarDeEntrada: lungarDeEntrada,
    }));
  }

  public setMedioDeTransporte(medioDeTransporte: Catalogo[]) {
    this.update((state) => ({
      ...state,
      medioDeTransporte: medioDeTransporte,
    }));
  }

  public setNumeroYDescripcion(numeroYDescripcion: string) {
    this.update((state) => ({
      ...state,
      numeroYDescripcion: numeroYDescripcion,
    }));
  }

  public setCodigoPostal(codigoPostal: string) {
    this.update((state) => ({
      ...state,
      codigoPostal: codigoPostal,
    }));
  }

  public setEstado(estado: Catalogo[]) {
    this.update((state) => ({
      ...state,
      estado: estado,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle: calle,
    }));
  }

  public setNumeroExterior(numeroExterior: string) {
    this.update((state) => ({
      ...state,
      numeroExterior: numeroExterior,
    }));
  }

  public setNumeroInterior(numeroInterior: string) {
    this.update((state) => ({
      ...state,
      numeroInterior: numeroInterior,
    }));
  }

  public setColonia(colonia: string) {
    this.update((state) => ({
      ...state,
      colonia: colonia,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
