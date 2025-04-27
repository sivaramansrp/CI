import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que define la estructura del estado de la solicitud.
 */
export interface Solicitud220503State {
  certificadosAutorizados: number;
  horaDeInspeccion: number;
  aduanaDeIngreso: number;
  sanidadAgropecuaria: number;
  puntoDeInspeccion: number;
  fechaDeInspeccion: string;
  nombre: string;
  primerapellido: string;
  segundoapellido: string;
  mercancia: string;
  tipocontenedor: number;
  transporteIdMedio: number;
  identificacionTransporte: string;
  esSolicitudFerros: string | number;
  totalDeGuiasAmparadas: string;
  fetchapago: string;
  aduanaIngreso: number;
  oficinaInspeccion: number;
  puntoInspeccion: number;
  claveUCON: string;
  establecimientoTIF: string;
  numeroguia: string;
  regimen: number;
  capturaDatosMercancia: string | number;
  coordenadas: string;
  movilizacion: number;
  transporte: string;
  punto: number;
  nombreEmpresa: number;
  foliodel: string;
  exentoPagoNo: number | string;
  justificacion: number | string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: number;
  llavePago: string;
  importePago: string;
}

/**
 * Función para crear el estado inicial de la solicitud.
 * 
 * @returns Estado inicial de la solicitud.
 */
