import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que define la estructura del estado de la solicitud.
 */
export interface Solicitud220501State {
  /**
   * Medio de transporte utilizado.
   */
  medioDeTransporte: number;
  /**
   * Identificación del transporte.
   */
  identificacionTransporte: string;
  /**
   * Indica si es una solicitud de ferros.
   */
  esSolicitudFerros: string | number;
  /**
   * Total de guías asociadas a la solicitud.
   */
  totalGuias: string;
  /**
   * Folio de la solicitud.
   */
  foliodel: string;
  /**
   * Aduana de ingreso.
   */
  aduanaIngreso: number;
  /**
   * Oficina de inspección.
   */
  oficinaInspeccion: number;
  /**
   * Punto de inspección.
   */
  puntoInspeccion: number;
  /**
   * Clave UCON.
   */
  claveUCON: string;
  /**
   * Establecimiento TIF.
   */
  establecimientoTIF: string;
  /**
   * Nombre del solicitante.
   */
  nombre: string;
  /**
   * Número de guía.
   */
  numeroguia: string;
  /**
   * Régimen aduanero.
   */
  regimen: number;
  /**
   * Datos de la mercancía capturados.
   */
  capturaDatosMercancia: string | number;
  /**
   * Coordenadas de la ubicación.
   */
  coordenadas: string;
  /**
   * Tipo de movilización.
   */
  movilizacion: number;
  /**
   * Tipo de transporte.
   */
  transporte: string;
  /**
   * Punto de inspección.
   */
  punto: number;
  /**
   * Nombre de la empresa.
   */
  nombreEmpresa: number;
  /**
   * Indica si está exento de pago.
   */
  exentoPagoNo: number | string;
  /**
   * Justificación del pago.
   */
  justificacion: number | string;
  /**
   * Clave de referencia del pago.
   */
  claveReferencia: string;
  /**
   * Cadena de dependencia.
   */
  cadenaDependencia: string;
  /**
   * Banco asociado al pago.
   */
  banco: number;
  /**
   * Llave de pago.
   */
  llavePago: string;
  /**
   * Importe del pago.
   */
  importePago: string;
  /**
   * Fecha del pago.
   */
  fetchapago: string;
  /**
   * Indica si se debe mostrar el formulario para agregar mercancía.
   */
  mostrarAgregarMercancia: boolean;
  /**
   * Fracción arancelaria de la mercancía.
   */
  fraccionArancelaria: string;
  /**
   * Descripción de la fracción arancelaria.
   */
  descripcionFraccion: string;
  /**
   * Número de identificación de la mercancía (NICO).
   */
  nico: string;
  /**
   * Descripción de la mercancía.
   */
  descripcion: string;
  /**
   * Unidad de medida tarifaria de la mercancía.
   */
  unidaddeMedidaDeUMT: string;
  /**
   * Cantidad total de la unidad de medida tarifaria.
   */
  cantidadTotalUMT: string;
  /**
   * Saldo pendiente de la solicitud.
   */
  saldoPendiente: string;
  /**
   * Saldo a capturar.
   */
  saldoACapturar: string;

  /**
   * Datos de la mercancía capturados en la tabla.
   * @type {string[]}
   */
  mercanciaTablaDatos: string[];
}

/**
 * Función para crear el estado inicial de la solicitud.
 *
 * @returns Estado inicial de la solicitud.
 */
export function crearEstadoInicial(): Solicitud220501State {
  return {
    medioDeTransporte: 0,
    identificacionTransporte: '',
    esSolicitudFerros: '',
    totalGuias: '',
    foliodel: '',
    aduanaIngreso: 0,
    oficinaInspeccion: 0,
    puntoInspeccion: 0,
    claveUCON: '',
    establecimientoTIF: '',
    nombre: '',
    numeroguia: '',
    regimen: 0,
    capturaDatosMercancia: 0,
    coordenadas: '',
    movilizacion: 0,
    transporte: '',
    punto: 0,
    nombreEmpresa: 0,
    exentoPagoNo: 0,
    justificacion: 0,
    claveReferencia: '',
    cadenaDependencia: '',
    banco: 0,
    llavePago: '',
    importePago: '',
    fetchapago: '',
    mostrarAgregarMercancia: false,
    fraccionArancelaria: '',
    descripcionFraccion: '',
    nico: '',
    descripcion: '',
    unidaddeMedidaDeUMT: '',
    cantidadTotalUMT: '',
    saldoPendiente: '',
    saldoACapturar: '',

    mercanciaTablaDatos: []
  };
}

