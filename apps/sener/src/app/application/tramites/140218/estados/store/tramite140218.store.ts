import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @comdoc
 * Establece el valor del "régimen" en el estado de la tienda.
 *
 * @param regimen - El nuevo valor de régimen que se asignará al estado.
 */
export interface DatosSolicitudState {
  [key: string]: any;
}

/**
 * @comdoc
 * Establece el estado inicial para la tienda de datos de solicitud.
 *
 * @returns El estado inicial de DatosSolicitudState con valores vacíos.
 */
export function createInitialState(): DatosSolicitudState {
  return {
    folioTramite: '', // Número de folio del trámite
    tipoSolicitud: '', // Tipo de solicitud
    regimen: '', // Régimen asociado
    clasificacionRegimen: '', // Clasificación del régimen
    periodoVigencia: '', // Periodo de vigencia
    unidadMedida: '', // Unidad de medida
    fraccionArancelaria: '', // Fracción arancelaria
    cantidadAutorizada: '', // Cantidad autorizada
    valorAutorizado: '', // Valor autorizado
    nico: '', // Número de Identificación Comercial (NICO)
    descripcionNico: '', // Descripción del NICO
    acotacion: '', // Acotación
    permisoDesde: '', // Fecha de inicio del permiso
    permisoHasty: '', // Fecha de fin del permiso
    motivoRenuncia: '' // Motivo de renuncia
  };
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({ name: 'tramite140218', resettable: true })

export class Tramite140218Store extends Store<DatosSolicitudState> {

  /**
 * @comdoc
 * Sets the value of "régimen" in the store state.
 *
 * @param regimen - El nuevo valor de régimen que se asignará al estado.
 */
  constructor() {
    super(createInitialState());
  }
  /**
   * @comdoc
   * Establece dinámicamente el valor de un campo en el estado de la tienda.
   *
   * @param fieldName - El nombre del campo que se actualizará en el estado.
   * @param value - El nuevo valor que se asignará al campo especificado.
   */
  public setDynamicFieldValue(fieldName: string, value: any): void {
    this.update((state) => ({
      ...state,
      [fieldName]: value,
    }));
  }
}