export function crearEstadoInicial(): Solicitud220503State {
  return {
    certificadosAutorizados: 0,
    horaDeInspeccion: 0,
    aduanaDeIngreso: 0,
    sanidadAgropecuaria: 0,
    puntoDeInspeccion: 0,
    fechaDeInspeccion: '',
    nombre: '',
    primerapellido: '',
    segundoapellido: '',
    mercancia: '',
    tipocontenedor: 0,
    transporteIdMedio: 0,
    identificacionTransporte: '',
    esSolicitudFerros: '',
    totalDeGuiasAmparadas: '',
    foliodel: '',
    aduanaIngreso: 0,
    oficinaInspeccion: 0,
    puntoInspeccion: 0,
    claveUCON: '',
    establecimientoTIF: '',
    numeroguia: '',
    regimen: 0,
    capturaDatosMercancia: 0,
    coordenadas: '',
    movilizacion: 0,
    transporte: '',
    punto: 0,
    nombreEmpresa: 0,
    fetchapago: '',
    exentoPagoNo: 0,
    justificacion: 0,
    claveReferencia: '',
    cadenaDependencia: '',
    banco: 0,
    llavePago: '',
    importePago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud220503Store', resettable: true })
export class Solicitud220503Store extends Store<Solicitud220503State> {
  
  /**
   * Constructor de la clase Solicitud220503Store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza el número de certificados autorizados en el estado.
   * 
   * @param certificadosAutorizados - Cantidad de certificados autorizados.
   */
  public setCertificadosAutorizados(certificadosAutorizados: number): void {
    this.update((state) => ({
      ...state,
      certificadosAutorizados,
    }));
  }

  /**
   * Actualiza la hora de inspección en el estado.
   * 
   * @param horaDeInspeccion - Hora en la que se realizará la inspección.
   */
  public setHoraDeInspeccion(horaDeInspeccion: number): void {
    this.update((state) => ({
      ...state,
      horaDeInspeccion,
    }));
  }

  /**
   * Actualiza el código de la aduana de ingreso en el estado.
   * 
   * @param aduanaDeIngreso - Código de la aduana de ingreso.
   */
  public setAduanaDeIngreso(aduanaDeIngreso: number): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngreso,
    }));
  }

  /**
   * Actualiza el valor de sanidad agropecuaria en el estado.
   * 
   * @param sanidadAgropecuaria - Valor de sanidad agropecuaria.
   */
  public setSanidadAgropecuaria(sanidadAgropecuaria: number): void {
    this.update((state) => ({
      ...state,
      sanidadAgropecuaria,
    }));
  }

  /**
   * Actualiza el punto de inspección en el estado.
   * 
   * @param puntoDeInspeccion - Código del punto de inspección.
   */
  public setPuntoDeInspeccion(puntoDeInspeccion: number): void {
    this.update((state) => ({
      ...state,
      puntoDeInspeccion,
    }));
  }

  /**
   * Actualiza la fecha de inspección en el estado.
   * 
   * @param fechaDeInspeccion - Fecha en la que se realizará la inspección.
   */
  public setFechaDeInspeccion(fechaDeInspeccion: string): void {
    this.update((state) => ({
      ...state,
      fechaDeInspeccion,
    }));
  }

  /**
   * Actualiza el nombre del solicitante en el estado.
   * 
   * @param nombre - Nombre del solicitante.
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Actualiza el primer apellido del solicitante en el estado.
   * 
   * @param primerapellido - Primer apellido del solicitante.
   */
  public setPrimerapellido(primerapellido: string): void {
    this.update((state) => ({
      ...state,
      primerapellido,
    }));
  }

  /**
   * Actualiza el segundo apellido del solicitante en el estado.
   * 
   * @param segundoapellido - Segundo apellido del solicitante.
   */
  public setSegundoapellido(segundoapellido: string): void {
    this.update((state) => ({
      ...state,
      segundoapellido,
    }));
  }

  /**
   * Actualiza la mercancía declarada en el estado.
   * 
   * @param mercancia - Descripción de la mercancía.
   */
  public setMercancia(mercancia: string): void {
    this.update((state) => ({
      ...state,
      mercancia,
    }));
  }

  /**
   * Actualiza el tipo de contenedor en el estado.
   * 
   * @param tipocontenedor - Código del tipo de contenedor.
   */
  public setTipocontenedor(tipocontenedor: number): void {
    this.update((state) => ({
      ...state,
      tipocontenedor,
    }));
  }

  /**
   * Actualiza el medio de transporte en el estado.
   * 
   * @param transporteIdMedio - Identificador del medio de transporte.
   */
  public setTransporteIdMedio(transporteIdMedio: number): void {
    this.update((state) => ({
      ...state,
      transporteIdMedio,
    }));
  }

  /**
   * Actualiza la identificación del transporte en el estado.
   * 
   * @param identificacionTransporte - Identificación del transporte.
   */
  public setIdentificacionTransporte(identificacionTransporte: string): void {
    this.update((state) => ({
      ...state,
      identificacionTransporte,
    }));
  }

  /**
   * Actualiza si la solicitud es ferroviaria en el estado.
   * 
   * @param esSolicitudFerros - Indica si la solicitud está relacionada con transporte ferroviario.
   */
  public setEsSolicitudFerros(esSolicitudFerros: string | number): void {
    this.update((state) => ({
      ...state,
      esSolicitudFerros,
    }));
  }

  /**
   * Actualiza el total de guías amparadas en el estado.
   * 
   * @param totalDeGuiasAmparadas - Cantidad total de guías amparadas.
   */
  public setTotalDeGuiasAmparadas(totalDeGuiasAmparadas: string): void {
    this.update((state) => ({
      ...state,
      totalDeGuiasAmparadas,
    }));
  }

  
  public setFoliodel(foliodel: string): void {
    this.update((state) => ({
      ...state,
      foliodel,
    }));
  }

  public setAduanaIngreso(aduanaIngreso: number): void {
    this.update((state) => ({
      ...state,
      aduanaIngreso,
    }));
  }

  public setOficinaInspeccion(oficinaInspeccion: number): void {
    this.update((state) => ({
      ...state,
      oficinaInspeccion,
    }));
  }

  public setPuntoInspeccion(puntoInspeccion: number): void {
    this.update((state) => ({
      ...state,
      puntoInspeccion,
    }));
  }

  public setClaveUCON(claveUCON: string): void {
    this.update((state) => ({
      ...state,
      claveUCON,
    }));
  }

  public setEstablecimientoTIF(establecimientoTIF: string): void {
    this.update((state) => ({
      ...state,
      establecimientoTIF,
    }));
  }

  public setNumeroguia(numeroguia: string): void {
    this.update((state) => ({
      ...state,
      numeroguia,
    }));
  }

  public setRegimen(regimen: number): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setCapturaDatosMercancia(
    capturaDatosMercancia: string | number
  ): void {
    this.update((state) => ({
      ...state,
      capturaDatosMercancia,
    }));
  }

  public setCoordenadas(coordenadas: string): void {
    this.update((state) => ({
      ...state,
      coordenadas,
    }));
  }

  public setMovilizacion(movilizacion: number): void {
    this.update((state) => ({
      ...state,
      movilizacion,
    }));
  }

  public setTransporte(transporte: string): void {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }

  public setNombreEmpresa(nombreEmpresa: number): void {
    this.update((state) => ({
      ...state,
      nombreEmpresa,
    }));
  }

  public setPunto(punto: number): void {
    this.update((state) => ({
      ...state,
      punto,
    }));
  }

  
  public setExentoPagoNo(exentoPagoNo: string | number): void {
    this.update((state) => ({
      ...state,
      exentoPagoNo,
    }));
  }

  public setJustificacion(justificacion: number | string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  public setClaveReferencia(claveReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveReferencia,
    }));
  }

  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  public setBanco(banco: number): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  public setIlavePago(llavePago: string): void {
    this.update((state) => ({
      ...state,
      llavePago,
    }));
  }

  public setImportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }

  public setFetchaPago(fetchapago: string): void {
    this.update((state) => ({
      ...state,
      fetchapago,
    }));
  }

  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
