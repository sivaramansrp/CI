/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { Programa140101State } from '../../../estados/tramites/tramite140101.store';

/**
 * Interfaz que representa los detalles de la mercancía
 */
interface Mercancia {
  cve_fraccion_arancelaria: string;
  cve_subdivision: string;
  descripcion: string;
  cve_unidad_medida_tarifaria: string;
  cve_pais_origen: string;
  cve_pais_destino: string;
  cantidad_tarifaria: number;
  valor_factura_usd: number;
  precio_unitario: number;
  lote: string;
  fecha_salida: string;
  observaciones: string;
}

/**
 * Interfaz que representa los detalles del productor
 */
interface Productor {
  tipo_persona: boolean;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  razon_social: string;
  descripcion_ubicacion: string;
  rfc: string;
  pais: string;
}

/**
 * Interfaz que representa los detalles del solicitante
 */
interface Solicitante {
  rfc: string;
  nombre: string;
  es_persona_moral: boolean;
  certificado_serial_number: string;
}

/**
 * Interfaz que representa la representación federal
 */
interface RepresentacionFederal {
  cve_entidad_federativa: string;
  cve_unidad_administrativa: string;
}

/**
 * Interfaz que representa la estructura del payload de API para el trámite 140101
 */
export interface CargaUtilDeRespuesta {
  tipoDeSolicitud: string;
  id_solcitud: number;
  cve_regimen: string;
  cve_clasificacion_regimen: string;
  mercancia: Mercancia;
  productor: Productor;
  solicitante: Solicitante;
  representacion_federal: RepresentacionFederal;
  id_programa_seleccionado: string;
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
    // Construir la mercancía con datos de ejemplo o del estado
    const MERCANCIA: Mercancia = {
      cve_fraccion_arancelaria: "72021999",
      cve_subdivision: "7202199901",
      descripcion: "Descripción",
      cve_unidad_medida_tarifaria: "1",
      cve_pais_origen: "USA",
      cve_pais_destino: "MEX",
      cantidad_tarifaria: 12,
      valor_factura_usd: 1.1,
      precio_unitario: 500.75,
      lote: "1",
      fecha_salida: "2025-06-09",
      observaciones: "1"
    };

    // Construir el productor con datos de ejemplo o del estado
    const PRODUCTOR: Productor = {
      tipo_persona: true,
      nombre: "Juan",
      apellido_materno: "López",
      apellido_paterno: "Norte",
      razon_social: "Aceros Norte",
      descripcion_ubicacion: "Calle Acero, No. 123, Col. Centro",
      rfc: "AAL0409235E6",
      pais: "USA"
    };

    // Construir el solicitante con datos de ejemplo o del estado
    const SOLICITANTE: Solicitante = {
      rfc: "AAL0409235E6",
      nombre: "Juan Pérez",
      es_persona_moral: true,
      certificado_serial_number: "string"
    };

    // Construir la representación federal con datos de ejemplo o del estado
    const REPRESENTACION_FEDERAL: RepresentacionFederal = {
      cve_entidad_federativa: "DGO",
      cve_unidad_administrativa: "1016"
    };

    return {
      tipoDeSolicitud: "continuar",
      id_solcitud: 0,
      cve_regimen: "01",
      cve_clasificacion_regimen: "01",
      mercancia: MERCANCIA,
      productor: PRODUCTOR,
      solicitante: SOLICITANTE,
      representacion_federal: REPRESENTACION_FEDERAL,
      id_programa_seleccionado: state.programaACancelar?.idProgramaAutorizado,
      confirmar: state.confirmar || true,
      observaciones: state.solicitudObservaciones || "Observaciones de la solicitud"
    };
  }

}