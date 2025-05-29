import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { CapturarSolicitud, DatosDeLaSolicitud, DatosParaMovilizacionNacional, PagoDeDerechos, Solicitante, TercerosRelacionados, createDatosState } from '../../models/220201/capturar-solicitud.model';
/**
 * @description Akita store for managing zoosanitary application data.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class ZoosanitarioStore extends Store<CapturarSolicitud> {
    constructor() {
        super(createDatosState());
    }

    /**
     * @description Updates the store with applicant information.
     * @param solicitante Applicant data.
     */
    public actualizarSolicitante(solicitante: Solicitante): void {
        this.update(state => ({
            ...state,
            solicitante: solicitante, // No need to wrap in an array
        }));
    }

    /**
     * @description Updates the store with application details.
     * @param datosDeLaSolicitud Application details.
     */
    public actualizarDatosDeLaSolicitud(datosDeLaSolicitud: DatosDeLaSolicitud): void {
        this.update(state => ({
            ...state,
            datosDeLaSolicitud: datosDeLaSolicitud, // No need to wrap in an array
        }));
    }

    /**
     * @description Updates the store with national mobilization data.
     * @param datosParaMovilizacionNacional National mobilization data.
     */
    public actualizarDatosParaMovilizacionNacional(datosParaMovilizacionNacional: DatosParaMovilizacionNacional): void {
        this.update(state => ({
            ...state,
            datosParaMovilizacionNacional: datosParaMovilizacionNacional, // No need to wrap in an array
        }));
    }

    /**
     * @description Updates the store with related third parties information.
     * @param tercerosRelacionados Related third parties information.
     */
    public actualizarTercerosRelacionados(tercerosRelacionados: TercerosRelacionados): void {
        this.update(state => ({
            ...state,
            tercerosRelacionados: tercerosRelacionados, // No need to wrap in an array
        }));
    }

    /**
     * @description Updates the store with payment details.
     * @param pagoDeDerechos Payment details.
     */
    public actualizarPagoDeDerechos(pagoDeDerechos: PagoDeDerechos): void {
        this.update(state => ({
            ...state,
            pagoDeDerechos: pagoDeDerechos, // No need to wrap in an array
        }));
    }

    /**
   * Updates the 'formaValida' field.
   * @param updatedFormaValida The updated boolean values for 'formaValida'.
   */
    public actualizarformaValida(updatedFormaValida: { [key: string]: boolean }): void {
        this.update(state => ({
            ...state,
            validarEnvio: {
                ...state?.validarEnvio,
                ...updatedFormaValida,
            }
        }));
    }
    /**
     * @description Resets the store to its initial state.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}