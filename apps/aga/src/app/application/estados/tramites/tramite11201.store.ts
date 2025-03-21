import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { DatosSolicitante } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';

/**
 * Creacion del estado inicial para la interfaz de tramite 11201
 * @returns Solicitud11201
 */

export interface Solicitud11201State {
  menuDesplegable: string;
  datosSolicitante: DatosSolicitante
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
  datosDelContenedor: [];
  tipoBusqueda: string;
  aduana: string;
  fechaIngreso: string;
  inicialesContenedor: string;
  numeroContenedor: string;
  digitoDeControl: string;
  contenedores: string;
  aduanaMenuDesplegable: string;
  casillaDeVerificacionindividual: boolean[];
  numeroManifiesta: number;
  fechaDeIngreso: string;
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
    menuDesplegable: '',
    datosSolicitante: {
      rfc: "",
      denominacion: "",
      actividadEconomica: "",
      correoElectronico: ""
    },
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
    aduanaMenuDesplegable: '',
    casillaDeVerificacionindividual: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    numeroManifiesta: 0,
    fechaDeIngreso: '',
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
   * @param casillaDeVerificacionindividual - El tipo de solicitud que se va a guardar.
   */
  public setCasillaDeVerificacionindividual(casillaDeVerificacionindividual: []): void {
    this.update((state) => ({
      ...state,
      casillaDeVerificacionindividual,
    }));
  }

  public setNumeroManifiesta(numeroManifiesta: number): void {
    this.update((state) => ({
      ...state,
      numeroManifiesta,
    }));
  }

  public setMenuDesplegable(menuDesplegable: string): void {
    this.update((state) => ({
      ...state,
      menuDesplegable,
    }));
  }

  public setAduanaMenuDesplegable(aduanaMenuDesplegable: string): void {
    this.update((state) => ({
      ...state,
      aduanaMenuDesplegable,
    }));
  }

  public setFechaDeIngreso(fechaDeIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaDeIngreso,
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

  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante
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

  public setLinea(linea: string): void {
    this.update((state) => ({
      ...state,
      linea,
    }));
  }


  public setLineaCheckbox(lineaCheckbox: string): void {
    this.update((state) => ({
      ...state,
      lineaCheckbox,
    }));
  }

  public setMonto(monto: string): void {
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