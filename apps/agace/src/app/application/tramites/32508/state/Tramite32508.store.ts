import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
}

/**
 * Estado inicial para la interfaz del trámite 32508.
 */
export interface Solicitud32508State {
 
  claveFiscalizado: string;
  tipoDictamen: string;
  rfc: string;
  numeroInscripcion: string;
  ano: Catalogo[] | null;
  mes: Catalogo[] | null;
  radioPartial: string;
  radioTotal: string;
  saldoPendiente: string;
  aprovechamiento: string;
  disminucionAplicada: string;
  saldoPendienteDisminuir: string;
  cantidad: string;
  llaveDePago: string;
  archivo:File[];
  fechaPago: string;
  fechaElaboracion: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 32508.
 * @returns Estado inicial de tipo `Solicitud32508State`.
 */
export function createInitialState(): Solicitud32508State {
  return {
    claveFiscalizado: '',
    tipoDictamen: '',
    rfc: '',
    numeroInscripcion: '',
    ano: null,
    mes: null,
    radioPartial: '',
    radioTotal: '',
    saldoPendiente: '',
    aprovechamiento: '',
    disminucionAplicada: '',
    saldoPendienteDisminuir: '',
    cantidad: '',
    llaveDePago: '',
    archivo: [], 
    fechaPago: '',
    fechaElaboracion:'',
    
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 32508.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32508', resettable: true })
export class Tramite32508Store extends Store<Solicitud32508State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  public setClaveFiscalizador(claveFiscalizado: string) {
    this.update((state) => ({ ...state, claveFiscalizado }));
  }

  public setTipoDictamen(tipoDictamen: string) {
    this.update((state) => ({ ...state, tipoDictamen }));
  }

  public setRfc(rfc: string) {
    this.update((state) => ({ ...state, rfc }));
  }

  public setNumeroInscripcion(numeroInscripcion: string) {
    this.update((state) => ({ ...state, numeroInscripcion }));
  }

  public setAno(ano: Catalogo[] | null) {
    this.update((state) => ({ ...state, ano }));
  }

  public setMes(mes: Catalogo[] | null) {
    this.update((state) => ({ ...state, mes }));
  }

  public setRadioPartial(radioPartial: string) {
    this.update((state) => ({ ...state, radioPartial }));
  }

  public setRadioTotal(radioTotal: string) {
    this.update((state) => ({ ...state, radioTotal }));
  }

  public setSaldoPendiente(saldoPendiente: string) {
    this.update((state) => ({ ...state, saldoPendiente }));
  }

  public setAprovechamiento(aprovechamiento: string) {
    this.update((state) => ({ ...state, aprovechamiento }));
  }

  public setDisminucionAplicada(disminucionAplicada: string) {
    this.update((state) => ({ ...state, disminucionAplicada }));
  }

  public setSaldoPendienteDisminuir(saldoPendienteDisminuir: string) {
    this.update((state) => ({ ...state, saldoPendienteDisminuir }));
  }

  public setCantidad(cantidad: string) {
    this.update((state) => ({ ...state, cantidad }));
  }

  public setLlaveDePago(llaveDePago: string) {
    this.update((state) => ({ ...state, llaveDePago }));
  }

  public setArchivo(archivo: File[]) {
    this.update((state) => ({ ...state, archivo }));
  }

  public setFechaPago(fechaPago: string) {
    this.update((state) => ({ ...state, fechaPago }));
  }
 public setFechaElaboracion(fechaElaboracion: string) {
    this.update((state) => ({ ...state, fechaElaboracion }));
  }

  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
