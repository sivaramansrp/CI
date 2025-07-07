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
 * Estado inicial para la interfaz del trámite 32606.
 */
export interface Solicitud32606State {
  /** Clave del fiscalizado. */
  claveFiscalizado: string;
  /** adace */
  adace: string;
  /** Tipo de dictamen. */
  tipoDictamen: string;
  /** RFC del fiscalizado. */
  rfc: string;
  /** nombre */
  nombre: string;
  /** Número de inscripción. */
  numeroInscripcion: string;
  /** Catálogo de años. */
  ano: Catalogo[] | null;
  /** Catálogo de meses. */
  mes: Catalogo[] | null;
  /** Opción seleccionada en el radio parcial. */
  radioParcial: string;
  /** Opción seleccionada en el radio total. */
  radioTotal: string;
  /** Saldo pendiente del dictamen anterior. */
  saldoPendiente: string;
  /** Aprovechamiento total a cargo. */
  aprovechamiento: string;
  /** Disminución aplicada. */
  disminucionAplicada: string;
  /** Compensación aplicada. */
  compensacionAplicada: string;
  /** Saldo pendiente por disminuir. */
  saldoPendienteDisminuir: string;
  /** Cantidad pagada. */
  cantidad: string;
  /** Llave de pago. */
  llaveDePago: string;
  /** Archivos adjuntos. */
  archivo: File[];
  /** Fecha de pago. */
  fechaPago: string;
  /** Fecha de elaboración. */
  fechaElaboracion: string;
  /** Saldo pendiente por compensar. */
  saldoPendienteCompensar: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 32606.
 * @returns Estado inicial de tipo `Solicitud32606State`.
 */
export function createInitialState(): Solicitud32606State {
  return {
    claveFiscalizado: '',
    adace: '',
    tipoDictamen: '',
    rfc: '',
    nombre: '',
    numeroInscripcion: '',
    ano: null,
    mes: null,
    radioParcial: '',
    radioTotal: '',
    saldoPendiente: '',
    aprovechamiento: '',
    disminucionAplicada: '',
    compensacionAplicada: '',
    saldoPendienteDisminuir: '',
    cantidad: '',
    llaveDePago: '',
    archivo: [],
    fechaPago: '',
    fechaElaboracion: '',
    saldoPendienteCompensar: '',
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 32606.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32606', resettable: true })
export class Tramite32606Store extends Store<Solicitud32606State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la clave del fiscalizado.
   * @param claveFiscalizado Nueva clave del fiscalizado.
   */
  public setClaveFiscalizador(claveFiscalizado: string): void {
    this.update((state) => ({ ...state, claveFiscalizado }));
  }

  /**
   * Actualiza el adace.
   * @param adace Nuevo adace.
   */
  public setAdace(adace: string):void {
    this.update((state) => ({ ...state, adace }));
  }

  /**
   * Actualiza el tipo de dictamen.
   * @param tipoDictamen Nuevo tipo de dictamen.
   */
  public setTipoDictamen(tipoDictamen: string): void {
    this.update((state) => ({ ...state, tipoDictamen }));
  }

  /**
   * Actualiza el RFC del fiscalizado.
   * @param rfc Nuevo RFC.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({ ...state, rfc }));
  }

  /**
   * Actualiza el nombre del fiscalizado.
   * @param nombre Nuevo nombre.
   */
  public setNombre(nombre: string):void {
    this.update((state) => ({ ...state, nombre }));
  }

  /**
   * Actualiza el número de inscripción.
   * @param numeroInscripcion Nuevo número de inscripción.
   */
  public setNumeroInscripcion(numeroInscripcion: string): void {
    this.update((state) => ({ ...state, numeroInscripcion }));
  }

  /**
   * Actualiza el catálogo de años.
   * @param ano Nuevo catálogo de años.
   */
  public setAno(ano: Catalogo[] | null): void {
    this.update((state) => ({ ...state, ano }));
  }

  /**
   * Actualiza el catálogo de meses.
   * @param mes Nuevo catálogo de meses.
   */
  public setMes(mes: Catalogo[] | null): void {
    this.update((state) => ({ ...state, mes }));
  }

  /**
   * Actualiza la opción seleccionada en el radio parcial.
   * @param radioPartial Nueva opción seleccionada.
   */
  public setRadioPartial(radioParcial: string): void {
    this.update((state) => ({ ...state, radioParcial }));
  }

  /**
   * Actualiza la opción seleccionada en el radio total.
   * @param radioTotal Nueva opción seleccionada.
   */
  public setRadioTotal(radioTotal: string): void {
    this.update((state) => ({ ...state, radioTotal }));
  }

  /**
   * Actualiza el saldo pendiente del dictamen anterior.
   * @param saldoPendiente Nuevo saldo pendiente.
   */
  public setSaldoPendiente(saldoPendiente: string): void {
    this.update((state) => ({ ...state, saldoPendiente }));
  }

  /**
   * Actualiza el aprovechamiento total a cargo.
   * @param aprovechamiento Nuevo aprovechamiento.
   */
  public setAprovechamiento(aprovechamiento: string): void {
    this.update((state) => ({ ...state, aprovechamiento }));
  }

  /**
   * Actualiza la disminución aplicada.
   * @param disminucionAplicada Nueva disminución aplicada.
   */
  public setDisminucionAplicada(disminucionAplicada: string): void {
    this.update((state) => ({ ...state, disminucionAplicada }));
  }
  /**
   * Actualiza la compensación aplicada.
   * @param compensacionAplicada Nueva compensación aplicada.
   */
  public setCompensacionAplicada(compensacionAplicada: string): void {
    this.update((state) => ({ ...state, compensacionAplicada }));
  }
  /**
   * Actualiza el saldo pendiente por compensar.
   * @param saldoPendienteCompensar Nuevo saldo pendiente por compensar.
   */
  public setSaldoPendienteCompensar(saldoPendienteCompensar: string): void {
    this.update((state) => ({ ...state, saldoPendienteCompensar }));
  }

  /**
   * Actualiza el saldo pendiente por disminuir.
   * @param saldoPendienteDisminuir Nuevo saldo pendiente por disminuir.
   */
  public setSaldoPendienteDisminuir(saldoPendienteDisminuir: string): void {
    this.update((state) => ({ ...state, saldoPendienteDisminuir }));
  }

  /**
   * Actualiza la cantidad pagada.
   * @param cantidad Nueva cantidad pagada.
   */
  public setCantidad(cantidad: string): void {
    this.update((state) => ({ ...state, cantidad }));
  }

  /**
   * Actualiza la llave de pago.
   * @param llaveDePago Nueva llave de pago.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({ ...state, llaveDePago }));
  }

  /**
   * Actualiza los archivos adjuntos.
   * @param archivo Nuevos archivos adjuntos.
   */
  public setArchivo(archivo: File[]): void {
    this.update((state) => ({ ...state, archivo }));
  }

  /**
   * Actualiza la fecha de pago.
   * @param fechaPago Nueva fecha de pago.
   */
  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({ ...state, fechaPago }));
  }

  /**
   * Actualiza la fecha de elaboración.
   * @param fechaElaboracion Nueva fecha de elaboración.
   */
  public setFechaElaboracion(fechaElaboracion: string): void {
    this.update((state) => ({ ...state, fechaElaboracion }));
  }

  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}