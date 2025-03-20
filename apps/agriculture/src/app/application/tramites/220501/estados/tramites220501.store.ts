import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que define la estructura del estado de la solicitud.
 */
export interface Solicitud220501State {
  medioDeTransporte: number;
  identificacionTransporte: string;
  esSolicitudFerros: string | number;
  totalGuias: string;
  foliodel: string;
  aduanaIngreso: number;
  oficinaInspeccion: number;
  puntoInspeccion: number;
  claveUCON: string;
  establecimientoTIF: string;
  nombre: string;
  numeroguia: string;
  regimen: number;
  capturaDatosMercancia: string | number;
  coordenadas: string;
  movilizacion: number;
  transporte: string;
  punto: number;
  nombreEmpresa: number;
  exentoPagoNo: number | string;
  justificacion: number | string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: number;
  llavePago: string;
  importePago: string;
  fetchapago: string;
  mostrarAgregarMercancia: boolean;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
  descripcion: string;
  unidaddeMedidaDeUMT: string;
  cantidadTotalUMT: string;
  saldoPendiente: string;
  saldoACapturar: string;
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
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud220501Store', resettable: true })
export class Solicitud220501Store extends Store<Solicitud220501State> {
  /**
   * Constructor de la clase Solicitud220501Store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  public setMedioDeTransporte(medioDeTransporte: number): void {
    this.update((state) => ({
      ...state,
      medioDeTransporte,
    }));
  }

  public setIdentificacionTransporte(identificacionTransporte: string): void {
    this.update((state) => ({
      ...state,
      identificacionTransporte,
    }));
  }

  public setEsSolicitudFerros(esSolicitudFerros: string | number): void {
    this.update((state) => ({
      ...state,
      esSolicitudFerros,
    }));
  }

  public setTotalGuias(totalGuias: string): void {
    this.update((state) => ({
      ...state,
      totalGuias,
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

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
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

  public setPunto(punto: number): void {
    this.update((state) => ({
      ...state,
      punto,
    }));
  }

  public setNombreEmpresa(nombreEmpresa: number): void {
    this.update((state) => ({
      ...state,
      nombreEmpresa,
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

  public setMostrarAgregarMercancia(value: boolean): void {
    this.update((state) => ({
      ...state,
      mostrarAgregarMercancia: value,
    }));
  }

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
}
