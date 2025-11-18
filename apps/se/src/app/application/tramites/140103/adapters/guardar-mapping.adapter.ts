/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { Solicitud140103State } from '../estados/store/solicitud140103.store';

/**
 * Interfaz que representa los detalles del solicitante
 */
interface Solicitante {
  rfc: string;
  certificado_serial_number: string;
}

/**
 * Interfaz que representa la estructura del payload de API para el trámite 140102
 */
export interface CargaUtilDeRespuesta {
  tipoDeSolicitud: string;
  id_solcitud: number;
  solicitante: Solicitante;
  parametrosBP: {
    idTramite: string;
  };
  tipoCupo: string;
  unidadMedidaCupo: string;
  idExpedicion: string;
  folioCertificado: string;
  factorConversion: number;
  montoDisponible: number;
  totalDevolver: number;
  totalDevolverMetrosCuadrados: number;
  motivoCancelacion: string;
  inicioVigencia: string;
  finVigencia: string;
  observaciones: string;
  fundamentos: string;
  paises: string;
  regimenCertificado: string;
  nombreProducto: string;
  nombreSubproducto: string;
  mecanismoAsignacion: string;
  certificadosACancelar: Array<{
    idExpedicion: string;
    numFolioOficio: string;
    denominacion: string;
    claveRepresentacionFederal: string;
    representacionFederal: string;
    factorConversion: number;
    montoAsignadoUP: number;
    montoAsignado: number;
    montoDisponible: number;
    montoExpedido: number;
  }>;
  facturasCertificadosCancelar: Array<{
    idFacturaExpedicion: string;
    numFactura: string;
    cantidadAsociada: number;
    cantidadDevolucion: number;
  }>;
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
  static toFormPayload(state: Solicitud140103State): CargaUtilDeRespuesta {
   
    // Construir el solicitante con datos de ejemplo o del estado
    const SOLICITANTE: Solicitante = {
      rfc: 'AAL0409235E6',
      certificado_serial_number: '3082054030820428a00302010'
    };
    return {
      tipoDeSolicitud: "continuar",
      id_solcitud: 0,
      solicitante: SOLICITANTE,
      parametrosBP: {
        idTramite: "140103"
      },
      tipoCupo: "TICU.TPL",
      unidadMedidaCupo: "M2",
      idExpedicion: "12345",
      folioCertificado: "FOL-2024-001",
      factorConversion: 1.5,
      montoDisponible: 125.50,
      totalDevolver: 100.00,
      totalDevolverMetrosCuadrados: 150,
      motivoCancelacion: "Motivo de ejemplo",
      inicioVigencia: "2025-01-01",
      finVigencia: "2025-12-31",
      observaciones: "Observaciones de ejemplo",
      fundamentos: "Fundamento legal",
      paises: "ESTADOS UNIDOS DE AMERICA",
      regimenCertificado: "EXPORTACION",
      nombreProducto: "Producto Ejemplo",
      nombreSubproducto: "Subproducto Ejemplo",
      mecanismoAsignacion: "TIMA.LP",
      certificadosACancelar: [
        {
        idExpedicion: "12345",
        numFolioOficio: "FOL-2024-001",
        denominacion: "Certificado Ejemplo",
        claveRepresentacionFederal: "RF001",
        representacionFederal: "Representacion X",
        factorConversion: 1.5,
        montoAsignadoUP: 100,
        montoAsignado: 150,
        montoDisponible: 125.50,
        montoExpedido: 24.50
        }
        // ...more certificados if needed
      ],
      facturasCertificadosCancelar: [
        {
        idFacturaExpedicion: "987",
        numFactura: "FAC-001-2024",
        cantidadAsociada: 200,
        cantidadDevolucion: 125.50
        }
        // ...more facturas if needed
      ]
    };
  }

}