/**
 * Clase que representa el store de la solicitud 220501.
 * Extiende la clase Store de Akita para manejar el estado de la solicitud.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Store para la gestión del estado de la solicitud 220501.
 * Utiliza Akita para el manejo del estado y la reactividad.
 */
@StoreConfig({ name: 'Solicitud220501Store', resettable: true })
/**
 * Clase que representa el store de la solicitud 220501.
 */
export class Solicitud220501Store extends Store<Solicitud220501State> {
  /**
   * Constructor de la clase Solicitud220501Store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Establece el medio de transporte utilizado.
   * @param medioDeTransporte Medio de transporte utilizado.
   * @returns void
   */
  public setMedioDeTransporte(medioDeTransporte: number): void {
    this.update((state) => ({
      ...state,
      medioDeTransporte,
    }));
  }

  /**
   * Establece la identificación del transporte.
   * @param identificacionTransporte Identificación del transporte.
   * @returns void
   */
  public setIdentificacionTransporte(identificacionTransporte: string): void {
    this.update((state) => ({
      ...state,
      identificacionTransporte,
    }));
  }

  /**
   * Establece la esSolicitudFerros.
   * @param esSolicitudFerros Indica si es una solicitud de ferros.
   * @returns void
   */
  public setEsSolicitudFerros(esSolicitudFerros: string | number): void {
    this.update((state) => ({
      ...state,
      esSolicitudFerros,
    }));
  }

  /**
   * Establece total de guías asociadas a la solicitud.
   * @param totalGuias Total de guías asociadas a la solicitud.
   * @returns void
   */
  public setTotalGuias(totalGuias: string): void {
    this.update((state) => ({
      ...state,
      totalGuias,
    }));
  }

  /**
   * Establece Folio de la solicitud.
   * @param foliodel Folio de la solicitud.
   * @returns void
   */
  public setFoliodel(foliodel: string): void {
    this.update((state) => ({
      ...state,
      foliodel,
    }));
  }

  /**
   * Establece la aduana de ingreso.
   * @param aduanaIngreso Aduana de ingreso.
   * @returns void
   */
  public setAduanaIngreso(aduanaIngreso: number): void {
    this.update((state) => ({
      ...state,
      aduanaIngreso,
    }));
  }

  /**
   * Establece la oficina de inspección.
   * @param oficinaInspeccion Oficina de inspección.
   * @returns void
   */
  public setOficinaInspeccion(oficinaInspeccion: number): void {
    this.update((state) => ({
      ...state,
      oficinaInspeccion,
    }));
  }

  /**
   * Establece el punto de inspección.
   * @param puntoInspeccion Punto de inspección.
   * @returns void
   */
  public setPuntoInspeccion(puntoInspeccion: number): void {
    this.update((state) => ({
      ...state,
      puntoInspeccion,
    }));
  }

  /**
   * Establece la clave UCON.
   * @param claveUCON Clave UCON.
   * @returns void
   */
  public setClaveUCON(claveUCON: string): void {
    this.update((state) => ({
      ...state,
      claveUCON,
    }));
  }

  /**
   * Establece el establecimiento TIF.
   * @param establecimientoTIF Establecimiento TIF.
   * @returns void
   */
  public setEstablecimientoTIF(establecimientoTIF: string): void {
    this.update((state) => ({
      ...state,
      establecimientoTIF,
    }));
  }

  /**
   * Establece el nombre del solicitante.
   * @param nombre Nombre del solicitante.
   * @returns void
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Establece el número de guía.
   * @param numeroguia Número de guía.
   * @returns void
   */
  public setNumeroguia(numeroguia: string): void {
    this.update((state) => ({
      ...state,
      numeroguia,
    }));
  }

