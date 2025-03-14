import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 130118
 * @returns Solicitud130118
 */
export interface Solicitud130118State {
  regimenMercancia: string;
  clasifiRegimen: string;
  valueTA: string;
  fraccionArancelaria: string;
  nico: string;
  unidadMedidaTarifaria: string;
  cantidadTarifaria: number | null;
  valorFacturaUSD: number | null;
  precioUnitarioUSD: number | null;
  paisOrigen: string;
  paisDestino: string;
  lote: string;
  fechaSalida: string;
  observaciones: string;
  observacionMerc: string;
  tipoPersona: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial: string;
  molino: string;
  domicilio: string;
  estado: string;
  representacionFederal: string;
}

export function createInitialState(): Solicitud130118State {
  return {
    regimenMercancia: '',
    clasifiRegimen: '',
    valueTA: '',
    fraccionArancelaria: '',
    nico: '',
    unidadMedidaTarifaria: '',
    cantidadTarifaria: null,
    valorFacturaUSD: null,
    precioUnitarioUSD: null,
    paisOrigen: '',
    paisDestino: '',
    lote: '',
    fechaSalida: '',
    observaciones: '',
    observacionMerc: '',
    tipoPersona: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    razonSocial: '',
    molino: '',
    domicilio: '',
    estado: '',
    representacionFederal: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130118', resettable: true })
export class Tramite130118Store extends Store<Solicitud130118State> {
  constructor() {
    super(createInitialState());
  }

  public setRegimenMercancia(regimenMercancia: string): void {
    this.update((state) => ({
      ...state,
      regimenMercancia,
    }));
  }

  public setClasifiRegimen(clasifiRegimen: string): void {
    this.update((state) => ({
      ...state,
      clasifiRegimen,
    }));
  }

  public setValueTA(valueTA: string): void {
    this.update((state) => ({
      ...state,
      valueTA
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public setUnidadMedidaTarifaria(unidadMedidaTarifaria: string): void {
    this.update((state) => ({
      ...state,
      unidadMedidaTarifaria,
    }));
  }

  public setCantidadTarifaria(cantidadTarifaria: number): void {
    this.update((state) => ({
      ...state,
      cantidadTarifaria,
    }));
  }

  public setValorFacturaUSD(valorFacturaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  public setPrecioUnitarioUSD(precioUnitarioUSD: number): void {
    this.update((state) => ({
      ...state,
      precioUnitarioUSD,
    }));
  }

  public setPaisOrigen(paisOrigen: string): void {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }

  public setPaisDestino(paisDestino: string): void {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }  

  public setLote(lote: string): void {
    this.update((state) => ({
      ...state,
      lote,
    }));
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  public setObservacionMerc(observacionMerc: string): void {
    this.update((state) => ({
      ...state,
      observacionMerc,
    }));
  }

  public setTipoPersona(tipoPersona: string): void {
    this.update((state) => ({
      ...state,
      tipoPersona,
    }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  public setDomicilio(domicilio: string): void {
    this.update((state) => ({
      ...state,
      domicilio,
    }));
  }

  public setMolino(molino: string): void {
    this.update((state) => ({
      ...state,
      molino,
    }));
  }

  public setEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }
}
