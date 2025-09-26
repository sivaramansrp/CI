import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { Tramite240118State } from '../estados/tramite240118Store.store';
import { Tramite240118Store } from '../estados/tramite240118Store.store';

@Injectable({
  providedIn: 'root',
})
export class ConsultaDatosService {
  constructor(
    private http: HttpClient,
    private readonly tramiteStore: Tramite240118Store,
    private readonly seccionStore: SeccionLibStore
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @description Actualiza los datos de la datosDel en el store.
   * @param datosDel Datos de la datosDel.
   */
  updateDatosDel(datosDel: Tramite240118State['datosDelTramite']): void {
    this.tramiteStore.updateDatosDelTramiteFormState(datosDel);
  }

  /**
   * @description Actualiza los datos generales pagoDerchos en el store.
   * @param pagoDerchos Datos generales pagoDerchos.
   */
  updatePagoDerechos(pagoDerchos: Tramite240118State['pagoDerechos']): void {
    this.tramiteStore.updatePagoDerechosFormState(pagoDerchos);
  }
  /**
   * @description Actualiza los datos generales destinatario en el store.
   * @param destinatario Datos generales destinatario.
   */
  updateDestinatario(
    destinatario: Tramite240118State['destinatarioFinalTablaDatos']
  ): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(destinatario);
  }
  /**
   * @description Actualiza los datos generales internos en el store.
   * @param proveedor Datos generales internos.
   */
  updateProveedor(proveedor: Tramite240118State['proveedorTablaDatos']): void {
    this.tramiteStore.updateProveedorTablaDatos(proveedor);
  }
  /**
   * @description Actualiza los datos generales internos en el store.
   * @param mercancia Datos generales internos.
   */
  updateMercancia(
    mercancia: Tramite240118State['merccancialTablaDatos']
  ): void {
    this.tramiteStore.updateMercanciaTablaDatos(mercancia);
  }

  /**
   * @description Actualiza el estado completo del formulario en el store.
   * @param {Tramite240118State} DATOS - Objeto con todos los datos del formulario.
   */
  actualizarEstadoFormulario(DATOS: Tramite240118State): void {
    this.tramiteStore.updateDatosDelTramiteFormState(DATOS.datosDelTramite);
    this.tramiteStore.updatePagoDerechosFormState(DATOS.pagoDerechos);
    this.tramiteStore.updateDestinatarioFinalTablaDatos(DATOS.destinatarioFinalTablaDatos);
    this.tramiteStore.updateProveedorTablaDatos(DATOS.proveedorTablaDatos);
    this.tramiteStore.updateMercanciaTablaDatos(DATOS.merccancialTablaDatos);
  }

  /**
   * Obtiene los datos de la solicitud desde un archivo JSON.
   * @returns Observable con los datos de la solicitud.
   */
  /**
   * Obtiene los datos de la solicitud desde un archivo JSON.
   * @returns Observable con los datos de la solicitud.
   */
  getDatosDeLaSolicitudData(): Observable<Tramite240118State> {
    return this.http.get<Tramite240118State>(
      'assets/json/240118/consulta-datos.json'
    );
  }
}