  /**
   * Establece el régimen aduanero.
   * @param regimen Régimen aduanero.
   * @returns void
   */
  public setRegimen(regimen: number): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Establece los datos de la mercancía capturados.
   * @param capturaDatosMercancia Datos de la mercancía capturados.
   * @returns void
   */
  public setCapturaDatosMercancia(
    capturaDatosMercancia: string | number
  ): void {
    this.update((state) => ({
      ...state,
      capturaDatosMercancia,
    }));
  }

  /**
   * Establece las coordenadas de la ubicación.
   * @param coordenadas Coordenadas de la ubicación.
   * @returns void
   */
  public setCoordenadas(coordenadas: string): void {
    this.update((state) => ({
      ...state,
      coordenadas,
    }));
  }

  /**
   * Establece el tipo de movilización.
   * @param movilizacion Tipo de movilización.
   * @returns void
   */
  public setMovilizacion(movilizacion: number): void {
    this.update((state) => ({
      ...state,
      movilizacion,
    }));
  }

  /**
   * Establece el tipo de transporte.
   * @param transporte Tipo de transporte.
   * @returns void
   */
  public setTransporte(transporte: string): void {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }

  /**
   * Establece el punto de inspección.
   * @param punto Punto de inspección.
   * @returns void
   */
  public setPunto(punto: number): void {
    this.update((state) => ({
      ...state,
      punto,
    }));
  }

  /**
   * Establece el nombre de la empresa.
   * @param nombreEmpresa Nombre de la empresa.
   * @returns void
   */
  public setNombreEmpresa(nombreEmpresa: number): void {
    this.update((state) => ({
      ...state,
      nombreEmpresa,
    }));
  }

  /**
   * Establece si está exento de pago.
   * @param exentoPagoNo Indica si está exento de pago.
   * @returns void
   */
  public setExentoPagoNo(exentoPagoNo: string | number): void {
    this.update((state) => ({
      ...state,
      exentoPagoNo,
    }));
  }

  /**
   * Establece la justificación del pago.
   * @param justificacion Justificación del pago.
   * @returns void
   */
  public setJustificacion(justificacion: number | string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  /**
   * Establece la clave de referencia del pago.
   * @param claveReferencia Clave de referencia del pago.
   * @returns void
   */
  public setClaveReferencia(claveReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveReferencia,
    }));
  }

  /**
   * Establece la cadena de dependencia.
   * @param cadenaDependencia Cadena de dependencia.
   * @returns void
   */
  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * Establece el banco asociado al pago.
   * @param banco Banco asociado al pago.
   * @returns void
   */
  public setBanco(banco: number): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Establece la clave de pago.
   * @param llavePago Clave de pago.
   * @returns void
   */
  public setIlavePago(llavePago: string): void {
    this.update((state) => ({
      ...state,
      llavePago,
    }));
  }

  /**
   * Establece el importe del pago.
   * @param importePago Importe del pago.
   * @returns void
   */
  public setImportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }

  /**
   * Establece la fecha del pago.
   * @param fetchapago Fecha del pago.
   * @returns void
   */
  public setFetchaPago(fetchapago: string): void {
    this.update((state) => ({
      ...state,
      fetchapago,
    }));
  }

  /**
   * Establece si se debe mostrar el formulario para agregar mercancía.
   * @param value Indica si se debe mostrar el formulario para agregar mercancía.
   * @returns void
   */
  public setMostrarAgregarMercancia(value: boolean): void {
    this.update((state) => ({
      ...state,
      mostrarAgregarMercancia: value,
    }));
  }

  /**
   * Establece la fracción arancelaria de la mercancía.
   * @param fraccionArancelaria Fracción arancelaria de la mercancía.
   * @returns void
   */
  public setSaldoACapturar(saldoACapturar: string): void{
    this.update((state) => ({
      ...state,
      saldoACapturar,
    }));
  }

  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSeccion(): void {
    this.reset();
  }

  /**
   * Establece la mercancía en el estado.
   * @param mercanciaTablaDatos Datos de la mercancía.
   * @returns void
   */
  public setMercanciaTablaDatos(mercanciaTablaDatos: string[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }
}
