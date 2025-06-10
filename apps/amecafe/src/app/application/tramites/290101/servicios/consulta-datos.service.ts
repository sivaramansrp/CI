import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TramiteState } from '../estados/tramite290101.store';
import { TramiteStore } from '../estados/tramite290101.store'; 

@Injectable({
  providedIn: 'root'
})
export class ConsultaDatosService {
  constructor(private http: HttpClient, private readonly tramiteStore: TramiteStore, private readonly seccionStore: SeccionLibStore ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
   }

     /**
   * @description Actualiza los datos de la solicitud en el store.
   * @param solicitud Datos de la solicitud.
   */
  updateSolicitud(solicitud: TramiteState['SolicitudState']): void {
    this.tramiteStore.setSolicitudTramite(solicitud);
  }

  /**
   * @description Actualiza los datos generales internos en el store.
   * @param regionForma Datos generales internos.
   */
  updateRegion(regionForma: TramiteState['RegionFormatState']): void {
    this.tramiteStore.setRegionTramite(regionForma);
  }

  /**
   * @description Actualiza los datos internos de pago de derechos en el store.
   * @param beneficiosForma Datos internos de pago de derechos.
   */
  updateBeneficios(beneficiosForma: TramiteState['BeneficiosFormaState']): void {
    this.tramiteStore.setBeneficiosTramite(beneficiosForma);
  }

  /**
   * @description Actualiza los datos de pago de derechos en el store.
   * @param bodegasForma Datos de pago de derechos.
   */
  updateBodegas(bodegasForma: TramiteState['BodegasFormaState']): void {
    this.tramiteStore.setBodegasTramite(bodegasForma);
  }

  /**
   * @description Actualiza los datos de pago de derechos en el store.
   * @param cafeExport Datos de pago de derechos.
   */
  updateCafeExport(cafeExport: TramiteState['CafeExportFormState']): void {
    this.tramiteStore.setCafExportTramite(cafeExport);
  }

    /**
   * @description Actualiza el estado completo del formulario en el store.
   * @param {TramiteState} DATOS - Objeto con todos los datos del formulario.
   */
  actualizarEstadoFormulario(DATOS: TramiteState): void {
    this.tramiteStore.setSolicitudTramite(DATOS.SolicitudState);
    this.tramiteStore.setRegionTramite(DATOS.RegionFormatState);
    this.tramiteStore.setBeneficiosTramite(DATOS.BeneficiosFormaState);
    this.tramiteStore.setBodegasTramite(DATOS.BodegasFormaState);
    this.tramiteStore.setCafExportTramite(DATOS.CafeExportFormState);
    this.tramiteStore.setRegionesTabla(DATOS.regionesTabla);
    this.tramiteStore.setBeneficiosTabla(DATOS.beneficiosTabla);
    this.tramiteStore.setBodegasTabla(DATOS.bodegasTabla);
  }

  /**
   * Obtiene los datos de la solicitud desde un archivo JSON.
   * @returns Observable con los datos de la solicitud.
   */
    /**
   * Obtiene los datos de la solicitud desde un archivo JSON.
   * @returns Observable con los datos de la solicitud.
   */
  getDatosDeLaSolicitudData(): Observable<TramiteState> {
    return this.http.get<TramiteState>('assets/json/290101/consulta-datos.json');
  }
}
