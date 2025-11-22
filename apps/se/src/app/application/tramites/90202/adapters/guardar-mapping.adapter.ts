/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { ProsecState } from '../estados/autorizacion-prosec.store';

@Injectable({
    providedIn: 'root'
})
export class GuardarMappingAdapter {
    /**
     * Convierte del estado de Akita al formato de payload de API usando las mismas claves
     * @param state El estado actual de Akita
     * @returns Payload formateado para la API
     */

    static toFormPayload(state: ProsecState): unknown {
        return {
            id_solicitud: state.idSolicitud ?? 0,
            modalidad: state.modalidad ?? '',
            representacion_federal: state.RepresentacionFederal ?? '',
            actividad_productiva: state.ActividadProductiva ?? '',
            sector: state.sector ?? '',
            fraccion_arancelaria: state.Fraccion_arancelaria ?? '',
            contribuyentes: state.contribuyentes ?? '',
            plantas: state.prosecDatos?.map(item => ({
                razonSocial: item.razonSocial ?? '',
                registroFederalDeContribuyentes: item.registroFederalDeContribuyentes ?? '',
                domicilioFiscalDelSolicitante: item.domicilioFiscalDelSolicitante ?? '',
                calle: item.calle ?? '',
                numeroExterior: item.numeroExterior ?? '',
                numeroInterior: item.numeroInterior ?? '',
                codigoPostal: item.codigoPostal ?? '',
                colonia: item.colonia ?? '',
                municipioOAlcaldia: item.municipioOAlcaldia ?? '',
                pais: item.pais ?? '',
                registro: item.registro ?? ''
            })) ?? [],
            sectores: state.sectorDatos?.map(item => ({
                sectorLista: item.sectorLista ?? '',
                sectorClave: item.sectorClave ?? ''
            })) ?? [],
            fraccionSeleccionada: [
                {
                    fraccionCompuesta: state.Fraccion_arancelaria ?? '',
                    cveSector: state.sector ?? ''
                }
            ]
        };
    }
}