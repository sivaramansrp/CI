import { DatosDetalle, DatosSolicitud } from '../models/datos-tramite.model';
import { Store, StoreConfig } from '@datorama/akita';
import { DestinatarioConfiguracionItem } from '../enum/destinatario-tabla.enum';
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
 * Interfaz que representa el estado inicial de la solicitud 230201.
 */
export interface Solicitud230201State {
  paisDeProcedencia: Catalogo[] | null;
  aduana: Catalogo[] | null;
  fechasSeleccionadas: string[];
  pais: Catalogo[] | null;
  entidades: Catalogo[] | null;
  descripcionProducto: Catalogo[] | null;
  datosSolicitud: DatosSolicitud[];
  datosDetalle: DatosDetalle[];
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


  /**
   * Lista de destinatarios configurados para el trámite.
   */
  destinatarios: DestinatarioConfiguracionItem[];

  /**
   * Clave de referencia del trámite.
   */
  claveDeReferencia: string;

  /**
   * Cadena de dependencia asociada al trámite.
   */
  cadenaPagoDependencia: string;

  /**
   * Banco relacionado con el trámite.
   */
  banco: string;

  /**
   * Llave de pago del trámite.
   */
  llaveDePago: string;

  /**
   * Fecha de pago del trámite.
   */
  fecPago: string;

  /**
   * Importe del pago realizado.
   */
  impPago: string;

}

/**
 * Función que crea el estado inicial de la solicitud 230201.
 * @returns Estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud230201State {
  return {
    paisDeProcedencia: [{id: 0, descripcion: 'paisDeProcedencia'}],
    aduana: null,
    fechasSeleccionadas: [],
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
    colonia: '',
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    banco: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    destinatarios: [],
  };
}

/**
 * Clase que representa el store para manejar el estado de la solicitud 230201.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230201', resettable: true })
export class Tramite230201Store extends Store<Solicitud230201State> {

  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece la lista de paisDeProcedencia en el estado.
   * @param paisDeProcedencia Lista de paisDeProcedencia.
   */
  public setpaisDeProcedencia(paisDeProcedencia: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      paisDeProcedencia: paisDeProcedencia,
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

  public setFechasSeleccionadas(fechasSeleccionadas: string[]): void {
    this.update((state) => ({
      ...state,
      fechasSeleccionadas,
    }));
  }

  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setEntidades(entidades: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      entidades,
    }));
  }

  public setDescripcionProducto(descripcionProducto: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      descripcionProducto,
    }));
  }

  public setDatosSolicitud(datosSolicitud: DatosSolicitud[]): void {
    this.update((state) => ({
      ...state,
      datosSolicitud,
    }));
  }
  
  public setDatosDetalle(datosDetalle: DatosDetalle[]): void {
    this.update((state) => ({
      ...state,
      datosDetalle,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setDescripcionFraccionArancelaria(
    descripcionFraccionArancelaria: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  public setCantidadLetra(cantidadLetra: string): void {
    this.update((state) => ({
      ...state,
      cantidadLetra,
    }));
  }

  public setGenero(genero: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      genero,
    }));
  }

  public setEspecie(especie: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      especie,
    }));
  }

  public setNombreComun(nombreComun: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      nombreComun,
    }));
  }

  public setUnidadDeMedida(unidadDeMedida: Catalogo[]): void {
    this.update((state) => ({
      ...this.getValue(),
      unidadDeMedida,
    }));
  }

  public setLungarDeEntrada(lungarDeEntrada: string): void {
    this.update((state) => ({
      ...state,
      lungarDeEntrada: lungarDeEntrada,
    }));
  }

  public setMedioDeTransporte(medioDeTransporte: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      medioDeTransporte: medioDeTransporte,
    }));
  }

  public setNumeroYDescripcion(numeroYDescripcion: string): void {
    this.update((state) => ({
      ...state,
      numeroYDescripcion: numeroYDescripcion,
    }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal: codigoPostal,
    }));
  }

  public setEstado(estado: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      estado: estado,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle: calle,
    }));
  }

  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior: numeroExterior,
    }));
  }

  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior: numeroInterior,
    }));
  }

  public setColonia(colonia: string): void {
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

  /**
   * Actualiza la clave de referencia.
   * @param {string} claveDeReferencia - Nueva clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia
    }));
  }

  /**
   * Actualiza la cadena de dependencia.
   * @param {string} cadenaPagoDependencia - Nueva cadena de dependencia.
   */
  public setCadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia
    }));
  }

  /**
   * Actualiza el banco.
   * @param {string} banco - Nuevo banco.
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  /**
   * Actualiza la llave de pago.
   * @param {string} llaveDePago - Nueva llave de pago.
   */
  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago
    }));
  }

  /**
   * Actualiza la fecha de pago.
   * @param {string} fecPago - Nueva fecha de pago.
   */
  public setFecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago
    }));
  }

  /**
   * Actualiza el importe de pago.
   * @param {string} impPago - Nuevo importe de pago.
   */
  public setImpPago(impPago: string): void {
    this.update((state) => ({
      ...state,
      impPago
    }));
  }
  

  /**
   * 
   * Actualiza el estado con la entidad federativa seleccionada.
   *
   * {string} entidadFederativa - La entidad federativa seleccionada.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * 
   * Actualiza el estado con el estado del popup de terceros.
   *
   * {boolean} tercerosPopupState - El estado del popup de terceros.
   */

  public setTercerosPopupState(tercerosPopupState: boolean): void {
    this.update((state) => ({
      ...state,
      tercerosPopupState,
    }));
  }

  
  /**
   * 
   * Actualiza el estado con la lista de destinatarios.
   *
   * {DestinatarioConfiguracionItem[]} datosTabla - La lista de destinatarios.
   */
  setDatosDestinatario(destinatarios: DestinatarioConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      destinatarios: destinatarios,
    }));
  }
  
}
