import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 11201
 * @returns Solicitud11201
 */

export interface Solicitud11201State {
  menúDesplegable: string;
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
  datosDelContenedor: [];
  tipoBusqueda: string;
  aduana: string;
  fechaIngreso: string;
  Vigencia: string;
  inicialesContenedor: string;
  numeroContenedor: string;
  digitoDeControl: string;
  contenedores: string;
  aduanaMenúDesplegable: string;
  individualCaja: boolean[];
  numManifiesto: number;
  fechaDeIngreso: string;
  commonCaja: boolean;
  archivoSeleccionado: string;
    /**
   * linea
   * @type {string}
   */
    linea: string;

      /**
   * linea checkbox
   * @type {string}
   */
  lineaCheckbox: string;

  monto: string;

}

export function createInitialState(): Solicitud11201State {
  return {
    menúDesplegable: '',
    rfc: 'AAL0409235E6',
    denominacion: 'AGRICOLA ALPE S DE RL DE CV',
    actividadEconomica: 'Siembra, cultivo y cosecha de papa',
    correoElectronico: 'vucem2.5@hotmail.com',
    datosDelContenedor: [],
    tipoBusqueda: '',
    aduana: '',
    inicialesContenedor: '',
    numeroContenedor: '',
    digitoDeControl: '',
    contenedores: '',
    fechaIngreso: '',
    Vigencia:'',
    aduanaMenúDesplegable: '',
    individualCaja: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    numManifiesto: 0,
    fechaDeIngreso: '',
    commonCaja: false,
    archivoSeleccionado: '',
    linea: '',
    lineaCheckbox: '',
    monto: '',

  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite11201', resettable: true })
export class Tramite11201Store extends Store<Solicitud11201State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda el tipo de solicitud en el estado.
   *
   * @param individualCaja - El tipo de solicitud que se va a guardar.
   */
  public setIndividualCaja(individualCaja: []): void {
    this.update((state) => ({
      ...state,
      individualCaja,
    }));
  }

  public setNumManifiesto(numManifiesto: number): void {
    this.update((state) => ({
      ...state,
      numManifiesto,
    }));
  }

  public setMenúDesplegable(menúDesplegable: string): void {
    this.update((state) => ({
      ...state,
      menúDesplegable,
    }));
  }

  public setAduanaMenúDesplegable(aduanaMenúDesplegable: string): void {
    this.update((state) => ({
      ...state,
      aduanaMenúDesplegable,
    }));
  }

  public setFechaDeIngreso(fechaDeIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaDeIngreso,
    }));
  }

  public setVigencia(Vigencia: string): void {
    this.update((state) => ({
      ...state,
      Vigencia,
    }));
  }

  public setCommonCaja(commonCaja: boolean): void {
    this.update((state) => ({
      ...state,
      commonCaja,
    }));
  }

  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc
    }));
  }
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion
    }));
  }

  public setActividadEconomica(actividadEconomica: string): void {
    this.update((state) => ({
      ...state,
      actividadEconomica
    }));
  }

  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico
    }));
  }
  public setDelContenedor(datosDelContenedor: []): void {
    this.update((state) => ({
      ...state,
      datosDelContenedor
    }));
  }
  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda
    }));
  }
  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana
    }));
  }
  public setFechaIngreso(fechaIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaIngreso
    }));
  }
  public setInicialesContenedor(inicialesContenedor: string): void {
    this.update((state) => ({
      ...state,
      inicialesContenedor
    }));
  }
  public setNumeroContenedor(numeroContenedor: string): void {
    this.update((state) => ({
      ...state,
      numeroContenedor
    }));
  }
  public setDigitoDeControl(digitoDeControl: string): void {
    this.update((state) => ({
      ...state,
      digitoDeControl
    }));
  }
  public setContenedores(contenedores: string): void {
    this.update((state) => ({
      ...state,
      contenedores
    }));
  }
  public setArchivoSeleccionado(archivoSeleccionado: string): void {
    this.update((state) => ({
      ...state,
      archivoSeleccionado
    }));
  }

  public setLinea(linea: string) {
    this.update((state) => ({
      ...state,
      linea,
    }));
  }


  public setLineaCheckbox(lineaCheckbox: string) {
    this.update((state) => ({
      ...state,
      lineaCheckbox,
    }));
  }

    public setMonto(monto: string) {
      this.update((state) => ({
        ...state,
        monto,
      }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}