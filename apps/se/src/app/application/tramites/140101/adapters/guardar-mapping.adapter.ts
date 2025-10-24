/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { Programa140101State } from '../../../estados/tramites/tramite140101.store';

/**
 * Interfaz que representa los detalles del solicitante
 */
interface Solicitante {
  rfc: string;
  certificado_serial_number: string;
}

/**
 * Interfaz que representa la estructura del payload de API para el trámite 140101
 */
export interface CargaUtilDeRespuesta {
  tipoDeSolicitud: string;
  id_solcitud: number;
  id_programa_seleccionado: string;
  solicitante: Solicitante;
  confirmar: boolean;
  observaciones: string;
}

@Injectable({
  providedIn: 'root'
})
export class GuardarMappingAdapter {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  static toFormPayload(state: Programa140101State): CargaUtilDeRespuesta {
   
    // Construir el solicitante con datos de ejemplo o del estado
    const SOLICITANTE: Solicitante = {
      rfc: 'AAL0409235E6',
      certificado_serial_number: '3082054030820428a00302010'
    };


    return {
      tipoDeSolicitud: "continuar",
      id_solcitud: 0,
      solicitante: SOLICITANTE,
      id_programa_seleccionado: state.programaACancelar?.idProgramaAutorizado,
      confirmar: state.confirmar,
      observaciones: state.solicitudObservaciones || "",
    };
  }

}