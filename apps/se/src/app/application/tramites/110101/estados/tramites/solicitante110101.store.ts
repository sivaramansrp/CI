import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * **Estado del formulario de solicitante**
 *
 * Representa la estructura del estado para los datos del solicitante en el trámite 110101.
 */
export interface Solicitante110101State {
  /** RFC del solicitante. */
  rfc: string;
  /** denominacion del solicitante. */
  denominacion: string;
  /** Actividad económica del solicitante. */
  actividadEconomica: string;
  /** Correo electrónico del solicitante. */
  correoElectronico: string;
  /** País del solicitante. */
  pais: string;
  /** Denominación o razón social del solicitante. */
  tratado: string;
  /** Actividad económica principal del solicitante. */
  origen: string;
  /** Criterio Instancia de uruguay. */
  criterio: string;
  /** nombreComercial del solicitante. */
  nombreComercial: string;
  /** Nombre en inglés del solicitante. */
  nombreIngles: string;
  /** Fracción arancelaria del producto o servicio. */
  fraccionArancelaria: string;
  /** Descripción del producto o servicio. */
  descripcion: string;
  /** Valor de la transacción en moneda local. */
  valorTransaccion: string;
  /** Entidad a la que pertenece el solicitante. */
  entidad: string;
  /** Representación legal o administrativa del solicitante. */
  representacion: string;
    /** Método de separación contable seleccionado por el solicitante. */
  metodoSeparacion: boolean;
    /** Opción de exportador autorizado seleccionada por el solicitante. */
  exportadorAutorizado: boolean;
    /** Información seleccionada en los radios del formulario por el solicitante. */
  informacionRadios: string;
}


/**
 * **Función para crear el estado inicial del solicitante**
 *
 * Esta función devuelve un estado inicial vacío para los datos del solicitante en el trámite 110101.
 * Se utiliza para inicializar el store con valores predeterminados.
 *
 * @returns {Solicitante110101State} Estado inicial del solicitante con valores vacíos.
 */
export function createSolicitanteInitialState(): Solicitante110101State {
  return {
    rfc: '',
    denominacion: '',
    actividadEconomica: '',
    correoElectronico: '',
    pais: '',
    tratado: '',
    origen: '',
    criterio: '',
    nombreComercial: '',
    nombreIngles: '',
    fraccionArancelaria: '',
    descripcion: '',
    valorTransaccion: '',
    entidad: '',
    representacion: '',
    metodoSeparacion: false,
    exportadorAutorizado: false,
    informacionRadios: '' 
  };
}


/**
 * Store para gestionar el estado de los datos del solicitante.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitante', resettable: true })
export class Tramite110101Store extends Store<Solicitante110101State> {
   /**
   * **Constructor de la tienda**
   *
   * - Inicializa el estado de la tienda con los valores predeterminados definidos en `createSolicitanteInitialState()`.
   * - Garantiza que la tienda comience con una estructura de datos válida para el solicitante.
   *
   * @constructor
   */
   constructor() {
    super(createSolicitanteInitialState());
  }

  /**
   * Actualiza el estado con el RFC especificado.
   * @param rfc - El RFC a establecer en el estado.
   */
  public setRfc(rfc: string):void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Actualiza el estado con la denominación especificada.
   * @param denominacion - La denominación a establecer en el estado.
   */
  public setDenominacion(denominacion: string):void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Actualiza el estado con la actividad económica especificada.
   * @param actividadEconomica - La actividad económica a establecer en el estado.
   */

  public setActividadEconomica(actividadEconomica: string):void {
    this.update((state) => ({
      ...state,
      actividadEconomica,
    })); 
  }

  /**
   * Actualiza el estado con el correo electrónico especificado.
   * @param correoElectronico - El correo electrónico a establecer en el estado.
   */ 
  public setCorreoElectronico(correoElectronico: string):void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param pais - El país a establecer en el estado.
   */
  public setPais(pais: string):void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
   * Actualiza el estado del criterio instacia.
   * @param criterio - El país a establecer en el estado.
   */
  public setCriterioInstancia(criterio: string):void {
    this.update((state) => ({
      ...state,
      criterio,
    }));
  }


  /**
   * Actualiza el estado con el país especificado.
   * @param tratado - El país a establecer en el estado.
   */
  public setTratado(tratado: string):void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param origen - El país a establecer en el estado.
   */
  public setOrigen(origen: string):void {
    this.update((state) => ({
      ...state,
      origen,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param nombreComercial - El país a establecer en el estado.
   */
  public setNombreComercial(nombreComercial: string):void {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param nombreIngles - El país a establecer en el estado.
   */
  public setNombreIngles(nombreIngles: string):void {
    this.update((state) => ({
      ...state,
      nombreIngles,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param fraccionArancelaria - El país a establecer en el estado.
   */
  public setFraccionArancelaria(fraccionArancelaria: string):void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param descripcion - El país a establecer en el estado.
   */
  public setDescripcion(descripcion: string):void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param valorTransaccion - El país a establecer en el estado.
   */
  public setValorTransaccion(valorTransaccion: string):void {
    this.update((state) => ({
      ...state,
      valorTransaccion,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param entidad - El país a establecer en el estado.
   */
  public setEntidad(entidad: string):void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param representacion - El país a establecer en el estado.
   */
  public setRepresentacion(representacion: string):void {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }

  /**
   * Actualiza el estado con el valor de método de separación especificado.
   * @param metodoSeparacion - El valor booleano a establecer en el estado.
   */
  public setMetodoSeparacion(metodoSeparacion: boolean): void {
    this.update((state) => ({
      ...state,
      metodoSeparacion,
    }));
  }

  /**
   * Actualiza el estado con el valor de exportador autorizado especificado.
   * @param exportadorAutorizado - El valor booleano a establecer en el estado para la opción de exportador autorizado.
   */
  public setExportadorAutorizado(exportadorAutorizado: boolean): void {
    this.update((state) => ({
      ...state,
      exportadorAutorizado,
    }));
  }

  /**
   * Actualiza el estado con el valor seleccionado en los radios del formulario.
   * @param informacionRadios - El valor seleccionado a establecer en el estado para la información de los radios.
   */
  public setInformacionRadios(informacionRadios: string): void {
    this.update((state) => ({
      ...state,
      informacionRadios,
    }));
  }

}
